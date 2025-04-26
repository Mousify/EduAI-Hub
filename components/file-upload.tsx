"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { uploadFile, validateFile, MAX_FILE_SIZE } from "@/lib/storage"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Upload, X, FileText, ImageIcon, Music } from "lucide-react"

interface FileUploadProps {
  folder?: string
  onUploadComplete?: (fileData: any) => void
  onUploadError?: (error: string) => void
  allowedTypes?: string[]
  maxFiles?: number
  className?: string
}

export function FileUpload({
  folder = "homework",
  onUploadComplete,
  onUploadError,
  allowedTypes,
  maxFiles = 5,
  className,
}: FileUploadProps) {
  const { user } = useAuth()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding these files would exceed the max files limit
      if (files.length + e.target.files.length > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files`)
        return
      }

      // Validate each file
      const newFiles = Array.from(e.target.files)
      const invalidFiles = newFiles.filter((file) => {
        const validation = validateFile(file)
        if (!validation.valid) {
          setError(validation.error)
          return true
        }

        // Check if file type is allowed
        if (allowedTypes && !allowedTypes.includes(file.type)) {
          setError("File type not supported")
          return true
        }

        return false
      })

      if (invalidFiles.length > 0) {
        return
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!user) {
      setError("You must be logged in to upload files")
      return
    }

    if (files.length === 0) {
      setError("Please select at least one file to upload")
      return
    }

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const uploadedFiles = []

      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileData = await uploadFile(file, user.id, folder)
        uploadedFiles.push(fileData)

        // Update progress
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      // Call onUploadComplete callback with uploaded files data
      if (onUploadComplete) {
        onUploadComplete(uploadedFiles)
      }

      // Reset state
      setFiles([])
      setProgress(0)
    } catch (err: any) {
      console.error("Error uploading files:", err)
      setError(err.message || "Failed to upload files")

      if (onUploadError) {
        onUploadError(err.message || "Failed to upload files")
      }
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5" />
    } else if (file.type.startsWith("audio/")) {
      return <Music className="h-5 w-5" />
    } else {
      return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className={className}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center gap-2 rounded-md border bg-background p-2 text-sm">
            {getFileIcon(file)}
            <span className="max-w-[150px] truncate">{file.name}</span>
            <button type="button" onClick={() => removeFile(index)} className="ml-1 rounded-full p-1 hover:bg-muted">
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || files.length >= maxFiles}
          >
            <Upload className="mr-2 h-4 w-4" />
            Select Files
          </Button>
          <Button type="button" onClick={handleUpload} disabled={uploading || files.length === 0}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept={allowedTypes?.join(",")}
        />

        {uploading && (
          <div className="mt-2 space-y-1">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">Uploading... {progress}%</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Max file size: {MAX_FILE_SIZE / (1024 * 1024)}MB. Allowed file types:{" "}
          {allowedTypes ? allowedTypes.map((type) => type.split("/")[1]).join(", ") : "Images, Documents, Audio"}
        </p>
      </div>
    </div>
  )
}
