import { FeedbackGenerator } from "@/components/ai/feedback-generator"

export default function FeedbackGeneratorPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">AI Feedback Generator</h1>
          <p className="text-gray-500 mt-2">Create personalized, constructive feedback for students in seconds</p>
        </div>

        <FeedbackGenerator />
      </div>
    </div>
  )
}
