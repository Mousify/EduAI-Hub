"use client"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNav } from "@/components/dashboard-nav"

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>AI Tutoring Platform</SheetTitle>
          <SheetDescription>Navigation</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <DashboardNav className="flex flex-col space-y-2" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Export as MobileNav for backward compatibility
export const MobileNav = MobileNavigation
