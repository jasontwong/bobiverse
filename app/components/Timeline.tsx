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
      <div className="text-center text-slate-500 py-16">
        No events match the current filter. Select a book above.
      </div>
    )
  }

  const sorted = [...events].sort((a, b) => a.inUniverseYear - b.inUniverseYear)

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-slate-700" />

      <div className="space-y-6">
        {sorted.map((event) => {
          const book = bookMap[event.bookId]
          const color = book?.color ?? '#6b7280'

          return (
            <div key={event.id} className="flex gap-6">
              {/* Year label */}
              <div className="w-12 text-right flex-shrink-0 pt-4">
                <span className="text-slate-500 text-xs font-mono">{event.inUniverseYear}</span>
              </div>

              {/* Dot */}
              <div className="flex-shrink-0 relative flex items-start pt-5">
                <div
                  className="w-3 h-3 rounded-full ring-2 ring-slate-950 z-10"
                  style={{ backgroundColor: color }}
                />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
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
