import { createClient } from '@/lib/supabase/server'
import { getOpenAI } from '@/lib/openai'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check usage limits (free trial = 5 emails, pro = unlimited)
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (!subscription) {
      // Check free trial usage
      const { count } = await supabase
        .from('generations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if ((count || 0) >= 5) {
        return NextResponse.json(
          { error: 'Free trial limit reached. Please upgrade to Pro.' },
          { status: 403 }
        )
      }
    }

    const { url, context } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Step 1: Research the prospect
    const researchPrompt = `You are a sales researcher. Analyze this URL and extract useful information for writing a cold email.

URL: ${url}

If it's a LinkedIn URL, infer what you can about the person's:
- Name and role
- Company and industry
- Recent posts or activity themes
- Pain points they might have

If it's a company website, analyze:
- What the company does
- Their target market
- Recent news or blog posts
- Potential challenges they face

Be concise and focus on actionable insights for personalizing outreach.`

    const openai = getOpenAI()
    const researchResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: researchPrompt }],
      max_tokens: 500,
    })

    const research = researchResponse.choices[0]?.message?.content || ''

    // Step 2: Generate the email
    const emailPrompt = `You are an expert cold email copywriter. Write a personalized cold email based on this research.

RESEARCH:
${research}

${context ? `WHAT I'M SELLING:
${context}` : 'I am a freelancer looking to offer my services.'}

RULES:
- Keep it under 150 words
- Start with something specific about them (not "I came across your profile")
- Be conversational, not salesy
- One clear call to action (usually a quick call)
- No generic flattery
- Sound human, not like AI

Return your response in this exact format:
SUBJECT: [subject line]
---
[email body]`

    const emailResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: emailPrompt }],
      max_tokens: 500,
    })

    const emailContent = emailResponse.choices[0]?.message?.content || ''
    
    // Parse the response
    const subjectMatch = emailContent.match(/SUBJECT:\s*(.+?)(?:\n|---)/s)
    const subject = subjectMatch?.[1]?.trim() || 'Quick question'
    const body = emailContent.split('---')[1]?.trim() || emailContent

    // Log the generation
    await supabase.from('generations').insert({
      user_id: user.id,
      url,
      context,
      research,
      subject,
      body,
    })

    return NextResponse.json({ research, subject, body })
  } catch (error) {
    console.error('Generate error:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate email'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
