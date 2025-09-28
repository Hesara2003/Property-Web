"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  Users, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  MapPin,
  DollarSign,
  Camera,
  Building2,
  UserCheck,
  Bell,
  BarChart3,
  Zap,
  Award
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface DetailedStep {
  id: number
  title: string
  icon: any
  headline: string
  description: string
  detailedProcess: {
    forSellers: string[]
    forBuyers: string[]
    systemProcess: string[]
  }
  timeline: string
  benefits: string[]
}

interface Plan {
  name: string
  monthly: number
  description: string
  features: string[]
  detailedFeatures: {
    category: string
    items: string[]
  }[]
  popular?: boolean
  tierNote?: string
  ideal: string[]
}

const detailedSteps: DetailedStep[] = [
  {
    id: 1,
    title: 'Account Setup & Profile Creation',
    icon: UserCheck,
    headline: 'Professional Profile Setup & Identity Verification',
    description: 'Start your property journey by creating a comprehensive profile. We verify your identity and credentials to ensure trust and credibility in our marketplace.',
    detailedProcess: {
      forSellers: [
        'Complete seller profile with property portfolio overview',
        'Upload identity documents and ownership certificates',
        'Verify business registration (for agents/developers)',
        'Set up contact preferences and availability',
        'Connect bank details for secure transactions',
        'Complete property seller assessment questionnaire'
      ],
      forBuyers: [
        'Create detailed buyer profile with preferences',
        'Submit identity verification documents',
        'Complete financial pre-qualification (optional)',
        'Set up search alerts and notification preferences',
        'Define budget range and financing options',
        'Complete buyer needs assessment survey'
      ],
      systemProcess: [
        'Identity document verification through secure systems',
        'Background checks for professional credentials',
        'Profile completeness scoring and recommendations',
        'Security clearance and fraud prevention checks',
        'Account activation and welcome onboarding',
        'Integration with communication and notification systems'
      ]
    },
    timeline: '2-4 hours for verification',
    benefits: [
      'Verified and trusted marketplace participation',
      'Enhanced credibility and profile visibility',
      'Access to exclusive verified-only features',
      'Secure and protected account environment'
    ]
  },
  {
    id: 2,
    title: 'Property Listing & Requirement Submission',
    icon: Search,
    headline: 'Comprehensive Property Database Creation',
    description: 'The foundation of our marketplace begins with detailed property listings from sellers and specific requirement submissions from buyers. This dual approach ensures we have both supply and demand clearly defined.',
    detailedProcess: {
      forSellers: [
        'Create detailed property profiles with complete specifications',
        'Upload high-quality photos from multiple angles',
        'Set competitive pricing based on market analysis',
        'Provide legal documentation and ownership verification',
        'Specify property features, amenities, and nearby facilities',
        'Set availability status and viewing preferences'
      ],
      forBuyers: [
        'Submit comprehensive property requirement forms',
        'Define budget range and financing preferences',
        'Specify location preferences with radius mapping',
        'Detail property type, size, and feature requirements',
        'Set timeline expectations and urgency levels',
        'Provide contact preferences and availability'
      ],
      systemProcess: [
        'Automated data validation and completeness checks',
        'Property categorization and tagging system',
        'Market value estimation and pricing suggestions',
        'Location-based indexing for quick searches',
        'Quality score assignment based on listing completeness',
        'Initial compliance and legal requirement verification'
      ]
    },
    timeline: 'Immediate upon submission',
    benefits: [
      'Comprehensive property database',
      'Accurate buyer-seller matching potential',
      'Reduced time waste on unsuitable properties',
      'Professional presentation of all listings'
    ]
  },
  {
    id: 3,
    title: 'Intelligent Matching Algorithm',
    icon: Zap,
    headline: 'AI-Powered Multi-Criteria Property Matching',
    description: 'Our sophisticated matching system analyzes over 50 different criteria to identify the most compatible property-buyer combinations, ensuring highly relevant matches.',
    detailedProcess: {
      forSellers: [
        'Automatic inclusion in relevant buyer searches',
        'Property optimization suggestions for better matches',
        'Market positioning analysis and recommendations',
        'Competitive pricing insights and adjustments',
        'Performance tracking for listing effectiveness',
        'Automated match notifications when buyers show interest'
      ],
      forBuyers: [
        'Receive AI-curated property matches based on preferences',
        'Get similarity scores and compatibility ratings',
        'Access to detailed match reasoning and criteria analysis',
        'Continuous learning from your feedback and interactions',
        'Refined searches based on viewing history and preferences',
        'Priority matching for verified and premium users'
      ],
      systemProcess: [
        'Multi-dimensional compatibility analysis using ML algorithms',
        'Real-time market data integration for pricing accuracy',
        'Geographic and infrastructure compatibility assessment',
        'Lifestyle and amenity preference matching',
        'Financial compatibility and affordability analysis',
        'Continuous algorithm refinement based on successful matches'
      ]
    },
    timeline: '30 seconds to 5 minutes',
    benefits: [
      'Highly accurate property-buyer compatibility',
      'Significant time savings in property search',
      'Reduced irrelevant property viewings',
      'Improved match quality over time'
    ]
  },
  {
    id: 4,
    title: 'Availability Verification & Initial Contact',
    icon: Phone,
    headline: 'Real-Time Property Status Confirmation',
    description: 'Before delivering matches to buyers, we contact sellers directly to confirm current availability, gather additional details, and ensure all information is up-to-date.',
    detailedProcess: {
      forSellers: [
        'Receive automated availability confirmation requests',
        'Update property status and any recent changes',
        'Provide additional details requested by potential buyers',
        'Confirm viewing availability and preferred timings',
        'Update pricing or terms if market conditions change',
        'Respond to specific buyer questions through our platform'
      ],
      forBuyers: [
        'Receive initial matching notifications within hours',
        'Review preliminary property matches with basic details',
        'Express interest levels for different properties',
        'Provide additional preferences based on initial matches',
        'Access to preliminary seller contact for direct communication',
        'Schedule initial property viewings through our coordination'
      ],
      systemProcess: [
        'Automated availability confirmation calls to sellers',
        'Real-time property status updates in the system',
        'Additional property detail collection and verification',
        'Seller responsiveness and engagement tracking',
        'Match quality scoring based on seller confirmation',
        'Buyer notification preparation with verified information'
      ]
    },
    timeline: '2-6 hours for confirmation',
    benefits: [
      'Confirmed property availability before buyer contact',
      'Up-to-date property information and pricing',
      'Reduced disappointment from unavailable properties',
      'Efficient use of viewing time for buyers'
    ]
  },
  {
    id: 5,
    title: 'Manual Quality Assurance & Verification',
    icon: Shield,
    headline: 'Human Expert Review & Quality Control',
    description: 'Our experienced property professionals manually review each match, verify all details, and ensure quality standards before delivering to buyers.',
    detailedProcess: {
      forSellers: [
        'Direct phone contact from our verification team',
        'Comprehensive property detail confirmation',
        'Legal documentation review and verification',
        'Market positioning and pricing consultation',
        'Professional photography scheduling if needed',
        'Quality assurance feedback and improvement suggestions'
      ],
      forBuyers: [
        'Receive quality-assured property information packages',
        'Access to verified seller credentials and contact details',
        'Get expert market analysis and property insights',
        'Receive professional consultation on property suitability',
        'Access to negotiation tips and market guidance',
        'Quality guarantee on all delivered information'
      ],
      systemProcess: [
        'Manual verification calls to all matched sellers',
        'Cross-referencing with public records and legal databases',
        'Property valuation and market analysis by experts',
        'Legal compliance and documentation verification',
        'Quality scoring and approval workflow management',
        'Final packaging and delivery preparation'
      ]
    },
    timeline: '4-12 hours for verification',
    benefits: [
      '100% human-verified property information',
      'Expert market insights and professional guidance',
      'Legal compliance and documentation verification',
      'Quality-guaranteed property matches'
    ]
  },
  {
    id: 6,
    title: 'Match Delivery & Ongoing Support',
    icon: Home,
    headline: 'Professional Match Delivery & Transaction Support',
    description: 'Verified matches are professionally packaged and delivered to buyers with complete seller information, market insights, and ongoing support throughout the process.',
    detailedProcess: {
      forSellers: [
        'Receive buyer interest notifications with verified buyer profiles',
        'Get market feedback and positioning insights from our team',
        'Access to professional consultation on pricing and negotiations',
        'Ongoing relationship management and transaction support',
        'Performance analytics and listing optimization recommendations',
        'Priority support throughout the selling process'
      ],
      forBuyers: [
        'Receive comprehensive property packages within 24 hours',
        'Access complete verified seller contact information',
        'Get detailed market analysis and investment insights',
        'Receive negotiation support and professional guidance',
        'Access to viewing coordination and scheduling assistance',
        'Ongoing support throughout the entire purchase process'
      ],
      systemProcess: [
        'Professional packaging of verified match information',
        'Automated delivery through multiple communication channels',
        'Customer satisfaction tracking and feedback collection',
        'Transaction progress monitoring and milestone tracking',
        'Post-delivery support coordination and case management',
        'Success rate analysis and continuous improvement implementation'
      ]
    },
    timeline: 'Within 24 hours guaranteed delivery',
    benefits: [
      'Complete verified property and seller information',
      'Professional market analysis and insights included',
      'Ongoing transaction support and guidance',
      'Guaranteed satisfaction and quality assurance'
    ]
  }
]

