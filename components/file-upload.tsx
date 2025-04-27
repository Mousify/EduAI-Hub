"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { uploadFile, validateFile } from "@/lib/storage"
import { Upload, X, FileText, ImageIcon, FileIcon, AlertCircle, CheckCircle } from "lucide-react"

type FileUploadProps = {
  userId?: string
  folder?: string
  allowedTypes?: string[]
  maxSize?: number
  onSuccess?: (fileData: any) => void
  onError?: (error: string) => void
}

export function FileUpload({
  userId,
  folder = "homework",
  allowedTypes,
  maxSize,
  onSuccess,
  onError,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSuccess(null)

    if (!e.target.files || e.target.files.length === 0) {
      setFile(null)
      setPreview(null)
      return
    }

    const selectedFile = e.target.files[0]

    // Validate file
    const validation = validateFile(selectedFile)
    if (!validation.valid) {
      setError(validation.error)
      setFile(null)
      setPreview(null)
      if (onError) onError(validation.error!)
      return
    }

    setFile(selectedFile)

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file || !userId) return

    setIsUploading(true)
    setProgress(0)
    setError(null)
    setSuccess(null)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 100)

      const fileData = await uploadFile(file, userId, folder)

      clearInterval(progressInterval)
      setProgress(100)
      setSuccess("File uploaded successfully!")

      if (onSuccess) onSuccess(fileData)

      // Reset after success
      setTimeout(() => {
        setFile(null)
        setPreview(null)
        setProgress(0)
        if (fileInputRef.current) fileInputRef.current.value = ""
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to upload file")
      if (onError) onError(err.message || "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setProgress(0)
    setError(null)
    setSuccess(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const getFileIcon = () => {
    if (!file) return null

    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    } else if (file.type.includes("pdf") || file.type.includes("document") || file.type.includes("text")) {
      return <FileText className="h-8 w-8 text-amber-500" />
    } else {
      return <FileIcon className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="file" className="text-blue-900">
          Select File
        </Label>
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            id="file"
            type="file"
            onChange={handleFileChange}
            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            disabled={isUploading}
          />
          {file && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              disabled={isUploading}
              className="h-10 w-10 text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Supported file types: Images, PDFs, Documents, Audio files. Max size: 5MB
        </p>
      </div>

      {file && (
        <div className="rounded-md border border-blue-100 p-4">
          <div className="flex items-center gap-3">
            {preview ? (
              <img src={preview || "/placeholder.svg"} alt="Preview" className="h-16 w-16 rounded object-cover" />
            ) : (
              getFileIcon()
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium text-blue-900">{file.name}</p>
              <p className="text-sm text-gray-600">
                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
              </p>
            </div>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uploading...</span>
                <span className="text-sm font-medium text-blue-900">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isUploading ? (
          <>Uploading...</>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </>
        )}
      </Button>
    </div>
  )
}
