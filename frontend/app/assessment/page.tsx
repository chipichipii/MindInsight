"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  User,
  Activity,
  Heart,
  AlertCircle,
  Loader2,
  Home,
  X
} from "lucide-react"

// Question types
type QuestionType = "number" | "select" | "likert"

interface Question {
  id: string
  text: string
  type: QuestionType
  category: "demographic" | "stress" | "anxiety" | "depression"
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  placeholder?: string
}

// All 27 questions
const questions: Question[] = [
  // Demographic Questions (6)
  {
    id: "age",
    text: "What is your age?",
    type: "number",
    category: "demographic",
    min: 10,
    max: 100,
    placeholder: "Enter your age (10-100)"
  },
  {
    id: "gender",
    text: "What is your gender?",
    type: "select",
    category: "demographic",
    options: [
      { value: "1", label: "Male" },
      { value: "2", label: "Female" }
    ]
  },
  {
    id: "marital_status",
    text: "Are you married?",
    type: "select",
    category: "demographic",
    options: [
      { value: "0", label: "No" },
      { value: "1", label: "Yes" }
    ]
  },
  {
    id: "education",
    text: "What is your highest level of education?",
    type: "select",
    category: "demographic",
    options: [
      { value: "1", label: "Illiterate" },
      { value: "2", label: "Primary" },
      { value: "3", label: "SSC" },
      { value: "4", label: "HSC" },
      { value: "5", label: "Graduation or higher" }
    ]
  },
  {
    id: "occupation",
    text: "What is your current occupation?",
    type: "select",
    category: "demographic",
    options: [
      { value: "1", label: "Housewife" },
      { value: "2", label: "Service" },
      { value: "3", label: "Business" },
      { value: "4", label: "Student" },
      { value: "5", label: "Day labor" },
      { value: "6", label: "Unemployed" }
    ]
  },
  {
    id: "sleeping_problem",
    text: "Do you have sleeping problems?",
    type: "select",
    category: "demographic",
    options: [
      { value: "0", label: "No" },
      { value: "1", label: "Yes" }
    ]
  },
  // Stress Questions (7)
  {
    id: "stress_1",
    text: "How often do you feel overwhelmed by your daily responsibilities?",
    type: "likert",
    category: "stress"
  },
  {
    id: "stress_2",
    text: "How often do you feel unable to control the important things in your life?",
    type: "likert",
    category: "stress"
  },
  {
    id: "stress_3",
    text: "How often do you feel nervous or stressed?",
    type: "likert",
    category: "stress"
  },
  {
    id: "stress_4",
    text: "How often do you feel confident about your ability to handle personal problems?",
    type: "likert",
    category: "stress"
  },
  {
    id: "stress_5",
    text: "How often do you feel that things are going your way?",
    type: "likert",
    category: "stress"
  },
  {
    id: "stress_6",
    text: "How often do you find yourself unable to cope with all the things you have to do?",
    type: "likert",
    category: "stress"
  },
  {
    id: "stress_7",
    text: "How often do you feel angered because of things outside of your control?",
    type: "likert",
    category: "stress"
  },
  // Anxiety Questions (7)
  {
    id: "anxiety_1",
    text: "How often do you feel nervous, anxious, or on edge?",
    type: "likert",
    category: "anxiety"
  },
  {
    id: "anxiety_2",
    text: "How often are you unable to stop or control worrying?",
    type: "likert",
    category: "anxiety"
  },
  {
    id: "anxiety_3",
    text: "How often do you worry too much about different things?",
    type: "likert",
    category: "anxiety"
  },
  {
    id: "anxiety_4",
    text: "How often do you have trouble relaxing?",
    type: "likert",
    category: "anxiety"
  },
  {
    id: "anxiety_5",
    text: "How often are you so restless that it is hard to sit still?",
    type: "likert",
    category: "anxiety"
  },
  {
    id: "anxiety_6",
    text: "How often do you become easily annoyed or irritable?",
    type: "likert",
    category: "anxiety"
  },
  {
    id: "anxiety_7",
    text: "How often do you feel afraid as if something awful might happen?",
    type: "likert",
    category: "anxiety"
  },
  // Depression Questions (7)
  {
    id: "depression_1",
    text: "How often do you have little interest or pleasure in doing things?",
    type: "likert",
    category: "depression"
  },
  {
    id: "depression_2",
    text: "How often do you feel down, depressed, or hopeless?",
    type: "likert",
    category: "depression"
  },
  {
    id: "depression_3",
    text: "How often do you have trouble falling asleep, staying asleep, or sleeping too much?",
    type: "likert",
    category: "depression"
  },
  {
    id: "depression_4",
    text: "How often do you feel tired or have little energy?",
    type: "likert",
    category: "depression"
  },
  {
    id: "depression_5",
    text: "How often do you have poor appetite or overeat?",
    type: "likert",
    category: "depression"
  },
  {
    id: "depression_6",
    text: "How often do you feel bad about yourself or that you are a failure?",
    type: "likert",
    category: "depression"
  },
  {
    id: "depression_7",
    text: "How often do you have trouble concentrating on things?",
    type: "likert",
    category: "depression"
  }
]

