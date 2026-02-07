"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { Heart, PartyPopper } from "lucide-react"
import { useCallback, useRef, useState } from "react"

export function ValentineQuestion() {
  const [answered, setAnswered] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const noX = useTransform(mouseX, (v) => v)
  const noY = useTransform(mouseY, (v) => v)

  const handleNoMouseEnter = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const btn = noButtonRef.current.getBoundingClientRect()

    const maxX = container.width - btn.width - 20
    const maxY = container.height - btn.height - 20

    const randomX = Math.random() * maxX - maxX / 2
    const randomY = Math.random() * maxY - maxY / 2

    mouseX.set(randomX)
    mouseY.set(randomY)
  }, [mouseX, mouseY])

  if (answered) {
    return (
      <section className="py-24 px-4">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PartyPopper className="w-20 h-20 text-primary mx-auto mb-6" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-4">
            Yay!!!
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            I knew you would say yes!
          </p>
          <p className="text-lg text-foreground font-medium">
            You just made me the happiest person in the world.
          </p>

          <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`celebration-heart-${i}`}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4">
      <motion.div
        ref={containerRef}
        className="relative max-w-2xl mx-auto text-center overflow-hidden rounded-3xl p-12 md:p-16 border border-border shadow-2xl"
        style={{
          background: "hsla(340, 40%, 97%, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minHeight: 320,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-6" />
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-3">
          Will You Be My Valentine?
        </h2>
        <p className="text-muted-foreground mb-10">
          This is the big question...
        </p>

        <div className="flex items-center justify-center gap-6">
          <motion.button
            onClick={() => setAnswered(true)}
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes!
          </motion.button>

          <motion.button
            ref={noButtonRef}
            onMouseEnter={handleNoMouseEnter}
            onTouchStart={handleNoMouseEnter}
            className="px-10 py-4 rounded-full bg-muted text-muted-foreground font-semibold text-lg cursor-pointer"
            style={{ x: noX, y: noY }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
