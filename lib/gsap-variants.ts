import { gsap } from "gsap"

export const variants = {
  fadeUp: { y: 40, opacity: 0 },
  fadeIn: { opacity: 0 },
  scaleIn: { scale: 0.9, opacity: 0 },
  rotateIn: { rotation: 4, y: 20, opacity: 0 },
}

export type VariantKey = keyof typeof variants

export function animateOnce(
  target: gsap.TweenTarget,
  key: VariantKey,
  opts: Partial<gsap.TweenVars> & { trigger?: Element | string } = {}
) {
  const base = variants[key]
  return gsap.from(target, {
    ...base,
    duration: 0.9,
    ease: "power3.out",
    ...(opts.trigger
      ? {
          scrollTrigger: {
            trigger: opts.trigger,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      : {}),
    ...opts,
  })
}

export function batchFadeUp(selector: string) {
  gsap.utils.toArray(selector).forEach((el, i) => {
    gsap.from(el as Element, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el as Element,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    })
  })
}
