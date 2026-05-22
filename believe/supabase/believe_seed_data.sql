-- ============================================================
-- BELIEVE PLATFORM — COMPLETE SEED DATA
-- Every resource found across all research sessions
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================

insert into categories (slug, name, description, icon, color, sort_order) values
  ('ai-ml', 'AI & Machine Learning', 'Foundational AI, ML, deep learning, LLMs, and generative AI', '🤖', '#6366f1', 1),
  ('ai-agents', 'AI Agents', 'Autonomous agents, multi-agent systems, agentic frameworks, MCP, RAG', '⚡', '#8b5cf6', 2),
  ('blockchain', 'Blockchain', 'Multi-chain development — Ethereum, Solana, Bitcoin, and more', '⛓️', '#f59e0b', 3),
  ('blockchain-security', 'Blockchain Security', 'Smart contract auditing, bug bounties, security tools, CTFs', '🔐', '#ef4444', 4),
  ('building-apps', 'Building Applications', 'Full-stack dApps, Web3 tooling, dev frameworks, backend & frontend', '🏗️', '#10b981', 5),
  ('opportunities', 'Developer Opportunities', 'Hackathons, grants, bounties, jobs, fellowships, and programs', '💰', '#f97316', 6);


-- ============================================================
-- SUBCATEGORIES — AI & ML
-- ============================================================

insert into subcategories (category_id, slug, name, sort_order)
select id, 'fundamentals', 'AI Fundamentals', 1 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'machine-learning', 'Machine Learning', 2 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'deep-learning', 'Deep Learning', 3 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'llms', 'Large Language Models', 4 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'prompt-engineering', 'Prompt Engineering', 5 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'computer-vision', 'Computer Vision', 6 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'nlp', 'NLP', 7 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'rl', 'Reinforcement Learning', 8 from categories where slug = 'ai-ml';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'books', 'Free Books', 9 from categories where slug = 'ai-ml';

-- AI AGENTS
insert into subcategories (category_id, slug, name, sort_order)
select id, 'frameworks', 'Agent Frameworks', 1 from categories where slug = 'ai-agents';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'courses', 'Courses & Tutorials', 2 from categories where slug = 'ai-agents';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'mcp', 'Model Context Protocol', 3 from categories where slug = 'ai-agents';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'rag', 'RAG & Retrieval', 4 from categories where slug = 'ai-agents';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'projects', 'Projects & GitHub', 5 from categories where slug = 'ai-agents';

-- BLOCKCHAIN
insert into subcategories (category_id, slug, name, sort_order)
select id, 'ethereum', 'Ethereum', 1 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'solana', 'Solana', 2 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'bitcoin', 'Bitcoin', 3 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'layer2', 'Layer 2 & Scaling', 4 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'defi', 'DeFi', 5 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'multi-chain', 'Multi-Chain & Cross-Chain', 6 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'fundamentals', 'Blockchain Fundamentals', 7 from categories where slug = 'blockchain';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'books', 'Free Books', 8 from categories where slug = 'blockchain';

-- BLOCKCHAIN SECURITY
insert into subcategories (category_id, slug, name, sort_order)
select id, 'auditing', 'Smart Contract Auditing', 1 from categories where slug = 'blockchain-security';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'tools', 'Security Tools', 2 from categories where slug = 'blockchain-security';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'ctf', 'CTF & Practice', 3 from categories where slug = 'blockchain-security';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'bug-bounty', 'Bug Bounty Programs', 4 from categories where slug = 'blockchain-security';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'vulnerabilities', 'Vulnerability Research', 5 from categories where slug = 'blockchain-security';

-- BUILDING APPS
insert into subcategories (category_id, slug, name, sort_order)
select id, 'tools', 'Dev Tools', 1 from categories where slug = 'building-apps';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'frameworks', 'Frameworks', 2 from categories where slug = 'building-apps';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'tutorials', 'Full-Stack Tutorials', 3 from categories where slug = 'building-apps';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'languages', 'Programming Languages', 4 from categories where slug = 'building-apps';

insert into subcategories (category_id, slug, name, sort_order)
select id, 'infrastructure', 'Node Providers & Infrastructure', 5 from categories where slug = 'building-apps';


