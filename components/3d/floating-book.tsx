"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useAnimationStore } from "@/lib/stores/animation-store"

export function FloatingBook(props) {
  const { nodes, materials } = useGLTF("/models/book.glb")
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { enabled, reducedMotion } = useAnimationStore()

  // Animate the book floating and rotating
  useFrame((state) => {
    if (!enabled || reducedMotion) return

    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 2) / 4
    ref.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        geometry={nodes.Book.geometry}
        material={materials.BookMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={clicked ? 1.2 : 1}
      >
        <meshStandardMaterial color={hovered ? "#4f86f7" : "#3366cc"} roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  )
}

useGLTF.preload("/models/book.glb")
