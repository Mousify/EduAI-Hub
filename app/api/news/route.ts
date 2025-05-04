import { NextResponse } from "next/server"
import Parser from "rss-parser"

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
    url: "https://www.teachthought.com/feed/",
    source: "TeachThought",
  },
]

// In-memory cache
let newsCache = {
  data: null,
  timestamp: 0,
}

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600

export async function GET() {
  try {
    // Check if we have valid cached news
    const now = Math.floor(Date.now() / 1000)
    if (newsCache.data && now - newsCache.timestamp < CACHE_DURATION) {
      return NextResponse.json({ news: newsCache.data, cached: true })
    }

    // If no valid cache, fetch fresh news
    const parser = new Parser()
    const allNews: NewsItem[] = []

    // Fetch from all sources with a timeout
    const feedPromises = EDUCATION_RSS_FEEDS.map(async (feed) => {
      try {
        // Create a promise that rejects after 5 seconds
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout fetching ${feed.url}`)), 5000)
        })

        // Race the feed fetch against the timeout
        const feedData = (await Promise.race([parser.parseURL(feed.url), timeoutPromise])) as any

        // Process each item in the feed
        const newsItems = feedData.items.map((item: any) => ({
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
    })

    // Wait for all feeds to be processed
    await Promise.allSettled(feedPromises)

    // Sort by publication date (newest first)
    allNews.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    })

    // Take only the latest 30 items
    const latestNews = allNews.slice(0, 30)

    // Update the in-memory cache
    newsCache = {
      data: latestNews,
      timestamp: now,
    }

    return NextResponse.json({ news: latestNews })
  } catch (error) {
    console.error("Error fetching news:", error)
    // Return empty news array instead of error to prevent client-side errors
    return NextResponse.json({ news: [], error: "Failed to fetch news" })
  }
}
