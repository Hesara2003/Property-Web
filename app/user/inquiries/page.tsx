"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Home,
  DollarSign,
  CheckCircle,
  XCircle
} from "lucide-react"

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
    status: "pending" as const
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
    status: "available" as const
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
    status: "not_available" as const
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
    status: "pending" as const
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
    status: "available" as const
  }
]

export default function UserInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

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
    <div className="space-y-6">
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
    </div>
  )
}