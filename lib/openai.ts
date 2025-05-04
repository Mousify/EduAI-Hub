import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Ensure we're using the environment variable correctly
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// Function to generate a tutoring response
export async function generateTutoringResponse(question: string, subject?: string, grade?: number) {
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key is missing")
    throw new Error("OpenAI API key is missing. Please check your environment variables.")
  }

  const systemPrompt = `You are an expert AI tutor for students in grades 5-12. 
  ${subject ? `The subject is ${subject}.` : ""} 
  ${grade ? `The student is in grade ${grade}.` : ""}
  Provide clear, step-by-step explanations that help the student understand the concepts.
  Use age-appropriate language and examples.
  Break down complex problems into manageable parts.
  Include relevant formulas or rules when applicable.
  Ask guiding questions to help the student think through the problem.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o", { apiKey: OPENAI_API_KEY }),
      system: systemPrompt,
      prompt: question,
    })

    return text
  } catch (error) {
    console.error("Error generating tutoring response:", error)
    throw new Error("Failed to generate tutoring response")
  }
}

// Update the other functions similarly
export async function generatePracticeProblems(topic: string, difficulty: string, count: number, grade?: number) {
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key is missing")
    throw new Error("OpenAI API key is missing. Please check your environment variables.")
  }

  const systemPrompt = `You are an expert educational content creator for students in grades 5-12.
  ${grade ? `The student is in grade ${grade}.` : ""}
  Create ${count} practice problems on the topic of "${topic}" at a ${difficulty} difficulty level.
  Format each problem with:
  1. A clear question
  2. Multiple choice options (if applicable)
  3. The correct answer
  4. A brief explanation of the solution
  
  Return the problems in a structured JSON format.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o", { apiKey: OPENAI_API_KEY }),
      system: systemPrompt,
      prompt: `Generate ${count} ${difficulty} practice problems about ${topic}.`,
    })

    // Parse the JSON response
    try {
      return JSON.parse(text)
    } catch (parseError) {
      console.error("Error parsing practice problems JSON:", parseError)
      return text // Return the raw text if parsing fails
    }
  } catch (error) {
    console.error("Error generating practice problems:", error)
    throw new Error("Failed to generate practice problems")
  }
}

export async function generateAssessment(subject: string, topics: string[], questionCount: number, grade: number) {
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API key is missing")
    throw new Error("OpenAI API key is missing. Please check your environment variables.")
  }

  const systemPrompt = `You are an expert educational assessment creator for grade ${grade} students.
  Create a comprehensive assessment for the subject "${subject}" covering the following topics: ${topics.join(", ")}.
  Include ${questionCount} questions of varying types (multiple choice, short answer, etc.) and difficulty levels.
  Format each question with:
  1. Question text
  2. Question type
  3. Options (if applicable)
  4. Correct answer
  5. Points (1-5 based on difficulty)
  
  Return the assessment in a structured JSON format.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o", { apiKey: OPENAI_API_KEY }),
      system: systemPrompt,
      prompt: `Generate a ${questionCount}-question assessment on ${subject} for grade ${grade} students, covering: ${topics.join(", ")}.`,
    })

    // Parse the JSON response
    try {
      return JSON.parse(text)
    } catch (parseError) {
      console.error("Error parsing assessment JSON:", parseError)
      return text // Return the raw text if parsing fails
    }
  } catch (error) {
    console.error("Error generating assessment:", error)
    throw new Error("Failed to generate assessment")
  }
}
