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
import { Plus, Search, MapPin, Home, Bell, User, Settings, LogOut, Eye, Star, Calendar, Percent, Filter } from "lucide-react"
import Link from "next/link"

// Types for dynamic request criteria
interface PurchaseRequestCriteria {
  title: string
  location: string
  description: string
  minPrice: number
  maxPrice: number
  maxFloors?: string
  ownershipType?: string
  features?: string[]
  keywords?: string[]
  // Which criteria matter for scoring
  scoring: {
    location: boolean
    priceRange: boolean
    features: boolean
    ownershipType: boolean
    maxFloors: boolean
    keywords: boolean
  }
}

const CRITERION_LABELS: Record<string, string> = {
  location: "Location",
  priceRange: "Price Range",
  features: "Features",
  ownershipType: "Ownership Type",
  maxFloors: "Max Floors",
  keywords: "Keywords",
}

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
    criteria: {
      title: "4BR Apartment in Colombo 07",
      location: "Colombo 07, Sri Lanka",
      description: "Looking for a modern apartment with backup power, parking and security",
      minPrice: 120000000,
      maxPrice: 160000000,
      scoring: {
        location: true,
        priceRange: true,
        features: true,
        ownershipType: false,
        maxFloors: false,
        keywords: false,
      },
      features: ["Parking", "Security"],
      ownershipType: "owner",
      maxFloors: "any",
      keywords: ["modern"],
    } as PurchaseRequestCriteria,
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
    criteria: {
      title: "Beachfront Villa in Galle",
      location: "Talpe, Galle",
      description: "Seeking a premium villa with ocean frontage suitable for holiday rental income",
      minPrice: 180000000,
      maxPrice: 250000000,
      scoring: {
        location: true,
        priceRange: true,
        features: true,
        ownershipType: true,
        maxFloors: false,
        keywords: true,
      },
      features: ["Beach Access", "Garden"],
      ownershipType: "owner",
      maxFloors: "any",
      keywords: ["ocean", "rental"],
    } as PurchaseRequestCriteria,
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
    features: ["4BR", "2500 sq ft", "City View", "Parking", "Security"],
    ownershipType: "owner",
    maxFloors: "any",
    keywords: ["modern", "city"],
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
    ownershipType: "agent",
    maxFloors: "10",
    keywords: ["amenities", "gym"],
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
    ownershipType: "owner",
    maxFloors: "any",
    keywords: ["oceanfront", "holiday"],
  },
]

