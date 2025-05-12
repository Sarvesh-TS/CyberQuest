import Link from "next/link"
import Image from "next/image"
import { Compass, Star, ArrowRight } from "lucide-react"

export default function ObservatoryPage() {
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">The Ancient Observatory</h2>

            <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=800"
                alt="Ancient observatory with telescopes and star charts"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                You've entered the ancient observatory, a circular tower with a domed ceiling that opens to the night
                sky. Ancient astronomical instruments and star charts fill the room, evidence of centuries of celestial
                observations.
              </p>

              <p className="mb-6">As you explore the observatory, you discover several areas of interest:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Star className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Star Map</h3>
                  <p className="text-slate-300 mb-4">
                    An interactive map of the night sky showing constellations and celestial bodies.
                  </p>
                  <Link href="/observatory/starmap" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Star className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Ancient Telescope</h3>
                  <p className="text-slate-300 mb-4">
                    A massive brass telescope pointed at a specific section of the night sky.
                  </p>
                  <Link href="/puzzles/echo" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Star className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Celestial Calendar</h3>
                  <p className="text-slate-300 mb-4">
                    A complex mechanism that tracks the movements of celestial bodies.
                  </p>
                  <Link href="/library" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Star className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Astronomer's Journal</h3>
                  <p className="text-slate-300 mb-4">
                    A leather-bound journal containing observations and notes from ancient astronomers.
                  </p>
                  <Link href="/map-room" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "The stars have guided travelers for millennia. They may guide you to the treasure you seek."
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">The Astronomer's Note</h3>
              <p className="mb-6">Pinned to one of the star charts, you find a yellowed note:</p>
              <div className="p-6 bg-slate-700 rounded-md font-serif">
                <p className="mb-4">To those who seek guidance from the stars:</p>
                <p className="mb-4">
                  The hunter's belt points the way. Three stars in a row, a pattern recognized by cultures across the
                  world. Connect them in the right sequence, and they will reveal the path forward.
                </p>
                <p className="mb-4">
                  Remember that Polaris, the North Star, has been a constant guide for navigators. It may serve as a key
                  to unlock other mysteries you encounter.
                </p>
                <p className="text-right">- Chief Astronomer</p>
              </div>

              {/* Hidden clue in the HTML */}
              <div className="hidden">Look for Orion's Belt in the star map</div>
            </div>
          </div>
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} The Lost Artifacts Treasure Hunt</p>
        </footer>
      </div>
    </div>
  )
}

