// ============================================================
// BELIEVE — Opportunities Extended Data
// ============================================================

export interface HackathonEvent {
  id: string
  name: string
  organizer: string
  url: string
  startDate: string
  endDate: string
  prizePool: string
  format: 'online' | 'in-person' | 'hybrid'
  ecosystem: string[]
  tracks: string[]
  difficulty: 'beginner-friendly' | 'intermediate' | 'advanced'
  perks: string[]
  description: string
  color: string
  icon: string
  isRecurring: boolean
  registrationUrl: string
}

export const HACKATHON_EVENTS: HackathonEvent[] = [
  {
    id: 'ethglobal-sf',
    name: 'ETHGlobal San Francisco',
    organizer: 'ETHGlobal',
    url: 'https://ethglobal.com/events',
    startDate: '2025-10-17',
    endDate: '2025-10-19',
    prizePool: '$350,000+',
    format: 'in-person',
    ecosystem: ['Ethereum', 'L2s', 'DeFi', 'AI x Crypto'],
    tracks: ['DeFi', 'Consumer', 'Infrastructure', 'AI x Crypto', 'Gaming'],
    difficulty: 'intermediate',
    perks: ['VC exposure', 'Mentorship', 'Travel stipends', 'Side events', 'Job offers'],
    description: 'The flagship ETHGlobal event in San Francisco. Top protocols sponsor tracks. Best way to get noticed by a16z, Paradigm, and top crypto VCs.',
    color: '#6366f1',
    icon: '🌉',
    isRecurring: true,
    registrationUrl: 'https://ethglobal.com/events',
  },
  {
    id: 'ethglobal-online',
    name: 'ETHGlobal Online',
    organizer: 'ETHGlobal',
    url: 'https://ethglobal.com/events',
    startDate: '2025-11-07',
    endDate: '2025-11-09',
    prizePool: '$200,000+',
    format: 'online',
    ecosystem: ['Ethereum', 'Sui', 'Multi-chain'],
    tracks: ['DeFi', 'ZK', 'Account Abstraction', 'Consumer'],
    difficulty: 'beginner-friendly',
    perks: ['Async participation', 'Global teams', 'Free for all', 'Online mentorship'],
    description: 'ETHGlobal\'s online format. Build from anywhere. Open to developers globally including Africa. Great entry point into the ETHGlobal ecosystem.',
    color: '#6366f1',
    icon: '🌐',
    isRecurring: true,
    registrationUrl: 'https://ethglobal.com/events',
  },
  {
    id: 'dorahacks-open',
    name: 'DoraHacks Global Hackathon',
    organizer: 'DoraHacks',
    url: 'https://dorahacks.io/hackathon',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    prizePool: 'Varies per event',
    format: 'online',
    ecosystem: ['Multi-chain', 'AI', 'Quantum', 'BioTech'],
    tracks: ['AI', 'Web3', 'Open Source', 'Frontier Tech'],
    difficulty: 'beginner-friendly',
    perks: ['Multiple simultaneous events', 'Community voting', 'BUIDL rewards', 'Rolling deadlines'],
    description: 'DoraHacks runs multiple hackathons simultaneously. Always something active. Great for African developers — fully online, rewards paid globally.',
    color: '#f97316',
    icon: '🔥',
    isRecurring: true,
    registrationUrl: 'https://dorahacks.io/hackathon',
  },
  {
    id: 'solana-breakpoint',
    name: 'Solana Breakpoint Hackathon',
    organizer: 'Solana Foundation',
    url: 'https://solana.com/hackathon',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    prizePool: '$1,000,000+',
    format: 'hybrid',
    ecosystem: ['Solana'],
    tracks: ['DeFi', 'Consumer', 'DePIN', 'Gaming', 'AI on Solana', 'Infrastructure'],
    difficulty: 'intermediate',
    perks: ['Massive prizes', 'Superteam support', 'VC connections', 'Ecosystem grants path'],
    description: 'Annual Solana mega-hackathon. Build on Solana for life-changing prizes. Nigerian and African devs have won Solana hackathons before.',
    color: '#9945ff',
    icon: '◎',
    isRecurring: true,
    registrationUrl: 'https://solana.com/hackathon',
  },
  {
    id: 'chainlink-constellation',
    name: 'Chainlink Constellation',
    organizer: 'Chainlink',
    url: 'https://chain.link/hackathon',
    startDate: '2025-10-15',
    endDate: '2025-11-15',
    prizePool: '$300,000+',
    format: 'online',
    ecosystem: ['Multi-chain', 'Chainlink'],
    tracks: ['DeFi', 'Cross-chain', 'AI x Oracles', 'Data', 'Gaming'],
    difficulty: 'intermediate',
    perks: ['Chainlink oracle credits', 'Expert mentorship', 'Ecosystem grants path'],
    description: 'Chainlink\'s flagship developer competition. Build hybrid smart contracts using oracles, CCIP, VRF, and Data Feeds.',
    color: '#375bd2',
    icon: '🔗',
    isRecurring: true,
    registrationUrl: 'https://chain.link/hackathon',
  },
  {
    id: 'easya-consensus',
    name: 'EasyA x Consensus Hackathon',
    organizer: 'EasyA',
    url: 'https://easya.io/hackathons',
    startDate: '2026-05-01',
    endDate: '2026-05-03',
    prizePool: '$50,000+',
    format: 'in-person',
    ecosystem: ['Multi-chain'],
    tracks: ['Open', 'DeFi', 'Consumer', 'Web3 Gaming'],
    difficulty: 'beginner-friendly',
    perks: ['Co-located with Consensus conference', 'Networking', 'Great for first-timers'],
    description: 'EasyA runs beginner-friendly hackathons co-located with major Web3 conferences. Perfect for first-time hackathon participants.',
    color: '#10b981',
    icon: '🎓',
    isRecurring: true,
    registrationUrl: 'https://easya.io/hackathons',
  },
]

