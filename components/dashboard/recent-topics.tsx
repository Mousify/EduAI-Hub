"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

const topics = [
  {
    name: "Algebra",
    sessions: 5,
    problems: 20,
    change: "+24%",
    changeType: "positive",
  },
  {
    name: "Chemistry",
    sessions: 3,
    problems: 15,
    change: "+12%",
    changeType: "positive",
  },
  {
    name: "World History",
    sessions: 2,
    problems: 8,
    change: "+4%",
    changeType: "neutral",
  },
  {
    name: "Biology",
    sessions: 2,
    problems: 10,
    change: "-2%",
    changeType: "negative",
  },
]

export function RecentTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Topics</CardTitle>
        <CardDescription>Your most active study areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.name} className="flex items-center">
              <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{topic.name}</p>
                <p className="text-xs text-muted-foreground">
                  {topic.sessions} sessions, {topic.problems} practice problems
                </p>
              </div>
              <div
                className={`ml-auto font-medium ${
                  topic.changeType === "positive"
                    ? "text-green-500"
                    : topic.changeType === "negative"
                      ? "text-red-500"
                      : "text-amber-500"
                }`}
              >
                {topic.change}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
