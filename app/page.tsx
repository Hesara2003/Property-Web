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

export default function LandingPage() {
  return (
  <GSAPScrollProvider>
  <div className="min-h-screen bg-background">
      {/* Hero Section (Fixed Parallax Background) */}
      <section className="py-12 lg:py-40 relative overflow-hidden" data-gsap="fade-in" data-gsap-delay="0.1">
        <div className="absolute inset-0">
          {/* Fixed background image using CSS parallax (background-attachment: fixed on desktop) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('https://safdie-staging.imgix.net/0aa3f522-14a8-448f-b5e8-d7b02c7e62fe/Altair_HeroMedia000.jpg?q=50&w=1600&fit=crop&max_h=900')] bg-cover bg-center md:bg-fixed scale-105"
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
                <Link href="/user" className="flex items-center gap-3">
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
      <section className="py-28 relative overflow-hidden" data-gsap="fade-up" data-gsap-delay="0.1">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-24">
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
                  { src: "https://mistertlk.s3.ap-southeast-1.amazonaws.com/property/sales/1317_1_1756373538.jpg", alt: "Colombo Skyline", label: "Colombo 01-07" },
                  { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/421542024.jpg?k=42436a5f03c21a376435efe07ab2820e000495d7447536e97177055e96db0b61&o=&hp=1", alt: "Galle Fort", label: "Galle & South Coast" },
                  { src: "https://www.thehotelguru.com/_images/81/c8/81c8f9a03088cee052ca05c073ed77e1/s1654x900.jpg", alt: "Kandy Temple", label: "Kandy & Central" },
                  { src: "https://pix10.agoda.net/hotelImages/781758/0/5e6d96bf9ed3525b43db7fa69a9208cb.jpg?ce=0&s=1024x768", alt: "Luxury Villa", label: "Coastal Villas" },
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

      {/* Statistical Engagement Section */}
      <StatsEngagementSection />

      {/* Enhanced How It Works Section */}
      <HowItWorksSection />

      {/* Enhanced Interactive Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-12 gradient-hero relative overflow-hidden" data-gsap="fade-in" data-gsap-delay="0.1">
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
                <Link href="/user" className="flex items-center gap-3">
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


    </div>
    </GSAPScrollProvider>
  )
}
