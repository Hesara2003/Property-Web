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
type PropertyCategory = "HOUSE" | "COMMERCIAL" | "LAND"
type PropertyType = "DETACHED" | "APARTMENT" | "VILLA" | "TOWNHOUSE" | "SHOP" | "OFFICE" | "WAREHOUSE" | "FACTORY" | "HOTEL" | "OTHER" | "RESIDENTIAL" | "COMMERCIAL" | "AGRICULTURAL" | "INDUSTRIAL"
type Purpose = "SALE" | "RENT" | "INVESTMENT"
type Condition = "BRAND_NEW" | "USED" | "UNDER_CONSTRUCTION"

interface PropertyListing {
  // Required fields
  propertyCategory: PropertyCategory
  propertyType: PropertyType
  district: string
  price: number
  purpose: Purpose
  
  // Optional fields
  city?: string
  priceNegotiable: boolean
  
  // Property specific fields
  landSize?: number // Acre/Perch for Houses, Commercial (if land included), Land
  floorArea?: number // sq.ft for Houses, Commercial properties
  floors?: number // Houses, Commercial properties
  bedrooms?: number // Houses only
  bathrooms?: number // Houses only
  condition?: Condition // Houses, Commercial Properties only
  
  // Features and amenities
  features?: string[]
  
  // Notes
  notes?: string
  
  // Images
  images?: File[]
  
  // Contact Information (not in JSON but needed for listing)
  ownerName?: string
  contactNumber?: string
  email?: string
}

// All districts in Sri Lanka
const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", 
  "Vavuniya", "Mullativu", "Trincomalee", "Batticaloa", "Ampara",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", 
  "Badulla", "Monaragala", "Ratnapura", "Kegalle"
]

// Property type options based on category
const propertyTypesByCategory: Record<PropertyCategory, PropertyType[]> = {
  "HOUSE": ["DETACHED", "APARTMENT", "VILLA", "TOWNHOUSE"],
  "COMMERCIAL": ["SHOP", "OFFICE", "WAREHOUSE", "FACTORY", "HOTEL", "OTHER"],
  "LAND": ["RESIDENTIAL", "COMMERCIAL", "AGRICULTURAL", "INDUSTRIAL"]
}

// Features by property category
const featuresByCategory = {
  "HOUSE": ["Garden", "Balcony", "Swimming Pool", "Parking", "Security", "Air Conditioning", "Solar Power", "Gated Community", "Renovated Kitchen/Bathroom"],
  "COMMERCIAL": ["Parking", "Loading Bay", "Elevator/Lift", "Security", "Air Conditioning", "Electricity (Three Phase)", "CCTV", "Fire Safety", "Warehouse Storage", "Reception Area"],
  "LAND": ["Electricity Access", "Water Access", "Road Frontage", "Fencing/Security", "Irrigation Access", "Suitable for Construction", "Suitable for Farming", "Scenic View", "Corner Plot"]
}

