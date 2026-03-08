export interface Bob {
  id: string
  name: string
  color: string
  description: string
}

export const bobs: Bob[] = [
  { id: 'bob', name: 'Bob', color: '#0ea5e9', description: 'Original Bob Johansson' },
  { id: 'riker', name: 'Riker', color: '#f97316', description: 'First replication, named after Star Trek\'s Riker' },
  { id: 'bill', name: 'Bill', color: '#10b981', description: 'Early replication, handles Sol system operations' },
  { id: 'garfield', name: 'Garfield', color: '#eab308', description: 'Named after the comic strip cat' },
  { id: 'howard', name: 'Howard', color: '#ec4899', description: 'Explorer Bob, discovers the Pav' },
  { id: 'bender', name: 'Bender', color: '#8b5cf6', description: 'Named after Futurama\'s Bender, disappears in Heaven\'s River' },
]

export const bobMap = Object.fromEntries(bobs.map((b) => [b.id, b]))
