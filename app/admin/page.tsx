"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Home, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  Clock,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Bell,
  User as UserIcon,
  Settings,
  LogOut
} from "lucide-react"
import Link from "next/link"

// Types for admin data
interface PropertyListing {
  id: number
  title: string
  seller: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

interface User {
  id: number
  name: string
  email: string
  phone: string
  type: "buyer" | "seller"
  registeredAt: string
  status: "active" | "pending" | "suspended"
  totalRequests?: number
  totalListings?: number
}

interface Inquiry {
  id: number
  userId: number
  userName: string
  userEmail: string
  type: "property_request" | "match_payment"
  title: string
  description: string
  propertyDetails?: {
    location: string
    minPrice: number
    maxPrice: number
    bedrooms: number
  }
  matchDetails?: {
    propertyTitle: string
    matchScore: number
    price: number
    paymentStatus: "pending" | "paid" | "failed"
    paymentAmount: number
  }
  status: "pending" | "approved" | "rejected" | "payment_required"
  submittedAt: string
  hasMatches?: boolean
  matchesLocked?: boolean
}

// Mock data
const mockPendingListings: PropertyListing[] = [
  {
    id: 1,
    title: "Luxury Apartment in Nugegoda",
    seller: "Elite Properties",
    location: "Nugegoda, Sri Lanka",
    price: 75000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "pending",
    submittedAt: "2025-01-22 11:20"
  },
  {
    id: 2,
    title: "Modern House in Kandy",
    seller: "Premium Real Estate",
    location: "Kandy, Sri Lanka",
    price: 85000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    status: "approved",
    submittedAt: "2025-01-21 14:30"
  }
]

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Silva",
    email: "john@email.com",
    phone: "+94 77 123 4567",
    type: "buyer",
    registeredAt: "2025-01-20 09:00",
    status: "active",
    totalRequests: 3
  },
  {
    id: 2,
    name: "Sarah Fernando",
    email: "sarah@email.com",
    phone: "+94 71 987 6543",
    type: "buyer",
    registeredAt: "2025-01-19 15:30",
    status: "active",
    totalRequests: 1
  },
  {
    id: 3,
    name: "Elite Properties",
    email: "contact@eliteproperties.lk",
    phone: "+94 11 234 5678",
    type: "seller",
    registeredAt: "2025-01-18 10:15",
    status: "active",
    totalListings: 5
  },
  {
    id: 4,
    name: "Rajesh Perera",
    email: "rajesh@email.com",
    phone: "+94 76 555 1234",
    type: "buyer",
    registeredAt: "2025-01-22 08:00",
    status: "pending"
  }
]

const mockInquiries: Inquiry[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Silva",
    userEmail: "john@email.com",
    type: "property_request",
    title: "3BR House in Colombo 6",
    description: "Looking for a modern 3-bedroom house in Colombo 6 area with parking and garden.",
    propertyDetails: {
      location: "Colombo 6",
      minPrice: 80000000,
      maxPrice: 100000000,
      bedrooms: 3
    },
    status: "approved",
    submittedAt: "2025-01-22 10:00",
    hasMatches: true,
    matchesLocked: true
  },
  {
    id: 2,
    userId: 2,
    userName: "Sarah Fernando",
    userEmail: "sarah@email.com",
    type: "match_payment",
    title: "Payment for Property Match",
    description: "Payment required to unlock property match details",
    matchDetails: {
      propertyTitle: "Modern 2BR Apartment Kandy",
      matchScore: 88,
      price: 42000000,
      paymentStatus: "paid",
      paymentAmount: 2500
    },
    status: "payment_required",
    submittedAt: "2025-01-22 11:30"
  },
  {
    id: 3,
    userId: 4,
    userName: "Rajesh Perera",
    userEmail: "rajesh@email.com",
    type: "property_request",
    title: "4BR Villa in Mount Lavinia",
    description: "Seeking a luxury 4-bedroom villa near the beach in Mount Lavinia.",
    propertyDetails: {
      location: "Mount Lavinia",
      minPrice: 150000000,
      maxPrice: 200000000,
      bedrooms: 4
    },
    status: "pending",
    submittedAt: "2025-01-22 08:45"
  }
]

