"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Home,
  Bell,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertTriangle,
  Users,
  FileText,
  TrendingUp,
  MapPin,
  Bed,
  Bath,
  Square,
  Flag,
} from "lucide-react"

// Mock data for admin dashboard
const mockStats = {
  pendingReviews: 23,
  approvedToday: 12,
  rejectedToday: 3,
  totalUsers: 1247,
  totalListings: 856,
  flaggedContent: 5,
}

const mockPendingListings = [
  {
    id: 1,
    title: "Luxury 4 BHK Penthouse",
    price: 85000000,
    location: "Worli, Mumbai",
    seller: "Rajesh Properties",
    submittedAt: "2024-01-22 09:30",
    priority: "high",
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    images: ["/premium-penthouse-mumbai.jpg"],
    description: "Stunning penthouse with panoramic city views, premium amenities, and world-class finishes.",
    documents: [
      { name: "Title Deed", status: "verified" },
      { name: "Building Approval", status: "verified" },
      { name: "Tax Receipt", status: "pending" },
    ],
    flags: [],
  },
  {
    id: 2,
    title: "Modern 2 BHK Apartment",
    price: 22000000,
    location: "Andheri East, Mumbai",
    seller: "Metro Homes",
    submittedAt: "2024-01-22 11:15",
    priority: "medium",
    bedrooms: 2,
    bathrooms: 2,
    area: 1650,
    images: ["/modern-apartment-mumbai.png"],
    description: "Well-designed apartment in prime location with excellent connectivity and modern amenities.",
    documents: [
      { name: "Title Deed", status: "verified" },
      { name: "Building Approval", status: "verified" },
      { name: "Tax Receipt", status: "verified" },
    ],
    flags: [],
  },
  {
    id: 3,
    title: "Beachfront Villa",
    price: 120000000,
    location: "Alibaug, Maharashtra",
    seller: "Coastal Properties",
    submittedAt: "2024-01-22 14:45",
    priority: "high",
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    images: ["/beachfront-villa-goa.jpg"],
    description: "Exclusive beachfront villa with private beach access, infinity pool, and luxury amenities.",
    documents: [
      { name: "Title Deed", status: "verified" },
      { name: "Building Approval", status: "pending" },
      { name: "Tax Receipt", status: "verified" },
    ],
    flags: ["Price seems unusually high", "Location verification needed"],
  },
]

const mockRecentActions = [
  {
    id: 1,
    action: "approved",
    listing: "3 BHK in Bandra West",
    admin: "Admin User",
    timestamp: "2024-01-22 16:30",
    reason: "All documents verified, listing meets quality standards",
  },
  {
    id: 2,
    action: "rejected",
    listing: "2 BHK in Thane",
    admin: "Admin User",
    timestamp: "2024-01-22 15:45",
    reason: "Incomplete documentation, missing building approval",
  },
  {
    id: 3,
    action: "flagged",
    listing: "Villa in Lonavala",
    admin: "Admin User",
    timestamp: "2024-01-22 14:20",
    reason: "Requires additional verification for price accuracy",
  },
]

