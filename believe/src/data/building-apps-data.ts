// ============================================================
// BELIEVE — Building Applications Data
// ============================================================

export interface DevTool {
  id: string
  name: string
  icon: string
  color: string
  category: string
  tagline: string
  description: string
  url: string
  docsUrl: string
  githubUrl?: string
  type: 'framework' | 'library' | 'tool' | 'infrastructure' | 'language'
  language: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  stars?: string
  usedBy: string[]
  bestFor: string[]
  pros: string[]
  cons: string[]
  installCmd?: string
  tags: string[]
}

export const DEV_TOOLS: DevTool[] = [
  // ── SMART CONTRACT TOOLS ─────────────────────────────────
  {
    id: 'foundry',
    name: 'Foundry',
    icon: '⚒️',
    color: '#f97316',
    category: 'Smart Contract Dev',
    tagline: 'Blazing fast Ethereum toolkit',
    description: 'The industry-standard Ethereum development toolkit. Forge for testing (in Solidity!), Cast for blockchain interactions, Anvil for local node, Chisel for REPL.',
    url: 'https://book.getfoundry.sh',
    docsUrl: 'https://book.getfoundry.sh',
    githubUrl: 'https://github.com/foundry-rs/foundry',
    type: 'tool',
    language: ['Solidity', 'Shell'],
    difficulty: 'intermediate',
    stars: '8k+',
    usedBy: ['Uniswap', 'Aave', 'Compound', 'Cyfrin'],
    bestFor: ['Solidity testing', 'Fuzzing', 'Scripting deployments', 'Forking mainnet'],
    pros: ['Write tests in Solidity', 'Blazing fast', 'Built-in fuzzing', 'Industry standard'],
    cons: ['Steeper learning curve than Hardhat', 'Less JS ecosystem integration'],
    installCmd: 'curl -L https://foundry.paradigm.xyz | bash',
    tags: ['forge', 'anvil', 'cast', 'testing', 'fuzzing', 'solidity'],
  },
  {
    id: 'hardhat',
    name: 'Hardhat',
    icon: '👷',
    color: '#fbbf24',
    category: 'Smart Contract Dev',
    tagline: 'Ethereum development environment',
    description: 'The JavaScript-first Ethereum dev environment. Compile, test, and deploy with TypeScript. Huge plugin ecosystem. Better for full-stack JS developers.',
    url: 'https://hardhat.org',
    docsUrl: 'https://hardhat.org/docs',
    githubUrl: 'https://github.com/NomicFoundation/hardhat',
    type: 'tool',
    language: ['JavaScript', 'TypeScript'],
    difficulty: 'beginner',
    stars: '7k+',
    usedBy: ['OpenZeppelin', 'Chainlink', 'ENS'],
    bestFor: ['JS/TS devs', 'Existing JS projects', 'Hardhat plugins', 'Quick prototyping'],
    pros: ['JS/TS native', 'Great plugin ecosystem', 'console.log in Solidity', 'Beginner friendly'],
    cons: ['Slower than Foundry', 'Tests in JS not Solidity'],
    installCmd: 'npm install --save-dev hardhat',
    tags: ['ethereum', 'javascript', 'typescript', 'testing', 'deployment'],
  },
  {
    id: 'openzeppelin',
    name: 'OpenZeppelin Contracts',
    icon: '🛡️',
    color: '#4f46e5',
    category: 'Smart Contract Libraries',
    tagline: 'Battle-tested smart contract library',
    description: 'The standard library for secure smart contracts. ERC20, ERC721, ERC1155, AccessControl, Ownable, upgradeable contracts, Governor for DAOs. Never write these from scratch.',
    url: 'https://openzeppelin.com/contracts',
    docsUrl: 'https://docs.openzeppelin.com/contracts',
    githubUrl: 'https://github.com/OpenZeppelin/openzeppelin-contracts',
    type: 'library',
    language: ['Solidity'],
    difficulty: 'beginner',
    stars: '25k+',
    usedBy: ['Uniswap', 'Compound', 'Aave', 'Almost every DeFi protocol'],
    bestFor: ['ERC standards', 'Access control', 'Upgradeable contracts', 'DAO governance'],
    pros: ['Audited and battle-tested', 'Industry standard', 'Comprehensive', 'Regular updates'],
    cons: ['Can add contract size', 'Sometimes over-engineered for simple cases'],
    installCmd: 'npm install @openzeppelin/contracts',
    tags: ['erc20', 'erc721', 'access-control', 'upgradeable', 'security'],
  },
  // ── FRONTEND WEB3 ────────────────────────────────────────
  {
    id: 'wagmi',
    name: 'Wagmi',
    icon: '🪝',
    color: '#6366f1',
    category: 'Frontend Web3',
    tagline: 'React hooks for Ethereum',
    description: 'The standard React library for Ethereum. Type-safe hooks for wallet connection, contract reads/writes, account management, ENS. Used by top dApps globally.',
    url: 'https://wagmi.sh',
    docsUrl: 'https://wagmi.sh/react/getting-started',
    githubUrl: 'https://github.com/wagmi-dev/wagmi',
    type: 'library',
    language: ['TypeScript', 'React'],
    difficulty: 'intermediate',
    stars: '5.5k+',
    usedBy: ['Uniswap', 'ENS', 'Coinbase', 'Rainbow'],
    bestFor: ['React dApps', 'Type-safe contract calls', 'Wallet management', 'Multi-chain apps'],
    pros: ['Type-safe', 'Great DX', 'Auto-generates types from ABI', 'Large ecosystem'],
    cons: ['React only', 'Config can be complex', 'Version migrations are breaking'],
    installCmd: 'npm install wagmi viem @tanstack/react-query',
    tags: ['react', 'hooks', 'wallet', 'typescript', 'ethereum', 'type-safe'],
  },
  {
    id: 'viem',
    name: 'Viem',
    icon: '⚡',
    color: '#8b5cf6',
    category: 'Frontend Web3',
    tagline: 'TypeScript interface for Ethereum',
    description: 'Low-level, modular, type-safe Ethereum library. Replacement for ethers.js. Used by Wagmi under the hood. Better TypeScript support, smaller bundle, faster.',
    url: 'https://viem.sh',
    docsUrl: 'https://viem.sh/docs/introduction',
    githubUrl: 'https://github.com/wagmi-dev/viem',
    type: 'library',
    language: ['TypeScript'],
    difficulty: 'intermediate',
    stars: '2.5k+',
    usedBy: ['Wagmi', 'Rainbow', 'Base'],
    bestFor: ['Type-safe Ethereum interactions', 'Server-side Ethereum', 'Modern TS projects'],
    pros: ['Best TypeScript support', 'Modular and tree-shakeable', 'Fast', 'Modern API'],
    cons: ['Less beginner-friendly than ethers.js', 'Newer ecosystem'],
    installCmd: 'npm install viem',
    tags: ['typescript', 'ethereum', 'type-safe', 'modern', 'rpc'],
  },
  {
    id: 'thirdweb',
    name: 'Thirdweb',
    icon: '🌐',
    color: '#a855f7',
    category: 'Frontend Web3',
    tagline: 'All-in-one Web3 development platform',
    description: 'Deploy contracts, build dApps, and manage payments in one platform. SDKs for React, Node, Unity, Unreal. Best for getting production-ready apps shipped fast.',
    url: 'https://thirdweb.com',
    docsUrl: 'https://portal.thirdweb.com',
    githubUrl: 'https://github.com/thirdweb-dev',
    type: 'framework',
    language: ['TypeScript', 'React', 'Unity', 'Python'],
    difficulty: 'beginner',
    stars: '4k+',
    usedBy: ['Coinbase', 'Shopify partners', 'Game studios'],
    bestFor: ['Quick dApp deployment', 'NFT projects', 'Gaming', 'Non-technical founders'],
    pros: ['Fastest to production', 'Multi-chain out of box', 'Great for NFTs/gaming', 'Dashboard UI'],
    cons: ['Less control than low-level libraries', 'Vendor dependency'],
    installCmd: 'npx thirdweb create app',
    tags: ['all-in-one', 'nft', 'gaming', 'multi-chain', 'easy', 'sdk'],
  },
  {
    id: 'rainbowkit',
    name: 'RainbowKit',
    icon: '🌈',
    color: '#ec4899',
    category: 'Frontend Web3',
    tagline: 'Best wallet connection UI',
    description: 'The best wallet connection UI for React. Beautiful, accessible, customizable. Supports 50+ wallets. Built on top of Wagmi. 15-minute wallet integration.',
    url: 'https://www.rainbowkit.com',
    docsUrl: 'https://www.rainbowkit.com/docs/introduction',
    githubUrl: 'https://github.com/rainbow-me/rainbowkit',
    type: 'library',
    language: ['TypeScript', 'React'],
    difficulty: 'beginner',
    stars: '2k+',
    usedBy: ['Uniswap', 'Mirror', 'many dApps'],
    bestFor: ['Wallet connection UI', 'React dApps', 'Multi-wallet support'],
    pros: ['Beautiful UI out of box', 'Easy integration', '50+ wallets', 'Customizable'],
    cons: ['React only', 'Opinionated UI', 'Requires Wagmi'],
    installCmd: 'npm install @rainbow-me/rainbowkit wagmi viem',
    tags: ['wallet', 'ui', 'react', 'metamask', 'walletconnect'],
  },
  // ── INFRASTRUCTURE ───────────────────────────────────────
  {
    id: 'alchemy',
    name: 'Alchemy',
    icon: '⚗️',
    color: '#0ea5e9',
    category: 'Node Providers',
    tagline: 'The Web3 development platform',
    description: 'Industry-leading node provider and developer platform. Enhanced APIs, NFT API, Token API, Transfers API, webhooks, Account Abstraction SDK. 100k req/day free.',
    url: 'https://www.alchemy.com',
    docsUrl: 'https://docs.alchemy.com',
    type: 'infrastructure',
    language: ['REST', 'WebSocket', 'SDK'],
    difficulty: 'beginner',
    usedBy: ['OpenSea', 'Adobe', 'Shopify', 'Magic'],
    bestFor: ['Production node access', 'NFT data', 'Webhooks', 'Account Abstraction'],
    pros: ['Most reliable uptime', 'Enhanced APIs beyond RPC', 'Great free tier', 'AA SDK'],
    cons: ['Centralized dependency', 'Paid tiers can be expensive'],
    installCmd: 'npm install alchemy-sdk',
    tags: ['node-provider', 'rpc', 'nft-api', 'webhooks', 'account-abstraction'],
  },
  {
    id: 'the-graph',
    name: 'The Graph',
    icon: '📊',
    color: '#6f4cff',
    category: 'Indexing',
    tagline: 'Index and query blockchain data',
    description: 'Decentralized indexing protocol for blockchain data. Build subgraphs to index on-chain events and query with GraphQL. Essential for any data-heavy dApp.',
    url: 'https://thegraph.com',
    docsUrl: 'https://thegraph.com/docs',
    githubUrl: 'https://github.com/graphprotocol',
    type: 'infrastructure',
    language: ['GraphQL', 'TypeScript', 'AssemblyScript'],
    difficulty: 'intermediate',
    usedBy: ['Uniswap', 'Aave', 'Compound', 'Synthetix'],
    bestFor: ['Query historical blockchain data', 'DeFi dashboards', 'NFT data', 'Analytics'],
    pros: ['Decentralized', 'GraphQL API', 'Multi-chain', 'Real-time subscriptions'],
    cons: ['Subgraph deployment takes time', 'Learning curve', 'Indexing costs for mainnet'],
    installCmd: 'npm install @graphprotocol/graph-cli',
    tags: ['indexing', 'graphql', 'subgraph', 'data', 'query', 'defi'],
  },
  {
    id: 'ipfs-filecoin',
    name: 'IPFS / Filecoin',
    icon: '🗂️',
    color: '#0090ff',
    category: 'Decentralized Storage',
    tagline: 'Decentralized file storage',
    description: 'IPFS for content-addressed decentralized storage. Filecoin for long-term persistence. Essential for storing NFT metadata, images, and dApp frontends.',
    url: 'https://ipfs.tech',
    docsUrl: 'https://docs.ipfs.tech',
    githubUrl: 'https://github.com/ipfs/js-ipfs',
    type: 'infrastructure',
    language: ['JavaScript', 'Go', 'REST'],
    difficulty: 'beginner',
    usedBy: ['OpenSea', 'Foundation', 'Rarible'],
    bestFor: ['NFT metadata', 'Decentralized frontends', 'Permanent file storage'],
    pros: ['Decentralized', 'Content-addressed', 'NFT standard', 'Free via gateways'],
    cons: ['Pins can expire without paid pinning', 'Slow vs centralized storage'],
    installCmd: 'npm install ipfs-http-client',
    tags: ['storage', 'ipfs', 'filecoin', 'nft-metadata', 'decentralized'],
  },
  // ── FULL STACK ───────────────────────────────────────────
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '▲',
    color: '#ffffff',
    category: 'Full-Stack Framework',
    tagline: 'The React framework for Web3',
    description: 'The dominant framework for Web3 frontends. App Router, Server Components, API routes — everything you need for a production dApp frontend. Used by this very platform.',
    url: 'https://nextjs.org',
    docsUrl: 'https://nextjs.org/docs',
    githubUrl: 'https://github.com/vercel/next.js',
    type: 'framework',
    language: ['TypeScript', 'React'],
    difficulty: 'intermediate',
    stars: '120k+',
    usedBy: ['Uniswap', 'Coinbase', 'OpenSea', 'Mirror'],
    bestFor: ['dApp frontends', 'Full-stack Web3', 'SEO-friendly dApps', 'Dashboard UIs'],
    pros: ['Best React DX', 'SSR + SSG', 'API routes', 'Vercel deployment'],
    cons: ['App Router has learning curve', 'Can be complex for simple sites'],
    installCmd: 'npx create-next-app@latest',
    tags: ['react', 'typescript', 'ssr', 'fullstack', 'vercel'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: '⚡',
    color: '#3ecf8e',
    category: 'Backend / Database',
    tagline: 'Open source Firebase alternative',
    description: 'PostgreSQL database, auth, real-time subscriptions, edge functions, and storage in one platform. The backend powering this Believe platform. Free tier is very generous.',
    url: 'https://supabase.com',
    docsUrl: 'https://supabase.com/docs',
    githubUrl: 'https://github.com/supabase/supabase',
    type: 'infrastructure',
    language: ['TypeScript', 'SQL', 'PostgreSQL'],
    difficulty: 'beginner',
    stars: '70k+',
    usedBy: ['GitHub', 'Mozilla', 'PwC'],
    bestFor: ['Web3 app backends', 'User data', 'Real-time features', 'Off-chain storage'],
    pros: ['PostgreSQL power', 'Real-time subscriptions', 'Auth built-in', 'Generous free tier'],
    cons: ['Not fully decentralized', 'Row limits on free tier'],
    installCmd: 'npm install @supabase/supabase-js',
    tags: ['database', 'postgresql', 'auth', 'realtime', 'backend', 'storage'],
  },
]

