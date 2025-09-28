"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Lock,
  Unlock,
  Bed,
  Bath,
  Square
} from "lucide-react"
import Link from "next/link"

// Mock Data
const mockMatches = [
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

export default function UserMatches() {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const getMatchStatusBadge = (status: string) => {
    switch (status) {
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

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Matched Properties</h3>
        <p className="text-sm text-muted-foreground">
          Properties that match your active requests. Unlock to view full details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMatches.map((match) => (
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
                    {getMatchStatusBadge(match.status)}
                  </div>
                  
                  <h5 className="font-medium text-sm line-clamp-1">{match.title}</h5>
                  <p className="text-lg font-bold">{formatPrice(match.price)}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {match.location}
                  </p>
                  
                  {match.status === "unlocked" ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        {match.bedrooms && (
                          <span className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {match.bedrooms}
                          </span>
                        )}
                        {match.bathrooms && (
                          <span className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {match.bathrooms}
                          </span>
                        )}
                        {match.area && (
                          <span className="flex items-center gap-1">
                            <Square className="h-3 w-3" />
                            {match.area} sq ft
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong>Seller:</strong> {match.seller}
                      </p>
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        <Link href={`/matches/${match.id}`} className="w-full">
                          View Full Details
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <Lock className="h-4 w-4 mx-auto text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {match.status === "locked" ? "Pay to unlock" : "Awaiting approval"}
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
  )
}