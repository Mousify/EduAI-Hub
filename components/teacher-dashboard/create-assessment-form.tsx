"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase-client"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Assessment title must be at least 2 characters.",
  }),
  class_id: z.string().min(1, {
    message: "Please select a class.",
  }),
  description: z.string().optional(),
  type: z.string().min(1, {
    message: "Please select an assessment type.",
  }),
  total_points: z.string().transform((val) => Number.parseInt(val, 10)),
  due_date: z.string().min(1, {
    message: "Please select a due date.",
  }),
})

export function CreateAssessmentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [classes, setClasses] = useState<any[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      class_id: "",
      description: "",
      type: "",
      total_points: "100",
      due_date: "",
    },
  })

  // Fetch classes for the teacher
  useState(() => {
    async function fetchClasses() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data, error } = await supabase.from("classes").select("id, name").eq("teacher_id", user.id)

        if (error) {
          throw error
        }

        setClasses(data || [])
      } catch (error) {
        console.error("Error fetching classes:", error)
        toast({
          title: "Error",
          description: "Failed to load classes",
          variant: "destructive",
        })
      }
    }

    fetchClasses()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create an assessment",
          variant: "destructive",
        })
        return
      }

      const { data, error } = await supabase
        .from("assessments")
        .insert({
          title: values.title,
          class_id: values.class_id,
          description: values.description || "",
          type: values.type,
          total_points: values.total_points,
          due_date: values.due_date,
          created_by: user.id,
        })
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Assessment created successfully",
      })

      router.push(`/teacher-dashboard/assessments`)
      router.refresh()
    } catch (error) {
      console.error("Error creating assessment:", error)
      toast({
        title: "Error",
        description: "Failed to create assessment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessment Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Midterm Exam" {...field} />
              </FormControl>
              <FormDescription>Enter a title for your assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="class_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the class for this assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the type of assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Points</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>Enter the total points for this assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Select the due date for this assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a description for your assessment" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Provide additional details about this assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Assessment"}
        </Button>
      </form>
    </Form>
  )
}
