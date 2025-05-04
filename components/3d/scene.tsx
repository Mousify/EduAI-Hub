"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useAnimationStore } from "@/lib/stores/animation-store"

// Dynamically import Three.js components to avoid SSR issues
const ThreeCanvas = dynamic(() => import("./three-canvas").then((mod) => mod.ThreeCanvas), {
  ssr: false,
  loading: () => <SceneLoading />,
})

function SceneLoading() {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-muted/20 rounded-xl">
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-muted-foreground">Loading 3D scene...</p>
      </div>
    </div>
  )
}

function ErrorFallback() {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-muted/20 rounded-xl">
      <div className="flex flex-col items-center justify-center text-center p-4">
        <p className="text-destructive font-medium">Failed to load 3D content</p>
        <p className="text-sm text-muted-foreground mt-2">Please check your connection or try again later</p>
      </div>
    </div>
  )
}

export function Scene3D({ className = "", interactive = false }) {
  const { enabled } = useAnimationStore()
  const [hasError, setHasError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !enabled) {
    return <SceneLoading />
  }

  if (hasError) {
    return <ErrorFallback />
  }

  return (
    <div className={`relative ${className}`}>
      <ThreeCanvas interactive={interactive} onError={() => setHasError(true)} />
    </div>
  )
}