const detailedPlans: Plan[] = [
  {
    name: "Free Explorer",
    monthly: 0,
    description: "Perfect for casual property seekers and first-time users",
    features: [
      "Dashboard Access",
      "3 Property Listings",
      "3 Buying Requests", 
      "Up to 3 Matches/month",
      "Free + Verified Pool Access",
      "Basic Email Notifications",
      "Email Support Only",
      "Standard Branding Experience"
    ],
    detailedFeatures: [
      {
        category: "Access & Usage",
        items: [
          "Full dashboard access with basic analytics",
          "Browse all public property listings",
          "Submit up to 3 property listings per month",
          "Create up to 3 buying requests per month",
          "Access to community forums and resources"
        ]
      },
      {
        category: "Matching & Network", 
        items: [
          "Receive up to 3 verified matches per month",
          "Access to both free and verified user pools",
          "Basic matching algorithm (10 criteria)",
          "Standard response time (48-72 hours)",
          "Access to general property market insights"
        ]
      },
      {
        category: "Communication & Support",
        items: [
          "Basic email notifications for matches",
          "Email-only customer support",
          "Standard response time (24-48 hours)",
          "Access to help documentation",
          "Community forum participation"
        ]
      }
    ],
    ideal: [
      "First-time property seekers",
      "Casual browsers exploring the market", 
      "Users wanting to test the platform",
      "Budget-conscious individuals",
      "Students or young professionals"
    ]
  },
  {
    name: "Verified Professional",
    monthly: 2000,
    description: "Complete solution for serious property transactions with exclusive verified network access",
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
      "Verified-only Network Access"
    ],
    detailedFeatures: [
      {
        category: "Access & Usage",
        items: [
          "Unlimited property listings with premium placement",
          "Unlimited buying requests with priority processing",
          "Advanced dashboard with comprehensive analytics",
          "Market trend analysis and predictions",
          "Exclusive verified-only network access",
          "Professional property portfolio management tools"
        ]
      },
      {
        category: "Matching & Network",
        items: [
          "Unlimited verified matches with instant delivery",
          "Access to verified professionals only",
          "Advanced AI matching (50+ criteria)",
          "Priority matching within 2-6 hours",
          "Exclusive market insights and reports",
          "Professional networking opportunities"
        ]
      },
      {
        category: "Verification & Trust",
        items: [
          "Professional verification badge display",
          "Identity and credential verification",
          "Enhanced profile visibility and credibility",
          "Access to verified seller/buyer networks",
          "Professional reputation management",
          "Trust score and rating system"
        ]
      },
      {
        category: "Communication & Support",
        items: [
          "Instant push and email notifications",
          "Priority chat and phone support",
          "Dedicated account manager (high volume users)",
          "24/7 technical support availability",
          "Professional consultation services",
          "Direct line to verification team"
        ]
      },
      {
        category: "Analytics & Insights", 
        items: [
          "Comprehensive property performance analytics",
          "Market trend analysis and predictions", 
          "Buyer behavior and preference insights",
          "ROI analysis and investment recommendations",
          "Competitive market positioning data",
          "Custom reporting and data exports"
        ]
      }
    ],
    popular: true,
    tierNote: "Most Popular",
    ideal: [
      "Real estate professionals and agents",
      "Serious property investors",
      "High-value property transactions",
      "Business and commercial property needs",
      "Users requiring premium support and features"
    ]
  }
]

