"use client"

import React from "react"

interface BreathingTextProps {
  text: string
  speed?: "slow" | "medium" | "fast"
  intensity?: "subtle" | "normal" | "dramatic"
  withScale?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function BreathingText({
  text,
  speed = "medium",
  intensity = "normal",
  withScale = false,
  className = "",
  style = {},
}: BreathingTextProps) {
  // Build the class name based on props
  const classes = [
    "breathing-title",
    `breathing-${speed}`,
    `breathing-${intensity}`,
    withScale ? "breathing-with-scale" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <h1 className={classes} style={style}>
      {text}
    </h1>
  )
}
