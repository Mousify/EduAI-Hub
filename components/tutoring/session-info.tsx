"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Save, Share2, ThumbsUp, ThumbsDown, Download, BookOpen } from "lucide-react"

interface SessionInfoProps {
  title: string
  subject?: string
  topic?: string
  duration: number // in seconds
  tokensUsed: number
  maxTokens: number
  onSave: () => void
  onShare: () => void
  onFeedback: (positive: boolean) => void
}

export function SessionInfo({
  title,
  subject,
  topic,
  duration,
  tokensUsed,
  maxTokens,
  onSave,
  onShare,
  onFeedback,
}: SessionInfoProps) {
  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{title}</span>
          <Badge variant="outline">{formatDuration(duration)}</Badge>
        </CardTitle>
        <CardDescription>
          {subject && `Subject: ${subject}`}
          {subject && topic && " • "}
          {topic && `Topic: ${topic}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Token Usage</span>
            <span>
              {tokensUsed} / {maxTokens}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${Math.min(100, (tokensUsed / maxTokens) * 100)}%` }}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Session Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Study Guide
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Was this helpful?</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onFeedback(true)}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              Yes
            </Button>
            <Button variant="outline" size="sm" onClick={() => onFeedback(false)}>
              <ThumbsDown className="mr-2 h-4 w-4" />
              No
            </Button>
          </div>
        </div>

        <div className="rounded-md bg-muted p-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Session started {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