// ── Stack Templates ───────────────────────────────────────────
export interface StackTemplate {
  id: string
  name: string
  description: string
  icon: string
  color: string
  useCase: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  tools: string[]   // DevTool ids
  steps: string[]
  repoTemplate?: string
  tags: string[]
}

export const STACK_TEMPLATES: StackTemplate[] = [
  {
    id: 'minimal-dapp',
    name: 'Minimal EVM dApp',
    description: 'The fastest path to a working dApp. Connect wallet, read and write to a smart contract, display data. Perfect first project.',
    icon: '⚡',
    color: '#6366f1',
    useCase: 'First dApp, portfolio project, learning',
    difficulty: 'beginner',
    estimatedHours: 8,
    tools: ['nextjs', 'wagmi', 'viem', 'rainbowkit', 'foundry'],
    steps: [
      'Create Next.js app with TypeScript',
      'Install Wagmi, Viem, RainbowKit',
      'Set up wallet connection with RainbowKit',
      'Write and deploy a simple Solidity contract with Foundry',
      'Read contract state with useReadContract hook',
      'Write to contract with useWriteContract hook',
      'Deploy frontend to Vercel',
    ],
    repoTemplate: 'https://github.com/scaffold-eth/scaffold-eth-2',
    tags: ['beginner', 'evm', 'react', 'wallet', 'foundry'],
  },
  {
    id: 'defi-dashboard',
    name: 'DeFi Dashboard',
    description: 'Track wallet balances, token prices, DeFi positions, and transaction history across multiple protocols.',
    icon: '📊',
    color: '#f59e0b',
    useCase: 'Analytics, portfolio tracking, DeFi monitoring',
    difficulty: 'intermediate',
    estimatedHours: 24,
    tools: ['nextjs', 'wagmi', 'viem', 'alchemy', 'the-graph', 'supabase'],
    steps: [
      'Set up Next.js with Wagmi + Viem',
      'Connect Alchemy SDK for enhanced blockchain data',
      'Deploy subgraph on The Graph for historical data',
      'Build portfolio overview with token balances',
      'Add DeFi position tracking (Uniswap LP, Aave health)',
      'Add Supabase for saved wallets and user preferences',
      'Add real-time price feeds with WebSocket subscriptions',
    ],
    tags: ['defi', 'analytics', 'dashboard', 'the-graph', 'alchemy'],
  },
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace',
    description: 'Create, list, buy, and sell NFTs. Full marketplace with metadata on IPFS, royalties, and auction support.',
    icon: '🖼️',
    color: '#ec4899',
    useCase: 'NFT project launch, creator platform, gaming assets',
    difficulty: 'intermediate',
    estimatedHours: 40,
    tools: ['nextjs', 'wagmi', 'thirdweb', 'ipfs-filecoin', 'the-graph', 'supabase'],
    steps: [
      'Set up Next.js + Thirdweb SDK',
      'Deploy ERC-721 contract (OpenZeppelin or Thirdweb)',
      'Implement IPFS upload for images and metadata',
      'Build mint page with wallet connection',
      'Create marketplace contract (list, buy, make offer)',
      'Index events with The Graph subgraph',
      'Add Supabase for off-chain metadata and user profiles',
      'Implement royalties (ERC-2981)',
    ],
    tags: ['nft', 'marketplace', 'ipfs', 'erc721', 'thirdweb'],
  },
  {
    id: 'defi-protocol',
    name: 'DeFi Protocol',
    description: 'Production-grade DeFi protocol — lending, AMM, or staking. Includes security best practices, testing, and audit prep.',
    icon: '🏦',
    color: '#10b981',
    useCase: 'Lending, AMM, yield farming, staking protocol',
    difficulty: 'advanced',
    estimatedHours: 120,
    tools: ['foundry', 'openzeppelin', 'the-graph', 'alchemy', 'nextjs', 'wagmi'],
    steps: [
      'Design protocol architecture and tokenomics',
      'Write core contracts with OpenZeppelin base',
      'Implement Foundry test suite (unit + fuzz + invariant)',
      'Add Chainlink oracle integration for price feeds',
      'Set up mainnet fork tests with Foundry',
      'Deploy The Graph subgraph for protocol analytics',
      'Build frontend dashboard with Next.js + Wagmi',
      'Prepare audit documentation and NatSpec comments',
      'Deploy to testnet and run Slither + Alchemy monitoring',
    ],
    repoTemplate: 'https://github.com/Cyfrin/foundry-defi-stablecoin-cu',
    tags: ['defi', 'advanced', 'protocol', 'auditing', 'production'],
  },
  {
    id: 'solana-dapp',
    name: 'Solana dApp',
    description: 'Full Solana dApp with Anchor smart contract, wallet connection, and React frontend.',
    icon: '◎',
    color: '#9945ff',
    useCase: 'Solana DEX, consumer app, payment app',
    difficulty: 'intermediate',
    estimatedHours: 32,
    tools: ['nextjs', 'supabase'],
    steps: [
      'Install Anchor framework and Solana CLI',
      'Write Anchor program (smart contract in Rust)',
      'Write Anchor tests with Mocha/Chai',
      'Deploy to Solana Devnet',
      'Set up Next.js frontend with @solana/wallet-adapter',
      'Integrate @project-serum/anchor for frontend calls',
      'Add Supabase for off-chain user data',
      'Deploy to Mainnet-Beta',
    ],
    repoTemplate: 'https://github.com/solana-labs/dapp-scaffold',
    tags: ['solana', 'anchor', 'rust', 'wallet-adapter'],
  },
  {
    id: 'ai-web3-agent',
    name: 'AI x Web3 Agent',
    description: 'An AI agent that can read blockchain data, execute transactions, monitor wallets, and send alerts.',
    icon: '🤖',
    color: '#8b5cf6',
    useCase: 'Trading bots, portfolio monitoring, DeFi automation',
    difficulty: 'advanced',
    estimatedHours: 20,
    tools: ['nextjs', 'alchemy', 'supabase'],
    steps: [
      'Set up LangChain or LangGraph agent framework',
      'Create blockchain tools (getBalance, getTransactions, getTokenPrice)',
      'Add Alchemy webhook for real-time on-chain events',
      'Build agent with memory (conversation history)',
      'Add write capability (sign & send transactions)',
      'Set up Supabase to store agent logs and alerts',
      'Build simple chat UI with Next.js',
      'Deploy agent as Next.js API route with cron triggers',
    ],
    tags: ['ai', 'agent', 'langchain', 'web3', 'automation', 'monitoring'],
  },
]

