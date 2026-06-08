import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Kimi K2 via Hugging Face Inference API ────────────────────
const HF_MODEL    = 'moonshotai/Kimi-K2-Instruct'
const HF_ENDPOINT = `https://api-inference.huggingface.co/models/${HF_MODEL}/v1/chat/completions`

async function callKimi(systemPrompt: string, userPrompt: string): Promise<string> {
  const res = await fetch(HF_ENDPOINT, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.HF_API_KEY}`,
    },
    body: JSON.stringify({
      model:       HF_MODEL,
      max_tokens:  600,
      temperature: 0.4,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt   },
      ],
    }),
    signal: AbortSignal.timeout(30000), // 30s timeout
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Hugging Face API error ${res.status}: ${err}`)
  }

  const data = await res.json()

  // HF inference returns OpenAI-compatible format
  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error('Empty response from Kimi K2')
  return text
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.HF_API_KEY) {
      return NextResponse.json(
        { error: 'HF_API_KEY not configured. Add it to your .env.local file.' },
        { status: 503 }
      )
    }

    // Fetch learner progress from Supabase
    const [progressRes, categoryRes, allCatsRes] = await Promise.all([
      supabase
        .from('v_resources_with_progress')
        .select('title, type, category_name, difficulty, progress_status, tags')
        .in('progress_status', ['in_progress', 'completed'])
        .limit(20),
      supabase
        .from('v_category_progress')
        .select('category_name, total, completed, in_progress'),
      supabase
        .from('categories')
        .select('name, slug'),
    ])

    const progress   = progressRes.data  || []
    const categories = categoryRes.data  || []
    const allCats    = allCatsRes.data   || []

    const inProgress = progress.filter((r) => r.progress_status === 'in_progress')
    const completed  = progress.filter((r) => r.progress_status === 'completed')

    const contextSummary = `
Learner's current state on Believe (open learning platform for developers):

Currently in progress (${inProgress.length}):
${inProgress.length > 0
  ? inProgress.map((r) => `  - ${r.title} [${r.category_name}, ${r.difficulty}]`).join('\n')
  : '  - None yet'}

Completed (${completed.length}):
${completed.length > 0
  ? completed.map((r) => `  - ${r.title} [${r.category_name}]`).join('\n')
  : '  - None yet'}

Category progress:
${categories.length > 0
  ? categories.map((c) => `  - ${c.category_name}: ${c.completed}/${c.total} resources completed, ${c.in_progress} in progress`).join('\n')
  : '  - No progress tracked yet'}

Available sections: ${allCats.map((c) => c.name).join(', ')}
    `.trim()

    const systemPrompt = `You are a learning advisor for Believe, a developer learning platform covering AI/ML, AI Agents, Blockchain, Security, Building Apps, and Developer Opportunities.

Your role is to give concise, actionable, and motivating learning recommendations based on the learner's actual progress. Be specific and practical. Always respond with valid JSON only — no markdown, no explanations outside the JSON.`

    const userPrompt = `Based on this learner's progress data, give 3 specific "what to learn next" recommendations.

${contextSummary}

Rules:
- If nothing is started yet, recommend beginner-friendly starting points
- Build on what they are currently learning where possible  
- Be specific about why each recommendation fits their current state
- category must be one of: ai-ml, ai-agents, blockchain, blockchain-security, building-apps, opportunities

Respond ONLY with this exact JSON structure, no markdown fences:
{
  "recommendations": [
    {
      "title": "short action title (max 8 words)",
      "description": "2 sentences: what to do and what they will learn",
      "category": "one of the allowed category slugs",
      "urgency": "start-now",
      "reason": "one sentence explaining why this fits their current progress"
    },
    {
      "title": "...",
      "description": "...",
      "category": "...",
      "urgency": "this-week",
      "reason": "..."
    },
    {
      "title": "...",
      "description": "...",
      "category": "...",
      "urgency": "this-month",
      "reason": "..."
    }
  ],
  "encouragement": "one short motivating sentence personalised to where they are in their learning journey"
}`

    const raw = await callKimi(systemPrompt, userPrompt)

    // Parse — strip any accidental markdown fences
    let parsed
    try {
      const clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
      // Find the JSON object in the response
      const start = clean.indexOf('{')
      const end   = clean.lastIndexOf('}')
      if (start === -1 || end === -1) throw new Error('No JSON object found in response')
      parsed = JSON.parse(clean.slice(start, end + 1))
    } catch (parseErr: any) {
      console.error('[/api/recommend] JSON parse failed:', parseErr.message)
      console.error('[/api/recommend] Raw response:', raw)
      throw new Error('Could not parse recommendation response. Try again.')
    }

    // Validate structure
    if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
      throw new Error('Invalid recommendation structure returned')
    }

    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error('[/api/recommend]', error.message)
    return NextResponse.json(
      { error: error.message || 'Recommendation failed' },
      { status: 500 }
    )
  }
}