export default function PropertyListingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PropertyListing>({
    propertyCategory: "HOUSE",
    propertyType: "DETACHED",
    district: "",
    price: 0,
    purpose: "SALE",
    priceNegotiable: false
  })

  const totalSteps = 4

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
    updateFormData({ images: [...(formData.images || []), ...files] })
  }

  const removeImage = (index: number) => {
    const newImages = (formData.images || []).filter((_, i) => i !== index)
    updateFormData({ images: newImages })
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
                <div className={`w-8 sm:w-12 h-0.5 ${i + 1 < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Step {step}: {title}</h2>
      <p className="text-sm sm:text-base text-muted-foreground px-2">{description}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardContent className="p-4 sm:p-8">
              <StepHeader
                step={1}
                title="Basic Information"
                description="Tell us about your property and what you're offering"
              />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Purpose *</Label>
                  <RadioGroup
                    value={formData.purpose}
                    onValueChange={(value: Purpose) => updateFormData({ purpose: value })}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <Label htmlFor="sale" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.purpose === 'SALE' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="SALE" id="sale" />
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Sale
                      </div>
                    </Label>
                    <Label htmlFor="rent" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.purpose === 'RENT' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="RENT" id="rent" />
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Rent
                      </div>
                    </Label>
                    <Label htmlFor="investment" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.purpose === 'INVESTMENT' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="INVESTMENT" id="investment" />
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Investment
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium">Property Category *</Label>
                  <RadioGroup
                    value={formData.propertyCategory}
                    onValueChange={(value: PropertyCategory) => updateFormData({ propertyCategory: value })}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <Label htmlFor="house" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyCategory === 'HOUSE' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="HOUSE" id="house" />
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        House
                      </div>
                    </Label>
                    <Label htmlFor="commercial" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyCategory === 'COMMERCIAL' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="COMMERCIAL" id="commercial" />
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Commercial Property
                      </div>
                    </Label>
                    <Label htmlFor="land" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyCategory === 'LAND' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="LAND" id="land" />
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Land
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium">Property Type *</Label>
                  <Select 
                    value={formData.propertyType} 
                    onValueChange={(value: PropertyType) => updateFormData({ propertyType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypesByCategory[formData.propertyCategory].map(type => (
                        <SelectItem key={type} value={type}>
                          {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={nextStep} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Location & Price */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-4 sm:p-8">
              <StepHeader
                step={2}
                title="Location & Price"
                description="Tell us where your property is and set your price"
              />

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      District *
                    </Label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(value) => updateFormData({ district: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map(district => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-medium">City (Optional)</Label>
                    <Input
                      value={formData.city || ""}
                      onChange={(e) => updateFormData({ city: e.target.value })}
                      placeholder="e.g., Colombo 7, Dehiwala"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Asking Price (LKR) *
                  </Label>
                  <Input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => updateFormData({ price: Number(e.target.value) })}
                    placeholder="Enter your asking price"
                    className="text-lg"
                  />
                  {formData.price > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Price: {formatPrice(formData.price)}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="negotiable"
                    checked={formData.priceNegotiable}
                    onCheckedChange={(checked) => updateFormData({ priceNegotiable: checked as boolean })}
                  />
                  <Label htmlFor="negotiable">Price is negotiable</Label>
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
                  disabled={!formData.district || formData.price === 0}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Property Details */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="p-4 sm:p-8">
              <StepHeader
                step={3}
                title="Property Details"
                description={`Tell us about your ${formData.propertyCategory.toLowerCase()} specifications`}
              />

              <div className="space-y-8">
                {/* Common fields for Houses and Commercial Properties */}
                {(formData.propertyCategory === "HOUSE" || formData.propertyCategory === "COMMERCIAL") && (
                  <>
                    {/* Land Size - Optional for Houses/Commercial, Required for Land */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">
                        Land Size (Acre/Perch) (Optional)
                      </Label>
                      <Input
                        type="number"
                        value={formData.landSize || ""}
                        onChange={(e) => updateFormData({ landSize: Number(e.target.value) })}
                        placeholder="Enter land size"
                      />
                    </div>

                    {/* Floor Area - Required for Houses and Commercial */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Floor Area (sq.ft) *</Label>
                      <Input
                        type="number"
                        value={formData.floorArea || ""}
                        onChange={(e) => updateFormData({ floorArea: Number(e.target.value) })}
                        placeholder="Enter floor area"
                      />
                    </div>

                    {/* Number of Floors - Optional */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Number of Floors (Optional)</Label>
                      <Input
                        type="number"
                        value={formData.floors || ""}
                        onChange={(e) => updateFormData({ floors: Number(e.target.value) })}
                        placeholder="Enter number of floors"
                        min="1"
                        max="20"
                      />
                    </div>
                  </>
                )}

                {/* House specific fields */}
                {formData.propertyCategory === "HOUSE" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Label className="text-lg font-medium">Number of Bedrooms (Optional)</Label>
                        <Input
                          type="number"
                          value={formData.bedrooms || ""}
                          onChange={(e) => updateFormData({ bedrooms: Number(e.target.value) })}
                          placeholder="Enter number of bedrooms"
                          min="1"
                          max="10"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label className="text-lg font-medium">Number of Bathrooms (Optional)</Label>
                        <Input
                          type="number"
                          value={formData.bathrooms || ""}
                          onChange={(e) => updateFormData({ bathrooms: Number(e.target.value) })}
                          placeholder="Enter number of bathrooms"
                          min="1"
                          max="8"
                        />
                      </div>
                    </div>

                    {/* Condition - Houses and Commercial only */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Condition (Optional)</Label>
                      <Select 
                        value={formData.condition || ""} 
                        onValueChange={(value: Condition) => updateFormData({ condition: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BRAND_NEW">Brand New</SelectItem>
                          <SelectItem value="USED">Used</SelectItem>
                          <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Commercial specific - same condition field as houses */}
                {formData.propertyCategory === "COMMERCIAL" && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Condition (Optional)</Label>
                    <Select 
                      value={formData.condition || ""} 
                      onValueChange={(value: Condition) => updateFormData({ condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRAND_NEW">Brand New</SelectItem>
                        <SelectItem value="USED">Used</SelectItem>
                        <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Land specific fields */}
                {formData.propertyCategory === "LAND" && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Land Size (Acre/Perch) *</Label>
                    <Input
                      type="number"
                      value={formData.landSize || ""}
                      onChange={(e) => updateFormData({ landSize: Number(e.target.value) })}
                      placeholder="Enter land size"
                    />
                  </div>
                )}

                {/* Additional Features */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Additional Features (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {featuresByCategory[formData.propertyCategory].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features?.includes(feature) || false}
                          onCheckedChange={(checked) => {
                            const currentFeatures = formData.features || []
                            if (checked) {
                              updateFormData({ features: [...currentFeatures, feature] })
                            } else {
                              updateFormData({ features: currentFeatures.filter(f => f !== feature) })
                            }
                          }}
                        />
                        <Label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
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

        {/* Step 4: Notes & Review */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="p-4 sm:p-8">
              <StepHeader
                step={4}
                title="Notes & Review"
                description="Add any special details and review your listing"
              />

              <div className="space-y-6">
                {/* Notes */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Notes / Special Details (Optional)</Label>
                  <Textarea
                    value={formData.notes || ""}
                    onChange={(e) => updateFormData({ notes: e.target.value })}
                    placeholder="Any additional details about your property, special features, or terms..."
                    rows={4}
                  />
                </div>

                {/* Review Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Listing Summary</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p><strong>Purpose:</strong> {formData.purpose}</p>
                          <p><strong>Property Category:</strong> {formData.propertyCategory}</p>
                          <p><strong>Property Type:</strong> {formData.propertyType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</p>
                          <p><strong>District:</strong> {formData.district}</p>
                          {formData.city && <p><strong>City:</strong> {formData.city}</p>}
                          <p><strong>Price:</strong> {formatPrice(formData.price)} {formData.priceNegotiable && "(Negotiable)"}</p>
                        </div>
                        <div className="space-y-2">
                          {formData.landSize && (
                            <p><strong>Land Size:</strong> {formData.landSize} acre/perch</p>
                          )}
                          {formData.floorArea && (
                            <p><strong>Floor Area:</strong> {formData.floorArea} sq.ft</p>
                          )}
                          {formData.floors && (
                            <p><strong>Number of Floors:</strong> {formData.floors}</p>
                          )}
                          {formData.bedrooms && (
                            <p><strong>Bedrooms:</strong> {formData.bedrooms}</p>
                          )}
                          {formData.bathrooms && (
                            <p><strong>Bathrooms:</strong> {formData.bathrooms}</p>
                          )}
                          {formData.condition && (
                            <p><strong>Condition:</strong> {formData.condition.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</p>
                          )}
                        </div>
                      </div>
                      
                      {formData.features && formData.features.length > 0 && (
                        <div className="mt-4">
                          <p><strong>Features:</strong></p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.features.map(feature => (
                              <span key={feature} className="text-xs bg-muted px-2 py-1 rounded">{feature}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {formData.images && formData.images.length > 0 && (
                        <div className="mt-4">
                          <p><strong>Images:</strong> {formData.images.length} uploaded</p>
                        </div>
                      )}
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
                <Button onClick={handleSubmit} className="gap-2">
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