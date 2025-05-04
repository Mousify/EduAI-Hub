"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getAllChangelogs } from "@/lib/db"
import type { ChangelogEntry, ChangeType } from "@/lib/types/changelog"
import { formatDistanceToNow } from "date-fns"

const changeTypeIcons: Record<ChangeType, string> = {
  feature: "✨",
  improvement: "🔧",
  fix: "🐛",
  security: "🔒",
  deprecation: "⚠️",
}

export function ChangelogList() {
  const [changelogs, setChangelogs] = useState<ChangelogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 5

  useEffect(() => {
    async function fetchChangelogs() {
      try {
        const { data, count } = await getAllChangelogs(currentPage, pageSize)
        if (data) {
          // Transform the data to match our types
          const entries: ChangelogEntry[] = data.map((entry) => ({
            ...entry,
            releaseDate: new Date(entry.release_date),
            isMajor: entry.is_major,
            createdAt: new Date(entry.created_at),
            updatedAt: new Date(entry.updated_at),
          }))
          setChangelogs(entries)
          setTotalPages(Math.ceil((count || 0) / pageSize))
        }
      } catch (error) {
        console.error("Error fetching changelogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChangelogs()
  }, [currentPage])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-muted rounded w-full"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {changelogs.map((changelog) => (
        <Card key={changelog.id} className={changelog.isMajor ? "border-primary/50" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant={changelog.isMajor ? "default" : "outline"} className="mb-2">
                v{changelog.version}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(changelog.releaseDate, { addSuffix: true })}
              </span>
            </div>
            <CardTitle>{changelog.title}</CardTitle>
            <CardDescription>{changelog.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {changelog.changes.map((change, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-lg" aria-hidden="true">
                    {changeTypeIcons[change.type]}
                  </span>
                  <div>
                    <span className="font-medium capitalize">{change.type}:</span> {change.description}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
