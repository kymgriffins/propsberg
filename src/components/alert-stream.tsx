import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pause, Filter, FileText } from "lucide-react"

interface AlertItemProps {
  timestamp: string
  type: 'compression' | 'volume' | 'conflict' | 'breakout' | 'liquidity'
  urgency: 'high' | 'medium' | 'low'
  message: string
}

function AlertItem({ timestamp, type, urgency, message }: AlertItemProps) {
  const getUrgencyColor = () => {
    switch (urgency) {
      case 'high': return 'bearish'
      case 'medium': return 'neutral'
      case 'low': return 'info'
      default: return 'secondary'
    }
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'compression': return '🗜️'
      case 'volume': return '📊'
      case 'conflict': return '⚠️'
      case 'breakout': return '🚀'
      case 'liquidity': return '💧'
      default: return '📢'
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-card-navy border border-border-slate hover:border-primary-blue/50 transition-colors">
      <div className="text-lg">{getTypeIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-text-tertiary">{timestamp}</span>
          <Badge variant={getUrgencyColor()} className="text-xs">
            {urgency.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-text-primary leading-relaxed">{message}</p>
      </div>
    </div>
  )
}

export function AlertStream() {
  const alerts = [
    {
      timestamp: "09:45",
      type: "compression" as const,
      urgency: "high" as const,
      message: "NY Opening Range at 34% compression - coil tightening"
    },
    {
      timestamp: "09:42",
      type: "volume" as const,
      urgency: "medium" as const,
      message: "Price +0.3% but volume 1.8x average - strong conviction"
    },
    {
      timestamp: "09:40",
      type: "conflict" as const,
      urgency: "high" as const,
      message: "NQ leading +0.6% vs RTY lagging - selective risk-on"
    },
    {
      timestamp: "09:38",
      type: "breakout" as const,
      urgency: "medium" as const,
      message: "ES breaking above 5250 resistance level"
    },
    {
      timestamp: "09:35",
      type: "liquidity" as const,
      urgency: "low" as const,
      message: "Large liquidity cluster identified at 5240.50"
    },
    {
      timestamp: "09:32",
      type: "volume" as const,
      urgency: "medium" as const,
      message: "CL volume spike 2.1x average - potential reversal signal"
    }
  ]

  return (
    <Card className="h-[600px] bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            📰 Market Intelligence
          </span>
          <Badge variant="secondary">LIVE</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[450px] overflow-y-auto">
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <AlertItem
              key={index}
              timestamp={alert.timestamp}
              type={alert.type}
              urgency={alert.urgency}
              message={alert.message}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t border-border-slate pt-4">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
