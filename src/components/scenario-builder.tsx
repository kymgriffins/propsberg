import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, TrendingUp, Volume2, Target } from "lucide-react"

interface ScenarioProgressProps {
  name: string
  conditionsMet: number
  totalConditions: number
  confidence: number
}

function ScenarioProgress({ name, conditionsMet, totalConditions, confidence }: ScenarioProgressProps) {
  const progress = (conditionsMet / totalConditions) * 100

  const getConfidenceColor = () => {
    if (confidence >= 80) return 'bullish'
    if (confidence >= 60) return 'neutral'
    return 'bearish'
  }

  return (
    <div className="mb-6 p-4 rounded-lg bg-card-navy border border-border-slate">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
        <Badge variant={getConfidenceColor()}>{confidence}% Confidence</Badge>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1">
          <div className="flex justify-between text-sm text-text-secondary mb-1">
            <span>Progress</span>
            <span>{conditionsMet}/{totalConditions}</span>
          </div>
          <div className="w-full bg-border-slate rounded-full h-2">
            <div
              className="bg-primary-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ConditionItemProps {
  type: 'time' | 'price' | 'volume' | 'liquidity'
  label: string
  met: boolean
}

function ConditionItem({ type, label, met }: ConditionItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'time': return <Clock className="w-4 h-4" />
      case 'price': return <TrendingUp className="w-4 h-4" />
      case 'volume': return <Volume2 className="w-4 h-4" />
      case 'liquidity': return <Target className="w-4 h-4" />
      default: return <Circle className="w-4 h-4" />
    }
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
      met
        ? 'bg-bullish-green/10 border-bullish-green/30'
        : 'bg-card-navy border-border-slate'
    }`}>
      <div className={`p-1 rounded-full ${
        met ? 'bg-bullish-green text-white' : 'bg-text-tertiary text-text-secondary'
      }`}>
        {met ? <CheckCircle className="w-4 h-4" /> : getIcon()}
      </div>
      <span className={`text-sm ${met ? 'text-text-primary' : 'text-text-secondary'}`}>
        {label}
      </span>
    </div>
  )
}

export function ScenarioBuilder() {
  const conditions = [
    { type: 'time' as const, label: 'Within NY Kill Zone (09:30-10:00)', met: true },
    { type: 'price' as const, label: 'Range compression < 60%', met: true },
    { type: 'volume' as const, label: 'Volume > 1.5x average', met: true },
    { type: 'liquidity' as const, label: 'Test liquidity at 5250.25', met: false },
    { type: 'price' as const, label: 'Previous high resistance broken', met: false },
    { type: 'volume' as const, label: 'Institutional accumulation detected', met: false },
  ]

  const conditionsMet = conditions.filter(c => c.met).length
  const totalConditions = conditions.length
  const confidence = Math.round((conditionsMet / totalConditions) * 100)

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎯 Scenario Builder
        </CardTitle>
        <CardDescription>
          Build "If This → Then That" trading scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Scenario Progress */}
        <ScenarioProgress
          name="NY Open Breakout"
          conditionsMet={conditionsMet}
          totalConditions={totalConditions}
          confidence={confidence}
        />

        {/* Conditions Checklist */}
        <div className="space-y-3 mb-6">
          {conditions.map((condition, index) => (
            <ConditionItem
              key={index}
              type={condition.type}
              label={condition.label}
              met={condition.met}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            Add Condition
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            Save Scenario
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            Set Alert
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
