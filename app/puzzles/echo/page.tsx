"use client"

import { useState } from "react"
import Link from "next/link"
import { Compass, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function EchoPage() {
  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState<null | boolean>(null)
  const [attempts, setAttempts] = useState(0)
  const correctAnswer = "echo"

  const checkAnswer = () => {
    const isCorrect = answer.toLowerCase().trim() === correctAnswer
    setResult(isCorrect)
    setAttempts(attempts + 1)

    // Save progress if correct
    if (isCorrect) {
      localStorage.setItem("puzzle_echo_solved", "true")
    }
  }

  // Hidden clue that appears after 3 failed attempts
  const showHint = attempts >= 3 && !result

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
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">The Riddle of the Wind</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">Solve the riddle to continue your journey:</p>

              <div className="border border-amber-500/30 p-6 rounded-md bg-slate-900 font-serif mb-8">
                <p className="text-xl text-center italic text-amber-300">
                  "I speak without a mouth and hear without ears.
                  <br />I have no body, but I come alive with wind.
                  <br />
                  What am I?"
                </p>
              </div>

              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="bg-slate-700 border-slate-600"
                />
                <Button onClick={checkAnswer}>Submit</Button>
              </div>

              {result !== null && (
                <div className={`mt-4 p-3 rounded ${result ? "bg-green-900/30" : "bg-red-900/30"}`}>
                  {result ? (
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <p>Correct! You may proceed to the next challenge.</p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <p>Incorrect. Try again.</p>
                    </div>
                  )}
                </div>
              )}

              {showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-3 border border-dashed border-amber-500/50 rounded"
                >
                  <p className="text-amber-300 text-sm">
                    Hint: I repeat what others say, and I can be found in mountains and caves.
                  </p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <p className="mb-4">
                    Well done! You've solved the first puzzle. The path to the ancient observatory is now open.
                  </p>
                  <Link href="/observatory/starmap">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                      Continue to the Observatory <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>

        {/* Hidden clue in the page source */}
        {/* <!-- The key to the cipher is POLARIS --> */}
      </div>
    </div>
  )
}