export default function BuyerDashboard() {
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("requests")
  const [requests, setRequests] = useState(mockRequests)

  // Form state for new request
  const [scoring, setScoring] = useState({
    location: true,
    priceRange: true,
    features: false,
    ownershipType: false,
    maxFloors: false,
    keywords: false,
  })
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(["location", "priceRange"]) // drives visible fields

  const toggleCriterion = (key: string) => {
    setSelectedCriteria(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
    setScoring(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const featuresRaw = (formData.get("features") as string)?.split(",").map(f => f.trim()).filter(Boolean) || []
    const keywordsRaw = (formData.get("keywords") as string)?.split(",").map(f => f.trim()).filter(Boolean) || []

    const newReq = {
      id: Date.now(),
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      minPrice: Number(formData.get("minPrice")),
      maxPrice: Number(formData.get("maxPrice")),
      status: "active",
      matches: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      description: formData.get("description") as string,
      criteria: {
        title: formData.get("title") as string,
        location: formData.get("location") as string,
        description: formData.get("description") as string,
        minPrice: Number(formData.get("minPrice")),
        maxPrice: Number(formData.get("maxPrice")),
        maxFloors: formData.get("maxFloors") as string | undefined,
        ownershipType: formData.get("ownershipType") as string | undefined,
        features: featuresRaw,
        keywords: keywordsRaw,
        scoring,
      } as PurchaseRequestCriteria,
    }

    setRequests(prev => [newReq, ...prev])
    setIsCreateRequestOpen(false)
    form.reset()
    // Reset scoring to default
    setScoring(scoring)
  }

  const formatPrice = (price: number) => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(price)

  // Simple percentage scoring function based on selected criteria
  const computeMatchPercentage = (req: any, match: any) => {
    const crit: PurchaseRequestCriteria = req.criteria
    const enabled = crit.scoring
    const checks: Array<{ passed: boolean; enabled: boolean }> = []

    // location
    checks.push({
      enabled: enabled.location,
      passed: enabled.location ? match.location.toLowerCase().includes(crit.location.toLowerCase().split(",")[0].trim()) : false,
    })

    // price range
    checks.push({
      enabled: enabled.priceRange,
      passed: enabled.priceRange ? match.price >= crit.minPrice && match.price <= crit.maxPrice : false,
    })

    // features (at least half of desired features present)
    checks.push({
      enabled: enabled.features,
      passed: enabled.features && crit.features && crit.features.length > 0 ?
        (crit.features.filter(f => match.features?.some((mf: string) => mf.toLowerCase() === f.toLowerCase())).length / crit.features.length) >= 0.5 : false,
    })

    // ownership type
    checks.push({
      enabled: enabled.ownershipType,
      passed: enabled.ownershipType && crit.ownershipType ? match.ownershipType === crit.ownershipType : false,
    })

    // max floors (simple equality/any)
    checks.push({
      enabled: enabled.maxFloors,
      passed: enabled.maxFloors && crit.maxFloors ? crit.maxFloors === 'any' || match.maxFloors === crit.maxFloors : false,
    })

    // keywords overlap (at least one)
    checks.push({
      enabled: enabled.keywords,
      passed: enabled.keywords && crit.keywords && crit.keywords.length > 0 ?
        crit.keywords.some(k => match.keywords?.some((mk: string) => mk.toLowerCase().includes(k.toLowerCase()))) : false,
    })

    const enabledCount = checks.filter(c => c.enabled).length || 1
    const passedCount = checks.filter(c => c.enabled && c.passed).length
    const percent = Math.round((passedCount / enabledCount) * 100)

    return { percent, breakdown: checks }
  }

  const renderMatchBadge = (percent: number) => {
    let variant: string = "secondary"
    if (percent >= 80) variant = "default"
    else if (percent >= 60) variant = "outline"
    return <Badge variant={variant as any} className="flex items-center gap-1">{percent}% match</Badge>
  }

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
                  <div className="text-2xl font-bold text-foreground">{requests.length}</div>
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
                    Tell us what you're looking for and pick which criteria should influence match scoring.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRequest} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Request Title</Label>
                      <Input id="title" name="title" placeholder="e.g., 4BR Apartment in Colombo 07" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" placeholder="e.g., Colombo 07" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your ideal property, preferred amenities, and any specific requirements..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPrice">Minimum Price</Label>
                      <Input id="minPrice" name="minPrice" type="number" placeholder="25000000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice">Maximum Price</Label>
                      <Input id="maxPrice" name="maxPrice" type="number" placeholder="35000000" required />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Select Match Criteria</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Pick only the aspects you care about. We'll match & score using just these.</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(scoring).map(([key]) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() => toggleCriterion(key)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition ${selectedCriteria.includes(key) ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted hover:bg-muted/70'}`}
                        >
                          {CRITERION_LABELS[key] || key}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Conditional fields */}
                  {selectedCriteria.includes('priceRange') && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minPrice">Minimum Price</Label>
                        <Input id="minPrice" name="minPrice" type="number" placeholder="25000000" required={selectedCriteria.includes('priceRange')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxPrice">Maximum Price</Label>
                        <Input id="maxPrice" name="maxPrice" type="number" placeholder="35000000" required={selectedCriteria.includes('priceRange')} />
                      </div>
                    </div>
                  )}

                  {selectedCriteria.includes('maxFloors') && (
                    <div className="space-y-2">
                      <Label htmlFor="maxFloors">Maximum Floors</Label>
                      <Select name="maxFloors">
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
                  )}

                  {selectedCriteria.includes('ownershipType') && (
                    <div className="space-y-2">
                      <Label htmlFor="ownershipType">Preferred Ownership</Label>
                      <Select name="ownershipType">
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
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {selectedCriteria.includes('features') && (
                      <div className="space-y-2">
                        <Label htmlFor="features">Must-Have Features (comma separated)</Label>
                        <Input id="features" name="features" placeholder="Parking, Security, Pool" />
                      </div>
                    )}
                    {selectedCriteria.includes('keywords') && (
                      <div className="space-y-2">
                        <Label htmlFor="keywords">Keywords (comma separated)</Label>
                        <Input id="keywords" name="keywords" placeholder="modern, sea view, luxury" />
                      </div>
                    )}
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
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-3">{request.title}
                        <span className="hidden md:inline text-xs font-normal text-muted-foreground border rounded px-2 py-0.5">Active Criteria: {Object.entries(request.criteria.scoring).filter(([,v]) => v).length}</span>
                      </CardTitle>
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
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(request.criteria.scoring).filter(([,v]) => v).map(([k]) => (
                        <span key={k} className="text-[10px] uppercase tracking-wide bg-primary/10 text-primary px-2 py-1 rounded">{k.replace(/([A-Z])/g, ' $1')}</span>
                      ))}
                      {(Object.entries(request.criteria.scoring) as [string, boolean][]).every(([,v]) => !v) && (
                        <span className="text-[10px] uppercase tracking-wide bg-muted text-muted-foreground px-2 py-1 rounded">No criteria selected</span>
                      )}
                    </div>
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
            {/* For each request show grouped matches with computed percentage */}
            {requests.map(req => (
              <div key={req.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Matches for: {req.title}</h3>
                  <Badge variant="secondary" className="text-xs">Criteria: {Object.entries(req.criteria.scoring).filter(([,v]) => v).length}</Badge>
                </div>
                {mockMatches.filter(m => m.requestId === req.id).length === 0 && (
                  <p className="text-sm text-muted-foreground">No matches yet for this request.</p>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  {mockMatches.filter(m => m.requestId === req.id).map(match => {
                    const { percent } = computeMatchPercentage(req, match)
                    return (
                      <Card key={match.id} className="relative overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {match.title}
                                {renderMatchBadge(percent)}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" /> {match.location}
                              </CardDescription>
                            </div>
                            {match.verified && <Badge variant="outline" className="text-[10px]">Verified</Badge>}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{formatPrice(match.price)}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Percent className="h-3 w-3" />Match Score</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {match.features.slice(0,4).map((f: string) => (
                              <span key={f} className="text-[10px] bg-muted px-2 py-1 rounded">{f}</span>
                            ))}
                          </div>
                          {match.locked ? (
                            <Button size="sm" variant="outline" className="w-full justify-center">Unlock Details</Button>
                          ) : (
                            <Button size="sm" className="w-full justify-center">View Details</Button>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
            {requests.length === 0 && (
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
