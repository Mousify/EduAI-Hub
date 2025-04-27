"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase-client"
import { formatDistanceToNow } from "date-fns"
import { toast } from "@/components/ui/use-toast"

type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  created_at: string
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        setNotifications(data || [])
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast({
          title: "Error",
          description: "Failed to load notifications",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length
  const readNotifications = notifications.filter((n) => n.read)
  const unreadNotifications = notifications.filter((n) => !n.read)

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id)

      if (error) {
        throw error
      }

      setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))

      toast({
        title: "Success",
        description: "Notification marked as read",
      })
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast({
        title: "Error",
        description: "Failed to update notification",
        variant: "destructive",
      })
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").delete().eq("id", id)

      if (error) {
        throw error
      }

      setNotifications(notifications.filter((n) => n.id !== id))

      toast({
        title: "Success",
        description: "Notification deleted",
      })
    } catch (error) {
      console.error("Error deleting notification:", error)
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      })
    }
  }

  const markAllAsRead = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", user.id)
        .eq("read", false)

      if (error) {
        throw error
      }

      setNotifications(notifications.map((n) => ({ ...n, read: true })))

      toast({
        title: "Success",
        description: "All notifications marked as read",
      })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      toast({
        title: "Error",
        description: "Failed to update notifications",
        variant: "destructive",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "warning":
        return <Bell className="h-4 w-4 text-yellow-500" />
      case "error":
        return <Bell className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const renderNotificationList = (items: Notification[]) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No notifications to display</p>
        </div>
      )
    }

    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 pr-3">
          {items.map((notification) => (
            <Card key={notification.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    <CardTitle className="text-sm font-medium">{notification.title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {formatDistanceToNow(new Date(notification.created_at), {
                      addSuffix: true,
                    })}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-2">
                {!notification.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                    <Check className="h-4 w-4 mr-1" />
                    Mark as read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    )
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Loading notifications...</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-12 bg-muted rounded-md w-full"></div>
            <div className="h-12 bg-muted rounded-md w-full"></div>
            <div className="h-12 bg-muted rounded-md w-full"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have {unreadCount} unread notifications</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unread">
          <TabsList className="mb-4">
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="read">Read ({readNotifications.length})</TabsTrigger>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="unread">{renderNotificationList(unreadNotifications)}</TabsContent>
          <TabsContent value="read">{renderNotificationList(readNotifications)}</TabsContent>
          <TabsContent value="all">{renderNotificationList(notifications)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
