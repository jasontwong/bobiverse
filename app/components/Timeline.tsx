import type { TimelineEvent } from '../data/events'
import { bookMap } from '../data/books'
import { EventCard } from './EventCard'

interface TimelineProps {
  events: TimelineEvent[]
  expandedEvent: string | null
  onToggleEvent: (id: string) => void
}

export function Timeline({ events, expandedEvent, onToggleEvent }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
        NO EVENTS MATCH CURRENT FILTER
      </div>
    )
  }

  const sorted = [...events].sort((a, b) => a.inUniverseYear - b.inUniverseYear)

  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '4.5rem',
        top: 0,
        bottom: 0,
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, var(--border-active) 5%, var(--border-active) 95%, transparent)',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {sorted.map((event) => {
          const book = bookMap[event.bookId]
          const color = book?.color ?? '#6b7280'

          return (
            <div key={event.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              {/* Year */}
              <div style={{ width: '3.5rem', textAlign: 'right', flexShrink: 0, paddingTop: '0.85rem' }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                }}>
                  {event.inUniverseYear}
                </span>
              </div>

              {/* Dot */}
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: '1.05rem', position: 'relative' }}>
                {/* Outer ring */}
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: `1px solid ${color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-void)',
                  boxShadow: `0 0 8px ${color}44`,
                }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: color }} />
                </div>
              </div>

              {/* Card */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <EventCard
                  event={event}
                  isExpanded={expandedEvent === event.id}
                  onToggle={() => onToggleEvent(event.id)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
