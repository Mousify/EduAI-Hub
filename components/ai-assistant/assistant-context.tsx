"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Message, AssistantState } from "./assistant-types"

interface AssistantContextType {
  state: AssistantState
  toggleOpen: () => void
  toggleMinimize: () => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const initialState: AssistantState = {
  isOpen: false,
  isMinimized: false,
  messages: [],
  isLoading: false,
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined)

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssistantState>(initialState)

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("assistantState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        // Convert string timestamps back to Date objects
        parsedState.messages = parsedState.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setState(parsedState)
      } catch (error) {
        console.error("Failed to parse assistant state:", error)
      }
    } else {
      // Add welcome message if no previous state
      setState({
        ...initialState,
        messages: [
          {
            id: uuidv4(),
            role: "assistant",
            content: "Hello! I'm your AI assistant. How can I help you navigate the EduAI Hub platform?",
            timestamp: new Date(),
          },
        ],
      })
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("assistantState", JSON.stringify(state))
  }, [state])

  const toggleOpen = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen, isMinimized: false }))
  }

  const toggleMinimize = () => {
    setState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }))
  }

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }))

    try {
      // Call API to get assistant response
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: state.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from assistant")
      }

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }))
    } catch (error) {
      console.error("Error getting assistant response:", error)

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }))
    }
  }

  const clearMessages = () => {
    setState({
      ...state,
      messages: [
        {
          id: uuidv4(),
          role: "assistant",
          content: "Hello! I'm your AI assistant. How can I help you navigate the EduAI Hub platform?",
          timestamp: new Date(),
        },
      ],
    })
  }

  return (
    <AssistantContext.Provider
      value={{
        state,
        toggleOpen,
        toggleMinimize,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AssistantContext.Provider>
  )
}

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (context === undefined) {
    throw new Error("useAssistant must be used within an AssistantProvider")
  }
  return context
}
