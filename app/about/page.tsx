import Link from "next/link"
import { Terminal } from "lucide-react"

export default function AboutPage() {
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
                <Link href="/about" className="text-emerald-400 hover:text-emerald-300 transition-colors">
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

        <main className="py-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">About CyberQuest</h2>

            <div className="bg-black border border-green-800 rounded-md p-6 mb-10">
              <p className="mb-6">
                CyberQuest is an immersive cybersecurity challenge that tests your technical skills across various
                domains:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Command line and terminal operations</li>
                <li>Binary and hexadecimal conversions</li>
                <li>Cryptography and encryption</li>
                <li>SQL injection and database security</li>
                <li>Steganography and hidden data</li>
                <li>Programming and debugging</li>
                <li>Web security and inspection</li>
              </ul>

              <p className="mb-6">
                This challenge is designed for cybersecurity enthusiasts, programmers, and anyone interested in
                technical problem-solving. The difficulty ranges from beginner to advanced, providing a comprehensive
                learning experience.
              </p>

              <p className="text-emerald-300 italic">
                "In the realm of cybersecurity, knowledge is your strongest weapon and curiosity your greatest asset."
              </p>
            </div>

            <div className="bg-black border border-green-800 rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Learning Objectives</h3>
              <p className="mb-6">By completing CyberQuest, you will:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Understand common cybersecurity vulnerabilities and how to exploit them</li>
                <li>Practice binary and hexadecimal conversions</li>
                <li>Learn basic cryptography techniques</li>
                <li>Develop SQL injection skills</li>
                <li>Discover how to find hidden data in files</li>
                <li>Improve your programming and debugging abilities</li>
                <li>Enhance your problem-solving skills in a technical context</li>
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

