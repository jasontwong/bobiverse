import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { books } from '../data/books'
import { bobs } from '../data/bobs'
import { events } from '../data/events'
import { BookFilter } from '../components/BookFilter'
import { BobFilter } from '../components/BobFilter'
import { Timeline } from '../components/Timeline'
import { GalaxyMap } from '../components/GalaxyMap'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [view, setView] = useState<'timeline' | 'galaxy'>('timeline')
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(
    new Set(books.map((b) => b.id))
  )
  const [selectedBobs, setSelectedBobs] = useState<Set<string>>(
    new Set(bobs.map((b) => b.id))
  )
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  function toggleBook(bookId: string) {
    setSelectedBooks((prev) => {
      const next = new Set(prev)
      if (next.has(bookId)) next.delete(bookId)
      else next.add(bookId)
      return next
    })
  }

  function toggleBob(bobId: string) {
    setSelectedBobs((prev) => {
      const next = new Set(prev)
      if (next.has(bobId)) next.delete(bobId)
      else next.add(bobId)
      return next
    })
  }

  function toggleEvent(id: string) {
    setExpandedEvent((prev) => (prev === id ? null : id))
  }

  const filteredEvents = events.filter(
    (e) =>
      selectedBooks.has(e.bookId) &&
      e.bobLocations.some((bl) => selectedBobs.has(bl.bobId))
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Bobiverse Timeline</h1>
        <p className="text-slate-400 text-lg">
          An interactive timeline of key events across the Bobiverse series by Dennis E. Taylor.
        </p>
      </header>

      {/* View toggle */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setView('timeline')}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          style={{
            backgroundColor: view === 'timeline' ? '#0ea5e9' : 'transparent',
            color: view === 'timeline' ? '#0f172a' : '#94a3b8',
            border: '1px solid',
            borderColor: view === 'timeline' ? '#0ea5e9' : '#334155',
          }}
        >
          Timeline
        </button>
        <button
          onClick={() => setView('galaxy')}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          style={{
            backgroundColor: view === 'galaxy' ? '#0ea5e9' : 'transparent',
            color: view === 'galaxy' ? '#0f172a' : '#94a3b8',
            border: '1px solid',
            borderColor: view === 'galaxy' ? '#0ea5e9' : '#334155',
          }}
        >
          Galaxy Map
        </button>
      </div>

      {view === 'timeline' && (
        <>
          <div className="mb-2">
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Filter by Book</p>
            <BookFilter selectedBooks={selectedBooks} onToggle={toggleBook} />
          </div>
          <div className="mb-8">
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Filter by Bob</p>
            <BobFilter selectedBobs={selectedBobs} onToggle={toggleBob} />
          </div>
          <Timeline
            events={filteredEvents}
            expandedEvent={expandedEvent}
            onToggleEvent={toggleEvent}
          />
        </>
      )}

      {view === 'galaxy' && <GalaxyMap />}
    </div>
  )
}
