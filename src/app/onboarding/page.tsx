"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Bell, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    id: 1,
    title: "Welcome to Propsberg",
    description: "Let's get you set up for success"
  },
  {
    id: 2,
    title: "Trading Experience",
    description: "Tell us about your trading background"
  },
  {
    id: 3,
    title: "Market Interests",
    description: "What markets are you most interested in?"
  },
  {
    id: 4,
    title: "Notification Preferences",
    description: "How would you like to stay informed?"
  },
  {
    id: 5,
    title: "You're All Set!",
    description: "Ready to start your trading journey"
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    experience: "",
    markets: [] as string[],
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    riskTolerance: "",
    goals: [] as string[]
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleMarketToggle = (market: string) => {
    setFormData(prev => ({
      ...prev,
      markets: prev.markets.includes(market)
        ? prev.markets.filter(m => m !== market)
        : [...prev.markets, market]
    }))
  }

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const progress = (currentStep / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Propsberg!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                You're about to embark on a professional trading journey with real-time market intelligence,
                advanced scenario analysis, and AI-powered insights.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Real-time Data</h3>
                  <p className="text-xs text-muted-foreground">Live market feeds</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">AI Scenarios</h3>
                  <p className="text-xs text-muted-foreground">Smart analysis</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4 text-center">
                  <Bell className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Smart Alerts</h3>
                  <p className="text-xs text-muted-foreground">Instant notifications</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Trading Experience</h2>
              <p className="text-muted-foreground">Help us customize your experience</p>
            </div>
            <div className="space-y-4">
              {[
                { value: "beginner", label: "Beginner", desc: "New to trading, learning the basics" },
                { value: "intermediate", label: "Intermediate", desc: "Some experience, building strategies" },
                { value: "advanced", label: "Advanced", desc: "Experienced trader, seeking advanced tools" },
                { value: "professional", label: "Professional", desc: "Full-time trader, institutional level" }
              ].map((level) => (
                <Card
                  key={level.value}
                  className={`border-white/10 bg-white/5 cursor-pointer transition-all ${
                    formData.experience === level.value ? 'ring-2 ring-cyan-400 bg-cyan-950/10' : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, experience: level.value }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{level.label}</h3>
                        <p className="text-sm text-muted-foreground">{level.desc}</p>
                      </div>
                      {formData.experience === level.value && (
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Market Interests</h2>
              <p className="text-muted-foreground">Select the markets you want to track</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "equities", label: "Equities", icon: "📈" },
                { value: "futures", label: "Futures", icon: "⚡" },
                { value: "forex", label: "Forex", icon: "💱" },
                { value: "crypto", label: "Crypto", icon: "₿" },
                { value: "commodities", label: "Commodities", icon: "🛢️" },
                { value: "bonds", label: "Bonds", icon: "📊" }
              ].map((market) => (
                <Card
                  key={market.value}
                  className={`border-white/10 bg-white/5 cursor-pointer transition-all ${
                    formData.markets.includes(market.value) ? 'ring-2 ring-cyan-400 bg-cyan-950/10' : ''
                  }`}
                  onClick={() => handleMarketToggle(market.value)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{market.icon}</div>
                    <h3 className="font-medium text-foreground">{market.label}</h3>
                    {formData.markets.includes(market.value) && (
                      <CheckCircle className="w-4 h-4 text-cyan-400 mx-auto mt-2" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Stay Informed</h2>
              <p className="text-muted-foreground">Choose how you want to receive updates</p>
            </div>
            <div className="space-y-4">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400">📧</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Market alerts and weekly reports</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked as boolean }
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-green-400">📱</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground">Real-time alerts on your device</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked as boolean }
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400">💬</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">SMS Alerts</h3>
                        <p className="text-sm text-muted-foreground">Critical alerts via text message</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={formData.notifications.sms}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked as boolean }
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">You're All Set!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your Propsberg account is ready. Start exploring real-time market data,
                create your first trading scenario, and unlock the power of AI-driven insights.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-md mx-auto">
              <h3 className="font-semibold text-foreground mb-2">Your Setup Summary</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Experience: {formData.experience || 'Not specified'}</p>
                <p>Markets: {formData.markets.length > 0 ? formData.markets.join(', ') : 'None selected'}</p>
                <p>Notifications: {Object.entries(formData.notifications).filter(([_, v]) => v).length} enabled</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-950/20 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Link href="/">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 flex items-center gap-2">
                Get Started
                <TrendingUp className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
