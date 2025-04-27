"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, HelpCircle, Camera, Upload, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export function HomeworkHelper() {
  const [question, setQuestion] = useState("")
  const [subject, setSubject] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState("")
  const [activeTab, setActiveTab] = useState("text")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload an image file (JPEG, PNG, etc.)")
        return
      }

      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(url)
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }
    setImageUrl(null)
  }

  const generateAnswer = async () => {
    if ((!question && activeTab === "text") || (!file && activeTab === "image")) return

    setLoading(true)

    try {
      if (activeTab === "text") {
        const systemPrompt = `
          You are an expert AI tutor for students in grade ${gradeLevel || "middle school"} ${
            subject ? `studying ${subject}` : ""
          }.
          Provide a clear, step-by-step explanation to help the student understand how to solve the problem.
          Use age-appropriate language and examples.
          Break down complex problems into manageable parts.
          Include relevant formulas or rules when applicable.
          Focus on teaching the student how to solve the problem, not just giving the answer.
        `

        const { text } = await generateText({
          model: openai("gpt-4o"),
          system: systemPrompt,
          prompt: question,
        })

        setAnswer(text)
      } else if (activeTab === "image" && file) {
        // Convert image to base64
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
          const base64Image = reader.result?.toString().split(",")[1]

          if (!base64Image) {
            throw new Error("Failed to convert image to base64")
          }

          const systemPrompt = `
            You are an expert AI tutor for students in grade ${gradeLevel || "middle school"} ${
              subject ? `studying ${subject}` : ""
            }.
            Analyze the homework problem in the image and provide a clear, step-by-step explanation.
            Use age-appropriate language and examples.
            Break down complex problems into manageable parts.
            Include relevant formulas or rules when applicable.
            Focus on teaching the student how to solve the problem, not just giving the answer.
          `

          const { text } = await generateText({
            model: openai("gpt-4o"),
            system: systemPrompt,
            prompt: "Help me solve this homework problem.",
            images: [base64Image],
          })

          setAnswer(text)
        }
      }
    } catch (error) {
      console.error("Error generating answer:", error)
      setAnswer("An error occurred while generating the answer. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Homework Helper
        </CardTitle>
        <CardDescription>Get step-by-step help with your homework questions</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-6 mt-4">
          <TabsTrigger value="text">Text Question</TabsTrigger>
          <TabsTrigger value="image">Upload Image</TabsTrigger>
        </TabsList>
        <CardContent className="pt-4">
          <TabsContent value="text" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade-level">Grade Level (Optional)</Label>
                <Select value={gradeLevel} onValueChange={setGradeLevel}>
                  <SelectTrigger id="grade-level">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Grade 5</SelectItem>
                    <SelectItem value="6">Grade 6</SelectItem>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="question">Your Question</Label>
              <Textarea
                id="question"
                placeholder="Type your homework question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="image" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject-image">Subject (Optional)</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject-image">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade-level-image">Grade Level (Optional)</Label>
                <Select value={gradeLevel} onValueChange={setGradeLevel}>
                  <SelectTrigger id="grade-level-image">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Grade 5</SelectItem>
                    <SelectItem value="6">Grade 6</SelectItem>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Upload Image of Your Question</Label>
              {!imageUrl ? (
                <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Take a photo or upload an image of your homework</p>
                  <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative w-full">
                  <div className="relative rounded-lg overflow-hidden border">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Uploaded homework question"
                      className="w-full object-contain max-h-96"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <span className="sr-only">Remove image</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {answer && (
            <div className="mt-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Step-by-Step Solution</h3>
                <div className="whitespace-pre-wrap">{answer}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Tabs>
      <CardFooter className="flex justify-between border-t border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        <Button
          variant="outline"
          onClick={() => {
            setQuestion("")
            setSubject("")
            setGradeLevel("")
            handleRemoveImage()
            setAnswer("")
          }}
        >
          Clear
        </Button>
        <Button
          onClick={generateAnswer}
          disabled={(activeTab === "text" && !question) || (activeTab === "image" && !file) || loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Help
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
