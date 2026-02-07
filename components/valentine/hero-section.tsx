"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useCallback, useRef } from "react"

interface HeroSectionProps {
  isRevealed: boolean
  onReveal: () => void
}

function createConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: {
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    rotation: number
    rotationSpeed: number
    shape: "circle" | "rect" | "heart"
  }[] = []

  const colors = [
    "hsl(346, 77%, 52%)",
    "hsl(340, 60%, 65%)",
    "hsl(350, 80%, 72%)",
    "hsl(20, 60%, 70%)",
    "hsl(0, 0%, 100%)",
    "hsl(40, 90%, 60%)",
  ]

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: ["circle", "rect", "heart"][Math.floor(Math.random() * 3)] as "circle" | "rect" | "heart",
    })
  }

  let frame = 0
  const maxFrames = 180

  function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath()
    const topCurveHeight = size * 0.3
    ctx.moveTo(x, y + topCurveHeight)
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight)
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size)
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight)
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight)
    ctx.fill()
  }

  function animate() {
    if (frame >= maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.vx
      p.vy += 0.15
      p.y += p.vy
      p.rotation += p.rotationSpeed
      const alpha = 1 - frame / maxFrames

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = alpha
      ctx.fillStyle = p.color

      if (p.shape === "circle") {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      } else {
        drawHeart(ctx, 0, 0, p.size)
      }

      ctx.restore()
    }

    frame++
    requestAnimationFrame(animate)
  }

  animate()
}

export function HeroSection({ isRevealed, onReveal }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleClick = useCallback(() => {
    if (canvasRef.current) {
      createConfetti(canvasRef.current)
    }
    onReveal()
  }, [onReveal])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-50 pointer-events-none"
        aria-hidden="true"
      />
      <AnimatePresence>
        {!isRevealed && (
          <motion.section
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-serif text-primary mb-8 text-center px-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              You Have a Special Message
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Tap the heart to open it
            </motion.p>

            <motion.button
              onClick={handleClick}
              className="relative group cursor-pointer bg-transparent border-none outline-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.8,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open Valentine's message"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  className="w-28 h-28 md:w-36 md:h-36 text-primary fill-primary drop-shadow-lg"
                  strokeWidth={1}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsla(346, 77%, 52%, 0.4)",
                    "0 0 0 30px hsla(346, 77%, 52%, 0)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
              />
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
