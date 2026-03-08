import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { books } from '../data/books'
import { events } from '../data/events'
import { BookFilter } from '../components/BookFilter'
import { Timeline } from '../components/Timeline'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(
    new Set(books.map((b) => b.id))
  )
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  function toggleBook(bookId: string) {
    setSelectedBooks((prev) => {
      const next = new Set(prev)
      if (next.has(bookId)) {
        next.delete(bookId)
      } else {
        next.add(bookId)
      }
      return next
    })
  }

  function toggleEvent(id: string) {
    setExpandedEvent((prev) => (prev === id ? null : id))
  }

  const filteredEvents = events.filter((e) => selectedBooks.has(e.bookId))

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Bobiverse Timeline</h1>
        <p className="text-slate-400 text-lg">
          An interactive timeline of key events across the Bobiverse series by Dennis E. Taylor.
          Click any event to expand details.
        </p>
      </header>

      <BookFilter selectedBooks={selectedBooks} onToggle={toggleBook} />

      <Timeline
        events={filteredEvents}
        expandedEvent={expandedEvent}
        onToggleEvent={toggleEvent}
      />
    </div>
  )
}