-- ============================================================
-- RESOURCES — AI & ML: FUNDAMENTALS
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, has_certificate, is_featured, is_official)
select
  'Elements of AI',
  'https://www.elementsofai.com',
  'Free online course by University of Helsinki. Understand what AI is, what can be done with it, and how to start creating AI methods. Over 2 million students from 170+ countries.',
  c.id, s.id, 'course', 'elementsofai.com', 'University of Helsinki', 'beginner', true,
  array['ai-basics', 'no-code', 'concepts', 'ethics'], true, true, false
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, has_certificate, is_featured)
select
  'CS50 Introduction to AI with Python',
  'https://www.edx.org/course/cs50s-introduction-to-artificial-intelligence-with-python',
  'Harvard University''s introduction to modern artificial intelligence using Python. Covers search, knowledge, uncertainty, optimization, learning, neural networks, language.',
  c.id, s.id, 'course', 'edX / Harvard', 'Harvard', 'beginner', true,
  array['python', 'search', 'neural-networks', 'nlp', 'harvard'], true, true
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Google AI Learning Hub',
  'https://grow.google/ai/',
  'Free AI training from Google. Covers generative AI fundamentals, productivity with AI tools, prompt mastery with Gemini, and NotebookLM. Practical, hands-on.',
  c.id, s.id, 'course', 'Google', 'Google', 'beginner', true,
  array['google', 'gemini', 'genai', 'practical'], true, false
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Microsoft Learn AI Hub',
  'https://learn.microsoft.com/en-us/ai/',
  'AI training from Microsoft covering Azure AI Foundry, MCP code examples, Copilot, agents at scale. Technical and business role paths.',
  c.id, s.id, 'course', 'Microsoft Learn', 'Microsoft', 'all_levels', true,
  array['microsoft', 'azure', 'copilot', 'agents', 'mcp']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'MIT OpenCourseWare — AI Courses',
  'https://openlearning.mit.edu/news/13-foundational-ai-courses-resources-mit',
  '13 foundational AI courses and resources from MIT Open Learning. Most are completely free with lectures, notes, and problem sets.',
  c.id, s.id, 'course', 'MIT OCW', 'MIT', 'all_levels', true,
  array['mit', 'university', 'academic', 'foundational']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'fundamentals' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — AI & ML: MACHINE LEARNING
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, duration, tags, has_certificate, is_featured)
select
  'Machine Learning Specialization — Andrew Ng',
  'https://www.coursera.org/specializations/machine-learning-introduction',
  'The gold standard ML course. 3-course specialization from Stanford + DeepLearning.AI. Covers supervised, unsupervised learning, neural networks, decision trees. 4.8M+ learners.',
  c.id, s.id, 'course', 'Coursera', 'Andrew Ng / Stanford', 'beginner', true,
  '3 months', array['supervised', 'unsupervised', 'python', 'sklearn', 'andrew-ng'], true, true
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'machine-learning' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Stanford CS229 — Machine Learning',
  'https://cs229.stanford.edu',
  'Stanford''s famous full machine learning course. Covers regression, classification, neural networks, SVMs, unsupervised learning, reinforcement learning. Full lectures available free.',
  c.id, s.id, 'course', 'Stanford', 'Andrew Ng', 'advanced', true,
  array['stanford', 'academic', 'theory', 'rigorous', 'mathematics']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'machine-learning' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'ML Zoomcamp — End-to-End ML Engineering',
  'https://datatalks.club/blog/free-machine-learning-courses.html',
  'Practical ML engineering course. Covers regression, classification, trees, deep learning, deployment with FastAPI, Docker, Kubernetes. Capstone production system.',
  c.id, s.id, 'course', 'DataTalks.Club', 'Alexey Grigorev', 'intermediate', true,
  array['engineering', 'deployment', 'fastapi', 'docker', 'mlops']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'machine-learning' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'fast.ai — Practical Deep Learning for Coders',
  'https://www.fast.ai',
  'Hands-on deep learning course. Build models immediately for real tasks with Python, PyTorch, fastai. Data cleaning, training, deployment. No prior ML knowledge needed.',
  c.id, s.id, 'course', 'fast.ai', 'Jeremy Howard', 'beginner', true,
  array['pytorch', 'fastai', 'practical', 'projects', 'image-classification']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'machine-learning' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — AI & ML: DEEP LEARNING
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, has_certificate)
select
  'Deep Learning Specialization — DeepLearning.AI',
  'https://www.coursera.org/specializations/deep-learning',
  '5-course deep learning specialization by Andrew Ng. CNNs, RNNs, LSTMs, Transformers, batch normalization. Build & train neural networks. Audit free.',
  c.id, s.id, 'course', 'Coursera', 'Andrew Ng / DeepLearning.AI', 'intermediate', true,
  array['cnn', 'rnn', 'lstm', 'transformers', 'tensorflow'], true
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'deep-learning' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Hugging Face Deep Reinforcement Learning Course',
  'https://huggingface.co/learn/deep-rl-course/en/unit0/introduction',
  'Build RL expertise with Stable Baselines3 and CleanRL. Train agents in real environments, share results with the community. Free certificate available.',
  c.id, s.id, 'course', 'Hugging Face', 'Hugging Face', 'intermediate', true,
  array['reinforcement-learning', 'stable-baselines3', 'cleanrl', 'agents']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'rl' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — AI & ML: LLMs
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Hugging Face LLM Course',
  'https://huggingface.co/learn/llm-course/chapter1/1',
  'Master LLMs and NLP using Hugging Face ecosystem — Transformers, Datasets, Tokenizers, Accelerate. Fine-tuning, deployment, advanced topics. Completely free, no ads.',
  c.id, s.id, 'course', 'Hugging Face', 'Hugging Face Team', 'intermediate', true,
  array['transformers', 'fine-tuning', 'nlp', 'huggingface', 'llm'], true
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'llms' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'DeepLearning.AI Short Courses (50+ free)',
  'https://www.deeplearning.ai/courses/',
  'Massive library of short courses: LangChain, RAG, vector databases, LLMOps, fine-tuning, agents, diffusion models, MCP, smolagents, and more. Most are free.',
  c.id, s.id, 'course', 'DeepLearning.AI', 'Various Experts', 'all_levels', true,
  array['langchain', 'rag', 'vector-db', 'fine-tuning', 'llmops', 'mcp']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'llms' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Hugging Face MCP Course',
  'https://huggingface.co/learn',
  'Learn Model Context Protocol from fundamentals to advanced applications. Theory, design, and real-world projects. Free with certificate.',
  c.id, s.id, 'course', 'Hugging Face', 'Hugging Face', 'intermediate', true,
  array['mcp', 'model-context-protocol', 'tools', 'agents']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'llms' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Hugging Face Computer Vision Course',
  'https://huggingface.co/learn',
  'Master computer vision ML techniques with Hugging Face models and libraries. Classification, detection, segmentation. Free certificate.',
  c.id, s.id, 'course', 'Hugging Face', 'Hugging Face', 'intermediate', true,
  array['computer-vision', 'image-classification', 'detection']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'computer-vision' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Hugging Face Diffusion Models Course',
  'https://huggingface.co/learn',
  'Diffusion model theory and practice. Generate images and audio with Diffusers, train from scratch, fine-tune on datasets, Stable Diffusion. Free.',
  c.id, s.id, 'course', 'Hugging Face', 'Hugging Face', 'intermediate', true,
  array['diffusion', 'stable-diffusion', 'image-generation', 'diffusers']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'deep-learning' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — AI & ML: FREE BOOKS
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Deep Learning — Goodfellow, Bengio & Courville',
  'https://www.deeplearningbook.org',
  'The definitive deep learning textbook. Covers linear algebra, probability, ML basics, deep networks, CNNs, RNNs, generative models. Freely available online.',
  c.id, s.id, 'book', 'deeplearningbook.org', 'Goodfellow, Bengio, Courville', 'advanced', true,
  array['deep-learning', 'theory', 'math', 'cnn', 'rnn', 'generative'], true
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'books' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Neural Networks and Deep Learning',
  'http://neuralnetworksanddeeplearning.com',
  'Free online book by Michael Nielsen. Goes from basics of neural networks to building and training deep models. Covers backpropagation, regularization, CNNs.',
  c.id, s.id, 'book', 'neuralnetworksanddeeplearning.com', 'Michael Nielsen', 'beginner', true,
  array['neural-networks', 'backpropagation', 'cnn', 'beginner-friendly']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'books' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Artificial Intelligence: Foundations of Computational Agents (3rd Ed)',
  'https://artint.info',
  'Free online textbook covering agents, search, reasoning, planning, learning, uncertainty, and multi-agent systems. Comprehensive academic text.',
  c.id, s.id, 'book', 'artint.info', 'Poole & Mackworth', 'advanced', true,
  array['agents', 'search', 'planning', 'reasoning', 'academic']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'books' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Foundations of Large Language Models',
  'https://arxiv.org/abs/2501.09223',
  'Free book covering LLM fundamentals: tokenization, transformers, pre-training, fine-tuning, RLHF, alignment, prompt engineering, evaluation.',
  c.id, s.id, 'book', 'arXiv', 'Tong Xiao & Jingbo Zhu', 'intermediate', true,
  array['llm', 'transformers', 'rlhf', 'fine-tuning', 'alignment']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'books' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Demystifying Artificial Intelligence',
  'https://www.springerprofessional.de',
  'Business-focused free AI book. Explores how AI impacts real-world applications, symbolic vs statistical AI, and business relevance. Perfect for non-technical readers.',
  c.id, s.id, 'book', 'Springer', 'Emmanuel Gillain', 'beginner', true,
  array['business', 'overview', 'non-technical', 'applications']
