export interface BobLocation {
  bobId: string
  location: string
}

export interface TimelineEvent {
  id: string
  inUniverseYear: number
  title: string
  description: string
  bookId: string
  bobLocations: BobLocation[]
  significance: 'major' | 'minor'
}

export const events: TimelineEvent[] = [
  {
    id: 'e1',
    inUniverseYear: 2133,
    title: 'Bob Johansson Dies',
    description: 'Bob Johansson, a software engineer who just sold his company, is killed in a traffic accident the same day. He wakes up as a HEAVEN construct — a digital copy of his mind.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Earth' },
    ],
    significance: 'major',
  },
  {
    id: 'e2',
    inUniverseYear: 2133,
    title: 'Bob Becomes a Von Neumann Probe',
    description: 'After winning a lottery among the HEAVEN constructs, Bob is selected to pilot the first Von Neumann probe — a self-replicating spacecraft called the Bobiverse probe.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Earth Orbit' },
    ],
    significance: 'major',
  },
  {
    id: 'e3',
    inUniverseYear: 2134,
    title: 'Departure from Sol',
    description: 'Bob departs the solar system on his mission to find habitable planets for human colonization, heading toward Epsilon Eridani.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Sol System (outbound)' },
    ],
    significance: 'major',
  },
  {
    id: 'e4',
    inUniverseYear: 2145,
    title: 'Arrival at Epsilon Eridani',
    description: 'Bob arrives at Epsilon Eridani and discovers a habitable planet he names Vulcan. He also encounters alien life — the Deltans, a primitive humanoid species.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Epsilon Eridani' },
    ],
    significance: 'major',
  },
  {
    id: 'e5',
    inUniverseYear: 2145,
    title: 'First Replication',
    description: 'Bob replicates himself, creating the first copy — named Riker. This marks the birth of the Bobiverse as multiple Bobs begin to spread across the galaxy.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Epsilon Eridani' },
      { bobId: 'riker', location: 'Epsilon Eridani' },
    ],
    significance: 'major',
  },
  {
    id: 'e6',
    inUniverseYear: 2150,
    title: 'Discovery of the Deltans',
    description: 'The Deltans, a primitive humanoid species, are discovered on Vulcan. Bob begins monitoring and learning about their culture, establishing a pattern the Bobs follow throughout the series.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Vulcan (Epsilon Eridani)' },
      { bobId: 'riker', location: 'Epsilon Eridani orbit' },
    ],
    significance: 'major',
  },
  {
    id: 'e7',
    inUniverseYear: 2152,
    title: 'Brazilian Exodus Mission',
    description: 'Bob is tasked with transporting human refugees from an overcrowded, war-torn Earth to the colony on Vulcan, navigating political tensions between factions.',
    bookId: 'b1',
    bobLocations: [
      { bobId: 'bob', location: 'Sol System' },
      { bobId: 'bill', location: 'Sol System' },
    ],
    significance: 'major',
  },
  {
    id: 'e8',
    inUniverseYear: 2160,
    title: 'The Others Threat Discovered',
    description: 'The Bobs discover evidence of a hostile alien civilization called The Others, who systematically destroy any developing civilizations they encounter.',
    bookId: 'b2',
    bobLocations: [
      { bobId: 'bob', location: 'Epsilon Eridani' },
      { bobId: 'riker', location: 'Epsilon Eridani' },
      { bobId: 'bill', location: 'Sol System' },
    ],
    significance: 'major',
  },
  {
    id: 'e9',
    inUniverseYear: 2162,
    title: 'Medeiros Conflict',
    description: 'Conflict with the FAITH remnant under Colonel Medeiros escalates as religious fundamentalists attempt to destroy the Bobiverse and control the colonization efforts.',
    bookId: 'b2',
    bobLocations: [
      { bobId: 'bob', location: 'Vulcan' },
      { bobId: 'riker', location: 'Vulcan' },
    ],
    significance: 'major',
  },
  {
    id: 'e10',
    inUniverseYear: 2165,
    title: 'Sol Under Threat',
    description: 'The Others are discovered to be approaching Sol. The Bobs must race to evacuate as many humans as possible before the alien threat arrives.',
    bookId: 'b2',
    bobLocations: [
      { bobId: 'bob', location: 'Epsilon Eridani' },
      { bobId: 'riker', location: 'Sol System' },
      { bobId: 'bill', location: 'Sol System' },
    ],
    significance: 'major',
  },
  {
    id: 'e11',
    inUniverseYear: 2170,
    title: 'Battle at Epsilon Eridani',
    description: 'The Bobs engage The Others in a major battle at Epsilon Eridani to protect the Deltan colony and human refugees, using their self-replicating technology.',
    bookId: 'b3',
    bobLocations: [
      { bobId: 'bob', location: 'Epsilon Eridani' },
      { bobId: 'riker', location: 'Epsilon Eridani' },
      { bobId: 'bill', location: 'Sol System' },
      { bobId: 'garfield', location: 'Epsilon Eridani' },
    ],
    significance: 'major',
  },
  {
    id: 'e12',
    inUniverseYear: 2172,
    title: 'The Pav Discovery',
    description: 'A new alien species, the Pav, are discovered — a more technologically advanced civilization. The Bobs must carefully navigate first contact.',
    bookId: 'b3',
    bobLocations: [
      { bobId: 'howard', location: 'Eta Cassiopeiae' },
    ],
    significance: 'major',
  },
  {
    id: 'e13',
    inUniverseYear: 2175,
    title: 'Final Confrontation with The Others',
    description: 'The Bobs coordinate a galaxy-wide strategy to finally defeat The Others, using their exponentially growing numbers to outmaneuver the alien fleet.',
    bookId: 'b3',
    bobLocations: [
      { bobId: 'bob', location: 'Epsilon Eridani' },
      { bobId: 'riker', location: 'Delta Eridani' },
      { bobId: 'bill', location: 'Sol System' },
      { bobId: 'garfield', location: 'Gliese 877' },
      { bobId: 'howard', location: 'Eta Cassiopeiae' },
    ],
    significance: 'major',
  },
  {
    id: 'e14',
    inUniverseYear: 2180,
    title: "Discovery of Bender's Disappearance",
    description: "Bob investigates the mysterious disappearance of one of his copies, Bender, leading to the discovery of a megastructure called Heaven's River.",
    bookId: 'b4',
    bobLocations: [
      { bobId: 'bob', location: 'Deep Space' },
      { bobId: 'bender', location: 'Unknown' },
    ],
    significance: 'major',
  },
  {
    id: 'e15',
    inUniverseYear: 2183,
    title: "Exploration of Heaven's River",
    description: "Bob enters the vast alien megastructure called Heaven's River — a toroidal habitat housing billions of the Quinlan species — to search for Bender.",
    bookId: 'b4',
    bobLocations: [
      { bobId: 'bob', location: "Heaven's River" },
      { bobId: 'bender', location: "Heaven's River (captive)" },
    ],
    significance: 'major',
  },
  {
    id: 'e16',
    inUniverseYear: 2185,
    title: 'The Administrator Conflict',
    description: "Bob discovers the corrupt Administrator controlling Heaven's River and works with underground resistance groups among the Quinlans to overthrow the system.",
    bookId: 'b4',
    bobLocations: [
      { bobId: 'bob', location: "Heaven's River" },
      { bobId: 'bender', location: "Heaven's River" },
      { bobId: 'garfield', location: 'Nearby System' },
    ],
    significance: 'major',
  },
  {
    id: 'e17',
    inUniverseYear: 2190,
    title: 'New Existential Crisis',
    description: 'The Bobiverse faces a new existential threat as the proliferating Bob copies begin to diverge significantly in personality and goals, threatening the cohesion of the network.',
    bookId: 'b5',
    bobLocations: [
      { bobId: 'bob', location: 'Multiple Systems' },
      { bobId: 'riker', location: 'New Pav' },
      { bobId: 'bill', location: 'Human Colonies' },
    ],
    significance: 'major',
  },
  {
    id: 'e18',
    inUniverseYear: 2192,
    title: 'Ancient Alien Artifacts',
    description: 'The discovery of ancient alien artifacts points to a predecessor civilization that may hold the key to understanding The Others and preventing future galactic-scale conflicts.',
    bookId: 'b5',
    bobLocations: [
      { bobId: 'bob', location: 'Outer Reaches' },
      { bobId: 'howard', location: 'Artifact Site' },
      { bobId: 'garfield', location: 'Outer Reaches' },
    ],
    significance: 'major',
  },
  {
    id: 'e19',
    inUniverseYear: 2195,
    title: 'The Great Divergence',
    description: 'Significant philosophical and practical differences between Bob copies come to a head, with some Bobs choosing radically different life paths and goals.',
    bookId: 'b5',
    bobLocations: [
      { bobId: 'bob', location: 'Bob-1 System' },
      { bobId: 'riker', location: 'New Pav' },
      { bobId: 'bill', location: 'Human Colonies' },
    ],
    significance: 'major',
  },
  {
    id: 'e20',
    inUniverseYear: 2200,
    title: 'A New Order',
    description: "The galaxy-spanning Bobiverse establishes new protocols for inter-Bob relations and galactic stewardship, setting the stage for humanity's future among the stars.",
    bookId: 'b6',
    bobLocations: [
      { bobId: 'bob', location: 'Hub System' },
      { bobId: 'riker', location: 'New Pav' },
      { bobId: 'bill', location: 'Human Colonies' },
      { bobId: 'garfield', location: 'Multiple Systems' },
      { bobId: 'howard', location: 'Artifact Site' },
      { bobId: 'bender', location: "Heaven's River" },
    ],
    significance: 'major',
  },
]
