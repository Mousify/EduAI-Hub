import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./test.css";
import "../globals.css";
import { ThemeProviderMain } from "@/components/theme-provider-main";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduAI Hub - AI-Powered Learning Platform",
  description: "AI-powered learning platform for students and teachers",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviderMain attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProviderMain>
      </body>
    </html>
  );
}
