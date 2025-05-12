"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Terminal, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BinaryChallengePage() {
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""])
  const [feedback, setFeedback] = useState<(boolean | null)[]>([null, null, null, null])
  const [allCorrect, setAllCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Binary conversion challenges
  const challenges = [
    { binary: "01001000", decimal: "72" }, // ASCII 'H'
    { binary: "01100101", decimal: "101" }, // ASCII 'e'
    { binary: "01111000", decimal: "120" }, // ASCII 'x'
    { binary: "00101010", decimal: "42" }, // ASCII '*'
  ]

  useEffect(() => {
    // Show hint after 2 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 120000)

    return () => clearTimeout(timer)
  }, [])

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const checkAnswers = () => {
    const newFeedback = answers.map((answer, index) => answer.trim() === challenges[index].decimal)

    setFeedback(newFeedback)

    const correct = newFeedback.every((result) => result === true)
    if (correct) {
      setAllCorrect(true)
      localStorage.setItem("binary_challenge_completed", "true")
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            <h1 className="text-xl">Binary Authentication System</h1>
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
            <h2 className="text-xl mb-4 text-center">Binary Conversion Challenge</h2>

            <p className="mb-6">
              To proceed, you must demonstrate your understanding of binary. Convert the following binary numbers to
              decimal:
            </p>

            <div className="space-y-6 mb-8">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-full sm:w-1/2 p-3 bg-green-900/20 rounded font-bold text-center">
                    {challenge.binary}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="w-full bg-black border border-green-800 rounded p-2 text-white focus:border-green-600 focus:outline-none"
                      placeholder="Decimal value"
                      disabled={allCorrect}
                    />
                    {feedback[index] !== null &&
                      (feedback[index] ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {showHint && !allCorrect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">
                  Hint: Each binary digit (bit) represents a power of 2, starting from the right with 2^0 (1). For
                  example, 01000001 = 0×2^7 + 1×2^6 + 0×2^5 + 0×2^4 + 0×2^3 + 0×2^2 + 0×2^1 + 1×2^0 = 64 + 1 = 65
                </p>
              </motion.div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={checkAnswers}
                disabled={allCorrect || answers.some((answer) => !answer.trim())}
                className="bg-green-700 hover:bg-green-600"
              >
                Verify
              </Button>
            </div>
          </motion.div>

          {allCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-900/20 border border-green-800 rounded-md p-6 mb-8"
            >
              <h3 className="text-lg mb-4 text-center">Authentication Successful</h3>

              <p className="mb-4">
                Binary authentication complete. The ASCII values of the binary numbers spell out a message: "Hex*"
              </p>

              <p className="mb-6">
                This suggests that the next challenge involves hexadecimal encoding. Proceed to the cryptography
                challenge.
              </p>

              <div className="flex justify-center">
                <Link href="/crypto-challenge">
                  <Button className="bg-green-700 hover:bg-green-600">
                    Continue to Cryptography Challenge <ArrowRight className="ml-2 h-4 w-4" />
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

