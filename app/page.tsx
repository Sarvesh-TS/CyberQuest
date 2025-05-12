"use client"

import Link from "next/link"
import Image from "next/image"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-emerald-500" />
            <h1 className="text-2xl font-bold">CyberQuest</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-emerald-400 transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-col items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-5xl font-bold mb-6 font-mono">CYBERQUEST</h2>
            <div className="inline-block px-4 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-md mb-6 font-mono">
              SECURITY CLEARANCE REQUIRED
            </div>
            <p className="text-xl mb-8 text-slate-300">
              Welcome, agent. A critical system breach has been detected in our network. We need your technical
              expertise to track down the intruder and recover the stolen encryption key. This mission will test your
              skills in cybersecurity, programming, and logical thinking.
            </p>

            <div className="relative w-full h-[400px] mb-10 rounded-lg overflow-hidden border border-slate-700">
              <Image
                src="/homepage.png?height=400&width=800"
                alt="Digital network with binary code overlay"
                fill
                className="object-cover"
              />
              {/* Hidden clue in the image - only visible on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-black/70">
                <p className="text-emerald-300 font-mono">First hint: "Check the source for initial access point."</p>
              </div>
            </div>

            <Link href="/terminal">
              <Button
                variant="default"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 text-lg font-mono"
              >
                INITIALIZE MISSION
              </Button>
            </Link>

            {/* Hidden clue in the page source */}
            {/* <!-- Initial access credentials: user: guest pass: 1n1t1@l --> */}
          </motion.div>
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CyberQuest Security Challenge</p>
          {/* Hidden element with a clue */}
          <div className="hidden">SSH port: 2222</div>
        </footer>
      </div>
    </div>
  )
}

