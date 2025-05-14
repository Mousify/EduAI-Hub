"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type { ReactNode } from "react"

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
  distance = 20,
  once = true,
}: {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  className?: string
  distance?: number
  once?: boolean
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  const getDirectionVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }

    if (direction === "up") {
      variants.hidden = { ...variants.hidden, y: distance }
      variants.visible = { ...variants.visible, y: 0 }
    } else if (direction === "down") {
      variants.hidden = { ...variants.hidden, y: -distance }
      variants.visible = { ...variants.visible, y: 0 }
    } else if (direction === "left") {
      variants.hidden = { ...variants.hidden, x: distance }
      variants.visible = { ...variants.visible, x: 0 }
    } else if (direction === "right") {
      variants.hidden = { ...variants.hidden, x: -distance }
      variants.visible = { ...variants.visible, x: 0 }
    }

    return variants
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getDirectionVariants()}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimateOnHover({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function PulseAnimation({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatePresence({ children }: { children: ReactNode }) {
  return <>{children}</>
}
