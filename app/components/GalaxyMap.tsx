import { useState, useMemo } from 'react'
import { systems, systemMap, locationToSystemId } from '../data/systems'
import { bobs, bobMap } from '../data/bobs'
import { events } from '../data/events'
import type { Enemy } from '../data/enemies'
import { enemies } from '../data/enemies'
import { books, bookMap } from '../data/books'

const MIN_YEAR = 2133
const MAX_YEAR = 2280

const VIEW_X = -25
const VIEW_Y = -28
const VIEW_W = 78
const VIEW_H = 58

interface Position {
  x: number
  y: number
}

type EntityMarker = {
  id: string
  name: string
  color: string
  kind: 'bob'
} | {
  id: string
  name: string
  color: string
  kind: 'enemy'
  shape: 'triangle' | 'diamond'
}

function getBobInterpolatedPosition(bobId: string, year: number): Position | null {
  // All events for this Bob, sorted by year
  const bobEvents = events
    .filter((e) => e.bobLocations.some((bl) => bl.bobId === bobId))
    .sort((a, b) => a.inUniverseYear - b.inUniverseYear)

  if (bobEvents.length === 0 || year < bobEvents[0].inUniverseYear) return null

  const getSystemPos = (event: typeof events[0]): Position | null => {
    const bl = event.bobLocations.find((bl) => bl.bobId === bobId)
    if (!bl) return null
    const systemId = locationToSystemId[bl.location]
    if (!systemId) return null
    const system = systemMap[systemId]
    return system ? { x: system.x, y: system.y } : null
  }

  // Past the last known event — stay at last position
  if (year >= bobEvents[bobEvents.length - 1].inUniverseYear) {
    return getSystemPos(bobEvents[bobEvents.length - 1])
  }

  // Find the surrounding events
  let prevEvent = bobEvents[0]
  let nextEvent = bobEvents[1]
  for (let i = 0; i < bobEvents.length - 1; i++) {
    if (bobEvents[i].inUniverseYear <= year && bobEvents[i + 1].inUniverseYear > year) {
      prevEvent = bobEvents[i]
      nextEvent = bobEvents[i + 1]
      break
    }
  }

  const prevPos = getSystemPos(prevEvent)
  const nextPos = getSystemPos(nextEvent)

  if (!prevPos) return null
  if (!nextPos) return prevPos

  // Linear interpolation
  const t = (year - prevEvent.inUniverseYear) / (nextEvent.inUniverseYear - prevEvent.inUniverseYear)
  return {
    x: prevPos.x + (nextPos.x - prevPos.x) * t,
    y: prevPos.y + (nextPos.y - prevPos.y) * t,
  }
}

function getEnemyPosition(enemy: Enemy, year: number): { x: number; y: number } | null {
  const kf = enemy.keyframes
  if (year < kf[0].year || (!kf[0].visible && year < kf.find(k => k.visible)?.year!)) return null

  // Find surrounding keyframes
  let prev = kf[0]
  let next = kf[kf.length - 1]
  for (let i = 0; i < kf.length - 1; i++) {
    if (kf[i].year <= year && kf[i + 1].year > year) {
      prev = kf[i]
      next = kf[i + 1]
      break
    }
    if (kf[i].year <= year) prev = kf[i]
  }

  // If not visible at prev keyframe, check if we've reached a visible one
  if (!prev.visible) return null
  // If past last keyframe and not visible
  if (year >= kf[kf.length - 1].year && !kf[kf.length - 1].visible) return null

  const t = next.year === prev.year ? 0 : (year - prev.year) / (next.year - prev.year)
  return {
    x: prev.x + (next.x - prev.x) * t,
    y: prev.y + (next.y - prev.y) * t,
  }
}

function arcOffset(index: number, total: number): { dx: number; dy: number } {
  if (total === 1) return { dx: 0, dy: 0 }
  const radius = total <= 3 ? 1.8 : total <= 6 ? 2.4 : 3.0
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return { dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius }
}

