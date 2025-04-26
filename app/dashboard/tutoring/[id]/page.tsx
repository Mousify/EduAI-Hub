"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChatInterface } from "@/components/tutoring/chat-interface"
import { SessionInfo } from "@/components/tutoring/session-info"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateTutoringResponse } from "@/lib/openai"
import { PLAN_TOKENS } from "@/lib/stripe"

// Mock user subscription for demo
const userSubscription = {
  plan: "silver" as const,
  tokensUsed: 85,
}

export default function TutoringSessionPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.id as string

  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Timer for session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Fetch session data
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would fetch from your API
        // const data = await getTutoringSessionById(sessionId)

        // Mock data for demo
        const mockSession = {
          id: sessionId,
          title: "Algebra Help - Quadratic Equations",
          subject: "Mathematics",
          topic: "Quadratic Equations",
          tokensUsed: 85,
          status: "active",
          createdAt: new Date().toISOString(),
          session_messages: [
            {
              id: "1",
              role: "user",
              content: "I need help solving this quadratic equation: 2x² + 5x - 3 = 0",
              createdAt: new Date(Date.now() - 120000).toISOString(),
            },
            {
              id: "2",
              role: "system",
              content:
                "I'll help you solve this quadratic equation step by step.\n\nThe standard form of a quadratic equation is ax² + bx + c = 0. In your equation 2x² + 5x - 3 = 0, we have:\n- a = 2\n- b = 5\n- c = -3\n\nWe can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n\nLet's substitute our values:\nx = (-5 ± √(5² - 4×2×(-3))) / (2×2)\nx = (-5 ± √(25 + 24)) / 4\nx = (-5 ± √49) / 4\nx = (-5 ± 7) / 4\n\nThis gives us two solutions:\nx₁ = (-5 + 7) / 4 = 2 / 4 = 0.5\nx₂ = (-5 - 7) / 4 = -12 / 4 = -3\n\nSo the solutions to 2x² + 5x - 3 = 0 are x = 0.5 and x = -3.",
              createdAt: new Date(Date.now() - 60000).toISOString(),
              steps: [
                {
                  title: "Identify the coefficients",
                  content:
                    "In the equation 2x² + 5x - 3 = 0:\n- a = 2 (coefficient of x²)\n- b = 5 (coefficient of x)\n- c = -3 (constant term)",
                },
                {
                  title: "Apply the quadratic formula",
                  content:
                    "Use the formula: x = (-b ± √(b² - 4ac)) / 2a\n\nSubstitute our values:\nx = (-5 ± √(5² - 4×2×(-3))) / (2×2)\nx = (-5 ± √(25 + 24)) / 4\nx = (-5 ± √49) / 4\nx = (-5 ± 7) / 4",
                },
                {
                  title: "Calculate the solutions",
                  content:
                    "This gives us two solutions:\nx₁ = (-5 + 7) / 4 = 2 / 4 = 0.5\nx₂ = (-5 - 7) / 4 = -12 / 4 = -3\n\nSo the solutions to 2x² + 5x - 3 = 0 are x = 0.5 and x = -3.",
                },
              ],
            },
          ],
        }

        setSession(mockSession)

        // Format messages for the chat interface
        const formattedMessages = mockSession.session_messages.map((msg: any) => ({
          id: msg.id,
          role: msg.role === "system" ? "assistant" : "user",
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          steps: msg.steps,
        }))

        setMessages(formattedMessages)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching session:", err)
        setError("Failed to load tutoring session")
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  const handleSendMessage = async (message: string, attachments?: File[]) => {
    try {
      setIsProcessing(true)

      // In a real app, you would upload attachments to storage
      // and get their URLs
      const attachmentUrls = attachments
        ? attachments.map((file) => ({
            type: file.type.startsWith("image/") ? "image" : "file",
            url: URL.createObjectURL(file),
            name: file.name,
          }))
        : []

      // Add user message to database
      // await addSessionMessage({
      //   sessionId,
      //   role: "user",
      //   content: message,
      //   mediaUrl: attachmentUrls.length > 0 ? JSON.stringify(attachmentUrls) : undefined
      // })

      // Generate AI response
      const aiResponse = await generateTutoringResponse(
        message,
        session.subject,
        10, // Mock grade level
      )

      // Mock steps for demo
      const mockSteps = [
        {
          title: "Understanding the problem",
          content: "First, let's break down what the question is asking...",
        },
        {
          title: "Applying the formula",
          content: "Now we can use the appropriate formula to solve this...",
        },
        {
          title: "Calculating the result",
          content: "Finally, let's calculate the answer step by step...",
        },
      ]

      // Add AI response to messages
      const aiMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
        steps: mockSteps,
      }

      setMessages((prev) => [...prev, aiMessage])

      // Add AI message to database
      // await addSessionMessage({
      //   sessionId,
      //   role: "system",
      //   content: aiResponse,
      //   steps: JSON.stringify(mockSteps)
      // })

      // Update token usage (in a real app)
      // const tokensUsed = aiResponse.length / 4 // Rough estimate
      // await updateTokenUsage(userId, tokensUsed)

      setIsProcessing(false)
    } catch (err) {
      console.error("Error processing message:", err)
      setError("Failed to process your message. Please try again.")
      setIsProcessing(false)
    }
  }

  const handleSaveSession = () => {
    // In a real app, this would update the session status to "saved"
    alert("Session saved successfully!")
  }

  const handleShareSession = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`https://example.com/shared-session/${sessionId}`)
    alert("Session link copied to clipboard!")
  }

  const handleFeedback = (positive: boolean) => {
    // In a real app, this would save feedback to the database
    alert(`Thank you for your ${positive ? "positive" : "negative"} feedback!`)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-medium">{session.title}</h1>
      </div>

      <div className="grid flex-1 overflow-hidden md:grid-cols-[1fr_300px]">
        <div className="flex flex-col overflow-hidden">
          <ChatInterface
            sessionId={sessionId}
            initialMessages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isProcessing}
            subject={session.subject}
          />
        </div>

        <div className="hidden border-l md:block">
          <div className="p-4">
            <SessionInfo
              title={session.title}
              subject={session.subject}
              topic={session.topic}
              duration={duration}
              tokensUsed={userSubscription.tokensUsed}
              maxTokens={PLAN_TOKENS[userSubscription.plan]}
              onSave={handleSaveSession}
              onShare={handleShareSession}
              onFeedback={handleFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
