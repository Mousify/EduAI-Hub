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
    { href: "/", label: "Pradžia" },
    { href: "/#pricing", label: "Kainos" },
    { href: "/#testimonials", label: "Atsiliepimai" },
    { href: "/about", label: "Apie mus" },
    { href: "/contact", label: "Kontaktai" },
  ]

  const studentRoutes = [
    { href: "/dashboard", label: "Skydelis" },
    { href: "/dashboard/homework-helper", label: "Namų darbų pagalba" },
    { href: "/dashboard/practice", label: "Praktika" },
    { href: "/dashboard/tutoring", label: "Korepetavimas" },
    { href: "/dashboard/study-guides", label: "Mokymosi gidai" },
    { href: "/dashboard/resources", label: "Ištekliai" },
    { href: "/dashboard/settings", label: "Nustatymai" },
  ]

  const teacherRoutes = [
    { href: "/teacher-dashboard", label: "Skydelis" },
    { href: "/teacher-dashboard/classes", label: "Klasės" },
    { href: "/teacher-dashboard/students", label: "Mokiniai" },
    { href: "/teacher-dashboard/assessments", label: "Vertinimai" },
    { href: "/teacher-dashboard/tools", label: "DI įrankiai" },
    { href: "/teacher-dashboard/resources", label: "Ištekliai" },
    { href: "/teacher-dashboard/settings", label: "Nustatymai" },
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
            
            <span className="text-lg font-semibold">mano10</span>
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

            {isMainSite && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all bg-primary text-primary-foreground"
                >
                  Prisijungti
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all border border-input"
                >
                  Registruotis
                </Link>
              </>
            )}

            <div className="px-3 py-2">
              <ModeToggle />
            </div>

            {!isMainSite && (
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all border border-input"
              >
                Grįžti į pradžią
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
                Atsijungti
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
