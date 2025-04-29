import { ContentExplainer } from "@/components/ai/content-explainer"

export default function ContentExplainerPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Content Explainer</h1>
        <p className="text-muted-foreground">Get clear explanations for complex topics</p>
      </div>

      <ContentExplainer />
    </div>
  )
}
