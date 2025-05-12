"use client"

import Link from "next/link"
import { Compass, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function BeginPage() {
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
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-center">The First Challenge</h2>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                Your journey begins with an ancient riddle. Solve it to find the path forward.
              </p>

              <div className="border border-amber-500/30 p-6 rounded-md bg-slate-900 font-serif">
                <p className="text-xl text-center italic text-amber-300">
                  "I speak without a mouth and hear without ears.
                  <br />I have no body, but I come alive with wind.
                  <br />
                  What am I?"
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <Link href="/puzzles/echo">
                  <Button variant="outline" className="mr-4">
                    Submit Answer
                  </Button>
                </Link>

                <Link href="/library">
                  <Button variant="ghost" className="text-slate-400 hover:text-white">
                    Need a hint?
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors">
                <h3 className="text-xl font-bold mb-3">The Map Room</h3>
                <p className="text-slate-300 mb-4">Explore ancient cartography for hidden clues.</p>
                <Link href="/map-room" className="text-amber-400 flex items-center">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors">
                <h3 className="text-xl font-bold mb-3">The Library</h3>
                <p className="text-slate-300 mb-4">Ancient texts may hold the knowledge you seek.</p>
                <Link href="/library" className="text-amber-400 flex items-center">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors">
                <h3 className="text-xl font-bold mb-3">The Observatory</h3>
                <p className="text-slate-300 mb-4">Gaze at the stars to find your direction.</p>
                <Link href="/observatory" className="text-amber-400 flex items-center">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Hidden clue in the page - only visible when inspecting elements */}
            <div className="hidden">The key to the maze lies in the constellation of Orion</div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

