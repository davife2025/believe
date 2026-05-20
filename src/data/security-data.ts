// ============================================================
// BELIEVE — Blockchain Security Data
// ============================================================

export interface Vulnerability {
  id: string
  name: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  description: string
  impact: string
  example: string
  prevention: string[]
  realWorldExample: string
  swcId?: string
  tags: string[]
}

export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'reentrancy',
    name: 'Reentrancy Attack',
    severity: 'critical',
    category: 'EVM',
    description: 'A malicious contract calls back into the victim contract before the first execution completes, draining funds before balances are updated.',
    impact: 'Complete drain of ETH or token balances from a contract.',
    example: `// VULNERABLE
function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    (bool ok,) = msg.sender.call{value: amount}(""); // ← attacker re-enters here
    balances[msg.sender] -= amount; // too late!
}`,
    prevention: [
      'Use Checks-Effects-Interactions pattern (update state BEFORE external calls)',
      'Use OpenZeppelin ReentrancyGuard modifier',
      'Use pull-payment pattern instead of push',
    ],
    realWorldExample: 'The DAO hack (2016) — $60M drained. Euler Finance (2023) — $197M exploited.',
    swcId: 'SWC-107',
    tags: ['reentrancy', 'evm', 'dao', 'critical'],
  },
  {
    id: 'integer-overflow',
    name: 'Integer Overflow / Underflow',
    severity: 'high',
    category: 'Arithmetic',
    description: 'Arithmetic operations that exceed the maximum or minimum value of an integer type wrap around, producing unexpected results.',
    impact: 'Token balance manipulation, bypassing transfer limits, infinite minting.',
    example: `// VULNERABLE (Solidity < 0.8.0)
uint8 balance = 255;
balance += 1; // wraps to 0!

uint256 x = 0;
x -= 1; // wraps to type(uint256).max`,
    prevention: [
      'Use Solidity 0.8.0+ (built-in overflow checks)',
      'Use OpenZeppelin SafeMath for older versions',
      'Always validate arithmetic inputs',
    ],
    realWorldExample: 'BatchOverflow bug (2018) — multiple ERC-20 tokens vulnerable, allowing attackers to generate enormous token amounts.',
    swcId: 'SWC-101',
    tags: ['arithmetic', 'overflow', 'underflow', 'safemath'],
  },
  {
    id: 'access-control',
    name: 'Broken Access Control',
    severity: 'critical',
    category: 'Access Control',
    description: 'Missing or improperly implemented access controls allow unauthorized users to call privileged functions.',
    impact: 'Unauthorized minting, ownership takeover, protocol parameter manipulation.',
    example: `// VULNERABLE — anyone can call this!
function setOwner(address newOwner) external {
    owner = newOwner; // no access check
}

// ALSO VULNERABLE — wrong modifier
function mint(address to, uint amount) public { // should be onlyOwner
    _mint(to, amount);
}`,
    prevention: [
      'Use OpenZeppelin Ownable or AccessControl',
      'Apply onlyOwner / onlyRole to all privileged functions',
      'Audit every external/public function for access requirements',
      'Use tx.origin never for authorization (use msg.sender)',
    ],
    realWorldExample: 'Poly Network (2021) — $611M stolen due to missing access control on a privileged cross-chain function.',
    swcId: 'SWC-105',
    tags: ['access-control', 'ownership', 'authorization', 'critical'],
  },
  {
    id: 'flash-loan',
    name: 'Flash Loan Attack',
    severity: 'critical',
    category: 'DeFi',
    description: 'Attacker borrows massive capital atomically (no collateral) to manipulate prices, drain liquidity, or exploit governance within a single transaction.',
    impact: 'Oracle price manipulation, governance takeover, liquidity drain.',
    example: `// VULNERABLE — uses spot price as oracle
function getPrice() internal view returns (uint) {
    // price from DEX pool — manipulable in same tx!
    return dexPool.getSpotPrice(tokenA, tokenB);
}`,
    prevention: [
      'Use time-weighted average prices (TWAP) not spot prices',
      'Use Chainlink price feeds for external prices',
      'Add snapshot governance voting delays',
      'Implement multi-block price averaging',
    ],
    realWorldExample: 'Beanstalk (2022) — $182M drained via flash-loan-funded governance attack. Compound (2021) — $150M due to oracle manipulation.',
    tags: ['flash-loan', 'oracle', 'defi', 'twap', 'governance'],
  },
  {
    id: 'frontrunning',
    name: 'Front-Running / MEV',
    severity: 'high',
    category: 'MEV',
    description: 'Miners/validators (or bots watching the mempool) can reorder, insert, or censor transactions to extract value — known as MEV.',
    impact: 'Sandwich attacks on DEX trades, NFT mint sniping, liquidation racing.',
    example: `// VULNERABLE — predictable outcome visible in mempool
// Bob sees Alice's large swap tx in mempool
// Bob frontruns: buys token, Alice's tx executes at worse price
// Bob backruns: sells token for profit
// → Classic sandwich attack`,
    prevention: [
      'Use commit-reveal schemes for sensitive actions',
      'Use Flashbots / private mempools for large trades',
      'Set tight slippage tolerances',
      'Use submarine sends for sealed bids',
    ],
    realWorldExample: 'MEV bots extract hundreds of millions annually from Ethereum users. Sandwich attacks are automatic and constant.',
    tags: ['mev', 'frontrunning', 'sandwich', 'mempool', 'defi'],
  },
  {
    id: 'oracle-manipulation',
    name: 'Oracle Manipulation',
    severity: 'critical',
    category: 'DeFi',
    description: 'Using a manipulable price source (like a DEX spot price) as a trusted oracle allows attackers to distort prices and exploit dependent protocols.',
    impact: 'Undercollateralized loans, incorrect liquidations, protocol insolvency.',
    example: `// VULNERABLE — AMM spot price used as oracle
uint price = UniswapV2Pair(pool).price0CumulativeLast();
// Attacker can move this price significantly in one tx
// using a large trade or flash loan`,
    prevention: [
      'Use Chainlink decentralized oracles',
      'Use TWAP (time-weighted average price) over multiple blocks',
      'Add circuit breakers for extreme price deviations',
      'Use multiple independent oracle sources',
    ],
    realWorldExample: 'Mango Markets (2022) — $117M exploit via oracle price manipulation of MNGO token.',
    tags: ['oracle', 'chainlink', 'twap', 'price-manipulation', 'defi'],
  },
  {
    id: 'delegatecall',
    name: 'Delegatecall Injection',
    severity: 'critical',
    category: 'EVM',
    description: 'delegatecall executes code from another contract in the CALLER\'s storage context. If the target is attacker-controlled, they can modify any storage slot.',
    impact: 'Complete storage takeover, ownership hijacking, fund drain.',
    example: `// VULNERABLE — arbitrary delegatecall
function execute(address target, bytes calldata data) external {
    target.delegatecall(data);
    // If target is malicious, it executes in OUR storage context!
    // Can overwrite owner, balances, anything
}`,
    prevention: [
      'Never delegatecall to untrusted/arbitrary addresses',
      'Use upgrade patterns with strict access control',
      'Verify implementation contracts before delegating',
      'Avoid storage collisions in proxy patterns',
    ],
    realWorldExample: 'Parity Multisig (2017) — $30M frozen. Attacker called delegatecall to become owner then self-destructed the library.',
    swcId: 'SWC-112',
    tags: ['delegatecall', 'proxy', 'storage', 'evm', 'parity'],
  },
  {
    id: 'tx-origin',
    name: 'tx.origin Authentication',
    severity: 'high',
    category: 'Authentication',
    description: 'Using tx.origin for authentication instead of msg.sender allows phishing attacks where a malicious contract tricks the original sender.',
    impact: 'Wallet drain via phishing contracts that look legitimate.',
    example: `// VULNERABLE
function transfer(address to, uint amount) external {
    require(tx.origin == owner, "Not owner"); // ← WRONG
    // Attacker tricks owner into calling malicious contract
    // which calls this function — tx.origin is still owner!
    _transfer(to, amount);
}`,
    prevention: [
      'Always use msg.sender for authentication, never tx.origin',
      'tx.origin is only valid for checking "was this called by an EOA"',
    ],
    realWorldExample: 'Multiple phishing attacks have used tx.origin to drain wallets of users who interact with malicious contracts.',
    swcId: 'SWC-115',
    tags: ['authentication', 'phishing', 'tx-origin', 'msg-sender'],
  },
]

