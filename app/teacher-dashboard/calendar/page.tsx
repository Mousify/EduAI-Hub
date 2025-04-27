"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, CalendarIcon, Clock, Users, BookOpen, FileText } from "lucide-react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Math Quiz - Algebra",
      date: new Date(2025, 3, 29),
      time: "10:00 AM",
      class: "Grade 8 Math",
      type: "assessment",
      description: "Quiz covering basic algebraic expressions and equations",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: new Date(2025, 3, 30),
      time: "3:30 PM",
      class: "All Classes",
      type: "meeting",
      description: "Quarterly parent-teacher conferences",
    },
    {
      id: 3,
      title: "Science Lab - Chemistry",
      date: new Date(2025, 4, 2),
      time: "1:15 PM",
      class: "Grade 10 Science",
      type: "lesson",
      description: "Hands-on lab exploring chemical reactions",
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "",
    class: "",
    type: "lesson",
    description: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }])
    setNewEvent({
      title: "",
      date: new Date(),
      time: "",
      class: "",
      type: "lesson",
      description: "",
    })
    setIsDialogOpen(false)
  }

  const selectedDateEvents = events.filter((event) => event.date.toDateString() === (date?.toDateString() || ""))

  const eventTypeIcons = {
    lesson: <BookOpen className="h-4 w-4 text-green-500" />,
    assessment: <FileText className="h-4 w-4 text-amber-500" />,
    meeting: <Users className="h-4 w-4 text-blue-500" />,
  }

  const eventTypeColors = {
    lesson: "bg-green-100 text-green-800 border-green-200",
    assessment: "bg-amber-100 text-amber-800 border-amber-200",
    meeting: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Calendar</h1>
            <p className="text-gray-500 mt-2">Manage your classes, assessments, and meetings</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new event for your calendar</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Calendar
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                      className="border rounded-md p-3"
                    />
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="class">Class</Label>
                      <Input
                        id="class"
                        value={newEvent.class}
                        onChange={(e) => setNewEvent({ ...newEvent, class: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Event Type</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">Lesson</SelectItem>
                          <SelectItem value="assessment">Assessment</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  DayContent: (props) => {
                    const hasEvents = events.some(
                      (event) => event.date.toDateString() === new Date(props.date).toDateString(),
                    )

                    return (
                      <div className="relative">
                        <div>{props.day}</div>
                        {hasEvents && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                        )}
                      </div>
                    )
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                Events for{" "}
                {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </CardTitle>
              <CardDescription>{selectedDateEvents.length} events scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{event.class}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      {event.description && <p className="mt-2 text-sm">{event.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No events scheduled</h3>
                  <p className="text-gray-500 mt-1">There are no events scheduled for this date.</p>
                  <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