export default function AdminDashboard() {
  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600 text-white"
      case "medium":
        return "bg-yellow-600 text-white"
      case "low":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-600 text-white"
      case "pending":
        return "bg-yellow-600 text-white"
      case "rejected":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const handleReview = (listing: any, action: "approve" | "reject") => {
    setSelectedListing(listing)
    setReviewAction(action)
    setIsReviewModalOpen(true)
  }

  const submitReview = () => {
    // Handle review submission
    console.log(`${reviewAction} listing ${selectedListing?.id} with notes: ${reviewNotes}`)
    setIsReviewModalOpen(false)
    setReviewNotes("")
    setSelectedListing(null)
    setReviewAction(null)
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
              <Badge className="bg-blue-600 text-white">Admin</Badge>
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
          <h1 className="text-3xl font-bold text-balance mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Review and manage property listings and user activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold text-orange-600">{mockStats.pendingReviews}</p>
                </div>
                <div className="w-12 h-12 bg-orange-600/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                  <p className="text-3xl font-bold text-green-600">{mockStats.approvedToday}</p>
                </div>
                <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Flagged Content</p>
                  <p className="text-3xl font-bold text-red-600">{mockStats.flaggedContent}</p>
                </div>
                <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center">
                  <Flag className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="pending">Pending ({mockStats.pendingReviews})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid gap-6">
              {mockPendingListings.map((listing) => (
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
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-balance">{listing.title}</h3>
                              <Badge className={getPriorityColor(listing.priority)}>
                                {listing.priority.charAt(0).toUpperCase() + listing.priority.slice(1)} Priority
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{listing.location}</span>
                            </div>
                            <div className="text-2xl font-bold text-primary">{formatPrice(listing.price)}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>Submitted: {listing.submittedAt}</div>
                            <div>Seller: {listing.seller}</div>
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
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{listing.documents.length} docs</span>
                          </div>
                        </div>

                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{listing.description}</p>
                        </div>

                        {/* Documents Status */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Document Status:</h4>
                          <div className="flex gap-2 flex-wrap">
                            {listing.documents.map((doc, index) => (
                              <Badge key={index} className={getDocumentStatusColor(doc.status)}>
                                {doc.name}: {doc.status}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Flags */}
                        {listing.flags.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              Flags:
                            </h4>
                            <div className="space-y-1">
                              {listing.flags.map((flag, index) => (
                                <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                  {flag}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                            onClick={() => {
                              setSelectedListing(listing)
                              // Open detailed view modal
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="gap-2 bg-green-600 hover:bg-green-700"
                            onClick={() => handleReview(listing, "approve")}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
                            onClick={() => handleReview(listing, "reject")}
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Admin Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActions.map((action) => (
                    <div key={action.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                      <div className="flex-shrink-0">
                        {action.action === "approved" && (
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {action.action === "rejected" && (
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                            <XCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {action.action === "flagged" && (
                          <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                            <Flag className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">
                            {action.action.charAt(0).toUpperCase() + action.action.slice(1)} - {action.listing}
                          </h4>
                          <span className="text-sm text-muted-foreground">{action.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">By: {action.admin}</p>
                        <p className="text-sm">{action.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Review Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Approved Today</span>
                      <span className="font-semibold text-green-600">{mockStats.approvedToday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rejected Today</span>
                      <span className="font-semibold text-red-600">{mockStats.rejectedToday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Reviews</span>
                      <span className="font-semibold text-orange-600">{mockStats.pendingReviews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Listings</span>
                      <span className="font-semibold">{mockStats.totalListings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Platform Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Users</span>
                      <span className="font-semibold">{mockStats.totalUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Sellers</span>
                      <span className="font-semibold">342</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Buyers</span>
                      <span className="font-semibold">905</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Flagged Content</span>
                      <span className="font-semibold text-red-600">{mockStats.flaggedContent}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Modal */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {reviewAction === "approve" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                {reviewAction === "approve" ? "Approve" : "Reject"} Listing
              </DialogTitle>
              <DialogDescription>
                {reviewAction === "approve"
                  ? "This listing will be published and visible to buyers."
                  : "This listing will be rejected and returned to the seller for revision."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedListing && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold">{selectedListing.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedListing.location}</p>
                  <p className="text-lg font-bold text-primary mt-1">{formatPrice(selectedListing.price)}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="review-notes">
                  {reviewAction === "approve" ? "Approval Notes (Optional)" : "Rejection Reason (Required)"}
                </Label>
                <Textarea
                  id="review-notes"
                  placeholder={
                    reviewAction === "approve"
                      ? "Add any notes for the seller..."
                      : "Explain why this listing is being rejected..."
                  }
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className={`flex-1 ${
                    reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={submitReview}
                  disabled={reviewAction === "reject" && !reviewNotes.trim()}
                >
                  {reviewAction === "approve" ? "Approve Listing" : "Reject Listing"}
                </Button>
                <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
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
