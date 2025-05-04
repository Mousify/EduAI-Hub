import type React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarLayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

export function SidebarLayout({ children, sidebar }: SidebarLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6">
      <aside className="md:w-64 mb-6 md:mb-0">{sidebar}</aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: ReactNode
  }[]
  currentPath?: string
}

export function SidebarNav({ className, items, currentPath, ...props }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            currentPath === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
