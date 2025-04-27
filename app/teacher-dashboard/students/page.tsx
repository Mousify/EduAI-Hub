"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, UserPlus, Mail, FileText, BarChart, Filter } from "lucide-react"

// Mock student data
const students = [
  {
    id: "s1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    grade: 10,
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Algebra II", "Chemistry"],
    lastActive: "Today, 2:30 PM",
    progress: 85,
    status: "active",
  },
  {
    id: "s2",
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    grade: 9,
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Geometry", "Biology"],
    lastActive: "Yesterday",
    progress: 72,
    status: "active",
  },
  {
    id: "s3",
    name: "Taylor Wilson",
    email: "taylor.w@example.com",
    grade: 11,
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Pre-Calculus", "Physics"],
    lastActive: "3 days ago",
    progress: 68,
    status: "inactive",
  },
  {
    id: "s4",
    name: "Morgan Lee",
    email: "morgan.l@example.com",
    grade: 10,
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Algebra II", "Chemistry"],
    lastActive: "Today, 9:15 AM",
    progress: 91,
    status: "active",
  },
  {
    id: "s5",
    name: "Casey Brown",
    email: "casey.b@example.com",
    grade: 9,
    avatar: "/placeholder.svg?height=40&width=40",
    classes: ["Geometry", "Biology"],
    lastActive: "Today, 11:45 AM",
    progress: 63,
    status: "at-risk",
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredStudents = students.filter((student) => {
    // Filter by search query
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && student.status === "active"
    if (activeTab === "inactive") return matchesSearch && student.status === "inactive"
    if (activeTab === "at-risk") return matchesSearch && student.status === "at-risk"

    return matchesSearch
  })

  const handleInviteStudent = () => {
    alert("This would open a modal to invite a new student. In a real app, it would send an email invitation.")
  }

  const handleViewProfile = (studentId: string) => {
    alert(`Viewing profile for student ${studentId}. This would navigate to the student's profile page.`)
  }

  const handleSendMessage = (studentId: string) => {
    alert(`Sending message to student ${studentId}. This would open a messaging interface.`)
  }

  const handleViewProgress = (studentId: string) => {
    alert(`Viewing progress for student ${studentId}. This would show detailed analytics.`)
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Students</h1>
          <p className="text-gray-600">Manage and monitor your students</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleInviteStudent} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Student
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search students..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-blue-50">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            All Students
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Active
          </TabsTrigger>
          <TabsTrigger value="inactive" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Inactive
          </TabsTrigger>
          <TabsTrigger value="at-risk" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            At Risk
          </TabsTrigger>
        </TabsList>

        <Card className="border-blue-100">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {student.classes.map((cls) => (
                            <Badge key={cls} variant="outline" className="bg-blue-50">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full ${
                                student.progress >= 80
                                  ? "bg-green-500"
                                  : student.progress >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : student.status === "inactive"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {student.status === "active"
                            ? "Active"
                            : student.status === "inactive"
                              ? "Inactive"
                              : "At Risk"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(student.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendMessage(student.id)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewProgress(student.id)}>
                              <BarChart className="mr-2 h-4 w-4" />
                              View Progress
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
