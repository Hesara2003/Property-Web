"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  LogOut,
  Lock,
  Unlock,
  TrendingUp,
  Plus,
  Phone,
  Mail,
  UserCheck
} from "lucide-react"
import Link from "next/link"

// Types for admin data
type PropertyType = "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL"
type ListingType = "SALE" | "RENT"

interface PropertyListing {
  id: number
  title: string
  description: string
  propertyType: PropertyType
  listingType: ListingType
  seller: string
  location: string
  province: string
  district: string
  city: string
  address: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  landSize?: number
  floors?: number
  parking?: number
  yearBuilt?: number
  floorNumber?: number
  totalFloors?: number
  frontage?: number
  zoningType?: string
  utilities?: string[]
  floorArea?: number
  facilities?: string[]
  features: string[]
  ownerName: string
  contactNumber: string
  email: string
  whatsappNumber?: string
  availableFrom?: string
  negotiable: boolean
  urgentSale: boolean
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

interface User {
  id: number
  name: string
  email: string
  phone: string
  registeredAt: string
  status: "active" | "pending" | "suspended"
  verified: boolean
  totalRequests: number
  totalListings: number
}

interface Inquiry {
  id: number
  userId: number
  userName: string
  userEmail: string
  type: "property_request" | "match_payment" | "availability_check" | "manual_verification"
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
    propertyId: number
    matchScore: number
    price: number
    sellerName: string
    sellerContact: string
    availabilityStatus: "checking" | "available" | "unavailable" | "verified"
    verificationNotes?: string
    paymentStatus: "pending" | "paid" | "failed"
    paymentAmount: number
  }
  status: "pending" | "system_matched" | "checking_availability" | "awaiting_verification" | "verification_complete" | "approved" | "rejected" | "payment_required" | "delivered"
  submittedAt: string
  hasMatches?: boolean
  matchesLocked?: boolean
  systemMatchedAt?: string
  availabilityCheckedAt?: string
  verificationCompletedAt?: string
}

interface PropertyRequest {
  id: number
  userId: number
  userName: string
  userEmail: string
  userPhone: string
  purpose: "BUY" | "RENT"
  propertyType: "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL"
  locations: string[]
  budgetMin: number
  budgetMax: number
  // House specific
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
  // Apartment specific
  sizeMin?: number
  sizeMax?: number
  floorMin?: number
  floorMax?: number
  amenities?: string[]
  // Land specific
  frontageMin?: number
  frontageMax?: number
  zoningType?: string
  utilityWater?: boolean
  utilityElectricity?: boolean
  // Commercial specific
  floorAreaMin?: number
  floorAreaMax?: number
  facilities?: string[]
  // Common fields
  status: "pending" | "active" | "matched" | "completed"
  matches: number
  createdAt: string
}

interface MatchedProperty {
  id: number
  requestId: number
  propertyId: number
  title: string
  price: number
  location: string
  matchScore: number
  status: "locked" | "payment_pending" | "paid" | "admin_review" | "approved" | "unlocked"
  image: string
  seller: string
  sellerContact: string
  features: string[]
  bedrooms?: number
  bathrooms?: number
  area?: number
}

interface RequestPayment {
  requestId: number
  status: "locked" | "payment_pending" | "paid" | "admin_review" | "approved" | "unlocked"
  paymentDate?: string
  approvalDate?: string
  unlockDate?: string
  amount?: number
}

