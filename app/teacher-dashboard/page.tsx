import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { StatsCards } from "@/components/teacher-dashboard/stats-cards"
import { DashboardTabs } from "@/components/teacher-dashboard/dashboard-tabs"

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your classroom activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/teacher-dashboard/assessments/create">
              <Plus className="mr-2 h-4 w-4" /> Create Assessment
            </Link>
          </Button>
        </div>
      </div>

      <StatsCards />
      <DashboardTabs />
    </div>
  )
}
