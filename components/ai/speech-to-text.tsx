"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Copy, Save, Loader2, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try using Chrome or Edge.",
        variant: "destructive",
      })
      return
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " "
        } else {
          interimTranscript += transcript
        }
      }

      setTranscript((prev) => prev + finalTranscript)
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      toast({
        title: "Recognition Error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive",
      })
      setIsRecording(false)
    }

    recognitionRef.current.onend = () => {
      if (isRecording) {
        recognitionRef.current.start()
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isRecording, toast])

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      setIsProcessing(true)
      try {
        recognitionRef.current?.start()
        setIsRecording(true)
      } catch (error) {
        console.error("Failed to start recording:", error)
        toast({
          title: "Failed to Start Recording",
          description: "There was an error starting the speech recognition.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
    toast({
      title: "Copied to Clipboard",
      description: "The transcript has been copied to your clipboard.",
    })
  }

  const handleSave = () => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Transcript Saved",
      description: "The transcript has been saved as a text file.",
    })
  }

  const handleClear = () => {
    setTranscript("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-blue-600" />
          Speech to Text
        </CardTitle>
        <CardDescription>Convert speech to text for accessibility and note-taking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex justify-center">
            <Button
              onClick={toggleRecording}
              disabled={isProcessing}
              className={`rounded-full w-16 h-16 ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isProcessing ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isRecording ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            {isRecording ? (
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Recording... Speak clearly
              </div>
            ) : (
              "Click the microphone to start recording"
            )}
          </div>

          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
            className="min-h-[200px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!transcript}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" onClick={handleSave} disabled={!transcript}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
        <Button variant="ghost" onClick={handleClear} disabled={!transcript}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </CardFooter>
    </Card>
  )
}
