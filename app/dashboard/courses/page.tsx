"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Play } from "lucide-react"

// Mock course data
const enrolledCourses = [
  {
    id: "course-1",
    title: "Algebra Fundamentals",
    description: "Master the basics of algebra with this comprehensive course",
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    image: "/placeholder.svg?height=100&width=200",
    lastAccessed: "2 days ago",
  },
  {
    id: "course-2",
    title: "Chemistry 101",
    description: "Introduction to basic chemistry concepts and principles",
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
    image: "/placeholder.svg?height=100&width=200",
    lastAccessed: "1 week ago",
  },
]

const recommendedCourses = [
  {
    id: "course-3",
    title: "Geometry Essentials",
    description: "Learn about shapes, angles, and spatial relationships",
    totalLessons: 10,
    difficulty: "Intermediate",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "course-4",
    title: "Biology Basics",
    description: "Explore the fundamentals of living organisms and systems",
    totalLessons: 14,
    difficulty: "Beginner",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "course-5",
    title: "Physics for Beginners",
    description: "Introduction to the laws of physics and mechanics",
    totalLessons: 12,
    difficulty: "Intermediate",
    image: "/placeholder.svg?height=100&width=200",
  },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("enrolled")

  const handleEnroll = (courseId: string) => {
    alert(`Enrolled in course ${courseId}! This would connect to your backend enrollment API.`)
  }

  const handleContinue = (courseId: string) => {
    alert(`Continuing course ${courseId}! This would navigate to the last lesson you were on.`)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Courses</h1>
        <p className="text-gray-600">Explore courses and continue your learning journey</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-blue-50">
          <TabsTrigger value="enrolled" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            My Courses
          </TabsTrigger>
          <TabsTrigger value="recommended" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Recommended
          </TabsTrigger>
          <TabsTrigger value="catalog" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Course Catalog
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled">
          {enrolledCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden border-blue-100">
                  <div className="aspect-video w-full bg-blue-50">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-blue-900">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        In Progress
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Last accessed {course.lastAccessed}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleContinue(course.id)}>
                      <Play className="mr-2 h-4 w-4" /> Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium">No courses enrolled</h3>
              <p className="mb-4 text-sm text-gray-500">You haven't enrolled in any courses yet.</p>
              <Button onClick={() => setActiveTab("catalog")}>Browse Courses</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid gap-6 md:grid-cols-3">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-blue-100">
                <div className="aspect-video w-full bg-blue-50">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-blue-900">{course.title}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>{course.totalLessons} lessons</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleEnroll(course.id)}>
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="catalog">
          <div className="rounded-lg border p-8 text-center">
            <h3 className="mb-2 text-lg font-medium">Course Catalog</h3>
            <p className="mb-4 text-sm text-gray-500">
              Browse our complete collection of courses across all subjects and grade levels.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {[...enrolledCourses, ...recommendedCourses].map((course) => (
                <Card key={course.id} className="overflow-hidden border-blue-100">
                  <div className="aspect-video w-full bg-blue-50">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-blue-900">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>{course.totalLessons} lessons</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleEnroll(course.id)}>
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
