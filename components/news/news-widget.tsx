"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen } from "lucide-react"

export function NewsWidget() {
  const [loading, setLoading] = useState(true)

  // Simulate loading and then show static content
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          Latest Education News
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <p className="line-clamp-1">
              <a href="#" className="hover:underline">
                New teaching methods improve student engagement
              </a>
            </p>
            <p className="line-clamp-1">
              <a href="#" className="hover:underline">
                AI tools transforming classroom experiences
              </a>
            </p>
            <p className="line-clamp-1">
              <a href="#" className="hover:underline">
                Study shows benefits of personalized learning
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
