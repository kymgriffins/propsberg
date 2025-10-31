"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Settings,
  Home,
  Activity,
  Zap,
  Target,
} from "lucide-react"

const navigationItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
    badge: null
  },
  {
    icon: BarChart3,
    label: "Market Analysis",
    href: "/analysis",
    badge: null
  },
  {
    icon: TrendingUp,
    label: "Portfolio",
    href: "/portfolio",
    badge: "PRO"
  },
  {
    icon: Activity,
    label: "Live Trading",
    href: "/trading",
    badge: null
  },
  {
    icon: Target,
    label: "Scenarios",
    href: "/scenarios",
    badge: "3"
  },
  {
    icon: AlertTriangle,
    label: "Alerts",
    href: "/alerts",
    badge: "2"
  },
  {
    icon: Zap,
    label: "Signals",
    href: "/signals",
    badge: null
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    badge: null
  }
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sidebar-primary-foreground">
            <TrendingUp className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Propsberg</span>
            <span className="truncate text-xs">Pro Trading</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                        {item.badge && (
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
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-green-400/20">
                <div className="size-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-xs font-medium">Live Connection</span>
                <span className="truncate text-xs text-muted-foreground">Real-time data active</span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center justify-center px-2 py-2">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
