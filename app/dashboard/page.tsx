"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Search, 
  MapPin, 
  Home, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Eye, 
  Star, 
  Calendar, 
  Percent, 
  Filter,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Bed,
  Bath,
  Square,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Lock,
  Unlock
} from "lucide-react"
import Link from "next/link"

// Types
interface PropertyRequest {
  id: number
  purpose: "BUY" | "RENT"
  propertyType: "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL"
  locations: string[]
  budgetMin: number
  budgetMax: number
  // House specific
  landSizeMin?: number
  landSizeMax?: number
  houseSizeMin?: number
  houseSizeMax?: number
  bedroomsMin?: number
  bedroomsMax?: number
  bathroomsMin?: number
  bathroomsMax?: number
  floorsMin?: number
  floorsMax?: number
  parkingMin?: number
  parkingMax?: number
  yearBuiltMin?: number
  yearBuiltMax?: number
  // Apartment specific
  sizeMin?: number
  sizeMax?: number
  floorMin?: number
  floorMax?: number
  amenities?: string[]
  // Land specific
  frontageMin?: number
  frontageMax?: number
  zoningType?: string
  utilityWater?: boolean
  utilityElectricity?: boolean
  // Commercial specific
  floorAreaMin?: number
  floorAreaMax?: number
  facilities?: string[]
  // Common fields
  status: "pending" | "active" | "matched" | "completed"
  matches: number
  createdAt: string
}

interface PropertyListing {
  id: number
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  status: "active" | "pending" | "sold"
  views: number
  inquiries: number
  matches: number
  images: string[]
  features: string[]
  createdAt: string
}

interface MatchedProperty {
  id: number
  requestId: number
  propertyId: number
  title: string
  price: number
  location: string
  matchScore: number
  status: "locked" | "payment_pending" | "paid" | "admin_review" | "approved" | "unlocked"
  image: string
  seller: string
  features: string[]
  bedrooms?: number
  bathrooms?: number
  area?: number
}

interface RequestPayment {
  requestId: number
  status: "locked" | "payment_pending" | "paid" | "admin_review" | "approved" | "unlocked"
  paymentDate?: string
  approvalDate?: string
  unlockDate?: string
  amount?: number
}

interface Inquiry {
  id: number
  propertyId: number
  propertyTitle: string
  propertyLocation: string
  propertyPrice: number
  potentialBuyerCount: number
  matchScore: number
  timestamp: string
  status: "pending" | "available" | "not_available"
}

// Mock Data
const mockRequests: PropertyRequest[] = [
  {
    id: 1,
    purpose: "BUY",
    propertyType: "HOUSE",
    locations: ["Western Province", "Colombo", "Gampaha"],
    budgetMin: 80000000,
    budgetMax: 120000000,
    landSizeMin: 8,
    landSizeMax: 15,
    houseSizeMin: 2000,
    houseSizeMax: 3000,
    bedroomsMin: 3,
    bedroomsMax: 4,
    bathroomsMin: 2,
    bathroomsMax: 3,
    parkingMin: 2,
    parkingMax: 3,
    status: "active",
    matches: 5,
    createdAt: "2025-01-15"
  },
  {
    id: 2,
    purpose: "RENT",
    propertyType: "APARTMENT",
    locations: ["Central Province", "Kandy"],
    budgetMin: 35000,
    budgetMax: 50000,
    sizeMin: 1200,
    sizeMax: 1600,
    bedroomsMin: 2,
    bedroomsMax: 2,
    bathroomsMin: 1,
    bathroomsMax: 2,
    floorMin: 5,
    floorMax: 15,
    amenities: ["Lift", "Gym", "Security"],
    status: "matched",
    matches: 3,
    createdAt: "2025-01-10"
  },
  {
    id: 3,
    purpose: "BUY",
    propertyType: "LAND",
    locations: ["Southern Province", "Galle", "Matara"],
    budgetMin: 25000000,
    budgetMax: 40000000,
    landSizeMin: 20,
    landSizeMax: 50,
    frontageMin: 60,
    frontageMax: 100,
    zoningType: "Residential",
    utilityWater: true,
    utilityElectricity: true,
    status: "pending",
    matches: 2,
    createdAt: "2025-01-20"
  }
]

