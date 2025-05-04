import type { Metadata } from "next"
import { ChangelogList } from "@/components/changelog/changelog-list"

export const metadata: Metadata = {
  title: "Changelog | EduAI Hub",
  description: "See the latest updates and improvements to the EduAI Hub platform.",
}

export default function ChangelogPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Changelog</h1>
        <p className="text-muted-foreground mb-8">
          Track the latest updates and improvements to the EduAI Hub platform.
        </p>
        <ChangelogList />
      </div>
    </div>
  )
}
