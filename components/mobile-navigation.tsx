"use client"

import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"
import { TeacherMobileNav } from "./teacher-mobile-nav"
import { HomeMobileNav } from "./home-mobile-nav"

// Re-export MobileNav to fix the deployment error
export { MobileNav } from "./mobile-nav"

export function MobileNavigation() {
  const pathname = usePathname()

  // Check if we're on the home page or other public pages
  const isPublicPage = !pathname.startsWith("/dashboard") && !pathname.startsWith("/teacher-dashboard")

  // Check if we're on the teacher dashboard
  const isTeacherDashboard = pathname.startsWith("/teacher-dashboard")

  if (isPublicPage) {
    return <HomeMobileNav />
  }

  if (isTeacherDashboard) {
    return <TeacherMobileNav />
  }

  return <MobileNav />
}
