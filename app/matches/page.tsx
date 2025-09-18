"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Home,
  Bell,
  User,
  Settings,
  LogOut,
  MapPin,
  Lock,
  Star,
  Search,
  Bed,
  Bath,
  Square,
  Shield,
  Crown,
  Unlock,
} from "lucide-react"
import Link from "next/link"

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    requestId: 1,
    title: "Luxury 3 BHK in Bandra West",
    price: 32000000,
    location: "Bandra West, Mumbai",
    matchScore: 95,
    verified: true,
    locked: false,
    image: "/luxury-apartment-bandra.jpg",
    seller: "Premium Properties",
    features: ["3 BHK", "2400 sq ft", "Sea View", "Parking"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    pricePerSqft: 13333,
    description: "Stunning sea-facing apartment with premium amenities",
  },
  {
    id: 2,
    requestId: 1,
    title: "Modern 3 BHK Apartment",
    price: 28000000,
    location: "Bandra West, Mumbai",
    matchScore: 88,
    verified: true,
    locked: true,
    image: "/modern-apartment-mumbai.png",
    seller: "Elite Realty",
    features: ["3 BHK", "2200 sq ft", "Gym", "Pool"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    pricePerSqft: 12727,
    description: "Contemporary design with world-class amenities",
  },
  {
    id: 3,
    requestId: 2,
    title: "Beachfront Villa in North Goa",
    price: 22000000,
    location: "Candolim, North Goa",
    matchScore: 92,
    verified: false,
    locked: true,
    image: "/beachfront-villa-goa.jpg",
    seller: "Coastal Properties",
    features: ["4 BHK", "3000 sq ft", "Beach Access", "Garden"],
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    pricePerSqft: 7333,
    description: "Private villa with direct beach access and tropical garden",
  },
  {
    id: 4,
    requestId: 1,
    title: "Premium Penthouse",
    price: 45000000,
    location: "Bandra West, Mumbai",
    matchScore: 85,
    verified: true,
    locked: true,
    image: "/premium-penthouse-mumbai.jpg",
    seller: "Luxury Homes",
    features: ["4 BHK", "3500 sq ft", "Terrace", "Private Lift"],
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    pricePerSqft: 12857,
    description: "Exclusive penthouse with panoramic city views",
  },
  {
    id: 5,
    requestId: 1,
    title: "Spacious Family Home",
    price: 26000000,
    location: "Bandra East, Mumbai",
    matchScore: 78,
    verified: false,
    locked: true,
    image: "/family-home-mumbai.jpg",
    seller: "Family Realty",
    features: ["3 BHK", "2100 sq ft", "Garden", "Security"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    pricePerSqft: 12381,
    description: "Perfect family home with private garden space",
  },
  {
    id: 6,
    requestId: 2,
    title: "Luxury Resort Villa",
    price: 35000000,
    location: "South Goa",
    matchScore: 89,
    verified: true,
    locked: true,
    image: "/resort-villa-goa.jpg",
    seller: "Resort Properties",
    features: ["5 BHK", "4000 sq ft", "Pool", "Staff Quarters"],
    bedrooms: 5,
    bathrooms: 4,
    area: 4000,
    pricePerSqft: 8750,
    description: "Luxury villa with private pool and resort-style amenities",
  },
]

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("match-score")
  const [filterBy, setFilterBy] = useState("all")
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<(typeof mockMatches)[0] | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatPricePerSqft = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const filteredMatches = mockMatches
    .filter((match) => {
      if (filterBy === "verified") return match.verified
      if (filterBy === "unlocked") return !match.locked
      if (filterBy === "locked") return match.locked
      return true
    })
    .filter((match) => match.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "match-score") return b.matchScore - a.matchScore
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return 0
    })

  const handleUnlock = (match: (typeof mockMatches)[0]) => {
    setSelectedMatch(match)
    setIsUnlockModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">PropertyHub</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard/buyer" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Property Matches</h1>
          <p className="text-muted-foreground">
            Discover properties that match your requirements. Unlock verified matches to view seller details.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match-score">Best Match</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Matches</SelectItem>
              <SelectItem value="verified">Verified Only</SelectItem>
              <SelectItem value="unlocked">Unlocked</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMatches.length} of {mockMatches.length} matches
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative">
                <img src={match.image || "/placeholder.svg"} alt={match.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">{match.matchScore}% Match</Badge>
                  {match.verified && (
                    <Badge className="bg-green-600 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                {match.locked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm font-medium">Locked Match</div>
                      <div className="text-xs opacity-80">Unlock to view details</div>
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-balance">{match.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      <MapPin className="h-4 w-4" />
                      {match.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">{formatPrice(match.price)}</div>
                    <div className="text-sm text-muted-foreground">{formatPricePerSqft(match.pricePerSqft)}/sq ft</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {match.bedrooms} BHK
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {match.bathrooms} Bath
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      {match.area} sq ft
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-pretty">{match.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {match.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {match.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{match.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {match.locked ? (
                      <Button className="flex-1" onClick={() => handleUnlock(match)}>
                        <Unlock className="h-4 w-4 mr-2" />
                        Unlock Now
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-transparent" variant="outline" asChild>
                        <Link href={`/matches/${match.id}`}>View Details</Link>
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Unlock Modal */}
        <Dialog open={isUnlockModalOpen} onOpenChange={setIsUnlockModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Unlock className="h-5 w-5" />
                Unlock Property Match
              </DialogTitle>
              <DialogDescription>
                Choose how you'd like to unlock this verified property match to view seller contact details.
              </DialogDescription>
            </DialogHeader>
            {selectedMatch && (
              <div className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold">{selectedMatch.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedMatch.location}</p>
                  <p className="text-lg font-bold text-primary mt-2">{formatPrice(selectedMatch.price)}</p>
                </div>

                <div className="space-y-4">
                  <Card className="p-4 border-2 border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Premium Plan</span>
                      </div>
                      <Badge>Recommended</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Unlimited unlocks + priority matching + featured requests
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹999/month</span>
                      <Button className="w-32">Upgrade</Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Unlock className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">One-time Unlock</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Unlock this single property match only</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹199</span>
                      <Button variant="outline" className="w-32 bg-transparent" asChild>
                        <Link href={`/matches/${selectedMatch.id}?unlocked=true`}>Unlock</Link>
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="text-center">
                  <Button variant="link" onClick={() => setIsUnlockModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
