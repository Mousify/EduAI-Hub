"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  BookOpen,
  BarChart,
  Settings,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function TeacherMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: "/teacher-dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/teacher-dashboard",
    },
    {
      href: "/teacher-dashboard/classes",
      label: "Classes",
      icon: Users,
      active: pathname === "/teacher-dashboard/classes",
    },
    {
      href: "/teacher-dashboard/assessments",
      label: "Assessments",
      icon: FileText,
      active: pathname === "/teacher-dashboard/assessments",
    },
    {
      href: "/teacher-dashboard/students",
      label: "Students",
      icon: Users,
      active: pathname === "/teacher-dashboard/students",
    },
    {
      href: "/teacher-dashboard/resources",
      label: "Resources",
      icon: BookOpen,
      active: pathname === "/teacher-dashboard/resources",
    },
    {
      href: "/teacher-dashboard/messages",
      label: "Messages",
      icon: MessageSquare,
      active: pathname === "/teacher-dashboard/messages",
    },
    {
      href: "/teacher-dashboard/calendar",
      label: "Calendar",
      icon: Calendar,
      active: pathname === "/teacher-dashboard/calendar",
    },
    {
      href: "/teacher-dashboard/tools",
      label: "AI Tools",
      icon: Sparkles,
      active: pathname.startsWith("/teacher-dashboard/tools"),
    },
    {
      href: "/teacher-dashboard/analytics",
      label: "Analytics",
      icon: BarChart,
      active: pathname === "/teacher-dashboard/analytics",
    },
    {
      href: "/teacher-dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/teacher-dashboard/settings",
    },
  ];

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
            <span className="text-lg font-semibold">mano10</span>
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
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
