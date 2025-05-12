"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Compass, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function StarMapPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)

  // Constellation pattern that needs to be connected (Orion's Belt)
  const correctPattern = [3, 7, 11]

  // Star positions
  const stars = [
    { x: 100, y: 150 },
    { x: 200, y: 100 },
    { x: 300, y: 200 },
    { x: 150, y: 250 }, // Part of Orion's Belt
    { x: 400, y: 150 },
    { x: 250, y: 300 },
    { x: 350, y: 350 },
    { x: 250, y: 250 }, // Part of Orion's Belt
    { x: 450, y: 300 },
    { x: 500, y: 200 },
    { x: 150, y: 400 },
    { x: 350, y: 250 }, // Part of Orion's Belt
    { x: 450, y: 400 },
    { x: 550, y: 350 },
    { x: 600, y: 250 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw stars
    stars.forEach((star, index) => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, index === 3 || index === 7 || index === 11 ? 8 : 5, 0, Math.PI * 2)
      ctx.fillStyle = selectedStars.includes(index) ? "#F59E0B" : "#FFFFFF"
      ctx.fill()
    })

    // Draw lines between selected stars
    if (selectedStars.length > 1) {
      ctx.beginPath()
      ctx.moveTo(stars[selectedStars[0]].x, stars[selectedStars[0]].y)

      for (let i = 1; i < selectedStars.length; i++) {
        ctx.lineTo(stars[selectedStars[i]].x, stars[selectedStars[i]].y)
      }

      ctx.strokeStyle = "#F59E0B"
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [selectedStars])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (solved) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if a star was clicked
    stars.forEach((star, index) => {
      const distance = Math.sqrt(Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2))

      if (distance < 15) {
        if (selectedStars.includes(index)) {
          // Deselect star
          setSelectedStars(selectedStars.filter((starIndex) => starIndex !== index))
        } else {
          // Select star
          setSelectedStars([...selectedStars, index])
        }
      }
    })
  }

  const checkPattern = () => {
    // Check if the selected stars match the correct pattern
    if (selectedStars.length !== correctPattern.length) {
      setMessage("That's not the right constellation. Try again.")
      return
    }

    const isCorrect =
      correctPattern.every((star) => selectedStars.includes(star)) &&
      selectedStars.every((star) => correctPattern.includes(star))

    if (isCorrect) {
      setMessage("You've found Orion's Belt! The ancient door is opening...")
      setSolved(true)
      localStorage.setItem("puzzle_starmap_solved", "true")
    } else {
      setMessage("That's not the right constellation. Try again.")
    }
  }

  const resetSelection = () => {
    setSelectedStars([])
    setMessage("")
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
            <h2 className="text-3xl font-bold mb-6 text-center">The Ancient Observatory</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                The ancient astronomers left a message in the stars. Connect the right constellation to reveal the path
                forward.
              </p>

              <div className="mb-6 p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "Find the hunter's belt, three stars in a row, to guide your way through the darkness."
                </p>
              </div>

              <div className="relative bg-black rounded-lg overflow-hidden mb-6">
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={500}
                  onClick={handleCanvasClick}
                  className="w-full h-auto cursor-pointer"
                />

                {/* Subtle hint */}
                <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                  <Star className="h-3 w-3 inline mr-1" />
                  Orion watches over the night sky
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={checkPattern} disabled={selectedStars.length === 0 || solved}>
                  Confirm Pattern
                </Button>
                <Button variant="outline" onClick={resetSelection} disabled={selectedStars.length === 0 || solved}>
                  Reset
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
                    The stars have revealed the next location. A hidden chamber beneath the ancient library awaits.
                  </p>
                  <Link href="/library/secret-chamber">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                      Continue to the Secret Chamber
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>

        {/* Hidden clue in the page source */}
        {/* <!-- The cipher key is POLARIS, the sequence is 16-9-14-4 --> */}
      </div>
    </div>
  )
}