// Mock data
const mockPendingListings: PropertyListing[] = [
  {
    id: 1,
    title: "Luxury Apartment in Nugegoda",
    description: "Beautiful 3-bedroom luxury apartment with modern amenities and city view. Located in a prime area with easy access to public transport.",
    propertyType: "APARTMENT",
    listingType: "SALE",
    seller: "Elite Properties",
    location: "Nugegoda, Sri Lanka",
    province: "Western",
    district: "Colombo",
    city: "Nugegoda",
    address: "123 High Level Road, Nugegoda",
    price: 75000000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    floorNumber: 5,
    totalFloors: 10,
    parking: 1,
    yearBuilt: 2020,
    features: ["Air Conditioning", "Balcony", "City View", "Security", "Elevator", "Parking"],
    ownerName: "Mr. Perera",
    contactNumber: "+94 77 123 4567",
    email: "perera@elite.lk",
    whatsappNumber: "+94 77 123 4567",
    negotiable: true,
    urgentSale: false,
    status: "pending",
    submittedAt: "2025-01-22 11:20"
  },
  {
    id: 2,
    title: "Modern House in Kandy",
    description: "Spacious 4-bedroom house with garden and mountain view. Perfect for a family looking for a peaceful environment.",
    propertyType: "HOUSE",
    listingType: "SALE",
    seller: "Premium Real Estate",
    location: "Kandy, Sri Lanka",
    province: "Central",
    district: "Kandy",
    city: "Kandy",
    address: "456 Peradeniya Road, Kandy",
    price: 85000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    landSize: 15,
    floors: 2,
    parking: 2,
    yearBuilt: 2018,
    features: ["Garden", "Mountain View", "Security", "Modern Kitchen", "Parking", "Terrace"],
    ownerName: "Mrs. Silva",
    contactNumber: "+94 81 234 5678",
    email: "silva@premium.lk",
    whatsappNumber: "+94 81 234 5678",
    negotiable: false,
    urgentSale: true,
    status: "approved",
    submittedAt: "2025-01-21 14:30"
  },
  {
    id: 3,
    title: "Commercial Land in Galle",
    description: "Prime commercial land suitable for hotel or commercial development. Located near the beach with excellent access roads.",
    propertyType: "LAND",
    listingType: "SALE",
    seller: "Coastal Properties",
    location: "Galle, Sri Lanka",
    province: "Southern",
    district: "Galle",
    city: "Galle",
    address: "Marine Drive, Galle Fort",
    price: 120000000,
    landSize: 50,
    frontage: 25,
    zoningType: "Commercial",
    utilities: ["Water", "Electricity", "Internet"],
    features: ["Sea View", "Corner Property", "Main Road Access"],
    ownerName: "Mr. Fernando",
    contactNumber: "+94 91 567 8901",
    email: "fernando@coastal.lk",
    negotiable: true,
    urgentSale: false,
    status: "pending",
    submittedAt: "2025-01-20 09:15"
  }
]

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Silva",
    email: "john@email.com",
    phone: "+94 77 123 4567",
    registeredAt: "2025-01-20 09:00",
    status: "active",
    verified: true,
    totalRequests: 3,
    totalListings: 0
  },
  {
    id: 2,
    name: "Sarah Fernando",
    email: "sarah@email.com",
    phone: "+94 71 987 6543",
    registeredAt: "2025-01-19 15:30",
    status: "active",
    verified: true,
    totalRequests: 1,
    totalListings: 2
  },
  {
    id: 3,
    name: "Elite Properties",
    email: "contact@eliteproperties.lk",
    phone: "+94 11 234 5678",
    registeredAt: "2025-01-18 10:15",
    status: "active",
    verified: true,
    totalRequests: 0,
    totalListings: 5
  },
  {
    id: 4,
    name: "Rajesh Perera",
    email: "rajesh@email.com",
    phone: "+94 76 555 1234",
    registeredAt: "2025-01-22 08:00",
    status: "pending",
    verified: false,
    totalRequests: 0,
    totalListings: 1
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
    status: "system_matched",
    submittedAt: "2025-01-22 10:00",
    systemMatchedAt: "2025-01-22 10:15",
    hasMatches: true,
    matchDetails: {
      propertyTitle: "Modern 3BR House with Garden",
      propertyId: 101,
      matchScore: 92,
      price: 85000000,
      sellerName: "Elite Properties",
      sellerContact: "+94 11 234 5678",
      availabilityStatus: "checking",
      paymentStatus: "pending",
      paymentAmount: 2500
    }
  },
  {
    id: 2,
    userId: 2,
    userName: "Sarah Fernando",
    userEmail: "sarah@email.com",
    type: "availability_check",
    title: "Availability Check - 2BR Apartment",
    description: "System matched property - checking availability with seller",
    propertyDetails: {
      location: "Kandy",
      minPrice: 40000000,
      maxPrice: 50000000,
      bedrooms: 2
    },
    matchDetails: {
      propertyTitle: "Modern 2BR Apartment Kandy",
      propertyId: 102,
      matchScore: 88,
      price: 42000000,
      sellerName: "Premium Real Estate",
      sellerContact: "+94 81 567 8901",
      availabilityStatus: "available",
      paymentStatus: "pending",
      paymentAmount: 2500
    },
    status: "awaiting_verification",
    submittedAt: "2025-01-22 09:30",
    systemMatchedAt: "2025-01-22 09:45",
    availabilityCheckedAt: "2025-01-22 11:20"
  },
  {
    id: 3,
    userId: 4,
    userName: "Rajesh Perera",
    userEmail: "rajesh@email.com",
    type: "manual_verification",
    title: "Manual Verification - Beachfront Villa",
    description: "Admin verification in progress for matched property",
    propertyDetails: {
      location: "Mount Lavinia",
      minPrice: 150000000,
      maxPrice: 200000000,
      bedrooms: 4
    },
    matchDetails: {
      propertyTitle: "Luxury 4BR Beachfront Villa",
      propertyId: 103,
      matchScore: 95,
      price: 175000000,
      sellerName: "Ocean View Properties",
      sellerContact: "+94 77 999 1234",
      availabilityStatus: "verified",
      verificationNotes: "Verified property details, seller confirmed availability and pricing. Ready for delivery.",
      paymentStatus: "paid",
      paymentAmount: 2500
    },
    status: "verification_complete",
    submittedAt: "2025-01-21 14:00",
    systemMatchedAt: "2025-01-21 14:15",
    availabilityCheckedAt: "2025-01-21 16:30",
    verificationCompletedAt: "2025-01-22 09:00"
  },
  {
    id: 4,
    userId: 1,
    userName: "John Silva",
    userEmail: "john@email.com",
    type: "property_request",
    title: "2BR Apartment in Nugegoda",
    description: "Looking for a 2-bedroom apartment near public transport in Nugegoda.",
    propertyDetails: {
      location: "Nugegoda",
      minPrice: 35000000,
      maxPrice: 45000000,
      bedrooms: 2
    },
    status: "pending",
    submittedAt: "2025-01-22 12:15"
  }
]

