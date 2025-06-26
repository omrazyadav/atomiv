'use client'

import { cn } from "@/lib/utils"

interface SimpleGridPatternProps {
  className?: string
}

export function SimpleGridPattern({ className }: SimpleGridPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 size-full opacity-30",
        "[background-image:linear-gradient(rgba(156,163,175,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px)]",
        "[background-size:50px_50px]",
        className
      )}
      style={{
        backgroundPosition: "0 0, 0 0",
      }}
    >
      {/* Animated dots overlay */}
      <div className="absolute inset-0 animate-pulse">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400/20 rounded-full animate-fade-in-out"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
} 