"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Send, PaperclipIcon, Smile } from "lucide-react"

// Mock conversation data
const conversations = [
  {
    id: "c1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have a question about the homework assignment",
    timestamp: "10:30 AM",
    unread: true,
    online: true,
  },
  {
    id: "c2",
    name: "Parent: Mrs. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for your help with Jamie's progress",
    timestamp: "Yesterday",
    unread: false,
    online: false,
  },
  {
    id: "c3",
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When is the next quiz?",
    timestamp: "Yesterday",
    unread: false,
    online: true,
  },
  {
    id: "c4",
    name: "Casey Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll submit the assignment by tomorrow",
    timestamp: "Monday",
    unread: false,
    online: false,
  },
  {
    id: "c5",
    name: "Morgan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback on my project",
    timestamp: "Last week",
    unread: false,
    online: false,
  },
]

// Mock messages for a conversation
const messages = [
  {
    id: "m1",
    sender: "student",
    content: "Hello Ms. Johnson, I have a question about the homework assignment.",
    timestamp: "10:30 AM",
  },
  {
    id: "m2",
    sender: "teacher",
    content: "Hi Alex, what's your question?",
    timestamp: "10:32 AM",
  },
  {
    id: "m3",
    sender: "student",
    content: "For problem #5, I'm not sure if I should use the quadratic formula or factoring.",
    timestamp: "10:33 AM",
  },
  {
    id: "m4",
    sender: "teacher",
    content:
      "Great question! For that problem, try factoring first. If you can't find the factors easily, then the quadratic formula is your best approach.",
    timestamp: "10:35 AM",
  },
  {
    id: "m5",
    sender: "student",
    content: "That makes sense. I'll try factoring first. Thank you!",
    timestamp: "10:36 AM",
  },
  {
    id: "m6",
    sender: "teacher",
    content: "You're welcome! Let me know if you have any other questions.",
    timestamp: "10:37 AM",
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter((conversation) => {
    // Filter by search query
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && conversation.unread
    if (activeTab === "students") return matchesSearch && !conversation.name.includes("Parent")
    if (activeTab === "parents") return matchesSearch && conversation.name.includes("Parent")

    return matchesSearch
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // In a real app, this would send the message to the backend
    return

    // In a real app, this would send the message to the backend
    alert(`Message sent: ${newMessage}`)
    setNewMessage("")
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Messages</h1>
        <p className="text-gray-600">Communicate with students and parents</p>
      </div>

      <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-blue-100 md:col-span-1">
          <div className="flex flex-col h-full">
            <div className="border-b p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search messages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="w-full bg-blue-50">
                <TabsTrigger
                  value="all"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Students
                </TabsTrigger>
                <TabsTrigger
                  value="parents"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Parents
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex cursor-pointer items-center gap-3 border-b p-3 hover:bg-blue-50 ${
                      selectedConversation.id === conversation.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.name}</p>
                        <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && <Badge className="bg-blue-600">New</Badge>}
                  </div>
                ))}
              </div>
            </Tabs>
          </div>
        </Card>

        <Card className="border-blue-100 md:col-span-2">
          <div className="flex flex-col h-full">
            <div className="border-b p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedConversation.name}</p>
                    <p className="text-xs text-gray-500">{selectedConversation.online ? "Online" : "Offline"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "teacher" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "teacher" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-right text-xs ${
                        message.sender === "teacher" ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <PaperclipIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button variant="outline" size="icon" className="rounded-full">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
