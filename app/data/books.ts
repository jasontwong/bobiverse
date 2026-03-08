export interface Book {
  id: string
  title: string
  publishedYear: number
  color: string
}

export const books: Book[] = [
  { id: 'b1', title: 'We Are Legion (We Are Bob)', publishedYear: 2016, color: '#3b82f6' },
  { id: 'b2', title: 'For We Are Many', publishedYear: 2017, color: '#22c55e' },
  { id: 'b3', title: 'All These Worlds', publishedYear: 2017, color: '#a855f7' },
  { id: 'b4', title: 'Heaven\'s River', publishedYear: 2020, color: '#f59e0b' },
  { id: 'b5', title: 'Not Till We Are Lost', publishedYear: 2023, color: '#ef4444' },
  { id: 'b6', title: 'Dennis E. Taylor\'s 6th Bobiverse Book', publishedYear: 2024, color: '#14b8a6' },
]

export const bookMap = Object.fromEntries(books.map(b => [b.id, b]))
