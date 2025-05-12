"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FileImage, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function StegoChallengeePage() {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showExtraHint, setShowExtraHint] = useState(false)

  // The correct password hidden in the image
  const correctAnswer = "r3dh3rr1ng"

  useEffect(() => {
    // Show hint after 2 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 120000)

    // Show extra hint after 4 minutes
    const extraTimer = setTimeout(() => {
      setShowExtraHint(true)
    }, 240000)

    return () => {
      clearTimeout(timer)
      clearTimeout(extraTimer)
    }
  }, [])

  const checkAnswer = () => {
    const answer = input.toLowerCase().trim()

    if (answer === correctAnswer) {
      setMessage("Correct! You've extracted the hidden data.")
      setSolved(true)
      localStorage.setItem("stego_challenge_completed", "true")
    } else {
      setMessage("Incorrect. Try again.")
      setAttempts((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <FileImage className="h-6 w-6" />
            <h1 className="text-xl">Steganography Challenge</h1>
          </div>
          <Link href="/" className="text-sm hover:text-green-300 transition-colors">
            [Return to Main]
          </Link>
        </header>

        <main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black border border-green-800 rounded-md p-6 mb-8"
          >
            <h2 className="text-xl mb-4 text-center">Hidden Data Extraction</h2>

            <p className="mb-6">
              You've discovered an image that contains hidden data. Extract the password from this image to proceed.
            </p>

            <div className="relative w-full max-w-md mx-auto h-[300px] mb-6 border border-green-800 rounded-md overflow-hidden">
              <Image
                src="/steganography.png?height=300&width=400"
                alt="Image with hidden data"
                fill
                className="object-contain"
              />

              {/* Hidden text in the image that's only visible when inspecting the element */}
              <div className="absolute opacity-0 pointer-events-none">Password: r3dh3rr1ng</div>

              {/* Hidden clue that appears on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-black/70">
                <p className="text-green-300 font-mono text-sm">Inspect the element carefully...</p>
              </div>
            </div>

            {attempts > 2 && (
              <div className="mb-6 p-3 border border-dashed border-green-800 rounded">
                <p className="text-green-300 text-sm">
                  Hint: Sometimes data is hidden in plain sight, but not visible to the naked eye.
                </p>
              </div>
            )}

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">
                  Hint: Try using your browser's developer tools to inspect the HTML elements of this page.
                </p>
              </motion.div>
            )}

            {showExtraHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">
                  Extra Hint: There's an invisible div element inside the image container with the password.
                </p>
              </motion.div>
            )}

            <div className="flex gap-4 mb-4">
              <Input
                type="text"
                placeholder="Enter the hidden password..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                disabled={solved}
              />
              <Button
                onClick={checkAnswer}
                disabled={solved || !input.trim()}
                className="bg-green-700 hover:bg-green-600"
              >
                Submit
              </Button>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 p-3 rounded text-center ${solved ? "bg-green-900/30 border border-green-800" : "bg-red-900/30 border border-red-800"}`}
              >
                <p>{message}</p>
              </motion.div>
            )}
          </motion.div>

          {solved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-900/20 border border-green-800 rounded-md p-6 mb-8"
            >
              <h3 className="text-lg mb-4 text-center">Data Extraction Successful</h3>

              <p className="mb-4">
                You've successfully extracted the hidden password from the image. This was actually a red herring, but
                it demonstrates your ability to find hidden data in files.
              </p>

              <p className="mb-6">
                The next challenge will test your programming skills. You'll need to debug and fix a broken algorithm.
              </p>

              <div className="flex justify-center">
                <Link href="/code-challenge">
                  <Button className="bg-green-700 hover:bg-green-600">
                    Continue to Code Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

