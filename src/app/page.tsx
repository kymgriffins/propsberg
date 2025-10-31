import { Header } from "@/components/header"
import { AssetMatrix } from "@/components/asset-matrix"
import { ScenarioBuilder } from "@/components/scenario-builder"
import { AlertStream } from "@/components/alert-stream"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-foreground">Trading Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time market intelligence & scenario analysis
              </p>
            </div>

            <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                PRO Plan
              </Badge>
              <Badge variant="outline" className="border-green-400/50 text-green-400">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 pt-0">
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border-white/10 animate-scale-in hover-lift hover-glow cursor-pointer group transition-fluid">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-cyan-400 transition-colors">Market Regime</h3>
            <div className="text-2xl font-bold text-foreground flex items-center gap-2 group-hover:text-cyan-300 transition-colors">
              RISK_ON
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:animate-glow"></div>
            </div>
            <p className="text-xs text-green-400 mt-1 animate-float">+85% confidence</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border-white/10 animate-scale-in hover-lift hover-glow cursor-pointer group transition-fluid" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-cyan-400 transition-colors">Active Scenarios</h3>
            <div className="text-2xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">3</div>
            <p className="text-xs text-cyan-400 mt-1 animate-float">2 triggered today</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border-white/10 animate-scale-in hover-lift hover-glow cursor-pointer group transition-fluid" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-cyan-400 transition-colors">Alert Accuracy</h3>
            <div className="text-2xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">94.2%</div>
            <p className="text-xs text-green-400 mt-1 animate-float">+2.1% this week</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border-white/10 animate-scale-in hover-lift hover-glow cursor-pointer group transition-fluid" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-cyan-400 transition-colors">Assets Tracked</h3>
            <div className="text-2xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">5</div>
            <p className="text-xs text-purple-400 mt-1 animate-float">ES, NQ, RTY, CL, GC</p>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Market Context */}
          <div className="lg:col-span-4 space-y-6 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
            <AssetMatrix />
          </div>

          {/* Center - Primary Analysis */}
          <div className="lg:col-span-5 space-y-6 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <ScenarioBuilder />
          </div>

          {/* Right Panel - Intelligence */}
          <div className="lg:col-span-3 space-y-6 animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
            <AlertStream />
          </div>
        </div>
      </div>
    </div>
  )
}
