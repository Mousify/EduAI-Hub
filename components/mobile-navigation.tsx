"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Determine which navigation to show based on the current path
  const isTeacherDashboard = pathname?.startsWith("/teacher-dashboard")
  const isStudentDashboard = pathname?.startsWith("/dashboard") && !pathname?.startsWith("/dashboard/teacher")
  const isMainSite = !isTeacherDashboard && !isStudentDashboard

  // Define routes for each context
  const mainRoutes = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/schools", label: "For Schools" },
  ]

  const studentRoutes = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/homework-helper", label: "Homework Helper" },
    { href: "/dashboard/practice", label: "Practice" },
    { href: "/dashboard/tutoring", label: "Tutoring" },
    { href: "/dashboard/study-guides", label: "Study Guides" },
    { href: "/dashboard/resources", label: "Resources" },
    { href: "/dashboard/settings", label: "Settings" },
  ]

  const teacherRoutes = [
    { href: "/teacher-dashboard", label: "Dashboard" },
    { href: "/teacher-dashboard/classes", label: "Classes" },
    { href: "/teacher-dashboard/students", label: "Students" },
    { href: "/teacher-dashboard/assessments", label: "Assessments" },
    { href: "/teacher-dashboard/tools", label: "AI Tools" },
    { href: "/teacher-dashboard/resources", label: "Resources" },
    { href: "/teacher-dashboard/settings", label: "Settings" },
  ]

  // Select the appropriate routes based on context
  const routes = isTeacherDashboard ? teacherRoutes : isStudentDashboard ? studentRoutes : mainRoutes

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
            <span className="text-lg font-semibold">EduAI Hub</span>
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  pathname === route.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {route.label}
              </Link>
            ))}

            <div className="h-px bg-border my-2" />

            <div className="px-3 py-2">
              <ModeToggle />
            </div>

            {isMainSite && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all bg-primary text-primary-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all border border-input"
                >
                  Sign Up
                </Link>
              </>
            )}

            {!isMainSite && (
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all border border-input"
              >
                Back to Home
              </Link>
            )}

            {!isMainSite && (
              <Button
                variant="destructive"
                className="w-full mt-2"
                onClick={() => {
                  setOpen(false)
                  // You would typically call your signOut function here
                }}
              >
                Sign Out
              </Button>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// Export MobileNav as an alias for MobileNavigation for backward compatibility
export const MobileNav = MobileNavigation
