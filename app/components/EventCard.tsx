import type { TimelineEvent } from '../data/events'
import { bookMap } from '../data/books'
import { bobMap } from '../data/bobs'

interface EventCardProps {
  event: TimelineEvent
  isExpanded: boolean
  onToggle: () => void
}

export function EventCard({ event, isExpanded, onToggle }: EventCardProps) {
  const book = bookMap[event.bookId]
  const color = book?.color ?? '#6b7280'

  return (
    <div
      onClick={onToggle}
      style={{
        background: isExpanded ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: '1px solid',
        borderColor: isExpanded ? 'var(--border-active)' : 'var(--border-dim)',
        borderLeft: `3px solid ${color}`,
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '0.9rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            padding: '0.15rem 0.5rem',
            borderRadius: '2px',
            backgroundColor: color + '22',
            color,
            border: `1px solid ${color}44`,
          }}>
            {book?.title.split('(')[0].trim() ?? event.bookId}
          </span>
          {event.significance === 'major' && (
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
              ◆ MAJOR
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: 'var(--text-primary)',
          margin: '0 0 0.3rem',
        }}>
          {event.title}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {event.bobLocations.map(({ bobId }) => {
            const bob = bobMap[bobId]
            if (!bob) return null
            return (
              <span key={bobId} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '2px',
                backgroundColor: bob.color + '18',
                color: bob.color,
              }}>
                {bob.name}
              </span>
            )
          })}
        </div>
      </div>

      {isExpanded && (
        <div style={{
          padding: '0.8rem 1rem 1rem',
          borderTop: '1px solid var(--border-dim)',
        }}>
          <p style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            marginBottom: '1rem',
          }}>
            {event.description}
          </p>

          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}>
              Probe Locations
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {event.bobLocations.map(({ bobId, location }) => {
                const bob = bobMap[bobId]
                if (!bob) return null
                return (
                  <div key={bobId} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: bob.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: bob.color, width: '4.5rem', flexShrink: 0 }}>
                      {bob.name}
                    </span>
                    <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {location}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
