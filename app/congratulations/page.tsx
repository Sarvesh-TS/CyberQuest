"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trophy, Home, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function CongratulationsPage() {
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    // Trigger confetti
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    // Show the key after a delay
    const keyTimer = setTimeout(() => {
      setShowKey(true)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(keyTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-mono">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-emerald-500" />
            <h1 className="text-2xl font-bold">CyberQuest</h1>
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-emerald-400 transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            >
              <Trophy className="h-24 w-24 text-emerald-500 mx-auto mb-6" />
            </motion.div>

            <h2 className="text-5xl font-bold mb-6">Mission Accomplished!</h2>

            <p className="text-xl mb-8 text-slate-300">
              You've successfully completed all challenges and recovered the encryption key!
            </p>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              {showKey ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <div className="relative w-full h-[200px] mb-6">
                    <Image
                      src="/congrats.jpg?height=200&width=400"
                      alt="The special encryption key"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">The Encryption Key</h3>
                  <p className="mb-6">
                    This key represents your mastery of cybersecurity, programming, and problem-solving skills. The
                    administrator will provide you with the actual key.
                  </p>
                </motion.div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-emerald-400">Decrypting key...</div>
                </div>
              )}
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <h3 className="text-2xl font-bold mb-4">Mission Statistics</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-4xl font-bold text-emerald-400">6</p>
                  <p className="text-sm text-slate-300">Challenges Completed</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-4xl font-bold text-emerald-400">12</p>
                  <p className="text-sm text-slate-300">Security Vulnerabilities Found</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-4xl font-bold text-emerald-400">1</p>
                  <p className="text-sm text-slate-300">Encryption Key Recovered</p>
                </div>
              </div>

              <p className="text-slate-300">
                You've proven yourself to be an expert in cybersecurity and technical problem-solving!
              </p>
            </div>

            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                <Home className="mr-2 h-5 w-5" /> Return to Main
              </Button>
            </Link>
          </motion.div>
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CyberQuest Security Challenge</p>
          <p className="mt-2">Thank you for participating!</p>
        </footer>
      </div>
    </div>
  )
}