// ── Stack Quiz Questions ──────────────────────────────────────
export interface QuizQuestion {
  id: string
  question: string
  options: { label: string; value: string }[]
}

export const STACK_QUIZ: QuizQuestion[] = [
  {
    id: 'chain',
    question: 'Which blockchain are you building on?',
    options: [
      { label: '🔷 Ethereum / EVM (Arbitrum, Base, Polygon)', value: 'evm' },
      { label: '◎ Solana', value: 'solana' },
      { label: '🌐 Multi-chain', value: 'multi' },
      { label: "🤷 Haven't decided yet", value: 'any' },
    ],
  },
  {
    id: 'type',
    question: 'What are you building?',
    options: [
      { label: '💱 DeFi protocol (lending, AMM, staking)', value: 'defi' },
      { label: '🖼️ NFT project or marketplace', value: 'nft' },
      { label: '📊 Dashboard or analytics tool', value: 'dashboard' },
      { label: '🤖 AI x Blockchain agent', value: 'ai-web3' },
    ],
  },
  {
    id: 'experience',
    question: 'What is your experience level?',
    options: [
      { label: '🌱 Beginner — this is my first Web3 project', value: 'beginner' },
      { label: '📐 Intermediate — I have built some dApps', value: 'intermediate' },
      { label: '🔥 Advanced — I want production-grade setup', value: 'advanced' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { label: '🚀 Ship fast — get something live ASAP', value: 'speed' },
      { label: '🔐 Security first — audit-ready code', value: 'security' },
      { label: '🎨 Great UX — beautiful, polished UI', value: 'ux' },
      { label: '🏗️ Learn — understand everything deeply', value: 'learn' },
    ],
  },
]

// Recommender logic
export function recommendStack(answers: Record<string, string>): StackTemplate {
  const { type, experience, priority } = answers

  if (type === 'defi' && experience === 'advanced') return STACK_TEMPLATES.find((s) => s.id === 'defi-protocol')!
  if (type === 'nft') return STACK_TEMPLATES.find((s) => s.id === 'nft-marketplace')!
  if (type === 'dashboard') return STACK_TEMPLATES.find((s) => s.id === 'defi-dashboard')!
  if (type === 'ai-web3') return STACK_TEMPLATES.find((s) => s.id === 'ai-web3-agent')!
  if (answers.chain === 'solana') return STACK_TEMPLATES.find((s) => s.id === 'solana-dapp')!
  if (experience === 'beginner' || priority === 'speed') return STACK_TEMPLATES.find((s) => s.id === 'minimal-dapp')!

  return STACK_TEMPLATES.find((s) => s.id === 'defi-dashboard')!
}
