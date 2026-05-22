// ============================================================
// BELIEVE — Blockchain Chain Data
// ============================================================

export interface Chain {
  id: string
  name: string
  icon: string
  color: string
  tagline: string
  description: string
  type: 'L1' | 'L2' | 'Sidechain' | 'Rollup'
  consensus: string
  language: string[]
  tps: string
  finality: string
  avgGasFee: string
  tvl: string
  docsUrl: string
  faucetUrl?: string
  explorerUrl: string
  ecosystem: string[]
  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  testnet: string
  nativeCurrency: string
  chainId?: number
}

export const CHAINS: Chain[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: '🔷',
    color: '#627eea',
    tagline: 'The world computer',
    description: 'The leading smart contract platform. Most battle-tested, largest DeFi ecosystem, most developer tooling. The benchmark every chain is measured against.',
    type: 'L1',
    consensus: 'Proof of Stake',
    language: ['Solidity', 'Vyper'],
    tps: '~15-30',
    finality: '~12 min (economic)',
    avgGasFee: '$1–$20',
    tvl: '$60B+',
    docsUrl: 'https://ethereum.org/en/developers/docs/',
    faucetUrl: 'https://sepoliafaucet.com',
    explorerUrl: 'https://etherscan.io',
    ecosystem: ['DeFi', 'NFTs', 'DAOs', 'L2s', 'Stablecoins'],
    strengths: ['Most secure', 'Largest ecosystem', 'Most tooling', 'Most audited contracts', 'EVM standard-setter'],
    weaknesses: ['High gas fees', 'Low throughput', 'Slow finality'],
    bestFor: ['DeFi protocols', 'High-value NFTs', 'DAOs', 'Any protocol needing maximum security'],
    testnet: 'Sepolia',
    nativeCurrency: 'ETH',
    chainId: 1,
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: '◎',
    color: '#9945ff',
    tagline: 'High performance blockchain',
    description: 'Ultra-fast, low-fee L1. Parallel transaction processing via Sealevel runtime. Home of memecoin culture, consumer crypto, and DePIN. Different programming model from EVM.',
    type: 'L1',
    consensus: 'Proof of History + PoS',
    language: ['Rust', 'Anchor (Rust DSL)'],
    tps: '~65,000',
    finality: '~400ms',
    avgGasFee: '$0.00025',
    tvl: '$8B+',
    docsUrl: 'https://docs.solana.com',
    faucetUrl: 'https://faucet.solana.com',
    explorerUrl: 'https://solscan.io',
    ecosystem: ['DeFi', 'NFTs', 'DePIN', 'Consumer Apps', 'Memecoins'],
    strengths: ['Ultra-fast finality', 'Near-zero fees', 'High throughput', 'Growing consumer ecosystem'],
    weaknesses: ['Complex programming model', 'History of outages', 'Less battle-tested than ETH', 'Rust learning curve'],
    bestFor: ['High-frequency trading', 'Consumer apps', 'DePIN', 'Gaming', 'Micropayment apps'],
    testnet: 'Devnet',
    nativeCurrency: 'SOL',
  },
  {
    id: 'base',
    name: 'Base',
    icon: '🔵',
    color: '#0052ff',
    tagline: "Coinbase's Ethereum L2",
    description: 'OP Stack L2 by Coinbase. EVM-equivalent, cheap fees, fast transactions. Gateway to the onchain economy. Best distribution via Coinbase integration.',
    type: 'L2',
    consensus: 'Optimistic Rollup (OP Stack)',
    language: ['Solidity', 'Vyper'],
    tps: '~2,000',
    finality: '~2 sec (soft)',
    avgGasFee: '$0.01–$0.10',
    tvl: '$3B+',
    docsUrl: 'https://docs.base.org',
    faucetUrl: 'https://www.alchemy.com/faucets/base-sepolia',
    explorerUrl: 'https://basescan.org',
    ecosystem: ['DeFi', 'Consumer', 'NFTs', 'Social', 'AI x Crypto'],
    strengths: ['Coinbase distribution', 'EVM-compatible', 'Low fees', 'Fast growing', 'Best for onboarding Web2 users'],
    weaknesses: ['7-day withdrawal period', 'Centralized sequencer', 'Newer ecosystem'],
    bestFor: ['Consumer dApps', 'Social apps', 'AI x Crypto', 'Onboarding Web2 users'],
    testnet: 'Base Sepolia',
    nativeCurrency: 'ETH',
    chainId: 8453,
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: '🔵',
    color: '#12aaff',
    tagline: 'Largest Ethereum L2',
    description: 'Nitro rollup by Offchain Labs. Largest L2 by TVL. EVM-equivalent with Stylus for Rust/WASM contracts. Home of GMX, Uniswap v3, Camelot.',
    type: 'L2',
    consensus: 'Optimistic Rollup (Nitro)',
    language: ['Solidity', 'Rust (Stylus)', 'C/C++ (Stylus)'],
    tps: '~40,000',
    finality: '~1 sec (soft)',
    avgGasFee: '$0.01–$0.05',
    tvl: '$18B+',
    docsUrl: 'https://docs.arbitrum.io',
    faucetUrl: 'https://www.alchemy.com/faucets/arbitrum-sepolia',
    explorerUrl: 'https://arbiscan.io',
    ecosystem: ['DeFi', 'Perps', 'Gaming', 'NFTs'],
    strengths: ['Largest L2 TVL', 'EVM-equivalent', 'Stylus for Rust', 'Deep DeFi liquidity'],
    weaknesses: ['7-day withdrawal period', 'Centralized sequencer', 'Governance complexity'],
    bestFor: ['DeFi protocols', 'Perps/trading', 'Rust-based contracts', 'High-value dApps'],
    testnet: 'Arbitrum Sepolia',
    nativeCurrency: 'ETH',
    chainId: 42161,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '🟣',
    color: '#8247e5',
    tagline: 'Ethereum scaling suite',
    description: 'Multi-chain scaling. PoS sidechain + zkEVM rollup + CDK for custom chains. Huge enterprise adoption. Visa, Reddit, Nike all built on Polygon.',
    type: 'Sidechain',
    consensus: 'PoS (Polygon PoS) / ZK (zkEVM)',
    language: ['Solidity', 'Vyper'],
    tps: '~7,000',
    finality: '~2 sec',
    avgGasFee: '<$0.01',
    tvl: '$1.5B+',
    docsUrl: 'https://docs.polygon.technology',
    faucetUrl: 'https://faucet.polygon.technology',
    explorerUrl: 'https://polygonscan.com',
    ecosystem: ['DeFi', 'Gaming', 'NFTs', 'Enterprise', 'Social'],
    strengths: ['Enterprise adoption', 'Very low fees', 'EVM-compatible', 'zkEVM available', 'CDK for custom chains'],
    weaknesses: ['PoS not as secure as ETH', 'zkEVM still maturing', 'Fragmented (PoS vs zkEVM)'],
    bestFor: ['Gaming', 'Enterprise use cases', 'High-volume NFTs', 'Mass-market consumer apps'],
    testnet: 'Polygon Amoy',
    nativeCurrency: 'MATIC / POL',
    chainId: 137,
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    icon: '🟡',
    color: '#f3ba2f',
    tagline: 'Binance ecosystem chain',
    description: 'High-throughput EVM chain by Binance. Largest retail user base in Asia. opBNB L2 for even lower fees. PancakeSwap, Venus, largest CEX-backed ecosystem.',
    type: 'L1',
    consensus: 'Proof of Staked Authority',
    language: ['Solidity'],
    tps: '~2,000',
    finality: '~3 sec',
    avgGasFee: '$0.05–$0.20',
    tvl: '$5B+',
    docsUrl: 'https://docs.bnbchain.org',
    faucetUrl: 'https://www.bnbchain.org/en/testnet-faucet',
    explorerUrl: 'https://bscscan.com',
    ecosystem: ['DeFi', 'GameFi', 'NFTs', 'Retail'],
    strengths: ['Massive retail user base', 'Low fees', 'EVM-compatible', 'Binance ecosystem access'],
    weaknesses: ['Centralized validators', 'Reputation from early scams', 'Less prestigious than ETH'],
    bestFor: ['Retail-facing apps', 'Asia market', 'High-volume trading', 'GameFi'],
    testnet: 'BSC Testnet',
    nativeCurrency: 'BNB',
    chainId: 56,
  },
  {
    id: 'aptos',
    name: 'Aptos',
    icon: '🔺',
    color: '#00d4a0',
    tagline: 'Move language L1',
    description: 'New L1 from ex-Meta/Diem engineers. Move language for safer smart contracts. Parallel execution engine (Block-STM). Strong academic research foundation.',
    type: 'L1',
    consensus: 'AptosBFT (PoS)',
    language: ['Move'],
    tps: '~160,000',
    finality: '<1 sec',
    avgGasFee: '<$0.001',
    tvl: '$1B+',
    docsUrl: 'https://aptos.dev',
    faucetUrl: 'https://aptos.dev/en/network/faucet',
    explorerUrl: 'https://explorer.aptoslabs.com',
    ecosystem: ['DeFi', 'NFTs', 'Gaming', 'RWA'],
    strengths: ['Move language safety', 'Very high theoretical TPS', 'Strong engineering team', 'Parallel execution'],
    weaknesses: ['Move has steep learning curve', 'Smaller ecosystem than EVM', 'Less developer tooling'],
    bestFor: ['Move language experiments', 'High-throughput DeFi', 'Real-world asset tokenization'],
    testnet: 'Aptos Devnet',
    nativeCurrency: 'APT',
  },
  {
    id: 'sui',
    name: 'Sui',
    icon: '💧',
    color: '#4da2ff',
    tagline: 'Object-based Move blockchain',
    description: 'Object-centric blockchain from Mysten Labs. Programmable Transaction Blocks, zkLogin for Web2 auth, DeepBook on-chain order book. Fastest growing new L1.',
    type: 'L1',
    consensus: 'Narwhal & Bullshark (PoS)',
    language: ['Move (Sui variant)'],
    tps: '~120,000',
    finality: '<500ms',
    avgGasFee: '<$0.001',
    tvl: '$2B+',
    docsUrl: 'https://docs.sui.io',
    faucetUrl: 'https://faucet.sui.io',
    explorerUrl: 'https://suiscan.xyz',
    ecosystem: ['DeFi', 'Gaming', 'NFTs', 'Consumer'],
    strengths: ['Object model for better UX', 'zkLogin (Web2 auth)', 'Instant finality', 'PTBs for complex txs'],
    weaknesses: ['Move variant differs from Aptos Move', 'Smaller ecosystem', 'Less DeFi depth'],
    bestFor: ['Consumer apps needing zkLogin', 'Gaming', 'NFT marketplaces', 'High-speed trading'],
    testnet: 'Sui Testnet',
    nativeCurrency: 'SUI',
  },
  {
    id: 'starknet',
    name: 'Starknet',
    icon: '⭐',
    color: '#ec796b',
    tagline: 'ZK-rollup on Ethereum',
    description: 'ZK-rollup by StarkWare using STARK proofs and Cairo language. Native account abstraction, recursive proofs. Most mathematically rigorous scaling solution.',
    type: 'Rollup',
    consensus: 'ZK-Rollup (STARK)',
    language: ['Cairo'],
    tps: '~1,000+',
    finality: '~30 min (proof gen)',
    avgGasFee: '$0.01–$0.10',
    tvl: '$800M+',
    docsUrl: 'https://docs.starknet.io',
    faucetUrl: 'https://starknet-faucet.vercel.app',
    explorerUrl: 'https://starkscan.co',
    ecosystem: ['DeFi', 'Gaming', 'ZK Apps'],
    strengths: ['Strongest ZK security', 'Native account abstraction', 'Cairo is powerful', 'Recursive proofs'],
    weaknesses: ['Cairo has steep learning curve', 'Slower proof generation', 'Smaller ecosystem'],
    bestFor: ['ZK-native applications', 'Privacy features', 'Mathematically complex logic', 'Account abstraction'],
    testnet: 'Starknet Sepolia',
    nativeCurrency: 'STRK / ETH',
  },
  {
    id: 'ton',
    name: 'TON',
    icon: '💎',
    color: '#0088cc',
    tagline: "Telegram's blockchain",
    description: "The Open Network — Telegram's blockchain with 900M+ potential users via Telegram Mini Apps. FunC/Tact smart contracts, Jetton tokens, TON Connect wallet.",
    type: 'L1',
    consensus: 'Proof of Stake (BFT)',
    language: ['FunC', 'Tact'],
    tps: '~100,000',
    finality: '~5 sec',
    avgGasFee: '<$0.01',
    tvl: '$700M+',
    docsUrl: 'https://docs.ton.org',
    faucetUrl: 'https://t.me/testgiver_ton_bot',
    explorerUrl: 'https://tonscan.org',
    ecosystem: ['Mini Apps', 'DeFi', 'GameFi', 'Payments'],
    strengths: ['900M Telegram users access', 'Mini Apps distribution', 'Very low fees', 'Fast finality'],
    weaknesses: ['FunC is difficult', 'Less DeFi depth', 'Unique architecture vs EVM'],
    bestFor: ['Telegram mini apps', 'Consumer payments', 'Social apps', 'Gaming in Telegram'],
    testnet: 'TON Testnet',
    nativeCurrency: 'TON',
  },
]

