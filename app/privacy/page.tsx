import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Shield, Eye, Lock, Users, FileText } from "lucide-react"
import Link from "next/link"

import GSAPScrollProvider from "@/components/gsap-scroll-provider"

export default function PrivacyPage() {
  return (
  <GSAPScrollProvider>
  <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-light tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Property Scout
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wider">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-105 font-medium"
              >
                Home
              </Link>
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
              <Link href="/privacy" className="text-primary font-medium">
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-105 font-medium"
              >
                Terms
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hover:bg-primary/10 text-sm font-medium" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button
                className="gradient-primary hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-primary/30 text-sm font-medium px-6"
                asChild
              >
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
  <div className="text-center mb-16" data-gsap="fade-up">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-balance mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: January 15, 2024</p>
        </div>

        {/* Privacy Principles */}
  <section className="mb-16" data-gsap="fade-up" data-gsap-stagger="0.15">
          <h2 className="text-3xl font-light tracking-tight text-center mb-12">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-primary/10 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                <p className="text-muted-foreground">
                  We're clear about what data we collect and how we use it to improve your property search experience.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/10 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Security</h3>
                <p className="text-muted-foreground">
                  Your personal information is protected with industry-standard encryption and security measures.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/10 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Control</h3>
                <p className="text-muted-foreground">
                  You have full control over your data and can update, delete, or export it at any time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.05">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We collect information you provide directly to us, such as when you create an account, submit property
                  requests, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Property preferences and search criteria</li>
                  <li>Communication history with sellers and our support team</li>
                  <li>Usage data and analytics to improve our services</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.1">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to provide, maintain, and improve our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Match you with relevant properties based on your preferences</li>
                  <li>Facilitate communication between buyers and sellers</li>
                  <li>Send you updates about matches and platform features</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Analyze usage patterns to improve our matching algorithms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.15">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With verified sellers when you unlock a property match</li>
                  <li>With service providers who assist in operating our platform</li>
                  <li>When required by law or to protect our rights and safety</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication for our systems</li>
                  <li>Employee training on data protection best practices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.25">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal data</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.3">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@propertyscout.lk
                  </p>
                  <p>
                    <strong>Phone:</strong> +94 11 234 5678
                  </p>
                  <p>
                    <strong>Address:</strong> 42 Sir Baron Jayatilaka Mawatha, Colombo 01, Sri Lanka
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
  <section className="mt-20 gradient-accent/10 rounded-3xl p-12 text-center" data-gsap="scale-in" data-gsap-delay="0.1">
          <h2 className="text-3xl font-light tracking-tight mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Property Scout today and experience secure, intelligent property matching tailored for Sri Lanka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>

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
                <div>
                  <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
                    Privacy
                  </Link>
                </div>
                <div>
                  <Link href="/terms" className="hover:text-primary transition-colors duration-300">
                    Terms
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
              <h4 className="font-semibold text-lg">Legal</h4>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-16 pt-10 text-center text-muted-foreground">
            <p>&copy; 2025 Property Scout. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </GSAPScrollProvider>
  )
}
