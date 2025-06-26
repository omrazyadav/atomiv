"use client";

import { cn } from "@/lib/utils";
import { useEffect, useId, useState } from "react";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const [squares, setSquares] = useState<Array<{ id: number; pos: [number, number] }>>([]);

  // Generate squares with fixed positions
  useEffect(() => {
    const newSquares = Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      pos: [
        Math.floor(Math.random() * 50), // Random x position (0-50 grid units)
        Math.floor(Math.random() * 30), // Random y position (0-30 grid units)
      ] as [number, number],
    }));
    setSquares(newSquares);
  }, [numSquares]);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={`${id}-pattern`}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5,${height}V.5H${width}`}
            fill="none"
            stroke="rgb(156 163 175 / 0.2)"
            strokeDasharray={strokeDasharray}
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <rect
            key={`${id}-${index}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="rgb(156 163 175 / 0.3)"
            strokeWidth={0}
          >
            <animate
              attributeName="opacity"
              values={`0;${maxOpacity};0`}
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${index * 0.1 + Math.random() * repeatDelay}s`}
            />
          </rect>
        ))}
      </svg>
    </svg>
  );
}
