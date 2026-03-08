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
      className="bg-slate-900 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors duration-200 overflow-hidden"
      style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
      onClick={onToggle}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: color + '33', color }}
          >
            {book?.title.split('(')[0].trim() ?? event.bookId}
          </span>
          {event.significance === 'major' && (
            <span className="text-xs text-slate-400">★ Major Event</span>
          )}
        </div>
        <h3 className="text-white font-semibold text-base">{event.title}</h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {event.bobLocations.map(({ bobId }) => {
            const bob = bobMap[bobId]
            if (!bob) return null
            return (
              <span
                key={bobId}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ backgroundColor: bob.color + '22', color: bob.color }}
              >
                {bob.name}
              </span>
            )
          })}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-3">
          <p className="text-slate-300 text-sm mb-3">{event.description}</p>
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-wide">Bob Locations</span>
            <div className="mt-2 space-y-1">
              {event.bobLocations.map(({ bobId, location }) => {
                const bob = bobMap[bobId]
                if (!bob) return null
                return (
                  <div key={bobId} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: bob.color }}
                    />
                    <span style={{ color: bob.color }} className="font-medium w-16 flex-shrink-0">
                      {bob.name}
                    </span>
                    <span className="text-slate-400">{location}</span>
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
