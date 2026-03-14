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
      <header className="mb-12 pt-2">
        {/* Decorative top line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, var(--border-active))' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
            Mission Log · Von Neumann Probe Network
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, var(--border-active))' }} />
        </div>

        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
          BOBIVERSE
        </h1>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Chronological Mission Archive
        </p>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '520px', fontStyle: 'italic' }}>
          An interactive record of key events across the Bobiverse series by Dennis E. Taylor.
          Click any event to expand mission details.
        </p>
      </header>

      {/* View toggle */}
      <div className="flex gap-0 mb-10" style={{ borderBottom: '1px solid var(--border-dim)' }}>
        {(['timeline', 'galaxy'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.5rem',
              border: 'none',
              borderBottom: view === v ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              background: 'transparent',
              color: view === v ? 'var(--accent-cyan)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'color 0.2s',
              marginBottom: '-1px',
            }}
          >
            {v === 'timeline' ? '// Timeline' : '// Galaxy Map'}
          </button>
        ))}
      </div>

      {view === 'timeline' && (
        <>
          <div className="mb-2">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ── Filter by Mission Log
            </p>
            <BookFilter selectedBooks={selectedBooks} onToggle={toggleBook} />
          </div>
          <div className="mb-10">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ── Filter by Probe Identity
            </p>
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