const mockListings: PropertyListing[] = [
  {
    id: 1,
    title: "Beautiful 3BR House Colombo 6",
    price: 95000000,
    location: "Colombo 6, Sri Lanka",
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    status: "active",
    views: 156,
    inquiries: 8,
    matches: 12,
    images: ["/luxury-estate.png"],
    features: ["Garden", "Parking", "Security", "Modern Kitchen"],
    createdAt: "2025-01-12"
  },
  {
    id: 2,
    title: "Modern 2BR Apartment Kandy",
    price: 42000000,
    location: "Kandy, Sri Lanka",
    bedrooms: 2,
    bathrooms: 1,
    area: 1400,
    status: "active",
    views: 89,
    inquiries: 5,
    matches: 7,
    images: ["/modern-apartment-mumbai.png"],
    features: ["City View", "Modern", "Elevator", "Gym"],
    createdAt: "2025-01-18"
  }
]

const mockRequestPayments: RequestPayment[] = [
  {
    requestId: 1,
    status: "unlocked",
    paymentDate: "2025-01-16",
    approvalDate: "2025-01-17",
    unlockDate: "2025-01-17",
    amount: 5000
  },
  {
    requestId: 2,
    status: "admin_review",
    paymentDate: "2025-01-12",
    amount: 5000
  },
  {
    requestId: 3,
    status: "locked"
  }
]

