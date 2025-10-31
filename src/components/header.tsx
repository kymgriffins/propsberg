import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Settings, Clock } from "lucide-react"

interface AssetTickerProps {
  symbol: string
  price: number
  change: number
}

function AssetTicker({ symbol, price, change }: AssetTickerProps) {
  const isPositive = change > 0
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-card-navy border border-border-slate">
      <span className="text-sm font-medium text-text-secondary">{symbol}</span>
      <span className="text-sm text-text-primary">{price.toFixed(2)}</span>
      <span className={`text-xs ${isPositive ? 'text-bullish-green' : 'text-bearish-red'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    </div>
  )
}

interface LiveIndicatorProps {
  isLive?: boolean
}

function LiveIndicator({ isLive = true }: LiveIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-bullish-green live-pulse' : 'bg-text-tertiary'}`} />
      <span className="text-sm text-text-secondary">{isLive ? 'LIVE' : 'OFFLINE'}</span>
    </div>
  )
}

interface RegimeIndicatorProps {
  regime: 'RISK_ON' | 'RISK_OFF' | 'MIXED' | 'NEUTRAL'
  confidence: number
}

function RegimeIndicator({ regime, confidence }: RegimeIndicatorProps) {
  const getRegimeColor = () => {
    switch (regime) {
      case 'RISK_ON': return 'bullish'
      case 'RISK_OFF': return 'bearish'
      case 'MIXED': return 'neutral'
      case 'NEUTRAL': return 'info'
      default: return 'secondary'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={getRegimeColor()}>{regime.replace('_', ' ')}</Badge>
      <span className="text-xs text-text-tertiary">{confidence}%</span>
    </div>
  )
}

interface ReadinessScoreProps {
  score: number
}

function ReadinessScore({ score }: ReadinessScoreProps) {
  const getScoreColor = () => {
    if (score >= 80) return 'bullish'
    if (score >= 60) return 'neutral'
    return 'bearish'
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-secondary">Readiness</span>
      <Badge variant={getScoreColor()}>{score}%</Badge>
    </div>
  )
}

export function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <header className="bg-card-navy border-b border-border-slate">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Propsberg</h1>
          </div>

          {/* Market Status */}
          <div className="flex items-center gap-6">
            <LiveIndicator />
            <RegimeIndicator regime="RISK_ON" confidence={85} />
            <ReadinessScore score={35} />
          </div>

          {/* Asset Tickers */}
          <div className="flex items-center gap-2">
            <AssetTicker symbol="ES" price={5248.25} change={0.3} />
            <AssetTicker symbol="NQ" price={18235.50} change={0.6} />
            <AssetTicker symbol="CL" price={85.25} change={-0.8} />
          </div>

          {/* Time & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-secondary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{currentTime}</span>
            </div>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