export default function AdminPage() {
  const [pendingListings, setPendingListings] = useState(mockPendingListings)
  const [users, setUsers] = useState(mockUsers)
  const [inquiries, setInquiries] = useState(mockInquiries)

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const handleApproveListing = (listingId: number) => {
    setPendingListings(prev => 
      prev.map(listing => 
        listing.id === listingId 
          ? { ...listing, status: "approved" as const }
          : listing
      )
    )
  }

  const handleRejectListing = (listingId: number) => {
    setPendingListings(prev => 
      prev.map(listing => 
        listing.id === listingId 
          ? { ...listing, status: "rejected" as const }
          : listing
      )
    )
  }

  const handleApproveUser = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "active" as const }
          : user
      )
    )
  }

  const handleSuspendUser = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "suspended" as const }
          : user
      )
    )
  }

  const handleApproveInquiry = (inquiryId: number) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: "approved" as const, hasMatches: true, matchesLocked: true }
          : inquiry
      )
    )
  }

  const handleRejectInquiry = (inquiryId: number) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: "rejected" as const }
          : inquiry
      )
    )
  }

  const handleApprovePayment = (inquiryId: number) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { 
              ...inquiry, 
              status: "approved" as const,
              matchesLocked: false,
              matchDetails: inquiry.matchDetails ? 
                { ...inquiry.matchDetails, paymentStatus: "paid" as const } : 
                undefined
            }
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
              <Badge className="bg-red-600 text-white">Admin</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <UserIcon className="h-5 w-5" />
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage properties, users, and payment approvals for property matches</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Listings</p>
                  <p className="text-3xl font-bold">{pendingListings.filter(l => l.status === "pending").length}</p>
                </div>
                <Home className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Users</p>
                  <p className="text-3xl font-bold">{users.filter(u => u.status === "pending").length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Inquiries</p>
                  <p className="text-3xl font-bold">{inquiries.filter(i => i.status === "pending" || i.status === "payment_required").length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-3xl font-bold">LKR 2.4M</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-4">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Property Listings Management</h3>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search properties..." className="max-w-sm" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {pendingListings.filter(l => l.status === "pending").map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">{listing.title}</h4>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{listing.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Listed by: {listing.seller}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatPrice(listing.price)}</div>
                        <div className="text-sm text-muted-foreground">{listing.submittedAt}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{listing.bedrooms} BR</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{listing.bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{listing.area} sq ft</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Review this listing to approve it for the platform
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRejectListing(listing.id)}
                          className="gap-2 text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveListing(listing.id)}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {pendingListings.filter(l => l.status === "pending").length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending property listings to review.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Management</h3>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search users..." className="max-w-sm" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-semibold">{user.name}</h4>
                          <Badge className={
                            user.type === "buyer" 
                              ? "bg-blue-600 text-white" 
                              : "bg-green-600 text-white"
                          }>
                            {user.type}
                          </Badge>
                          <Badge className={
                            user.status === "active" 
                              ? "bg-green-600 text-white" 
                              : user.status === "pending"
                              ? "bg-orange-600 text-white"
                              : "bg-red-600 text-white"
                          }>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <p>Email: {user.email}</p>
                          <p>Phone: {user.phone}</p>
                          <p className="text-muted-foreground">Registered: {user.registeredAt}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm space-y-1">
                          {user.totalRequests && (
                            <div>{user.totalRequests} Requests</div>
                          )}
                          {user.totalListings && (
                            <div>{user.totalListings} Listings</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Manage user account status and permissions
                      </div>
                      <div className="flex gap-2">
                        {user.status === "pending" ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveUser(user.id)}
                            className="gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                        ) : user.status === "active" ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleSuspendUser(user.id)}
                            className="gap-2 text-orange-600 hover:text-orange-700"
                          >
                            <XCircle className="h-4 w-4" />
                            Suspend
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveUser(user.id)}
                            className="gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Inquiries & Payment Approvals</h3>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search inquiries..." className="max-w-sm" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-semibold">{inquiry.title}</h4>
                          <Badge className={
                            inquiry.type === "property_request" 
                              ? "bg-blue-600 text-white" 
                              : "bg-purple-600 text-white"
                          }>
                            {inquiry.type === "property_request" ? "Property Request" : "Payment Required"}
                          </Badge>
                          <Badge className={
                            inquiry.status === "approved" 
                              ? "bg-green-600 text-white" 
                              : inquiry.status === "pending"
                              ? "bg-orange-600 text-white"
                              : inquiry.status === "payment_required"
                              ? "bg-purple-600 text-white"
                              : "bg-red-600 text-white"
                          }>
                            {inquiry.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <p><strong>User:</strong> {inquiry.userName} ({inquiry.userEmail})</p>
                          <p><strong>Description:</strong> {inquiry.description}</p>
                        </div>
                        
                        {inquiry.propertyDetails && (
                          <div className="text-sm bg-blue-50 p-3 rounded-md">
                            <p><strong>Property Requirements:</strong></p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{inquiry.propertyDetails.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Bed className="h-3 w-3" />
                                <span>{inquiry.propertyDetails.bedrooms} Bedrooms</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatPrice(inquiry.propertyDetails.minPrice)} - {formatPrice(inquiry.propertyDetails.maxPrice)}</span>
                              </div>
                              {inquiry.hasMatches && (
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span className={inquiry.matchesLocked ? "text-red-600" : "text-green-600"}>
                                    {inquiry.matchesLocked ? "Matches Locked" : "Matches Available"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {inquiry.matchDetails && (
                          <div className="text-sm bg-purple-50 p-3 rounded-md">
                            <p><strong>Match Details:</strong></p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div>Property: {inquiry.matchDetails.propertyTitle}</div>
                              <div>Match Score: {inquiry.matchDetails.matchScore}%</div>
                              <div>Property Price: {formatPrice(inquiry.matchDetails.price)}</div>
                              <div>Payment: {formatPrice(inquiry.matchDetails.paymentAmount)} ({inquiry.matchDetails.paymentStatus})</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{inquiry.submittedAt}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        {inquiry.type === "property_request" 
                          ? "Approve to enable property matching for this user"
                          : "Approve payment to unlock property match details for the user"
                        }
                      </div>
                      <div className="flex gap-2">
                        {inquiry.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleRejectInquiry(inquiry.id)}
                              className="gap-2 text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveInquiry(inquiry.id)}
                              className="gap-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                          </>
                        )}
                        {inquiry.status === "payment_required" && inquiry.matchDetails?.paymentStatus === "paid" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleApprovePayment(inquiry.id)}
                            className="gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve Payment & Unlock
                          </Button>
                        )}
                        {inquiry.status === "approved" && (
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {inquiries.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending inquiries to review.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}