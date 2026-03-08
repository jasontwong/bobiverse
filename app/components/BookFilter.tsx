import { books } from '../data/books'

interface BookFilterProps {
  selectedBooks: Set<string>
  onToggle: (bookId: string) => void
}

export function BookFilter({ selectedBooks, onToggle }: BookFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {books.map((book) => {
        const isSelected = selectedBooks.has(book.id)
        return (
          <button
            key={book.id}
            onClick={() => onToggle(book.id)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: book.color,
              backgroundColor: isSelected ? book.color : 'transparent',
              color: isSelected ? '#0f172a' : book.color,
              opacity: isSelected ? 1 : 0.6,
            }}
          >
            {book.title.split('(')[0].trim()}
          </button>
        )
      })}
    </div>
  )
}
