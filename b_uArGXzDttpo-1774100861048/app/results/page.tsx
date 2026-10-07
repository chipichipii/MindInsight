"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  Activity,
  Heart,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  RefreshCw,
  Loader2,
  PlayCircle,
  Home,
  Brain,
  Users,
  Sparkles,
  X,
  Eye
} from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  Legend,
  Cell
} from "recharts"

interface Results {
  depression: number
  anxiety: number
  stress: number
  timestamp: string
  answers: number[]
}

const DEMO_INPUT = [22,1,0,5,4,0,1,2,1,0,1,2,1,2,2,1,0,1,2,1,0,1,2,1,0,2,1]

// Helper functions for severity
function getSeverityLabel(level: number): string {
  if (level <= 1.5) return "Low"
  if (level <= 2.5) return "Moderate"
  if (level <= 3.5) return "High"
  return "Severe"
}

function getSeverityColor(level: number): string {
  if (level <= 1.5) return "#22c55e" // green
  if (level <= 2.5) return "#eab308" // yellow
  if (level <= 3.5) return "#f97316" // orange
  return "#ef4444" // red
}

function getInsightMessage(type: string, level: number): string {
  const severity = getSeverityLabel(level)
  const messages: Record<string, Record<string, string>> = {
    depression: {
      Low: "Your mood indicators suggest a healthy emotional state. Continue your current lifestyle practices.",
      Moderate: "Some mild mood fluctuations detected. Consider incorporating more activities you enjoy.",
      High: "Elevated depression indicators noted. Regular physical activity and social connection may help.",
      Severe: "Significant depression indicators detected. Professional support is recommended."
    },
    anxiety: {
      Low: "Your anxiety levels appear well-managed. Keep up your stress management techniques.",
      Moderate: "Moderate anxiety patterns detected. Breathing exercises may provide relief.",
      High: "Elevated anxiety indicators observed. Consider relaxation techniques and structured routines.",
      Severe: "Significant anxiety indicators present. Consulting with a mental health professional is advised."
    },
    stress: {
      Low: "Your stress levels appear balanced. Maintain your current coping strategies.",
      Moderate: "Moderate stress detected. Regular breaks and mindfulness may help.",
      High: "Elevated stress indicators noted. Prioritize self-care and consider workload management.",
      Severe: "High stress levels detected. Professional guidance and lifestyle changes are recommended."
    }
  }
  return messages[type][severity]
}

function getRecommendations(depression: number, anxiety: number, stress: number): string[] {
  const recommendations: string[] = []
  const avgLevel = (depression + anxiety + stress) / 3

  if (avgLevel <= 1.5) {
    recommendations.push("Maintain your healthy lifestyle habits")
    recommendations.push("Continue regular physical activity")
    recommendations.push("Keep nurturing social connections")
  } else if (avgLevel <= 2.5) {
    recommendations.push("Practice relaxation techniques like deep breathing")
    recommendations.push("Establish a consistent sleep schedule")
    recommendations.push("Consider journaling to track your feelings")
    recommendations.push("Engage in activities that bring you joy")
  } else if (avgLevel <= 3.5) {
    recommendations.push("Incorporate daily meditation or mindfulness practice")
    recommendations.push("Prioritize sleep hygiene and aim for 7-9 hours")
    recommendations.push("Reduce caffeine and alcohol intake")
    recommendations.push("Consider speaking with a trusted friend or family member")
    recommendations.push("Regular exercise can significantly improve mood")
  } else {
    recommendations.push("Consider seeking professional mental health support")
    recommendations.push("Reach out to a counselor or therapist")
    recommendations.push("Establish a strong support network")
    recommendations.push("Practice daily self-care routines")
    recommendations.push("Avoid isolation - stay connected with others")
    recommendations.push("Consider calling a mental health helpline if needed")
  }

  return recommendations
}

// Generate mock trend data
function generateTrendData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return days.map((day, i) => ({
    day,
    depression: Math.max(1, Math.min(5, 2 + Math.sin(i * 0.5) + Math.random() * 0.5)),
    anxiety: Math.max(1, Math.min(5, 2.5 + Math.cos(i * 0.7) + Math.random() * 0.5)),
    stress: Math.max(1, Math.min(5, 2.2 + Math.sin(i * 0.3) + Math.random() * 0.5))
  }))
}

