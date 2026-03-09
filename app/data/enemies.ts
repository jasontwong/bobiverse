export interface EnemyKeyframe {
  year: number
  x: number
  y: number
  visible: boolean
}

export interface Enemy {
  id: string
  name: string
  color: string
  shape: 'triangle' | 'diamond'
  description: string
  keyframes: EnemyKeyframe[]  // sorted by year
}

export const enemies: Enemy[] = [
  {
    id: 'medeiros',
    name: 'Medeiros',
    color: '#ff6b35',
    shape: 'diamond',
    description: 'Brazilian replicant — competes with Bob for control of colonization missions',
    keyframes: [
      { year: 2133, x: 0, y: 0, visible: true },         // Sol — launched same time as Bob
      { year: 2144, x: 6, y: -8, visible: true },         // Epsilon Eridani — defeated by Bob
      { year: 2145, x: 6, y: -8, visible: false },        // Neutralized
    ],
  },
  {
    id: 'the_others',
    name: 'The Others',
    color: '#ef4444',
    shape: 'triangle',
    description: 'Hostile alien civilization that systematically destroys developing species',
    keyframes: [
      { year: 2175, x: -32, y: 22, visible: false },      // Not yet detected
      { year: 2176, x: -32, y: 22, visible: true },       // First detected far out
      { year: 2188, x: -16, y: 10, visible: true },       // Approaching Sol
      { year: 2207, x: -8, y: -18, visible: true },       // Attacking Delta Pavonis
      { year: 2217, x: -8, y: -18, visible: true },       // Final battle — being defeated
      { year: 2218, x: -8, y: -18, visible: false },      // Defeated / withdrawn
    ],
  },
  {
    id: 'administrator',
    name: 'The Administrator',
    color: '#a78bfa',
    shape: 'diamond',
    description: 'Corrupt AI controlling Heaven\'s River megastructure, captor of Bender',
    keyframes: [
      { year: 2227, x: 38, y: -8, visible: false },
      { year: 2228, x: 38, y: -8, visible: true },        // Bender captured
      { year: 2242, x: 38, y: -8, visible: true },        // Bob confronts it
      { year: 2243, x: 38, y: -8, visible: false },       // Destroyed
    ],
  },
]
