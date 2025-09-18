import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card" // still used earlier on page
import { Badge } from "@/components/ui/badge"
import { Search, Home, Users, Shield, ArrowRight, Sparkles, Building2, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import GSAPScrollProvider from "@/components/gsap-scroll-provider"
import { SplitTextReveal } from "@/components/split-text-reveal"
import { PricingSection } from "@/components/pricing-section"
import { HowItWorksSection } from "@/components/how-it-works"
import { StatsEngagementSection } from "@/components/stats-engagement-section"
import { ScrollProgressBar } from "@/components/scroll-progress"

export default function LandingPage() {
  return (
  <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-light tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Property Scout
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wider">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-105 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-105 font-medium"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-105 font-medium"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-105 font-medium"
              >
                Terms
              </Link>
            </nav>

            <div className="flex items-center gap-4 animate-slide-in-right">
              <Button variant="ghost" className="hover:bg-primary/10 text-sm font-medium" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button
                className="gradient-primary hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-primary/30 text-sm font-medium px-6"
                asChild
              >
                <Link href="/auth" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Progress bar sits at bottom of header */}
        <div className="absolute left-0 right-0 bottom-0 h-1 overflow-hidden">
          <ScrollProgressBar />
        </div>
      </header>

      {/* Hero Section (Fixed Parallax Background) */}
      <section className="py-24 lg:py-40 relative overflow-hidden" data-gsap="fade-in" data-gsap-delay="0.1">
        <div className="absolute inset-0">
          {/* Fixed background image using CSS parallax (background-attachment: fixed on desktop) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/modern-luxury-property-exterior-with-glass-windows.jpg')] bg-cover bg-center md:bg-fixed scale-105"
          />
          {/* Soft overlay gradient (static to reduce motion for accessibility) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/50 to-black/60" />
          {/* Accent glow layer (kept subtle & static) */}
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[110%] h-[110%] bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-3xl opacity-70 pointer-events-none" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-12 max-w-6xl mx-auto">
            <div className="space-y-8 animate-fade-in-up">
              <Badge
                variant="secondary"
                className="glass-card border-white/20 text-blue-600 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="text-blue-600 h-4 w-4 mr-2" />
                Trusted by 5,000+ Sri Lankan Buyers
              </Badge>

              <SplitTextReveal
                text="Premium Property Marketplace"
                className="text-display font-light tracking-tight text-balance text-white"
                as="h1"
              />

              <p className="text-xl lg:text-2xl text-white/90 text-balance leading-relaxed max-w-4xl mx-auto font-light">
                Connect with verified sellers across Colombo, Kandy, Galle, Jaffna and Nuwara Eliya. Find homes, land and investment property that match your exact requirements in minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="text-lg px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-600/30 font-medium"
                asChild
              >
                <Link href="/auth" className="flex items-center gap-3">
                  Start Your Search
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-4 border-white/30 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 bg-transparent font-medium"
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations Gallery */}
      {/* Removed divider */}
      <section className="py-28 relative overflow-hidden" data-gsap="fade-up" data-gsap-delay="0.1">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16">
            <div className="flex-1 space-y-8">
              <Badge variant="secondary" className="px-4 py-1 text-xs tracking-wider">Featured Locations</Badge>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-balance">
                Explore Sri Lanka's <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">Prime Property</span> Destinations
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                From luxury urban residences in Colombo to heritage charm in Galle and cool hillside retreats in Kandy – discover curated investment and lifestyle opportunities across the island.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {["High-Rise Luxury", "Beachfront Villas", "Heritage Homes", "Hill Country Estates"].map((t, i) => (
                  <div key={i} className="text-sm px-3 py-2 rounded-full bg-muted/60 backdrop-blur-sm border border-border/50 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                    {t}
                  </div>
                ))}
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button asChild className="gap-2">
                  <Link href="/matches">Browse Matches <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/about">Why Property Scout</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { src: "/colombo-skyline.svg", alt: "Colombo Skyline", label: "Colombo 01-07" },
                  { src: "/galle-fort.svg", alt: "Galle Fort", label: "Galle & South Coast" },
                  { src: "/kandy-temple.svg", alt: "Kandy Temple", label: "Kandy & Central" },
                  { src: "/modern-luxury-property-exterior-with-glass-windows.jpg", alt: "Luxury Villa", label: "Coastal Villas" },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-muted/40 to-muted/10 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-medium text-white">
                      <span className="tracking-wide uppercase">{img.label}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed divider */}
      <section className="py-20 relative" data-gsap="fade-up" data-gsap-delay="0.15">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-hero font-light tracking-tight text-balance">
                Contemporary Sri Lankan Property Excellence
              </h2>
              <p className="text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
                Discover exceptional properties through our curated marketplace, where architectural innovation meets
                modern living standards.
              </p>
            </div>

            <div className="relative animate-fade-in-scale" style={{ animationDelay: "0.3s" }}>
              <div className="aspect-[3/2] rounded-3xl overflow-hidden bg-muted relative group shadow-2xl">
                <img
                  src="/modern-luxury-property-exterior-with-beautiful-arc.jpg"
                  alt="Contemporary architectural development"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass-card rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-black">Colombo 07 Luxury Residence</h3>
                        <div className="flex items-center gap-4 text-black/80">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">Colombo 07, Sri Lanka</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Ready to Move</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-black">LKR 185M</div>
                        <div className="text-sm text-black/80">Guide Price</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed divider */}
  {/* Statistical Engagement Section */}
  <StatsEngagementSection />

      {/* Enhanced How It Works Section */}
      <HowItWorksSection />

      {/* Enhanced Interactive Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
  <section className="py-24 gradient-hero relative overflow-hidden" data-gsap="fade-in" data-gsap-delay="0.1">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up">
            <h2 className="text-hero font-light tracking-tight text-balance text-primary-foreground">
              Begin Your Property Journey Today
            </h2>
            <p className="text-xl text-primary-foreground/90 text-balance leading-relaxed max-w-2xl mx-auto">
              Join thousands of satisfied buyers who discovered their perfect property match through Property Scout's
              intelligent marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-12 py-4 hover:scale-105 transition-all duration-300 shadow-xl font-medium"
                asChild
              >
                <Link href="/auth" className="flex items-center gap-3">
                  Start Your Search
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-4 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent hover:scale-105 transition-all duration-300 font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border/50 glass-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Property Scout
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Connecting buyers and sellers through intelligent property matching and architectural excellence.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <Link href="/" className="hover:text-primary transition-colors duration-300">
                    Home
                  </Link>
                </div>
                <div>
                  <Link href="/about" className="hover:text-primary transition-colors duration-300">
                    About
                  </Link>
                </div>
                <div>
                  <Link href="/contact" className="hover:text-primary transition-colors duration-300">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Services</h4>
              <div className="space-y-4 text-muted-foreground">
                <div>Property Matching</div>
                <div>Buyer Services</div>
                <div>Seller Services</div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Support</h4>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <Link href="/help" className="hover:text-primary transition-colors duration-300">
                    Help Center
                  </Link>
                </div>
                <div>
                  <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <Link href="/terms" className="hover:text-primary transition-colors duration-300">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-16 pt-10 text-center text-muted-foreground">
            <p>&copy; 2025 Property Scout. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
