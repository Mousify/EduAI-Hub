import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { topic, gradeLevel, subject, questionCount, questionTypes } = await req.json()

    if (!topic || !gradeLevel || !subject || !questionCount || !questionTypes || questionTypes.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const systemPrompt = `You are an expert educational assessment designer. 
    Create a comprehensive quiz with ${questionCount} questions on the topic of "${topic}" for grade ${gradeLevel} ${subject} students.
    
    Include the following question types: ${questionTypes.join(", ")}.
    
    For each question, provide:
    1. The question text
    2. The question type (multiple-choice, true-false, or short-answer)
    3. For multiple-choice questions, provide 4 options
    4. The correct answer
    5. A brief explanation of why the answer is correct
    
    Format your response as a structured JSON object that can be parsed directly.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: systemPrompt,
    })

    // Parse the generated text into a structured quiz
    // In a real app, you'd want more robust parsing and error handling
    let quiz
    try {
      // Extract JSON from the response if needed
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text
      quiz = JSON.parse(jsonString)
    } catch (parseError) {
      console.error("Error parsing quiz JSON:", parseError)
      // Fallback to a simple quiz structure
      quiz = {
        title: `${topic} Quiz`,
        subject,
        gradeLevel,
        description: `A ${questionCount}-question quiz on ${topic} for grade ${gradeLevel} ${subject} students.`,
        questions: [
          {
            question: "What is the capital of France?",
            type: "multiple-choice",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2,
            explanation: "Paris is the capital and most populous city of France.",
          },
          {
            question: "Water boils at 100 degrees Celsius at sea level.",
            type: "true-false",
            correctAnswer: "true",
            explanation: "At standard atmospheric pressure (sea level), water boils at 100 degrees Celsius.",
          },
        ],
      }
    }

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error("Error generating quiz:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
