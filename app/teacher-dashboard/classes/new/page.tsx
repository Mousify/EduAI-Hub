import { CreateClassForm } from "@/components/teacher-dashboard/create-class-form"

export default function NewClassPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Class</h1>
      <div className="max-w-2xl">
        <CreateClassForm />
      </div>
    </div>
  )
}
