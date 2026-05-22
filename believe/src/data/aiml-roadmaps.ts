// ============================================================
// BELIEVE — AI & ML Roadmap Data
// Structured learning paths for each subcategory
// ============================================================

export interface RoadmapStep {
  id: string
  title: string
  description: string
  resourceTitle: string   // matches resource title in DB
  resourceUrl: string
  platform: string
  estimatedHours: number
  type: 'required' | 'recommended' | 'optional'
  tags: string[]
}

export interface RoadmapPath {
  id: string
  slug: string
  title: string
  icon: string
  color: string
  description: string
  totalHours: number
  steps: RoadmapStep[]
}

export const AI_ML_ROADMAPS: RoadmapPath[] = [
  // ── FUNDAMENTALS ─────────────────────────────────────────
  {
    id: 'ai-fundamentals',
    slug: 'fundamentals',
    title: 'AI Fundamentals',
    icon: '🧠',
    color: '#6366f1',
    description: 'Build a solid conceptual foundation before writing a single line of ML code.',
    totalHours: 30,
    steps: [
      {
        id: 'f1',
        title: 'What is AI?',
        description: 'Understand what AI actually is, where it came from, and how it relates to ML and deep learning.',
        resourceTitle: 'Elements of AI',
        resourceUrl: 'https://www.elementsofai.com',
        platform: 'elementsofai.com',
        estimatedHours: 10,
        type: 'required',
        tags: ['concepts', 'beginner', 'no-code'],
      },
      {
        id: 'f2',
        title: 'AI with Python',
        description: 'Apply AI concepts with code. Search, knowledge, uncertainty, neural nets, language.',
        resourceTitle: 'CS50 Introduction to AI with Python',
        resourceUrl: 'https://cs50.harvard.edu/ai/',
        platform: 'Harvard / edX',
        estimatedHours: 20,
        type: 'required',
        tags: ['python', 'search', 'neural-networks'],
      },
      {
        id: 'f3',
        title: 'Google AI Practicals',
        description: 'Learn prompt mastery, Gemini integration, and AI-powered workflows.',
        resourceTitle: 'Google AI Learning Hub',
        resourceUrl: 'https://grow.google/ai/',
        platform: 'Google',
        estimatedHours: 5,
        type: 'recommended',
        tags: ['google', 'gemini', 'practical'],
      },
    ],
  },

  // ── MACHINE LEARNING ─────────────────────────────────────
  {
    id: 'machine-learning',
    slug: 'machine-learning',
    title: 'Machine Learning',
    icon: '📐',
    color: '#8b5cf6',
    description: 'From regression to trees to neural nets — the full supervised and unsupervised ML toolkit.',
    totalHours: 120,
    steps: [
      {
        id: 'ml1',
        title: 'ML Specialization — Andrew Ng',
        description: 'The gold standard. Supervised, unsupervised learning, recommenders, and reinforcement learning.',
        resourceTitle: 'Machine Learning Specialization — Andrew Ng',
        resourceUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
        platform: 'Coursera',
        estimatedHours: 60,
        type: 'required',
        tags: ['andrew-ng', 'python', 'sklearn'],
      },
      {
        id: 'ml2',
        title: 'Stanford CS229 — Theory',
        description: 'Deep mathematical theory behind ML. For rigorous understanding after the above.',
        resourceTitle: 'Stanford CS229 — Machine Learning',
        resourceUrl: 'https://cs229.stanford.edu',
        platform: 'Stanford',
        estimatedHours: 40,
        type: 'recommended',
        tags: ['theory', 'math', 'advanced'],
      },
      {
        id: 'ml3',
        title: 'Practical ML Engineering',
        description: 'Build and deploy ML models end-to-end. FastAPI, Docker, Kubernetes for production.',
        resourceTitle: 'ML Zoomcamp — End-to-End ML Engineering',
        resourceUrl: 'https://datatalks.club/blog/free-machine-learning-courses.html',
        platform: 'DataTalks.Club',
        estimatedHours: 20,
        type: 'recommended',
        tags: ['mlops', 'deployment', 'engineering'],
      },
    ],
  },

  // ── DEEP LEARNING ────────────────────────────────────────
  {
    id: 'deep-learning',
    slug: 'deep-learning',
    title: 'Deep Learning',
    icon: '🔥',
    color: '#f59e0b',
    description: 'CNNs, RNNs, Transformers, diffusion models — the architecture of modern AI.',
    totalHours: 100,
    steps: [
      {
        id: 'dl1',
        title: 'Practical Deep Learning',
        description: 'Build real models immediately. PyTorch, fastai, image classification, deployment.',
        resourceTitle: 'fast.ai — Practical Deep Learning for Coders',
        resourceUrl: 'https://www.fast.ai',
        platform: 'fast.ai',
        estimatedHours: 30,
        type: 'required',
        tags: ['pytorch', 'practical', 'fastai'],
      },
      {
        id: 'dl2',
        title: 'Deep Learning Specialization',
        description: 'Structured 5-course path. CNNs, RNNs, LSTMs, hyperparameter tuning, batch norm.',
        resourceTitle: 'Deep Learning Specialization — DeepLearning.AI',
        resourceUrl: 'https://www.coursera.org/specializations/deep-learning',
        platform: 'Coursera',
        estimatedHours: 50,
        type: 'required',
        tags: ['cnn', 'rnn', 'lstm', 'tensorflow'],
      },
      {
        id: 'dl3',
        title: 'Deep Learning Bible',
        description: 'Read alongside the courses. The theoretical backbone of all modern deep learning.',
        resourceTitle: 'Deep Learning — Goodfellow, Bengio & Courville',
        resourceUrl: 'https://www.deeplearningbook.org',
        platform: 'deeplearningbook.org',
        estimatedHours: 20,
        type: 'recommended',
        tags: ['book', 'theory', 'math'],
      },
    ],
  },

  // ── LLMs ─────────────────────────────────────────────────
  {
    id: 'llms',
    slug: 'llms',
    title: 'Large Language Models',
    icon: '💬',
    color: '#10b981',
    description: 'How LLMs work, how to use them, fine-tune them, and build products with them.',
    totalHours: 80,
    steps: [
      {
        id: 'llm1',
        title: 'Hugging Face LLM Course',
        description: 'Transformers library, fine-tuning, pipelines, tokenizers, deployment. The practical LLM bible.',
        resourceTitle: 'Hugging Face LLM Course',
        resourceUrl: 'https://huggingface.co/learn/llm-course/chapter1/1',
        platform: 'Hugging Face',
        estimatedHours: 30,
        type: 'required',
        tags: ['transformers', 'fine-tuning', 'huggingface'],
      },
      {
        id: 'llm2',
        title: 'DeepLearning.AI Short Courses',
        description: '50+ short courses. LangChain, RAG, vector DBs, LLMOps, fine-tuning, MCP. Pick what you need.',
        resourceTitle: 'DeepLearning.AI Short Courses (50+ free)',
        resourceUrl: 'https://www.deeplearning.ai/courses/',
        platform: 'DeepLearning.AI',
        estimatedHours: 30,
        type: 'required',
        tags: ['langchain', 'rag', 'llmops'],
      },
      {
        id: 'llm3',
        title: 'LLM Theory — Free Book',
        description: 'Deep-dive into how LLMs are built: tokenization, pre-training, RLHF, alignment.',
        resourceTitle: 'Foundations of Large Language Models',
        resourceUrl: 'https://arxiv.org/abs/2501.09223',
        platform: 'arXiv',
        estimatedHours: 20,
        type: 'optional',
        tags: ['theory', 'rlhf', 'alignment', 'book'],
      },
    ],
  },

  // ── PROMPT ENGINEERING ───────────────────────────────────
  {
    id: 'prompt-engineering',
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    icon: '✍️',
    color: '#06b6d4',
    description: 'Master the craft of communicating with LLMs to get consistently great outputs.',
    totalHours: 15,
    steps: [
      {
        id: 'pe1',
        title: 'Prompt Engineering Guide',
        description: 'Complete guide covering chain-of-thought, few-shot, ReAct, self-consistency, and more.',
        resourceTitle: 'Prompt Engineering Guide',
        resourceUrl: 'https://www.promptingguide.ai',
        platform: 'promptingguide.ai',
        estimatedHours: 8,
        type: 'required',
        tags: ['cot', 'few-shot', 'react', 'patterns'],
      },
      {
        id: 'pe2',
        title: 'ChatGPT Prompt Engineering for Devs',
        description: 'DeepLearning.AI course on prompting best practices for developers. Free.',
        resourceTitle: 'DeepLearning.AI Short Courses (50+ free)',
        resourceUrl: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
        platform: 'DeepLearning.AI',
        estimatedHours: 4,
        type: 'required',
        tags: ['openai', 'developers', 'best-practices'],
      },
      {
        id: 'pe3',
        title: 'Anthropic Prompt Library',
        description: '100+ production-tested prompts from Anthropic. Study patterns and adapt them.',
        resourceTitle: 'Anthropic Prompt Library',
        resourceUrl: 'https://docs.anthropic.com/en/prompt-library/library',
        platform: 'Anthropic',
        estimatedHours: 3,
        type: 'recommended',
        tags: ['anthropic', 'claude', 'patterns'],
      },
    ],
  },

  // ── REINFORCEMENT LEARNING ───────────────────────────────
  {
    id: 'rl',
    slug: 'rl',
    title: 'Reinforcement Learning',
    icon: '🎮',
    color: '#ec4899',
    description: 'Train agents that learn from rewards. Core to modern AI alignment and agent development.',
    totalHours: 40,
    steps: [
      {
        id: 'rl1',
        title: 'Deep RL Course — Hugging Face',
        description: 'Train RL agents in real environments using Stable Baselines3 and CleanRL. Free cert.',
        resourceTitle: 'Hugging Face Deep Reinforcement Learning Course',
        resourceUrl: 'https://huggingface.co/learn/deep-rl-course/en/unit0/introduction',
        platform: 'Hugging Face',
        estimatedHours: 30,
        type: 'required',
        tags: ['stable-baselines3', 'cleanrl', 'environments'],
      },
      {
        id: 'rl2',
        title: 'RL Specialization — University of Alberta',
        description: 'Deep theoretical understanding of MDPs, temporal difference, Q-learning, policy gradients.',
        resourceTitle: 'Reinforcement Learning Specialization',
        resourceUrl: 'https://www.coursera.org/specializations/reinforcement-learning',
        platform: 'Coursera / U of Alberta',
        estimatedHours: 10,
        type: 'recommended',
        tags: ['mdp', 'q-learning', 'policy-gradient', 'theory'],
      },
    ],
  },
]

export function getRoadmapBySlug(slug: string): RoadmapPath | undefined {
  return AI_ML_ROADMAPS.find((r) => r.slug === slug)
}
