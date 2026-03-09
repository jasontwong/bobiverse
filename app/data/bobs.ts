export interface Bob {
  id: string
  name: string
  color: string
  description: string
}

export const bobs: Bob[] = [
  { id: 'bob',      name: 'Bob',      color: '#0ea5e9', description: 'Original Bob Johansson — explores Delta Eridani, watches over the Deltans' },
  { id: 'riker',    name: 'Riker',    color: '#f97316', description: '1st gen — leads Earth rescue missions, defeats Brazilian forces' },
  { id: 'homer',    name: 'Homer',    color: '#f43f5e', description: '1st gen — assists Riker on the Sol/Earth rescue operations' },
  { id: 'bill',     name: 'Bill',     color: '#10b981', description: '1st gen — runs Skunk Works, develops SCUT comms, stays at Epsilon Eridani as hub' },
  { id: 'marvin',   name: 'Marvin',   color: '#6366f1', description: '1st gen — stays at Delta Eridani with Bob, supports Deltan tribe' },
  { id: 'luke',     name: 'Luke',     color: '#84cc16', description: '1st gen — travels to Kappa Ceti, finds a super-Earth, spawns many copies' },
  { id: 'neil',     name: 'Neil',     color: '#0891b2', description: '1st gen — finds and repairs an Others ship, ferries human survivors' },
  { id: 'bender',   name: 'Bender',   color: '#8b5cf6', description: '1st gen — disappears investigating Eta Leporis, found captive in Heaven\'s River' },
  { id: 'calvin',   name: 'Calvin',   color: '#06b6d4', description: '2nd gen (Bill\'s clone) — leads Alpha Centauri mission with Goku, destroys Medeiros auto-factory' },
  { id: 'garfield', name: 'Garfield', color: '#eab308', description: '2nd gen (Bill\'s clone) — co-develops SCUT with Bill, Alpha Centauri operations' },
  { id: 'thor',     name: 'Thor',     color: '#dc2626', description: '2nd gen (Calvin\'s clone) — key strategist in battles against The Others, develops gamma-ray shielding' },
  { id: 'howard',   name: 'Howard',   color: '#ec4899', description: 'Later gen — explores deep space, marries Bridget, infiltrates Dragon civilization in Book 5' },
  { id: 'marcus',   name: 'Marcus',   color: '#65a30d', description: 'Later gen — stationed on Poseidon, designs floating cities to evade Krakens' },
  { id: 'lenny',    name: 'Lenny',    color: '#be185d', description: 'Later gen — leads the Starfleet faction of Bobs' },
  { id: 'icarus',   name: 'Icarus',   color: '#d97706', description: 'Later gen (Bill\'s line) — embarks on 26,000-year journey to galactic core with Daedalus' },
  { id: 'daedalus', name: 'Daedalus', color: '#7c3aed', description: 'Later gen (Bill\'s line) — galactic core mission with Icarus, supervises first planet-moving test' },
]

export const bobMap = Object.fromEntries(bobs.map((b) => [b.id, b]))
