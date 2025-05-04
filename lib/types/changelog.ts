export type ChangeType = "feature" | "improvement" | "fix" | "security" | "deprecation"

export interface ChangeEntry {
  type: ChangeType
  description: string
}

export interface ChangelogEntry {
  id: string
  version: string
  releaseDate: Date
  title: string
  description: string
  changes: ChangeEntry[]
  isMajor: boolean
  createdAt: Date
  updatedAt: Date
}
