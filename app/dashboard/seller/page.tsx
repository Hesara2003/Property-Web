"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Home,
  Bell,
  User,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Bed,
  Bath,
  Square,
  BarChart3,
  Camera,
} from "lucide-react"

// Mock data for seller dashboard
const mockStats = {
  totalListings: 12,
  activeListings: 8,
  totalViews: 2847,
  totalInquiries: 156,
  avgResponseTime: "2.3 hours",
  successRate: 78,
}

const mockListings = [
  {
    id: 1,
    title: "Luxury 3 BHK in Bandra West",
    price: 32000000,
    location: "Bandra West, Mumbai",
    status: "active",
    views: 234,
    inquiries: 12,
    matches: 8,
    images: ["/luxury-apartment-bandra.jpg"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Modern 2 BHK Apartment",
    price: 18500000,
    location: "Powai, Mumbai",
    status: "pending",
    views: 89,
    inquiries: 4,
    matches: 2,
    images: ["/modern-apartment-mumbai.png"],
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Beachfront Villa in Goa",
    price: 45000000,
    location: "Candolim, Goa",
    status: "sold",
    views: 456,
    inquiries: 28,
    matches: 15,
    images: ["/beachfront-villa-goa.jpg"],
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    createdAt: "2023-12-10",
  },
]

const mockInquiries = [
  {
    id: 1,
    buyerName: "Rajesh Kumar",
    propertyTitle: "Luxury 3 BHK in Bandra West",
    budget: "₹30-35L",
    message: "Interested in viewing this property. Can we schedule a visit this weekend?",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    timestamp: "2024-01-22 14:30",
    status: "new",
    matchScore: 95,
  },
  {
    id: 2,
    buyerName: "Priya Sharma",
    propertyTitle: "Modern 2 BHK Apartment",
    budget: "₹18-20L",
    message: "Looking for immediate possession. Is the property ready to move in?",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    timestamp: "2024-01-22 11:15",
    status: "responded",
    matchScore: 88,
  },
  {
    id: 3,
    buyerName: "Amit Patel",
    propertyTitle: "Beachfront Villa in Goa",
    budget: "₹40-50L",
    message: "Interested in this villa for investment purposes. Can you share more details about rental potential?",
    phone: "+91 76543 21098",
    email: "amit.patel@email.com",
    timestamp: "2024-01-21 16:45",
    status: "scheduled",
    matchScore: 92,
  },
]

export default function SellerDashboard() {
  const [isAddListingOpen, setIsAddListingOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600 text-white"
      case "pending":
        return "bg-yellow-600 text-white"
      case "sold":
        return "bg-blue-600 text-white"
      case "inactive":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getInquiryStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-600 text-white"
      case "responded":
        return "bg-blue-600 text-white"
      case "scheduled":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Home className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">PropertyHub</span>
              </div>
              <Badge className="bg-blue-600 text-white">Seller</Badge>
            </div>
            <div className="flex items-center gap-3">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Welcome back, Premium Properties!</h1>
          <p className="text-muted-foreground">Manage your listings and connect with potential buyers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-3xl font-bold">{mockStats.totalListings}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-3xl font-bold">{mockStats.totalViews.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inquiries</p>
                  <p className="text-3xl font-bold">{mockStats.totalInquiries}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold">{mockStats.successRate}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            </TabsList>

            <Dialog open={isAddListingOpen} onOpenChange={setIsAddListingOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Listing
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Property Listing</DialogTitle>
                  <DialogDescription>Fill in the details to create a new property listing</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Property Title</Label>
                      <Input id="title" placeholder="e.g., Luxury 3 BHK in Bandra" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input id="price" type="number" placeholder="32000000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Bandra West, Mumbai" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4 BHK</SelectItem>
                          <SelectItem value="5">5+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (sq ft)</Label>
                      <Input id="area" type="number" placeholder="2400" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parking">Parking</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No Parking</SelectItem>
                          <SelectItem value="1">1 Space</SelectItem>
                          <SelectItem value="2">2 Spaces</SelectItem>
                          <SelectItem value="3">3+ Spaces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your property, its features, and nearby amenities..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Property Features</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Swimming Pool",
                        "Gym",
                        "Security",
                        "Power Backup",
                        "Lift",
                        "Garden",
                        "Club House",
                        "Children's Play Area",
                        "Jogging Track",
                        "Sea View",
                        "Parking",
                        "Furnished",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={feature} />
                          <Label htmlFor={feature} className="text-sm">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Property Images</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">Upload property images</p>
                      <Button variant="outline">Choose Files</Button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1">Create Listing</Button>
                    <Button variant="outline" onClick={() => setIsAddListingOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{mockStats.activeListings}</div>
                    <div className="text-sm text-muted-foreground">Active Listings</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">{mockStats.avgResponseTime}</div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-500">{mockStats.successRate}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                      <p className="font-medium">New inquiry received</p>
                      <p className="text-sm text-muted-foreground">Rajesh Kumar interested in Luxury 3 BHK</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="font-medium">Property viewed</p>
                      <p className="text-sm text-muted-foreground">Modern 2 BHK Apartment viewed 15 times today</p>
                    </div>
                    <span className="text-sm text-muted-foreground">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <div className="flex-1">
                      <p className="font-medium">Listing approved</p>
                      <p className="text-sm text-muted-foreground">Beachfront Villa in Goa is now live</p>
                    </div>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="grid gap-6">
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
                            <h3 className="text-xl font-bold text-balance">{listing.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{listing.location}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary mt-2">{formatPrice(listing.price)}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{listing.bedrooms} BHK</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{listing.bathrooms} Bath</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{listing.area} sq ft</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{listing.createdAt}</span>
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
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent text-red-600 hover:text-red-700"
                          >
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
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <div className="grid gap-6">
              {mockInquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{inquiry.buyerName}</h3>
                            <Badge className={getInquiryStatusColor(inquiry.status)}>
                              {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                            </Badge>
                            <Badge className="bg-primary text-primary-foreground">{inquiry.matchScore}% Match</Badge>
                          </div>
                          <p className="text-muted-foreground">Looking for: {inquiry.propertyTitle}</p>
                          <p className="text-sm text-muted-foreground">Budget: {inquiry.budget}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{inquiry.timestamp}</div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm">{inquiry.message}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{inquiry.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{inquiry.email}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-2">
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Mail className="h-4 w-4" />
                            Email
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Calendar className="h-4 w-4" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
