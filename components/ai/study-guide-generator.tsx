"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, BookOpen, Download, Save, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export function StudyGuideGenerator() {
  const [topic, setTopic] = useState("")
  const [subject, setSubject] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [includeItems, setIncludeItems] = useState<string[]>([
    "key-concepts",
    "definitions",
    "examples",
    "practice-questions",
  ])
  const [loading, setLoading] = useState(false)
  const [studyGuide, setStudyGuide] = useState("")
  const [activeTab, setActiveTab] = useState("input")

  const handleIncludeItemChange = (item: string) => {
    setIncludeItems(includeItems.includes(item) ? includeItems.filter((i) => i !== item) : [...includeItems, item])
  }

  const generateStudyGuide = async () => {
    if (!topic || !subject || !gradeLevel) return

    setLoading(true)
    setActiveTab("result")

    try {
      const systemPrompt = `
        You are an expert educational content creator specializing in study guides for grade ${gradeLevel} ${subject} students.
        Create a comprehensive, well-structured study guide on the topic of "${topic}".
        
        The study guide should include the following sections (as requested by the student):
        ${includeItems.includes("key-concepts") ? "- Key concepts and main ideas" : ""}
        ${includeItems.includes("definitions") ? "- Important terms and definitions" : ""}
        ${includeItems.includes("examples") ? "- Examples and illustrations" : ""}
        ${includeItems.includes("formulas") ? "- Formulas and equations" : ""}
        ${includeItems.includes("diagrams") ? "- Diagrams or visual aids (described in text)" : ""}
        ${includeItems.includes("practice-questions") ? "- Practice questions with answers" : ""}
        ${includeItems.includes("mnemonics") ? "- Mnemonics and memory aids" : ""}
        ${includeItems.includes("summary") ? "- Summary of key points" : ""}
        
        The content should be:
        - Appropriate for grade ${gradeLevel} students
        - Clear and concise
        - Well-organized with headings and subheadings
        - Engaging and easy to understand
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: `Create a study guide for grade ${gradeLevel} students on the topic of "${topic}" in the subject of ${subject}.`,
      })

      setStudyGuide(text)
    } catch (error) {
      console.error("Error generating study guide:", error)
      setStudyGuide("An error occurred while generating the study guide. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const downloadStudyGuide = () => {
    if (!studyGuide) return

    const fileName = `study-guide-${topic.toLowerCase().replace(/\s+/g, "-")}.md`
    const blob = new Blob([studyGuide], { type: "text/plain" })
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
          <BookOpen className="h-5 w-5" />
          Study Guide Generator
        </CardTitle>
        <CardDescription>Create personalized study guides for any topic</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-6 mt-4">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result" disabled={!studyGuide && !loading}>
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
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, Pythagorean Theorem, World War II"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Include in Study Guide</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="key-concepts"
                    checked={includeItems.includes("key-concepts")}
                    onCheckedChange={() => handleIncludeItemChange("key-concepts")}
                  />
                  <Label htmlFor="key-concepts" className="text-sm font-normal">
                    Key Concepts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="definitions"
                    checked={includeItems.includes("definitions")}
                    onCheckedChange={() => handleIncludeItemChange("definitions")}
                  />
                  <Label htmlFor="definitions" className="text-sm font-normal">
                    Definitions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="examples"
                    checked={includeItems.includes("examples")}
                    onCheckedChange={() => handleIncludeItemChange("examples")}
                  />
                  <Label htmlFor="examples" className="text-sm font-normal">
                    Examples
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="formulas"
                    checked={includeItems.includes("formulas")}
                    onCheckedChange={() => handleIncludeItemChange("formulas")}
                  />
                  <Label htmlFor="formulas" className="text-sm font-normal">
                    Formulas
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagrams"
                    checked={includeItems.includes("diagrams")}
                    onCheckedChange={() => handleIncludeItemChange("diagrams")}
                  />
                  <Label htmlFor="diagrams" className="text-sm font-normal">
                    Diagrams
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="practice-questions"
                    checked={includeItems.includes("practice-questions")}
                    onCheckedChange={() => handleIncludeItemChange("practice-questions")}
                  />
                  <Label htmlFor="practice-questions" className="text-sm font-normal">
                    Practice Questions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mnemonics"
                    checked={includeItems.includes("mnemonics")}
                    onCheckedChange={() => handleIncludeItemChange("mnemonics")}
                  />
                  <Label htmlFor="mnemonics" className="text-sm font-normal">
                    Mnemonics
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={includeItems.includes("summary")}
                    onCheckedChange={() => handleIncludeItemChange("summary")}
                  />
                  <Label htmlFor="summary" className="text-sm font-normal">
                    Summary
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Instructions (Optional)</Label>
              <Textarea
                id="additional-notes"
                placeholder="Any specific areas to focus on or additional information to include"
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="result" className="mt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-muted-foreground">Generating your study guide...</p>
              </div>
            ) : studyGuide ? (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Study Guide: {topic} ({subject}, Grade {gradeLevel})
                  </h3>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap">{studyGuide}</div>
                  </div>
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
                setSubject("")
                setGradeLevel("")
                setIncludeItems(["key-concepts", "definitions", "examples", "practice-questions"])
              }}
            >
              Reset
            </Button>
            <Button
              onClick={generateStudyGuide}
              disabled={!topic || !subject || !gradeLevel || includeItems.length === 0 || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Study Guide
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
              <Button variant="outline" onClick={downloadStudyGuide}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                Save to Library
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
