import React from "react"
import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Quicksand } from 'next/font/google'

import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-serif',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Happy Valentine\'s Day',
  description: 'A love letter just for you',
}

export const viewport: Viewport = {
  themeColor: '#e8467c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${dancingScript.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
