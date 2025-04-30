import { NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  try {
    const { topic, gradeLevel, subject, questionCount, questionTypes } =
      await request.json();

    const systemPrompt = `
      You are an expert educational assessment creator for grade ${gradeLevel} ${subject} classes.
      Create a comprehensive quiz on the topic of "${topic}" with ${questionCount} questions.
      
      Include the following question types: ${questionTypes.join(", ")}.
      
      Format each question with:
      1. Question text
      2. Question type (multiple-choice, true-false, or short-answer)
      3. Options (for multiple-choice)
      4. Correct answer
      5. Explanation of the correct answer
      
      Format the response as a structured JSON object with the following keys:
      - title (string)
      - subject (string)
      - gradeLevel (string)
      - description (string)
      - questions (array of objects with keys: question, type, options (for multiple-choice), correctAnswer, explanation)
    `;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Create a ${questionCount}-question quiz on ${topic} for grade ${gradeLevel} ${subject} students, including these question types: ${questionTypes.join(
        ", "
      )}.`,
    });

    // Parse the JSON response
    try {
      const quiz = JSON.parse(text);
      return NextResponse.json({ quiz });
    } catch (parseError) {
      console.error("Error parsing quiz JSON:", parseError);
      return NextResponse.json(
        { error: "Failed to parse quiz" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