const mockPropertyRequests: PropertyRequest[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Silva",
    userEmail: "john@email.com",
    userPhone: "+94 77 123 4567",
    purpose: "BUY",
    propertyType: "HOUSE",
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
    userId: 2,
    userName: "Sarah Fernando",
    userEmail: "sarah@email.com",
    userPhone: "+94 71 987 6543",
    purpose: "RENT",
    propertyType: "APARTMENT",
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
    userId: 4,
    userName: "Rajesh Perera",
    userEmail: "rajesh@email.com",
    userPhone: "+94 76 555 1234",
    purpose: "BUY",
    propertyType: "LAND",
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

const mockRequestPayments: RequestPayment[] = [
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

const mockMatchedProperties: MatchedProperty[] = [
  // Request 1 matches (all unlocked because payment was made for the request)
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
    sellerContact: "+94 11 555 1234",
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
    sellerContact: "+94 11 234 5678",
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
    sellerContact: "+94 31 789 0123",
    features: ["Modern", "Parking", "Garden"],
    bedrooms: 3,
    bathrooms: 2,
    area: 2000
  },
  // Request 2 matches (all in admin_review because payment was made)
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
    sellerContact: "+94 81 567 8901",
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
    sellerContact: "+94 81 234 5678",
    features: ["Lift", "Gym", "Pool"],
    bedrooms: 2,
    bathrooms: 1,
    area: 1300
  },
  // Request 3 matches (all locked because no payment made)
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
    sellerContact: "+94 91 567 8901",
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
    sellerContact: "+94 47 789 0123",
    features: ["Road Access", "Water", "Electricity"]
  }
]