export interface SoliditySnippet {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  code: string
}

export const SOLIDITY_SNIPPETS: SoliditySnippet[] = [
  {
    id: 'erc20-basic',
    title: 'ERC-20 Token',
    description: 'Minimal ERC-20 token using OpenZeppelin. Transfer, approve, allowance.',
    category: 'Tokens',
    difficulty: 'beginner',
    tags: ['erc20', 'token', 'openzeppelin'],
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`,
  },
  {
    id: 'erc721-nft',
    title: 'ERC-721 NFT',
    description: 'Basic NFT contract with mint, tokenURI, and owner-controlled supply.',
    category: 'NFTs',
    difficulty: 'beginner',
    tags: ['erc721', 'nft', 'openzeppelin', 'metadata'],
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor(address initialOwner)
        ERC721("MyNFT", "MNFT")
        Ownable(initialOwner)
    {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner returns (uint256)
    {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}`,
  },
  {
    id: 'reentrancy-safe',
    title: 'Reentrancy-Safe Vault',
    description: 'ETH vault with checks-effects-interactions pattern and ReentrancyGuard.',
    category: 'Security',
    difficulty: 'intermediate',
    tags: ['reentrancy', 'security', 'vault', 'checks-effects-interactions'],
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SecureVault is ReentrancyGuard {
    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // nonReentrant + checks-effects-interactions
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount; // effect BEFORE interaction
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }
}`,
  },
  {
    id: 'multisig',
    title: 'Multi-Sig Wallet',
    description: 'Simple N-of-M multisig wallet. Propose, confirm, and execute transactions.',
    category: 'Wallets',
    difficulty: 'intermediate',
    tags: ['multisig', 'wallet', 'governance', 'security'],
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiSig {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;
    }

    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmed;

    modifier onlyOwner() {
        require(isOwner(msg.sender), "Not owner");
        _;
    }

    constructor(address[] memory _owners, uint256 _required) {
        owners = _owners;
        required = _required;
    }

    function isOwner(address addr) public view returns (bool) {
        for (uint i = 0; i < owners.length; i++)
            if (owners[i] == addr) return true;
        return false;
    }

    function submit(address to, uint256 value, bytes calldata data)
        external onlyOwner returns (uint256)
    {
        transactions.push(Transaction(to, value, data, false, 0));
        return transactions.length - 1;
    }

    function confirm(uint256 txId) external onlyOwner {
        require(!confirmed[txId][msg.sender], "Already confirmed");
        confirmed[txId][msg.sender] = true;
        transactions[txId].confirmations++;
        if (transactions[txId].confirmations >= required) _execute(txId);
    }

    function _execute(uint256 txId) internal {
        Transaction storage t = transactions[txId];
        require(!t.executed, "Already executed");
        t.executed = true;
        (bool ok,) = t.to.call{value: t.value}(t.data);
        require(ok, "Execution failed");
    }

    receive() external payable {}
}`,
  },
  {
    id: 'upgradeable-proxy',
    title: 'Upgradeable Proxy (UUPS)',
    description: 'UUPS upgradeable contract pattern using OpenZeppelin. Separate logic and storage.',
    category: 'Patterns',
    difficulty: 'advanced',
    tags: ['upgradeable', 'proxy', 'uups', 'openzeppelin', 'patterns'],
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyContractV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 public value;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() { _disableInitializers(); }

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }

    function setValue(uint256 _value) external {
        value = _value;
    }

    function _authorizeUpgrade(address newImpl)
        internal override onlyOwner {}
}`,
  },
  {
    id: 'staking-rewards',
    title: 'Staking Rewards Contract',
    description: 'ERC-20 staking contract that distributes reward tokens over time.',
    category: 'DeFi',
    difficulty: 'advanced',
    tags: ['staking', 'defi', 'rewards', 'yield'],
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StakingRewards is ReentrancyGuard {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    uint256 public rewardRate;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    constructor(address _staking, address _rewards, uint256 _rate) {
        stakingToken = IERC20(_staking);
        rewardsToken = IERC20(_rewards);
        rewardRate = _rate;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalSupply == 0) return rewardPerTokenStored;
        return rewardPerTokenStored +
            (rewardRate * (block.timestamp - lastUpdateTime) * 1e18) / totalSupply;
    }

    function earned(address account) public view returns (uint256) {
        return (balanceOf[account] *
            (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18
            + rewards[account];
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        totalSupply += amount;
        balanceOf[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        totalSupply -= amount;
        balanceOf[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        rewardsToken.transfer(msg.sender, reward);
    }
}`,
  },
]
