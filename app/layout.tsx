import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./test.css"
import "../globals.css"
import { ThemeProviderMain } from "@/components/theme-provider-main"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata to include the new domain
export const metadata: Metadata = {
  title: "EduAI Hub - AI-Powered Learning Platform",
  description: "AI-powered learning platform for students and teachers",
  metadataBase: new URL("https://mano10.lt"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderMain attribute="class" defaultTheme="light" enableSystem>
          {children}
          <SpeedInsights />
        </ThemeProviderMain>
      </body>
    </html>
  )
}
