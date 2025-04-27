import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plus, Search, MoreHorizontal } from "lucide-react"

export default function ClassesPage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Classes</h1>
        <Button asChild>
          <Link href="/teacher-dashboard/classes/new">
            <Plus className="mr-2 h-4 w-4" /> Create New Class
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search classes..." className="w-full bg-background pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Classes</TabsTrigger>
          <TabsTrigger value="archived">Archived Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Algebra I</CardTitle>
                  <CardDescription>Grade 9 • Room 203</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>28 students</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Avg. Grade</div>
                    <div className="text-lg font-bold">84%</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Completion</div>
                    <div className="text-lg font-bold">92%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Biology</CardTitle>
                  <CardDescription>Grade 10 • Room 156</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>24 students</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Avg. Grade</div>
                    <div className="text-lg font-bold">78%</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Completion</div>
                    <div className="text-lg font-bold">85%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>World History</CardTitle>
                  <CardDescription>Grade 11 • Room 118</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>22 students</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Avg. Grade</div>
                    <div className="text-lg font-bold">88%</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Completion</div>
                    <div className="text-lg font-bold">95%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Physics</CardTitle>
                  <CardDescription>Grade 12 • Room 302</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>18 students</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Avg. Grade</div>
                    <div className="text-lg font-bold">79%</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-xs font-medium">Completion</div>
                    <div className="text-lg font-bold">88%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
