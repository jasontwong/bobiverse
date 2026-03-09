import { useState, useMemo } from 'react'
import { systems, systemMap, locationToSystemId } from '../data/systems'
import { bobs, bobMap } from '../data/bobs'
import { events } from '../data/events'

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

export function GalaxyMap() {
  const [year, setYear] = useState(MIN_YEAR)

  const bobPositions = useMemo(
    () =>
      Object.fromEntries(
        bobs.map((bob) => [bob.id, getBobInterpolatedPosition(bob.id, year)])
      ) as Record<string, Position | null>,
    [year]
  )

  const activeEvents = events.filter((e) => e.inUniverseYear === year)

  return (
    <div className="flex flex-col gap-4">
      {/* Year slider */}
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm font-mono">{MIN_YEAR}</span>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="flex-1 accent-sky-500"
        />
        <span className="text-slate-400 text-sm font-mono">{MAX_YEAR}</span>
        <span className="text-white font-bold font-mono text-lg w-16 text-right">
          {year}
        </span>
      </div>

      {/* Active events */}
      <div className="min-h-6">
        {activeEvents.map((e) => (
          <p key={e.id} className="text-sky-400 text-sm">★ {e.title}</p>
        ))}
      </div>

      {/* SVG map */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <svg
          viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          style={{ aspectRatio: `${VIEW_W}/${VIEW_H}` }}
        >
          {/* Axis lines */}
          <line x1={VIEW_X} y1={0} x2={VIEW_X + VIEW_W} y2={0} stroke="#1e293b" strokeWidth="0.3" />
          <line x1={0} y1={VIEW_Y} x2={0} y2={VIEW_Y + VIEW_H} stroke="#1e293b" strokeWidth="0.3" />

          {/* Stars */}
          {systems.map((system) => (
            <g key={system.id}>
              <circle
                cx={system.x}
                cy={system.y}
                r={system.id === 'sol' ? 1.2 : 0.8}
                fill={system.id === 'sol' ? '#fde68a' : '#94a3b8'}
              />
              <text
                x={system.x + 1.3}
                y={system.y - 0.8}
                fontSize="1.8"
                fill="#64748b"
                className="select-none"
              >
                {system.name}
              </text>
              {system.notable && (
                <text
                  x={system.x + 1.3}
                  y={system.y + 1.4}
                  fontSize="1.4"
                  fill="#475569"
                  className="select-none"
                >
                  {system.notable}
                </text>
              )}
            </g>
          ))}

          {/* Bob dots (smooth interpolated positions) */}
          {bobs.map((bob) => {
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

          {/* Distance scale */}
          <line x1={44} y1={26} x2={54} y2={26} stroke="#475569" strokeWidth="0.4" />
          <text x={46.5} y={24.5} fontSize="1.5" fill="#475569" className="select-none">10 ly</text>
        </svg>
      </div>

      {/* Bob legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
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
            <div key={bob.id} className="flex items-center gap-1.5 text-sm">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: bob.color, opacity: isActive ? 1 : 0.3 }}
              />
              <span style={{ color: isActive ? bob.color : '#475569' }}>
                {bob.name}
              </span>
              {isActive && nearestSystem && (
                <span className="text-slate-500 text-xs">→ {nearestSystem}</span>
              )}
              {!isActive && (
                <span className="text-slate-600 text-xs">not yet active</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
