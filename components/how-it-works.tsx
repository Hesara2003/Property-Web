"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Users, Home, ArrowRight, CheckCircle2, Clock } from "lucide-react"
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
  return (
    <section className="relative py-28" data-gsap="fade-up" data-gsap-stagger="0.12" id="how-it-works">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-gradient-to-br from-blue-200/30 to-violet-200/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
      </div>
      <div className="container mx-auto px-4 lg:px-24 relative">
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

        {/* Timeline Layout */}
        <div className="mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-blue-500"></div>
            
            {/* Timeline Steps */}
            <div>
              {steps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0
                
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:gap-16`}
                    data-gsap="fade-up"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 md:-ml-6 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[45.8%] ml-20 md:ml-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      <Card className="relative overflow-hidden border-blue-500/30 bg-white/70 backdrop-blur-xl shadow-xl">
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-violet-400/10 blur-3xl" />
                        </div>
                        <CardContent className="relative p-8 space-y-6">
                          <div className="space-y-3">
                            <h3 className="text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                          
                          <ul className="space-y-3">
                            {step.bullets.map((bullet: string, bulletIndex: number) => (
                              <li key={bulletIndex} className="flex items-start gap-3 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                                <span className="text-muted-foreground leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {step.cta && (
                            <div className="pt-2">
                              <Button className="group bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                                {step.cta}
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-20">
          <Button className="group bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            Start Your Property Journey
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
