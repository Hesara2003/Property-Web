"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, MapPin, Home, Bell, User, Settings, LogOut, Eye, Star, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data
const mockRequests = [
  {
    id: 1,
    title: "4BR Apartment in Colombo 07",
    location: "Colombo 07, Sri Lanka",
    minPrice: 120000000,
    maxPrice: 160000000,
    status: "active",
    matches: 5,
    createdAt: "2025-01-15",
    description: "Looking for a modern apartment with backup power, parking and security",
  },
  {
    id: 2,
    title: "Beachfront Villa in Galle",
    location: "Talpe, Galle",
    minPrice: 180000000,
    maxPrice: 250000000,
    status: "active",
    matches: 2,
    createdAt: "2025-01-10",
    description: "Seeking a premium villa with ocean frontage suitable for holiday rental income",
  },
]

const mockMatches = [
  {
    id: 1,
    requestId: 1,
    title: "Luxury 4BR Colombo 07 Apartment",
    price: 145000000,
    location: "Colombo 07, Sri Lanka",
    matchScore: 95,
    verified: true,
    locked: false,
    image: "/luxury-apartment-bandra.jpg",
    seller: "Prime Residencies",
    features: ["4BR", "2500 sq ft", "City View", "Parking"],
  },
  {
    id: 2,
    requestId: 1,
    title: "Modern Apartment With Amenities",
    price: 132000000,
    location: "Colombo 07, Sri Lanka",
    matchScore: 88,
    verified: true,
    locked: true,
    image: "/modern-apartment-mumbai.png",
    seller: "Urban Realty",
    features: ["4BR", "2300 sq ft", "Gym", "Pool"],
  },
  {
    id: 3,
    requestId: 2,
    title: "Oceanfront Villa Talpe",
    price: 210000000,
    location: "Talpe, Galle",
    matchScore: 92,
    verified: false,
    locked: true,
    image: "/beachfront-villa-goa.jpg",
    seller: "Coastal Estates",
    features: ["5BR", "3200 sq ft", "Beach Access", "Garden"],
  },
]

export default function BuyerDashboard() {
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("requests")

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate request creation
    setIsCreateRequestOpen(false)
    // In real app, would trigger matching algorithm
  }

  const formatPrice = (price: number) => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(price)

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
              <Link href="/dashboard/buyer" className="text-primary font-medium">
                Dashboard
              </Link>
              <Link href="/matches" className="text-muted-foreground hover:text-foreground transition-colors">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Manage your property requests and discover perfect matches.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">2</div>
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
                  <div className="text-2xl font-bold text-foreground">11</div>
                  <div className="text-sm text-muted-foreground">Total Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Verified Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1</div>
                  <div className="text-sm text-muted-foreground">Unlocked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="requests">My Requests</TabsTrigger>
              <TabsTrigger value="matches">Recent Matches</TabsTrigger>
            </TabsList>

            <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Purchase Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Purchase Request</DialogTitle>
                  <DialogDescription>
                    Tell us what you're looking for and we'll find matching properties for you.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRequest} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Request Title</Label>
                      <Input id="title" placeholder="e.g., 4BR Apartment in Colombo 07" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Colombo 07" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your ideal property, preferred amenities, and any specific requirements..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPrice">Minimum Price</Label>
                      <Input id="minPrice" type="number" placeholder="25000000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice">Maximum Price</Label>
                      <Input id="maxPrice" type="number" placeholder="35000000" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxFloors">Maximum Floors</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select max floors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Ground Floor Only</SelectItem>
                          <SelectItem value="5">Up to 5th Floor</SelectItem>
                          <SelectItem value="10">Up to 10th Floor</SelectItem>
                          <SelectItem value="any">Any Floor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownershipType">Preferred Ownership</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ownership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Direct Owner</SelectItem>
                          <SelectItem value="agent">Through Agent</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Must-Have Features</Label>
                    <Input id="features" placeholder="e.g., Parking, Gym, Swimming Pool, Security" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input id="keywords" placeholder="e.g., sea view, modern, luxury, spacious" />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsCreateRequestOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Request</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="requests" className="space-y-6">
            {mockRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{request.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {request.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{request.matches} matches</Badge>
                      <Badge variant={request.status === "active" ? "default" : "secondary"}>{request.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{request.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-muted-foreground">LKR</span>
                          <span className="text-sm text-muted-foreground">
                            {formatPrice(request.minPrice)} - {formatPrice(request.maxPrice)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Created {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/matches?request=${request.id}`}>View Matches</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="text-center py-12">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Matches Yet</h3>
                <p className="text-muted-foreground">
                  Create a purchase request to get matched with properties that meet your exact requirements.
                </p>
                <Button onClick={() => setIsCreateRequestOpen(true)}>Create Your First Request</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
