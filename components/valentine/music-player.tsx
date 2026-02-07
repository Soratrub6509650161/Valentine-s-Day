"use client"

import { motion } from "framer-motion"
import { Music, Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// ใส่ไฟล์เพลงในโฟลเดอร์ public แล้วตั้งชื่อเป็น music.mp3
const MUSIC_SRC = "/music.mp3"
// ระดับเสียงเริ่มต้น 0 = เงียบ, 1 = เต็ม (เช่น 0.4 = 40%)
const DEFAULT_VOLUME = 0.3

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // ตั้งเสียงเริ่มต้น + เล่นอัตโนมัติเมื่อเข้าเว็บ
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = DEFAULT_VOLUME
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
      >
        <motion.div
          className="relative flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl border border-border"
          style={{
            background: "hsla(340, 40%, 95%, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="relative w-12 h-12 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={
              isPlaying
                ? { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                : {}
            }
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/20" />
            <div className="absolute w-3 h-3 rounded-full bg-primary-foreground/30" />
            <Music className="relative z-10 w-5 h-5 text-primary-foreground" />
          </motion.div>

          <div className="hidden sm:flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">
              Our Love Song
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {isPlaying ? "Playing" : "Paused"}
            </span>
          </div>

          <button
            onClick={toggle}
            className="ml-1 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shrink-0"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </motion.div>
      </motion.div>
    </>
  )
}
