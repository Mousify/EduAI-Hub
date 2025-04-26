"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/file-upload"
import { listFiles, deleteFile } from "@/lib/storage"
import { useAuth } from "@/lib/auth-context"
import { Loader2, FileText, ImageIcon, Music, Trash2, Download, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FileBrowserProps {
  folder?: string
  title?: string
  onFileSelect?: (file: any) => void
  showUpload?: boolean
  className?: string
}

export function FileBrowser({
  folder = "homework",
  title = "My Files",
  onFileSelect,
  showUpload = true,
  className,
}: FileBrowserProps) {
  const { user } = useAuth()
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewFile, setPreviewFile] = useState<any | null>(null)

  useEffect(() => {
    if (user) {
      loadFiles()
    }
  }, [user, folder])

  const loadFiles = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const filesList = await listFiles(user.id, folder)
      setFiles(filesList)
    } catch (err: any) {
      console.error("Error loading files:", err)
      setError(err.message || "Failed to load files")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileDelete = async (filePath: string) => {
    if (!confirm("Are you sure you want to delete this file?")) {
      return
    }

    try {
      await deleteFile(filePath, folder)
      // Refresh file list
      loadFiles()
    } catch (err: any) {
      console.error("Error deleting file:", err)
      setError(err.message || "Failed to delete file")
    }
  }

  const handleFileUploadComplete = () => {
    // Refresh file list
    loadFiles()
  }

  const getFileIcon = (file: any) => {
    const category = file.category || "unknown"

    if (category === "image") {
      return <ImageIcon className="h-5 w-5" />
    } else if (category === "audio") {
      return <Music className="h-5 w-5" />
    } else {
      return <FileText className="h-5 w-5" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const handlePreview = (file: any) => {
    setPreviewFile(file)
  }

  const handleFileClick = (file: any) => {
    if (onFileSelect) {
      onFileSelect(file)
    } else {
      handlePreview(file)
    }
  }

  return (
    <div className={className}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showUpload && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <FileUpload
              folder={folder}
              onUploadComplete={handleFileUploadComplete}
              onUploadError={(err) => setError(err)}
            />
          </CardContent>
        </Card>
      )}

      <div className="rounded-md border">
        <div className="flex items-center justify-between bg-muted/50 p-2">
          <h3 className="font-medium">{title}</h3>
          <Button variant="ghost" size="sm" onClick={loadFiles} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : files.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
            <FileText className="h-8 w-8" />
            <p>No files found</p>
            {showUpload && <p className="text-sm">Upload files to see them here</p>}
          </div>
        ) : (
          <div className="divide-y">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50">
                <div className="flex flex-1 cursor-pointer items-center gap-2" onClick={() => handleFileClick(file)}>
                  {getFileIcon(file)}
                  <div className="flex-1 truncate">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.metadata?.size || 0)} • {formatDate(file.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handlePreview(file)} className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Preview</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(file.url, "_blank")}
                    className="h-8 w-8"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFileDelete(file.name)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            {previewFile?.category === "image" ? (
              <img
                src={previewFile.url || "/placeholder.svg"}
                alt={previewFile.name}
                className="mx-auto max-h-[60vh] rounded-md object-contain"
              />
            ) : previewFile?.category === "audio" ? (
              <audio controls className="w-full">
                <source src={previewFile.url} type={previewFile.metadata?.mimetype} />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 rounded-md border p-8 text-center">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <p>Preview not available</p>
                <Button onClick={() => window.open(previewFile?.url, "_blank")}>Open File</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
