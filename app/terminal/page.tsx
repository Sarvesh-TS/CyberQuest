"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TerminalIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", content: "CyberQuest Terminal v1.0.3" },
    { type: "output", content: 'Type "help" for available commands.' },
    { type: "output", content: "> " },
  ]);
  const [authenticated, setAuthenticated] = useState(false);
  const [authAttempts, setAuthAttempts] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Check localStorage for completed status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const completed = localStorage.getItem("terminal_challenge_completed") === "true";
      setIsCompleted(completed);
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const command = input.trim().toLowerCase();
    const newHistory = [...history, { type: "input", content: input }];
    let response: string[] = [];

    if (!authenticated) {
      if (command.startsWith("login")) {
        const args = command.split(" ");
        if (args.length === 3 && args[1] === "guest" && args[2] === "1n1t1@l") {
          response = [
            "Authentication successful.",
            "Welcome to the CyberQuest system.",
            'Type "scan" to begin network diagnostics.',
          ];
          setAuthenticated(true);
        } else {
          setAuthAttempts((prev) => prev + 1);
          if (authAttempts >= 2) {
            response = [
              "Authentication failed.",
              "Hint: Check the page source of the homepage for initial credentials.",
            ];
          } else {
            response = ["Authentication failed. Please try again."];
          }
        }
      } else if (command === "help") {
        response = [
          "Available commands:",
          "  login [username] [password] - Authenticate to the system",
          "  help - Display this help message",
          "  clear - Clear the terminal",
        ];
      } else if (command === "clear") {
        setHistory([
          { type: "output", content: "CyberQuest Terminal v1.0.3" },
          { type: "output", content: 'Type "help" for available commands.' },
          { type: "output", content: "> " },
        ]);
        setInput("");
        return;
      } else {
        response = ['Authentication required. Use "login [username] [password]" to proceed.'];
      }
    } else {
      if (command === "help") {
        response = [
          "Available commands:",
          "  scan - Scan the network for suspicious activity",
          "  decrypt [cipher] - Attempt to decrypt encoded message",
          "  connect [ip] [port] - Connect to a remote system",
          "  analyze [file] - Analyze a file for hidden data",
          "  help - Display this help message",
          "  clear - Clear the terminal",
          "  logout - End current session",
        ];
      } else if (command === "scan") {
        response = [
          "Scanning network...",
          "Suspicious activity detected on port 2222.",
          "Possible intrusion point identified.",
          'Use "connect 10.0.14.92 2222" to investigate.',
        ];
      } else if (command.startsWith("connect")) {
        const args = command.split(" ");
        if (args.length === 3 && args[1] === "10.0.14.92" && args[2] === "2222") {
          response = [
            "Connecting to 10.0.14.92:2222...",
            "Connection established.",
            "Remote system requires binary authentication.",
            "Proceed to /binary-challenge to continue.",
          ];
          localStorage.setItem("terminal_challenge_completed", "true");
          setIsCompleted(true);
        } else {
          response = ["Connection failed. Check IP and port."];
        }
      } else if (command === "clear") {
        setHistory([
          { type: "output", content: "CyberQuest Terminal v1.0.3" },
          { type: "output", content: 'Type "help" for available commands.' },
          { type: "output", content: "> " },
        ]);
        setInput("");
        return;
      } else if (command === "logout") {
        response = ["Logging out...", "Session terminated."];
        setAuthenticated(false);
      } else {
        response = ['Command not recognized. Type "help" for available commands.'];
      }
    }

    // Update history with responses
    response.forEach((line) => newHistory.push({ type: "output", content: line }));
    newHistory.push({ type: "output", content: "> " });

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-6 w-6" />
            <h1 className="text-xl">CyberQuest Terminal</h1>
          </div>
          <Link href="/" className="text-sm hover:text-green-300 transition-colors">
            [Return to Main]
          </Link>
        </header>

        <main>
          <div ref={terminalRef} className="bg-black border border-green-800 rounded-md p-4 h-[70vh] overflow-y-auto mb-4 font-mono text-sm">
            {history.map((entry, index) => (
              <div key={index} className={entry.type === "input" ? "text-white" : "text-green-400"}>
                {entry.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex gap-2">
            <div className="text-green-400 pt-2">{">"}</div>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black border-green-800 text-white focus:border-green-600 focus:ring-0"
              autoFocus
            />
            <Button type="submit" className="bg-green-800 hover:bg-green-700">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 border border-green-800 rounded-md"
            >
              <p className="mb-4">
                You've successfully identified the intrusion point. Continue to the binary challenge to proceed.
              </p>
              <Link href="/binary-challenge">
                <Button className="bg-green-700 hover:bg-green-600">
                  Continue to Binary Challenge <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
