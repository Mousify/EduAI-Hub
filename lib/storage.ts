import { supabase } from "@/lib/db"

// File types allowed for upload
export const ALLOWED_FILE_TYPES = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
}

// Maximum file size in bytes (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024

// Function to validate file before upload
export const validateFile = (file: File) => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    }
  }

  // Check file type
  const allowedTypes = [...ALLOWED_FILE_TYPES.image, ...ALLOWED_FILE_TYPES.document, ...ALLOWED_FILE_TYPES.audio]
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "File type not supported",
    }
  }

  return { valid: true }
}

// Function to get file type category
export const getFileTypeCategory = (fileType: string) => {
  if (ALLOWED_FILE_TYPES.image.includes(fileType)) return "image"
  if (ALLOWED_FILE_TYPES.document.includes(fileType)) return "document"
  if (ALLOWED_FILE_TYPES.audio.includes(fileType)) return "audio"
  return "unknown"
}

// Function to upload file to Supabase Storage
export const uploadFile = async (file: File, userId: string, folder = "homework") => {
  try {
    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Create a unique file path
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${folder}/${userId}/${fileName}`

    // Upload file to Supabase Storage
    const { error: uploadError, data } = await supabase.storage.from(folder).upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: urlData } = supabase.storage.from(folder).getPublicUrl(filePath)

    return {
      path: filePath,
      url: urlData.publicUrl,
      name: file.name,
      type: file.type,
      size: file.size,
      category: getFileTypeCategory(file.type),
    }
  } catch (error: any) {
    console.error("Error uploading file:", error)
    throw new Error(error.message || "Failed to upload file")
  }
}

// Function to delete file from Supabase Storage
export const deleteFile = async (filePath: string, folder = "homework") => {
  try {
    const { error } = await supabase.storage.from(folder).remove([filePath])
    if (error) throw error
    return true
  } catch (error: any) {
    console.error("Error deleting file:", error)
    throw new Error(error.message || "Failed to delete file")
  }
}

// Function to list files in a folder
export const listFiles = async (userId: string, folder = "homework") => {
  try {
    const { data, error } = await supabase.storage.from(folder).list(`${userId}`, {
      sortBy: { column: "created_at", order: "desc" },
    })

    if (error) throw error

    // Get public URLs for all files
    const filesWithUrls = data.map((file) => {
      const { data: urlData } = supabase.storage.from(folder).getPublicUrl(`${userId}/${file.name}`)

      return {
        ...file,
        url: urlData.publicUrl,
        category: getFileTypeCategory(file.metadata?.mimetype || ""),
      }
    })

    return filesWithUrls
  } catch (error: any) {
    console.error("Error listing files:", error)
    throw new Error(error.message || "Failed to list files")
  }
}
