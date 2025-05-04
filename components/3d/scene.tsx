"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useProgress, Html } from "@react-three/drei"
import { FloatingBook } from "./floating-book"
import { Particles } from "./particles"
import { useAnimationStore } from "@/lib/stores/animation-store"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-muted-foreground">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

export function Scene3D({ className = "", interactive = false }) {
  const { enabled } = useAnimationStore()

  if (!enabled) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <FloatingBook position={[0, 0, 0]} scale={1.5} />
          <Particles count={50} />

          <Environment preset="city" />
          {interactive && <OrbitControls enableZoom={false} />}
        </Suspense>
      </Canvas>
    </div>
  )
}
