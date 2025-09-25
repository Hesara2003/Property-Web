"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Home, CheckCircle, DollarSign, MapPin, Camera, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// Types
type PropertyType = "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL"
type ListingType = "SALE" | "RENT"
type Province = "Western" | "Central" | "Southern" | "Northern" | "Eastern" | "North Western" | "North Central" | "Uva" | "Sabaragamuwa"

interface PropertyListing {
  // Basic Information
  title: string
  description: string
  propertyType: PropertyType
  listingType: ListingType
  price: number
  
  // Location
  province: string
  district: string
  city: string
  address: string
  
  // Property Details
  bedrooms?: number
  bathrooms?: number
  area?: number
  landSize?: number
  floors?: number
  parking?: number
  yearBuilt?: number
  
  // Apartment specific
  floorNumber?: number
  totalFloors?: number
  
  // Land specific
  frontage?: number
  zoningType?: string
  utilities?: string[]
  
  // Commercial specific
  floorArea?: number
  facilities?: string[]
  
  // Features and Amenities
  features: string[]
  
  // Images
  images: File[]
  
  // Contact Information
  ownerName: string
  contactNumber: string
  email: string
  whatsappNumber?: string
  
  // Additional Information
  availableFrom?: string
  negotiable: boolean
  urgentSale: boolean
}

const provinces = [
  "Western", "Central", "Southern", "Northern", "Eastern", 
  "North Western", "North Central", "Uva", "Sabaragamuwa"
]

const districts: Record<Province, string[]> = {
  "Western": ["Colombo", "Gampaha", "Kalutara"],
  "Central": ["Kandy", "Matale", "Nuwara Eliya"],
  "Southern": ["Galle", "Matara", "Hambantota"],
  "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullativu"],
  "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
  "North Western": ["Kurunegala", "Puttalam"],
  "North Central": ["Anuradhapura", "Polonnaruwa"],
  "Uva": ["Badulla", "Monaragala"],
  "Sabaragamuwa": ["Ratnapura", "Kegalle"]
}

const propertyFeatures = [
  "Garden", "Parking", "Security", "Modern Kitchen", "Swimming Pool", "Gym",
  "Elevator", "Balcony", "Air Conditioning", "Furnished", "Sea View", "City View",
  "Fireplace", "Walk-in Closet", "Terrace", "Servant Quarters", "Solar Panels", "CCTV"
]

const utilitiesOptions = ["Water", "Electricity", "Gas", "Internet", "Sewerage"]
const facilitiesOptions = ["Loading Bays", "Lifts", "Security", "Reception", "Conference Rooms", "Parking", "Generator", "Cafeteria"]
const zoningTypes = ["Residential", "Commercial", "Agricultural", "Industrial", "Mixed Use"]

