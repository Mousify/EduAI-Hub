"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown, ExternalLink, Calendar, BookOpen } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { lt } from "date-fns/locale"

type NewsItem = {
  title: string
  link: string
  pubDate: string
  contentSnippet?: string
  source: string
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [visibleItems, setVisibleItems] = useState(5)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await fetch("/api/news")

        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }

        const data = await response.json()
        setNews(data.news || [])
      } catch (err) {
        setError("Failed to load news. Please try again later.")
        console.error("Error fetching news:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 5, news.length))
  }

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

  if (error) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Švietimo naujienos
        </CardTitle>
        <CardDescription>Naujausi straipsniai ir įžvalgos švietimo srityje</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          // Loading skeletons
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))
        ) : news.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">Šiuo metu naujienų nėra.</div>
        ) : (
          news.slice(0, visibleItems).map((item, index) => (
            <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
              <h3 className="font-medium">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-start"
                >
                  {item.title}
                  <ExternalLink className="ml-1 h-3 w-3 flex-shrink-0 mt-1" />
                </a>
              </h3>
              {item.contentSnippet && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.contentSnippet}</p>
              )}
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{formatDate(item.pubDate)}</span>
                <span className="mx-2">•</span>
                <span>{item.source}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
      {!loading && news.length > visibleItems && (
        <CardFooter>
          <Button variant="ghost" className="w-full flex items-center justify-center" onClick={loadMore}>
            Rodyti daugiau
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
