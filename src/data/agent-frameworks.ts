// ============================================================
// BELIEVE — AI Agents Framework Data
// ============================================================

export interface Framework {
  id: string
  name: string
  icon: string
  color: string
  tagline: string
  description: string
  url: string
  docsUrl: string
  githubUrl: string
  language: string[]
  bestFor: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  stars: string
  strengths: string[]
  weaknesses: string[]
  useCases: string[]
  exampleCode: string
}

export const AGENT_FRAMEWORKS: Framework[] = [
  {
    id: 'langchain',
    name: 'LangChain',
    icon: '🦜',
    color: '#10b981',
    tagline: 'The most popular LLM framework',
    description: 'Build LLM-powered applications with chains, agents, memory, and tools. Massive ecosystem, huge community, tons of integrations.',
    url: 'https://www.langchain.com',
    docsUrl: 'https://docs.langchain.com',
    githubUrl: 'https://github.com/langchain-ai/langchain',
    language: ['Python', 'TypeScript'],
    bestFor: ['Beginners', 'Prototyping', 'RAG apps', 'Chain pipelines'],
    difficulty: 'beginner',
    stars: '95k+',
    strengths: [
      'Massive community and ecosystem',
      'Tons of integrations (100+ LLMs, vector DBs)',
      'Great for RAG and document QA',
      'Excellent documentation',
    ],
    weaknesses: [
      'Can be verbose and over-abstracted',
      'Debugging complex chains is hard',
      'Frequent breaking changes',
    ],
    useCases: ['Document Q&A', 'Chatbots', 'RAG pipelines', 'Tool-using agents'],
    exampleCode: `from langchain.agents import create_react_agent
from langchain_openai import ChatOpenAI
from langchain.tools import DuckDuckGoSearchTool

llm = ChatOpenAI(model="gpt-4o")
tools = [DuckDuckGoSearchTool()]
agent = create_react_agent(llm, tools, prompt)
result = agent.invoke({"input": "What is MCP?"})`,
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    icon: '🕸️',
    color: '#6366f1',
    tagline: 'Stateful multi-actor agent graphs',
    description: 'Build complex agent workflows as graphs with cycles, state, and human-in-the-loop. The best choice for production agentic systems.',
    url: 'https://www.langchain.com/langgraph',
    docsUrl: 'https://langchain-ai.github.io/langgraph/',
    githubUrl: 'https://github.com/langchain-ai/langgraph',
    language: ['Python', 'TypeScript'],
    bestFor: ['Multi-agent', 'Production systems', 'Complex workflows', 'Human-in-the-loop'],
    difficulty: 'intermediate',
    stars: '8k+',
    strengths: [
      'Cycles and conditional branching',
      'Built-in persistence and checkpointing',
      'Human-in-the-loop support',
      'Fine-grained control over agent flow',
    ],
    weaknesses: [
      'Steeper learning curve than LangChain',
      'Requires understanding graph concepts',
      'More boilerplate for simple use cases',
    ],
    useCases: ['Multi-agent orchestration', 'Code review agents', 'Research agents', 'Approval workflows'],
    exampleCode: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    messages: list
    next: str

graph = StateGraph(State)
graph.add_node("researcher", researcher_node)
graph.add_node("writer", writer_node)
graph.add_edge("researcher", "writer")
graph.add_edge("writer", END)
app = graph.compile()`,
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    icon: '🚀',
    color: '#f59e0b',
    tagline: 'Role-based multi-agent teams',
    description: 'Define agents with roles, goals, and backstories. Assign tasks and let your crew collaborate autonomously. Great for workflow automation.',
    url: 'https://www.crewai.com',
    docsUrl: 'https://docs.crewai.com',
    githubUrl: 'https://github.com/crewAIInc/crewAI',
    language: ['Python'],
    bestFor: ['Automation', 'Content pipelines', 'Research teams', 'Beginners to multi-agent'],
    difficulty: 'beginner',
    stars: '23k+',
    strengths: [
      'Intuitive role-based mental model',
      'Easy to get started',
      'Good for content and research workflows',
      'Active development and community',
    ],
    weaknesses: [
      'Less control than LangGraph',
      'Can be unpredictable with complex tasks',
      'Python only',
    ],
    useCases: ['Content generation', 'Market research', 'Code generation crews', 'Data analysis pipelines'],
    exampleCode: `from crewai import Agent, Task, Crew

researcher = Agent(
  role="Senior Researcher",
  goal="Find cutting-edge AI developments",
  backstory="Expert researcher with 10 years experience",
  verbose=True
)
task = Task(
  description="Research the latest in AI agents",
  agent=researcher
)
crew = Crew(agents=[researcher], tasks=[task])
result = crew.kickoff()`,
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    icon: '🤖',
    color: '#ef4444',
    tagline: 'Microsoft multi-agent conversations',
    description: 'Framework for building multi-agent systems with conversational agents that can execute code, use tools, and collaborate on complex tasks.',
    url: 'https://microsoft.github.io/autogen/',
    docsUrl: 'https://microsoft.github.io/autogen/docs/',
    githubUrl: 'https://github.com/microsoft/autogen',
    language: ['Python'],
    bestFor: ['Code execution', 'Research', 'Complex reasoning', 'Microsoft stack'],
    difficulty: 'intermediate',
    stars: '35k+',
    strengths: [
      'Excellent code execution capabilities',
      'Microsoft backing and enterprise support',
      'Flexible conversation patterns',
      'Strong research pedigree',
    ],
    weaknesses: [
      'Can be expensive (many LLM calls)',
      'Harder to control conversation flow',
      'Less beginner-friendly than CrewAI',
    ],
    useCases: ['Automated coding', 'Data analysis', 'Scientific research', 'Debate and critique agents'],
    exampleCode: `from autogen import AssistantAgent, UserProxyAgent

assistant = AssistantAgent(
  name="assistant",
  llm_config={"model": "gpt-4o"}
)
user_proxy = UserProxyAgent(
  name="user_proxy",
  code_execution_config={"work_dir": "coding"}
)
user_proxy.initiate_chat(
  assistant,
  message="Write a Python script to analyze CSV data"
)`,
  },
  {
    id: 'smolagents',
    name: 'Smolagents',
    icon: '🤗',
    color: '#f97316',
    tagline: 'Hugging Face minimal agents',
    description: 'Minimal, code-first agent framework from Hugging Face. Agents write and execute Python code as actions. Simple, transparent, powerful.',
    url: 'https://huggingface.co/docs/smolagents',
    docsUrl: 'https://huggingface.co/docs/smolagents/en/index',
    githubUrl: 'https://github.com/huggingface/smolagents',
    language: ['Python'],
    bestFor: ['Code agents', 'HuggingFace models', 'Minimalists', 'Research'],
    difficulty: 'intermediate',
    stars: '12k+',
    strengths: [
      'Minimal and transparent codebase',
      'Code as action (more powerful than tool-use)',
      'Works with any HuggingFace model',
      'Easy to understand and extend',
    ],
    weaknesses: [
      'Code execution has security risks',
      'Smaller community than LangChain',
      'Less mature than alternatives',
    ],
    useCases: ['Code-writing agents', 'Data science agents', 'HuggingFace model pipelines', 'Research prototypes'],
    exampleCode: `from smolagents import CodeAgent, DuckDuckGoSearchTool
from smolagents import HfApiModel

model = HfApiModel("meta-llama/Meta-Llama-3.1-70B-Instruct")
agent = CodeAgent(
  tools=[DuckDuckGoSearchTool()],
  model=model,
  additional_authorized_imports=["pandas", "numpy"]
)
agent.run("Analyze the top 10 AI frameworks in 2025")`,
  },
  {
    id: 'openai-agents',
    name: 'OpenAI Agents SDK',
    icon: '⚡',
    color: '#06b6d4',
    tagline: 'Official OpenAI agent framework',
    description: 'Lightweight, production-ready SDK from OpenAI. Agents, handoffs, guardrails, memory. The official way to build with GPT-4o.',
    url: 'https://openai.github.io/openai-agents-python/',
    docsUrl: 'https://openai.github.io/openai-agents-python/',
    githubUrl: 'https://github.com/openai/openai-agents-python',
    language: ['Python'],
    bestFor: ['OpenAI users', 'Production', 'Handoffs', 'Guardrails'],
    difficulty: 'beginner',
    stars: '5k+',
    strengths: [
      'Official OpenAI support',
      'Clean and minimal API',
      'Built-in handoffs between agents',
      'Guardrails for safety',
    ],
    weaknesses: [
      'OpenAI models only',
      'Newer, less battle-tested',
      'Limited community resources',
    ],
    useCases: ['Customer support agents', 'Triage and handoff flows', 'Guardrailed assistants', 'OpenAI-powered products'],
    exampleCode: `from agents import Agent, Runner, handoff

triage = Agent(
  name="Triage",
  instructions="Route queries to the right specialist.",
  handoffs=[handoff(billing_agent), handoff(tech_agent)]
)
result = await Runner.run(triage, "I have a billing question")`,
  },
  {
    id: 'n8n',
    name: 'n8n',
    icon: '🔗',
    color: '#ec4899',
    tagline: 'Visual workflow automation with AI',
    description: 'Open-source workflow automation. Build agentic AI pipelines visually — no code required. Self-hostable, 400+ integrations.',
    url: 'https://n8n.io',
    docsUrl: 'https://docs.n8n.io',
    githubUrl: 'https://github.com/n8n-io/n8n',
    language: ['No-code', 'JavaScript'],
    bestFor: ['Non-developers', 'Automation', 'Integrations', 'Visual builders'],
    difficulty: 'beginner',
    stars: '50k+',
    strengths: [
      'Visual drag-and-drop interface',
      '400+ pre-built integrations',
      'Self-hostable and free',
      'AI nodes for LLM workflows',
    ],
    weaknesses: [
      'Less flexibility than code-based frameworks',
      'Can get complex for advanced logic',
      'Not ideal for pure ML tasks',
    ],
    useCases: ['Business process automation', 'Data pipeline automation', 'Slack/email AI bots', 'CRM enrichment'],
    exampleCode: `// n8n is visual — configure via UI
// Example: AI-powered email responder workflow
// 1. Gmail Trigger → receives email
// 2. AI Agent node → drafts reply with GPT-4o
// 3. Approval → human reviews
// 4. Gmail → sends approved reply
// No code needed!`,
  },
]

