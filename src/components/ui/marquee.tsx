import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div 
      className={cn(
        "w-full overflow-hidden relative",
        className
      )} 
      {...props}
    >
      <div 
        className="flex animate-marquee min-w-max"
        style={{
          animation: `marquee 45s linear infinite`,
          animationPlayState: pauseOnHover ? 'paused' : 'running'
        }}
      >
        <div className="flex shrink-0 items-center">
          {children}
        </div>
        <div className="flex shrink-0 items-center">
          {children}
        </div>
        <div className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  )
} 