export interface GrantProgram {
  id: string
  name: string
  organization: string
  icon: string
  color: string
  url: string
  maxAmount: string
  minAmount: string
  ecosystem: string[]
  categories: string[]
  structure: string
  timeline: string
  difficulty: 'easy' | 'moderate' | 'competitive'
  requirements: string[]
  tips: string[]
  description: string
}

export const GRANT_PROGRAMS: GrantProgram[] = [
  {
    id: 'ef-grants',
    name: 'Ethereum Foundation Grants',
    organization: 'Ethereum Foundation',
    icon: '🔷',
    color: '#627eea',
    url: 'https://ethereum.foundation/grants/',
    maxAmount: '$500,000+',
    minAmount: '$5,000',
    ecosystem: ['Ethereum'],
    categories: ['Research', 'Open-source tooling', 'Client development', 'ZK research', 'Education'],
    structure: 'Milestone-based, rolling applications',
    timeline: '2–4 months to decision',
    difficulty: 'competitive',
    requirements: ['Open-source commitment', 'Clear technical scope', 'Team credentials', 'Measurable impact'],
    tips: ['Focus on public goods, not commercial', 'Show prior contributions to Ethereum', 'Be specific about deliverables', 'Apply early — rolling decisions'],
    description: 'The most prestigious Ethereum grant. High bar but no equity taken. Best for researchers, client teams, and open-source tooling builders.',
  },
  {
    id: 'superteam-microgrants',
    name: 'Superteam Microgrants',
    organization: 'Superteam / Solana Foundation',
    icon: '◎',
    color: '#9945ff',
    url: 'https://earn.superteam.fun',
    maxAmount: '$10,000',
    minAmount: '$500',
    ecosystem: ['Solana'],
    categories: ['Tooling', 'Content', 'Events', 'Education', 'Developer experience'],
    structure: 'Fast approval, weekly review',
    timeline: '1–2 weeks to decision',
    difficulty: 'easy',
    requirements: ['Solana focus', 'Clear deliverable', 'Public output (content, tool, event)'],
    tips: ['Very beginner-friendly', 'Content grants are easiest to get', 'Nigeria has an active Superteam chapter', 'Apply even if you think it\'s too small'],
    description: 'Best grant for getting started. Fast, small, and beginner-friendly. The Superteam Nigeria chapter is very active — great network for African devs.',
  },
  {
    id: 'web3-foundation',
    name: 'Web3 Foundation Grants',
    organization: 'Web3 Foundation',
    icon: '⚫',
    color: '#e6007a',
    url: 'https://grants.web3.foundation',
    maxAmount: '$100,000',
    minAmount: '$10,000',
    ecosystem: ['Polkadot', 'Kusama'],
    categories: ['Dev tools', 'Infrastructure', 'DeFi', 'Governance', 'Bridges'],
    structure: 'Milestone-based, GitHub-tracked',
    timeline: '4–8 weeks to decision',
    difficulty: 'moderate',
    requirements: ['Open-source', 'Polkadot/Substrate relevance', 'Technical spec', 'GitHub deliverables'],
    tips: ['Very transparent process — all applications on GitHub', 'Read accepted applications to calibrate scope', 'ink! smart contract projects welcome', 'Team > solo for larger amounts'],
    description: 'Structured, transparent grants process. All applications are public on GitHub. Strong support for Substrate and Polkadot ecosystem tools.',
  },
  {
    id: 'gitcoin',
    name: 'Gitcoin Grants',
    organization: 'Gitcoin',
    icon: '🌱',
    color: '#02E2AC',
    url: 'https://grants.gitcoin.co',
    maxAmount: 'Community-determined',
    minAmount: '$0',
    ecosystem: ['Ethereum', 'Multi-chain'],
    categories: ['Public goods', 'Open source', 'Education', 'DeSci', 'Climate'],
    structure: 'Quadratic funding rounds (quarterly)',
    timeline: 'Per round (2-week campaigns)',
    difficulty: 'easy',
    requirements: ['Public GitHub', 'Community following helps', 'Clear description', 'Open source preferred'],
    tips: ['Build community first — QF rewards breadth over depth', 'Promote your grant during the round', 'Previous rounds visible for inspiration', 'Good for education and tooling projects'],
    description: 'Quadratic funding means many small donations are amplified. Best for community-oriented projects. Build your audience before a round opens.',
  },
  {
    id: 'arbitrum-grants',
    name: 'Arbitrum Foundation Grants',
    organization: 'Arbitrum Foundation',
    icon: '🔵',
    color: '#12aaff',
    url: 'https://arbitrum.foundation/grants',
    maxAmount: '$250,000',
    minAmount: '$5,000',
    ecosystem: ['Arbitrum'],
    categories: ['DeFi', 'Gaming', 'Infrastructure', 'Community', 'Developer tooling'],
    structure: 'Milestone-based, rolling',
    timeline: '6–10 weeks to decision',
    difficulty: 'moderate',
    requirements: ['Deploy on Arbitrum', 'Milestone plan', 'Team doxxed or pseudonymous with history'],
    tips: ['Gaming and consumer apps favored right now', 'Show traction or prior work', 'Stylus (Rust) projects have less competition', 'Apply for smaller amount to start'],
    description: 'Growing grants program. Gaming and DeFi are top priorities. Stylus (Rust/WASM contracts) projects have a real edge — less competition.',
  },
  {
    id: 'aptos-grants',
    name: 'Aptos Foundation Grants',
    organization: 'Aptos Foundation',
    icon: '🔺',
    color: '#00d4a0',
    url: 'https://aptosfoundation.org/grants',
    maxAmount: '$150,000',
    minAmount: '$5,000',
    ecosystem: ['Aptos'],
    categories: ['DeFi', 'Payments', 'Tooling', 'Education', 'Infrastructure'],
    structure: 'Milestone-based, two tracks (Ecosystem & Payments)',
    timeline: '4–8 weeks',
    difficulty: 'moderate',
    requirements: ['Move language or Aptos-compatible', 'Milestone plan', 'Clear ecosystem impact'],
    tips: ['Payments track has higher budgets ($150K)', 'Less competition than Ethereum grants', 'Move language experience is a plus', 'Education grants available too'],
    description: 'Two grant tracks. Ecosystem grants for tooling and dApps, Payments grants for payment infrastructure. Good opportunity with less competition.',
  },
]

