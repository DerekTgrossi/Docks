"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, CheckCircle, Waves, MapPin } from "lucide-react"

interface QuizAnswer {
  questionId: number
  answer: string | string[]
}

interface QuizQuestion {
  id: number
  type: "multiple-choice" | "numeric" | "text" | "multi-select"
  question: string
  description?: string
  options?: string[]
  required: boolean
  placeholder?: string
  unit?: string
}

const quizQuestions: QuizQuestion[] = [
  // Step 1: Dock Requirements
  {
    id: 1,
    type: "multiple-choice",
    question: "What's the primary function of your dock?",
    description: "This helps us recommend the right dock design and features",
    options: ["Boat Access", "Relax and Entertain", "Both"],
    required: true,
  },
  {
    id: 2,
    type: "numeric",
    question: "Water depth at dock end (approximate feet)",
    description: "Measure from where you want the end of your dock to be",
    required: true,
    placeholder: "Enter depth in feet",
    unit: "ft",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Does your site experience water level variations?",
    description: "Seasonal changes, tides, or dam-controlled water levels",
    options: ["Yes", "No", "Unsure"],
    required: true,
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Do you have an existing dock you'd like us to remove?",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: 5,
    type: "multi-select",
    question: "Describe your shoreline (select all that apply)",
    options: ["Rocky", "Sandy", "Grassy", "Mixed small rocks/soil", "Other"],
    required: true,
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "What's your shoreline slope?",
    options: ["Beach (Gentle)", "Medium Slope", "Steep Slope", "Cliff"],
    required: true,
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "Wave and wind exposure at your site",
    description: "How protected is your waterfront from waves and wind?",
    options: ["Protected", "Moderate", "Very Windy or Wavy", "Unsure"],
    required: true,
  },
  // Step 2: Dock Usage & Essentials
  {
    id: 8,
    type: "text",
    question: "Lake or river name",
    description: "This helps us understand local conditions and regulations",
    required: true,
    placeholder: "e.g., Lake Minnetonka, Mississippi River",
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "Do you own a boat or personal watercraft?",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: 10,
    type: "numeric",
    question: "Boat length (if applicable)",
    description: "Length of your boat in feet",
    required: false,
    placeholder: "Enter boat length",
    unit: "ft",
  },
  {
    id: 11,
    type: "multi-select",
    question: "Interested in dock accessories? (Select all that apply)",
    options: ["Dock Ladder", "Dock Cleats", "Dock Bumpers", "Lights", "Kayak Rack", "Not at this time"],
    required: false,
  },
]

