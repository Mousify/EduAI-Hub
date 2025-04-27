"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NotificationList } from "./notification-list"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchUnreadCount() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { count, error } = await supabase
          .from("notifications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("read", false)

        if (error) {
          throw error
        }

        setUnreadCount(count || 0)
      } catch (error) {
        console.error("Error fetching unread notifications count:", error)
      }
    }

    fetchUnreadCount()

    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel("notifications_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          fetchUnreadCount()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleViewAll = () => {
    setOpen(false)
    router.push("/notifications")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-0" align="end">
        <NotificationList />
        <div className="border-t p-2 flex justify-center">
          <Button variant="ghost" size="sm" onClick={handleViewAll}>
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
