"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { lt } from "date-fns/locale"
import Link from "next/link"

type NewsItem = {
  title: string
  link: string
  pubDate: string
  source: string
}

export function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await fetch("/api/news")

        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }

        const data = await response.json()
        setNews((data.news || []).slice(0, 3)) // Only take the top 3 news items
      } catch (err) {
        console.error("Error fetching news:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: lt, // Lithuanian locale
      })
    } catch (e) {
      return "Unknown date"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>Naujienos</span>
          <Link href="/news" className="text-xs text-primary hover:underline">
            Visos naujienos
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          // Loading skeletons
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))
        ) : news.length === 0 ? (
          <div className="text-center py-2 text-muted-foreground text-sm">Šiuo metu naujienų nėra.</div>
        ) : (
          news.map((item, index) => (
            <div key={index} className="border-b last:border-0 pb-2 last:pb-0">
              <h3 className="text-sm font-medium">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-start"
                >
                  {item.title}
                  <ExternalLink className="ml-1 h-3 w-3 flex-shrink-0" />
                </a>
              </h3>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{formatDate(item.pubDate)}</span>
                <span className="mx-1">•</span>
                <span>{item.source}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
