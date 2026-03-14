import { books } from '../data/books'

interface BookFilterProps {
  selectedBooks: Set<string>
  onToggle: (bookId: string) => void
}

export function BookFilter({ selectedBooks, onToggle }: BookFilterProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
      {books.map((book) => {
        const isSelected = selectedBooks.has(book.id)
        return (
          <button
            key={book.id}
            onClick={() => onToggle(book.id)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              padding: '0.3rem 0.75rem',
              borderRadius: '2px',
              border: `1px solid ${isSelected ? book.color : book.color + '44'}`,
              background: isSelected ? book.color + '22' : 'transparent',
              color: isSelected ? book.color : book.color + '88',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {book.title.split('(')[0].trim()}
          </button>
        )
      })}
    </div>
  )
}
