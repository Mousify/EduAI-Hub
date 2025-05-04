import type { ReactNode } from "react"
import { PageHeader } from "@/components/ui/page-header"

interface DashboardLayoutProps {
  children: ReactNode
  header: {
    title: string
    description?: string
    breadcrumbs?: {
      label: string
      href: string
    }[]
    actions?: ReactNode
  }
}

export function DashboardLayout({ children, header }: DashboardLayoutProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={header.title}
        description={header.description}
        breadcrumbs={header.breadcrumbs}
        actions={header.actions}
      />
      <div>{children}</div>
    </div>
  )
}
