import type React from "react"
import { AuthProvider } from "@/lib/auth-context"

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
