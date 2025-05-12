import Link from "next/link"
import Image from "next/image"
import { Compass, Book, ArrowRight } from "lucide-react"

export default function LibraryPage() {
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
            <h2 className="text-3xl font-bold mb-6 text-center">The Ancient Library</h2>

            <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=800"
                alt="Ancient library with towering bookshelves"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg mb-10">
              <p className="text-lg mb-6">
                You've entered the ancient library, a vast repository of knowledge collected over centuries. Towering
                bookshelves filled with ancient tomes surround you. The air is thick with the smell of old parchment and
                leather bindings.
              </p>

              <p className="mb-6">
                As you explore the library, you notice several sections that might contain valuable information for your
                quest:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Book className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Ancient Riddles</h3>
                  <p className="text-slate-300 mb-4">A collection of riddles and puzzles from ancient civilizations.</p>
                  <Link href="/puzzles/echo" className="text-amber-400 flex items-center">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Book className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Celestial Maps</h3>
                  <p className="text-slate-300 mb-4">
                    Star charts and astronomical observations from ancient astronomers.
                  </p>
                  <Link href="/observatory" className="text-amber-400 flex items-center">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Book className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Lost Islands</h3>
                  <p className="text-slate-300 mb-4">
                    Tales of mysterious islands that appear and disappear from maps.
                  </p>
                  <Link href="/map-room" className="text-amber-400 flex items-center">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <Book className="h-8 w-8 text-amber-500 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Ancient Ciphers</h3>
                  <p className="text-slate-300 mb-4">Methods of encoding messages used by ancient scholars.</p>
                  <Link href="/begin" className="text-amber-400 flex items-center">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-md">
                <p className="text-amber-300 italic">
                  "In books lie the answers you seek, but some knowledge is hidden between the lines."
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">The Librarian's Note</h3>
              <p className="mb-6">On a dusty desk, you find a note left by the librarian:</p>
              <div className="p-6 bg-slate-700 rounded-md font-serif">
                <p className="mb-4">To those who seek the ancient artifacts:</p>
                <p className="mb-4">
                  The echo of words can guide you through darkness. Listen carefully to what is said, and what remains
                  unsaid. The stars above have guided travelers for centuries; they may guide you as well.
                </p>
                <p className="mb-4">
                  Remember that some knowledge is hidden from plain sight. Look beneath the surface, between the lines,
                  and in the spaces between words.
                </p>
                <p className="text-right">- The Keeper of Knowledge</p>
              </div>

              {/* Hidden clue in the HTML */}
              <div className="hidden">The answer to the riddle is "echo"</div>
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

