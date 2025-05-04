import { Suspense } from "react"
import { NewsFeed } from "@/components/news/news-feed"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function NewsLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

export default function NewsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Education News</h1>
      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<NewsLoading />}>
          <NewsFeed />
        </Suspense>
      </div>
    </div>
  )
}
