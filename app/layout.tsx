import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AssistantProvider } from "@/components/ai-assistant/assistant-context"
import { AssistantWidget } from "@/components/ai-assistant/assistant-widget"
import { LanguageProvider } from "@/components/language-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "EduAI Hub - AI-Powered Learning Platform",
    template: "%s | EduAI Hub",
  },
  description:
    "AI-powered platform connecting students with on-demand homework help and teachers with classroom management tools.",
  keywords: ["education", "AI", "tutoring", "homework help", "classroom management"],
  authors: [{ name: "EduAI Hub Team" }],
    generator: 'v0.dev'
}

// Default translations to avoid fetch during initial load
const defaultMessages = {
  common: {
    appName: "EduAI Hub",
    loading: "Loading...",
    error: "An error occurred",
  },
  navigation: {
    home: "Home",
    dashboard: "Dashboard",
    login: "Log In",
    signup: "Sign Up",
    news: "News",
    about: "About",
    pricing: "Pricing",
    blog: "Blog",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider initialLocale="en" messages={defaultMessages}>
            <AssistantProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
              <AssistantWidget />
              <SpeedInsights />
            </AssistantProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
