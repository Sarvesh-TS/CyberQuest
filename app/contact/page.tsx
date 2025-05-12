"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Terminal, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

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
                <Link href="/rules" className="hover:text-emerald-400 transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="py-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

            <div className="bg-black border border-green-800 rounded-md p-6 mb-10">
              <p className="mb-6">
                Have questions, feedback, or need a hint? Feel free to reach out to us using the form below.
              </p>

              {submitted ? (
                <div className="p-6 bg-green-900/20 border border-green-800 rounded-md text-center">
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-300">
                    Thank you for your message. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-black border-green-800 text-white focus:border-green-600 focus:ring-0 min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" className="bg-green-700 hover:bg-green-600 w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </div>

            <div className="bg-black border border-green-800 rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-emerald-400">How long does it take to complete the challenge?</h4>
                  <p className="text-slate-300">
                    The challenge is designed to take approximately 3-4 hours to complete, depending on your technical
                    skills.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-emerald-400">I'm stuck on a challenge. What should I do?</h4>
                  <p className="text-slate-300">
                    Most challenges will reveal hints after some time if you're struggling. Pay attention to all
                    elements on the page, including the source code, which might contain hidden clues.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-emerald-400">Is my progress saved?</h4>
                  <p className="text-slate-300">
                    Yes, your progress is automatically saved in your browser's local storage. You can close the browser
                    and return later to continue where you left off.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-emerald-400">Do I need specialized tools?</h4>
                  <p className="text-slate-300">
                    No specialized tools are required. A modern web browser with developer tools is sufficient for all
                    challenges.
                  </p>
                </div>
              </div>
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

