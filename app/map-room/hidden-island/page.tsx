"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Compass, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HiddenIslandPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const dragPosRef = useRef({ x: 0, y: 0 })

  // Hidden island coordinates (relative to the map)
  const hiddenIslandCoords = { x: 320, y: 240 }
  const islandRadius = 20

  useEffect(() => {
    // Show hint after 90 seconds
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 90000)

    return () => clearTimeout(timer)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startPosRef.current = { x: e.clientX, y: e.clientY }
    dragPosRef.current = { ...position }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - startPosRef.current.x
    const dy = e.clientY - startPosRef.current.y

    setPosition({
      x: dragPosRef.current.x + dx,
      y: dragPosRef.current.y + dy,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleMapClick = (e: React.MouseEvent) => {
    if (!mapRef.current) return

    const rect = mapRef.current.getBoundingClientRect()
    const clickX = (e.clientX - rect.left) / scale - position.x / scale
    const clickY = (e.clientY - rect.top) / scale - position.y / scale

    const distance = Math.sqrt(Math.pow(clickX - hiddenIslandCoords.x, 2) + Math.pow(clickY - hiddenIslandCoords.y, 2))

    if (distance < islandRadius) {
      setMessage("You've discovered the hidden island!")
      setSolved(true)
      localStorage.setItem("puzzle_map_solved", "true")
    } else if (distance < islandRadius * 3) {
      setMessage("You're getting warmer...")
    } else {
      setMessage("Nothing but open water here...")
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
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">The Ancient Map Room</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                The decoded message was "FIND". You must find the hidden island on this ancient map that isn't marked on
                any charts.
              </p>

              <div className="mb-6 p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "The island lies where no sailor dares to venture, hidden from all but the most observant eyes."
                </p>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-3 border border-dashed border-amber-500/50 rounded"
                >
                  <p className="text-amber-300 text-sm">
                    Hint: The island may be hidden in plain sight. Look for subtle differences in the map's texture.
                  </p>
                </motion.div>
              )}

              <div className="flex justify-center gap-4 mb-4">
                <Button onClick={handleZoomIn}>Zoom In</Button>
                <Button onClick={handleZoomOut}>Zoom Out</Button>
              </div>

              <div
                className="relative w-full h-[500px] bg-blue-900/30 rounded-lg overflow-hidden cursor-move mb-6"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleMapClick}
                ref={mapRef}
              >
                <div
                  className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-repeat"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: "0 0",
                    width: "1000px",
                    height: "1000px",
                  }}
                >
                  {/* Hidden island - only visible on close inspection */}
                  <div
                    className="absolute rounded-full bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors"
                    style={{
                      left: `${hiddenIslandCoords.x}px`,
                      top: `${hiddenIslandCoords.y}px`,
                      width: `${islandRadius * 2}px`,
                      height: `${islandRadius * 2}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 p-2 rounded text-xs">
                  <Map className="h-4 w-4 inline mr-1" />
                  Drag to explore, click to investigate
                </div>
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
                  <p className="mb-4">
                    You've found the hidden island! According to the ancient texts, this is where the lighthouse stands
                    guard over a maze of secrets.
                  </p>
                  <Link href="/lighthouse/maze">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">Journey to the Lighthouse</Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>

        {/* Hidden clue in the page source */}
        {/* <!-- The maze solution pattern: NESESWN --> */}
      </div>
    </div>
  )
}

