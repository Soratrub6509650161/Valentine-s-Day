"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FloatingHearts } from "@/components/valentine/floating-hearts"
import { HeroSection } from "@/components/valentine/hero-section"
import { MusicPlayer } from "@/components/valentine/music-player"
import { Timeline } from "@/components/valentine/timeline"
import { PhotoGallery } from "@/components/valentine/photo-gallery"
import { LoveCards } from "@/components/valentine/love-cards"
import { ValentineQuestion } from "@/components/valentine/valentine-question"
import { Heart } from "lucide-react"

export default function Page() {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts />
      <HeroSection isRevealed={isRevealed} onReveal={() => setIsRevealed(true)} />

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MusicPlayer />

          {/* Love Letter Intro */}
          <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mb-8"
              >
                <Heart className="w-16 h-16 text-primary fill-primary mx-auto" />
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6 text-balance">
                Happy Valentine{"'"}s Day, My Love
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                Every love story is beautiful, but ours is my favorite.
              </p>
              <p className="text-base text-muted-foreground/80">
                Scroll down to see what I have prepared for you...
              </p>

              <motion.div
                className="mt-12"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(346, 77%, 52%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </section>

          {/* Divider */}
          <div className="flex justify-center gap-2 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={`divider-1-${i}`}
                className="w-4 h-4 text-primary/30 fill-primary/30"
              />
            ))}
          </div>

          <Timeline />

          <div className="flex justify-center gap-2 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={`divider-2-${i}`}
                className="w-4 h-4 text-primary/30 fill-primary/30"
              />
            ))}
          </div>

          <PhotoGallery />

          <div className="flex justify-center gap-2 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={`divider-3-${i}`}
                className="w-4 h-4 text-primary/30 fill-primary/30"
              />
            ))}
          </div>

          <LoveCards />

          <div className="flex justify-center gap-2 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={`divider-4-${i}`}
                className="w-4 h-4 text-primary/30 fill-primary/30"
              />
            ))}
          </div>

          <ValentineQuestion />

          {/* Footer */}
          <footer className="relative z-10 text-center py-12 px-4">
            <p className="text-sm text-muted-foreground">
              Made with{" "}
              <Heart className="inline w-4 h-4 text-primary fill-primary -mt-0.5" />{" "}
              just for you
            </p>
          </footer>
        </motion.div>
      )}
    </main>
  )
}