// Calculate similarity percentage based on scores
function calculateSimilarity(depression: number, anxiety: number, stress: number): number {
  // Simulate a similarity match between 78-94% based on score patterns
  const baseMatch = 78
  const variance = Math.round((depression + anxiety + stress) * 1.2) % 16
  return baseMatch + variance
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<Results | null>(null)
  const [loading, setLoading] = useState(true)
  const [demoLoading, setDemoLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [trendData] = useState(generateTrendData)
  const [showTwinPopup, setShowTwinPopup] = useState(false)
  const [twinRevealed, setTwinRevealed] = useState(false)
  const [twinHighlighted, setTwinHighlighted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = sessionStorage.getItem("mentalHealthResults")
    if (stored) {
      setResults(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  // Show twin popup after 2 seconds
  useEffect(() => {
    if (results && mounted && !twinRevealed) {
      const timer = setTimeout(() => {
        setShowTwinPopup(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [results, mounted, twinRevealed])

  const handleShowTwin = () => {
    setShowTwinPopup(false)
    setTwinRevealed(true)
    
    // Scroll to twin section smoothly
    setTimeout(() => {
      const twinSection = document.getElementById("twin-section")
      if (twinSection) {
        twinSection.scrollIntoView({ behavior: "smooth", block: "start" })
        // Add highlight effect
        setTimeout(() => {
          setTwinHighlighted(true)
          // Remove highlight after animation
          setTimeout(() => setTwinHighlighted(false), 2000)
        }, 500)
      }
    }, 100)
  }

  const handleMaybeLater = () => {
    setShowTwinPopup(false)
  }

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
      
      const newResults: Results = {
        depression: data.Depression_Level,
        anxiety: data.Anxiety_Level,
        stress: data.Stress_Level,
        timestamp: new Date().toISOString(),
        answers: DEMO_INPUT
      }

      sessionStorage.setItem("mentalHealthResults", JSON.stringify(newResults))
      setResults(newResults)
    } catch {
      alert("Unable to connect to the prediction API. Please check your connection and try again.")
    } finally {
      setDemoLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Navigation />

        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-4">No Results Found</h1>
                <p className="text-muted-foreground mb-8">
                  Please complete the assessment first to see your mental health insights, or try the demo prediction.
                </p>
                <div className="space-y-4">
                  <Button onClick={runDemoTest} disabled={demoLoading} className="w-full gap-2">
                    {demoLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Running Demo...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        Run Demo Prediction
                      </>
                    )}
                  </Button>
                  <Link href="/assessment" className="block">
                    <Button variant="outline" className="w-full gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Take Assessment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const { depression, anxiety, stress } = results

  // Prepare chart data
  const gaugeData = [
    { name: "Depression", value: depression, fill: getSeverityColor(depression) },
    { name: "Anxiety", value: anxiety, fill: getSeverityColor(anxiety) },
    { name: "Stress", value: stress, fill: getSeverityColor(stress) }
  ]

  const barData = [
    { name: "Depression", level: depression, fill: getSeverityColor(depression) },
    { name: "Anxiety", level: anxiety, fill: getSeverityColor(anxiety) },
    { name: "Stress", level: stress, fill: getSeverityColor(stress) }
  ]

  const recommendations = getRecommendations(depression, anxiety, stress)

  const similarity = calculateSimilarity(depression, anxiety, stress)

  // Generate consistent twin scores
  const twinScores = {
    depression: Math.max(1, Math.min(5, depression + (depression > 2.5 ? -0.5 : 0.3))),
    anxiety: Math.max(1, Math.min(5, anxiety + (anxiety > 2.5 ? -0.4 : 0.2))),
    stress: Math.max(1, Math.min(5, stress + (stress > 2.5 ? -0.3 : 0.4)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Twin Discovery Popup */}
      {showTwinPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={handleMaybeLater}
          />
          
          {/* Popup Card */}
          <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <Card className="bg-card border-primary/30 shadow-2xl shadow-primary/10">
              <CardContent className="p-6">
                {/* Close Button */}
                <button 
                  onClick={handleMaybeLater}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Users className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground text-center mb-2">
                  {"We found your Mental Health Twin"} <span className="inline-block animate-bounce">{"👀"}</span>
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-center text-sm mb-6 leading-relaxed">
                  Our AI detected someone with a very similar emotional pattern to yours. Would you like to see your Digital Twin?
                </p>

                {/* Similarity Badge */}
                <div className="flex justify-center mb-6">
                  <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {similarity}% Match Found
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleShowTwin}
                    className="flex-1 gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Show My Twin
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleMaybeLater}
                    className="flex-1"
                  >
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Header */}
      <Navigation />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className={`transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Mental Health Insights</h1>
            <p className="text-muted-foreground">
              Assessment completed on {new Date(results.timestamp).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>

          {/* Main Indicators */}
          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { name: "Depression", value: depression, icon: Heart, desc: "Mood indicators" },
              { name: "Anxiety", value: anxiety, icon: AlertCircle, desc: "Worry patterns" },
              { name: "Stress", value: stress, icon: Activity, desc: "Stress response" }
            ].map((item) => (
              <Card key={item.name} className="bg-card border-border overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${getSeverityColor(item.value)}20` }}
                      >
                        <item.icon className="w-6 h-6" style={{ color: getSeverityColor(item.value) }} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${getSeverityColor(item.value)}20`,
                        color: getSeverityColor(item.value)
                      }}
                    >
                      {getSeverityLabel(item.value)}
                    </span>
                  </div>
                  <div className="relative h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="100%"
                        innerRadius="60%"
                        outerRadius="100%"
                        startAngle={180}
                        endAngle={0}
                        data={[{ value: item.value, fill: getSeverityColor(item.value) }]}
                      >
                        <RadialBar
                          dataKey="value"
                          cornerRadius={10}
                          background={{ fill: "hsl(var(--muted))" }}
                          max={5}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-3xl font-bold text-foreground">{item.value.toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">out of 5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className={`grid lg:grid-cols-2 gap-6 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {/* Score Comparison Bar Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Score Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="name" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Trend Line Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Activity className="w-5 h-5 text-primary" />
                  Weekly Trend (Example)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="depression" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: "#ef4444", strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anxiety" 
                        stroke="#f97316" 
                        strokeWidth={2}
                        dot={{ fill: "#f97316", strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stress" 
                        stroke="#eab308" 
                        strokeWidth={2}
                        dot={{ fill: "#eab308", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Section */}
          <div className={`transition-all duration-500 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Personalized Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { type: "depression", name: "Depression", value: depression, icon: Heart },
                    { type: "anxiety", name: "Anxiety", value: anxiety, icon: AlertCircle },
                    { type: "stress", name: "Stress", value: stress, icon: Activity }
                  ].map((item) => (
                    <div 
                      key={item.type}
                      className="p-4 rounded-xl border border-border bg-muted/30"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <item.icon className="w-4 h-4" style={{ color: getSeverityColor(item.value) }} />
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {getInsightMessage(item.type, item.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Digital Mental Health Twin Section */}
          <div className={`space-y-6 transition-all duration-500 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h2 className="text-2xl font-bold text-foreground">Your Digital Mental Health Twin</h2>
            
            {/* Twin Discovery Card */}
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">We Found Your Mental Health Twin</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our AI analyzed your responses and discovered a behavioral profile that closely matches yours. 
                      This digital twin represents individuals with similar emotional patterns and stress responses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Twin Profile Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  Twin Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">People with similar response patterns often show:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">High emotional sensitivity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">Frequent overthinking patterns</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">Moderate stress recovery time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Score Comparison */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Scores vs Twin Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Your Scores */}
                  <div className="p-4 rounded-xl border border-border bg-muted/30">
                    <h4 className="font-semibold text-foreground mb-4 text-center">You</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Depression", value: depression },
                        { name: "Anxiety", value: anxiety },
                        { name: "Stress", value: stress }
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${(item.value / 5) * 100}%`,
                                  backgroundColor: getSeverityColor(item.value)
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground w-6">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Twin Scores */}
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                    <h4 className="font-semibold text-foreground mb-4 text-center">Twin</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Depression", value: Math.max(1, depression - (Math.random() > 0.5 ? 0 : 1)) },
                        { name: "Anxiety", value: Math.max(1, anxiety - (Math.random() > 0.5 ? 1 : 0)) },
                        { name: "Stress", value: stress }
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${(item.value / 5) * 100}%`,
                                  backgroundColor: getSeverityColor(item.value)
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground w-6">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explanation Text */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-medium text-foreground mb-2">What this means:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your digital twin helps the system understand behavioral trends and provide more personalized 
                    insights and mental wellness recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Section */}
          <div className={`transition-all duration-500 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Brain className="w-5 h-5 text-primary" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/assessment">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <RefreshCw className="w-4 h-4" />
                Take Assessment Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Return to Home
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Disclaimer:</strong> This tool provides informational insights only and is not a substitute for professional medical advice, diagnosis, or treatment. 
                If you are experiencing mental health concerns, please consult with a qualified healthcare provider.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
