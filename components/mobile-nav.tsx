"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Home,
  BookOpen,
  BarChart,
  Settings,
  MessageSquare,
  Dumbbell,
  BookmarkIcon,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Mano10Logo } from "@/components/mano10-logo"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/sessions",
      label: "Tutoring Sessions",
      icon: MessageSquare,
      active: pathname === "/dashboard/sessions",
    },
    {
      href: "/dashboard/practice",
      label: "Practice",
      icon: Dumbbell,
      active: pathname === "/dashboard/practice",
    },
    {
      href: "/dashboard/resources",
      label: "Resources",
      icon: BookmarkIcon,
      active: pathname === "/dashboard/resources",
    },
    {
      href: "/dashboard/courses",
      label: "Courses",
      icon: BookOpen,
      active: pathname === "/dashboard/courses",
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: BarChart,
      active: pathname === "/dashboard/analytics",
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: CreditCard,
      active: pathname === "/dashboard/billing",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
    },
  ]

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
            <Mano10Logo width={100} height={32} />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
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
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t p-4 flex flex-col gap-2">
          <ModeToggle />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">Prisijungti</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/signup">Registruotis</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
