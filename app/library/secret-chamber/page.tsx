"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function SecretChamberPage() {
  const [cipherInput, setCipherInput] = useState("")
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // The correct decoded message is "FIND"
  const correctAnswer = "find"

  const checkAnswer = () => {
    const answer = cipherInput.toLowerCase().trim()

    if (answer === correctAnswer) {
      setMessage("Correct! You've deciphered the ancient code.")
      setSolved(true)
      localStorage.setItem("puzzle_cipher_solved", "true")
    } else {
      setMessage("That's not right. Try a different approach.")
    }
  }

  useEffect(() => {
    // Show hint after 60 seconds
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 60000)

    return () => clearTimeout(timer)
  }, [])

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
            <h2 className="text-3xl font-bold mb-6 text-center">The Secret Chamber</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                You've discovered a hidden chamber beneath the ancient library. On the wall, you find a mysterious
                cipher.
              </p>

              <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=800"
                  alt="Ancient wall with cipher markings"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 p-6 rounded-lg">
                    <p className="font-mono text-2xl text-amber-300 tracking-widest">16 - 9 - 14 - 4</p>
                    <p className="text-center mt-2 text-sm text-slate-300">Decipher using the North Star</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "The North Star guides travelers through the night. It may also guide you through this puzzle."
                </p>
                <p className="mt-2 text-slate-300 text-sm">Remember: POLARIS is the key.</p>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-3 border border-dashed border-amber-500/50 rounded"
                >
                  <p className="text-amber-300 text-sm">
                    Hint: The numbers might represent positions in the alphabet when using POLARIS as a cipher key.
                  </p>
                </motion.div>
              )}

              <div className="flex gap-4 mb-4">
                <Input
                  type="text"
                  placeholder="Enter the decoded message..."
                  value={cipherInput}
                  onChange={(e) => setCipherInput(e.target.value)}
                  className="bg-slate-700 border-slate-600"
                  maxLength={10}
                />
                <Button onClick={checkAnswer} disabled={solved}>
                  Submit
                </Button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 p-3 rounded text-center ${solved ? "bg-green-900/30" : "bg-red-900/30"}`}
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
                  <p className="mb-4">
                    The ancient message is clear: "FIND". But find what? The next clue awaits in the map room.
                  </p>
                  <Link href="/map-room/hidden-island">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">Continue to the Map Room</Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>

        {/* Hidden clue in the page source */}
        {/* <!-- The key to the maze is "LIGHTHOUSE" --> */}
      </div>
    </div>
  )
}

