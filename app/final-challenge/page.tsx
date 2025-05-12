"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Key, ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function FinalChallengePage() {
  const [inputs, setInputs] = useState<string[]>(["", "", "", "", ""])
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // The correct answers from previous challenges
  const correctAnswers = [
    "guest", // Terminal challenge username
    "72", // Binary challenge (first decimal)
    "cybernetics", // Crypto challenge password
    "admin' --", // SQL injection
    "codebreaker", // Code challenge password
  ]

  useEffect(() => {
    // Show hint after 3 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 180000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  const checkAnswers = () => {
    // Check if all inputs match the correct answers
    const allCorrect = inputs.every((input, index) => {
      // For the SQL injection, accept multiple valid solutions
      if (index === 3) {
        return ["admin' --", "admin'--", "admin';--", "admin' or '1'='1' --", "' or '1'='1' --"].includes(input.trim())
      }

      return input.trim().toLowerCase() === correctAnswers[index].toLowerCase()
    })

    if (allCorrect) {
      setMessage("Congratulations! You've recovered all the pieces of the encryption key.")
      setSolved(true)
      localStorage.setItem("final_challenge_completed", "true")
    } else {
      setMessage("Some answers are incorrect. Try again.")
      setAttempts((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <Key className="h-6 w-6" />
            <h1 className="text-xl">Final Challenge: Key Recovery</h1>
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
            <h2 className="text-xl mb-4 text-center">Encryption Key Recovery</h2>

            <p className="mb-6">
              You've reached the final challenge. To recover the encryption key, you need to recall critical information
              from each of the previous challenges. Fill in the answers below:
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm">1. What was the username for the initial terminal access?</label>
                <Input
                  value={inputs[0]}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                  disabled={solved}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">
                  2. What was the decimal value of the first binary number (01001000) in the binary challenge?
                </label>
                <Input
                  value={inputs[1]}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                  disabled={solved}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">
                  3. What was the password hidden in the hex-encoded message?
                </label>
                <Input
                  value={inputs[2]}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                  disabled={solved}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">4. What SQL injection did you use to bypass the login?</label>
                <Input
                  value={inputs[3]}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                  disabled={solved}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">
                  5. What was the final password revealed by the fixed decryption algorithm?
                </label>
                <Input
                  value={inputs[4]}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                  disabled={solved}
                />
              </div>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">
                  Hint: If you've forgotten some answers, you can revisit the previous challenges to find them. All the
                  information you need was revealed during your journey.
                </p>
              </motion.div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={checkAnswers}
                disabled={solved || inputs.some((input) => !input.trim())}
                className="bg-green-700 hover:bg-green-600"
              >
                Recover Key
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
              <h3 className="text-lg mb-4 text-center">Mission Accomplished</h3>

              <div className="p-6 bg-black border-2 border-emerald-500 rounded-md mb-6 text-center">
                <Lock className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <p className="text-xl font-bold text-emerald-400 mb-2">ENCRYPTION KEY RECOVERED</p>
                
              </div>

              <p className="mb-6 text-center">
                Congratulations, agent! You've successfully completed all challenges and recovered the encryption key.
                Your skills in cybersecurity, programming, and problem-solving have proven invaluable to our mission.
              </p>

              <div className="flex justify-center">
                <Link href="/congratulations">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    View Mission Summary <ArrowRight className="ml-2 h-4 w-4" />
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

