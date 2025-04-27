import { NotificationList } from "@/components/notifications/notification-list"

export default function NotificationsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <NotificationList />
    </div>
  )
}
