import { bobs } from '../data/bobs'

interface BobFilterProps {
  selectedBobs: Set<string>
  onToggle: (bobId: string) => void
}

export function BobFilter({ selectedBobs, onToggle }: BobFilterProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
      {bobs.map((bob) => {
        const isSelected = selectedBobs.has(bob.id)
        return (
          <button
            key={bob.id}
            onClick={() => onToggle(bob.id)}
            title={bob.description}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              padding: '0.3rem 0.75rem',
              borderRadius: '2px',
              border: `1px solid ${isSelected ? bob.color : bob.color + '44'}`,
              background: isSelected ? bob.color + '22' : 'transparent',
              color: isSelected ? bob.color : bob.color + '88',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {bob.name}
          </button>
        )
      })}
    </div>
  )
}
