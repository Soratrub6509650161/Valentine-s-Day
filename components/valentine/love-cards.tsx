"use client"

import { motion } from "framer-motion"
import { Heart, Smile, Star, Sparkles } from "lucide-react"
import { useState } from "react"

const cards = [
  {
    front: "Your Smile",
    back: "The way you smile lights up every room and makes my heart race every single time.",
    icon: Smile,
    color: "hsl(346, 77%, 52%)",
  },
  {
    front: "Your Kindness",
    back: "You have the most beautiful soul. The way you care for others makes me fall deeper in love.",
    icon: Heart,
    color: "hsl(340, 60%, 55%)",
  },
  {
    front: "Your Laugh",
    back: "Your laugh is my favorite sound in the universe. I would do anything to hear it every day.",
    icon: Star,
    color: "hsl(350, 70%, 50%)",
  },
  {
    front: "Everything",
    back: "I love the way you scrunch your nose, how you steal my hoodies, and how you make everything better.",
    icon: Sparkles,
    color: "hsl(0, 65%, 55%)",
  },
]

function FlipCard({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = card.icon

  return (
    <motion.div
      className="relative w-full h-64 cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onTap={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 border border-border shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            background: "hsla(340, 40%, 97%, 0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.3,
            }}
          >
            <Icon className="w-12 h-12" style={{ color: card.color }} />
          </motion.div>
          <h3 className="text-2xl font-serif text-foreground">{card.front}</h3>
          <p className="text-xs text-muted-foreground">Hover or tap to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-border shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: card.color,
          }}
        >
          <Heart className="w-8 h-8 text-primary-foreground/80 mb-3" />
          <p className="text-primary-foreground text-base leading-relaxed font-medium">
            {card.back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LoveCards() {
  return (
    <section className="py-20 px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
          Why I Love You
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Let me count the ways... actually, there are too many
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <FlipCard key={card.front} card={card} index={index} />
        ))}
      </div>
    </section>
  )
}
