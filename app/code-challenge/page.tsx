"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CodeIcon, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CodeChallengePage() {
  const [code, setCode] = useState(`function decryptMessage(encryptedMsg) {
  // This function should decrypt the message using a Caesar cipher
  // with a shift of 13 (ROT13)
  let decrypted = "";
  
  for (let i = 0; i < encryptedMsg.length; i++) {
    let char = encryptedMsg[i];
    
    // Only process alphabetic characters
    if (char.match(/[a-z]/i)) {
      // Get ASCII code
      let code = encryptedMsg.charCodeAt(i);
      
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        // This line has a bug - it doesn't wrap around correctly
        char = String.fromCharCode(code - 13);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        // This line has a bug - it doesn't wrap around correctly
        char = String.fromCharCode(code - 13);
      }
    }
    
    decrypted += char;
  }
  
  return decrypted;
}

// Test the function with this encrypted message
const encryptedMessage = "Gur svany cnffjbeq vf: pbqroernxre";
const decrypted = decryptMessage(encryptedMessage);
console.log(decrypted);`)

  const [output, setOutput] = useState("")
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showExtraHint, setShowExtraHint] = useState(false)

  // The correct output after fixing the code
  const correctOutput = "The final password is: codebreaker"

  useEffect(() => {
    // Show hint after 3 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 180000)

    // Show extra hint after 5 minutes
    const extraTimer = setTimeout(() => {
      setShowExtraHint(true)
    }, 300000)

    return () => {
      clearTimeout(timer)
      clearTimeout(extraTimer)
    }
  }, [])

  const runCode = () => {
    try {
      // Create a function from the code string
      const codeToRun = `
        ${code}
        return decrypted;
      `

      // Execute the code in a new Function context
      const result = new Function(codeToRun)()

      setOutput(result)

      // Check if the output is correct
      if (result === correctOutput) {
        setSolved(true)
        localStorage.setItem("code_challenge_completed", "true")
      }
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`)
      } else {
        setOutput("An unknown error occurred")
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <CodeIcon className="h-6 w-6" />
            <h1 className="text-xl">Code Debugging Challenge</h1>
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
            <h2 className="text-xl mb-4 text-center">Fix the Decryption Algorithm</h2>

            <p className="mb-6">
              You've found a JavaScript function that decrypts an important message, but it has bugs. Fix the code to
              properly decrypt the message using a Caesar cipher (ROT13).
            </p>

            <div className="mb-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 bg-slate-900 text-green-300 p-4 font-mono text-sm border border-green-800 rounded-md focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="flex justify-end mb-6">
              <Button onClick={runCode} className="bg-green-700 hover:bg-green-600 flex items-center">
                <Play className="h-4 w-4 mr-2" /> Run Code
              </Button>
            </div>

            <div className="p-4 bg-slate-900 border border-green-800 rounded-md mb-4">
              <p className="text-sm text-green-300 mb-2">Output:</p>
              <pre className="text-white whitespace-pre-wrap break-all">
                {output || "No output yet. Run the code to see results."}
              </pre>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-3 border border-dashed border-green-800 rounded"
              >
                <p className="text-green-300 text-sm">
                  Hint: The ROT13 cipher shifts letters by 13 places. The current code doesn't handle the alphabet
                  wrapping correctly. For example, 'Z' - 13 should wrap around to 'M'.
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
                  Extra Hint: For uppercase letters, use:{" "}
                  <code>char = String.fromCharCode(((code - 65 + 13) % 26) + 65);</code>
                  <br />
                  For lowercase letters, use: <code>char = String.fromCharCode(((code - 97 + 13) % 26) + 97);</code>
                </p>
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
              <h3 className="text-lg mb-4 text-center">Code Fixed Successfully</h3>

              <p className="mb-4">
                You've successfully fixed the decryption algorithm and revealed the message: "{correctOutput}"
              </p>

              <p className="mb-6">
                The final password is "codebreaker". This will unlock the final challenge where you'll need to combine
                all your skills to recover the encryption key.
              </p>

              <div className="flex justify-center">
                <Link href="/final-challenge">
                  <Button className="bg-green-700 hover:bg-green-600">
                    Continue to Final Challenge <ArrowRight className="ml-2 h-4 w-4" />
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

