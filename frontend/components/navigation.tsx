"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Brain,
  Home,
  PlayCircle,
  RefreshCw,
  Loader2
} from "lucide-react"

const DEMO_INPUT = [22,1,0,5,4,0,1,2,1,0,1,2,1,2,2,1,0,1,2,1,0,1,2,1,0,2,1]

interface NavigationProps {
  showDemo?: boolean
  showRetake?: boolean
  showHome?: boolean
}

export function Navigation({ 
  showDemo = true, 
  showRetake = true, 
  showHome = true 
}: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [demoLoading, setDemoLoading] = useState(false)

  const isHomePage = pathname === "/"
  const isAssessmentPage = pathname === "/assessment"
  const isResultsPage = pathname === "/results"

  const runDemoTest = async () => {
    setDemoLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: DEMO_INPUT }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      
      sessionStorage.setItem("mentalHealthResults", JSON.stringify({
        depression: data.Depression_Level,
        anxiety: data.Anxiety_Level,
        stress: data.Stress_Level,
        timestamp: new Date().toISOString(),
        answers: DEMO_INPUT
      }))

      router.push("/results")
    } catch {
      alert("Unable to connect to the prediction API. Please check your connection and try again.")
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">MindInsight</span>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2">
            {/* Home Button - show on all pages except home */}
            {showHome && !isHomePage && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
            )}

            {/* Demo Test Button */}
            {showDemo && (
              <Button
                variant="outline"
                size="sm"
                onClick={runDemoTest}
                disabled={demoLoading}
                className="gap-2"
              >
                {demoLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PlayCircle className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Demo</span>
              </Button>
            )}

            {/* Retake Assessment Button - show on results page */}
            {showRetake && isResultsPage && (
              <Link href="/assessment">
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Retake</span>
                </Button>
              </Link>
            )}

            {/* Start Assessment Button - show on home page */}
            {isHomePage && (
              <Link href="/assessment">
                <Button size="sm">Start Assessment</Button>
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
