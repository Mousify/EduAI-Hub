"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, FileText, Mic } from "lucide-react"

// Mock subjects for demo
const subjects = [
  { id: "math", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "history", name: "History" },
  { id: "cs", name: "Computer Science" },
]

// Mock topics for demo
const topics = {
  math: [
    { id: "algebra", name: "Algebra" },
    { id: "geometry", name: "Geometry" },
    { id: "calculus", name: "Calculus" },
    { id: "statistics", name: "Statistics" },
    { id: "trigonometry", name: "Trigonometry" },
  ],
  science: [
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
    { id: "earth_science", name: "Earth Science" },
  ],
  english: [
    { id: "literature", name: "Literature" },
    { id: "grammar", name: "Grammar" },
    { id: "writing", name: "Writing" },
    { id: "vocabulary", name: "Vocabulary" },
  ],
  history: [
    { id: "us_history", name: "US History" },
    { id: "world_history", name: "World History" },
    { id: "civics", name: "Civics" },
  ],
  cs: [
    { id: "programming", name: "Programming" },
    { id: "web_dev", name: "Web Development" },
    { id: "algorithms", name: "Algorithms" },
  ],
}

export default function NewTutoringSessionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [inputType, setInputType] = useState<"text" | "image" | "file" | "voice">("text")
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || (!question && !file)) {
      alert("Please provide a title and either a question or file")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would create a session in your database
      // and upload any files to storage
      // const session = await createTutoringSession({
      //   title,
      //   subject,
      //   topic,
      //   type: inputType,
      //   userId: "current-user-id" // In a real app, get from auth
      // })

      // Mock session creation for demo
      setTimeout(() => {
        const sessionId = "session-" + Date.now()
        router.push(`/dashboard/tutoring/${sessionId}`)
      }, 1500)
    } catch (error) {
      console.error("Error creating session:", error)
      alert("Failed to create tutoring session")
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Start New Tutoring Session</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>Provide some basic information about your tutoring session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Help with Algebra Homework"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subj) => (
                        <SelectItem key={subj.id} value={subj.id}>
                          {subj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select value={topic} onValueChange={setTopic} disabled={!subject}>
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subject &&
                        topics[subject as keyof typeof topics]?.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Question</CardTitle>
              <CardDescription>Choose how you want to ask your question</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={inputType} onValueChange={(v) => setInputType(v as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="file">File</TabsTrigger>
                  <TabsTrigger value="voice">Voice</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Type your question</Label>
                    <Textarea
                      id="question"
                      placeholder="e.g., How do I solve this equation: 2x + 5 = 15?"
                      className="min-h-[150px]"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="image" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Upload an image of your question</Label>
                    <Card className="flex flex-col items-center justify-center border-dashed p-6">
                      <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        Upload a photo of your homework, textbook, or written question
                      </p>
                      <Input type="file" accept="image/*" className="max-w-xs" onChange={handleFileChange} />
                    </Card>
                    {file && file.type.startsWith("image/") && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Preview:</p>
                        <div className="mt-2 max-h-[300px] overflow-hidden rounded-md border">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt="Question preview"
                            className="max-h-[300px] object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="file" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Upload a document</Label>
                    <Card className="flex flex-col items-center justify-center border-dashed p-6">
                      <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">Upload a PDF, Word document, or text file</p>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="max-w-xs"
                        onChange={handleFileChange}
                      />
                    </Card>
                    {file && !file.type.startsWith("image/") && (
                      <div className="mt-4 rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-sm text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Record your question</Label>
                    <Card className="flex flex-col items-center justify-center border-dashed p-6">
                      <Mic className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">Click the button below to start recording</p>
                      <Button type="button" variant="outline">
                        Start Recording
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">
                        (Voice recording is not available in this demo)
                      </p>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Session..." : "Start Session"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
