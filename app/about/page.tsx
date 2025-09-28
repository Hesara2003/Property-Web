import Link from "next/link"
import { Home, Target, Shield, Users, TrendingUp, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SplitTextReveal } from "@/components/split-text-reveal"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              About Property Scout
            </Badge>
            <SplitTextReveal
              text="Revolutionizing Property Discovery & Matching"
              as="h1"
              className="text-4xl lg:text-6xl font-bold text-balance mb-8"
            />
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed mb-8">
              Property Scout is Sri Lanka's intelligent property matching platform, connecting serious buyers with
              verified sellers across Colombo, Kandy, Galle, Jaffna, and emerging suburban growth corridors through advanced AI-powered algorithms and localized market insight.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth">Join Property Scout Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To simplify Sri Lankan property transactions by creating meaningful connections between buyers and
                sellers, eliminating fragmented broker dependency and reducing time-to-discovery through localized
                intelligent matching technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Precision matching based on exact requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">100% verified sellers and properties</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Transparent and direct communication</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/colombo-skyline.svg"
                  alt="Colombo skyline illustration"
                  className="w-full h-full object-cover dark:opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src="/galle-fort.svg" alt="Galle Fort" className="h-12 w-12 hidden sm:block rounded" />
              <SplitTextReveal
                text="Why Choose Property Scout?"
                as="h2"
                className="text-3xl lg:text-4xl font-bold text-center"
                delay={0.05}
              />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've reimagined property discovery with technology and personalized service at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your requirements and matches you with properties that truly fit your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Verified Sellers</h3>
                <p className="text-muted-foreground">
                  Every seller undergoes thorough verification to ensure authenticity and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Direct Communication</h3>
                <p className="text-muted-foreground">
                  Connect directly with property owners without intermediaries or hidden fees.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Market Insights</h3>
                <p className="text-muted-foreground">
                  Get real-time market data and pricing insights to make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Success Guarantee</h3>
                <p className="text-muted-foreground">
                  92% of active users find a verified match within 30 days or receive extended premium support.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">End-to-End Support</h3>
                <p className="text-muted-foreground">
                  From initial search to final paperwork, we support you throughout your property journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <img src="/kandy-temple.svg" alt="Kandy Temple" className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Property Scout by Numbers</h2>
            <p className="text-xl opacity-90">Trusted by an expanding community of property buyers and sellers across Sri Lanka</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">7,800+</div>
              <div className="text-lg opacity-90">Active Users (Monthly)</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">4,300+</div>
              <div className="text-lg opacity-90">Matches Facilitated</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">92%</div>
              <div className="text-lg opacity-90">Verified Match Rate</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">12h</div>
              <div className="text-lg opacity-90">Median Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Find Your Perfect Property?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Join Property Scout today and experience the future of property discovery in Sri Lanka. Create your first request and get
              matched with verified sellers instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/auth">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
