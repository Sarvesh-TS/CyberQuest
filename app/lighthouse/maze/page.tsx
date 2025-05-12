"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Compass, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function MazePage() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [path, setPath] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [solved, setSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Maze configuration (7x7 grid)
  // 0 = path, 1 = wall, 2 = start, 3 = end
  const maze = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ]

  // The correct path sequence
  const correctPath = "NESESWN"

  useEffect(() => {
    // Initialize position at start
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 2) {
          setPosition({ x, y })
          break
        }
      }
    }

    // Show hint after 2 minutes
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 120000)

    return () => clearTimeout(timer)
  }, [])

  const move = (direction: string) => {
    if (solved) return

    let newX = position.x
    let newY = position.y

    switch (direction) {
      case "N":
        newY -= 1
        break
      case "E":
        newX += 1
        break
      case "S":
        newY += 1
        break
      case "W":
        newX -= 1
        break
    }

    // Check if the move is valid
    if (newY >= 0 && newY < maze.length && newX >= 0 && newX < maze[0].length && maze[newY][newX] !== 1) {
      setPosition({ x: newX, y: newY })
      setPath([...path, direction])

      // Check if reached the end
      if (maze[newY][newX] === 3) {
        // Check if the path matches the correct sequence
        const pathString = [...path, direction].join("")

        if (pathString === correctPath) {
          setMessage("Congratulations! You've solved the lighthouse maze!")
          setSolved(true)
          localStorage.setItem("puzzle_maze_solved", "true")
        } else {
          setMessage("You've reached the end, but the path is not correct. Try again with a different route.")
          // Reset to start
          for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
              if (maze[y][x] === 2) {
                setPosition({ x, y })
                break
              }
            }
          }
          setPath([])
        }
      }
    } else {
      setMessage("You can't move in that direction.")
    }
  }

  const resetMaze = () => {
    // Reset to start
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 2) {
          setPosition({ x, y })
          break
        }
      }
    }
    setPath([])
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
            <h2 className="text-3xl font-bold mb-6 text-center">The Lighthouse Maze</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                You've reached the ancient lighthouse. Inside, you find a mysterious maze carved into the floor.
              </p>

              <div className="mb-6 p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "The path through the maze is not just about reaching the end, but following the correct sequence of
                  steps."
                </p>
                <p className="mt-2 text-slate-300 text-sm">Remember: LIGHTHOUSE is the key.</p>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-3 border border-dashed border-amber-500/50 rounded"
                >
                  <p className="text-amber-300 text-sm">
                    Hint: The word "LIGHTHOUSE" might guide your path. Think about how each letter could represent a
                    direction.
                  </p>
                </motion.div>
              )}

              <div className="flex justify-center mb-8">
                <div className="grid grid-cols-7 gap-1">
                  {maze.map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`
                          w-12 h-12 flex items-center justify-center rounded
                          ${cell === 1 ? "bg-slate-700" : "bg-slate-600"}
                          ${position.x === x && position.y === y ? "bg-amber-500" : ""}
                          ${cell === 3 ? "bg-green-700" : ""}
                        `}
                      >
                        {position.x === x && position.y === y && <div className="w-4 h-4 rounded-full bg-white" />}
                        {cell === 3 && !(position.x === x && position.y === y) && (
                          <Lightbulb className="h-6 w-6 text-green-300" />
                        )}
                      </div>
                    )),
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-6">
                <div></div>
                <Button onClick={() => move("N")}>N</Button>
                <div></div>
                <Button onClick={() => move("W")}>W</Button>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <Button onClick={() => move("E")}>E</Button>
                <div></div>
                <Button onClick={() => move("S")}>S</Button>
                <div></div>
              </div>

              <div className="flex justify-center mb-6">
                <Button variant="outline" onClick={resetMaze} disabled={solved}>
                  Reset Maze
                </Button>
              </div>

              <div className="mb-4 p-3 bg-slate-900 rounded">
                <p className="text-sm">
                  Current path: <span className="font-mono">{path.join("")}</span>
                </p>
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
                    The lighthouse maze has revealed its secrets! At the center of the maze, you find an ancient key
                    that unlocks the final chamber.
                  </p>
                  <Link href="/final-chamber">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">Enter the Final Chamber</Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>

        {/* Hidden clue in the page source */}
        {/* <!-- The final code is 1-6-3-7 --> */}
      </div>
    </div>
  )
}

