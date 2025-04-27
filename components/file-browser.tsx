"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { listFiles, deleteFile } from "@/lib/storage"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, FileText, ImageIcon, File, MoreHorizontal, Download, Trash, Search, Filter } from "lucide-react"

type FileItem = {
  name: string
  url: string
  size: number
  type: string
  category: string
  created_at: string
}

type FileBrowserProps = {
  files: FileItem[]
  emptyMessage?: string
  isLoading?: boolean
  onDelete?: (file: FileItem) => void
  onDownload?: (file: FileItem) => void
  onView?: (file: FileItem) => void
}

export function FileBrowser({
  files = [],
  emptyMessage = "No files found",
  isLoading = false,
  onDelete,
  onDownload,
  onView,
}: FileBrowserProps) {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [fileType, setFileType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [userFiles, setUserFiles] = useState<FileItem[]>([])

  useEffect(() => {
    if (!user) return

    const fetchFiles = async () => {
      try {
        const files = await listFiles(user.id)
        setUserFiles(files)
      } catch (error) {
        console.error("Error fetching files:", error)
      }
    }

    fetchFiles()
  }, [user])

  const displayFiles = userFiles.length > 0 ? userFiles : files

  const filteredFiles = displayFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = fileType === "all" || file.category === fileType
    return matchesSearch && matchesType
  })

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "size") {
      return b.size - a.size
    }
    return 0
  })

  const handleDelete = async (file: FileItem) => {
    if (onDelete) {
      onDelete(file)
    } else {
      try {
        await deleteFile(file.name)
        setUserFiles(userFiles.filter((f) => f.name !== file.name))
      } catch (error) {
        console.error("Error deleting file:", error)
      }
    }
  }

  const handleDownload = (file: FileItem) => {
    if (onDownload) {
      onDownload(file)
    } else {
      window.open(file.url, "_blank")
    }
  }

  const handleView = (file: FileItem) => {
    if (onView) {
      onView(file)
    } else {
      setSelectedFile(file)
      setPreviewOpen(true)
    }
  }

  const getFileIcon = (file: FileItem) => {
    if (file.category === "image") {
      return <ImageIcon className="h-6 w-6 text-blue-500" />
    } else if (file.category === "document") {
      return <FileText className="h-6 w-6 text-amber-500" />
    } else {
      return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (sortedFiles.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
        <File className="h-10 w-10 text-gray-400" />
        <h3 className="font-medium text-gray-900">No files found</h3>
        <p className="text-sm text-gray-600">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFileType("all")}>All Files</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFileType("image")}>Images</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFileType("document")}>Documents</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFileType("audio")}>Audio</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("size")}>Size</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tabs value={viewMode} onValueChange={setViewMode}>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={viewMode} className="w-full">
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedFiles.map((file) => (
              <Card key={file.name} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square cursor-pointer bg-gray-100 relative" onClick={() => handleView(file)}>
                  {file.category === "image" ? (
                    <img src={file.url || "/placeholder.svg"} alt={file.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">{getFileIcon(file)}</div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(file)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(file)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(file)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedFiles.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell className="flex items-center gap-2">
                      {getFileIcon(file)}
                      <span className="font-medium">{file.name}</span>
                    </TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>{formatFileSize(file.size)}</TableCell>
                    <TableCell>{new Date(file.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleView(file)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(file)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(file)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
            <DialogDescription>
              {selectedFile?.type} • {selectedFile && formatFileSize(selectedFile.size)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile?.category === "image" ? (
              <img
                src={selectedFile.url || "/placeholder.svg"}
                alt={selectedFile.name}
                className="mx-auto max-h-[500px] rounded-md"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-md bg-gray-100">
                {getFileIcon(selectedFile!)}
                <p className="ml-2">{selectedFile?.name}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownload(selectedFile!)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
