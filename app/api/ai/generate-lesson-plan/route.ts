import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { topic, gradeLevel, subject, duration } = await request.json()

    const systemPrompt = `
      You are an expert educational content creator specializing in lesson plans for grade ${gradeLevel} ${subject} classes.
      Create a comprehensive, well-structured lesson plan on the topic of "${topic}" for a ${duration}-minute class.
      
      The lesson plan should include:
      1. A clear title
      2. Learning objectives (3-5)
      3. Required materials
      4. A warm-up activity (5 minutes)
      5. Main activities with time allocations
      6. Assessment strategy
      7. Homework assignment
      8. Differentiation strategies for both advanced and struggling students
      
      Format the response as a structured JSON object with the following keys:
      - title (string)
      - gradeLevel (string)
      - subject (string)
      - duration (string)
      - objectives (array of strings)
      - materials (array of strings)
      - warmUp (string)
      - mainActivities (array of strings)
      - assessment (string)
      - homework (string)
      - differentiation (object with keys: advanced, struggling)
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Create a ${duration}-minute lesson plan for grade ${gradeLevel} students on the topic of "${topic}" in the subject of ${subject}.`,
    })

    // Parse the JSON response
    try {
      const lessonPlan = JSON.parse(text)
      return NextResponse.json({ lessonPlan })
    } catch (parseError) {
      console.error("Error parsing lesson plan JSON:", parseError)
      return NextResponse.json({ error: "Failed to parse lesson plan" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error generating lesson plan:", error)
    return NextResponse.json({ error: "Failed to generate lesson plan" }, { status: 500 })
  }
}
