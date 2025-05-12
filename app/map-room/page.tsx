import Link from "next/link"
import Image from "next/image"
import { Compass, MapIcon, ArrowRight } from "lucide-react"

export default function MapRoomPage() {
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
            <h2 className="text-3xl font-bold mb-6 text-center">The Map Room</h2>

            <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=800"
                alt="Ancient map room with charts and globes"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                You've discovered the map room, a circular chamber filled with ancient charts, globes, and navigational
                instruments. The walls are lined with maps of lands both known and unknown, some showing places that may
                no longer exist.
              </p>

              <p className="mb-6">
                As you examine the various maps and charts, you notice several that seem particularly interesting:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <MapIcon className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Celestial Chart</h3>
                  <p className="text-slate-300 mb-4">
                    A map of the night sky showing constellations and celestial bodies.
                  </p>
                  <Link href="/observatory/starmap" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <MapIcon className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Uncharted Waters</h3>
                  <p className="text-slate-300 mb-4">
                    A nautical chart showing mysterious waters with warnings of hidden dangers.
                  </p>
                  <Link href="/map-room/hidden-island" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <MapIcon className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Ancient Landmarks</h3>
                  <p className="text-slate-300 mb-4">
                    A map showing the locations of ancient structures and monuments.
                  </p>
                  <Link href="/lighthouse/maze" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <MapIcon className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Lost Civilizations</h3>
                  <p className="text-slate-300 mb-4">
                    A map showing the locations of civilizations that have disappeared from history.
                  </p>
                  <Link href="/library/secret-chamber" className="text-amber-400 flex items-center">
                    Examine <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "Not all treasures are marked on maps, and not all that is marked exists. The true explorer must learn
                  to see what others miss."
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">The Cartographer's Journal</h3>
              <p className="mb-6">
                On a wooden desk in the corner, you find an old journal belonging to the cartographer:
              </p>
              <div className="p-6 bg-slate-700 rounded-md font-serif">
                <p className="mb-4">Day 157 of the expedition:</p>
                <p className="mb-4">
                  I have charted many islands in these waters, but one eludes me. The locals speak of an island that
                  appears only under certain conditions, visible to those who know where to look. I've marked its
                  approximate location on my chart, though it remains invisible to the casual observer.
                </p>
                <p className="mb-4">
                  The lighthouse on this mysterious island is said to guide lost souls to safety, but the path to reach
                  it is treacherous. A maze of stone protects its secrets, and only those who follow the correct path
                  may reach the treasure within.
                </p>
                <p className="text-right">- J.H., Royal Cartographer</p>
              </div>

              {/* Hidden clue in the HTML */}
              <div className="hidden">Look for subtle differences in the texture of the map</div>
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

