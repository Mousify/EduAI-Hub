import { FeedbackGenerator } from "@/components/ai/feedback-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Feedback Generator | Teacher Dashboard",
  description: "Create personalized, constructive feedback for students in seconds",
}

export default function FeedbackGeneratorPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Feedback Generator</h1>
        <p className="text-muted-foreground">Create personalized, constructive feedback for students in seconds</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FeedbackGenerator />
      </div>
    </div>
  )
}
