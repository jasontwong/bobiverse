import { bobs } from '../data/bobs'

interface BobFilterProps {
  selectedBobs: Set<string>
  onToggle: (bobId: string) => void
}

export function BobFilter({ selectedBobs, onToggle }: BobFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {bobs.map((bob) => {
        const isSelected = selectedBobs.has(bob.id)
        return (
          <button
            key={bob.id}
            onClick={() => onToggle(bob.id)}
            title={bob.description}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: bob.color,
              backgroundColor: isSelected ? bob.color : 'transparent',
              color: isSelected ? '#0f172a' : bob.color,
              opacity: isSelected ? 1 : 0.6,
            }}
          >
            {bob.name}
          </button>
        )
      })}
    </div>
  )
}