export interface Fellowship {
  id: string
  name: string
  organization: string
  icon: string
  color: string
  url: string
  stipend: string
  duration: string
  format: string
  focus: string[]
  requirements: string[]
  description: string
  applicationUrl: string
}

export const FELLOWSHIPS: Fellowship[] = [
  {
    id: 'ef-fellowship',
    name: 'Ethereum Foundation Fellowship',
    organization: 'Ethereum Foundation',
    icon: '🔷',
    color: '#627eea',
    url: 'https://fellowship.ethereum.foundation',
    stipend: 'Paid stipend',
    duration: '6 months',
    format: 'Remote',
    focus: ['Research', 'Protocol development', 'Client engineering', 'ZK research'],
    requirements: ['Strong technical background', 'Passion for Ethereum', 'Prior contributions preferred'],
    description: 'Work directly on Ethereum protocol research and development. Resume-defining. One of the most competitive positions in crypto.',
    applicationUrl: 'https://fellowship.ethereum.foundation',
  },
  {
    id: 'superteam-fellowship',
    name: 'Superteam Fellowship',
    organization: 'Superteam',
    icon: '◎',
    color: '#9945ff',
    url: 'https://superteam.fun',
    stipend: '$1,000–$3,000/month',
    duration: '3 months',
    format: 'Remote, region-specific',
    focus: ['Solana development', 'Content creation', 'Community building', 'Design'],
    requirements: ['Solana interest', 'Active in local community', 'Portfolio or work samples'],
    description: 'Build in the Solana ecosystem with support from Superteam. Strong Nigeria chapter. Real pathway to full-time crypto work.',
    applicationUrl: 'https://superteam.fun',
  },
  {
    id: 'buidlguidl',
    name: 'BuidlGuidl Membership',
    organization: 'BuidlGuidl',
    icon: '🏗️',
    color: '#f59e0b',
    url: 'https://buidlguidl.com',
    stipend: 'Stream payments for contributions',
    duration: 'Ongoing',
    format: 'Remote',
    focus: ['Ethereum', 'Scaffold-ETH', 'Open source', 'Developer education'],
    requirements: ['Complete SpeedRunEthereum challenges', 'Active builder', 'Open source contributions'],
    description: 'Austin Griffith\'s elite Ethereum builder collective. Earn ETH streams for open-source contributions. Best path from learner to paid contributor.',
    applicationUrl: 'https://speedrunethereum.com',
  },
]
