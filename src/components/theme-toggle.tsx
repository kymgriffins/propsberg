"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark" | "system"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  // Only run on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme("system")
      applyTheme(systemTheme)
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", newTheme === "dark")
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <div className="w-4 h-4" />
      </Button>
    )
  }

  const getCurrentIcon = () => {
    if (theme === "system") {
      return <Monitor className="w-4 h-4" />
    }

    return theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0 hover:bg-sidebar-accent"
        onClick={() => {
          const themes: Theme[] = ["light", "dark", "system"]
          const currentIndex = themes.indexOf(theme)
          const nextTheme = themes[(currentIndex + 1) % themes.length]
          handleThemeChange(nextTheme)
        }}
        title={`Current theme: ${theme}`}
      >
        {getCurrentIcon()}
      </Button>

      {/* Theme indicator dots */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
        <div className={cn(
          "w-1 h-1 rounded-full transition-colors",
          theme === "light" ? "bg-cyan-400" : "bg-muted-foreground/30"
        )} />
        <div className={cn(
          "w-1 h-1 rounded-full transition-colors",
          theme === "dark" ? "bg-cyan-400" : "bg-muted-foreground/30"
        )} />
        <div className={cn(
          "w-1 h-1 rounded-full transition-colors",
          theme === "system" ? "bg-cyan-400" : "bg-muted-foreground/30"
        )} />
      </div>
    </div>
  )
}

// Alternative dropdown version for more control
export function ThemeToggleDropdown() {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme("system")
      applyTheme(systemTheme)
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", newTheme === "dark")
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
    setIsOpen(false)
  }

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="w-9 h-9 p-0" />
  }

  const themes = [
    { value: "light" as Theme, label: "Light", icon: Sun },
    { value: "dark" as Theme, label: "Dark", icon: Moon },
    { value: "system" as Theme, label: "System", icon: Monitor }
  ]

  const currentTheme = themes.find(t => t.value === theme)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0 hover:bg-sidebar-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentTheme && <currentTheme.icon className="w-4 h-4" />}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-10 z-50 w-32 bg-popover border border-border rounded-md shadow-lg animate-in fade-in-0 zoom-in-95">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <Button
                  key={themeOption.value}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 h-9 text-sm",
                    theme === themeOption.value && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleThemeChange(themeOption.value)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {themeOption.label}
                </Button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