// ── Audit Checklist ───────────────────────────────────────────
export interface AuditItem {
  id: string
  category: string
  item: string
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  description: string
}

export const AUDIT_CHECKLIST: AuditItem[] = [
  // Access Control
  { id: 'ac1', category: 'Access Control', item: 'All privileged functions have proper access modifiers', severity: 'critical', description: 'Check every external/public function for missing onlyOwner, onlyRole, or custom modifiers.' },
  { id: 'ac2', category: 'Access Control', item: 'Ownership transfer is two-step', severity: 'high', description: 'Single-step ownership transfer can brick a contract. Use transferOwnership + acceptOwnership pattern.' },
  { id: 'ac3', category: 'Access Control', item: 'No use of tx.origin for authentication', severity: 'high', description: 'tx.origin is phishable. All auth must use msg.sender.' },
  { id: 'ac4', category: 'Access Control', item: 'Constructor sets correct initial ownership', severity: 'medium', description: 'Verify constructor properly initializes owner/admin roles and does not leave them unset.' },

  // Reentrancy
  { id: 're1', category: 'Reentrancy', item: 'All external calls follow Checks-Effects-Interactions', severity: 'critical', description: 'State updates must happen BEFORE external calls. Verify order in every function.' },
  { id: 're2', category: 'Reentrancy', item: 'ReentrancyGuard applied to withdrawal functions', severity: 'critical', description: 'Any function moving ETH or tokens to an external address should have nonReentrant.' },
  { id: 're3', category: 'Reentrancy', item: 'ERC-777 / callback hooks considered', severity: 'high', description: 'ERC-777 tokensReceived hooks trigger on transfers. Reentrancy via token callbacks is common.' },

  // Arithmetic
  { id: 'ar1', category: 'Arithmetic', item: 'Solidity 0.8+ used or SafeMath applied', severity: 'high', description: 'Verify compiler version or SafeMath usage to prevent overflow/underflow.' },
  { id: 'ar2', category: 'Arithmetic', item: 'Division before multiplication avoided', severity: 'medium', description: 'Integer division truncates. Always multiply before dividing to preserve precision.' },
  { id: 'ar3', category: 'Arithmetic', item: 'No unexpected precision loss in calculations', severity: 'medium', description: 'Check for rounding errors especially in reward distribution, fee calculations.' },

  // Oracle & Price
  { id: 'or1', category: 'Oracle & Price', item: 'No spot prices used as oracles', severity: 'critical', description: 'AMM spot prices are flash-loan manipulable. Use TWAP or Chainlink.' },
  { id: 'or2', category: 'Oracle & Price', item: 'Oracle staleness checks implemented', severity: 'high', description: 'Check Chainlink latestRoundData() for updatedAt timestamp and compare to block.timestamp.' },
  { id: 'or3', category: 'Oracle & Price', item: 'Price deviation circuit breakers exist', severity: 'medium', description: 'Large sudden price moves should pause the protocol or revert.' },

  // Logic
  { id: 'lg1', category: 'Business Logic', item: 'All state transitions are valid and complete', severity: 'critical', description: 'Map every state the contract can be in. Verify no invalid states are reachable.' },
  { id: 'lg2', category: 'Business Logic', item: 'Invariants hold after every operation', severity: 'critical', description: 'e.g. total supply == sum of all balances. Write invariant tests with Foundry.' },
  { id: 'lg3', category: 'Business Logic', item: 'Edge cases at 0 and max values handled', severity: 'medium', description: 'Test with amount=0, amount=type(uint256).max, empty arrays.' },

  // External Calls
  { id: 'ex1', category: 'External Calls', item: 'Return values of external calls checked', severity: 'high', description: 'low-level call() returns (bool success). Not checking it silently ignores failures.' },
  { id: 'ex2', category: 'External Calls', item: 'Delegatecall only to trusted contracts', severity: 'critical', description: 'delegatecall executes in caller storage context. Never to arbitrary/user-supplied addresses.' },
  { id: 'ex3', category: 'External Calls', item: 'Self-destruct implications considered', severity: 'medium', description: 'If contract uses selfdestruct, verify it cannot leave dependent contracts broken.' },

  // Flash Loans & MEV
  { id: 'fl1', category: 'Flash Loans & MEV', item: 'No single-tx price manipulation possible', severity: 'critical', description: 'Verify all price-sensitive operations cannot be manipulated within a single transaction.' },
  { id: 'fl2', category: 'Flash Loans & MEV', item: 'Governance has voting delay', severity: 'high', description: 'Flash-loan governance attacks require no voting delay. Minimum 1 block required.' },
  { id: 'fl3', category: 'Flash Loans & MEV', item: 'Sensitive functions are MEV-resistant', severity: 'medium', description: 'Commit-reveal or private mempool for liquidations, auctions, and NFT mints.' },

  // Upgrades
  { id: 'up1', category: 'Upgradeability', item: 'Storage layout collision checked', severity: 'critical', description: 'Proxy and implementation storage slots must not collide. Use EIP-1967 storage slots.' },
  { id: 'up2', category: 'Upgradeability', item: 'Initializers protected against re-initialization', severity: 'high', description: 'Use OpenZeppelin initializer modifier and _disableInitializers() in constructor.' },
  { id: 'up3', category: 'Upgradeability', item: 'Upgrade authorization is properly restricted', severity: 'critical', description: 'Only authorized party can upgrade. UUPS _authorizeUpgrade must have access control.' },

  // Misc
  { id: 'ms1', category: 'Miscellaneous', item: 'SPDX license and pragma specified', severity: 'info', description: 'All files should have SPDX-License-Identifier and specific pragma (not ^).' },
  { id: 'ms2', category: 'Miscellaneous', item: 'Events emitted for all state changes', severity: 'low', description: 'Missing events make off-chain monitoring and debugging very difficult.' },
  { id: 'ms3', category: 'Miscellaneous', item: 'No hardcoded sensitive addresses or values', severity: 'medium', description: 'Hardcoded addresses cannot be updated if compromised. Use configurable values.' },
]

