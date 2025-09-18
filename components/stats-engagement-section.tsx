"use client"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Shield, Clock, Users, TrendingUp, LineChart } from "lucide-react"

interface StatMeta {
  label: string
  value: string
  icon: any
  short: string
}

const STATS: StatMeta[] = [
  { label: "Listings Islandwide", value: "8200+", icon: Building2, short: "Active quality listings" },
  { label: "Successful Matches", value: "92%", icon: Shield, short: "Qualified match rate" },
  { label: "Avg Response (hrs)", value: "12", icon: Clock, short: "Median first reply" },
  { label: "Verified Buyers", value: "5000+", icon: Users, short: "Serious active demand" },
  { label: "Match Acceleration (×)", value: "3.4", icon: TrendingUp, short: "Faster shortlist speed" },
  { label: "Engagement Retention (%)", value: "87", icon: LineChart, short: "Mid‑funnel continuity" },
]

function useCountUp(target: number, play: boolean, duration = 1600) {
  const [val, setVal] = useState(0)
  const startRef = useRef<number | null>(null)
  useEffect(() => {
    if (!play) return
    let raf: number
    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts
      const progress = Math.min(1, (ts - startRef.current) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(target * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, play, duration])
  return val
}

export function StatsEngagementSection() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setInView(true)),
      { threshold: 0.2 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="analytics" className="relative py-24" data-gsap="fade-up" data-gsap-stagger="0.08">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-br from-blue-300/20 to-violet-300/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-6">
          <Badge variant="secondary" className="px-4 py-1 text-[11px] tracking-wider">Key Platform Stats</Badge>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">Snapshot Performance Metrics</h2>
          <p className="text-muted-foreground text-base">Fast overview of core marketplace signals.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {STATS.map((s, i) => {
            const Icon = s.icon
            const numeric = parseFloat(s.value.replace(/[^0-9.]/g, "")) || 0
            const suffixMatch = s.value.match(/[^0-9.]+$/)
            const suffix = suffixMatch ? suffixMatch[0] : ""
            const count = useCountUp(numeric, inView, 1300 + i * 100)
            return (
              <Card
                key={s.label}
                data-gsap="fade-up"
                className="relative overflow-hidden border border-border/60 bg-background/60 backdrop-blur-sm hover:border-blue-500/50 transition-all group hover:shadow-xl"
              >
                <CardContent className="p-8 flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-muted to-background text-blue-600 group-hover:from-blue-600 group-hover:to-violet-600 group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide font-medium text-muted-foreground mb-1">{s.label}</div>
                      <div className="text-4xl font-light bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent flex items-baseline gap-1">
                        <span>{count.toLocaleString()}</span>
                        {suffix && <span className="text-lg font-normal opacity-80">{suffix}</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">
                    {s.short}
                  </p>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsEngagementSection
