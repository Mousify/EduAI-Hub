import { DocumentAnalyzer } from "@/components/ai/document-analyzer"

export default function AnalyzeResourcesPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">Document Analyzer</h1>
          <p className="text-gray-500 mt-2">Upload and analyze educational documents with AI</p>
        </div>

        <DocumentAnalyzer />
      </div>
    </div>
  )
}
