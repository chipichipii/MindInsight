"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { 
  Brain, 
  Shield, 
  LineChart, 
  Sparkles, 
  Heart,
  CheckCircle2,
  ArrowRight,
  Activity,
  Users,
  Clock
} from "lucide-react"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                <Sparkles className="w-4 h-4" />
                AI-Powered Mental Health Analysis
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Mental Health Insight Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                An AI-powered system that analyzes depression, anxiety, and stress patterns to provide personalized insights and support your mental wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/assessment">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Start Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2">
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Private & Secure
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Evidence-Based
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Free Assessment
                </div>
              </div>
            </div>
            <div className={`relative transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card rounded-3xl border border-border p-8 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Wellness Score</p>
                        <p className="text-sm text-muted-foreground">Last updated today</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-secondary/50">
                        <p className="text-2xl font-bold text-foreground">85</p>
                        <p className="text-xs text-muted-foreground">Stress</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-primary/10">
                        <p className="text-2xl font-bold text-foreground">72</p>
                        <p className="text-xs text-muted-foreground">Anxiety</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-accent/20">
                        <p className="text-2xl font-bold text-foreground">91</p>
                        <p className="text-xs text-muted-foreground">Mood</p>
                      </div>
                    </div>
                    <div className="h-32 bg-muted/50 rounded-xl flex items-end p-4 gap-2">
                      {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 80].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/60 rounded-t-sm transition-all duration-300"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-center text-muted-foreground">Your 30-day trend looks positive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our evidence-based approach uses validated psychological assessments combined with AI analysis to provide meaningful insights.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                step: "01",
                title: "Complete Assessment",
                description: "Answer 27 carefully designed questions covering demographics, stress, anxiety, and depression indicators."
              },
              {
                icon: Brain,
                step: "02",
                title: "AI Analysis",
                description: "Our AI model analyzes your responses using validated psychological frameworks to identify patterns."
              },
              {
                icon: LineChart,
                step: "03",
                title: "Get Insights",
                description: "Receive personalized insights, visualizations, and recommendations based on your unique profile."
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/30">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Mental Health Tracking Matters */}
      <section id="why-track" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Why Mental Health Tracking Matters
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Understanding your mental health patterns is the first step toward meaningful improvement. Regular tracking helps you identify triggers, recognize progress, and make informed decisions about your well-being.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Heart,
                    title: "Early Detection",
                    description: "Identify potential concerns before they escalate into larger issues"
                  },
                  {
                    icon: Users,
                    title: "Self-Awareness",
                    description: "Develop a deeper understanding of your emotional patterns and triggers"
                  },
                  {
                    icon: Clock,
                    title: "Track Progress",
                    description: "Monitor improvements over time and celebrate your mental wellness journey"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 via-primary/20 to-accent/30 rounded-3xl blur-2xl" />
              <Card className="relative bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-8 border-b border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <div className="w-3 h-3 rounded-full bg-chart-4" />
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Weekly Mood Tracking</p>
                  </div>
                  <div className="p-8 space-y-6">
                    {[
                      { label: "Stress Management", value: 78, color: "bg-primary" },
                      { label: "Emotional Balance", value: 65, color: "bg-secondary" },
                      { label: "Sleep Quality", value: 82, color: "bg-accent" },
                      { label: "Social Connection", value: 71, color: "bg-chart-2" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{item.label}</span>
                          <span className="text-muted-foreground">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: mounted ? `${item.value}%` : "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of AI Insights */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Benefits of AI Insights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leverage the power of artificial intelligence to gain deeper understanding of your mental health patterns.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Pattern Recognition",
                description: "AI identifies subtle patterns in your responses that might go unnoticed"
              },
              {
                icon: Shield,
                title: "Private & Secure",
                description: "Your data is encrypted and never shared with third parties"
              },
              {
                icon: Sparkles,
                title: "Personalized Insights",
                description: "Receive recommendations tailored to your unique profile"
              },
              {
                icon: LineChart,
                title: "Track Progress",
                description: "Visualize your mental health journey with detailed analytics"
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/30 to-accent/20 rounded-3xl blur-3xl" />
            <Card className="relative bg-card border-border overflow-hidden">
              <CardContent className="p-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Take our comprehensive assessment and receive AI-powered insights about your mental health patterns in just a few minutes.
                </p>
                <Link href="/assessment">
                  <Button size="lg" className="gap-2">
                    Start Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">MindInsight</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This tool is for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
