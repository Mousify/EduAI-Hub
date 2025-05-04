import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // System prompt with site information
    const systemPrompt = `You are an AI assistant for the EduAI Hub platform, an educational platform that connects students with AI-powered tutoring and teachers with classroom management tools.

Key features of the platform:
- Students can get homework help and practice with AI tutors
- Teachers can create assessments, manage classes, and generate educational content
- The platform offers various tools like lesson plan generators, quiz creators, and content explainers

Your job is to help users navigate the platform, find features, and understand how to use them. Be friendly, concise, and helpful. If you don't know something, say so and suggest where they might find the information.`

    // Format the conversation history for the API
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10), // Only include the last 10 messages to stay within token limits
    ]

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      messages: formattedMessages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in AI assistant API:", error)
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