const likertOptions = [
  { value: "0", label: "Never" },
  { value: "1", label: "Sometimes" },
  { value: "2", label: "Often" },
  { value: "3", label: "Almost Always" }
]

const categoryInfo = {
  demographic: {
    icon: User,
    title: "About You",
    description: "Help us understand your background"
  },
  stress: {
    icon: Activity,
    title: "Stress Assessment",
    description: "Questions about your stress levels"
  },
  anxiety: {
    icon: AlertCircle,
    title: "Anxiety Assessment",
    description: "Questions about your anxiety patterns"
  },
  depression: {
    icon: Heart,
    title: "Mood Assessment",
    description: "Questions about your mood and feelings"
  }
}

export default function AssessmentPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const category = categoryInfo[currentQuestion.category]
  const CategoryIcon = category.icon

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const canProceed = () => {
    const answer = answers[currentQuestion.id]
    if (!answer) return false
    if (currentQuestion.type === "number") {
      const num = parseInt(answer)
      return num >= (currentQuestion.min || 0) && num <= (currentQuestion.max || 100)
    }
    return true
  }

  const submitAssessment = async () => {
    setIsSubmitting(true)
    setError(null)

    // Convert answers to array in correct order
    const answersArray = questions.map(q => {
      const val = answers[q.id]
      return parseInt(val) || 0
    })

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersArray }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      
      // Store results in sessionStorage and redirect
      sessionStorage.setItem("mentalHealthResults", JSON.stringify({
        depression: data.Depression_Level,
        anxiety: data.Anxiety_Level,
        stress: data.Stress_Level,
        timestamp: new Date().toISOString(),
        answers: answersArray
      }))

      router.push("/results")
    } catch {
      setError("Unable to connect to the prediction API. Please check your connection and try again.")
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      submitAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const getCategoryProgress = () => {
    const categories = ["demographic", "stress", "anxiety", "depression"]
    const currentCategoryIndex = categories.indexOf(currentQuestion.category)
    const questionsPerCategory = {
      demographic: 6,
      stress: 7,
      anxiety: 7,
      depression: 7
    }
    
    let totalBefore = 0
    
    for (let i = 0; i < currentCategoryIndex; i++) {
      totalBefore += questionsPerCategory[categories[i] as keyof typeof questionsPerCategory]
    }
    
    const questionInCategory = currentIndex - totalBefore + 1
    const totalInCategory = questionsPerCategory[currentQuestion.category]
    
    return { current: questionInCategory, total: totalInCategory }
  }

  const categoryProgress = getCategoryProgress()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation showRetake={false} />

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Cancel / Question Info Row */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Category Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CategoryIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{category.title}</h2>
              <p className="text-sm text-muted-foreground">
                {category.description} ({categoryProgress.current}/{categoryProgress.total})
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Card className="mb-6 border-destructive bg-destructive/10">
              <CardContent className="p-4">
                <p className="text-sm text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Question Card */}
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Question Text */}
                <h3 className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed">
                  {currentQuestion.text}
                </h3>

                {/* Answer Input */}
                <div className="space-y-4">
                  {currentQuestion.type === "number" && (
                    <Input
                      type="number"
                      min={currentQuestion.min}
                      max={currentQuestion.max}
                      placeholder={currentQuestion.placeholder}
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="text-lg h-14 bg-input border-border"
                    />
                  )}

                  {currentQuestion.type === "select" && (
                    <RadioGroup
                      value={answers[currentQuestion.id] || ""}
                      onValueChange={handleAnswer}
                      className="space-y-3"
                    >
                      {currentQuestion.options?.map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={`${currentQuestion.id}-${option.value}`}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            answers[currentQuestion.id] === option.value
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem
                            id={`${currentQuestion.id}-${option.value}`}
                            value={option.value}
                          />
                          <span className="text-foreground">{option.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQuestion.type === "likert" && (
                    <RadioGroup
                      value={answers[currentQuestion.id] || ""}
                      onValueChange={handleAnswer}
                      className="grid grid-cols-2 gap-3"
                    >
                      {likertOptions.map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={`${currentQuestion.id}-${option.value}`}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            answers[currentQuestion.id] === option.value
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem
                            id={`${currentQuestion.id}-${option.value}`}
                            value={option.value}
                          />
                          <span className="text-foreground text-sm sm:text-base">{option.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {["demographic", "stress", "anxiety", "depression"].map((cat) => (
              <div
                key={cat}
                className={`h-2 rounded-full transition-all ${
                  cat === currentQuestion.category
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isSubmitting}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            <div className="flex-1 text-center">
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </span>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">
                    {currentIndex === questions.length - 1 ? "Submit Assessment" : "Next"}
                  </span>
                  <span className="sm:hidden">
                    {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                  </span>
                  {currentIndex === questions.length - 1 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
