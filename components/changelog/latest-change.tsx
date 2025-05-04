"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getLatestChangelog } from "@/lib/db"
import type { ChangelogEntry } from "@/lib/types/changelog"
import { Sparkles } from "lucide-react"

export function LatestChange() {
  const [latestChange, setLatestChange] = useState<ChangelogEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatestChange() {
      try {
        const data = await getLatestChangelog(1)
        if (data && data.length > 0) {
          // Transform the data to match our types
          const entry: ChangelogEntry = {
            ...data[0],
            releaseDate: new Date(data[0].release_date),
            isMajor: data[0].is_major,
            createdAt: new Date(data[0].created_at),
            updatedAt: new Date(data[0].updated_at),
          }
          setLatestChange(entry)
        }
      } catch (error) {
        console.error("Error fetching latest changelog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestChange()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center text-sm text-muted-foreground animate-pulse">
        <Sparkles className="mr-2 h-4 w-4" />
        Loading latest updates...
      </div>
    )
  }

  if (!latestChange) {
    return null
  }

  return (
    <div className="flex items-center text-sm">
      <Sparkles className="mr-2 h-4 w-4 text-primary" />
      <span className="mr-2">New:</span>
      <Badge variant={latestChange.isMajor ? "default" : "outline"} className="mr-2">
        v{latestChange.version}
      </Badge>
      <span className="hidden md:inline">{latestChange.title}</span>
      <Button variant="link" size="sm" className="p-0 h-auto" asChild>
        <a href="/changelog">View all changes</a>
      </Button>
    </div>
  )
}