export default function DockQuizFunnel() {
  const [currentStep, setCurrentStep] = useState<"hero" | "quiz" | "results" | "thank-you">("hero")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [leadInfo, setLeadInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "Either",
  })

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (answer: string | string[]) => {
    const newAnswers = answers.filter((a) => a.questionId !== quizQuestions[currentQuestion].id)
    newAnswers.push({ questionId: quizQuestions[currentQuestion].id, answer })
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentStep("results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getCurrentAnswer = () => {
    const answer = answers.find((a) => a.questionId === quizQuestions[currentQuestion].id)?.answer
    return answer || (quizQuestions[currentQuestion].type === "multi-select" ? [] : "")
  }

  const handleSubmitLead = () => {
    // Here you would typically send the data to your backend/CRM
    console.log("Dock Quiz Answers:", answers)
    console.log("Customer Info:", leadInfo)
    setCurrentStep("thank-you")
  }

  const getStepTitle = () => {
    if (currentQuestion <= 6) return "Step 1: Dock Requirements"
    if (currentQuestion <= 10) return "Step 2: Dock Usage & Essentials"
    return "Step 3: Final Details"
  }

  if (currentStep === "hero") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* 1. ATTENTION-GRABBING HEADLINE */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Find the Perfect Dock for Your Shoreline — In 3 Minutes or Less
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-medium">
                Take our short quiz and get your custom dock recommendation, complete buyer's guide, and FREE 3D
                rendering of your dream dock.
              </p>
            </div>

            {/* 2. SOCIAL PROOF - Build trust early */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-80">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">1,200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Docks Installed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</div>
              </div>
            </div>

            {/* 3. VISUAL PROOF - Show the transformation */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                From Your Shoreline to Your Dream Dock
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8 relative">
                {/* Before Photo */}
                <div className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <img
                      src="/images/shoreline-before.png"
                      alt="Natural rocky shoreline before dock installation"
                      className="w-full h-64 object-cover rounded-lg mb-3"
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">BEFORE</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Your Natural Shoreline</p>
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    BEFORE
                  </div>
                </div>

                {/* After Photo */}
                <div className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <img
                      src="/images/shoreline-after.png"
                      alt="Beautiful custom dock installation on Muskoka lake"
                      className="w-full h-64 object-cover rounded-lg mb-3"
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-1">AFTER</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Your 3D Custom Dock Design</p>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded">
                    AFTER
                  </div>
                </div>

                {/* Arrow between photos on larger screens */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-teal-600 text-white rounded-full p-3 shadow-lg">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg font-medium text-center">
                We capture your existing shoreline and transform it into a detailed 3D rendering, showing exactly how
                your custom dock will look before construction begins.
              </p>
            </div>

            {/* 4. VALUE PROPOSITION - What they get */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-12 max-w-3xl mx-auto shadow-lg border-2 border-teal-200 dark:border-teal-800">
              <h3 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6 text-center">
                🏖️ Get Your FREE Dock Package
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Perfect Dock Match</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Custom recommendation based on your specific shoreline and needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📘</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Complete Buyer's Guide</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Expert insights, comparisons, and insider tips (PDF download)
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎁</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">FREE 3D Rendering</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Professional site visit and detailed 3D visualization
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                *This offer includes an on-site visit to your property to capture shoreline details before rendering
                your custom design.
              </p>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Total Value: <span className="text-teal-600 dark:text-teal-400">$799</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Yours FREE when you complete our 3-minute quiz
                </p>
              </div>
            </div>

            {/* 5. BENEFITS - Why this matters */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🧭</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No More Guesswork</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Get expert recommendations tailored to your exact shoreline conditions and lifestyle needs
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Avoid Costly Mistakes</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  See exactly how your dock will look and function before you invest thousands
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast & Easy Process</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  Get professional results in minutes, not weeks of research and consultations
                </p>
              </div>
            </div>

            {/* 6. CLEAR CTA */}
            <div className="text-center mb-8">
              <Button
                size="lg"
                className="text-xl px-12 py-8 bg-teal-600 hover:bg-teal-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => setCurrentStep("quiz")}
              >
                Get My FREE Dock Package Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>

              {/* 7. RISK REVERSAL */}
              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ✓ 100% Free • ✓ No Obligation • ✓ Instant Results
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Takes less than 3 minutes • Your information is secure and never shared
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "quiz") {
    const question = quizQuestions[currentQuestion]
    const currentAnswer = getCurrentAnswer()

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{getStepTitle()}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-teal-600" />
                  {question.question}
                </CardTitle>
                {question.description && (
                  <CardDescription className="text-base">{question.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {question.type === "multiple-choice" && (
                  <RadioGroup value={currentAnswer as string} onValueChange={handleAnswerSelect} className="space-y-3">
                    {question.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-teal-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === "multi-select" && (
                  <div className="space-y-3">
                    {question.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-teal-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Checkbox
                          id={`option-${index}`}
                          checked={(currentAnswer as string[]).includes(option)}
                          onCheckedChange={(checked) => {
                            const current = currentAnswer as string[]
                            if (checked) {
                              handleAnswerSelect([...current, option])
                            } else {
                              handleAnswerSelect(current.filter((item) => item !== option))
                            }
                          }}
                        />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "numeric" && (
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder={question.placeholder}
                        value={currentAnswer as string}
                        onChange={(e) => handleAnswerSelect(e.target.value)}
                        className="text-lg pr-12"
                      />
                      {question.unit && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {question.unit}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {question.type === "text" && (
                  <Input
                    placeholder={question.placeholder}
                    value={currentAnswer as string}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    className="text-lg"
                  />
                )}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      question.required &&
                      (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0))
                    }
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? "Get My Dock Package" : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "results") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Dock Package is Ready!</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Based on your site conditions and requirements, we'll prepare a detailed proposal with exact pricing.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-teal-600" />
                  Step 3: Your Contact Information
                </CardTitle>
                <CardDescription>Get your personalized dock proposal and schedule a free consultation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={leadInfo.firstName}
                      onChange={(e) => setLeadInfo({ ...leadInfo, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={leadInfo.lastName}
                      onChange={(e) => setLeadInfo({ ...leadInfo, lastName: e.target.value })}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                  onClick={handleSubmitLead}
                  disabled={!leadInfo.firstName || !leadInfo.lastName || !leadInfo.phone || !leadInfo.email}
                >
                  Get My Custom Dock Package
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Your information is secure and will only be used to provide your dock quote.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Detailed Proposal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Shoreline Imagery, drawings &amp; specifications
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Exact Pricing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Materials, labor & permits</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Installation Timeline</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Start to completion schedule</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "thank-you") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Thank You, {leadInfo.firstName}!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your custom dock proposal is being prepared by our engineering team.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">✅ What Happens Next?</h2>
              <div className="space-y-6 text-left">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full p-2 mt-1 flex-shrink-0">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Expect a Quick Call From Our Team
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      One of our local specialists will call you to confirm a few details and schedule your shoreline
                      appointment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full p-2 mt-1 flex-shrink-0">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Schedule Your On-Site Visit</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We'll book a time to visit your property and capture detailed shoreline imagery. This is required
                      to build your custom 3D rendering.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full p-2 mt-1 flex-shrink-0">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Receive Your Dock Design Package
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      After your site visit, you'll receive a detailed 3D mockup and layout of your ideal dock setup,
                      designed for your shoreline, family, and lake conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}