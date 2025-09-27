"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Users, Home, ArrowRight, Sparkles, FileText, UserCheck, Clock, CheckCircle2 } from "lucide-react"
import { SplitTextReveal } from "@/components/split-text-reveal"

interface Step {
  id: number
  title: string
  icon: any
  headline: string
  description: string
  bullets: string[]
  cta?: string
}

const steps: Step[] = [
  {
    id: 1,
    title: 'List & Request',
    icon: Search,
    headline: 'Sellers List, Buyers Submit Requests',
    description: 'Property sellers list their properties with complete details and photos. Buyers submit specific property requests with their requirements, budget, and preferred locations.',
    bullets: [
      'Sellers: Upload property listings with photos',
      'Buyers: Submit detailed property requirements', 
      'Location, budget & property type specifications',
      'Comprehensive property database building',
    ],
    cta: 'Get Started',
  },
  {
    id: 2,
    title: 'System Matching & Availability Check',
    icon: Users,
    headline: 'Automated Matching with Seller Verification',
    description: 'Our system automatically matches buyer requests with listed properties. We then contact sellers to verify current availability and gather additional property details.',
    bullets: [
      'AI-powered property-request matching',
      'Direct seller availability confirmation',
      'Real-time property status updates',
      'Initial compatibility assessment',
    ],
    cta: 'See Matching',
  },
  {
    id: 3,
    title: 'Manual Verification & Delivery',
    icon: Home,
    headline: 'Admin Verification & 24-Hour Delivery',
    description: 'Our admin team manually verifies all property details by contacting sellers directly, then delivers verified matches to buyers within 24 hours with complete seller information.',
    bullets: [
      'Manual verification by admin team',
      'Direct seller contact for confirmation',
      'Quality-assured property information',
      '24-hour guaranteed delivery to buyers',
    ],
    cta: 'Start Matching',
  },
]

export function HowItWorksSection() {
  const [active, setActive] = useState<Step>(steps[0])

  return (
    <section className="relative py-28" data-gsap="fade-up" data-gsap-stagger="0.12" id="how-it-works">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-gradient-to-br from-blue-200/30 to-violet-200/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-8 animate-fade-in-up">
          <Badge variant="secondary" className="px-4 py-1 text-[11px] tracking-wider">Buying Journey</Badge>
          <SplitTextReveal
            text="How Property Scout Works in Sri Lanka"
            as="h2"
            className="text-4xl md:text-5xl font-light tracking-tight text-balance"
          />
          <p className="text-muted-foreground text-lg leading-relaxed">
            A comprehensive platform connecting property sellers and buyers through intelligent matching, verification, and delivery within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Timeline / selector */}
          <div className="lg:col-span-5 space-y-6">
            {steps.map(step => {
              const Icon = step.icon
              const isActive = active.id === step.id
              return (
                <button
                  key={step.id}
                  onClick={() => setActive(step)}
                  className={`w-full group text-left relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all ${
                    isActive
                      ? 'border-blue-500/50 bg-gradient-to-br from-blue-600/15 to-violet-600/10 shadow-lg shadow-blue-600/10'
                      : 'border-border/60 hover:border-blue-400/50 bg-background/40'
                  }`}
                  data-gsap="fade-up"
                >
                  <div className="p-6 flex items-start gap-5">
                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white'
                        : 'bg-gradient-to-br from-muted to-background text-blue-600'
                    }`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium tracking-wide uppercase ${
                          isActive ? 'text-blue-600' : 'text-muted-foreground'
                        }`}>Step {step.id}</span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-600/10 px-2 py-0.5 rounded-full">
                            <Sparkles className="h-3 w-3" /> Active
                          </span>
                        )}
                      </div>
                      <h3 className={`text-lg font-semibold tracking-tight ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>{step.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Active detail panel */}
          <div className="lg:col-span-7">
            <Card className="relative overflow-hidden border-blue-500/30 bg-white/70 backdrop-blur-xl shadow-xl" data-gsap="fade-in">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-violet-400/10 blur-3xl" />
              </div>
              <CardContent className="relative p-10 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-[11px] font-medium tracking-wide text-blue-700">
                    Step {active.id} • {active.title}
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
                {active.cta && (
                  <div className="pt-2">
                    <Button className="group bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                      {active.cta}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
