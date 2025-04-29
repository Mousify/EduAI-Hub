import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileNav } from "@/components/mobile-navigation"
import { HomeButton } from "@/components/home-button"
import { AuthProvider } from "@/lib/auth-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <MobileNav />
            <HomeButton />
          </div>
          <div className="hidden md:flex md:items-center md:gap-2">
            <HomeButton />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-64 md:block">
            <DashboardNav className="h-full" />
          </aside>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}
