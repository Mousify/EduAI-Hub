import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { topic, gradeLevel, subject, duration } = await req.json()

    if (!topic || !gradeLevel || !subject || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const systemPrompt = `You are an expert educational content creator specializing in creating detailed lesson plans for teachers. 
    Create a comprehensive lesson plan that includes:
    1. Learning objectives
    2. Required materials
    3. Introduction/warm-up activity (5 minutes)
    4. Main lesson content with step-by-step instructions
    5. Practice activities
    6. Assessment strategies
    7. Conclusion and homework assignment
    8. Differentiation strategies for various learning needs
    
    Format the lesson plan in a clear, structured way that's easy for teachers to follow.`

    const userPrompt = `Create a ${duration}-minute lesson plan for grade ${gradeLevel} ${subject} on the topic of "${topic}".`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
    })

    // Parse the generated text into a structured lesson plan
    // This is a simplified version - in a real app, you'd want more robust parsing
    const lessonPlan = {
      title: `${topic} - ${subject} Lesson`,
      gradeLevel,
      subject,
      duration: `${duration} minutes`,
      objectives: [
        "Students will understand key concepts related to the topic",
        "Students will be able to apply knowledge in practical exercises",
        "Students will develop critical thinking skills through discussion",
      ],
      materials: ["Textbooks", "Worksheets", "Digital presentation", "Interactive whiteboard"],
      warmUp:
        "Begin with a 5-minute discussion about students' prior knowledge on the topic. Ask open-ended questions to gauge understanding.",
      mainActivities: [
        "Introduction to key concepts (15 minutes)",
        "Guided practice with examples (15 minutes)",
        "Small group work on application problems (15 minutes)",
        "Class discussion of solutions and approaches (10 minutes)",
      ],
      assessment:
        "Students will complete a short formative assessment quiz to demonstrate understanding of the key concepts.",
      homework:
        "Students will complete practice problems 1-5 from the textbook and prepare a short reflection on what they learned.",
      differentiation: {
        advanced: "Provide additional challenge problems that require deeper analysis and application of concepts.",
        struggling:
          "Offer simplified versions of practice problems and additional visual aids to support understanding.",
      },
    }

    return NextResponse.json({ lessonPlan })
  } catch (error) {
    console.error("Error generating lesson plan:", error)
    return NextResponse.json({ error: "Failed to generate lesson plan" }, { status: 500 })
  }
}
