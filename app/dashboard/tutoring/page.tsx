"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Search, Clock, BookOpen, History } from "lucide-react"

// Mock session data for demo
const mockSessions = [
  {
    id: "session-1",
    title: "Algebra Help - Quadratic Equations",
    subject: "Mathematics",
    topic: "Algebra",
    status: "active",
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    tokensUsed: 85,
  },
  {
    id: "session-2",
    title: "Newton's Laws of Motion",
    subject: "Science",
    topic: "Physics",
    status: "completed",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    tokensUsed: 120,
  },
  {
    id: "session-3",
    title: "Essay Structure Help",
    subject: "English",
    topic: "Writing",
    status: "saved",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    tokensUsed: 95,
  },
  {
    id: "session-4",
    title: "World War II Timeline",
    subject: "History",
    topic: "World History",
    status: "completed",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    tokensUsed: 150,
  },
]

// Helper function to format relative time
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}

export default function TutoringSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would fetch from your API
        // const data = await getTutoringSessions(userId)

        // Using mock data for demo
        setTimeout(() => {
          setSessions(mockSessions)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching sessions:", error)
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [])

  // Filter sessions based on search query and active tab
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.topic.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && session.status === "active"
    if (activeTab === "saved") return matchesSearch && session.status === "saved"
    if (activeTab === "completed") return matchesSearch && session.status === "completed"

    return matchesSearch
  })

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tutoring Sessions</h1>
          <p className="text-muted-foreground">View your tutoring history or start a new session</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tutoring/new">
            <Plus className="mr-2 h-4 w-4" /> New Session
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Sessions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
              <History className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium">No sessions found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Start a new tutoring session to get help with your homework"}
              </p>
              {!searchQuery && (
                <Button asChild className="mt-2">
                  <Link href="/dashboard/tutoring/new">
                    <Plus className="mr-2 h-4 w-4" /> New Session
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSessions.map((session) => (
                <Link key={session.id} href={`/dashboard/tutoring/${session.id}`}>
                  <Card className="h-full transition-all hover:border-primary hover:shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            session.status === "active"
                              ? "default"
                              : session.status === "saved"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {session.status === "active" ? "Active" : session.status === "saved" ? "Saved" : "Completed"}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatRelativeTime(session.lastActive)}
                        </div>
                      </div>
                      <CardTitle className="mt-2 line-clamp-1">{session.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <span>{session.subject}</span>
                        <span>•</span>
                        <span>{session.topic}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{session.tokensUsed} tokens used</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" size="sm">
                        Continue Session
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
