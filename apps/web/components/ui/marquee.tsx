"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover,
  vertical,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-[var(--gap)]",
          vertical
            ? reverse
              ? "animate-marquee-vertical-reverse"
              : "animate-marquee-vertical"
            : reverse
            ? "animate-marquee-reverse"
            : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        {...props}
      />

      <div
        className={cn(
          "flex shrink-0 gap-[var(--gap)]",
          vertical
            ? reverse
              ? "animate-marquee-vertical-reverse"
              : "animate-marquee-vertical"
            : reverse
            ? "animate-marquee-reverse"
            : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden
      >
        {props.children}
      </div>
    </div>
  )
}
