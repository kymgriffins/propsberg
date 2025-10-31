"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Settings,
  Home,
  Activity,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react"

interface SidebarProps {
  className?: string
}

const navigationItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
    active: true,
    badge: null
  },
  {
    icon: BarChart3,
    label: "Market Analysis",
    href: "/analysis",
    active: false,
    badge: null
  },
  {
    icon: TrendingUp,
    label: "Portfolio",
    href: "/portfolio",
    active: false,
    badge: "PRO"
  },
  {
    icon: Activity,
    label: "Live Trading",
    href: "/trading",
    active: false,
    badge: null
  },
  {
    icon: Target,
    label: "Scenarios",
    href: "/scenarios",
    active: false,
    badge: "3"
  },
  {
    icon: AlertTriangle,
    label: "Alerts",
    href: "/alerts",
    active: false,
    badge: "2"
  },
  {
    icon: Zap,
    label: "Signals",
    href: "/signals",
    active: false,
    badge: null
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    active: false,
    badge: null
  }
]

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">Propsberg</h2>
              <p className="text-xs text-sidebar-foreground/70">Pro Trading</p>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Button
              key={item.href}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10 px-3 transition-all duration-200 hover:scale-105",
                item.active && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
                collapsed ? "px-2" : "px-3",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className={cn(
                "flex-shrink-0 transition-all duration-200",
                collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"
              )} />
              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <Badge
                  variant={item.badge === "PRO" ? "default" : "secondary"}
                  className={cn(
                    "ml-auto text-xs px-1.5 py-0.5 h-5 min-w-[20px] flex items-center justify-center",
                    item.badge === "PRO" && "bg-gradient-to-r from-cyan-400 to-blue-500 text-white",
                    item.badge !== "PRO" && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {/* Theme Toggle */}
        <div className="flex justify-center">
          <ThemeToggle />
        </div>

        {/* Connection Status */}
        {!collapsed && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50 animate-fade-in">
            <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground">Live Connection</p>
              <p className="text-xs text-sidebar-foreground/70">Real-time data active</p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  )
}
