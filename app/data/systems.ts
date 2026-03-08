export interface StarSystem {
  id: string
  name: string
  x: number  // light-years from Sol, projected 2D
  y: number
  notable?: string  // optional note
}

export const systems: StarSystem[] = [
  { id: 'sol', name: 'Sol', x: 0, y: 0 },
  { id: 'epsilon_eridani', name: 'Epsilon Eridani', x: 6, y: -8, notable: 'Vulcan (Deltan homeworld)' },
  { id: 'eta_cassiopeiae', name: 'Eta Cassiopeiae', x: 13, y: 11, notable: 'Pav homeworld' },
  { id: 'delta_eridani', name: 'Delta Eridani', x: 18, y: -20 },
  { id: 'gliese_877', name: 'Gliese 877', x: -16, y: 12 },
  { id: 'heavens_river', name: "Heaven's River", x: 32, y: 4, notable: 'Quinlan megastructure' },
]

export const systemMap = Object.fromEntries(systems.map((s) => [s.id, s]))

// Maps location strings from events to system ids
export const locationToSystemId: Record<string, string> = {
  'Earth': 'sol',
  'Earth Orbit': 'sol',
  'Sol System': 'sol',
  'Sol System (outbound)': 'sol',
  'Human Colonies': 'sol',
  'Epsilon Eridani': 'epsilon_eridani',
  'Epsilon Eridani orbit': 'epsilon_eridani',
  'Vulcan': 'epsilon_eridani',
  'Vulcan (Epsilon Eridani)': 'epsilon_eridani',
  'Eta Cassiopeiae': 'eta_cassiopeiae',
  'Artifact Site': 'eta_cassiopeiae',
  'New Pav': 'eta_cassiopeiae',
  'Delta Eridani': 'delta_eridani',
  'Gliese 877': 'gliese_877',
  "Heaven's River": 'heavens_river',
  "Heaven's River (captive)": 'heavens_river',
  'Nearby System': 'heavens_river',
}
// Locations not in this map (Deep Space, Unknown, Multiple Systems, etc.)
// are treated as "in transit" and the Bob's dot is hidden
