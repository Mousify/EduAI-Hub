import { NextResponse } from "next/server"
import Parser from "rss-parser"
import { supabase } from "@/lib/db"

// Define the structure of our news items
type NewsItem = {
  title: string
  link: string
  pubDate: string
  content?: string
  contentSnippet?: string
  source: string
  guid?: string
  categories?: string[]
}

// RSS feed sources
const EDUCATION_RSS_FEEDS = [
  {
    url: "https://www.edweek.org/feed",
    source: "Education Week",
  },
  {
    url: "https://www.edsurge.com/feeds/articles",
    source: "EdSurge",
  },
  {
    url: "https://www.khanacademy.org/rss/blog",
    source: "Khan Academy",
  },
  {
    url: "https://www.teachthought.com/feed/",
    source: "TeachThought",
  },
  {
    url: "https://www.eschoolnews.com/feed/",
    source: "eSchool News",
  },
]

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600

export async function GET(request: Request) {
  try {
    // Check if we have cached news
    const { data: cachedNews, error: cacheError } = await supabase
      .from("cache")
      .select("*")
      .eq("key", "education_news")
      .single()

    // If we have valid cached news that isn't expired, return it
    if (cachedNews && !cacheError) {
      const now = Math.floor(Date.now() / 1000)
      if (now - cachedNews.updated_at < CACHE_DURATION) {
        return NextResponse.json({ news: JSON.parse(cachedNews.value) })
      }
    }

    // If no valid cache, fetch fresh news
    const parser = new Parser()
    const allNews: NewsItem[] = []

    // Fetch from all sources
    for (const feed of EDUCATION_RSS_FEEDS) {
      try {
        const feedData = await parser.parseURL(feed.url)

        // Process each item in the feed
        const newsItems = feedData.items.map((item) => ({
          title: item.title || "No Title",
          link: item.link || "",
          pubDate: item.pubDate || new Date().toISOString(),
          contentSnippet: item.contentSnippet?.substring(0, 200) || "",
          source: feed.source,
          guid: item.guid,
          categories: item.categories,
        }))

        allNews.push(...newsItems)
      } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error)
        // Continue with other feeds even if one fails
      }
    }

    // Sort by publication date (newest first)
    allNews.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    })

    // Take only the latest 30 items
    const latestNews = allNews.slice(0, 30)

    // Update the cache
    await supabase.from("cache").upsert({
      key: "education_news",
      value: JSON.stringify(latestNews),
      updated_at: Math.floor(Date.now() / 1000),
    })

    return NextResponse.json({ news: latestNews })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
