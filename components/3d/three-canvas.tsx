"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useProgress, Html } from "@react-three/drei"
import { FloatingBook } from "./floating-book"
import { Particles } from "./particles"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-muted-foreground">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

export function ThreeCanvas({ interactive = false, onError }) {
  const canvasRef = useRef(null)

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: true,
      }}
      dpr={[1, 1.5]}
      onError={onError}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <FloatingBook position={[0, 0, 0]} scale={1.5} />
        <Particles count={15} />

        <Environment preset="city" />
        {interactive && <OrbitControls enableZoom={false} />}
      </Suspense>
    </Canvas>
  )
}
