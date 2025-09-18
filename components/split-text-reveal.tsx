"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SplitTextRevealProps {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  delay?: number
}

export function SplitTextReveal({ text, className = "", as = "h2", delay = 0 }: SplitTextRevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const words = text.split(/\s+/)
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="split-word inline-block overflow-hidden"><span class="block will-change-transform">${w}&nbsp;</span></span>`
      )
      .join("")

    const innerSpans = el.querySelectorAll<HTMLElement>(".split-word > span")

    gsap.set(innerSpans, { yPercent: 110, opacity: 0 })
    gsap.to(innerSpans, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.05,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })
  }, [text, delay])

  const Tag = as as any
  return <Tag ref={ref} className={className} data-split>{text}</Tag>
}

export default SplitTextReveal