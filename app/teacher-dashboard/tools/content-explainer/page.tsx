import { ContentExplainer } from "@/components/ai/content-explainer"

export default function ContentExplainerPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">AI Content Explainer</h1>
          <p className="text-gray-500 mt-2">
            Generate clear explanations for complex topics tailored to any grade level
          </p>
        </div>

        <ContentExplainer />
      </div>
    </div>
  )
}
