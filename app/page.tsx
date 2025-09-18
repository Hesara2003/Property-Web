import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Home, Users, Shield, ArrowRight, Sparkles, Building2, MapPin, Clock } from "lucide-react"
import Link from "next/link"

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
                PropertyHub
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
      </header>

      {/* Hero Section */}
      <section className="py-24 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/modern-luxury-property-exterior-with-glass-windows.jpg"
            alt="Modern luxury property background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-12 max-w-6xl mx-auto">
            <div className="space-y-8 animate-fade-in-up">
              <Badge
                variant="secondary"
                className="glass-card border-white/20 text-white bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Trusted by 10,000+ Property Buyers
              </Badge>

              <h1 className="text-display font-light tracking-tight text-balance text-white">
                Premium Property
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                  Marketplace
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-white/90 text-balance leading-relaxed max-w-4xl mx-auto font-light">
                Connect with verified sellers through our intelligent matching system. Find properties that meet your
                exact requirements with unprecedented precision.
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

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-hero font-light tracking-tight text-balance">
                Contemporary Architectural Excellence
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
                        <h3 className="text-2xl font-semibold text-white">Modern Residential Complex</h3>
                        <div className="flex items-center gap-4 text-white/80">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">Mumbai, Maharashtra</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Ready to Move</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">₹2.5Cr</div>
                        <div className="text-sm text-white/80">Starting Price</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 gradient-accent/10 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "10,000+", label: "Properties Listed", icon: Building2 },
              { value: "95%", label: "Match Success Rate", icon: Shield },
              { value: "24hrs", label: "Average Response", icon: Clock },
              { value: "5,000+", label: "Happy Buyers", icon: Users },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 mb-20 animate-fade-in-up">
            <h2 className="text-hero font-light tracking-tight text-balance">How PropertyHub Works</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Our intelligent matching system connects serious buyers with verified sellers through a streamlined
              three-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Search,
                title: "Submit Requirements",
                description:
                  "Define your ideal property with specific location, budget, features, and lifestyle preferences.",
                delay: "0s",
              },
              {
                icon: Users,
                title: "Smart Matching",
                description:
                  "Our AI algorithm identifies perfect matches and connects you with pre-verified property sellers.",
                delay: "0.2s",
              },
              {
                icon: Home,
                title: "Secure Transaction",
                description:
                  "Access verified documentation and seller contacts to complete your property purchase safely.",
                delay: "0.4s",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="glass-card border-primary/10 hover:border-primary/30 transition-all duration-500 hover-lift animate-fade-in-up"
                style={{ animationDelay: step.delay }}
              >
                <CardContent className="text-center p-10 space-y-6">
                  <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <step.icon className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 mb-20 animate-fade-in-up">
            <h2 className="text-hero font-light tracking-tight text-balance">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Select the perfect plan for your property journey. All plans include our intelligent matching system and
              verified seller network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                price: "₹999",
                period: "/month",
                description: "Perfect for first-time buyers",
                features: [
                  "5 Property Requests",
                  "Basic Matching Algorithm",
                  "Email Support",
                  "Property Documentation Access",
                  "Mobile App Access",
                ],
                popular: false,
                buttonText: "Get Started",
                delay: "0s",
              },
              {
                name: "Premium",
                price: "₹2,499",
                period: "/month",
                description: "Most popular for serious buyers",
                features: [
                  "Unlimited Property Requests",
                  "Advanced AI Matching",
                  "Priority Support",
                  "Verified Seller Contacts",
                  "Property History Reports",
                  "Virtual Property Tours",
                  "Dedicated Relationship Manager",
                ],
                popular: true,
                buttonText: "Start Premium",
                delay: "0.2s",
              },
              {
                name: "Enterprise",
                price: "₹4,999",
                period: "/month",
                description: "For investors and agencies",
                features: [
                  "Everything in Premium",
                  "Bulk Property Requests",
                  "Investment Analytics",
                  "Market Insights Dashboard",
                  "API Access",
                  "Custom Integrations",
                  "24/7 Phone Support",
                  "Legal Document Review",
                ],
                popular: false,
                buttonText: "Contact Sales",
                delay: "0.4s",
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative glass-card transition-all duration-500 hover-lift animate-fade-in-up ${
                  plan.popular
                    ? "border-blue-500/50 shadow-xl shadow-blue-500/20 scale-105"
                    : "border-primary/10 hover:border-primary/30"
                }`}
                style={{ animationDelay: plan.delay }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-medium">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
                    asChild
                  >
                    <Link href="/auth" className="flex items-center justify-center gap-2">
                      {plan.buttonText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-muted-foreground mb-4">All plans include a 14-day free trial</p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up">
            <h2 className="text-hero font-light tracking-tight text-balance text-primary-foreground">
              Begin Your Property Journey Today
            </h2>
            <p className="text-xl text-primary-foreground/90 text-balance leading-relaxed max-w-2xl mx-auto">
              Join thousands of satisfied buyers who discovered their perfect property match through PropertyHub's
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
                  PropertyHub
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
            <p>&copy; 2024 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