export default function AdminPage() {
  const [pendingListings, setPendingListings] = useState(mockPendingListings)
  const [users, setUsers] = useState(mockUsers)
  const [inquiries, setInquiries] = useState(mockInquiries)
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [verifiedMatches, setVerifiedMatches] = useState<Set<number>>(new Set())
  const [submittedRequests, setSubmittedRequests] = useState<Set<number>>(new Set())

  // Helper functions for user requests tab
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

  const getMatchStatusBadge = (match: MatchedProperty) => {
    switch (match.status) {
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

  const getMatchesForRequest = (requestId: number) => {
    return mockMatchedProperties.filter(match => match.requestId === requestId)
  }

  const getRequestPaymentStatus = (requestId: number) => {
    return mockRequestPayments.find(payment => payment.requestId === requestId)
  }

  const handleVerifyMatch = (matchId: number) => {
    setVerifiedMatches(prev => new Set([...prev, matchId]))
  }

  const handleUnverifyMatch = (matchId: number) => {
    setVerifiedMatches(prev => {
      const newSet = new Set(prev)
      newSet.delete(matchId)
      return newSet
    })
  }

  const handleSubmitRequest = (requestId: number) => {
    setSubmittedRequests(prev => new Set([...prev, requestId]))
    // Here you would typically make an API call to submit the verified matches
    console.log(`Submitted request ${requestId} with verified matches`)
  }

  const isMatchVerified = (matchId: number) => verifiedMatches.has(matchId)
  
  const areAllMatchesVerified = (requestId: number) => {
    const matches = getMatchesForRequest(requestId)
    return matches.length > 0 && matches.every(match => isMatchVerified(match.id))
  }

  const isRequestSubmitted = (requestId: number) => submittedRequests.has(requestId)

  const getRequestsForVerification = () => {
    return mockPropertyRequests.filter(request => {
      const paymentStatus = getRequestPaymentStatus(request.id)
      const matches = getMatchesForRequest(request.id)
      return matches.length > 0 && 
             paymentStatus && 
             (paymentStatus.status === "admin_review" || paymentStatus.status === "paid") &&
             !isRequestSubmitted(request.id)
    })
  }

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

  const handleCheckAvailability = (inquiryId: number) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { 
              ...inquiry, 
              status: "checking_availability" as const,
              availabilityCheckedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
            }
          : inquiry
      )
    )
  }

  const handleConfirmAvailability = (inquiryId: number, available: boolean) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { 
              ...inquiry, 
              status: available ? "awaiting_verification" as const : "rejected" as const,
              matchDetails: inquiry.matchDetails ? 
                { ...inquiry.matchDetails, availabilityStatus: available ? "available" as const : "unavailable" as const } : 
                undefined
            }
          : inquiry
      )
    )
  }

  const handleCompleteVerification = (inquiryId: number, notes: string) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { 
              ...inquiry, 
              status: "verification_complete" as const,
              verificationCompletedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
              matchDetails: inquiry.matchDetails ? 
                { ...inquiry.matchDetails, availabilityStatus: "verified" as const, verificationNotes: notes } : 
                undefined
            }
          : inquiry
      )
    )
  }

  const handleDeliverToUser = (inquiryId: number) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId 
          ? { ...inquiry, status: "delivered" as const }
          : inquiry
      )
    )
  }

  const handleToggleVerification = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, verified: !user.verified }
          : user
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
          <p className="text-muted-foreground">Manage the complete property matching workflow: from listing approval to buyer request processing, availability checks, manual verification, and 24-hour delivery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                  <p className="text-sm text-muted-foreground">New Requests</p>
                  <p className="text-3xl font-bold">{inquiries.filter(i => i.status === "pending").length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Availability Checks</p>
                  <p className="text-3xl font-bold">{inquiries.filter(i => i.status === "system_matched" || i.status === "checking_availability").length}</p>
                </div>
                <Search className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Manual Verification</p>
                  <p className="text-3xl font-bold">{inquiries.filter(i => i.status === "awaiting_verification").length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ready to Deliver</p>
                  <p className="text-3xl font-bold">{inquiries.filter(i => i.status === "verification_complete").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="properties" className="space-y-4">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="verify-inquiries">Verify Inquiries</TabsTrigger>
            <TabsTrigger value="user-requests">User Requests & Matches</TabsTrigger>
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

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Property</th>
                        <th className="text-left p-4 font-medium">Location</th>
                        <th className="text-left p-4 font-medium">Price</th>
                        <th className="text-left p-4 font-medium">Details</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Submitted</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingListings.map((listing) => (
                        <tr key={listing.id} className="border-b hover:bg-muted/25">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{listing.title}</div>
                              <div className="text-sm text-muted-foreground">by {listing.seller}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{listing.location}</span>
                            </div>
                          </td>
                          <td className="p-4 font-medium">{formatPrice(listing.price)}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3 text-sm">
                              {listing.bedrooms && (
                                <span className="flex items-center gap-1">
                                  <Bed className="h-3 w-3" />
                                  {listing.bedrooms}
                                </span>
                              )}
                              {listing.bathrooms && (
                                <span className="flex items-center gap-1">
                                  <Bath className="h-3 w-3" />
                                  {listing.bathrooms}
                                </span>
                              )}
                              {listing.area && (
                                <span className="flex items-center gap-1">
                                  <Square className="h-3 w-3" />
                                  {listing.area}
                                </span>
                              )}
                              {listing.landSize && (
                                <span className="flex items-center gap-1">
                                  <span className="text-xs">🏞️</span>
                                  {listing.landSize}p
                                </span>
                              )}
                              {listing.floorArea && (
                                <span className="flex items-center gap-1">
                                  <Square className="h-3 w-3" />
                                  {listing.floorArea}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={
                              listing.status === "approved" 
                                ? "bg-green-600 text-white" 
                                : listing.status === "pending"
                                ? "bg-orange-600 text-white"
                                : "bg-red-600 text-white"
                            }>
                              {listing.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{listing.submittedAt}</td>
                          <td className="p-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedProperty(listing)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  More
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {listing.title}
                                    <Badge className={
                                      listing.listingType === "SALE" 
                                        ? "bg-green-600 text-white" 
                                        : "bg-blue-600 text-white"
                                    }>
                                      For {listing.listingType}
                                    </Badge>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  {/* Basic Information */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Property Type</label>
                                      <p className="font-medium">{listing.propertyType}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                                      <Badge className={
                                        listing.status === "approved" 
                                          ? "bg-green-600 text-white" 
                                          : listing.status === "pending"
                                          ? "bg-orange-600 text-white"
                                          : "bg-red-600 text-white"
                                      }>
                                        {listing.status}
                                      </Badge>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Price</label>
                                      <p className="font-bold text-lg">{formatPrice(listing.price)}</p>
                                      {listing.negotiable && <p className="text-sm text-green-600">Negotiable</p>}
                                      {listing.urgentSale && <p className="text-sm text-red-600">Urgent Sale</p>}
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                                      <p>{listing.submittedAt}</p>
                                    </div>
                                  </div>

                                  {/* Location Details */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Location Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Province</label>
                                        <p>{listing.province}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">District</label>
                                        <p>{listing.district}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">City</label>
                                        <p>{listing.city}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Full Address</label>
                                        <p>{listing.address}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Property Specifications */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Property Specifications</h4>
                                    <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded">
                                      {listing.bedrooms && (
                                        <div className="text-center">
                                          <Bed className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                                          <div className="font-medium">{listing.bedrooms}</div>
                                          <div className="text-xs text-muted-foreground">Bedrooms</div>
                                        </div>
                                      )}
                                      {listing.bathrooms && (
                                        <div className="text-center">
                                          <Bath className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                                          <div className="font-medium">{listing.bathrooms}</div>
                                          <div className="text-xs text-muted-foreground">Bathrooms</div>
                                        </div>
                                      )}
                                      {listing.area && (
                                        <div className="text-center">
                                          <Square className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                                          <div className="font-medium">{listing.area}</div>
                                          <div className="text-xs text-muted-foreground">Area (sq ft)</div>
                                        </div>
                                      )}
                                      {listing.parking && (
                                        <div className="text-center">
                                          <div className="h-6 w-6 mx-auto mb-1 text-muted-foreground">🚗</div>
                                          <div className="font-medium">{listing.parking}</div>
                                          <div className="text-xs text-muted-foreground">Parking</div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Additional Specifications based on property type */}
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                      {listing.yearBuilt && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Year Built</label>
                                          <p>{listing.yearBuilt}</p>
                                        </div>
                                      )}
                                      {listing.floors && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Floors</label>
                                          <p>{listing.floors}</p>
                                        </div>
                                      )}
                                      {listing.floorNumber && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Floor Number</label>
                                          <p>{listing.floorNumber} / {listing.totalFloors}</p>
                                        </div>
                                      )}
                                      {listing.landSize && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Land Size</label>
                                          <p>{listing.landSize} perches</p>
                                        </div>
                                      )}
                                      {listing.frontage && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Frontage</label>
                                          <p>{listing.frontage} feet</p>
                                        </div>
                                      )}
                                      {listing.zoningType && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Zoning Type</label>
                                          <p>{listing.zoningType}</p>
                                        </div>
                                      )}
                                      {listing.floorArea && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Floor Area</label>
                                          <p>{listing.floorArea} sq ft</p>
                                        </div>
                                      )}
                                      {listing.availableFrom && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Available From</label>
                                          <p>{listing.availableFrom}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Features */}
                                  {listing.features && listing.features.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-3">Features & Amenities</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {listing.features.map((feature, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Utilities (for land) */}
                                  {listing.utilities && listing.utilities.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-3">Available Utilities</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {listing.utilities.map((utility, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {utility}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Facilities (for commercial) */}
                                  {listing.facilities && listing.facilities.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold mb-3">Facilities</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {listing.facilities.map((facility, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {facility}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Description */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Description</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {listing.description}
                                    </p>
                                  </div>

                                  {/* Seller Information */}
                                  <div>
                                    <h4 className="font-semibold mb-3">Seller Information</h4>
                                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Listed by</label>
                                        <p className="font-medium">{listing.seller}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
                                        <p>{listing.ownerName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                                        <p>{listing.contactNumber}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <p>{listing.email}</p>
                                      </div>
                                      {listing.whatsappNumber && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">WhatsApp</label>
                                          <p>{listing.whatsappNumber}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  {listing.status === "pending" && (
                                    <div className="flex gap-2 pt-4 border-t">
                                      <Button 
                                        variant="outline" 
                                        onClick={() => handleRejectListing(listing.id)}
                                        className="gap-2 text-red-600 hover:text-red-700"
                                      >
                                        <XCircle className="h-4 w-4" />
                                        Reject Listing
                                      </Button>
                                      <Button 
                                        onClick={() => handleApproveListing(listing.id)}
                                        className="gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                        Approve Listing
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {pendingListings.length === 0 && (
                    <div className="p-12 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                      <p className="text-muted-foreground">No property listings to review.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">User</th>
                        <th className="text-left p-4 font-medium">Contact</th>
                        <th className="text-left p-4 font-medium">Verified</th>
                        <th className="text-left p-4 font-medium">Activity</th>
                        <th className="text-left p-4 font-medium">Registered</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/25">
                          <td className="p-4">
                            <div className="font-medium">{user.name}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm space-y-1">
                              <div>{user.email}</div>
                              <div className="text-muted-foreground">{user.phone}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={
                              user.verified 
                                ? "bg-green-600 text-white" 
                                : "bg-red-600 text-white"
                            }>
                              {user.verified ? "Verified" : "Not Verified"}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{user.totalListings}</span>
                                <span className="text-muted-foreground text-xs">Listings</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{user.totalRequests}</span>
                                <span className="text-muted-foreground text-xs">Requests</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{user.registeredAt}</td>
                          <td className="p-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  More
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>User Details - {user.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                                      <p className="font-medium">{user.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">User ID</label>
                                      <p>#{user.id.toString().padStart(4, '0')}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                                      <p>{user.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                      <p>{user.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Verified</label>
                                      <Badge className={
                                        user.verified 
                                          ? "bg-green-600 text-white" 
                                          : "bg-red-600 text-white"
                                      }>
                                        {user.verified ? "Verified" : "Not Verified"}
                                      </Badge>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Registered</label>
                                      <p>{user.registeredAt}</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded">
                                    <div className="text-center">
                                      <div className="font-medium text-2xl">{user.totalRequests}</div>
                                      <div className="text-sm text-muted-foreground">Property Requests</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium text-2xl">{user.totalListings}</div>
                                      <div className="text-sm text-muted-foreground">Property Listings</div>
                                    </div>
                                  </div>

                                  <div className="flex gap-2 pt-4">
                                    <Button 
                                      variant={user.verified ? "outline" : "default"}
                                      onClick={() => handleToggleVerification(user.id)}
                                      className="gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      {user.verified ? "Remove Verification" : "Verify User"}
                                    </Button>
                                    
                                    {user.status === "pending" ? (
                                      <Button 
                                        onClick={() => handleApproveUser(user.id)}
                                        className="gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                        Approve User
                                      </Button>
                                    ) : user.status === "active" ? (
                                      <Button 
                                        variant="outline" 
                                        onClick={() => handleSuspendUser(user.id)}
                                        className="gap-2 text-orange-600 hover:text-orange-700"
                                      >
                                        <XCircle className="h-4 w-4" />
                                        Suspend User
                                      </Button>
                                    ) : (
                                      <Button 
                                        onClick={() => handleApproveUser(user.id)}
                                        className="gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                        Reactivate User
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verify-inquiries" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Verify Property Matches</h3>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search verification requests..." className="max-w-sm" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {getRequestsForVerification().map((request) => {
              const matches = getMatchesForRequest(request.id)
              const paymentStatus = getRequestPaymentStatus(request.id)
              const allVerified = areAllMatchesVerified(request.id)
              const isSubmitted = isRequestSubmitted(request.id)
              
              return (
                <Card key={request.id} className={isSubmitted ? "opacity-50" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">{getRequestTitle(request)}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4" />
                            <span className="font-medium">{request.userName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{request.userPhone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{request.userEmail}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSubmitted ? (
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Submitted
                          </Badge>
                        ) : allVerified ? (
                          <Badge className="bg-purple-600 text-white">
                            Ready to Submit
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-600 text-white">
                            Verification Required
                          </Badge>
                        )}
                        <Badge variant="outline">
                          {matches.length} matches
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Request Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Budget Range</h5>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(request.budgetMin)} - {formatPrice(request.budgetMax)}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Locations</h5>
                          <p className="text-sm text-muted-foreground">
                            {request.locations.join(", ")}
                          </p>
                        </div>
                        {getRequestSpecs(request).length > 0 && (
                          <div className="md:col-span-2">
                            <h5 className="font-medium mb-2">Specifications</h5>
                            <div className="flex flex-wrap gap-2">
                              {getRequestSpecs(request).map((spec, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Payment Status */}
                      {paymentStatus && (
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">Payment Status</h5>
                              <p className="text-sm text-muted-foreground">
                                Status: <span className="capitalize">{paymentStatus.status.replace('_', ' ')}</span>
                                {paymentStatus.amount && ` • Amount: ${formatPrice(paymentStatus.amount)}`}
                              </p>
                            </div>
                            <Badge className="bg-blue-600 text-white">
                              Payment Confirmed
                            </Badge>
                          </div>
                        </div>
                      )}

                      {/* Matched Properties for Verification */}
                      {matches.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium">Properties to Verify ({matches.length})</h5>
                            <div className="text-sm text-muted-foreground">
                              {matches.filter(match => isMatchVerified(match.id)).length} of {matches.length} verified
                            </div>
                          </div>
                          
                          <div className="grid gap-4">
                            {matches.map((match) => {
                              const verified = isMatchVerified(match.id)
                              return (
                                <Card 
                                  key={match.id} 
                                  className={`border-l-4 ${verified ? 'border-l-green-500 bg-green-50/50' : 'border-l-orange-500'} ${isSubmitted ? 'opacity-50' : ''}`}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex gap-4">
                                      <img 
                                        src={match.image} 
                                        alt={match.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                      />
                                      <div className="flex-1 space-y-2">
                                        <div className="flex items-start justify-between">
                                          <div>
                                            <h6 className="font-medium">{match.title}</h6>
                                            <p className="text-sm text-muted-foreground">{match.location}</p>
                                            <p className="text-lg font-semibold text-primary">{formatPrice(match.price)}</p>
                                          </div>
                                          <div className="text-right space-y-2">
                                            <div className="text-sm text-muted-foreground">
                                              {match.matchScore}% match
                                            </div>
                                            {verified ? (
                                              <Badge className="bg-green-600 text-white">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Verified
                                              </Badge>
                                            ) : (
                                              <Badge className="bg-orange-600 text-white">
                                                Needs Verification
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Property Details */}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                          {match.bedrooms && (
                                            <div className="flex items-center gap-1">
                                              <Bed className="h-3 w-3" />
                                              {match.bedrooms}
                                            </div>
                                          )}
                                          {match.bathrooms && (
                                            <div className="flex items-center gap-1">
                                              <Bath className="h-3 w-3" />
                                              {match.bathrooms}
                                            </div>
                                          )}
                                          {match.area && (
                                            <div className="flex items-center gap-1">
                                              <Square className="h-3 w-3" />
                                              {match.area} sq ft
                                            </div>
                                          )}
                                        </div>

                                        {/* Seller Contact */}
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <p className="text-sm font-medium">Seller: {match.seller}</p>
                                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Phone className="h-3 w-3" />
                                                <span>{match.sellerContact}</span>
                                              </div>
                                            </div>
                                            <div className="flex gap-2">
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(`tel:${match.sellerContact}`)}
                                              >
                                                <Phone className="h-3 w-3 mr-1" />
                                                Call Seller
                                              </Button>
                                              {!isSubmitted && (
                                                verified ? (
                                                  <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleUnverifyMatch(match.id)}
                                                  >
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Unverify
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                    onClick={() => handleVerifyMatch(match.id)}
                                                  >
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Verify Property
                                                  </Button>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-1">
                                          {match.features.slice(0, 3).map((feature, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                              {feature}
                                            </Badge>
                                          ))}
                                          {match.features.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                              +{match.features.length - 3} more
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Submit Button */}
                      {!isSubmitted && matches.length > 0 && (
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            {allVerified 
                              ? "All properties verified. Ready to submit to user." 
                              : `${matches.filter(match => isMatchVerified(match.id)).length} of ${matches.length} properties verified.`
                            }
                          </div>
                          <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700"
                            disabled={!allVerified}
                            onClick={() => handleSubmitRequest(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit Verified Matches
                          </Button>
                        </div>
                      )}

                      {isSubmitted && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium">Request Submitted Successfully</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            All verified matches have been submitted to the user. They will receive the property details within 24 hours.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {getRequestsForVerification().length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No property matches need verification at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="user-requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Property Requests & Matches</h3>
              <div className="flex items-center space-x-2">
                <Input placeholder="Search user requests..." className="max-w-sm" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {mockPropertyRequests.map((request) => {
              const matches = getMatchesForRequest(request.id)
              const paymentStatus = getRequestPaymentStatus(request.id)
              return (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">{getRequestTitle(request)}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4" />
                            <span className="font-medium">{request.userName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{request.userPhone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{request.userEmail}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          {request.matches} matches
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Request Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Budget Range</h5>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(request.budgetMin)} - {formatPrice(request.budgetMax)}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Locations</h5>
                          <p className="text-sm text-muted-foreground">
                            {request.locations.join(", ")}
                          </p>
                        </div>
                        {getRequestSpecs(request).length > 0 && (
                          <div className="md:col-span-2">
                            <h5 className="font-medium mb-2">Specifications</h5>
                            <div className="flex flex-wrap gap-2">
                              {getRequestSpecs(request).map((spec, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Payment Status */}
                      {paymentStatus && (
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">Payment Status</h5>
                              <p className="text-sm text-muted-foreground">
                                Status: <span className="capitalize">{paymentStatus.status.replace('_', ' ')}</span>
                                {paymentStatus.amount && ` • Amount: ${formatPrice(paymentStatus.amount)}`}
                              </p>
                            </div>
                            {paymentStatus.status === "unlocked" && (
                              <Badge className="bg-green-600 text-white">
                                <Unlock className="h-3 w-3 mr-1" />
                                All Matches Unlocked
                              </Badge>
                            )}
                            {paymentStatus.status === "admin_review" && (
                              <Badge className="bg-yellow-600 text-white">
                                Under Admin Review
                              </Badge>
                            )}
                            {paymentStatus.status === "locked" && (
                              <Badge variant="secondary">
                                <Lock className="h-3 w-3 mr-1" />
                                Payment Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Matched Properties */}
                      {matches.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium">Matched Properties ({matches.length})</h5>
                            <Badge variant="outline" className="text-xs">
                              {paymentStatus?.status === "unlocked" ? "All Unlocked" : 
                               paymentStatus?.status === "admin_review" ? "Admin Review" : "Locked"}
                            </Badge>
                          </div>
                          
                          <div className="grid gap-4">
                            {matches.map((match) => (
                              <Card key={match.id} className="border-l-4 border-l-primary">
                                <CardContent className="p-4">
                                  <div className="flex gap-4">
                                    <img 
                                      src={match.image} 
                                      alt={match.title}
                                      className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h6 className="font-medium">{match.title}</h6>
                                          <p className="text-sm text-muted-foreground">{match.location}</p>
                                          <p className="text-lg font-semibold text-primary">{formatPrice(match.price)}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                          {getMatchStatusBadge(match)}
                                          <div className="text-sm text-muted-foreground">
                                            {match.matchScore}% match
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Property Details */}
                                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        {match.bedrooms && (
                                          <div className="flex items-center gap-1">
                                            <Bed className="h-3 w-3" />
                                            {match.bedrooms}
                                          </div>
                                        )}
                                        {match.bathrooms && (
                                          <div className="flex items-center gap-1">
                                            <Bath className="h-3 w-3" />
                                            {match.bathrooms}
                                          </div>
                                        )}
                                        {match.area && (
                                          <div className="flex items-center gap-1">
                                            <Square className="h-3 w-3" />
                                            {match.area} sq ft
                                          </div>
                                        )}
                                      </div>

                                      {/* Seller Contact */}
                                      <div className="p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-sm font-medium">Seller: {match.seller}</p>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                              <Phone className="h-3 w-3" />
                                              <span>{match.sellerContact}</span>
                                            </div>
                                          </div>
                                          <div className="flex gap-2">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => window.open(`tel:${match.sellerContact}`)}
                                            >
                                              <Phone className="h-3 w-3 mr-1" />
                                              Call
                                            </Button>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Features */}
                                      <div className="flex flex-wrap gap-1">
                                        {match.features.slice(0, 3).map((feature, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {feature}
                                          </Badge>
                                        ))}
                                        {match.features.length > 3 && (
                                          <Badge variant="outline" className="text-xs">
                                            +{match.features.length - 3} more
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {matches.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Search className="h-8 w-8 mx-auto mb-2" />
                          <p>No matches found yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {mockPropertyRequests.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No user property requests to review.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}