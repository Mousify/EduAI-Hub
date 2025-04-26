"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileBrowser } from "@/components/file-browser"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("my-files")
  const [showUploadForm, setShowUploadForm] = useState(false)

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resources</h1>
        <Button onClick={() => setShowUploadForm(!showUploadForm)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          {showUploadForm ? "Cancel Upload" : "Upload File"}
        </Button>
      </div>

      {showUploadForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload New Resource</CardTitle>
            <CardDescription>Upload study materials, assignments, or other educational resources</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              onSuccess={() => {
                setShowUploadForm(false)
                // Refresh file list would go here
              }}
            />
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="my-files">My Files</TabsTrigger>
          <TabsTrigger value="shared-with-me">Shared With Me</TabsTrigger>
          <TabsTrigger value="class-resources">Class Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="my-files">
          <FileBrowser
            files={[]}
            emptyMessage="You haven't uploaded any files yet. Click 'Upload File' to get started."
            isLoading={false}
          />
        </TabsContent>

        <TabsContent value="shared-with-me">
          <FileBrowser files={[]} emptyMessage="No files have been shared with you yet." isLoading={false} />
        </TabsContent>

        <TabsContent value="class-resources">
          <FileBrowser
            files={[]}
            emptyMessage="No class resources available. Your teacher can upload resources for your class."
            isLoading={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
