import { useState, useMemo } from 'react'
import { systems, systemMap, locationToSystemId } from '../data/systems'
import { bobs, bobMap } from '../data/bobs'
import { events } from '../data/events'

const MIN_YEAR = 2133
const MAX_YEAR = 2200

// SVG viewBox in light-year units. We'll center on Sol with padding.
const VIEW_X = -28
const VIEW_Y = -28
const VIEW_W = 72
const VIEW_H = 56

// Get each Bob's system id at a given year
function getBobPositions(year: number): Record<string, string | null> {
  const positions: Record<string, string | null> = {}

  for (const bob of bobs) {
    // Find all events at or before this year where this Bob appears
    const relevantEvents = events
      .filter((e) => e.inUniverseYear <= year && e.bobLocations.some((bl) => bl.bobId === bob.id))
      .sort((a, b) => b.inUniverseYear - a.inUniverseYear)

    if (relevantEvents.length === 0) {
      positions[bob.id] = null // not yet active
      continue
    }

    const latestEvent = relevantEvents[0]
    const bl = latestEvent.bobLocations.find((bl) => bl.bobId === bob.id)!
    positions[bob.id] = locationToSystemId[bl.location] ?? null
  }

  return positions
}

export function GalaxyMap() {
  const [year, setYear] = useState(MIN_YEAR)

  const bobPositions = useMemo(() => getBobPositions(year), [year])

  // Group Bobs by system for offset calculation
  const bobsBySystem = useMemo(() => {
    const grouped: Record<string, string[]> = {}
    for (const [bobId, systemId] of Object.entries(bobPositions)) {
      if (!systemId) continue
      if (!grouped[systemId]) grouped[systemId] = []
      grouped[systemId].push(bobId)
    }
    return grouped
  }, [bobPositions])

  // Active events at this exact year
  const activeEvents = events.filter((e) => e.inUniverseYear === year)

  return (
    <div className="flex flex-col gap-4">
      {/* Year slider */}
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm font-mono w-10">{MIN_YEAR}</span>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="flex-1 accent-sky-500"
        />
        <span className="text-slate-400 text-sm font-mono w-10">{MAX_YEAR}</span>
        <span className="text-white font-bold font-mono text-lg w-16 text-right">
          {year}
        </span>
      </div>

      {/* Active event names at this year */}
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
          {/* Grid lines */}
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
                x={system.x + 1.2}
                y={system.y - 1}
                fontSize="1.8"
                fill="#64748b"
                className="select-none"
              >
                {system.name}
              </text>
              {system.notable && (
                <text
                  x={system.x + 1.2}
                  y={system.y + 1}
                  fontSize="1.4"
                  fill="#475569"
                  className="select-none"
                >
                  {system.notable}
                </text>
              )}
            </g>
          ))}

          {/* Bob dots */}
          {systems.map((system) => {
            const bobsHere = bobsBySystem[system.id] ?? []
            return bobsHere.map((bobId, i) => {
              const bob = bobMap[bobId]
              if (!bob) return null
              // Offset Bobs in a small arc around the star
              const angle = (i / Math.max(bobsHere.length, 1)) * 2 * Math.PI - Math.PI / 2
              const radius = bobsHere.length === 1 ? 0 : 2.2
              const dx = bobsHere.length === 1 ? 0 : Math.cos(angle) * radius
              const dy = bobsHere.length === 1 ? 0 : Math.sin(angle) * radius
              return (
                <g key={bobId}>
                  <circle
                    cx={system.x + dx}
                    cy={system.y + dy}
                    r={1.1}
                    fill={bob.color}
                    opacity={0.9}
                  >
                    <title>{bob.name} @ {system.name}</title>
                  </circle>
                  <text
                    x={system.x + dx + 1.3}
                    y={system.y + dy + 0.5}
                    fontSize="1.6"
                    fill={bob.color}
                    className="select-none"
                  >
                    {bob.name}
                  </text>
                </g>
              )
            })
          })}

          {/* Distance legend (bottom right) */}
          <g>
            <line x1={36} y1={24} x2={46} y2={24} stroke="#475569" strokeWidth="0.4" />
            <text x={38.5} y={22.5} fontSize="1.5" fill="#475569" className="select-none">10 ly</text>
          </g>
        </svg>
      </div>

      {/* Bob legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {bobs.map((bob) => {
          const systemId = bobPositions[bob.id]
          const system = systemId ? systemMap[systemId] : null
          const isActive = systemId !== null && systemId !== undefined
          return (
            <div key={bob.id} className="flex items-center gap-1.5 text-sm">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: bob.color, opacity: isActive ? 1 : 0.3 }}
              />
              <span style={{ color: isActive ? bob.color : '#475569' }}>
                {bob.name}
              </span>
              {system && (
                <span className="text-slate-500 text-xs">@ {system.name}</span>
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
