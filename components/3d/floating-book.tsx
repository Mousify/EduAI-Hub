"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Box } from "@react-three/drei"
import { useAnimationStore } from "@/lib/stores/animation-store"

export function FloatingBook(props) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { enabled, reducedMotion } = useAnimationStore()

  // Use a simple box instead of trying to load a model
  // This avoids the 404 error for the missing model file
  useFrame((state) => {
    if (!enabled || reducedMotion || !ref.current) return

    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 2) / 4
    ref.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <Box
      ref={ref}
      args={[1, 1.5, 0.2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? 1.2 : 1}
      {...props}
    >
      <meshStandardMaterial color={hovered ? "#4f86f7" : "#3366cc"} roughness={0.7} metalness={0.1} />
    </Box>
  )
}