// ── CTF Challenges ────────────────────────────────────────────
export interface CTFChallenge {
  id: string
  platform: string
  platformUrl: string
  platformColor: string
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  tags: string[]
  hint?: string
}

export const CTF_CHALLENGES: CTFChallenge[] = [
  { id: 'e-fallback',    platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/0', platformColor: '#ef4444', name: 'Fallback',         description: 'Claim ownership of the contract and drain its balance.',         difficulty: 'beginner',     category: 'Access Control', tags: ['fallback', 'ownership', 'receive'] },
  { id: 'e-fallout',     platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/1', platformColor: '#ef4444', name: 'Fallout',          description: 'Claim ownership of the contract below to complete this level.',  difficulty: 'beginner',     category: 'Access Control', tags: ['constructor', 'ownership'] },
  { id: 'e-coinflip',    platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/2', platformColor: '#ef4444', name: 'Coin Flip',        description: 'Win the coin flip game 10 times in a row.',                      difficulty: 'beginner',     category: 'Randomness',     tags: ['randomness', 'block-hash', 'predictable'], hint: 'Block variables are not random. Compute the result before calling.' },
  { id: 'e-delegation',  platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/5', platformColor: '#ef4444', name: 'Delegation',       description: 'Claim ownership of a contract using delegatecall.',             difficulty: 'intermediate', category: 'Delegatecall',   tags: ['delegatecall', 'ownership', 'fallback'] },
  { id: 'e-reentrancy',  platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/9', platformColor: '#ef4444', name: 'Re-entrancy',      description: 'Steal all the funds from the contract.',                         difficulty: 'intermediate', category: 'Reentrancy',     tags: ['reentrancy', 'drain', 'classic'] },
  { id: 'e-elevator',    platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/10', platformColor: '#ef4444', name: 'Elevator',        description: 'Make the elevator reach the top floor.',                         difficulty: 'intermediate', category: 'Logic',          tags: ['interface', 'logic', 'state'] },
  { id: 'e-dex',         platform: 'Ethernaut',        platformUrl: 'https://ethernaut.openzeppelin.com/level/21', platformColor: '#ef4444', name: 'DEX',             description: 'Drain all tokens from the DEX contract.',                        difficulty: 'advanced',     category: 'DeFi',           tags: ['dex', 'price', 'defi', 'drain'] },
  { id: 'dvd-unstoppable',platform: 'Damn Vulnerable', platformUrl: 'https://www.damnvulnerabledefi.xyz/challenges/unstoppable/', platformColor: '#f97316', name: 'Unstoppable',  description: 'Stop the vault from offering flash loans.',       difficulty: 'beginner',     category: 'Flash Loans',    tags: ['flash-loan', 'vault', 'dos'] },
  { id: 'dvd-naive',     platform: 'Damn Vulnerable',  platformUrl: 'https://www.damnvulnerabledefi.xyz/challenges/naive-receiver/', platformColor: '#f97316', name: 'Naive Receiver', description: 'Drain all ETH from a flash loan receiver.',    difficulty: 'beginner',     category: 'Flash Loans',    tags: ['flash-loan', 'receiver', 'fees'] },
  { id: 'dvd-puppet',    platform: 'Damn Vulnerable',  platformUrl: 'https://www.damnvulnerabledefi.xyz/challenges/puppet/', platformColor: '#f97316', name: 'Puppet',       description: 'Borrow all tokens from a lending pool by manipulating prices.', difficulty: 'intermediate', category: 'Oracle',         tags: ['oracle', 'price-manipulation', 'lending'] },
  { id: 'dvd-selfie',    platform: 'Damn Vulnerable',  platformUrl: 'https://www.damnvulnerabledefi.xyz/challenges/selfie/', platformColor: '#f97316', name: 'Selfie',       description: 'Take over a lending pool that has a governance token.',          difficulty: 'intermediate', category: 'Governance',     tags: ['governance', 'flash-loan', 'dao'] },
  { id: 'dvd-backdoor',  platform: 'Damn Vulnerable',  platformUrl: 'https://www.damnvulnerabledefi.xyz/challenges/backdoor/', platformColor: '#f97316', name: 'Backdoor',    description: 'Backdoor a Gnosis Safe setup to steal tokens.',                 difficulty: 'advanced',     category: 'Wallets',        tags: ['gnosis', 'safe', 'backdoor', 'setup'] },
]

// ── Bug Bounty Programs ───────────────────────────────────────
export interface BugBountyProgram {
  id: string
  protocol: string
  icon: string
  url: string
  maxBounty: string
  scope: string[]
  ecosystem: string[]
  active: boolean
  minSeverity: string
}

export const BUG_BOUNTY_PROGRAMS: BugBountyProgram[] = [
  { id: 'uniswap',   protocol: 'Uniswap',         icon: '🦄', url: 'https://immunefi.com/bug-bounty/uniswap/',       maxBounty: '$2,250,000', scope: ['Smart Contracts', 'Protocol'],           ecosystem: ['Ethereum', 'Arbitrum', 'Polygon'],  active: true, minSeverity: 'Medium' },
  { id: 'aave',      protocol: 'Aave',             icon: '👻', url: 'https://immunefi.com/bug-bounty/aave/',          maxBounty: '$250,000',   scope: ['Smart Contracts', 'Oracle'],             ecosystem: ['Ethereum', 'Polygon', 'Avalanche'], active: true, minSeverity: 'Medium' },
  { id: 'compound',  protocol: 'Compound',         icon: '🏦', url: 'https://immunefi.com/bug-bounty/compound/',      maxBounty: '$150,000',   scope: ['Smart Contracts'],                        ecosystem: ['Ethereum'],                         active: true, minSeverity: 'Medium' },
  { id: 'chainlink', protocol: 'Chainlink',        icon: '🔗', url: 'https://immunefi.com/bug-bounty/chainlink/',     maxBounty: '$100,000',   scope: ['Smart Contracts', 'Oracle Network'],     ecosystem: ['Multi-chain'],                      active: true, minSeverity: 'Medium' },
  { id: 'makerdao',  protocol: 'MakerDAO',         icon: '🏛️', url: 'https://immunefi.com/bug-bounty/makerdao/',      maxBounty: '$10,000,000',scope: ['Smart Contracts', 'Governance'],          ecosystem: ['Ethereum'],                         active: true, minSeverity: 'High'   },
  { id: 'optimism',  protocol: 'Optimism',         icon: '🔴', url: 'https://immunefi.com/bug-bounty/optimism/',      maxBounty: '$2,000,042', scope: ['Smart Contracts', 'Blockchain/DLT'],     ecosystem: ['Optimism', 'Base'],                 active: true, minSeverity: 'Medium' },
  { id: 'arbitrum2', protocol: 'Arbitrum',         icon: '🔵', url: 'https://immunefi.com/bug-bounty/arbitrum/',      maxBounty: '$2,000,000', scope: ['Smart Contracts', 'Blockchain/DLT'],     ecosystem: ['Arbitrum'],                         active: true, minSeverity: 'Medium' },
  { id: 'solana-f',  protocol: 'Solana Foundation',icon: '◎',  url: 'https://immunefi.com/bug-bounty/solana/',        maxBounty: '$1,000,000', scope: ['Blockchain/DLT', 'Infrastructure'],      ecosystem: ['Solana'],                           active: true, minSeverity: 'Critical'},
  { id: 'polygon-f', protocol: 'Polygon',          icon: '🟣', url: 'https://immunefi.com/bug-bounty/polygon/',       maxBounty: '$1,000,000', scope: ['Smart Contracts', 'Blockchain/DLT'],     ecosystem: ['Polygon'],                          active: true, minSeverity: 'Medium' },
  { id: 'bnb-chain', protocol: 'BNB Chain',        icon: '🟡', url: 'https://immunefi.com/bug-bounty/bnbchain/',      maxBounty: '$1,000,000', scope: ['Blockchain/DLT', 'Smart Contracts'],     ecosystem: ['BNB'],                              active: true, minSeverity: 'Critical'},
]
