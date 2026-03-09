export interface StarSystem {
  id: string
  name: string
  x: number  // light-years from Sol, projected 2D
  y: number
  notable?: string
}

export const systems: StarSystem[] = [
  { id: 'sol',              name: 'Sol',              x: 0,    y: 0,   notable: 'Human homeworld' },
  { id: 'alpha_centauri',   name: 'Alpha Centauri',   x: 2,    y: -3  },
  { id: 'epsilon_eridani',  name: 'Epsilon Eridani',  x: 6,    y: -8,  notable: 'Vulcan colony, Skunk Works' },
  { id: 'delta_eridani',    name: 'Delta Eridani',    x: 10,   y: -12, notable: 'Deltan homeworld' },
  { id: 'epsilon_indi',     name: 'Epsilon Indi',     x: 4,    y: -11 },
  { id: 'kappa_ceti',       name: 'Kappa Ceti',       x: -5,   y: -9  },
  { id: 'eridani_82',       name: '82 Eridani',       x: 12,   y: -18 },
  { id: 'eta_cassiopeiae',  name: 'Eta Cassiopeiae',  x: 13,   y: 11  },
  { id: 'delta_pavonis',    name: 'Delta Pavonis',    x: -8,   y: -18, notable: 'Pav homeworld' },
  { id: 'gliese_877',       name: 'Gliese 877',       x: -16,  y: 12  },
  { id: 'poseidon',         name: 'Poseidon',         x: -12,  y: -6,  notable: 'Ocean world, Kraken' },
  { id: 'eta_leporis',      name: 'Eta Leporis',      x: 38,   y: -8,  notable: "Heaven's River" },
]

export const systemMap = Object.fromEntries(systems.map((s) => [s.id, s]))

export const locationToSystemId: Record<string, string> = {
  'Earth':                       'sol',
  'Earth Orbit':                 'sol',
  'Sol System':                  'sol',
  'Sol System (outbound)':       'sol',
  'Human Colonies':              'sol',
  'Alpha Centauri':              'alpha_centauri',
  'Epsilon Eridani':             'epsilon_eridani',
  'Epsilon Eridani orbit':       'epsilon_eridani',
  'Vulcan':                      'epsilon_eridani',
  'Vulcan (Epsilon Eridani)':    'epsilon_eridani',
  'Skunk Works':                 'epsilon_eridani',
  'Delta Eridani':               'delta_eridani',
  'Vulcan (Delta Eridani)':      'delta_eridani',
  'Epsilon Indi':                'epsilon_indi',
  'Kappa Ceti':                  'kappa_ceti',
  '82 Eridani':                  'eridani_82',
  'Eta Cassiopeiae':             'eta_cassiopeiae',
  'Artifact Site':               'eta_cassiopeiae',
  'Delta Pavonis':               'delta_pavonis',
  'New Pav':                     'delta_pavonis',
  'Gliese 877':                  'gliese_877',
  'Poseidon':                    'poseidon',
  "Heaven's River":              'eta_leporis',
  "Heaven's River (captive)":    'eta_leporis',
  'Eta Leporis':                 'eta_leporis',
  'Nearby System':               'eta_leporis',
}
