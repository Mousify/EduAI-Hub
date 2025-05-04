"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useAnimationStore } from "@/lib/stores/animation-store"

export function Particles({ count = 15 }) {
  const { enabled, reducedMotion } = useAnimationStore()
  const mesh = useRef()

  // Generate particles with reduced count
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 0.1 + 0.05
      const factor = size * 0.2
      const speed = Math.random() * 0.01 + 0.002
      const x = Math.random() * 10 - 5
      const y = Math.random() * 10 - 5
      const z = Math.random() * 10 - 5

      temp.push({ size, factor, speed, x, y, z, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  // Create geometry
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geo = useMemo(() => new THREE.SphereGeometry(1, 8, 8), [])

  // Animation
  useFrame(() => {
    if (!enabled || reducedMotion || !mesh.current) return

    particles.forEach((particle, i) => {
      const { x, y, z, factor, speed } = particle
      const t = Date.now() * speed

      dummy.position.set(x + Math.sin(t / 10) * factor, y + Math.cos(t / 10) * factor, z + Math.sin(t / 10) * factor)

      const s = particle.size
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[geo, null, count]}>
      <meshStandardMaterial color="#61dafb" transparent opacity={0.6} />
    </instancedMesh>
  )
}
