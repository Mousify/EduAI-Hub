"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Copy, Trash2, Calendar, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock assessment data
const assessments = [
  {
    id: "a1",
    title: "Algebra Mid-Term Exam",
    subject: "Mathematics",
    type: "Exam",
    questions: 15,
    dateCreated: "2023-04-10",
    status: "published",
    dueDate: "2023-04-25",
    classes: ["Algebra I - Period 2", "Algebra I - Period 4"],
    submissions: 42,
    totalStudents: 56,
  },
  {
    id: "a2",
    title: "Geometry Quiz #3",
    subject: "Mathematics",
    type: "Quiz",
    questions: 10,
    dateCreated: "2023-04-15",
    status: "draft",
    dueDate: null,
    classes: [],
    submissions: 0,
    totalStudents: 0,
  },
  {
    id: "a3",
    title: "Calculus Practice Problems",
    subject: "Mathematics",
    type: "Practice",
    questions: 20,
    dateCreated: "2023-04-05",
    status: "published",
    dueDate: "2023-04-20",
    classes: ["Calculus - Period 6"],
    submissions: 18,
    totalStudents: 24,
  },
  {
    id: "a4",
    title: "Statistics Final Exam",
    subject: "Mathematics",
    type: "Exam",
    questions: 25,
    dateCreated: "2023-04-01",
    status: "published",
    dueDate: "2023-05-15",
    classes: ["Statistics - Period 3"],
    submissions: 0,
    totalStudents: 28,
  },
  {
    id: "a5",
    title: "Trigonometry Pop Quiz",
    subject: "Mathematics",
    type: "Quiz",
    questions: 8,
    dateCreated: "2023-04-18",
    status: "published",
    dueDate: "2023-04-19",
    classes: ["Trigonometry - Period 5"],
    submissions: 22,
    totalStudents: 26,
  },
]

export default function AssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredAssessments = assessments.filter((assessment) => {
    // Filter by search query
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "published") return matchesSearch && assessment.status === "published"
    if (activeTab === "drafts") return matchesSearch && assessment.status === "draft"
    if (activeTab === "archived") return matchesSearch && assessment.status === "archived"

    return matchesSearch
  })

  const handleDeleteAssessment = (assessmentId: string) => {
    if (confirm("Are you sure you want to delete this assessment?")) {
      alert(`Assessment ${assessmentId} would be deleted in a real app.`)
    }
  }

  const handleDuplicateAssessment = (assessmentId: string) => {
    alert(`Assessment ${assessmentId} would be duplicated in a real app.`)
  }

  const handleViewResults = (assessmentId: string) => {
    alert(`Viewing results for assessment ${assessmentId}. This would navigate to a results page.`)
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assessments</h1>
        <Button asChild>
          <Link href="/teacher-dashboard/assessments/new">
            <Plus className="mr-2 h-4 w-4" /> Create New Assessment
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search assessments..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-blue-50">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            All
          </TabsTrigger>
          <TabsTrigger value="published" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Published
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Drafts
          </TabsTrigger>
          <TabsTrigger value="archived" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Archived
          </TabsTrigger>
        </TabsList>

        <Card className="border-blue-100">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.length > 0 ? (
                  filteredAssessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{assessment.title}</p>
                          <p className="text-sm text-gray-500">{assessment.subject}</p>
                        </div>
                      </TableCell>
                      <TableCell>{assessment.type}</TableCell>
                      <TableCell>{assessment.questions}</TableCell>
                      <TableCell>
                        {assessment.dueDate ? (
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            {new Date(assessment.dueDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {assessment.classes.length > 0 ? (
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-gray-500" />
                            {assessment.classes.length} {assessment.classes.length === 1 ? "class" : "classes"}
                          </div>
                        ) : (
                          <span className="text-gray-500">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {assessment.status === "published" ? (
                          <div className="flex items-center">
                            <span className="text-sm">
                              {assessment.submissions}/{assessment.totalStudents}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              ({Math.round((assessment.submissions / assessment.totalStudents) * 100) || 0}%)
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            assessment.status === "published"
                              ? "bg-green-100 text-green-800"
                              : assessment.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {assessment.status === "published"
                            ? "Published"
                            : assessment.status === "draft"
                              ? "Draft"
                              : "Archived"}
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
                            {assessment.status === "published" && (
                              <DropdownMenuItem onClick={() => handleViewResults(assessment.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                View Results
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                              <Link href={`/teacher-dashboard/assessments/${assessment.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateAssessment(assessment.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteAssessment(assessment.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No assessments found.
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
