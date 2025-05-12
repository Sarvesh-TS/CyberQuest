"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function CryptoChallengeePage() {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // The encrypted message (hex encoded)
  const encryptedHex =
    "53 65 63 72 65 74 20 6d 65 73 73 61 67 65 3a 20 54 68 65 20 70 61 73 73 77 6f 72 64 20 69 73 20 27 63 79 62 65 72 6e 65 74 69 63 73 27"

  // The correct answer
  const correctAnswer = "cybernetics"

  useEffect(() => {
    // Show hint after 3 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 180000)

    return () => clearTimeout(timer)
  }, [])

  const checkAnswer = () => {
    const answer = input.toLowerCase().trim()

    if (answer === correctAnswer) {
      setMessage("Correct! You've decrypted the message.")
      setSolved(true)
      localStorage.setItem("crypto_challenge_completed", "true")
    } else {
      setMessage("Incorrect. Try again.")
      setAttempts((prev) => prev + 1)
    }
  }

  const hexToAscii = (hex: string) => {
    let ascii = ""
    hex.split(" ").forEach((h) => {
      ascii += String.fromCharCode(Number.parseInt(h, 16))
    })
    return ascii
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6" />
            <h1 className="text-xl">Cryptography Challenge</h1>
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
            <h2 className="text-xl mb-4 text-center">Hex Decoding Challenge</h2>

            <p className="mb-6">
              You've intercepted an encrypted message in hexadecimal format. Decode it to find the password.
            </p>

            <div className="p-4 bg-green-900/10 border border-green-800 rounded-md mb-6 overflow-x-auto">
              <code className="text-green-300 whitespace-pre-wrap break-all">{encryptedHex}</code>
            </div>

            {attempts > 1 && (
              <div className="mb-6 p-3 border border-dashed border-green-800 rounded">
                <p className="text-green-300 text-sm">
                  Hint: First convert the hex values to ASCII characters to read the message.
                </p>
              </div>
            )}

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">Decoded message: "{hexToAscii(encryptedHex)}"</p>
              </motion.div>
            )}

            <div className="flex gap-4 mb-4">
              <Input
                type="text"
                placeholder="Enter the password..."
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
              <h3 className="text-lg mb-4 text-center">Decryption Successful</h3>

              <p className="mb-4">
                You've successfully decrypted the message and found the password. This has given you access to the next
                security layer.
              </p>

              <p className="mb-6">
                The next challenge will test your SQL injection knowledge. Proceed to the database security challenge.
              </p>

              <div className="flex justify-center">
                <Link href="/sql-challenge">
                  <Button className="bg-green-700 hover:bg-green-600">
                    Continue to SQL Challenge <ArrowRight className="ml-2 h-4 w-4" />
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

