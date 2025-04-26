import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your learning activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>New Tutoring Session</Button>
        </div>
      </div>

      <StatsCards />
      <DashboardTabs />
    </div>
  )
}
