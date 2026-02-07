"use client"

import React from "react"

import { motion, useMotionValue, useTransform } from "framer-motion"
const photos = [
  { src: "/img/gallery/1.png", caption: "Our first photo together", span: "row-span-2" },
  { src: "/img/gallery/2.png", caption: "That perfect sunset", span: "" },
  { src: "/img/gallery/3.png", caption: "Adventures with you", span: "" },
  { src: "/img/gallery/5.jpg", caption: "Your beautiful smile", span: "row-span-2" },
  { src: "/img/gallery/6.mov", caption: "Date night magic", span: "", isVideo: true },
  { src: "/img/gallery/4.jpg", caption: "Forever and always", span: "" },
]

function TiltPhoto({ photo, index }: { photo: (typeof photos)[0]; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-2xl h-full min-h-0 ${photo.span}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 border border-border overflow-hidden bg-muted">
        {photo.isVideo ? (
          <video
            src={photo.src}
            className="w-full h-full min-w-0 min-h-0 object-cover object-center"
            loop
            autoPlay
            muted
            playsInline
          />
        ) : (
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full min-w-0 min-h-0 object-cover object-center"
          />
        )}
      </div>

      <motion.div
        className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p className="text-primary-foreground text-sm font-medium p-4">
          {photo.caption}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function PhotoGallery() {
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
          Our Memories
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          A collection of moments that make my heart skip a beat
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-5">
        {photos.map((photo, index) => (
          <TiltPhoto key={photo.caption} photo={photo} index={index} />
        ))}
      </div>
    </section>
  )
}
