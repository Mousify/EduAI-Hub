import { ContentExplainer } from "@/components/ai/content-explainer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Content Explainer | Teacher Dashboard",
  description: "Generate clear explanations for complex topics tailored to any grade level",
}

export default function ContentExplainerPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Content Explainer</h1>
        <p className="text-muted-foreground">
          Generate clear explanations for complex topics tailored to any grade level
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ContentExplainer />
      </div>
    </div>
  )
}
