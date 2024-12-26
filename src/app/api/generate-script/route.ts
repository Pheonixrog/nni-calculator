import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { genre, theme, characters, complexity, includeDialogue } = await req.json()

  const prompt = `
    Generate a movie script outline based on the following:
    Genre: ${genre}
    Theme: ${theme}
    Characters: ${characters}
    Complexity: ${complexity}% (0% being very simple, 100% being very complex)
    Include Sample Dialogue: ${includeDialogue ? 'Yes' : 'No'}

    Please provide a script outline including:
    1. A brief synopsis
    2. Main characters and their descriptions
    3. Act 1: Setup (1-2 paragraphs)
    4. Act 2: Confrontation (2-3 paragraphs)
    5. Act 3: Resolution (1-2 paragraphs)
    ${includeDialogue ? '6. A sample dialogue scene' : ''}

    Adjust the complexity of the plot, character development, and themes based on the given complexity percentage.
    Format the output in a clear, easy-to-read structure.
  `

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1500,
    })

    return new Response(JSON.stringify({ script: text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error generating script:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate script' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

