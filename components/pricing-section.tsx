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
  description: string
  features: string[]
  popular?: boolean
  tierNote?: string
}

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    description: "Get started with limited access",
    features: [
      "Dashboard Access",
      "3 Property Listings",
      "3 Buying Requests",
      "Up to 3 Matches/month",
      "Free + Verified Pool Access",
      "Basic Email Notifications",
      "Email Support Only",
      "Standard Branding Experience",
    ],
  },
  {
    name: "Verified",
    monthly: 2000,
    description: "Full access to verified network",
    features: [
      "Dashboard Access",
      "Unlimited Property Listings",
      "Unlimited Buying Requests",
      "Unlimited Matches",
      "Verified-only Matching Pool",
      "Profile Verification Badge",
      "Instant Push/Email Notifications",
      "Full Analytics & Insights",
      "Priority in Matching",
      "Priority Chat/Phone Support",
      "Ad-free Experience",
      "Verified-only Network Access",
    ],
    popular: true,
    tierNote: "Recommended",
  },
]

function formatLKR(value: number) {
  return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(value)
}

export function PricingSection() {
  const [showCompare, setShowCompare] = useState(false)

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
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Start free with basic access or get verified for unlimited features and exclusive network access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const price = plan.monthly
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
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="text-center space-y-1">
                    {price > 0 ? (
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                          {formatLKR(price)}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">/month</span>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Free</span>
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
                      {price === 0 ? 'Start Free' : 'Get Verified'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="text-[11px] text-muted-foreground text-center">
                    {price === 0 ? 'No credit card required' : 'Access verified network • Cancel anytime'}
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
                  'Dashboard Access',
                  'Property Listings',
                  'Buying Requests',
                  'Number of Matches',
                  'Matching Pool',
                  'Profile Verification Badge',
                  'Match Notifications',
                  'Analytics / Insights',
                  'Priority in Matching',
                  'Support',
                  'Ad Experience',
                  'Trust / Exclusivity',
                  'Cost',
                ].map(feature => (
                  <tr key={feature} className="border-t border-border/40">
                    <td className="p-3 font-medium text-muted-foreground">{feature}</td>
                    {plans.map(p => {
                      let value: string | JSX.Element = '—'
                      switch (feature) {
                        case 'Dashboard Access':
                          value = 'Yes'
                          break
                        case 'Property Listings':
                          value = p.name === 'Free' ? '3' : 'Unlimited'
                          break
                        case 'Buying Requests':
                          value = p.name === 'Free' ? '3' : 'Unlimited'
                          break
                        case 'Number of Matches':
                          value = p.name === 'Free' ? 'Up to 3/month' : 'Unlimited'
                          break
                        case 'Matching Pool':
                          value = p.name === 'Free' ? 'Free + Verified' : 'Verified only'
                          break
                        case 'Profile Verification Badge':
                          value = p.name === 'Free' ? 'No' : 'Yes'
                          break
                        case 'Match Notifications':
                          value = p.name === 'Free' ? 'Basic email' : 'Instant push/email'
                          break
                        case 'Analytics / Insights':
                          value = p.name === 'Free' ? 'None' : 'Full insights'
                          break
                        case 'Priority in Matching':
                          value = p.name === 'Free' ? 'Low' : 'High'
                          break
                        case 'Support':
                          value = p.name === 'Free' ? 'Email only' : 'Priority chat/phone'
                          break
                        case 'Ad Experience':
                          value = p.name === 'Free' ? 'Standard branding' : 'Ad-free'
                          break
                        case 'Trust / Exclusivity':
                          value = p.name === 'Free' ? 'General' : 'Verified-only network'
                          break
                        case 'Cost':
                          value = p.name === 'Free' ? 'Free' : 'LKR 2,000 / month'
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
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="mt-4 text-xs text-muted-foreground tracking-wide uppercase">
            No hidden fees • Upgrade anytime
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
