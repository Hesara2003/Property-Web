"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Bed,
  Bath,
  Square,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

// Mock Data
const mockListings = [
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

export default function UserListings() {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-600 text-white"
      case "pending": return "bg-yellow-600 text-white"
      case "sold": return "bg-gray-600 text-white"
      default: return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="space-y-6">
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
    </div>
  )
}