export interface MCPServer {
  id: string
  name: string
  description: string
  url: string
  category: string
  tools: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  official: boolean
}

export const MCP_SERVERS: MCPServer[] = [
  { id: 'filesystem', name: 'Filesystem', description: 'Read, write, and manage files on your local machine.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem', category: 'Utilities', tools: ['read_file', 'write_file', 'list_directory', 'create_directory'], difficulty: 'beginner', official: true },
  { id: 'github', name: 'GitHub', description: 'Interact with GitHub repos — issues, PRs, code search, file access.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github', category: 'Dev Tools', tools: ['get_repo', 'list_issues', 'create_pr', 'search_code'], difficulty: 'beginner', official: true },
  { id: 'brave-search', name: 'Brave Search', description: 'Web and local search via Brave Search API. No tracking.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search', category: 'Search', tools: ['brave_web_search', 'brave_local_search'], difficulty: 'beginner', official: true },
  { id: 'postgres', name: 'PostgreSQL', description: 'Connect to PostgreSQL databases. Query, inspect schema, analyze data.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres', category: 'Database', tools: ['query', 'list_tables', 'describe_table'], difficulty: 'intermediate', official: true },
  { id: 'sqlite', name: 'SQLite', description: 'Full SQLite database access with business intelligence features.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite', category: 'Database', tools: ['query', 'list_tables', 'create_table'], difficulty: 'beginner', official: true },
  { id: 'puppeteer', name: 'Puppeteer', description: 'Browser automation and web scraping via Puppeteer.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer', category: 'Browser', tools: ['navigate', 'screenshot', 'click', 'fill', 'evaluate'], difficulty: 'intermediate', official: true },
  { id: 'slack', name: 'Slack', description: 'Post messages, manage channels, and search Slack workspaces.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack', category: 'Communication', tools: ['post_message', 'list_channels', 'get_thread'], difficulty: 'beginner', official: true },
  { id: 'google-maps', name: 'Google Maps', description: 'Places search, directions, geocoding, distance matrix.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps', category: 'Utilities', tools: ['search_places', 'get_directions', 'geocode'], difficulty: 'beginner', official: true },
  { id: 'memory', name: 'Memory', description: 'Persistent knowledge graph memory for agents across sessions.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory', category: 'Memory', tools: ['create_entities', 'create_relations', 'search_nodes', 'open_nodes'], difficulty: 'intermediate', official: true },
  { id: 'sequential-thinking', name: 'Sequential Thinking', description: 'Dynamic thinking tool for complex reasoning and reflection.', url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking', category: 'Reasoning', tools: ['sequentialthinking'], difficulty: 'advanced', official: true },
]

export interface AgentProject {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  frameworks: string[]
  estimatedHours: number
  tags: string[]
  steps: string[]
  githubSearch: string
}

export const AGENT_PROJECTS: AgentProject[] = [
  {
    id: 'research-agent',
    title: 'Research Agent',
    description: 'An agent that searches the web, reads URLs, summarizes findings, and writes a structured research report.',
    difficulty: 'beginner',
    frameworks: ['langchain', 'crewai'],
    estimatedHours: 4,
    tags: ['search', 'summarization', 'rag'],
    steps: ['Set up LLM + web search tool', 'Build search → read → summarize chain', 'Add memory for context', 'Format final report output'],
    githubSearch: 'research agent langchain',
  },
  {
    id: 'code-review-agent',
    title: 'Code Review Agent',
    description: 'Multi-agent system with a code writer, a reviewer, and a security checker that collaborate to produce clean code.',
    difficulty: 'intermediate',
    frameworks: ['langgraph', 'autogen'],
    estimatedHours: 8,
    tags: ['code', 'multi-agent', 'security'],
    steps: ['Define agent roles (writer, reviewer, security)', 'Set up LangGraph state machine', 'Add code execution sandbox', 'Implement feedback loop until approved'],
    githubSearch: 'code review multi agent langgraph',
  },
  {
    id: 'data-analyst-agent',
    title: 'Data Analyst Agent',
    description: 'Upload a CSV and ask questions in natural language. Agent writes and executes pandas code, returns charts.',
    difficulty: 'intermediate',
    frameworks: ['smolagents', 'langchain'],
    estimatedHours: 6,
    tags: ['data', 'pandas', 'code-execution', 'charts'],
    steps: ['File upload + CSV parsing tool', 'Code-writing agent with pandas access', 'Chart generation with matplotlib', 'Natural language question → answer loop'],
    githubSearch: 'data analyst agent pandas smolagents',
  },
  {
    id: 'personal-assistant',
    title: 'Personal AI Assistant',
    description: 'MCP-powered assistant that reads your files, searches the web, manages notes, and answers questions about your life.',
    difficulty: 'beginner',
    frameworks: ['openai-agents', 'n8n'],
    estimatedHours: 5,
    tags: ['mcp', 'personal', 'files', 'search'],
    steps: ['Connect filesystem + brave-search MCP servers', 'Add memory MCP for persistent context', 'Build chat interface', 'Connect to calendar/email (optional)'],
    githubSearch: 'personal assistant MCP claude',
  },
  {
    id: 'web3-monitor-agent',
    title: 'Web3 Monitor Agent',
    description: 'Agent that monitors blockchain transactions, detects anomalies, and sends Slack alerts for suspicious activity.',
    difficulty: 'advanced',
    frameworks: ['langgraph', 'langchain'],
    estimatedHours: 12,
    tags: ['web3', 'monitoring', 'alerts', 'defi'],
    steps: ['Set up Ethereum RPC connection tool', 'Build transaction fetching + parsing chain', 'Add anomaly detection logic', 'Connect Slack MCP for alerts', 'Deploy as background process'],
    githubSearch: 'blockchain monitor agent langchain ethereum',
  },
  {
    id: 'content-pipeline-agent',
    title: 'Content Pipeline Crew',
    description: 'A CrewAI crew that researches topics, writes blog posts, edits for quality, and formats for publishing.',
    difficulty: 'beginner',
    frameworks: ['crewai'],
    estimatedHours: 3,
    tags: ['content', 'writing', 'crewai', 'automation'],
    steps: ['Define researcher, writer, editor agents', 'Set up topic research task chain', 'Add quality review step', 'Output formatted markdown ready to publish'],
    githubSearch: 'crewai content blog writer crew',
  },
]
