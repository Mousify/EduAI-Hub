"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useAnimationStore } from "@/lib/stores/animation-store"

export function Particles({ count = 100, color = "#4f86f7" }) {
  const mesh = useRef()
  const { enabled, quality, reducedMotion } = useAnimationStore()

  // Adjust particle count based on quality setting
  const particleCount = useMemo(() => {
    if (!enabled) return 0
    switch (quality) {
      case "low":
        return Math.floor(count / 3)
      case "medium":
        return count
      case "high":
        return count * 2
      default:
        return count
    }
  }, [count, quality, enabled])

  // Create particles
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      )
      const speed = 0.01 + Math.random() / 200
      const rotation = Math.random()
      temp.push({ position, speed, rotation })
    }
    return temp
  }, [particleCount])

  useFrame(() => {
    if (!enabled || reducedMotion || !mesh.current) return

    particles.forEach((particle, i) => {
      const { position, speed, rotation } = particle

      // Move in a circular pattern
      position.y += Math.sin(rotation) * speed
      position.x += Math.cos(rotation) * speed

      // Reset position if out of bounds
      if (position.y > 5) position.y = -5
      if (position.y < -5) position.y = 5
      if (position.x > 5) position.x = -5
      if (position.x < -5) position.x = 5

      // Apply position and rotation to instance
      dummy.position.copy(position)
      dummy.rotation.x = rotation * 2
      dummy.rotation.y = rotation * 2
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, particleCount]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}
