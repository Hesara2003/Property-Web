"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Bell,
  User,
  Check,
  Crown,
  Star,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CreditCard,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { SplitTextReveal } from "@/components/split-text-reveal"

const pricingPlans = {
  buyer: [
    {
      name: "Basic",
      price: 0,
      period: "month",
      description: "Perfect for casual property seekers",
      features: [
        "Browse all properties",
        "Basic search filters",
        "5 property unlocks per month",
        "Email support",
        "Basic matching algorithm",
      ],
      limitations: ["Limited unlocks", "Standard support", "Basic features only"],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Premium",
          price: 4900, // LKR
      period: "month",
      description: "Best for serious property buyers",
      features: [
        "Everything in Basic",
        "Unlimited property unlocks",
        "Advanced search filters",
        "Priority matching",
        "Featured requests",
        "Phone & chat support",
        "Property alerts",
        "Market insights",
      ],
      limitations: [],
      popular: true,
      cta: "Start Premium",
    },
    {
      name: "Enterprise",
          price: 12900, // LKR
      period: "month",
      description: "For real estate professionals",
      features: [
        "Everything in Premium",
        "Bulk property analysis",
        "API access",
        "Custom matching criteria",
        "Dedicated account manager",
        "White-label options",
        "Advanced analytics",
        "Priority support",
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
    },
  ],
  seller: [
    {
      name: "Starter",
      price: 0,
      period: "month",
      description: "For individual property sellers",
      features: [
        "List up to 3 properties",
        "Basic listing features",
        "Standard visibility",
        "Email notifications",
        "Basic analytics",
      ],
      limitations: ["Limited listings", "Standard visibility", "Basic features only"],
      popular: false,
      cta: "Start Selling",
    },
    {
      name: "Professional",
          price: 9900, // LKR
      period: "month",
      description: "Perfect for real estate agents",
      features: [
        "Unlimited property listings",
        "Premium listing features",
        "Enhanced visibility",
        "Lead management",
        "Advanced analytics",
        "Priority support",
        "Featured listings",
        "Bulk upload tools",
      ],
      limitations: [],
      popular: true,
      cta: "Go Professional",
    },
    {
      name: "Agency",
          price: 14900, // LKR
      period: "month",
      description: "For real estate agencies",
      features: [
        "Everything in Professional",
        "Multi-user accounts",
        "Team collaboration",
        "Custom branding",
        "API integration",
        "Dedicated support",
        "Advanced reporting",
        "White-label solution",
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
    },
  ],
}

export default function PricingPage() {
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer")
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const formatPrice = (price: number) => {
    if (price === 0) return "Free"
    const finalPrice = isAnnual ? Math.floor(price * 10) : price // 2 months free on annual
        return `LKR ${finalPrice.toLocaleString()}`
  }

  const handleSelectPlan = (plan: any) => {
    if (plan.name === "Enterprise" || plan.name === "Agency") {
      // Redirect to contact sales
      return
    }
    setSelectedPlan(plan)
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Home className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">Property Scout</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <SplitTextReveal
            text="Choose Your Perfect Plan"
            as="h1"
            className="text-4xl md:text-5xl font-bold text-balance mb-6"
          />
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Unlock the full potential of Property Scout with plans designed for every type of property professional in Sri Lanka. Prices shown in LKR (exclusive of government taxes).
          </p>

          {/* User Type Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant={userType === "buyer" ? "default" : "outline"}
              onClick={() => setUserType("buyer")}
              className="px-8"
            >
              <Users className="h-4 w-4 mr-2" />
              For Buyers
            </Button>
            <Button
              variant={userType === "seller" ? "default" : "outline"}
              onClick={() => setUserType("seller")}
              className="px-8"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              For Sellers
            </Button>
          </div>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? "font-semibold" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
              Annual
              <Badge className="ml-2 bg-green-600 text-white">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans[userType].map((plan, index) => (
            <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Limitations:</p>
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full bg-muted flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-transparent border border-border hover:bg-muted"
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.name === "Enterprise" || plan.name === "Agency" ? (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      {plan.cta}
                    </>
                  ) : plan.price === 0 ? (
                    plan.cta
                  ) : (
                    <>
                      <Crown className="h-4 w-4 mr-2" />
                      {plan.cta}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <SplitTextReveal
            text="Why Choose Property Scout?"
            as="h2"
            className="text-3xl font-bold text-center mb-12"
            delay={0.05}
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-muted-foreground">
                All properties are verified by our team to ensure authenticity and quality
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Our AI-powered algorithm matches buyers with the perfect properties
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">
                Get help from our real estate experts throughout your property journey
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <SplitTextReveal
            text="Frequently Asked Questions"
            as="h2"
            className="text-3xl font-bold text-center mb-12"
            delay={0.1}
          />
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept local and international cards (Visa / Mastercard), LankaQR, bank transfer, and selected mobile wallets. Invoicing available for Agency plans.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial available?</h3>
                <p className="text-muted-foreground">
                  Yes, all premium plans come with a 7-day free trial. You can cancel anytime during the trial period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Complete Your Purchase
            </DialogTitle>
            <DialogDescription>You're subscribing to the {selectedPlan?.name} plan</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPlan && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{selectedPlan.name} Plan</h4>
                  <Badge className="bg-primary text-primary-foreground">
                    {userType === "buyer" ? "Buyer" : "Seller"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selectedPlan.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{formatPrice(selectedPlan.price)}</span>
                  <span className="text-muted-foreground">{isAnnual ? "per year" : "per month"}</span>
                </div>
                {isAnnual && selectedPlan.price > 0 && (
                  <p className="text-sm text-green-600 mt-1">Save 20% with annual billing</p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing">Billing Address</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Pay Securely
              </Button>
              <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Secured by 256-bit SSL encryption. Your payment information is safe with us.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
