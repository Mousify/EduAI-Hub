"use client"
import { Button } from "@/components/ui/button"

export function AtRiskStudents() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
          <div>
            <p className="text-sm font-medium">Alex Martinez</p>
            <p className="text-xs text-muted-foreground">Grade 10 - Missing 3 assignments</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Contact
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
          <div>
            <p className="text-sm font-medium">Jamie Wilson</p>
            <p className="text-xs text-muted-foreground">Grade 9 - Below 65% in Math</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Contact
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
          <div>
            <p className="text-sm font-medium">Taylor Kim</p>
            <p className="text-xs text-muted-foreground">Grade 11 - Attendance concerns</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Contact
        </Button>
      </div>
    </div>
  )
}
