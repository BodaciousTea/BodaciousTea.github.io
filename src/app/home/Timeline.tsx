"use client"

import { useState, useRef, useEffect } from "react"
import Layout from "./watch/Layout"
import timelineData from "@/assets/timeline.json"
import "@/styles/timeline.css"

type TimelineItem = {
  year: string
  title?: string
  description: string
  image: string
}

const timelineDataTyped = timelineData as TimelineItem[]

export default function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isThrottled = useRef(false)

  const scrollToSlide = (index: number) => {
    const container = containerRef.current
    if (!container) return

    container.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    })
  }

  const isTimelineInView = () => {
    if (!timelineRef.current) return false
    const rect = timelineRef.current.getBoundingClientRect()
    return rect.top <= 10 && rect.bottom > 0
  }

  const handleWheel = (e: WheelEvent) => {
    if (!isTimelineInView()) return

    e.preventDefault()

    if (isThrottled.current) return
    isThrottled.current = true
    setTimeout(() => (isThrottled.current = false), 800)

    if (e.deltaY > 0) {
      // Scroll down
      if (currentIndex < timelineDataTyped.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      }
    } else {
      // Scroll up
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      } else {
        // Only if at first slide, allow to scroll up
        window.removeEventListener("wheel", handleWheelStrict, { passive: false } as EventListenerOptions)
        setTimeout(() => {
          window.addEventListener("wheel", handleWheelStrict, { passive: false } as EventListenerOptions)
        }, 1000)
      }
    }
  }

  const handleWheelStrict = (e: Event) => {
    handleWheel(e as WheelEvent)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    window.addEventListener("wheel", handleWheelStrict, { passive: false } as EventListenerOptions)
    return () => {
      window.removeEventListener("wheel", handleWheelStrict, { passive: false } as EventListenerOptions)
    }
  }, [currentIndex])

  useEffect(() => {
    scrollToSlide(currentIndex)
  }, [currentIndex])

  // Calculate timeline width based on number of slides
  const timelineWidth = Math.max((timelineDataTyped.length - 1) * 40, 120) // Minimum width of 120px

  return (
    <Layout>
      <div ref={timelineRef} className="h-screen overflow-hidden bg-black text-white relative">
        {/* Slide counter - moved to top-right */}
        <div className="absolute top-6 right-6 text-white/70 text-sm font-medium z-10">
          {currentIndex + 1}/{timelineDataTyped.length}
        </div>

        <div ref={containerRef} className="flex h-screen overflow-x-hidden overflow-y-hidden snap-x snap-mandatory">
          {timelineDataTyped.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-screen h-screen flex items-center justify-center snap-center px-6"
            >
              <div className="max-w-6xl flex items-center gap-12 w-full">
                {/* Left Text */}
                <div className="w-1/2">
                  {/* Title now appears first */}
                  {item.title && <h2 className="text-6xl font-bold mb-4">{item.title}</h2>}

                  {/* Thin line separator */}
                  {item.title && <div className="h-px bg-white/30 w-full mb-6"></div>}

                  {/* Description */}
                  <p className="text-lg leading-relaxed">{item.description}</p>
                </div>

                {/* Right Image */}
                <div className="w-1/2 flex justify-end">
                  <img
                    src={`/images/timeline/${item.image}`}
                    alt={item.title || ""}
                    className="rounded-lg max-h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline line navigation - bottom of screen, right-aligned */}
        <div className="absolute bottom-10 right-10">
          <div
            className="relative"
            style={{ width: `${timelineWidth}px`, height: "20px" }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks on the container
          >
            {/* The connecting line - positioned exactly in the middle of the dots */}
            <div
              className="absolute bg-white/30 pointer-events-none" // Make line non-interactive
              style={{
                height: "2px",
                left: "0",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 0,
              }}
            />

            {/* The progress line that grows as you advance */}
            <div
              className="absolute bg-white transition-all duration-500 ease-in-out pointer-events-none" // Make line non-interactive
              style={{
                height: "2px",
                width: `${(currentIndex / (timelineDataTyped.length - 1)) * 100}%`,
                top: "50%",
                transform: "translateY(-50%)",
                left: "0",
                zIndex: 0,
              }}
            />

            {/* The dots */}
            {timelineDataTyped.map((_, index) => {
              const position = timelineDataTyped.length === 1 ? 0 : (index / (timelineDataTyped.length - 1)) * 100

              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation() // Prevent event bubbling
                    handleDotClick(index)
                  }}
                  className={`absolute w-4 h-4 rounded-full transition-all duration-300 z-10 cursor-pointer ${
                    index <= currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                  style={{
                    left: `${position}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
