"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Database, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function SQLChallengePage() {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")
  const [queryResult, setQueryResult] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // The login query template
  const queryTemplate = "SELECT * FROM users WHERE username = '[INPUT]' AND password = 'password123'"

  // The correct SQL injection
  const correctSolutions = [
    "admin' --",
    "admin'--",
    "admin';--",
    "admin' or '1'='1' --",
    "admin' or '1'='1'--",
    "admin' or 1=1--",
    "admin' or 1=1 --",
    "' or '1'='1' --",
    "' or '1'='1'--",
    "' or 1=1--",
    "' or 1=1 --",
    "admin') --",
    "admin')--",
    "admin');--",
    "admin') or ('1'='1' --",
    "admin') or ('1'='1'--",
    "admin') or (1=1--",
    "admin') or (1=1 --",
  ]

  useEffect(() => {
    // Show hint after 3 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 180000)

    return () => clearTimeout(timer)
  }, [])

  const executeQuery = () => {
    if (!input.trim()) return

    const query = queryTemplate.replace("[INPUT]", input)
    setQueryResult(query)

    // Check if the input is a valid SQL injection
    const isCorrect = correctSolutions.some((solution) => input.toLowerCase().trim() === solution.toLowerCase())

    if (isCorrect) {
      setMessage("SQL Injection successful! You've bypassed the authentication.")
      setSolved(true)
      localStorage.setItem("sql_challenge_completed", "true")
    } else {
      setMessage("Login failed. Try a different approach.")
      setAttempts((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            <h1 className="text-xl">Database Security Challenge</h1>
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
            <h2 className="text-xl mb-4 text-center">SQL Injection Challenge</h2>

            <p className="mb-6">
              You've discovered a vulnerable login form. The system uses the following SQL query to authenticate users:
            </p>

            <div className="p-4 bg-green-900/10 border border-green-800 rounded-md mb-6 overflow-x-auto">
              <code className="text-green-300">{queryTemplate}</code>
            </div>

            <p className="mb-6">
              Your task is to craft an SQL injection that will bypass the authentication and gain access as the admin
              user.
            </p>

            <div className="flex gap-4 mb-4">
              <Input
                type="text"
                placeholder="Enter username..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                disabled={solved}
              />
              <Button
                onClick={executeQuery}
                disabled={solved || !input.trim()}
                className="bg-green-700 hover:bg-green-600"
              >
                Login
              </Button>
            </div>

            {queryResult && (
              <div className="p-3 bg-black border border-green-800 rounded-md mb-4 overflow-x-auto">
                <p className="text-sm text-green-300">Executed query:</p>
                <code className="text-white">{queryResult}</code>
              </div>
            )}

            {attempts > 2 && !solved && (
              <div className="mb-6 p-3 border border-dashed border-green-800 rounded">
                <p className="text-green-300 text-sm">
                  Hint: SQL comments can be used to ignore the rest of a query. In SQL, comments start with "--".
                </p>
              </div>
            )}

            {showHint && !solved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">
                  Hint: Try entering "admin' --" (without quotes). This will make the query ignore the password check.
                </p>
              </motion.div>
            )}

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
              <h3 className="text-lg mb-4 text-center">Authentication Bypassed</h3>

              <p className="mb-4">
                You've successfully exploited the SQL injection vulnerability and gained admin access to the database.
                In the admin panel, you've discovered a reference to a hidden file with steganography.
              </p>

              <p className="mb-6">
                The next challenge involves extracting hidden data from an image. Proceed to the steganography
                challenge.
              </p>

              <div className="flex justify-center">
                <Link href="/stego-challenge">
                  <Button className="bg-green-700 hover:bg-green-600">
                    Continue to Steganography Challenge <ArrowRight className="ml-2 h-4 w-4" />
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

