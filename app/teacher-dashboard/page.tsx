import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { StatsCards } from "@/components/teacher-dashboard/stats-cards"
import { ClassroomActivityChart } from "@/components/teacher-dashboard/classroom-activity-chart"
import { StudentPerformance } from "@/components/teacher-dashboard/student-performance"
import { RecentActivity } from "@/components/teacher-dashboard/recent-activity"
import { AtRiskStudents } from "@/components/teacher-dashboard/at-risk-students"
import { QuickActions } from "@/components/teacher-dashboard/quick-actions"
import { DashboardTabs } from "@/components/teacher-dashboard/dashboard-tabs"
import { NewsWidget } from "@/components/news/news-widget"
import { Scene3D } from "@/components/3d/scene"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout
      header={{
        title: "Teacher Dashboard",
        description: "Welcome back! Here's an overview of your classroom activity.",
        breadcrumbs: [{ label: "Teacher Dashboard", href: "/teacher-dashboard" }],
        actions: (
          <Button asChild>
            <Link href="/teacher-dashboard/classes/new">
              <Plus className="mr-2 h-4 w-4" />
              New Class
            </Link>
          </Button>
        ),
      }}
    >
      <div className="grid gap-6">
        <StatsCards />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ClassroomActivityChart />
          </div>
          <div className="relative h-[300px] rounded-xl border overflow-hidden">
            <Scene3D className="absolute inset-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DashboardTabs />
          </div>
          <div>
            <NewsWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StudentPerformance />
          <AtRiskStudents />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  )
}