function formatLKR(value: number) {
  return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(value)
}

export default function HowToWorkPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [showDetailedComparison, setShowDetailedComparison] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-violet-50/20">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600/10 via-white to-violet-600/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="px-4 py-2 bg-blue-600 text-white">
              Complete Guide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-balance">
              How Property Scout Works
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive guide to our property matching process, verification system, and pricing plans. 
              Learn how we connect verified sellers with serious buyers across Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light tracking-tight mb-6">Our Complete Property Matching Process</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From account setup to final transaction support, every step is designed to ensure quality, 
                accuracy, and professional service delivery throughout your property journey.
              </p>
            </div>

            <div className="space-y-20">
              {detailedSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === step.id
                const isEven = index % 2 === 0

                return (
                  <div key={step.id} className="relative">
                    {/* Timeline connector */}
                    {index < detailedSteps.length - 1 && (
                      <div className="absolute left-8 md:left-1/2 md:-ml-0.5 top-20 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-violet-500 opacity-30"></div>
                    )}
                    
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-cols-2'}`}>
                      {/* Step Number & Icon */}
                      <div className={`${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                        <div className="flex items-center gap-6 mb-8">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">
                              {step.id}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{step.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-blue-600">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{step.timeline}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <h4 className="text-xl font-semibold text-blue-700">{step.headline}</h4>
                          <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            {step.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-sm">
                                <Star className="h-4 w-4 text-yellow-500 mt-1 shrink-0" />
                                <span className="text-muted-foreground">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            variant={isActive ? "default" : "outline"}
                            onClick={() => setActiveStep(isActive ? null : step.id)}
                            className="mt-6"
                            size="lg"
                          >
                            {isActive ? 'Hide Process Details' : 'Show Detailed Process'}
                            <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                          </Button>
                        </div>
                      </div>

                      {/* Process Details */}
                      <div className={`${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                        {isActive ? (
                          <div className="bg-gradient-to-br from-blue-50/50 via-white to-violet-50/30 p-8 rounded-2xl border border-blue-200/50">
                            <div className="space-y-8">
                              {/* For Sellers */}
                              <div>
                                <h5 className="font-semibold text-green-700 mb-4 flex items-center gap-2 text-lg">
                                  <Building2 className="h-5 w-5" />
                                  For Property Sellers
                                </h5>
                                <div className="space-y-3">
                                  {step.detailedProcess.forSellers.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* For Buyers */}
                              <div>
                                <h5 className="font-semibold text-blue-700 mb-4 flex items-center gap-2 text-lg">
                                  <Users className="h-5 w-5" />
                                  For Property Buyers
                                </h5>
                                <div className="space-y-3">
                                  {step.detailedProcess.forBuyers.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* System Process */}
                              <div>
                                <h5 className="font-semibold text-purple-700 mb-4 flex items-center gap-2 text-lg">
                                  <Zap className="h-5 w-5" />
                                  Our System Process
                                </h5>
                                <div className="space-y-3">
                                  {step.detailedProcess.systemProcess.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-1 shrink-0" />
                                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-12 rounded-2xl border border-slate-200/50">
                            <div className="grid grid-cols-3 gap-8 text-center">
                              <div className="space-y-4">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <Building2 className="h-10 w-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                  <p className="font-semibold text-green-700">What Sellers Do</p>
                                  <p className="text-xs text-muted-foreground">Tasks for property owners & agents</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <Users className="h-10 w-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                  <p className="font-semibold text-blue-700">What Buyers Do</p>
                                  <p className="text-xs text-muted-foreground">Actions for property seekers</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                                  <Zap className="h-10 w-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                  <p className="font-semibold text-purple-700">What We Handle</p>
                                  <p className="text-xs text-muted-foreground">Automated backend processes</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Detailed Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="px-4 py-2 bg-violet-600 text-white mb-6">
                Transparent Pricing
              </Badge>
              <h2 className="text-4xl font-light tracking-tight mb-6">Choose Your Plan</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From free exploration to professional verification - find the perfect plan for your property needs. 
                All plans include our core matching service with varying levels of access and support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {detailedPlans.map((plan, index) => (
                <div 
                  key={plan.name}
                  className={`relative p-8 rounded-3xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-blue-50 via-white to-violet-50 border-2 border-blue-500/30 shadow-xl shadow-blue-500/10' 
                      : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/50 hover:border-blue-300/50'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 shadow-lg">
                      {plan.tierNote}
                    </Badge>
                  )}
                  
                  <div className="space-y-8">
                    {/* Plan Header */}
                    <div className="text-center space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold tracking-tight">{plan.name}</h3>
                        <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                      </div>
                      
                      <div className="py-4">
                        {plan.monthly > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-baseline justify-center gap-2">
                              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                {formatLKR(plan.monthly)}
                              </span>
                              <span className="text-lg text-muted-foreground font-medium">/month</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Billed monthly • Cancel anytime</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                              Free
                            </span>
                            <p className="text-sm text-muted-foreground">No credit card required</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ideal For */}
                    <div className="bg-white/60 p-6 rounded-2xl">
                      <h4 className="font-semibold mb-4 text-slate-700">Perfect for:</h4>
                      <div className="flex flex-wrap gap-2">
                        {plan.ideal.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs px-3 py-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Feature Categories */}
                    <div className="space-y-6">
                      {plan.detailedFeatures.map((category, idx) => (
                        <div key={idx} className="space-y-4">
                          <h5 className="font-semibold text-blue-700 flex items-center gap-3 text-base border-b border-blue-200/50 pb-2">
                            {category.category === 'Access & Usage' && <Home className="h-5 w-5" />}
                            {category.category === 'Matching & Network' && <Users className="h-5 w-5" />}
                            {category.category === 'Communication & Support' && <MessageSquare className="h-5 w-5" />}
                            {category.category === 'Verification & Trust' && <Shield className="h-5 w-5" />}
                            {category.category === 'Analytics & Insights' && <BarChart3 className="h-5 w-5" />}
                            {category.category}
                          </h5>
                          <div className="space-y-3">
                            {category.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                      <Button 
                        className={`w-full py-4 text-lg font-medium transition-all duration-300 ${
                          plan.popular
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                            : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}
                        size="lg"
                        asChild
                      >
                        <Link href="/auth" className="flex items-center justify-center gap-3">
                          {plan.monthly === 0 ? 'Start Free Today' : 'Get Verified Now'}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Toggle */}
            <div className="text-center mb-8">
              <Button
                variant="outline"
                onClick={() => setShowDetailedComparison(!showDetailedComparison)}
                className="gap-2"
              >
                {showDetailedComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
                <ArrowRight className={`h-4 w-4 transition-transform ${showDetailedComparison ? 'rotate-90' : ''}`} />
              </Button>
            </div>

            {/* Detailed Comparison Table */}
            {showDetailedComparison && (
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 rounded-3xl border border-slate-200/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-blue-200">
                        <th className="p-4 text-left font-semibold text-slate-700">Feature Category</th>
                        <th className="p-4 text-center font-semibold text-slate-700">Free Explorer</th>
                        <th className="p-4 text-center font-semibold text-blue-700">Verified Professional</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50">
                      {[
                        { category: 'Property Listings', free: '3 per month', verified: 'Unlimited with premium placement' },
                        { category: 'Buying Requests', free: '3 per month', verified: 'Unlimited with priority processing' },
                        { category: 'Matches Received', free: 'Up to 3 per month', verified: 'Unlimited instant delivery' },
                        { category: 'Network Access', free: 'Free + Verified users', verified: 'Verified professionals only' },
                        { category: 'Matching Algorithm', free: '10 basic criteria', verified: '50+ advanced criteria' },
                        { category: 'Response Time', free: '48-72 hours', verified: '2-6 hours priority' },
                        { category: 'Verification Badge', free: 'None', verified: 'Professional verification badge' },
                        { category: 'Notifications', free: 'Basic email only', verified: 'Instant push + email' },
                        { category: 'Analytics', free: 'Basic dashboard', verified: 'Comprehensive analytics & insights' },
                        { category: 'Support', free: 'Email only (24-48h)', verified: 'Priority chat/phone (24/7)' },
                        { category: 'Market Insights', free: 'General market info', verified: 'Exclusive reports & trends' },
                        { category: 'Ad Experience', free: 'Standard branding', verified: 'Completely ad-free' }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/50 transition-colors">
                          <td className="p-4 font-medium text-slate-700">{row.category}</td>
                          <td className="p-4 text-center text-muted-foreground">{row.free}</td>
                          <td className="p-4 text-center text-muted-foreground font-medium">{row.verified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Shield, title: 'Secure & Verified', text: 'Bank-grade security with manual verification process' },
                { icon: Clock, title: '24-Hour Delivery', text: 'Guaranteed delivery of verified matches within 24 hours' },
                { icon: Award, title: '5,000+ Happy Users', text: 'Trusted by property professionals across Sri Lanka' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="text-center mt-16">
              <Button size="lg" asChild className="px-12 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl">
                <Link href="/auth" className="flex items-center gap-3">
                  Start Your Property Journey
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Join thousands of verified property professionals • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}