"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Plan {
  name: string
  monthly: number
  annual: number // annual billing total (after discount)
  description: string
  features: string[]
  popular?: boolean
  tierNote?: string
  payPerMatch?: number // LKR per individual match unlock when plan itself is free
}

const plans: Plan[] = [
  {
    name: "Basic",
    monthly: 0,
    annual: 0,
    description: "Free access – pay only when you unlock a full match",
    features: [
      "Browse Match Summaries",
      "Core AI Preview Scoring",
      "Pay-as-you-go Unlocks",
      "Saved Searches",
      "Email Support",
      "Mobile Access",
    ],
    payPerMatch: 990,
  },
  {
    name: "Premium",
    monthly: 12900,
    annual: 12900 * 12 * 0.83, // ~2 months free
    description: "Serious buyers who want faster, richer insight",
    features: [
      "Unlimited Requests",
      "Advanced AI Confidence Scoring",
      "Priority Support (4h avg)",
      "Verified Seller Contacts",
      "Property History Reports",
      "Virtual Property Tours",
      "Saved Market Alerts",
      "Relationship Manager",
    ],
    popular: true,
    tierNote: "Most Chosen",
  },
  {
    name: "Enterprise",
    monthly: 24900,
    annual: 24900 * 12 * 0.8, // 20% off
    description: "Investors & agencies scaling portfolios",
    features: [
      "Bulk / API Requests",
      "Investment Analytics Suite",
      "Portfolio Benchmarking",
      "Advanced Market Insights",
      "Custom Integrations",
      "24/7 Phone Support",
      "Legal Document Review",
      "Priority Feature Input",
    ],
  },
]

function formatLKR(value: number) {
  return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(value)
}

