export type MessageRole = "user" | "assistant" | "system"

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

export interface AssistantState {
  isOpen: boolean
  isMinimized: boolean
  messages: Message[]
  isLoading: boolean
}
