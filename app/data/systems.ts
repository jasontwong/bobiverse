export interface StarSystem {
  id: string
  name: string
  x: number  // light-years from Sol, projected 2D
  y: number
  notable?: string
}

export const systems: StarSystem[] = [
  { id: 'sol', name: 'Sol', x: 0, y: 0 },
  { id: 'epsilon_eridani', name: 'Epsilon Eridani', x: 6, y: -8, notable: 'Vulcan colony' },
  { id: 'delta_eridani', name: 'Delta Eridani', x: 10, y: -12, notable: 'Deltan homeworld' },
  { id: 'eta_cassiopeiae', name: 'Eta Cassiopeiae', x: 13, y: 11 },
  { id: 'delta_pavonis', name: 'Delta Pavonis', x: -8, y: -18, notable: 'Pav homeworld' },
  { id: 'gliese_877', name: 'Gliese 877', x: -16, y: 12 },
  { id: 'eta_leporis', name: 'Eta Leporis', x: 38, y: -8, notable: "Heaven's River" },
]

export const systemMap = Object.fromEntries(systems.map((s) => [s.id, s]))

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
  'Delta Eridani': 'delta_eridani',
  'Vulcan (Delta Eridani)': 'delta_eridani',
  'Eta Cassiopeiae': 'eta_cassiopeiae',
  'Artifact Site': 'eta_cassiopeiae',
  'Delta Pavonis': 'delta_pavonis',
  'New Pav': 'delta_pavonis',
  'Gliese 877': 'gliese_877',
  "Heaven's River": 'eta_leporis',
  "Heaven's River (captive)": 'eta_leporis',
  'Eta Leporis': 'eta_leporis',
  'Nearby System': 'eta_leporis',
}
