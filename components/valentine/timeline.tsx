"use client"

import { motion, useInView } from "framer-motion"
import { Calendar, Heart, MapPin, Sparkles, Star } from "lucide-react"
import { useRef } from "react"

const milestones = [
  {
    date: "January 15, 2022",
    title: "The Day We Met",
    description: "Our story didn't start with eye contact, it started with a song shared in the DMs.",
    icon: Sparkles,
    image: "/img/First.png",
  },
  {
    date: "March 14, 2022", 
    title: "Officially Us",
    description: "The day we made it official. No more guessing, just two hearts deciding to beat as one.",
    icon: Heart,
    image: "/img/decision.png",
  },
  {
    date: "March 30, 2022",
    title: "First Time We Met",
    description: "The moment virtual hugs turned into real ones. Seeing you in person for the first time was better than I ever imagined.",
    icon: MapPin,
    image: "/img/firstmeet.png",
  },
  {
    date: "June 19, 2022",
    title: "First Trip: Koh Larn",
    description: "Our first island getaway. The sea, the sand, and the sunset were beautiful, but being there with you made it perfect.",
    icon: MapPin,
    image: "/img/kohlarn.png",
  },
  {
    date: "Today",
    title: "Still Falling For You",
    description: "Every day with you feels like the first day. My love for you only grows stronger.",
    icon: Calendar,
    image: "/img/still.jpg",
  },
]

function TimelineItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isLeft = index % 2 === 0
  const Icon = milestone.icon

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <div
        className={`w-full flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
      >
        <motion.div
          className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="rounded-2xl p-5 shadow-lg border border-border overflow-hidden"
            style={{
              background: "hsla(340, 40%, 97%, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className={`flex flex-col sm:flex-row gap-4 ${isLeft ? "sm:flex-row-reverse" : ""}`}>
              {/* Image */}
              <motion.div
                className="shrink-0 sm:w-[140px] md:w-[160px]"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              >
                <img
                  src={milestone.image || "/placeholder.svg"}
                  alt={milestone.title}
                  className="w-full h-32 sm:h-full object-cover rounded-xl shadow-md"
                />
              </motion.div>

              {/* Text */}
              <div className={`flex-1 ${isLeft ? "sm:text-right" : "sm:text-left"} text-left`}>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {milestone.date}
                </span>
                <h3 className="text-xl font-serif text-foreground mt-1 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg my-4 md:my-0 shrink-0"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        >
          <Icon className="w-5 h-5 text-primary-foreground" />
        </motion.div>

        <div className="hidden md:block w-5/12" />
      </div>
    </div>
  )
}

export function Timeline() {
  return (
    <section className="py-20 px-4 relative">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
          Our Journey
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Every moment with you is a treasure I hold close to my heart
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block -translate-x-1/2" />

        <div className="flex flex-col gap-12">
          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.title} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