export default function PropertyListingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PropertyListing>({
    title: "",
    description: "",
    propertyType: "HOUSE",
    listingType: "SALE",
    price: 0,
    province: "",
    district: "",
    city: "",
    address: "",
    features: [],
    images: [],
    ownerName: "",
    contactNumber: "",
    email: "",
    negotiable: false,
    urgentSale: false
  })

  const totalSteps = 6

  const updateFormData = (updates: Partial<PropertyListing>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Property Listing Submitted:", formData)
    // Handle form submission logic here
  }

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    updateFormData({ images: [...formData.images, ...files] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    updateFormData({ images: newImages })
  }

  const toggleFeature = (feature: string) => {
    const features = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature]
    updateFormData({ features })
  }

  const StepHeader = ({ step, title, description }: { step: number, title: string, description: string }) => (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1 <= currentStep ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-12 h-0.5 ${i + 1 < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">Step {step}: {title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Add Property Listing</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={1}
                title="Basic Information"
                description="Tell us about your property and what you're offering"
              />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">What are you offering?</Label>
                  <RadioGroup
                    value={formData.listingType}
                    onValueChange={(value: ListingType) => updateFormData({ listingType: value })}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label htmlFor="sale" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.listingType === 'SALE' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="SALE" id="sale" />
                      <div>
                        <div className="font-medium">For Sale</div>
                        <div className="text-sm text-muted-foreground">Sell your property</div>
                      </div>
                    </Label>
                    <Label htmlFor="rent" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.listingType === 'RENT' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="RENT" id="rent" />
                      <div>
                        <div className="font-medium">For Rent</div>
                        <div className="text-sm text-muted-foreground">Rent out your property</div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium">What type of property?</Label>
                  <RadioGroup
                    value={formData.propertyType}
                    onValueChange={(value: PropertyType) => updateFormData({ propertyType: value })}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label htmlFor="house" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'HOUSE' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="HOUSE" id="house" />
                      <div>
                        <div className="font-medium">House</div>
                        <div className="text-sm text-muted-foreground">Independent house with land</div>
                      </div>
                    </Label>
                    <Label htmlFor="apartment" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'APARTMENT' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="APARTMENT" id="apartment" />
                      <div>
                        <div className="font-medium">Apartment</div>
                        <div className="text-sm text-muted-foreground">Apartment or flat in building</div>
                      </div>
                    </Label>
                    <Label htmlFor="land" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'LAND' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="LAND" id="land" />
                      <div>
                        <div className="font-medium">Land</div>
                        <div className="text-sm text-muted-foreground">Vacant land or plot</div>
                      </div>
                    </Label>
                    <Label htmlFor="commercial" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'COMMERCIAL' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="COMMERCIAL" id="commercial" />
                      <div>
                        <div className="font-medium">Commercial</div>
                        <div className="text-sm text-muted-foreground">Office, shop, or business space</div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="title" className="text-lg font-medium">Property Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    placeholder="e.g., Beautiful 3BR House in Colombo 6"
                    className="text-base"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  onClick={nextStep} 
                  className="gap-2"
                  disabled={!formData.title || !formData.listingType || !formData.propertyType}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={2}
                title="Location Details"
                description="Where is your property located?"
              />

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="province" className="text-lg font-medium">Province</Label>
                    <Select 
                      value={formData.province} 
                      onValueChange={(value) => updateFormData({ province: value, district: "", city: "" })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map(province => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="district" className="text-lg font-medium">District</Label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(value) => updateFormData({ district: value, city: "" })}
                      disabled={!formData.province}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.province && districts[formData.province as Province]?.map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="city" className="text-lg font-medium">City/Area</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData({ city: e.target.value })}
                    placeholder="e.g., Bambalapitiya, Dehiwala"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="address" className="text-lg font-medium">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData({ address: e.target.value })}
                    placeholder="Enter the complete address including street name, landmarks, etc."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  onClick={nextStep} 
                  className="gap-2"
                  disabled={!formData.province || !formData.district || !formData.city || !formData.address}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Price */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={3}
                title="Pricing"
                description={`Set your ${formData.listingType === "SALE" ? "selling" : "rental"} price`}
              />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="price" className="text-lg font-medium flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    {formData.listingType === "SALE" ? "Sale Price" : "Monthly Rent"} (LKR)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => updateFormData({ price: Number(e.target.value) })}
                    placeholder={formData.listingType === "SALE" ? "95000000" : "150000"}
                    className="text-lg"
                  />
                  {formData.price > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Price: {formatPrice(formData.price)}
                      {formData.listingType === "RENT" ? " per month" : ""}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="negotiable"
                      checked={formData.negotiable}
                      onCheckedChange={(checked) => updateFormData({ negotiable: checked as boolean })}
                    />
                    <Label htmlFor="negotiable">Price is negotiable</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgentSale"
                      checked={formData.urgentSale}
                      onCheckedChange={(checked) => updateFormData({ urgentSale: checked as boolean })}
                    />
                    <Label htmlFor="urgentSale">Urgent {formData.listingType === "SALE" ? "sale" : "rental"}</Label>
                  </div>
                </div>

                {formData.listingType === "RENT" && (
                  <div className="space-y-4">
                    <Label htmlFor="availableFrom" className="text-lg font-medium">Available From</Label>
                    <Input
                      id="availableFrom"
                      type="date"
                      value={formData.availableFrom || ""}
                      onChange={(e) => updateFormData({ availableFrom: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  onClick={nextStep} 
                  className="gap-2"
                  disabled={formData.price === 0}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Property Details */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={4}
                title="Property Details"
                description={`Tell us about your ${formData.propertyType.toLowerCase()} specifications`}
              />

              <div className="space-y-8">
                {/* House Details */}
                {formData.propertyType === "HOUSE" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Land Size (Perches)</Label>
                        <Input
                          type="number"
                          value={formData.landSize || ""}
                          onChange={(e) => updateFormData({ landSize: Number(e.target.value) })}
                          placeholder="15"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>House Size (sq ft)</Label>
                        <Input
                          type="number"
                          value={formData.area || ""}
                          onChange={(e) => updateFormData({ area: Number(e.target.value) })}
                          placeholder="2500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Bedrooms</Label>
                        <Select value={formData.bedrooms?.toString() || ""} onValueChange={(value) => updateFormData({ bedrooms: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Bathrooms</Label>
                        <Select value={formData.bathrooms?.toString() || ""} onValueChange={(value) => updateFormData({ bathrooms: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Floors</Label>
                        <Select value={formData.floors?.toString() || ""} onValueChange={(value) => updateFormData({ floors: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Parking</Label>
                        <Select value={formData.parking?.toString() || ""} onValueChange={(value) => updateFormData({ parking: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0,1,2,3,4,5,6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Year Built (Optional)</Label>
                      <Input
                        type="number"
                        value={formData.yearBuilt || ""}
                        onChange={(e) => updateFormData({ yearBuilt: Number(e.target.value) })}
                        placeholder="2020"
                        min="1950"
                        max="2025"
                      />
                    </div>
                  </>
                )}

                {/* Apartment Details */}
                {formData.propertyType === "APARTMENT" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Apartment Size (sq ft)</Label>
                        <Input
                          type="number"
                          value={formData.area || ""}
                          onChange={(e) => updateFormData({ area: Number(e.target.value) })}
                          placeholder="1400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Floor Number</Label>
                        <Input
                          type="number"
                          value={formData.floorNumber || ""}
                          onChange={(e) => updateFormData({ floorNumber: Number(e.target.value) })}
                          placeholder="8"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Bedrooms</Label>
                        <Select value={formData.bedrooms?.toString() || ""} onValueChange={(value) => updateFormData({ bedrooms: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Bathrooms</Label>
                        <Select value={formData.bathrooms?.toString() || ""} onValueChange={(value) => updateFormData({ bathrooms: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Parking</Label>
                        <Select value={formData.parking?.toString() || ""} onValueChange={(value) => updateFormData({ parking: Number(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0,1,2,3,4].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {/* Land Details */}
                {formData.propertyType === "LAND" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Land Size (Perches)</Label>
                        <Input
                          type="number"
                          value={formData.landSize || ""}
                          onChange={(e) => updateFormData({ landSize: Number(e.target.value) })}
                          placeholder="25"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frontage (feet)</Label>
                        <Input
                          type="number"
                          value={formData.frontage || ""}
                          onChange={(e) => updateFormData({ frontage: Number(e.target.value) })}
                          placeholder="80"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Zoning Type</Label>
                      <Select value={formData.zoningType || ""} onValueChange={(value) => updateFormData({ zoningType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zoning type" />
                        </SelectTrigger>
                        <SelectContent>
                          {zoningTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>Available Utilities</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {utilitiesOptions.map((utility) => (
                          <div key={utility} className="flex items-center space-x-2">
                            <Checkbox
                              id={utility}
                              checked={formData.utilities?.includes(utility) || false}
                              onCheckedChange={(checked) => {
                                const utilities = checked
                                  ? [...(formData.utilities || []), utility]
                                  : (formData.utilities || []).filter(u => u !== utility)
                                updateFormData({ utilities })
                              }}
                            />
                            <Label htmlFor={utility}>{utility}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Commercial Details */}
                {formData.propertyType === "COMMERCIAL" && (
                  <>
                    <div className="space-y-2">
                      <Label>Floor Area (sq ft)</Label>
                      <Input
                        type="number"
                        value={formData.floorArea || ""}
                        onChange={(e) => updateFormData({ floorArea: Number(e.target.value) })}
                        placeholder="5000"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Available Facilities</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {facilitiesOptions.map((facility) => (
                          <div key={facility} className="flex items-center space-x-2">
                            <Checkbox
                              id={facility}
                              checked={formData.facilities?.includes(facility) || false}
                              onCheckedChange={(checked) => {
                                const facilities = checked
                                  ? [...(formData.facilities || []), facility]
                                  : (formData.facilities || []).filter(f => f !== facility)
                                updateFormData({ facilities })
                              }}
                            />
                            <Label htmlFor={facility}>{facility}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Parking Spaces</Label>
                      <Input
                        type="number"
                        value={formData.parking || ""}
                        onChange={(e) => updateFormData({ parking: Number(e.target.value) })}
                        placeholder="10"
                      />
                    </div>
                  </>
                )}

                {/* Property Description */}
                <div className="space-y-4">
                  <Label htmlFor="description" className="text-lg font-medium">Property Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    placeholder="Describe your property, its unique features, nearby amenities, and what makes it special..."
                    rows={5}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Features & Images */}
        {currentStep === 5 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={5}
                title="Features & Images"
                description="Highlight your property's best features and upload photos"
              />

              <div className="space-y-8">
                {/* Property Features */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Property Features & Amenities</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {propertyFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm">{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Images */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Property Images</Label>
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">Upload property images (Max 10 images)</p>
                      <p className="text-sm text-muted-foreground mb-4">Supported formats: JPG, PNG, WebP</p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload">
                        <Button variant="outline" className="gap-2" asChild>
                          <span>
                            <Upload className="h-4 w-4" />
                            Choose Images
                          </span>
                        </Button>
                      </Label>
                    </div>

                    {/* Uploaded Images */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Property ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Contact Information & Review */}
        {currentStep === 6 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={6}
                title="Contact Information & Review"
                description="Provide your contact details and review your listing"
              />

              <div className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Full Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => updateFormData({ ownerName: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => updateFormData({ contactNumber: e.target.value })}
                        placeholder="+94 77 123 4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsappNumber">WhatsApp Number (Optional)</Label>
                      <Input
                        id="whatsappNumber"
                        value={formData.whatsappNumber || ""}
                        onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Listing Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Listing Summary</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">{formData.title}</h4>
                            <p className="text-muted-foreground">{formData.propertyType} for {formData.listingType}</p>
                            <p className="text-sm text-muted-foreground">{formData.city}, {formData.district}, {formData.province}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{formatPrice(formData.price)}</p>
                            {formData.listingType === "RENT" && <p className="text-sm text-muted-foreground">per month</p>}
                          </div>
                        </div>

                        {/* Property specs */}
                        {(formData.bedrooms || formData.bathrooms || formData.area) && (
                          <div className="flex gap-4 text-sm">
                            {formData.bedrooms && <span>{formData.bedrooms} BR</span>}
                            {formData.bathrooms && <span>{formData.bathrooms} Bath</span>}
                            {formData.area && <span>{formData.area} sq ft</span>}
                            {formData.landSize && <span>{formData.landSize} perches</span>}
                          </div>
                        )}

                        {formData.features.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">Features:</p>
                            <div className="flex flex-wrap gap-2">
                              {formData.features.slice(0, 5).map(feature => (
                                <span key={feature} className="text-xs bg-muted px-2 py-1 rounded">{feature}</span>
                              ))}
                              {formData.features.length > 5 && (
                                <span className="text-xs text-muted-foreground">+{formData.features.length - 5} more</span>
                              )}
                            </div>
                          </div>
                        )}

                        {formData.images.length > 0 && (
                          <p className="text-sm text-muted-foreground">{formData.images.length} images uploaded</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Your listing will be reviewed by our team within 24 hours</li>
                    <li>• Once approved, it will be visible to potential buyers/renters</li>
                    <li>• You'll receive notifications when someone shows interest</li>
                    <li>• Our system will match your property with active buyer requests</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="gap-2"
                  disabled={!formData.ownerName || !formData.contactNumber || !formData.email}
                >
                  <CheckCircle className="h-4 w-4" />
                  Submit Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}