"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
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
  Filter, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2,
  Clock,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Phone,
  Mail
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface PropertyMatch {
  id: number
  requestId: number
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  seller: string
  sellerPhone?: string
  sellerEmail?: string
  matchScore: number
  verified: boolean
  status: "pending_admin" | "admin_approved" | "seller_confirmed" | "available" | "unlocked"
  features: string[]
  description: string
  unlockFee: number
}

const mockMatches: PropertyMatch[] = [
  {
    id: 1,
    requestId: 1,
    title: "Beautiful 3BR House Colombo 6",
    price: 95000000,
    location: "Colombo 6, Sri Lanka",
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    image: "/luxury-estate.png",
    seller: "Prime Properties",
    sellerPhone: "+94 77 123 4567",
    sellerEmail: "contact@primeproperties.lk",
    matchScore: 95,
    verified: true,
    status: "available",
    features: ["Garden", "Parking", "Security", "Modern Kitchen"],
    description: "Stunning 3-bedroom house in prestigious Colombo 6 area with beautiful garden and modern amenities.",
    unlockFee: 5000,
  },
  {
    id: 2,
    requestId: 1,
    title: "Luxury Apartment Colombo 6",
    price: 110000000,
    location: "Colombo 6, Sri Lanka", 
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    image: "/luxury-apartment-bandra.jpg",
    seller: "Urban Elite",
    matchScore: 88,
    verified: true,
    status: "seller_confirmed",
    features: ["City View", "Gym", "Pool", "Parking"],
    description: "Premium apartment with city views and world-class amenities in the heart of Colombo.",
    unlockFee: 5000,
  },
  {
    id: 3,
    requestId: 2,
    title: "Modern 2BR Apartment Kandy",
    price: 42000000,
    location: "Kandy, Sri Lanka",
    bedrooms: 2,
    bathrooms: 1,
    area: 1400,
    image: "/modern-apartment-mumbai.png",
    seller: "Hill Country Homes",
    matchScore: 92,
    verified: false,
    status: "pending_admin",
    features: ["Mountain View", "Modern", "Elevator"],
    description: "Contemporary 2-bedroom apartment with stunning mountain views in scenic Kandy.",
    unlockFee: 5000,
  }
]

export default function MatchesPage() {
  const [matches, setMatches] = useState<PropertyMatch[]>([])
  const [sortBy, setSortBy] = useState("matchScore")
  const [filterBy, setFilterBy] = useState("all")
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const requestId = searchParams?.get("request")

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      let filteredMatches = mockMatches
      if (requestId) {
        filteredMatches = mockMatches.filter(match => match.requestId.toString() === requestId)
      }
      setMatches(filteredMatches)
      setLoading(false)
    }, 1000)
  }, [requestId])

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const handleUnlock = async (matchId: number) => {
    // Simulate payment processing
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: "unlocked" as const }
          : match
      )
    )
  }

  const getStatusBadge = (status: PropertyMatch["status"]) => {
    switch (status) {
      case "pending_admin":
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending Review</Badge>
      case "admin_approved":
        return <Badge className="bg-blue-600 text-white flex items-center gap-1"><Clock className="h-3 w-3" />Awaiting Seller</Badge>
      case "seller_confirmed":
        return <Badge className="bg-green-600 text-white flex items-center gap-1"><CheckCircle className="h-3 w-3" />Available</Badge>
      case "available":
        return <Badge className="bg-green-600 text-white flex items-center gap-1"><CheckCircle className="h-3 w-3" />Available</Badge>
      case "unlocked":
        return <Badge className="bg-purple-600 text-white flex items-center gap-1"><Unlock className="h-3 w-3" />Unlocked</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const isLocked = (match: PropertyMatch) => {
    return !["unlocked"].includes(match.status)
  }

  const canUnlock = (match: PropertyMatch) => {
    return ["available", "seller_confirmed"].includes(match.status)
  }

  const filteredMatches = matches.filter(match => {
    switch (filterBy) {
      case "verified": return match.verified
      case "available": return ["available", "seller_confirmed"].includes(match.status)
      case "unlocked": return match.status === "unlocked"
      case "pending": return ["pending_admin", "admin_approved"].includes(match.status)
      default: return true
    }
  })

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    switch (sortBy) {
      case "price": return a.price - b.price
      case "priceDesc": return b.price - a.price
      case "matchScore": return b.matchScore - a.matchScore
      default: return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Property Scout</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/matches" className="text-primary font-medium">
                Matches
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </nav>
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

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {requestId ? "Matches for Your Request" : "All Property Matches"}
          </h1>
          <p className="text-muted-foreground">
            Properties matched to your requirements. Pay to unlock full details and seller contact information.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="available">Available to Unlock</SelectItem>
                <SelectItem value="unlocked">Unlocked</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matchScore">Match Score</SelectItem>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="priceDesc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Input 
              placeholder="Search matches..." 
              className="max-w-sm"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{matches.length}</div>
              <div className="text-sm text-muted-foreground">Total Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {matches.filter(m => ["available", "seller_confirmed"].includes(m.status)).length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {matches.filter(m => m.status === "unlocked").length}
              </div>
              <div className="text-sm text-muted-foreground">Unlocked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {matches.length > 0 ? Math.round(matches.reduce((acc, m) => acc + m.matchScore, 0) / matches.length) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Match</div>
            </CardContent>
          </Card>
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMatches.map((match) => {
              const locked = isLocked(match)
              const canUnlockMatch = canUnlock(match)
              
              return (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={match.image} 
                        alt={match.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${match.matchScore >= 90 ? 'bg-green-600' : match.matchScore >= 80 ? 'bg-blue-600' : 'bg-orange-600'}`}
                      >
                        {match.matchScore}% Match
                      </Badge>
                      {match.verified && (
                        <Badge className="bg-blue-600 text-white">Verified</Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(match.status)}
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {locked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Lock className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">
                            {["pending_admin", "admin_approved"].includes(match.status) 
                              ? "Awaiting Approval" 
                              : "Locked"
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{match.title}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3" />
                        {match.location}
                      </div>
                      <div className="text-sm text-muted-foreground">by {match.seller}</div>
                    </div>

                    <div className="text-2xl font-bold text-primary">
                      {locked ? "LKR ••••••••" : formatPrice(match.price)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {match.bedrooms} BR
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {match.bathrooms} Bath
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        {locked ? "••••" : match.area} sq ft
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {locked ? "Unlock to view full description and contact details" : match.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {(locked ? match.features.slice(0, 2) : match.features).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {locked && match.features.length > 2 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">+{match.features.length - 2} more</span>
                      )}
                    </div>

                    {match.status === "unlocked" ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          <span>{match.sellerPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4" />
                          <span>{match.sellerEmail}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 gap-2">
                            <Phone className="h-4 w-4" />
                            Call Now
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </Button>
                        </div>
                      </div>
                    ) : canUnlockMatch ? (
                      <Button 
                        className="w-full gap-2" 
                        onClick={() => handleUnlock(match.id)}
                      >
                        <Unlock className="h-4 w-4" />
                        Unlock for {formatPrice(match.unlockFee)}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        disabled
                        variant="secondary"
                      >
                        {match.status === "pending_admin" && "Pending Admin Approval"}
                        {match.status === "admin_approved" && "Awaiting Seller Confirmation"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {sortedMatches.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No matches found</h3>
              <p className="text-muted-foreground">
                {requestId 
                  ? "No matches found for this specific request. Try creating a new request with different criteria."
                  : "Try adjusting your filters or create a new property request to find more matches."
                }
              </p>
              <Button asChild>
                <Link href="/dashboard">Create New Request</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}