"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Home,
  Bell,
  User,
  MapPin,
  Star,
  Share2,
  Heart,
  ArrowLeft,
  Bed,
  Bath,
  Square,
  Car,
  Shield,
  Phone,
  Mail,
  Calendar,
  FileText,
  Download,
  Crown,
  Unlock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"

// Mock data for individual listing
const mockListing = {
  id: 1,
  title: "Luxury 3 BHK in Bandra West",
  price: 32000000,
  location: "Bandra West, Mumbai",
  matchScore: 95,
  verified: true,
  locked: false,
  images: [
    "/luxury-apartment-bandra.jpg",
    "/modern-apartment-mumbai.png",
    "/beachfront-villa-goa.jpg",
    "/premium-penthouse-mumbai.jpg",
  ],
  seller: {
    name: "Premium Properties",
    phone: "+91 98765 43210",
    email: "contact@premiumproperties.com",
    verified: true,
    rating: 4.8,
    totalSales: 127,
  },
  details: {
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    pricePerSqft: 13333,
    floors: 15,
    totalFloors: 20,
    age: 2,
    facing: "North-East",
    furnished: "Semi-Furnished",
    parking: 2,
  },
  features: [
    "Sea View",
    "Swimming Pool",
    "Gym",
    "Security",
    "Power Backup",
    "Lift",
    "Garden",
    "Club House",
    "Children's Play Area",
    "Jogging Track",
  ],
  description: `This stunning 3 BHK apartment offers breathtaking sea views and premium amenities. Located in the heart of Bandra West, it provides easy access to shopping, dining, and entertainment options. The apartment features spacious rooms, modern fittings, and high-quality finishes throughout.

The building offers world-class amenities including a swimming pool, fully equipped gym, landscaped gardens, and 24/7 security. With excellent connectivity to major business districts and the airport, this property is perfect for both end-users and investors.`,
  documents: [
    { name: "Property Title Deed", verified: true },
    { name: "Building Approval", verified: true },
    { name: "Occupancy Certificate", verified: true },
    { name: "Property Tax Receipt", verified: true },
    { name: "Society NOC", verified: false },
  ],
  nearbyPlaces: [
    { name: "Bandra Station", distance: "0.8 km", type: "Railway" },
    { name: "Linking Road", distance: "0.5 km", type: "Shopping" },
    { name: "Lilavati Hospital", distance: "1.2 km", type: "Hospital" },
    { name: "St. Andrews High School", distance: "0.7 km", type: "School" },
  ],
}

export default function ListingDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)

  const isUnlocked = searchParams.get("unlocked") === "true" || !mockListing.locked

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/matches">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Home className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">PropertyHub</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={mockListing.images[currentImageIndex] || "/placeholder.svg"}
                  alt={mockListing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {mockListing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-balance">{mockListing.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{mockListing.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">{mockListing.matchScore}% Match</Badge>
                    {mockListing.verified && (
                      <Badge className="bg-green-600 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-primary">{formatPrice(mockListing.price)}</div>
                  <div className="text-muted-foreground">{formatPrice(mockListing.details.pricePerSqft)}/sq ft</div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{mockListing.details.bedrooms} BHK</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{mockListing.details.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{mockListing.details.area}</div>
                  <div className="text-sm text-muted-foreground">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{mockListing.details.parking}</div>
                  <div className="text-sm text-muted-foreground">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                <div className="prose prose-gray max-w-none">
                  {mockListing.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockListing.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor</span>
                      <span className="font-medium">
                        {mockListing.details.floors} of {mockListing.details.totalFloors}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age</span>
                      <span className="font-medium">{mockListing.details.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Facing</span>
                      <span className="font-medium">{mockListing.details.facing}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Furnished</span>
                      <span className="font-medium">{mockListing.details.furnished}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parking</span>
                      <span className="font-medium">{mockListing.details.parking} spaces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Area</span>
                      <span className="font-medium">{mockListing.details.area} sq ft</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Nearby Places</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockListing.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{place.name}</div>
                        <div className="text-sm text-muted-foreground">{place.type}</div>
                      </div>
                      <div className="text-sm font-medium">{place.distance}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Contact */}
            {isUnlocked ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Verified Seller
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{mockListing.seller.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {mockListing.seller.rating} • {mockListing.seller.totalSales} sales
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      {mockListing.seller.phone}
                    </Button>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Verified Seller</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unlock this match to view seller contact details and property documents.
                  </p>
                  <Button className="w-full" onClick={() => setIsUnlockModalOpen(true)}>
                    <Unlock className="h-4 w-4 mr-2" />
                    Unlock Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Property Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockListing.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${doc.verified ? "bg-green-600" : "bg-yellow-500"}`} />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      {isUnlocked && (
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {!isUnlocked && (
                  <div className="mt-4 p-3 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Unlock to download documents</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Schedule Visit */}
            <Card>
              <CardContent className="p-6">
                <Button className="w-full gap-2" disabled={!isUnlocked}>
                  <Calendar className="h-4 w-4" />
                  Schedule Visit
                </Button>
                {!isUnlocked && (
                  <p className="text-xs text-muted-foreground text-center mt-2">Unlock to schedule property visit</p>
                )}
              </CardContent>
            </Card>
          </div>
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
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">{mockListing.title}</h4>
                <p className="text-sm text-muted-foreground">{mockListing.location}</p>
                <p className="text-lg font-bold text-primary mt-2">{formatPrice(mockListing.price)}</p>
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
                      <Link href={`/matches/${params.id}?unlocked=true`}>Unlock</Link>
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