from categories c, subcategories s
where c.slug = 'ai-ml' and s.slug = 'books' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — AI AGENTS
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Hugging Face AI Agents Course',
  'https://huggingface.co/learn/agents-course',
  'Community-driven agent course. Covers core concepts, build with smolagents, LlamaIndex, LangGraph. Experiment in HF Spaces. Compete on leaderboards. Free certificate.',
  c.id, s.id, 'course', 'Hugging Face', 'Hugging Face', 'intermediate', true,
  array['agents', 'smolagents', 'llamaindex', 'langgraph', 'huggingface'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'courses' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'IBM — Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI',
  'https://www.coursera.org/learn/agentic-ai-with-langgraph-crewai-autogen-and-beeai',
  'IBM course on building intelligent, autonomous multi-agent systems. Covers agentic design, orchestration, LangGraph workflows, CrewAI, AutoGen. Free to audit on Coursera.',
  c.id, s.id, 'course', 'Coursera / IBM', 'IBM', 'intermediate', true,
  array['langgraph', 'crewai', 'autogen', 'beeai', 'ibm', 'orchestration'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'courses' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Free AI Agents Resources GitHub Repo',
  'https://github.com/avinash201199/free-ai-agents-resources',
  '300+ agentic AI resources. 12-lesson structured course, 45+ Jupyter notebooks, tutorials on LangChain/LangGraph/CrewAI/AutoGen, multi-agent projects, awesome lists.',
  c.id, s.id, 'github', 'GitHub', 'avinash201199', 'all_levels', true,
  array['curated', 'jupyter', 'notebooks', 'multi-agent', 'awesome-list']
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'projects' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'LangChain Documentation',
  'https://docs.langchain.com',
  'Official documentation for LangChain. Chains, agents, memory, tools, RAG, expression language (LCEL), integrations. The most widely used LLM framework.',
  c.id, s.id, 'documentation', 'LangChain', 'LangChain', 'intermediate', true,
  array['langchain', 'framework', 'chains', 'memory', 'tools', 'lcel'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'LangGraph Documentation',
  'https://langchain-ai.github.io/langgraph/',
  'Official LangGraph docs. Build stateful, multi-actor LLM workflows as graphs. Cycles, human-in-the-loop, memory, streaming. Great for complex agent architectures.',
  c.id, s.id, 'documentation', 'LangGraph', 'LangChain', 'intermediate', true,
  array['langgraph', 'graphs', 'state-machines', 'workflows', 'cycles'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'CrewAI Documentation',
  'https://docs.crewai.com',
  'Official CrewAI docs. Role-based multi-agent framework. Define agents with roles, tools, backstories. Create tasks and crews. Great for automation workflows.',
  c.id, s.id, 'documentation', 'CrewAI', 'CrewAI', 'beginner', true,
  array['crewai', 'multi-agent', 'roles', 'tasks', 'automation'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'AutoGen Documentation',
  'https://microsoft.github.io/autogen/',
  'Microsoft''s AutoGen framework. Multi-agent conversations, code execution, tool use, custom agents. Production-grade multi-agent systems.',
  c.id, s.id, 'documentation', 'AutoGen', 'Microsoft', 'intermediate', true,
  array['autogen', 'microsoft', 'multi-agent', 'code-execution'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'OpenAI Agents SDK Documentation',
  'https://openai.github.io/openai-agents-python/',
  'OpenAI''s official Agents SDK. Lightweight framework for AI agent automation, memory, tools, handoffs. Production-ready from OpenAI.',
  c.id, s.id, 'documentation', 'OpenAI', 'OpenAI', 'intermediate', true,
  array['openai', 'agents-sdk', 'memory', 'tools', 'handoffs'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'n8n Documentation',
  'https://docs.n8n.io',
  'Open-source workflow automation with AI capabilities. Build agentic AI pipelines visually. Integrates with 400+ services. Self-hostable.',
  c.id, s.id, 'documentation', 'n8n', 'n8n', 'beginner', true,
  array['n8n', 'no-code', 'workflow', 'automation', 'visual'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'LlamaIndex Documentation',
  'https://docs.llamaindex.ai',
  'Official LlamaIndex docs. Data framework for LLMs. RAG, knowledge graphs, chat engines, agents. Connects LLMs to diverse data sources.',
  c.id, s.id, 'documentation', 'LlamaIndex', 'LlamaIndex', 'intermediate', true,
  array['llamaindex', 'rag', 'knowledge-graph', 'chat-engine', 'data'], true
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'rag' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Anthropic MCP Official Docs',
  'https://modelcontextprotocol.io',
  'Official Model Context Protocol documentation. Standard for connecting AI models to tools, data sources, and prompts. Build MCP servers and clients.',
  c.id, s.id, 'documentation', 'Anthropic', 'Anthropic', 'intermediate', true,
  array['mcp', 'model-context-protocol', 'anthropic', 'standard', 'tools']
from categories c, subcategories s
where c.slug = 'ai-agents' and s.slug = 'mcp' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: FUNDAMENTALS
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Cyfrin Updraft — Blockchain Basics',
  'https://updraft.cyfrin.io/courses/blockchain-basics',
  'Master blockchain''s core concepts: transactions, wallets, consensus, scalability. Non-technical foundation course for devs and web3 professionals. 100% free.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Patrick Collins', 'beginner', true,
  array['consensus', 'wallets', 'transactions', 'fundamentals'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Great Learning — Blockchain Basics',
  'https://www.mygreatlearning.com/academy/learn-for-free/courses/blockchain-basics',
  'Free blockchain course covering Bitcoin, Ethereum, Neo, Hyperledger. Consensus mechanisms, Proof of Work, Proof of Stake, smart contracts, industry use cases.',
  c.id, s.id, 'course', 'Great Learning', 'Great Learning', 'beginner', true,
  array['bitcoin', 'ethereum', 'consensus', 'pow', 'pos']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Blockchain Development Resources — GitHub',
  'https://github.com/frankiefab100/Blockchain-Development-Resources',
  '47+ categorized Web3 tutorials. Smart contracts on Ethereum, Solana, Polygon, Celo. NFTs, DeFi, DAO, ZK proofs, cryptography, tools like RemixIDE, Hardhat, IPFS.',
  c.id, s.id, 'github', 'GitHub', 'frankiefab100', 'all_levels', true,
  array['curated', 'tutorials', 'tools', 'zk-proofs', 'defi', 'nft']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'fundamentals' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'web3.career Learn Web3',
  'https://web3.career/learn-web3',
  'Free web3 learning resources hub. 47 tutorials covering Ethereum, Solana, DeFi, NFTs, ZK proofs, TypeScript, React, Solidity, smart contracts.',
  c.id, s.id, 'tutorial', 'web3.career', 'web3.career', 'all_levels', true,
  array['ethereum', 'solana', 'defi', 'nft', 'zk-proofs', 'typescript']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'fundamentals' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: ETHEREUM
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official, is_featured)
select
  'Ethereum.org Docs',
  'https://ethereum.org/en/developers/docs/',
  'Official Ethereum documentation. EVM, smart contracts, wallets, nodes, Solidity, DeFi protocols, Layer 2, staking. Comprehensive and always updated.',
  c.id, s.id, 'documentation', 'ethereum.org', 'Ethereum Foundation', 'all_levels', true,
  array['evm', 'solidity', 'layer2', 'staking', 'wallets', 'defi'], true, true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Cyfrin Updraft — Solidity 101',
  'https://updraft.cyfrin.io/courses/solidity',
  'Best beginner Solidity course. Smart contract basics, EVM, Foundry, testing, deployment. Completely free, taught by Patrick Collins. Tens of thousands of students.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Patrick Collins', 'beginner', true,
  array['solidity', 'evm', 'foundry', 'smart-contracts', 'deployment'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Cyfrin Updraft — Foundry Fundamentals',
  'https://updraft.cyfrin.io/courses/foundry',
  'Level up with Foundry. Solidity testing, Forge, Anvil, Chainlink oracles, local network deployment. Industry-standard toolchain for Ethereum devs.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Patrick Collins', 'intermediate', true,
  array['foundry', 'forge', 'anvil', 'testing', 'chainlink', 'oracles']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Cyfrin Updraft — Advanced Foundry',
  'https://updraft.cyfrin.io/courses/advanced-foundry',
  'Advanced Ethereum dev techniques. Uniswap v4, ZK proofs intro, account abstraction, EU compliance, tokenized real-world assets, Layer 2 rollups.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Patrick Collins', 'advanced', true,
  array['advanced', 'uniswap', 'account-abstraction', 'zk-proofs', 'rwa', 'layer2']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'CryptoZombies — Learn Solidity',
  'https://cryptozombies.io',
  'Interactive Solidity learning by building a zombie game. Covers ERC721, ERC20, Web3.js, Truffle. Most popular gamified Solidity course. Completely free.',
  c.id, s.id, 'course', 'CryptoZombies', 'Loom Network', 'beginner', true,
  array['solidity', 'gamified', 'erc721', 'erc20', 'interactive']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Solidity by Example',
  'https://solidity-by-example.org',
  'Introduction to Solidity with simple, working examples. Covers basic to advanced patterns: reentrancy, delegatecall, create2, upgradeable contracts, DeFi examples.',
  c.id, s.id, 'tutorial', 'solidity-by-example.org', 'Smart Contract Programmer', 'all_levels', true,
  array['solidity', 'patterns', 'examples', 'reentrancy', 'defi']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Alchemy University — Web3 Development',
  'https://university.alchemy.com',
  'Free comprehensive web3 development education. Ethereum fundamentals, JavaScript & Web3, smart contract dev, The Road to Web3 challenge series.',
  c.id, s.id, 'course', 'Alchemy', 'Alchemy', 'beginner', true,
  array['ethereum', 'javascript', 'web3js', 'ethersjs', 'road-to-web3']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'ethereum' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: SOLANA
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official, is_featured)
select
  'Solana Docs',
  'https://docs.solana.com',
  'Official Solana documentation. Architecture, accounts model, transactions, programs, tokens, SPL tokens, Anchor framework, wallets, validators.',
  c.id, s.id, 'documentation', 'solana.com', 'Solana Foundation', 'all_levels', true,
  array['solana', 'accounts', 'transactions', 'spl-tokens', 'anchor'], true, true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'solana' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'RareSkills — 60 Days of Solana',
  'https://rareskills.io/solana-tutorial',
  'Complete Solana course designed for Ethereum developers. Bridges EVM knowledge to Solana architecture. Accounts model, programs, Anchor, DeFi on Solana.',
  c.id, s.id, 'course', 'RareSkills', 'RareSkills', 'intermediate', true,
  array['solana', 'anchor', 'rust', 'programs', 'accounts', 'bridge-from-evm'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'solana' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Cyfrin Updraft — Solana Development',
  'https://updraft.cyfrin.io/courses/solana',
  'Build and secure Solana smart contracts using Native Rust and Anchor. Covers core concepts, DeFi protocols. From beginner to advanced Solana dev. Free.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Cyfrin Team', 'intermediate', true,
  array['solana', 'rust', 'anchor', 'defi', 'native-programs']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'solana' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Solana Cookbook',
  'https://solanacookbook.com',
  'Developer reference for building Solana applications. Recipes for common patterns: wallets, tokens, NFTs, programs, compression, guides with code examples.',
  c.id, s.id, 'documentation', 'solanacookbook.com', 'Solana Community', 'intermediate', true,
  array['solana', 'recipes', 'tokens', 'nft', 'wallets', 'patterns']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'solana' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Superteam Earn — Learn by Earning on Solana',
  'https://earn.superteam.fun',
  'Earn money while building Solana skills. Bounties, grants, freelance projects from top Solana protocols. Real projects, real pay, build reputation.',
  c.id, s.id, 'tool', 'Superteam', 'Superteam', 'intermediate', true,
  array['solana', 'bounties', 'earn', 'projects', 'reputation']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'solana' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: BITCOIN
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Mastering Bitcoin (Free on GitHub)',
  'https://github.com/bitcoinbook/bitcoinbook',
  'The definitive Bitcoin book by Andreas M. Antonopoulos. Covers cryptography, transactions, scripting, mining, wallets, security, Lightning Network. Freely available.',
  c.id, s.id, 'book', 'GitHub / O''Reilly', 'Andreas M. Antonopoulos', 'intermediate', true,
  array['bitcoin', 'cryptography', 'lightning', 'mining', 'scripts'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'bitcoin' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Programming Bitcoin',
  'https://github.com/jimmysong/programmingbitcoin',
  'Learn Bitcoin from scratch through programming. Covers elliptic curve cryptography, transactions, scripts, blocks, networking, SPV, Segwit. Free on GitHub.',
  c.id, s.id, 'book', 'GitHub / O''Reilly', 'Jimmy Song', 'advanced', true,
  array['bitcoin', 'programming', 'elliptic-curve', 'segwit', 'scripts']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'bitcoin' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Bitcoin Whitepaper',
  'https://bitcoin.org/bitcoin.pdf',
  'Original Satoshi Nakamoto Bitcoin whitepaper (2008). 9 pages. Peer-to-peer electronic cash system, proof of work, timestamp server, incentives.',
  c.id, s.id, 'article', 'bitcoin.org', 'Satoshi Nakamoto', 'intermediate', true,
  array['bitcoin', 'whitepaper', 'satoshi', 'pow', 'p2p']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'bitcoin' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: FREE BOOKS
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Mastering Ethereum (Free on GitHub)',
  'https://github.com/ethereumbook/ethereumbook',
  'The definitive Ethereum book by Antonopoulos & Wood. Keys, wallets, transactions, smart contracts, Vyper, DeFi, ERC standards, security. Completely free on GitHub.',
  c.id, s.id, 'book', 'GitHub / O''Reilly', 'Antonopoulos & Wood', 'intermediate', true,
  array['ethereum', 'smart-contracts', 'vyper', 'keys', 'wallets', 'security'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'books' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Mastering the Lightning Network',
  'https://github.com/lnbook/lnbook',
  'Free O''Reilly book on Lightning Network. Payment channels, HTLC, routing, node operation, security. By Antonopoulos, Osuntokun & Pickhardt.',
  c.id, s.id, 'book', 'GitHub / O''Reilly', 'Antonopoulos et al.', 'advanced', true,
  array['lightning', 'bitcoin', 'payment-channels', 'htlc', 'routing']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'books' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Ethereum Yellow Paper',
  'https://ethereum.github.io/yellowpaper/paper.pdf',
  'Formal specification of Ethereum by Dr. Gavin Wood. EVM specification, state transitions, gas costs, cryptographic primitives. The technical bible of Ethereum.',
  c.id, s.id, 'book', 'ethereum.github.io', 'Dr. Gavin Wood', 'advanced', true,
  array['ethereum', 'evm', 'technical', 'specification', 'formal']
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'books' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: LAYER 2
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Cyfrin Updraft — ZK Proofs Intro',
  'https://updraft.cyfrin.io/courses/zk-proof-fundamentals',
  'Beginner-friendly, no-code intro to zero-knowledge proofs. Learn how ZKPs work and why they matter for blockchain scalability and privacy.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Cyfrin', 'beginner', true,
  array['zk-proofs', 'zero-knowledge', 'privacy', 'scaling'], false
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'layer2' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Polygon Documentation',
  'https://docs.polygon.technology',
  'Official Polygon docs. PoS chain, zkEVM, CDK, bridges, DeFi development. EVM-compatible Layer 2 with massive ecosystem.',
  c.id, s.id, 'documentation', 'polygon.technology', 'Polygon Labs', 'intermediate', true,
  array['polygon', 'zkevm', 'cdk', 'layer2', 'evm-compatible'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'layer2' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Base Documentation',
  'https://docs.base.org',
  'Official Base docs. Coinbase''s Ethereum L2 built on OP Stack. Low fees, developer friendly. Home of onchain economy.',
  c.id, s.id, 'documentation', 'base.org', 'Coinbase / Base', 'intermediate', true,
  array['base', 'op-stack', 'coinbase', 'layer2', 'low-fees'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'layer2' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Arbitrum Documentation',
  'https://docs.arbitrum.io',
  'Official Arbitrum docs. Arbitrum One, Nova, Orbit chains, Stylus (Rust on EVM), nitro rollups. Largest Ethereum L2 ecosystem.',
  c.id, s.id, 'documentation', 'arbitrum.io', 'Offchain Labs', 'intermediate', true,
  array['arbitrum', 'rollups', 'stylus', 'rust', 'nitro', 'layer2'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'layer2' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN: MULTI-CHAIN
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Aptos Developer Documentation',
  'https://aptos.dev',
  'Official Aptos docs. Move language, parallel execution, object model, DeFi primitives, tokenization, SDKs. Fast and scalable Layer 1.',
  c.id, s.id, 'documentation', 'aptos.dev', 'Aptos Labs', 'intermediate', true,
  array['aptos', 'move', 'parallel-execution', 'layer1'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Sui Developer Documentation',
  'https://docs.sui.io',
  'Official Sui docs. Move language, object model, PTBs (Programmable Transaction Blocks), zkLogin, Kiosk, DeepBook. Fast finality L1 from Mysten Labs.',
  c.id, s.id, 'documentation', 'docs.sui.io', 'Mysten Labs', 'intermediate', true,
  array['sui', 'move', 'ptb', 'zklogin', 'defi'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Polkadot Documentation',
  'https://wiki.polkadot.network',
  'Official Polkadot wiki. Parachains, relay chain, XCM cross-chain messaging, substrate framework, staking, governance. Interoperability focused.',
  c.id, s.id, 'documentation', 'polkadot.network', 'Web3 Foundation', 'intermediate', true,
  array['polkadot', 'parachains', 'substrate', 'xcm', 'interoperability'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'NEAR Protocol Documentation',
  'https://docs.near.org',
  'Official NEAR docs. Rust and JavaScript smart contracts, sharding, account model, cross-contract calls, chain abstraction. User-friendly blockchain.',
  c.id, s.id, 'documentation', 'near.org', 'NEAR Protocol', 'intermediate', true,
  array['near', 'rust', 'javascript', 'sharding', 'chain-abstraction'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Avalanche Documentation',
  'https://docs.avax.network',
  'Official Avalanche docs. C-Chain (EVM), subnets, Avalanche consensus, Warp messaging, HyperSDK. High throughput EVM-compatible platform.',
  c.id, s.id, 'documentation', 'avax.network', 'Ava Labs', 'intermediate', true,
  array['avalanche', 'subnets', 'c-chain', 'evm', 'warp-messaging'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'BNB Chain Documentation',
  'https://docs.bnbchain.org',
  'Official BNB Chain docs. BSC (BEP-20), opBNB Layer 2, BNB Greenfield, Beacon Chain. EVM-compatible with massive DeFi ecosystem.',
  c.id, s.id, 'documentation', 'bnbchain.org', 'BNB Chain', 'intermediate', true,
  array['bnb', 'bsc', 'bep20', 'opbnb', 'defi'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Starknet Documentation',
  'https://docs.starknet.io',
  'Official Starknet docs. Cairo language, STARK proofs, account abstraction, Starknet.js, OpenZeppelin for Cairo. ZK-rollup on Ethereum.',
  c.id, s.id, 'documentation', 'starknet.io', 'StarkWare', 'advanced', true,
  array['starknet', 'cairo', 'stark-proofs', 'account-abstraction', 'zk-rollup'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'TON Documentation',
  'https://docs.ton.org',
  'Official TON docs. FunC smart contracts, TON Connect, Telegram mini apps, Jettons (tokens), NFTs. Telegram''s blockchain with 900M potential users.',
  c.id, s.id, 'documentation', 'ton.org', 'TON Foundation', 'intermediate', true,
  array['ton', 'func', 'telegram', 'mini-apps', 'jettons'], true
from categories c, subcategories s
where c.slug = 'blockchain' and s.slug = 'multi-chain' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BLOCKCHAIN SECURITY
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured, is_official)
select
  'Cyfrin Updraft — Smart Contract Security & Auditing',
  'https://updraft.cyfrin.io/courses/security',
  'The ultimate free smart contract auditing course. Fuzzing, invariant testing, formal verification, DeFi security. Taught by Patrick Collins & Tincho from The Red Guild. 50+ hours.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Patrick Collins & Tincho', 'advanced', true,
  array['auditing', 'fuzzing', 'invariant-testing', 'formal-verification', 'defi', 'foundry'], true, false
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'auditing' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Cyfrin Security & Auditing Course — GitHub',
  'https://github.com/Cyfrin/security-and-auditing-full-course-s23',
  'Full open-source repo for the Cyfrin security course. The most advanced smart contract security, DeFi, assembly, and web3 auditor course ever created.',
  c.id, s.id, 'github', 'GitHub', 'Cyfrin', 'advanced', true,
  array['open-source', 'assembly', 'yul', 'defi', 'auditing', 'attacker-mindset']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'auditing' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Ethernaut — Smart Contract Hacking Game',
  'https://ethernaut.openzeppelin.com',
  'OpenZeppelin''s free Web3/Solidity hacking game. 29 levels covering reentrancy, delegatecall, storage exploits, overflow, etc. Hands-on practice for auditors.',
  c.id, s.id, 'tool', 'OpenZeppelin', 'OpenZeppelin', 'intermediate', true,
  array['ctf', 'gamified', 'reentrancy', 'delegatecall', 'storage', 'overflow']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'ctf' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_featured)
select
  'Damn Vulnerable DeFi',
  'https://www.damnvulnerabledefi.xyz',
  'Free set of DeFi hacking challenges. Flash loans, oracle manipulation, governance attacks, lending exploits. Practice real attack vectors in safe environment.',
  c.id, s.id, 'tool', 'damnvulnerabledefi.xyz', 'tinchoabbate', 'advanced', true,
  array['defi', 'flash-loans', 'oracle-manipulation', 'governance', 'challenges'], true
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'ctf' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Immunefi — Bug Bounty Platform',
  'https://immunefi.com',
  'World''s largest Web3 bug bounty platform. $100M+ paid out to hackers. Submit vulnerabilities in DeFi protocols. Beginner-friendly learn section included.',
  c.id, s.id, 'tool', 'Immunefi', 'Immunefi', 'advanced', true,
  array['bug-bounty', 'defi', 'earn', 'vulnerabilities', 'real-protocols']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'bug-bounty' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'CodeHawks — Smart Contract Audit Competitions',
  'https://www.codehawks.com',
  'Cyfrin''s competitive auditing platform. Compete in live audit contests, earn money finding bugs in real protocols. Great for building portfolio and reputation.',
  c.id, s.id, 'tool', 'CodeHawks', 'Cyfrin', 'intermediate', true,
  array['competition', 'audit-contest', 'portfolio', 'earn', 'real-protocols']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'bug-bounty' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Solodit — Smart Contract Exploit Database',
  'https://solodit.xyz',
  'Searchable database of real smart contract exploits and audit findings. Study how actual hacks happened. Essential reference for security researchers.',
  c.id, s.id, 'tool', 'Solodit', 'Cyfrin', 'intermediate', true,
  array['exploits', 'database', 'research', 'findings', 'real-hacks']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'vulnerabilities' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Slither — Static Analysis Tool',
  'https://github.com/crytic/slither',
  'Free static analysis framework for Solidity. Finds vulnerabilities, printers for contract understanding, detectors for 80+ vulnerability classes. By Trail of Bits.',
  c.id, s.id, 'tool', 'GitHub', 'Trail of Bits', 'intermediate', true,
  array['static-analysis', 'solidity', 'trail-of-bits', 'vulnerability-detection', 'automated']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'tools' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Echidna — Fuzzing Tool',
  'https://github.com/crytic/echidna',
  'Free Ethereum smart contract fuzzer by Trail of Bits. Property-based testing, invariant testing. Find bugs that unit tests miss.',
  c.id, s.id, 'tool', 'GitHub', 'Trail of Bits', 'advanced', true,
  array['fuzzing', 'property-based', 'invariants', 'trail-of-bits', 'automated']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'tools' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Smart Contract Auditor Roadmap 2025',
  'https://deepstrike.io/blog/smart-contract-auditor-roadmap-2025',
  'Complete step-by-step roadmap from zero to top 1% auditor. Solidity → security research → competitions → bug bounties. Lists every resource needed.',
  c.id, s.id, 'roadmap', 'deepstrike.io', 'Deepstrike', 'beginner', true,
  array['roadmap', 'auditor', 'career', 'solidity', 'security-research']
from categories c, subcategories s
where c.slug = 'blockchain-security' and s.slug = 'auditing' and s.category_id = c.id;


-- ============================================================
-- RESOURCES — BUILDING APPLICATIONS
-- ============================================================

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Cyfrin Updraft — Full Stack Web3',
  'https://updraft.cyfrin.io/courses/full-stack-web3',
  'Master full-stack web3 development. Build blockchain-powered apps, connect wallets, implement smart contracts. Next.js + React + Solidity. Free.',
  c.id, s.id, 'course', 'Cyfrin Updraft', 'Cyfrin', 'intermediate', true,
  array['nextjs', 'react', 'solidity', 'wallets', 'ethers', 'full-stack']
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tutorials' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Complete Guide to Full Stack Ethereum Dev',
  'https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13',
  'Build full Ethereum dApp with React + ethers.js + Hardhat + The Graph. Data indexing, smart contracts, frontend integration. Free on dev.to.',
  c.id, s.id, 'tutorial', 'dev.to', 'Nader Dabit', 'intermediate', true,
  array['ethereum', 'react', 'hardhat', 'the-graph', 'ethersjs', 'full-stack']
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tutorials' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Full Stack Solana Development with React, Anchor, Rust',
  'https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291',
  'Complete guide to building Solana dApps with React, Anchor framework, Rust, and Phantom wallet. Free on dev.to by Nader Dabit.',
  c.id, s.id, 'tutorial', 'dev.to', 'Nader Dabit', 'intermediate', true,
  array['solana', 'react', 'anchor', 'rust', 'phantom', 'dapp']
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tutorials' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Hardhat Documentation',
  'https://hardhat.org/docs',
  'Official Hardhat docs. Compile, test, deploy Ethereum smart contracts. Hardhat Network, tasks, plugins, debugging with console.log. Industry standard.',
  c.id, s.id, 'documentation', 'hardhat.org', 'Nomic Foundation', 'intermediate', true,
  array['hardhat', 'ethereum', 'testing', 'deployment', 'debugging'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tools' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Foundry Book',
  'https://book.getfoundry.sh',
  'Official Foundry documentation. Fast, portable, modular toolkit for Ethereum. Forge for testing, Cast for interactions, Anvil for local node, Chisel for REPL.',
  c.id, s.id, 'documentation', 'getfoundry.sh', 'Foundry Team', 'intermediate', true,
  array['foundry', 'forge', 'cast', 'anvil', 'chisel', 'solidity'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tools' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Ethers.js Documentation',
  'https://docs.ethers.org',
  'Official ethers.js v6 docs. Complete Ethereum library for JavaScript. Wallet, providers, contract interaction, ABI encoding, signing.',
  c.id, s.id, 'documentation', 'docs.ethers.org', 'Richard Moore', 'intermediate', true,
  array['ethers', 'javascript', 'wallet', 'contracts', 'signing'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tools' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Viem Documentation',
  'https://viem.sh',
  'TypeScript interface for Ethereum. Low-level, stateless, fast. Type-safe ABI encoding, public/wallet client, chains. Modern alternative to ethers.js.',
  c.id, s.id, 'documentation', 'viem.sh', 'Viem Team', 'intermediate', true,
  array['viem', 'typescript', 'ethereum', 'type-safe', 'modern'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tools' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Wagmi Documentation',
  'https://wagmi.sh',
  'React hooks for Ethereum. Type-safe, composable hooks for wallet connection, contract reads/writes, account, network. Used by top dApps.',
  c.id, s.id, 'documentation', 'wagmi.sh', 'Wagmi Team', 'intermediate', true,
  array['wagmi', 'react', 'hooks', 'wallet', 'ethereum', 'type-safe'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Thirdweb Documentation',
  'https://portal.thirdweb.com',
  'Developer-first Web3 framework. SDK, contracts, wallets, engine. Deploy contracts, build dApps, payments. TypeScript, React, Unity, Unreal SDKs.',
  c.id, s.id, 'documentation', 'thirdweb.com', 'Thirdweb', 'beginner', true,
  array['thirdweb', 'sdk', 'wallets', 'payments', 'multi-chain', 'easy'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Alchemy SDK Documentation',
  'https://docs.alchemy.com',
  'Alchemy blockchain node provider and enhanced APIs. NFT API, Transfers API, Notify webhooks, Account Abstraction (ERC-4337). Free tier available.',
  c.id, s.id, 'documentation', 'alchemy.com', 'Alchemy', 'intermediate', true,
  array['alchemy', 'node-provider', 'nft-api', 'webhooks', 'account-abstraction'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'infrastructure' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'Infura Documentation',
  'https://docs.infura.io',
  'Ethereum/IPFS node provider by Consensys. REST API, WebSocket, RPC access to multiple chains. Free tier: 100k requests/day.',
  c.id, s.id, 'documentation', 'infura.io', 'Consensys', 'intermediate', true,
  array['infura', 'node-provider', 'ethereum', 'ipfs', 'rpc'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'infrastructure' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'The Graph Documentation',
  'https://thegraph.com/docs',
  'Official The Graph docs. Index and query blockchain data with GraphQL. Build subgraphs for Ethereum, Polygon, Arbitrum and more. Essential for dApp data.',
  c.id, s.id, 'documentation', 'thegraph.com', 'The Graph Foundation', 'intermediate', true,
  array['the-graph', 'indexing', 'graphql', 'subgraphs', 'data'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'infrastructure' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags, is_official)
select
  'OpenZeppelin Contracts',
  'https://docs.openzeppelin.com/contracts',
  'Battle-tested smart contract library. ERC20, ERC721, ERC1155, AccessControl, upgradeable contracts, Governor for DAOs, security patterns. Free, open-source.',
  c.id, s.id, 'documentation', 'openzeppelin.com', 'OpenZeppelin', 'intermediate', true,
  array['openzeppelin', 'erc20', 'erc721', 'access-control', 'upgradeable', 'dao'], true
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'frameworks' and s.category_id = c.id;

insert into resources (title, url, description, category_id, subcategory_id, type, platform, author, difficulty, is_free, tags)
select
  'Awesome Web3 — Curated Resource List',
  'https://github.com/ahmet/awesome-web3',
  'Curated list of web3 resources, libraries, tools. Covers Ethereum, Solana, Avalanche, Thirdweb, Farcaster, Lens. Developer DAO, BuidlGuidl, Metaschool.',
  c.id, s.id, 'github', 'GitHub', 'ahmet', 'all_levels', true,
  array['curated', 'awesome-list', 'resources', 'tools', 'multi-chain']
from categories c, subcategories s
where c.slug = 'building-apps' and s.slug = 'tutorials' and s.category_id = c.id;


-- ============================================================
-- OPPORTUNITIES — HACKATHONS
-- ============================================================

insert into opportunities (title, url, description, type, organizer, ecosystem, prize_pool, is_active, is_recurring, location, tags)
values
  (
    'ETHGlobal Hackathons',
    'https://ethglobal.com/events',
    'World''s top Ethereum hackathon series. Multiple events per year — NYC, Cannes, Lisbon, Tokyo, Mumbai, online. Prizes, mentorship, VC exposure. Past winners raised from a16z, YC, Founders Fund.',
    'hackathon', 'ETHGlobal',
    array['Ethereum', 'All EVM'],
    'Varies per event', true, true, 'hybrid',
    array['ethereum', 'web3', 'defi', 'ai-x-crypto', 'beginner-friendly']
  ),
  (
    'ETHGlobal HackMoney (Online)',
    'https://ethglobal.com/events/hackmoney2026',
    'ETHGlobal''s DeFi-focused online hackathon. Build DeFi apps on Ethereum and L2s. Async format, global participants welcome.',
    'hackathon', 'ETHGlobal',
    array['Ethereum', 'Sui', 'DeFi'],
    '$50,000+', true, true, 'online',
    array['defi', 'ethereum', 'online', 'async', 'sui']
  ),
  (
    'DoraHacks Global Hackathons',
    'https://dorahacks.io/hackathon',
    'Global hackathon platform. AI, Web3, Quantum Computing, BioTech events. Frontier tech builder community. Multiple active hackathons at any time.',
    'hackathon', 'DoraHacks',
    array['Multi-chain', 'AI', 'Quantum'],
    'Varies', true, true, 'hybrid',
    array['ai', 'web3', 'multi-chain', 'quantum', 'biotech']
  ),
  (
    'Solana Hackathons',
    'https://solana.com/hackathon',
    'Official Solana Foundation hackathon series. Large prize pools ($1M+ total), global track. DeFi, NFTs, infrastructure, AI on Solana.',
    'hackathon', 'Solana Foundation',
    array['Solana'],
    '$1,000,000+', true, true, 'online',
    array['solana', 'defi', 'nft', 'infrastructure', 'ai-on-solana']
  ),
  (
    'Chainlink Hackathons',
    'https://chain.link/hackathon',
    'Chainlink''s developer hackathon. Oracle integration, smart contracts, data feeds, VRF, CCIP cross-chain. Good for hybrid smart contract projects.',
    'hackathon', 'Chainlink',
    array['Ethereum', 'Multi-chain'],
    '$300,000+', true, true, 'online',
    array['chainlink', 'oracles', 'vrf', 'ccip', 'hybrid-contracts']
  ),
  (
    'EasyA Hackathons',
    'https://easya.io/hackathons',
    'University-focused Web3 hackathons. Events at major universities globally and at Consensus conferences. Great for student builders.',
    'hackathon', 'EasyA',
    array['Multi-chain'],
    'Varies', true, true, 'in-person',
    array['university', 'students', 'web3', 'consensus', 'beginners']
  );


-- ============================================================
-- OPPORTUNITIES — GRANTS
-- ============================================================

insert into opportunities (title, url, description, type, organizer, ecosystem, prize_pool, is_active, location, tags)
values
  (
    'Ethereum Foundation Grants',
    'https://ethereum.foundation/grants/',
    'EF grants for research and development that benefits the Ethereum ecosystem. Open-source tooling, research, client teams, ZK research, education.',
    'grant', 'Ethereum Foundation',
    array['Ethereum'],
    '$5,000 - $500,000+', true, 'online',
    array['ethereum', 'research', 'open-source', 'tooling', 'zk', 'education']
  ),
  (
    'Web3 Foundation Grants (Polkadot)',
    'https://grants.web3.foundation',
    'Open-source software and research grants for Polkadot and Kusama ecosystems. Dev tools, infrastructure, DeFi, governance, ink! smart contracts.',
    'grant', 'Web3 Foundation',
    array['Polkadot', 'Kusama'],
    '$10,000 - $100,000', true, 'online',
    array['polkadot', 'kusama', 'substrate', 'ink', 'infrastructure']
  ),
  (
    'Solana Foundation Grants',
    'https://solana.org/grants',
    'Grants for builders on Solana. Superteam microgrants ($10K), ecosystem grants, convertible investments. Emerging markets focus.',
    'grant', 'Solana Foundation',
    array['Solana'],
    'Up to $250,000', true, 'online',
    array['solana', 'defi', 'infrastructure', 'nft', 'tooling']
  ),
  (
    'Aptos Foundation Grants',
    'https://aptosfoundation.org/grants',
    'Grants for Aptos ecosystem projects. Apps, tooling, infrastructure, payments. Ecosystem grants $5K-$50K, Payments grants up to $150K. Milestone-based.',
    'grant', 'Aptos Foundation',
    array['Aptos'],
    '$5,000 - $150,000', true, 'online',
    array['aptos', 'move', 'defi', 'payments', 'tooling']
  ),
  (
    'Arbitrum Foundation Grants',
    'https://arbitrum.foundation/grants',
    'Funding for projects building on Arbitrum chains. dApps, infrastructure, communities. Milestone-based, rolling applications.',
    'grant', 'Arbitrum Foundation',
    array['Arbitrum'],
    '$5,000 - $250,000', true, 'online',
    array['arbitrum', 'layer2', 'defi', 'infrastructure', 'community']
  ),
  (
    'Gitcoin Grants',
    'https://grants.gitcoin.co',
    'Quadratic funding for open source and public goods in Web3. Community votes amplify your contributions. Multiple rounds per year.',
    'grant', 'Gitcoin',
    array['Multi-chain'],
    'Community-funded', true, 'online',
    array['public-goods', 'open-source', 'quadratic-funding', 'community', 'ethereum']
  ),
  (
    'ZetaChain Grants',
    'https://www.zetachain.com/grants',
    'Milestone-based grants for ZetaChain ecosystem. DeFi, NFTs, gaming, AI, DePIN, infrastructure. Bounties and hackathons also available.',
    'grant', 'ZetaChain',
    array['ZetaChain'],
    'Up to $50,000', true, 'online',
    array['zetachain', 'cross-chain', 'defi', 'ai', 'depin']
  ),
  (
    'Chainlink Grants Program',
    'https://chain.link/community/grants',
    'Developer tools, ecosystem services, integration, research, social impact grants. Bug bounties for security reviews. Strong technical guidance.',
    'grant', 'Chainlink',
    array['Multi-chain'],
    'Varies by category', true, 'online',
    array['chainlink', 'oracles', 'research', 'dev-tools', 'security']
  );


-- ============================================================
-- OPPORTUNITIES — BOUNTIES & JOBS
-- ============================================================

insert into opportunities (title, url, description, type, organizer, ecosystem, is_active, is_recurring, location, tags)
values
  (
    'Immunefi Bug Bounties',
    'https://immunefi.com/explore/',
    'Largest Web3 bug bounty platform. Find vulnerabilities in DeFi protocols and earn massive rewards. $100M+ paid to whitehats. Programs from top protocols.',
    'bounty', 'Immunefi',
    array['Multi-chain'],
    true, true, 'online',
    array['security', 'smart-contracts', 'defi', 'rewards', 'whitehat']
  ),
  (
    'Code4rena Audit Contests',
    'https://code4rena.com',
    'Competitive smart contract security auditing. Compete for prize pools by finding bugs in upcoming DeFi protocols. Build reputation, earn USDC.',
    'bounty', 'Code4rena',
    array['Ethereum', 'Multi-chain'],
    true, true, 'online',
    array['security', 'audit-contest', 'competitive', 'earn-usdc', 'defi']
  ),
  (
    'Sherlock Security Competitions',
    'https://www.sherlock.xyz',
    'Smart contract audit competitions with guaranteed payouts. Fixed-pay model for auditors. Compete alongside top security researchers globally.',
    'bounty', 'Sherlock',
    array['Ethereum', 'Multi-chain'],
    true, true, 'online',
    array['security', 'auditing', 'competitive', 'guaranteed-pay']
  ),
  (
    'Superteam Earn Bounties',
    'https://earn.superteam.fun',
    'Solana ecosystem bounties from top protocols. Development, design, content, research tasks. Global with regional hubs in India, Vietnam, Nigeria.',
    'bounty', 'Superteam',
    array['Solana'],
    true, true, 'online',
    array['solana', 'bounties', 'earn', 'africa-friendly', 'content', 'dev']
  ),
  (
    'Layer3 — Web3 Tasks & Quests',
    'https://layer3.xyz',
    'Gamified web3 learning and earning. Complete tasks, build skills, earn rewards. Discover protocols, build on-chain reputation.',
    'bounty', 'Layer3',
    array['Multi-chain'],
    true, true, 'online',
    array['gamified', 'quests', 'earning', 'reputation', 'multi-chain']
  ),
  (
    'CryptoJobsList',
    'https://cryptojobslist.com',
    '572+ active crypto/Web3 jobs. DeFi, remote, developer roles. Companies with $400M+ AUM. Smart contract engineers, auditors, protocol engineers.',
    'job', 'CryptoJobsList',
    array['Multi-chain'],
    true, true, 'online',
    array['jobs', 'remote', 'web3', 'smart-contracts', 'defi', 'developers']
  ),
  (
    'CryptoJobs.com',
    'https://crypto.jobs',
    'Hundreds of daily Web3 job posts. Community-driven platform for blockchain developers, designers, marketers. Remote-first opportunities.',
    'job', 'CryptoJobs',
    array['Multi-chain'],
    true, true, 'online',
    array['jobs', 'remote', 'blockchain', 'community', 'all-roles']
  ),
  (
    'Web3.career Jobs',
    'https://web3.career',
    'Curated Web3 job board. Solidity, Rust, TypeScript, and non-technical roles. Salary ranges, company details, remote options.',
    'job', 'web3.career',
    array['Multi-chain'],
    true, true, 'online',
    array['jobs', 'solidity', 'rust', 'remote', 'salary-transparency']
  );


-- ============================================================
-- VERIFY COUNTS
-- ============================================================

-- Run these to verify seed data:
-- select count(*) from categories;            -- should be 6
-- select count(*) from subcategories;         -- should be 30+
-- select count(*) from resources;             -- should be 60+
-- select count(*) from opportunities;         -- should be 20+
-- select * from v_stats;