export function GalaxyMap() {
  const [year, setYear] = useState(MIN_YEAR)
  const [hoveredSystem, setHoveredSystem] = useState<string | null>(null)

  const eventYears = useMemo(() =>
    [...new Set(events.map((e) => e.inUniverseYear))].sort((a, b) => a - b)
  , [])

  const currentBook = useMemo(() => {
    const past = events.filter((e) => e.inUniverseYear <= year)
    if (past.length === 0) return null
    const latest = past.reduce((a, b) => a.inUniverseYear >= b.inUniverseYear ? a : b)
    return bookMap[latest.bookId] ?? null
  }, [year])

  function prevEvent() {
    const prev = [...eventYears].reverse().find((y) => y < year)
    if (prev !== undefined) setYear(prev)
  }

  function nextEvent() {
    const next = eventYears.find((y) => y > year)
    if (next !== undefined) setYear(next)
  }

  const bobPositions = useMemo(
    () =>
      Object.fromEntries(
        bobs.map((bob) => [bob.id, getBobInterpolatedPosition(bob.id, year)])
      ) as Record<string, Position | null>,
    [year]
  )

  const activeEvents = events.filter((e) => e.inUniverseYear === year)

  // Build map of which entities are near which system
  const entitiesAtSystem = useMemo(() => {
    const map: Record<string, EntityMarker[]> = {}

    // Bobs
    for (const bob of bobs) {
      const pos = bobPositions[bob.id]
      if (!pos) continue
      for (const system of systems) {
        if (Math.hypot(system.x - pos.x, system.y - pos.y) < 0.5) {
          if (!map[system.id]) map[system.id] = []
          map[system.id].push({ id: bob.id, name: bob.name, color: bob.color, kind: 'bob' })
          break
        }
      }
    }

    // Enemies
    for (const enemy of enemies) {
      const pos = getEnemyPosition(enemy, year)
      if (!pos) continue
      for (const system of systems) {
        if (Math.hypot(system.x - pos.x, system.y - pos.y) < 1.0) {
          if (!map[system.id]) map[system.id] = []
          map[system.id].push({ id: enemy.id, name: enemy.name, color: enemy.color, kind: 'enemy', shape: enemy.shape })
          break
        }
      }
    }

    return map
  }, [bobPositions, year])

  // Track which entity IDs are already rendered at a system (to skip in-transit render)
  const entitiesSnappedToSystem = useMemo(() => {
    const snapped = new Set<string>()
    for (const entities of Object.values(entitiesAtSystem)) {
      for (const e of entities) snapped.add(e.id)
    }
    return snapped
  }, [entitiesAtSystem])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Book indicator */}
      {currentBook && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              padding: '0.2rem 0.6rem',
              borderRadius: '2px',
              backgroundColor: currentBook.color + '22',
              color: currentBook.color,
              border: `1px solid ${currentBook.color}55`,
            }}
          >
            Book {books.indexOf(currentBook) + 1}: {currentBook.title}
          </span>
        </div>
      )}

      {/* Slider row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={prevEvent}
          style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '1.1rem', lineHeight: 1 }}
          title="Previous event"
        >
          ◀
        </button>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', width: '2.5rem', textAlign: 'right' }}>{MIN_YEAR}</span>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={year}
            list="event-years"
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full accent-sky-500"
          />
          <datalist id="event-years">
            {eventYears.map((y) => <option key={y} value={y} />)}
          </datalist>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', width: '2.5rem' }}>{MAX_YEAR}</span>
        <button
          onClick={nextEvent}
          style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '1.1rem', lineHeight: 1 }}
          title="Next event"
        >
          ▶
        </button>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', width: '4rem', textAlign: 'right' }}>{year}</span>
      </div>

      {/* Active events */}
      <div style={{ minHeight: '1.5rem' }}>
        {activeEvents.map((e) => (
          <p key={e.id} style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--accent-gold)', margin: 0 }}>★ {e.title}</p>
        ))}
      </div>

      {/* SVG map */}
      <div style={{ position: 'relative', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border-dim)', overflow: 'hidden' }}>
        <svg
          viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          style={{ aspectRatio: `${VIEW_W}/${VIEW_H}` }}
        >
          {/* Axis lines */}
          <line x1={VIEW_X} y1={0} x2={VIEW_X + VIEW_W} y2={0} stroke="#0d1528" strokeWidth="0.3" />
          <line x1={0} y1={VIEW_Y} x2={0} y2={VIEW_Y + VIEW_H} stroke="#0d1528" strokeWidth="0.3" />

          {/* Stars */}
          {systems.map((system) => (
            <g key={system.id}>
              <circle
                cx={system.x}
                cy={system.y}
                r={system.id === 'sol' ? 1.2 : 0.8}
                fill={system.id === 'sol' ? '#c9974a' : '#3d5270'}
              />
              <text
                x={system.x + 1.3}
                y={system.y - 0.8}
                fontSize="1.8"
                fill="#3d5270"
                className="select-none"
              >
                {system.name}
              </text>
              {system.notable && (
                <text
                  x={system.x + 1.3}
                  y={system.y + 1.4}
                  fontSize="1.4"
                  fill="#3d5270"
                  className="select-none"
                >
                  {system.notable}
                </text>
              )}
              {/* Transparent hover target */}
              <circle
                cx={system.x}
                cy={system.y}
                r={3}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSystem(system.id)}
                onMouseLeave={() => setHoveredSystem(null)}
              />
            </g>
          ))}

          {/* Entities snapped to systems — combined arc layout */}
          {systems.map((system) => {
            const entities = entitiesAtSystem[system.id]
            if (!entities || entities.length === 0) return null
            return (
              <g key={`entities-${system.id}`}>
                {entities.map((entity, index) => {
                  const { dx, dy } = arcOffset(index, entities.length)
                  const ex = system.x + dx
                  const ey = system.y + dy
                  if (entity.kind === 'bob') {
                    return (
                      <circle
                        key={entity.id}
                        cx={ex}
                        cy={ey}
                        r={1.1}
                        fill={entity.color}
                        opacity={0.9}
                      >
                        <title>{entity.name}</title>
                      </circle>
                    )
                  } else {
                    const r = 1.3
                    const points = entity.shape === 'triangle'
                      ? `${ex},${ey + r} ${ex - r * 0.87},${ey - r * 0.5} ${ex + r * 0.87},${ey - r * 0.5}`
                      : `${ex},${ey - r} ${ex + r},${ey} ${ex},${ey + r} ${ex - r},${ey}`
                    return (
                      <polygon
                        key={entity.id}
                        points={points}
                        fill={entity.color}
                        opacity={0.85}
                      >
                        <title>{entity.name}</title>
                      </polygon>
                    )
                  }
                })}
              </g>
            )
          })}

          {/* In-transit Bobs (not snapped to any system) */}
          {bobs.map((bob) => {
            if (entitiesSnappedToSystem.has(bob.id)) return null
            const pos = bobPositions[bob.id]
            if (!pos) return null
            return (
              <g key={bob.id}>
                <circle cx={pos.x} cy={pos.y} r={1.1} fill={bob.color} opacity={0.9}>
                  <title>{bob.name}</title>
                </circle>
                <text
                  x={pos.x + 1.3}
                  y={pos.y + 0.5}
                  fontSize="1.6"
                  fill={bob.color}
                  className="select-none"
                >
                  {bob.name}
                </text>
              </g>
            )
          })}

          {/* In-transit enemies (not snapped to any system) */}
          {enemies.map((enemy) => {
            if (entitiesSnappedToSystem.has(enemy.id)) return null
            const pos = getEnemyPosition(enemy, year)
            if (!pos) return null
            const r = 1.3
            const points = enemy.shape === 'triangle'
              ? `${pos.x},${pos.y + r} ${pos.x - r * 0.87},${pos.y - r * 0.5} ${pos.x + r * 0.87},${pos.y - r * 0.5}`
              : `${pos.x},${pos.y - r} ${pos.x + r},${pos.y} ${pos.x},${pos.y + r} ${pos.x - r},${pos.y}`
            return (
              <g key={enemy.id}>
                <polygon points={points} fill={enemy.color} opacity={0.85}>
                  <title>{enemy.name}</title>
                </polygon>
                <text
                  x={pos.x + 1.4}
                  y={pos.y + 0.5}
                  fontSize="1.6"
                  fill={enemy.color}
                  className="select-none"
                >
                  {enemy.name}
                </text>
              </g>
            )
          })}

          {/* Distance scale */}
          <line x1={44} y1={26} x2={54} y2={26} stroke="#475569" strokeWidth="0.4" />
          <text x={46.5} y={24.5} fontSize="1.5" fill="#475569" className="select-none">10 ly</text>
        </svg>

        {/* Hover panel overlay */}
        {hoveredSystem && entitiesAtSystem[hoveredSystem] && entitiesAtSystem[hoveredSystem].length > 0 && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-active)',
            borderRadius: '2px',
            padding: '0.75rem',
            minWidth: '9rem',
            pointerEvents: 'none',
          }}>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
            }}>
              {systemMap[hoveredSystem]?.name}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {entitiesAtSystem[hoveredSystem].map((entity) => (
                <div key={entity.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {entity.kind === 'bob' ? (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, backgroundColor: entity.color }} />
                  ) : (
                    <svg width="8" height="8" viewBox="0 0 8 8" style={{ flexShrink: 0 }}>
                      {entity.shape === 'triangle' ? (
                        <polygon points="4,8 0,0 8,0" fill={entity.color} />
                      ) : (
                        <polygon points="4,0 8,4 4,8 0,4" fill={entity.color} />
                      )}
                    </svg>
                  )}
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: entity.color }}>{entity.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bob legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 1rem' }}>
        {bobs.map((bob) => {
          const pos = bobPositions[bob.id]
          const isActive = pos !== null
          // Find nearest system
          let nearestSystem: string | null = null
          if (isActive && pos) {
            let minDist = Infinity
            for (const system of systems) {
              const d = Math.hypot(system.x - pos.x, system.y - pos.y)
              if (d < minDist) { minDist = d; nearestSystem = system.name }
            }
          }
          return (
            <div key={bob.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{ width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, backgroundColor: bob.color, opacity: isActive ? 1 : 0.3 }}
              />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: isActive ? bob.color : 'var(--text-muted)' }}>
                {bob.name}
              </span>
              {isActive && nearestSystem && (
                <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: '0.8rem', color: 'var(--text-secondary)' }}>→ {nearestSystem}</span>
              )}
              {!isActive && (
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)' }}>inactive</span>
              )}
            </div>
          )
        })}
      </div>
      {/* Enemy legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 1rem', borderTop: '1px solid var(--border-dim)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
        {enemies.map((enemy) => {
          const pos = getEnemyPosition(enemy, year)
          const isActive = pos !== null
          const r = 6
          const shape = enemy.shape === 'triangle'
            ? `M${r/2},${r} L0,0 L${r},0 Z`
            : `M${r/2},0 L${r},${r/2} L${r/2},${r} L0,${r/2} Z`
          return (
            <div key={enemy.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width={r} height={r} viewBox={`0 0 ${r} ${r}`} style={{ flexShrink: 0 }}>
                <path d={shape} fill={enemy.color} opacity={isActive ? 0.85 : 0.3} />
              </svg>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: isActive ? enemy.color : 'var(--text-muted)' }}>
                {enemy.name}
              </span>
              {!isActive && (
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)' }}>inactive</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
