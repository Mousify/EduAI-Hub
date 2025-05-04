import { NewsFeed } from "@/components/news/news-feed"

export const metadata = {
  title: "Švietimo naujienos | Mano10",
  description: "Naujausios švietimo naujienos ir įžvalgos",
}

export default function NewsPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Švietimo naujienos</h1>
        <p className="text-muted-foreground">Sekite naujausias švietimo tendencijas ir įžvalgas</p>
      </div>

      <NewsFeed />
    </div>
  )
}