const mockMatches: MatchedProperty[] = [
  // Request 1 matches (all unlocked because payment was made for the request)
  {
    id: 1,
    requestId: 1,
    propertyId: 1,
    title: "Beautiful 3BR House Colombo 6",
    price: 95000000,
    location: "Colombo 6, Sri Lanka",
    matchScore: 95,
    status: "unlocked",
    image: "/luxury-estate.png",
    seller: "Prime Properties",
    features: ["Garden", "Parking", "Security"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2200
  },
  {
    id: 2,
    requestId: 1,
    propertyId: 2,
    title: "Luxury Villa Colombo 7",
    price: 110000000,
    location: "Colombo 7, Sri Lanka",
    matchScore: 88,
    status: "unlocked",
    image: "/luxury-estate.png",
    seller: "Elite Properties",
    features: ["Pool", "Garden", "Security"],
    bedrooms: 4,
    bathrooms: 3,
    area: 2800
  },
  {
    id: 3,
    requestId: 1,
    propertyId: 3,
    title: "Modern House Gampaha",
    price: 85000000,
    location: "Gampaha, Sri Lanka",
    matchScore: 82,
    status: "unlocked",
    image: "/modern-apartment-mumbai.png",
    seller: "New Homes Ltd",
    features: ["Modern", "Parking", "Garden"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2000
  },
  // Request 2 matches (all in admin_review because payment was made)
  {
    id: 4,
    requestId: 2,
    propertyId: 4,
    title: "City View Apartment Kandy",
    price: 45000,
    location: "Kandy, Sri Lanka",
    matchScore: 92,
    status: "admin_review",
    image: "/modern-apartment-mumbai.png",
    seller: "Urban Realty",
    features: ["City View", "Gym", "Security"],
    bedrooms: 2,
    bathrooms: 2,
    area: 1400
  },
  {
    id: 5,
    requestId: 2,
    propertyId: 5,
    title: "Modern Apartment Complex",
    price: 42000,
    location: "Kandy, Sri Lanka",
    matchScore: 85,
    status: "admin_review",
    image: "/modern-apartment-mumbai.png",
    seller: "Metro Living",
    features: ["Lift", "Gym", "Pool"],
    bedrooms: 2,
    bathrooms: 1,
    area: 1300
  },
  // Request 3 matches (all locked because no payment made)
  {
    id: 6,
    requestId: 3,
    propertyId: 6,
    title: "Beachfront Land Galle",
    price: 35000000,
    location: "Galle, Sri Lanka",
    matchScore: 94,
    status: "locked",
    image: "/placeholder.svg",
    seller: "Coastal Properties",
    features: ["Beachfront", "Road Access", "Utilities"]
  },
  {
    id: 7,
    requestId: 3,
    propertyId: 7,
    title: "Agricultural Land Matara",
    price: 28000000,
    location: "Matara, Sri Lanka",
    matchScore: 86,
    status: "locked",
    image: "/placeholder.svg",
    seller: "Rural Properties",
    features: ["Road Access", "Water", "Electricity"]
  }
]

const mockInquiries: Inquiry[] = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Beautiful 3BR House Colombo 6",
    propertyLocation: "Colombo 6, Sri Lanka",
    propertyPrice: 95000000,
    potentialBuyerCount: 3,
    matchScore: 92,
    timestamp: "2025-01-24 14:30",
    status: "pending"
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Modern 2BR Apartment Kandy",
    propertyLocation: "Kandy, Sri Lanka",
    propertyPrice: 42000000,
    potentialBuyerCount: 2,
    matchScore: 88,
    timestamp: "2025-01-24 16:45",
    status: "available"
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Luxury Villa Colombo 7",
    propertyLocation: "Colombo 7, Sri Lanka",
    propertyPrice: 150000000,
    potentialBuyerCount: 1,
    matchScore: 85,
    timestamp: "2025-01-24 10:15",
    status: "not_available"
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: "Beachfront Land Galle",
    propertyLocation: "Galle, Sri Lanka", 
    propertyPrice: 85000000,
    potentialBuyerCount: 4,
    matchScore: 95,
    timestamp: "2025-01-24 09:30",
    status: "pending"
  },
  {
    id: 5,
    propertyId: 5,
    propertyTitle: "Commercial Building Negombo",
    propertyLocation: "Negombo, Sri Lanka",
    propertyPrice: 120000000,
    potentialBuyerCount: 1,
    matchScore: 78,
    timestamp: "2025-01-24 08:20",
    status: "available"
  }
]

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const getRequestTitle = (request: PropertyRequest) => {
    const purpose = request.purpose === "BUY" ? "Buy" : "Rent"
    const propertyType = request.propertyType.toLowerCase()
    const locationText = request.locations.length > 1 ? `${request.locations.length} locations` : request.locations[0]
    return `${purpose} ${propertyType} in ${locationText}`
  }

  const getRequestSpecs = (request: PropertyRequest) => {
    const specs: string[] = []
    
    if (request.bedroomsMin && request.bedroomsMax) {
      if (request.bedroomsMin === request.bedroomsMax) {
        specs.push(`${request.bedroomsMin} bedrooms`)
      } else {
        specs.push(`${request.bedroomsMin}-${request.bedroomsMax} bedrooms`)
      }
    }

    if (request.propertyType === "HOUSE") {
      if (request.landSizeMin && request.landSizeMax) {
        if (request.landSizeMin === request.landSizeMax) {
          specs.push(`${request.landSizeMin} perches`)
        } else {
          specs.push(`${request.landSizeMin}-${request.landSizeMax} perches`)
        }
      }
      if (request.houseSizeMin && request.houseSizeMax) {
        if (request.houseSizeMin === request.houseSizeMax) {
          specs.push(`${request.houseSizeMin} sq ft`)
        } else {
          specs.push(`${request.houseSizeMin}-${request.houseSizeMax} sq ft`)
        }
      }
    }

    if (request.propertyType === "APARTMENT") {
      if (request.sizeMin && request.sizeMax) {
        if (request.sizeMin === request.sizeMax) {
          specs.push(`${request.sizeMin} sq ft`)
        } else {
          specs.push(`${request.sizeMin}-${request.sizeMax} sq ft`)
        }
      }
    }

    if (request.propertyType === "LAND") {
      if (request.landSizeMin && request.landSizeMax) {
        if (request.landSizeMin === request.landSizeMax) {
          specs.push(`${request.landSizeMin} perches`)
        } else {
          specs.push(`${request.landSizeMin}-${request.landSizeMax} perches`)
        }
      }
      if (request.zoningType) {
        specs.push(request.zoningType)
      }
    }

    return specs
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-600 text-white"
      case "pending": return "bg-yellow-600 text-white"
      case "matched": return "bg-blue-600 text-white"
      case "completed": return "bg-purple-600 text-white"
      case "sold": return "bg-gray-600 text-white"
      default: return "bg-gray-600 text-white"
    }
  }

  const getMatchStatusBadge = (match: MatchedProperty) => {
    switch (match.status) {
      case "locked":
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Locked
        </Badge>
      case "payment_pending":
        return <Badge className="bg-orange-600 text-white">Payment Pending</Badge>
      case "paid":
        return <Badge className="bg-blue-600 text-white">Paid - Awaiting Admin</Badge>
      case "admin_review":
        return <Badge className="bg-yellow-600 text-white">Under Admin Review</Badge>
      case "approved":
        return <Badge className="bg-green-600 text-white">Approved - Ready to Unlock</Badge>
      case "unlocked":
        return <Badge className="bg-purple-600 text-white flex items-center gap-1">
          <Unlock className="h-3 w-3" />
          Unlocked
        </Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getMatchesForRequest = (requestId: number) => {
    return mockMatches.filter(match => match.requestId === requestId)
  }

  const getRequestPaymentStatus = (requestId: number) => {
    return mockRequestPayments.find(payment => payment.requestId === requestId)
  }

  const handleUnlockRequest = (requestId: number) => {
    console.log(`Payment initiated for request ${requestId}`)
    // This would handle the payment process for all matches in the request
  }



  const handleUnlockProperty = (matchId: number) => {
    // Handle payment and unlock logic here
    console.log("Unlocking property:", matchId)
  }

  const handleMarkAvailable = (inquiryId: number) => {
    setInquiries(prevInquiries => 
      prevInquiries.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: "available" as const }
          : inquiry
      )
    )
  }

  const handleMarkNotAvailable = (inquiryId: number) => {
    setInquiries(prevInquiries => 
      prevInquiries.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: "not_available" as const }
          : inquiry
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Property Scout</span>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-24 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground">
            Manage your property listings, track requests, and connect with buyers and sellers
          </p>
        </div>

        {/* Stats Cards - Combined View (8 Cards) */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Property Requests Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{mockRequests.length}</div>
                  <div className="text-sm text-muted-foreground">Active Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{mockMatches.length}</div>
                  <div className="text-sm text-muted-foreground">Total Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockMatches.filter(m => m.status === "unlocked").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Available Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Unlock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockMatches.filter(m => m.status === "unlocked").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Unlocked Properties</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Listings Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{mockListings.length}</div>
                  <div className="text-sm text-muted-foreground">Active Listings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockListings.reduce((acc, listing) => acc + listing.views, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockListings.reduce((acc, listing) => acc + listing.inquiries, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Inquiries</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockListings.reduce((acc, listing) => acc + listing.matches, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Listing Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="requests">My Property Requests & Matches</TabsTrigger>
            </TabsList>

            <div className="flex gap-3">
              <Link href="/request">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Property Request
                </Button>
              </Link>
              
              <Link href="/listing">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Property Listing
                </Button>
              </Link>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">New match found</p>
                        <p className="text-sm text-muted-foreground">Property in Colombo 6 matches your criteria</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">New inquiry received</p>
                        <p className="text-sm text-muted-foreground">Rajesh Silva interested in your Colombo 6 property</p>
                      </div>
                      <span className="text-sm text-muted-foreground">3 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">Request approved by admin</p>
                        <p className="text-sm text-muted-foreground">Your 3BR house request is now active</p>
                      </div>
                      <span className="text-sm text-muted-foreground">1 day ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">Property viewed</p>
                        <p className="text-sm text-muted-foreground">Your Kandy apartment viewed 8 times today</p>
                      </div>
                      <span className="text-sm text-muted-foreground">4 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Listing Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Listing Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Active Listings</span>
                      <Badge className="bg-green-600 text-white">{mockListings.filter(l => l.status === "active").length}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Total Views This Week</span>
                      <Badge className="bg-blue-600 text-white">245</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Pending Inquiries</span>
                      <Badge className="bg-orange-600 text-white">{inquiries.filter(i => i.status === "pending").length}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Conversion Rate</span>
                      <Badge className="bg-purple-600 text-white">12%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Request Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Active Requests</span>
                      <Badge className="bg-green-600 text-white">{mockRequests.filter(r => r.status === "active").length}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Available Matches</span>
                      <Badge className="bg-blue-600 text-white">{mockMatches.filter(m => m.status === "unlocked").length}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Pending Admin Review</span>
                      <Badge variant="secondary">0</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Completed Requests</span>
                      <Badge className="bg-purple-600 text-white">2</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
                {mockRequests.map((request) => {
                  const matches = getMatchesForRequest(request.id)
                  const paymentStatus = getRequestPaymentStatus(request.id)
                  return (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{getRequestTitle(request)}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2">
                              <MapPin className="h-4 w-4" />
                              {request.locations.join(", ")}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{matches.length} matches</Badge>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Request Summary - Simplified */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Budget</h4>
                              <p className="font-semibold">
                                {request.budgetMin === request.budgetMax 
                                  ? formatPrice(request.budgetMin)
                                  : `${formatPrice(request.budgetMin)} - ${formatPrice(request.budgetMax)}`
                                }
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Type</h4>
                              <p className="font-semibold">{request.propertyType} • {request.purpose}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Key Specs</h4>
                              <div className="flex flex-wrap gap-1">
                                {getRequestSpecs(request).slice(0, 2).map((spec, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {spec}
                                  </Badge>
                                ))}
                                {getRequestSpecs(request).length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{getRequestSpecs(request).length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Matches Section */}
                          {matches.length > 0 && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold">Property Matches</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{matches.length} found</Badge>
                                  {paymentStatus?.status === "locked" && (
                                    <Button 
                                      size="sm" 
                                      className="gap-2"
                                      onClick={() => handleUnlockRequest(request.id)}
                                    >
                                      <Lock className="h-4 w-4" />
                                      Unlock All Matches (LKR 5,000)
                                    </Button>
                                  )}
                                </div>
                              </div>
                              
                              {/* Payment Status Banner */}
                              {paymentStatus && paymentStatus.status !== "locked" && (
                                <div className={`p-3 rounded-lg border ${
                                  paymentStatus.status === "unlocked" ? "bg-green-50 border-green-200" :
                                  paymentStatus.status === "admin_review" ? "bg-yellow-50 border-yellow-200" :
                                  "bg-blue-50 border-blue-200"
                                }`}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      {paymentStatus.status === "unlocked" ? (
                                        <Unlock className="h-4 w-4 text-green-600" />
                                      ) : paymentStatus.status === "admin_review" ? (
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                      ) : (
                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                      )}
                                      <span className="font-medium">
                                        {paymentStatus.status === "unlocked" ? "All matches unlocked!" :
                                         paymentStatus.status === "admin_review" ? "Payment received - Under admin review" :
                                         "Payment processed"}
                                      </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {paymentStatus.paymentDate && `Paid ${new Date(paymentStatus.paymentDate).toLocaleDateString()}`}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Match Cards - Simplified */}
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {matches.map((match) => (
                                  <Card key={match.id} className="relative">
                                    <CardContent className="p-4">
                                      <div className="space-y-3">
                                        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                                          <img 
                                            src={match.image} 
                                            alt={match.title}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <Badge variant="secondary" className="text-xs">
                                              {match.matchScore}% match
                                            </Badge>
                                            {getMatchStatusBadge(match)}
                                          </div>
                                          
                                          <h5 className="font-medium text-sm line-clamp-1">{match.title}</h5>
                                          <p className="text-lg font-bold">{formatPrice(match.price)}</p>
                                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {match.location}
                                          </p>
                                          
                                          {match.status === "unlocked" ? (
                                            <Button size="sm" variant="outline" className="w-full text-xs">
                                              <Link href={`/matches/${match.id}`} className="w-full">
                                                View Full Details
                                              </Link>
                                            </Button>
                                          ) : (
                                            <div className="text-center py-2">
                                              <Lock className="h-4 w-4 mx-auto text-muted-foreground" />
                                              <p className="text-xs text-muted-foreground mt-1">
                                                {paymentStatus?.status === "locked" ? "Pay to unlock" : "Awaiting approval"}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Created {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                            <Button variant="outline" size="sm">
                              <Link href={`/request/${request.id}`}>
                                View Request Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>


          <TabsContent value="listings" className="space-y-6">
                {mockListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={listing.images[0] || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold">{listing.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{listing.location}</span>
                              </div>
                              <div className="text-2xl font-bold text-primary mt-2">
                                {formatPrice(listing.price)}
                              </div>
                            </div>
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Bed className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{listing.bedrooms} BR</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bath className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{listing.bathrooms} Bath</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Square className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{listing.area} sq ft</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="font-semibold">{listing.views}</div>
                              <div className="text-sm text-muted-foreground">Views</div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="font-semibold">{listing.inquiries}</div>
                              <div className="text-sm text-muted-foreground">Inquiries</div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="font-semibold">{listing.matches}</div>
                              <div className="text-sm text-muted-foreground">Matches</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="inquiries" className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Property Availability Checks</h3>
                  <p className="text-sm text-muted-foreground">
                    The system has found potential buyers for your properties. Please confirm availability to show matches.
                  </p>
                </div>
                
                {inquiries.map((inquiry) => (
                    <Card key={inquiry.id} className={inquiry.status !== "pending" ? "py-2" : undefined}>
                    <CardContent className="p-6">
                      {inquiry.status === "pending" ? (
                        /* Active Inquiry - Full Card */
                        <div className="space-y-4">
                          {/* Header with property info and status */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Home className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">{inquiry.propertyTitle}</h3>
                                <Badge className="bg-yellow-600 text-white">
                                  Awaiting Response
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {inquiry.propertyLocation}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  Listed: {formatPrice(inquiry.propertyPrice)}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">{inquiry.timestamp}</div>
                          </div>

                          {/* Match information */}
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{inquiry.potentialBuyerCount}</div>
                                <div className="text-sm text-muted-foreground">Potential Buyers</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{inquiry.matchScore}%</div>
                                <div className="text-sm text-muted-foreground">Average Match Score</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{inquiry.potentialBuyerCount + 2}</div>
                                <div className="text-sm text-muted-foreground">Current Matches</div>
                              </div>
                            </div>
                          </div>

                          {/* System question and actions */}
                          <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                              <h4 className="font-semibold text-primary">System Inquiry</h4>
                            </div>
                            <p className="text-sm mb-4">
                              <strong>Is this property currently available for sale/rent?</strong>
                              <br />
                              We have {inquiry.potentialBuyerCount} potential buyer{inquiry.potentialBuyerCount > 1 ? 's' : ''} with matching budgets ready to view this property.
                            </p>
                            
                            {/* Action buttons */}
                            <div className="flex gap-3">
                              <Button size="sm" className="gap-2" onClick={() => handleMarkAvailable(inquiry.id)}>
                                <CheckCircle className="h-4 w-4" />
                                Yes, Available
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2" onClick={() => handleMarkNotAvailable(inquiry.id)}>
                                <XCircle className="h-4 w-4" />
                                Not Available
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Inquiry History - Simple Card */
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${
                              inquiry.status === "available" ? "bg-green-500" : "bg-red-500"
                            }`}></div>
                            <div>
                              <h4 className="font-medium">{inquiry.propertyTitle}</h4>
                              <p className="text-sm text-muted-foreground">
                                System asked about availability • {inquiry.potentialBuyerCount} potential buyers
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={
                              inquiry.status === "available" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                            }>
                              {inquiry.status === "available" ? "Marked Available" : "Marked Unavailable"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{inquiry.timestamp}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}