"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Lightbulb, Download, Copy, Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export function ContentExplainer() {
  const [topic, setTopic] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [subject, setSubject] = useState("")
  const [complexity, setComplexity] = useState("medium")
  const [explanationType, setExplanationType] = useState("simple")
  const [loading, setLoading] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [activeTab, setActiveTab] = useState("input")
  const [copied, setCopied] = useState(false)

  const generateExplanation = async () => {
    if (!topic || !gradeLevel || !subject) return

    setLoading(true)
    setActiveTab("result")

    try {
      const prompt = `
        Explain the ${subject} concept of "${topic}" for grade ${gradeLevel} students.
        
        The explanation should be:
        - At a ${complexity} complexity level
        - Using a ${explanationType} explanation style
        - Appropriate for the grade level
        - Clear and engaging
        - Include relevant examples
        - Break down complex ideas into simpler components
        
        If applicable, include analogies or metaphors that would help students understand the concept better.
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      setExplanation(text)
    } catch (error) {
      console.error("Error generating explanation:", error)
      setExplanation("An error occurred while generating the explanation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadExplanation = () => {
    if (!explanation) return

    const fileName = `explanation-${topic.toLowerCase().replace(/\s+/g, "-")}.txt`
    const blob = new Blob([explanation], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          AI Content Explainer
        </CardTitle>
        <CardDescription>Generate clear explanations for complex topics tailored to any grade level</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-6 mt-4">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result" disabled={!explanation && !loading}>
            Result
          </TabsTrigger>
        </TabsList>
        <CardContent className="pt-4">
          <TabsContent value="input" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
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
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade-level">Grade Level</Label>
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
              <Label htmlFor="topic">Topic to Explain</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, Pythagorean Theorem, Literary Symbolism"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complexity">Complexity Level</Label>
                <Select value={complexity} onValueChange={setComplexity}>
                  <SelectTrigger id="complexity">
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (Simplified)</SelectItem>
                    <SelectItem value="medium">Medium (Standard)</SelectItem>
                    <SelectItem value="advanced">Advanced (Detailed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="explanation-type">Explanation Style</Label>
                <Select value={explanationType} onValueChange={setExplanationType}>
                  <SelectTrigger id="explanation-type">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple Explanation</SelectItem>
                    <SelectItem value="analogy">Using Analogies</SelectItem>
                    <SelectItem value="visual">Visual Description</SelectItem>
                    <SelectItem value="step-by-step">Step-by-Step</SelectItem>
                    <SelectItem value="socratic">Socratic (Question-Based)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Instructions (Optional)</Label>
              <Textarea
                id="additional-notes"
                placeholder="Any specific aspects to focus on or learning objectives to address"
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="result" className="mt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-muted-foreground">Generating explanation...</p>
              </div>
            ) : explanation ? (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Explanation: {topic} ({subject}, Grade {gradeLevel})
                  </h3>
                  <div className="whitespace-pre-wrap">{explanation}</div>
                </div>
              </div>
            ) : null}
          </TabsContent>
        </CardContent>
      </Tabs>
      <CardFooter className="flex justify-between border-t border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        {activeTab === "input" ? (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setTopic("")
                setGradeLevel("")
                setSubject("")
                setComplexity("medium")
                setExplanationType("simple")
              }}
            >
              Reset
            </Button>
            <Button
              onClick={generateExplanation}
              disabled={!topic || !gradeLevel || !subject || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Explanation
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setActiveTab("input")}>
              Edit Details
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={downloadExplanation}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
