"use client"

export function RecentActivity() {
  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-sky-500"></div>
        <div>
          <p className="text-sm font-medium">Sarah Johnson submitted Algebra homework</p>
          <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-amber-500"></div>
        <div>
          <p className="text-sm font-medium">5 students need help with Chemistry concepts</p>
          <p className="text-xs text-muted-foreground">Yesterday at 4:15 PM</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-emerald-500"></div>
        <div>
          <p className="text-sm font-medium">Physics assessment completed by all students</p>
          <p className="text-xs text-muted-foreground">Jan 15, 2023</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-rose-500"></div>
        <div>
          <p className="text-sm font-medium">New resource added: "Calculus Fundamentals"</p>
          <p className="text-xs text-muted-foreground">Jan 14, 2023</p>
        </div>
      </div>
    </div>
  )
}
