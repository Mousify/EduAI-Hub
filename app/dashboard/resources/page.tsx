"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileBrowser } from "@/components/file-browser"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function ResourcesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("my-files")
  const [showUploadForm, setShowUploadForm] = useState(false)

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Resources</h1>
          <p className="text-gray-600">Manage your study materials and resources</p>
        </div>
        <Button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="h-4 w-4" />
          {showUploadForm ? "Cancel Upload" : "Upload File"}
        </Button>
      </div>

      {showUploadForm && (
        <Card className="mb-6 border-blue-100">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Upload New Resource</CardTitle>
            <CardDescription className="text-blue-700">
              Upload study materials, assignments, or other educational resources
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <FileUpload
              userId={user?.id}
              onSuccess={() => {
                setShowUploadForm(false)
                // Refresh file list would go here
              }}
            />
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-blue-50">
          <TabsTrigger value="my-files" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            My Files
          </TabsTrigger>
          <TabsTrigger
            value="shared-with-me"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Shared With Me
          </TabsTrigger>
          <TabsTrigger
            value="class-resources"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Class Resources
          </TabsTrigger>
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
