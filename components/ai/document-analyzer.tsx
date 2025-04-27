"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Upload, FileText, ImageIcon, Loader2, CheckCircle, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DocumentAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [selectedTab, setSelectedTab] = useState("analyze")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setImageUrl(url)
      setResult("")
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }
    setImageUrl(null)
    setResult("")
  }

  async function handleAnalyze() {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setResult("")

    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = async () => {
        const base64Image = reader.result?.toString().split(",")[1]

        if (!base64Image) {
          throw new Error("Failed to convert image to base64")
        }

        let systemPrompt = ""

        if (selectedTab === "analyze") {
          systemPrompt = `You are an expert educational document analyzer. 
          Analyze the provided image of an educational document (worksheet, test, assignment, etc.) and provide:
          1. A summary of the content
          2. The subject area and approximate grade level
          3. The type of document (worksheet, quiz, test, etc.)
          4. The main topics or skills being assessed
          5. Any issues or improvements you notice with the document
          
          Format your response in a clear, structured way.`
        } else if (selectedTab === "extract") {
          systemPrompt = `You are an expert in optical character recognition and document processing.
          Extract all text content from the provided image of an educational document.
          Maintain the formatting as much as possible, including:
          - Headings and subheadings
          - Question numbers
          - Multiple choice options
          - Tables and structured content
          
          Format your response in a clean, structured way that preserves the original layout.`
        } else if (selectedTab === "improve") {
          systemPrompt = `You are an expert educational content designer.
          Analyze the provided image of an educational document and suggest specific improvements for:
          1. Clarity of instructions
          2. Layout and organization
          3. Accessibility for diverse learners
          4. Assessment quality (if applicable)
          5. Visual design and readability
          
          For each suggestion, provide a specific recommendation and explain why it would improve the document.
          Format your response in a clear, structured way.`
        }

        const { text } = await generateText({
          model: openai("gpt-4o"),
          system: systemPrompt,
          prompt: "Analyze this educational document image.",
          images: [base64Image],
        })

        setResult(text)
      }
    } catch (error) {
      console.error("Error analyzing document:", error)
      setResult("An error occurred while analyzing the document. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    {
      id: "analyze",
      title: "Analyze",
      icon: FileText,
      description: "Get a detailed analysis of any educational document",
    },
    {
      id: "extract",
      title: "Extract Text",
      icon: FileText,
      description: "Extract and digitize text from worksheets, tests, and assignments",
    },
    {
      id: "improve",
      title: "Improve",
      icon: ImageIcon,
      description: "Get suggestions to improve your educational materials",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-blue-600" />
          Document Analyzer
        </CardTitle>
        <CardDescription>Upload and analyze educational documents with AI</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="grid gap-6">
                <div className="flex flex-col items-center justify-center">
                  {!imageUrl ? (
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg p-12 text-center hover:bg-gray-50 transition-colors">
                      <Upload className="h-10 w-10 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop an image, or click to browse</p>
                      <p className="text-xs text-gray-500 mb-4">Supports: JPEG, PNG, PDF</p>
                      <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                        Select File
                      </Button>
                      <input
                        id="file-upload"
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
                          alt="Uploaded document"
                          className="w-full object-contain max-h-96"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Button onClick={handleAnalyze} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>{tab.title} Document</>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">Analysis Results</h3>
                    </div>
                    <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border text-sm">{result}</div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {result && (
          <>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(result)}>
              Copy to Clipboard
            </Button>
            <Button onClick={() => setResult("")} variant="ghost">
              Clear Results
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
