"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Mic, ImageIcon, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: {
    type: "image" | "file" | "audio"
    url: string
    name: string
  }[]
  steps?: {
    title: string
    content: string
  }[]
}

interface ChatInterfaceProps {
  sessionId: string
  initialMessages?: Message[]
  onSendMessage: (message: string, attachments?: File[]) => Promise<void>
  isLoading?: boolean
  subject?: string
}

export function ChatInterface({
  sessionId,
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  subject,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "" && attachments.length === 0) return

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      attachments: attachments.map((file) => ({
        type: file.type.startsWith("image/") ? "image" : "file",
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setAttachments([])

    // Send to backend
    await onSendMessage(input, attachments)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files as FileList)])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const startRecording = () => {
    setIsRecording(true)
    // Implement actual recording logic here
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Implement stop recording and processing logic here
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Start your tutoring session</h3>
              <p className="text-muted-foreground">Ask a question or upload an image of your homework to get help</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("flex gap-3 max-w-[80%]", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <Avatar className="h-8 w-8">
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage src="/ai-avatar.png" alt="AI Tutor" />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/user-avatar.png" alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </>
                  )}
                </Avatar>

                <div className="space-y-2">
                  <Card
                    className={cn(
                      "p-4 max-w-full",
                      message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {message.attachments.map((attachment, i) => (
                          <div key={i} className="rounded-md overflow-hidden">
                            {attachment.type === "image" ? (
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt={attachment.name}
                                className="max-h-60 object-contain"
                              />
                            ) : (
                              <div className="flex items-center gap-2 p-2 bg-background/10 rounded">
                                <FileText size={16} />
                                <span className="text-sm truncate">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Message content */}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </Card>

                  {/* Steps for assistant messages */}
                  {message.role === "assistant" && message.steps && message.steps.length > 0 && (
                    <Card className="p-4 mt-2">
                      <Tabs defaultValue="step1">
                        <TabsList className="mb-2">
                          {message.steps.map((step, i) => (
                            <TabsTrigger key={i} value={`step${i + 1}`}>
                              Step {i + 1}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {message.steps.map((step, i) => (
                          <TabsContent key={i} value={`step${i + 1}`}>
                            <h4 className="font-medium mb-1">{step.title}</h4>
                            <div className="whitespace-pre-wrap">{step.content}</div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </Card>
                  )}

                  <div
                    className={cn(
                      "text-xs text-muted-foreground",
                      message.role === "user" ? "text-right" : "text-left",
                    )}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/ai-avatar.png" alt="AI Tutor" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <Card className="p-4 bg-primary text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </Card>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t flex gap-2 overflow-x-auto">
          {attachments.map((file, index) => (
            <div key={index} className="relative group">
              <div className="h-16 w-16 rounded-md border flex items-center justify-center overflow-hidden">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FileText className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <button
                onClick={() => removeAttachment(index)}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your question..."
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={() => fileInputRef.current?.click()} type="button">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={() => imageInputRef.current?.click()} type="button">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach image</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={isRecording ? stopRecording : startRecording}
                    type="button"
                    className={isRecording ? "bg-red-100 text-red-500" : ""}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isRecording ? "Stop recording" : "Voice input"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        <input type="file" ref={imageInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />

        {subject && (
          <div className="mt-2 flex items-center">
            <Badge variant="outline" className="text-xs">
              Subject: {subject}
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}
