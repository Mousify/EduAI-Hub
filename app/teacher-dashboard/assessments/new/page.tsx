"use client"

import { CreateAssessmentForm } from "@/components/teacher-dashboard/create-assessment-form"

export default function NewAssessmentPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Assessment</h1>
      <div className="max-w-2xl">
        <CreateAssessmentForm />
      </div>
    </div>
  )
}