export function PricingSection() {
  const [annual, setAnnual] = useState(true)
  const [showCompare, setShowCompare] = useState(false)
  const billingLabel = annual ? "Annual (Best Value)" : "Monthly"
  const savings = (plan: Plan) => {
    const full = plan.monthly * 12
    const annualTotal = plan.annual
    const pct = Math.round((1 - annualTotal / full) * 100)
    return pct
  }

  return (
    <section
      id="pricing"
      className="relative py-28 bg-gradient-to-br from-blue-50/60 via-white to-violet-50/40 overflow-hidden"
      data-gsap="fade-up"
      data-gsap-stagger="0.12"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-full bg-gradient-radial from-blue-300/20 via-transparent to-transparent" />
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 text-xs tracking-wider font-medium">
            <span>Flexible Pricing • Cancel Anytime</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
            Choose Your Plan <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">({annual ? 'Annual' : 'Monthly'})</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Start free. Unlock individual matches only when you need full details—or upgrade for unlimited access & deeper intelligence.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className={!annual ? 'text-primary' : 'text-muted-foreground'}>Monthly</span>
              <button
                onClick={() => setAnnual(a => !a)}
                className="relative inline-flex h-7 w-14 items-center rounded-full bg-blue-600/10 border border-blue-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                aria-label="Toggle annual billing"
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-blue-600 shadow transition-transform duration-300 ${annual ? 'translate-x-8' : 'translate-x-1'}`}
                />
              </button>
              <span className={annual ? 'text-primary' : 'text-muted-foreground'}>Annual</span>
            </div>
            {annual && (
              <Badge variant="secondary" className="bg-green-600/10 text-green-700 border border-green-600/30">
                Save up to 2 Months
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Billing Mode: {billingLabel}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const price = annual ? plan.annual : plan.monthly
            const perMonthEquivalent = annual ? (plan.annual > 0 ? Math.round(plan.annual / 12) : 0) : plan.monthly
            return (
              <Card
                key={plan.name}
                className={`relative group transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-blue-600/10 bg-white/70 backdrop-blur-sm ${
                  plan.popular
                    ? 'shadow-lg shadow-blue-500/10 border-blue-500/40 ring-1 ring-blue-500/30 scale-[1.02]'
                    : 'hover:border-blue-500/40'
                }`}
                data-gsap="fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 text-xs tracking-wide shadow">
                    {plan.tierNote || 'Popular'}
                  </Badge>
                )}
                {annual && price > 0 && (
                  <div className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-1 rounded-full bg-green-500/15 text-green-700 border border-green-500/30">
                    Save {savings(plan)}%
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="text-center space-y-1">
                    {price > 0 ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {formatLKR(price)}
                          </span>
                          <span className="text-sm text-muted-foreground font-medium">{annual ? ' /year' : ' /month'}</span>
                        </div>
                        {annual && price > 0 && (
                          <div className="text-[11px] text-muted-foreground">
                            ≈ {formatLKR(perMonthEquivalent)} / month effective
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Free</span>
                        {plan.payPerMatch && (
                          <span className="text-[11px] font-medium text-muted-foreground">LKR {plan.payPerMatch.toLocaleString()} / match unlock</span>
                        )}
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 text-sm">
                    {plan.features.slice(0, 6).map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
                        <span className="text-muted-foreground leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full py-3 font-medium transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                        : 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                    asChild
                  >
                    <Link href="/auth" className="flex items-center justify-center gap-2">
                      {price === 0 ? 'Create Free Account' : plan.popular ? 'Start Premium' : 'Get Started'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="text-[11px] text-muted-foreground text-center">
                    {price === 0 ? 'Pay only for matches you unlock' : '14‑day free trial • Cancel anytime'}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="max-w-5xl mx-auto pt-14">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[{
              icon: Shield, title: 'Secure Payments', text: 'Bank-grade encryption & PCI-compliant billing.'
            }, {
              icon: Users, title: 'Dedicated Support', text: 'Priority assistance for Premium & Enterprise.'
            }, {
              icon: Clock, title: 'Fast Activation', text: 'Your workspace is live in under 2 minutes.'
            }].map((item, i) => (
              <div key={item.title} className="space-y-3 px-4" data-gsap="fade-up" data-gsap-delay={`${0.2 + i * 0.1}`}>
                <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/30">
                  <item.icon className="h-7 w-7" />
                </div>
                <h4 className="font-semibold tracking-wide">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 text-center">
          <button
            onClick={() => setShowCompare(s => !s)}
            className="text-sm font-medium text-blue-700 hover:text-blue-800 underline decoration-blue-300 decoration-dotted underline-offset-4"
          >
            {showCompare ? 'Hide feature comparison' : 'Show full feature comparison'}
          </button>
        </div>

        {showCompare && (
          <div className="mt-10 max-w-5xl mx-auto overflow-x-auto border border-border/50 rounded-xl bg-white/60 backdrop-blur-sm" data-gsap="fade-in">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-gradient-to-r from-blue-50 to-violet-50">
                  <th className="p-4 font-semibold">Feature</th>
                  {plans.map(p => (
                    <th key={p.name} className="p-4 font-semibold text-center">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'Property Requests',
                  'Per Match Unlock Pricing',
                  'AI Matching Depth',
                  'Support SLA',
                  'Verified Seller Access',
                  'Analytics & Insights',
                  'Virtual Tours',
                  'Relationship Manager',
                  'API / Bulk Tools',
                  'Legal Review',
                ].map(feature => (
                  <tr key={feature} className="border-t border-border/40">
                    <td className="p-3 font-medium text-muted-foreground">{feature}</td>
                    {plans.map(p => {
                      let value: string | JSX.Element = '—'
                      switch (feature) {
                        case 'Property Requests':
                          value = p.name === 'Basic' ? 'Preview Only' : (p.name === 'Premium' ? 'Unlimited' : 'Unlimited + Bulk')
                          break
                        case 'Per Match Unlock Pricing':
                          value = p.name === 'Basic' ? `LKR ${p.payPerMatch?.toLocaleString()}` : 'Included'
                          break
                        case 'AI Matching Depth':
                          value = p.name === 'Basic' ? 'Preview' : (p.name === 'Premium' ? 'Advanced' : 'Advanced + Predictive')
                          break
                        case 'Support SLA':
                          value = p.name === 'Basic' ? 'Email 24h' : (p.name === 'Premium' ? 'Priority 4h' : '24/7 Hotline')
                          break
                        case 'Verified Seller Access':
                          value = p.name === 'Basic' ? 'Limited' : 'Full'
                          break
                        case 'Analytics & Insights':
                          value = p.name === 'Basic' ? 'Basic' : (p.name === 'Premium' ? 'Market Trends' : 'Advanced Suite')
                          break
                        case 'Virtual Tours':
                          value = p.name === 'Basic' ? '—' : 'Included'
                          break
                        case 'Relationship Manager':
                          value = p.name === 'Premium' ? 'Yes' : (p.name === 'Enterprise' ? 'Dedicated' : '—')
                          break
                        case 'API / Bulk Tools':
                          value = p.name === 'Enterprise' ? 'Yes' : '—'
                          break
                        case 'Legal Review':
                          value = p.name === 'Enterprise' ? 'Yes' : '—'
                          break
                      }
                      return (
                        <td key={p.name} className="p-3 text-center text-xs font-medium">
                          {value}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 text-[11px] text-muted-foreground text-center">
              All feature availability is subject to fair use policies & verification standards. Enterprise tiers may include custom contractual add-ons.
            </div>
          </div>
        )}

        <div className="mt-14 text-center" data-gsap="fade-up" data-gsap-delay="0.2">
          <Button size="lg" asChild className="px-10 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30">
            <Link href="/auth" className="flex items-center gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="mt-4 text-xs text-muted-foreground tracking-wide uppercase">
            No hidden fees • Prices exclusive of local taxes
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
