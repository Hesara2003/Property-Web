import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, FileText, Scale, Users, Shield } from "lucide-react"
import Link from "next/link"

import GSAPScrollProvider from "@/components/gsap-scroll-provider"

export default function TermsPage() {
  return (
  <GSAPScrollProvider>
  <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
  <div className="text-center mb-16" data-gsap="fade-up">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Scale className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-balance mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Please read these terms carefully before using Property Scout's services in Sri Lanka.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: January 15, 2024</p>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.05">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using Property Scout's services, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your use of Property Scout's website, platform, and related
                  services (collectively, the "Service") operated by Property Scout ("us", "we", or "our").
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.1">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                User Accounts
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To access certain features of our Service, you must register for an account. When you create an
                  account, you must provide information that is accurate, complete, and current at all times.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are responsible for safeguarding your account credentials</li>
                  <li>You must not share your account with others</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>You must be at least 18 years old to create an account</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.15">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Service Description</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Property Scout provides a platform that connects property buyers with sellers through intelligent
                  matching algorithms. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Property request submission and matching</li>
                  <li>Seller verification and property authentication</li>
                  <li>Communication facilitation between parties</li>
                  <li>Market insights and analytics</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue any part of our Service at any time.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">User Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>As a user of Property Scout, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the Service only for lawful purposes</li>
                  <li>Respect the privacy and rights of other users</li>
                  <li>Not engage in fraudulent or deceptive practices</li>
                  <li>Not attempt to circumvent our security measures</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.25">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Prohibited Activities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may not use our Service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Post false, misleading, or fraudulent property information</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.3">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Fees and Payments</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Property Scout operates on the following fee structure (fees shown in Sri Lankan Rupees - LKR unless stated otherwise):</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Basic services are free for property buyers</li>
                  <li>Sellers pay a success fee only upon completed transactions</li>
                  <li>Premium features may require additional fees</li>
                  <li>All fees are clearly disclosed before any charges</li>
                </ul>
                <p>We reserve the right to change our fee structure with 30 days' notice.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10" data-gsap="fade-up" data-gsap-delay="0.35">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Property Scout acts as a platform connecting buyers and sellers. We are not responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The accuracy of property information provided by sellers</li>
                  <li>The completion or success of any property transactions</li>
                  <li>Disputes between buyers and sellers</li>
                  <li>Any damages arising from use of our Service</li>
                </ul>
                <p>Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may terminate or suspend your account and access to our Service immediately, without prior notice,
                  for any reason, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation of these Terms of Service</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Abuse of other users or our support team</li>
                  <li>Non-payment of fees</li>
                </ul>
                <p>You may terminate your account at any time by contacting our support team.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> legal@propertyscout.lk
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
  <section className="mt-20 gradient-accent/10 rounded-3xl p-12 text-center" data-gsap="scale-in" data-gsap-delay="0.15">
          <h2 className="text-3xl font-light tracking-tight mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            By creating an account, you agree to these terms and can start your property search journey
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


    </div>
    </GSAPScrollProvider>
  )
}
