"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Shield, Clock, Users, TrendingUp, LineChart } from "lucide-react"

interface MetricItem {
  id: number
  label: string
  value: string
  icon: any
  headline: string
  description: string
  bullets: string[]
  footnote?: string
}

const metrics: MetricItem[] = [
  {
    id: 1,
    label: "Listings Islandwide",
    value: "8,200+",
    icon: Building2,
    headline: "Curated, High-Signal Inventory",
    description:
      "We prioritise verified, market-relevant listings across Western, Southern, Central & Northern provinces – reducing noise and search fatigue.",
    bullets: [
      "Dynamic data freshness scoring",
      "Title & documentation readiness flags",
      "Location tier & demand weighting",
      "Anomaly & duplicate suppression",
    ],
    footnote: "Updated daily with new coastal, urban & mixed-use assets.",
  },
  {
    id: 2,
    label: "Successful Matches",
    value: "92%",
    icon: Shield,
    headline: "High Intent Match Quality",
    description:
      "Our multi-factor relevance engine scores buyer requirements against supply attributes, surfacing best-fit options earlier in the cycle.",
    bullets: [
      "Composite suitability index",
      "Behavioural refinement loop",
      "Risk & compliance filters",
      "Early disqualification logic",
    ],
    footnote: "Metric reflects qualified engagement → verified seller handoff conversion.",
  },
  {
    id: 3,
    label: "Avg Response",
    value: "12hrs",
    icon: Clock,
    headline: "Rapid Seller Signal Relay",
    description:
      "Verified sellers operate within SLA guardrails. We escalate stalled threads and recommend alternates proactively.",
    bullets: [
      "Escalation routing & alerts",
      "Conversation readiness scoring",
      "Inactivity detection triggers",
      "Buyer-side timeline guidance",
    ],
    footnote: "Median initial response time across qualified enquiry cohort (last 30d).",
  },
  {
    id: 4,
    label: "Verified Buyers",
    value: "5,000+",
    icon: Users,
    headline: "Serious Demand Graph",
    description:
      "We assess buyer authenticity via behavioural consistency, profile completeness and interaction legitimacy heuristics.",
    bullets: [
      "Progressive profile enrichment",
      "Fraud & spam suppression",
      "Cross-session engagement model",
      "Acquisition channel quality mix",
    ],
    footnote: "Only active, identity-cleared accounts included.",
  },
  {
    id: 5,
    label: "Match Acceleration",
    value: "3.4×",
    icon: TrendingUp,
    headline: "Speed vs Traditional Discovery",
    description:
      "Time-to-viable shortlist compresses through structured requirement capture + adaptive filtering & iterative improvement.",
    bullets: [
      "Requirement entropy reduction",
      "Adaptive shortlist convergence",
      "Duplicate intent pruning",
      "Context-preserving refinement",
    ],
    footnote: "Factor vs typical manual multi-portal search behaviour.",
  },
  {
    id: 6,
    label: "Engagement Retention",
    value: "87%",
    icon: LineChart,
    headline: "Stable Mid-Funnel Momentum",
    description:
      "Buyers remain active through structured follow-up cues, contextual nudges and transparent progress perception.",
    bullets: [
      "Drop-off interception prompts",
      "Momentum preservation signals",
      "Refinement assist suggestions",
      "Relevance decay detection",
    ],
    footnote: "Rolling 60-day cohort retention across active inquiry sessions.",
  },
]

export function AnalyticsSection() {
  const [active, setActive] = useState<MetricItem>(metrics[0])
  return (
    <section id="analytics" className="relative py-28" data-gsap="fade-up" data-gsap-stagger="0.12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[340px] h-[340px] bg-gradient-to-br from-blue-300/20 to-violet-300/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-8">
          <Badge variant="secondary" className="px-4 py-1 text-[11px] tracking-wider">Platform Analytics</Badge>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
            Performance & Trust Signals
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Real-time operational indicators reflecting marketplace depth, velocity and quality integrity.
          </p>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-5 space-y-5">
            {metrics.map(item => {
              const Icon = item.icon
              const isActive = active.id === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item)}
                  className={`w-full group text-left relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all ${
                    isActive
                      ? 'border-blue-500/50 bg-gradient-to-br from-blue-600/15 to-violet-600/10 shadow-lg shadow-blue-600/10'
                      : 'border-border/60 hover:border-blue-400/50 bg-background/40'
                  }`}
                  data-gsap="fade-up"
                >
                  <div className="p-5 flex items-center gap-5">
                    <div className={`h-16 w-16 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white'
                        : 'bg-gradient-to-br from-muted to-background text-blue-600'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-xs font-medium tracking-wide uppercase ${
                          isActive ? 'text-blue-600' : 'text-muted-foreground'
                        }`}>{item.label}</span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-600/10 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-end gap-3">
                        <div className="text-3xl font-light bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                          {item.value}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.headline}
                      </p>
                    </div>
                  </div>
                  {isActive && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500" />}
                </button>
              )
            })}
          </div>
          <div className="lg:col-span-7">
            <Card className="relative overflow-hidden border-blue-500/30 bg-white/70 backdrop-blur-xl shadow-xl" data-gsap="fade-in">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/25 to-violet-400/10 blur-3xl" />
              </div>
              <CardContent className="relative p-10 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-[11px] font-medium tracking-wide text-blue-700">
                    Metric {active.id} • {active.label}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    {active.headline}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {active.description}
                  </p>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                  {active.bullets.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
                      <span className="text-muted-foreground leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                {active.footnote && (
                  <p className="text-[11px] text-muted-foreground/70 pt-2 border-t border-border/60">
                    {active.footnote}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsSection
