import type React from "react"
import { MainNavigation } from "@/components/main-navigation"
import { SiteFooter } from "@/components/site-footer"

export default function MarketingPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
