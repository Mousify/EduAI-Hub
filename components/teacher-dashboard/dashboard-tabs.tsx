"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClassroomActivityChart } from "./classroom-activity-chart"
import { StudentPerformance } from "./student-performance"
import { RecentActivity } from "./recent-activity"
import { AtRiskStudents } from "./at-risk-students"
import { QuickActions } from "./quick-actions"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="assessments">Assessments</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Classroom Activity</CardTitle>
              <CardDescription>Student engagement and questions asked over the past week</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ClassroomActivityChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Recent assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentPerformance />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest classroom events</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>At-Risk Students</CardTitle>
              <CardDescription>Students who may need additional support</CardDescription>
            </CardHeader>
            <CardContent>
              <AtRiskStudents />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common teacher tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <QuickActions />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="classes">
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
            <CardDescription>Manage your classes and student rosters</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Class management content will appear here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="students">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>View and manage your students</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Student management content will appear here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="assessments">
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
            <CardDescription>Create and manage assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Assessment management content will appear here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
