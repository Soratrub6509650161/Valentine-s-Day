"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingItem {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
  type: "heart" | "sparkle"
}

export function FloatingHearts() {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const generated: FloatingItem[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
      type: Math.random() > 0.4 ? "heart" : "sparkle",
    }))
    setItems(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            bottom: -30,
          }}
          animate={{
            y: [0, -typeof window !== "undefined" ? window.innerHeight + 100 : 1200],
            x: [0, Math.sin(item.id) * 40, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {item.type === "heart" ? (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="hsl(346, 77%, 52%)"
              opacity={item.opacity}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ) : (
            <svg
              width={item.size * 0.8}
              height={item.size * 0.8}
              viewBox="0 0 24 24"
              fill="hsl(40, 90%, 60%)"
              opacity={item.opacity}
            >
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7L2 9.4h7.6z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
