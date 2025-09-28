import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Phone, Mail, ChevronRight, HelpCircle, Shield, Users, Building2 } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const faqs = [
    {
      question: "How does Property Scout's matching system work?",
      answer:
        "Our AI-powered system analyzes your requirements and matches you with properties that meet your specific criteria, including location, budget (LKR), amenities, and preferences across Sri Lankan cities.",
    },
    {
      question: "Are all sellers verified on the platform?",
      answer:
        "Yes, we verify all sellers through a comprehensive process including document verification, property ownership proof, and background checks.",
    },
    {
      question: "What fees does Property Scout charge?",
      answer:
        "Property Scout is free for buyers. Sellers pay a transparent success fee only when a transaction is completed through our platform.",
    },
    {
      question: "How long does it take to find matches?",
      answer:
        "Most buyers receive their first matches within 24 hours of creating a request. Our average initial response time is under 4 hours.",
    },
    {
      question: "Can I contact sellers directly?",
      answer:
        "Yes, once you unlock a match, you get direct contact information for the seller and can communicate without any intermediaries.",
    },
    {
      question: "What if I'm not satisfied with my matches?",
      answer:
        "You can refine your requirements anytime, and our system will find new matches. We also offer personalized support to help optimize your search.",
    },
  ]

  const categories = [
    {
      title: "Getting Started",
      icon: Users,
      description: "Learn how to create your account and first property request",
      articles: 8,
    },
    {
      title: "Property Matching",
      icon: Search,
      description: "Understanding how our intelligent matching system works",
      articles: 12,
    },
    {
      title: "Verification Process",
      icon: Shield,
      description: "How we verify sellers and ensure property authenticity",
      articles: 6,
    },
    {
      title: "Communication",
      icon: MessageCircle,
      description: "Best practices for connecting with sellers and agents",
      articles: 9,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <HelpCircle className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-balance mb-6">How can we help you?</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 py-4 text-lg glass-card border-primary/20"
            />
          </div>
        </div>

        {/* Help Categories */}
        <section className="mb-20">
          <h2 className="text-3xl font-light tracking-tight text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="glass-card border-primary/10 hover:border-primary/30 transition-all duration-500 hover-lift cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <category.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {category.articles} articles
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to common questions about Property Scout in Sri Lanka</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card border-primary/10">
                <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">{faq.question}</CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="gradient-accent/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-light tracking-tight mb-6">Still need help?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues you might have
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="glass-card border-primary/10 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/10 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">Send us a detailed message</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/contact">Send Email</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/10 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground mb-4">Speak with our experts directly</p>
                <Button variant="outline" className="w-full bg-transparent">+94 11 234 5678</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
