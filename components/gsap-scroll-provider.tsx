"use client"
import { useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GSAPScrollProviderProps {
  children: React.ReactNode
}

/**
 * Wrap page content to enable automatic GSAP scroll animations.
 * Elements can opt-in via data attributes:
 *  data-gsap="fade-up" | "fade-in" | "scale-in"
 * Optional modifiers:
 *  data-gsap-delay="0.2" (seconds)
 *  data-gsap-stagger="0.15" (will stagger children)
 */
export function GSAPScrollProvider({ children }: GSAPScrollProviderProps) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(document.body)

      // Generic mappings
      const base = {
        "fade-up": { y: 40, opacity: 0 },
        "fade-in": { opacity: 0 },
        "scale-in": { scale: 0.9, opacity: 0 },
      } as const

      q('[data-gsap]').forEach((el: Element) => {
        const type = (el as HTMLElement).getAttribute('data-gsap') as keyof typeof base
        const delay = parseFloat((el as HTMLElement).getAttribute('data-gsap-delay') || '0')
        const staggerVal = parseFloat((el as HTMLElement).getAttribute('data-gsap-stagger') || '0')
        const config = base[type] || base['fade-up']

        if (staggerVal > 0) {
          const children = Array.from(el.children)
          gsap.from(children, {
            ...config,
            duration: 0.9,
            ease: 'power3.out',
            delay,
            stagger: staggerVal,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        } else {
          gsap.from(el, {
            ...config,
            duration: 0.9,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
      // Basic parallax translate
      q('[data-parallax]')?.forEach((el: Element) => {
        // Allow opting out in favor of pure CSS fixed parallax via data-parallax-fixed
        if ((el as HTMLElement).hasAttribute('data-parallax-fixed')) return
        const speed = parseFloat((el as HTMLElement).getAttribute('data-parallax-speed') || '0.4')
        const scale = parseFloat((el as HTMLElement).getAttribute('data-parallax-scale') || '1')
        const fade = (el as HTMLElement).hasAttribute('data-parallax-fade')
        gsap.to(el, {
          yPercent: speed * -30,
          scale,
          opacity: fade ? 0.8 : 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Section divider drift (subtle decorative motion)
      q('[data-divider]')?.forEach((el: Element) => {
        const dir = (el as HTMLElement).getAttribute('data-divider-dir') || 'left'
        const xFrom = dir === 'left' ? -40 : 40
        gsap.fromTo(
          el,
          { xPercent: xFrom, opacity: 0 },
          {
            xPercent: 0,
            opacity: 0.35,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: true,
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return <>{children}</>
}

export default GSAPScrollProvider