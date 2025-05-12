import Link from "next/link"
import { Terminal } from "lucide-react"

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            <h1 className="text-xl">CyberQuest</h1>
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-emerald-400 hover:text-emerald-300 transition-colors">
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

        <main className="py-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Rules & Guidelines</h2>

            <div className="bg-black border border-green-800 rounded-md p-6 mb-10">
              <h3 className="text-xl font-bold mb-4">How to Participate</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-4">
                <li>
                  <p className="font-bold">Start at the beginning</p>
                  <p className="text-slate-300">
                    Begin your mission on the homepage and follow the instructions to proceed.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Solve technical challenges</p>
                  <p className="text-slate-300">
                    Each stage contains a technical challenge that must be solved to unlock the next stage.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Look for hidden clues</p>
                  <p className="text-slate-300">
                    Clues may be hidden in the page source, HTML elements, or other unexpected places.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Track your progress</p>
                  <p className="text-slate-300">
                    Your progress is automatically saved in your browser, so you can continue where you left off.
                  </p>
                </li>
                <li>
                  <p className="font-bold">Complete all challenges</p>
                  <p className="text-slate-300">
                    To recover the encryption key, you must complete all the technical challenges.
                  </p>
                </li>
              </ol>

              <h3 className="text-xl font-bold mb-4">Important Rules</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Do not share solutions with others who are still solving the challenges</li>
                <li>The challenge is designed to be completed in 3-4 hours</li>
                <li>All the information you need is contained within the challenge</li>
                <li>If you get stuck, look for hints that may appear after some time</li>
                <li>Use your browser's developer tools to inspect elements when necessary</li>
              </ul>

              <div className="p-4 bg-green-900/20 border border-green-800 rounded-md">
                <p className="text-emerald-300 font-bold mb-2">Fair Play Policy:</p>
                <p className="text-slate-300">
                  While we encourage creative thinking and exploration, please respect the integrity of the challenge.
                  Attempting to bypass challenges through technical means (like directly accessing URLs) diminishes the
                  experience for yourself and others.
                </p>
              </div>
            </div>

            <div className="bg-black border border-green-800 rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Technical Requirements</h3>
              <p className="mb-6">To fully participate in CyberQuest, you'll need:</p>
              <ul className="space-y-4">
                <li>
                  <p className="font-bold text-emerald-400">Modern Web Browser</p>
                  <p className="text-slate-300">Chrome, Firefox, Safari, or Edge with developer tools enabled.</p>
                </li>
                <li>
                  <p className="font-bold text-emerald-400">Basic Technical Knowledge</p>
                  <p className="text-slate-300">
                    Understanding of programming concepts, binary/hex, and web technologies.
                  </p>
                </li>
                <li>
                  <p className="font-bold text-emerald-400">Problem-Solving Skills</p>
                  <p className="text-slate-300">Ability to think critically and approach problems methodically.</p>
                </li>
                <li>
                  <p className="font-bold text-emerald-400">Persistence</p>
                  <p className="text-slate-300">Some challenges are difficult and may require multiple attempts.</p>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CyberQuest Security Challenge</p>
        </footer>
      </div>
    </div>
  )
}

