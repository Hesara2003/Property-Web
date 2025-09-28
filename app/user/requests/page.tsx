"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Lock,
  Unlock,
  Bed,
  Bath,
  Square,
  CheckCircle,
  Clock
} from "lucide-react"
import Link from "next/link"

// Mock Data (same from original dashboard)
const mockRequests: PropertyRequest[] = [
  {
    id: 1,
    purpose: "BUY" as const,
    propertyType: "HOUSE" as const,
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
    purpose: "RENT" as const,
    propertyType: "APARTMENT" as const,
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
    purpose: "BUY" as const,
    propertyType: "LAND" as const,
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

const mockRequestPayments = [
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

const mockMatches = [
  // Request 1 matches (all unlocked)
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
  // Request 2 matches (all in admin_review)
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
  // Request 3 matches (all locked)
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
  }
]

interface PropertyRequest {
  id: number
  purpose: "BUY" | "RENT"
  propertyType: "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL"
  locations: string[]
  budgetMin: number
  budgetMax: number
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
  sizeMin?: number
  sizeMax?: number
  floorMin?: number
  floorMax?: number
  amenities?: string[]
  frontageMin?: number
  frontageMax?: number
  zoningType?: string
  utilityWater?: boolean
  utilityElectricity?: boolean
  floorAreaMin?: number
  floorAreaMax?: number
  facilities?: string[]
  status: "pending" | "active" | "matched" | "completed"
  matches: number
  createdAt: string
}

export default function UserRequests() {
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

  const getMatchesForRequest = (requestId: number) => {
    return mockMatches.filter(match => match.requestId === requestId)
  }

  const getRequestPaymentStatus = (requestId: number) => {
    return mockRequestPayments.find(payment => payment.requestId === requestId)
  }

  const handleUnlockRequest = (requestId: number) => {
    console.log(`Payment initiated for request ${requestId}`)
  }

  return (
    <div className="space-y-6">
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
                {/* Request Summary */}
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
                    
                    {/* Match Cards */}
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
                                  <Badge className={
                                    match.status === "unlocked" ? "bg-purple-600 text-white" :
                                    match.status === "admin_review" ? "bg-yellow-600 text-white" :
                                    "bg-gray-600 text-white"
                                  }>
                                    {match.status === "unlocked" ? "Unlocked" :
                                     match.status === "admin_review" ? "Under Review" :
                                     "Locked"}
                                  </Badge>
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
    </div>
  )
}