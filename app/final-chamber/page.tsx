"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Compass, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function FinalChamberPage() {
  const [code, setCode] = useState<number[]>([0, 0, 0, 0])
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // The correct code
  const correctCode = [1, 6, 3, 7]

  useEffect(() => {
    // Show hint after 2 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 120000)

    return () => clearTimeout(timer)
  }, [])

  const incrementDigit = (index: number) => {
    if (solved) return

    setCode((prev) => {
      const newCode = [...prev]
      newCode[index] = (newCode[index] + 1) % 10
      return newCode
    })
  }

  const decrementDigit = (index: number) => {
    if (solved) return

    setCode((prev) => {
      const newCode = [...prev]
      newCode[index] = (newCode[index] - 1 + 10) % 10
      return newCode
    })
  }

  const checkCode = () => {
    const isCorrect = code.every((digit, index) => digit === correctCode[index])

    if (isCorrect) {
      setMessage("The ancient lock clicks open! You've solved the final puzzle!")
      setSolved(true)
      localStorage.setItem("treasure_hunt_completed", "true")
    } else {
      setMessage("That's not the right combination. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-amber-500" />
            <h1 className="text-2xl font-bold">The Lost Artifacts</h1>
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-amber-400 transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
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
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">The Final Chamber</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                You've reached the final chamber. A massive stone door stands before you, with an ancient combination
                lock.
              </p>

              <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=800"
                  alt="Ancient stone door with combination lock"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 p-6 rounded-lg">
                    <Lock className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-center text-slate-300">
                      Enter the correct combination to unlock the final treasure
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "The final key is hidden in plain sight, scattered throughout your journey."
                </p>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-3 border border-dashed border-amber-500/50 rounded"
                >
                  <p className="text-amber-300 text-sm">
                    Hint: Look back at the source code of the pages you've visited. The combination has been with you
                    all along.
                  </p>
                </motion.div>
              )}

              <div className="flex justify-center gap-4 mb-8">
                {code.map((digit, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Button variant="ghost" className="px-2 py-1" onClick={() => incrementDigit(index)}>
                      ▲
                    </Button>
                    <div className="w-12 h-16 flex items-center justify-center bg-slate-700 rounded-md text-2xl font-mono">
                      {digit}
                    </div>
                    <Button variant="ghost" className="px-2 py-1" onClick={() => decrementDigit(index)}>
                      ▼
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-6">
                <Button onClick={checkCode} disabled={solved} className="px-8">
                  Unlock
                </Button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 p-3 rounded text-center ${solved ? "bg-green-900/30" : "bg-amber-900/30"}`}
                >
                  <p>{message}</p>
                </motion.div>
              )}

              {solved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-500/30 text-center">
                    <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
                    <p className="mb-4">
                      You've completed the treasure hunt and unlocked the final chamber! The special key awaits you.
                    </p>
                    <p className="text-amber-300 font-bold text-xl mb-6">The treasure is yours!</p>
                    <Link href="/congratulations">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 text-lg">
                        Claim Your Reward
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

