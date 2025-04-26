"use client"
import { Button } from "@/components/ui/button"
import { FileText, Users, BookOpen, CalendarDays } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid gap-2">
      <Button className="w-full justify-start" variant="outline">
        <FileText className="mr-2 h-4 w-4" />
        Create New Assessment
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Users className="mr-2 h-4 w-4" />
        Manage Class Roster
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <BookOpen className="mr-2 h-4 w-4" />
        Generate Study Materials
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <CalendarDays className="mr-2 h-4 w-4" />
        Schedule Office Hours
      </Button>
    </div>
  )
}
