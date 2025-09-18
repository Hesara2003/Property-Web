"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!barRef.current) return
    const el = barRef.current
    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[200]">
      <div
        ref={barRef}
        className="origin-left h-full bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 scale-x-0"
      />
    </div>
  )
}

export default ScrollProgressBar