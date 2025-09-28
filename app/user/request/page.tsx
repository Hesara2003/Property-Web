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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Home,
  Building2,
  TreePine,
  Store,
  DollarSign,
  Bed,
  Bath,
  Car,
  Calendar,
  Ruler,
  Layers,
  Shield,
  Dumbbell,
  Waves,
  Zap,
  Droplets,
  Truck,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

// Types
type PropertyCategory = "HOUSE" | "COMMERCIAL" | "LAND"
type PropertyType = "DETACHED" | "APARTMENT" | "VILLA" | "TOWNHOUSE" | "SHOP" | "OFFICE" | "WAREHOUSE" | "FACTORY" | "HOTEL" | "OTHER" | "RESIDENTIAL" | "COMMERCIAL" | "AGRICULTURAL" | "INDUSTRIAL"
type Purpose = "SALE" | "RENT" | "INVESTMENT"
type Condition = "BRAND_NEW" | "USED" | "UNDER_CONSTRUCTION"

interface PropertyRequest {
  // Required fields
  propertyCategory: PropertyCategory
  district: string
  priceMin: number
  priceMax: number
  purpose: Purpose
  
  // Optional fields
  propertyType?: PropertyType
  city?: string
  
  // Property specific fields
  landSizeMin?: number
  landSizeMax?: number
  floorAreaMin?: number
  floorAreaMax?: number
  floorsMin?: number
  floorsMax?: number
  bedroomsMin?: number
  bedroomsMax?: number
  bathroomsMin?: number
  bathroomsMax?: number
  condition?: Condition
  
  // Additional features
  features?: string[]
  
  // Notes
  notes?: string
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

export default function PropertyRequestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PropertyRequest>({
    propertyCategory: "HOUSE",
    district: "",
    priceMin: 0,
    priceMax: 0,
    purpose: "SALE"
  })

  const totalSteps = 4

  const updateFormData = (updates: Partial<PropertyRequest>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Property Request Submitted:", formData)
    // Handle form submission logic here
  }

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-LK", { 
      style: "currency", 
      currency: "LKR", 
      maximumFractionDigits: 0 
    }).format(price)

  const RangeInput = ({
    label,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    unit = "",
    step = 1,
    min = 0,
    max = 1000000
  }: {
    label: string
    minValue: number
    maxValue: number
    onMinChange: (value: number) => void
    onMaxChange: (value: number) => void
    unit?: string
    step?: number
    min?: number
    max?: number
  }) => {
    const [inputMode, setInputMode] = useState<'slider' | 'exact'>('slider')

    const handleExactValueChange = (value: number) => {
      onMinChange(value)
      onMaxChange(value)
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Label className="font-medium">{label}</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={inputMode === 'exact' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setInputMode('exact')}
              className="text-xs"
            >
              Exact Value
            </Button>
            <Button
              type="button"
              variant={inputMode === 'slider' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setInputMode('slider')}
              className="text-xs"
            >
              Slider
            </Button>
          </div>
        </div>
        
        {inputMode === 'slider' ? (
          <div className="space-y-3">
            <Slider
              value={[minValue || min, maxValue || max]}
              onValueChange={([newMin, newMax]: number[]) => {
                onMinChange(newMin)
                onMaxChange(newMax)
              }}
              min={min}
              max={max}
              step={step}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{minValue || min} {unit}</span>
              <span>{maxValue || max} {unit}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Exact {unit}</Label>
            <Input
              type="number"
              value={minValue === maxValue ? minValue || "" : ""}
              onChange={(e) => handleExactValueChange(Number(e.target.value))}
              placeholder={`Enter exact ${unit.toLowerCase()}`}
              min={min}
              max={max}
              step={step}
            />
          </div>
        )}
      </div>
    )
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
                description="Let's start with what type of property you're looking for"
              />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Purpose</Label>
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
                        <Calendar className="h-5 w-5" />
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
                  <Label className="text-lg font-medium">Property Category</Label>
                  <RadioGroup
                    value={formData.propertyCategory}
                    onValueChange={(value: PropertyCategory) => updateFormData({ propertyCategory: value, propertyType: undefined })}
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
                        <Store className="h-5 w-5" />
                        Commercial Property
                      </div>
                    </Label>
                    <Label htmlFor="land" className={`flex items-center space-x-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyCategory === 'LAND' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="LAND" id="land" />
                      <div className="flex items-center gap-2">
                        <TreePine className="h-5 w-5" />
                        Land
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                {formData.propertyCategory && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Property Type (Optional)</Label>
                    <Select 
                      value={formData.propertyType || ""} 
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
                )}
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
                title="Location & Price Range"
                description="Tell us where you're looking and your budget"
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
                    Price Range (LKR) *
                  </Label>
                  
                  <RangeInput
                    label="Budget Range"
                    minValue={formData.priceMin}
                    maxValue={formData.priceMax}
                    onMinChange={(value) => updateFormData({ priceMin: value })}
                    onMaxChange={(value) => updateFormData({ priceMax: value })}
                    unit="LKR"
                    step={formData.purpose === "SALE" ? 1000000 : 10000}
                    min={formData.purpose === "SALE" ? 5000000 : 20000}
                    max={formData.purpose === "SALE" ? 500000000 : 500000}
                  />

                  {formData.priceMin > 0 && formData.priceMax > 0 && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Your budget range:</p>
                      <p className="text-lg font-semibold">
                        {formatPrice(formData.priceMin)} - {formatPrice(formData.priceMax)}
                        {formData.purpose === "RENT" && " per month"}
                      </p>
                    </div>
                  )}
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
                  disabled={!formData.district || formData.priceMin === 0 || formData.priceMax === 0}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Property Specifications */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="p-4 sm:p-8">
              <StepHeader
                step={3}
                title="Property Specifications"
                description={`Tell us about your ${formData.propertyCategory.toLowerCase()} requirements`}
              />

              <div className="space-y-8">
                {/* Common fields for Houses and Commercial Properties */}
                {(formData.propertyCategory === "HOUSE" || formData.propertyCategory === "COMMERCIAL") && (
                  <>
                    {/* Land Size - Optional for Houses/Commercial, Required for Land */}
                    <RangeInput
                      label="Land Size (Perch) (Optional)"
                      minValue={formData.landSizeMin || 0}
                      maxValue={formData.landSizeMax || 0}
                      onMinChange={(value) => updateFormData({ landSizeMin: value })}
                      onMaxChange={(value) => updateFormData({ landSizeMax: value })}
                      unit="perch"
                      step={1}
                      min={1}
                      max={1000}
                    />

                    {/* Floor Area - Required for Houses and Commercial */}
                    <RangeInput
                      label="Floor Area / Built-Up Area (sq.ft) *"
                      minValue={formData.floorAreaMin || 0}
                      maxValue={formData.floorAreaMax || 0}
                      onMinChange={(value) => updateFormData({ floorAreaMin: value })}
                      onMaxChange={(value) => updateFormData({ floorAreaMax: value })}
                      unit="sq.ft"
                      step={100}
                      min={100}
                      max={50000}
                    />

                    {/* Number of Floors - Optional */}
                    <RangeInput
                      label="Number of Floors (Optional)"
                      minValue={formData.floorsMin || 0}
                      maxValue={formData.floorsMax || 0}
                      onMinChange={(value) => updateFormData({ floorsMin: value })}
                      onMaxChange={(value) => updateFormData({ floorsMax: value })}
                      unit="floors"
                      step={1}
                      min={1}
                      max={10}
                    />
                  </>
                )}

                {/* House specific fields */}
                {formData.propertyCategory === "HOUSE" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <RangeInput
                        label="Number of Bedrooms (Optional)"
                        minValue={formData.bedroomsMin || 0}
                        maxValue={formData.bedroomsMax || 0}
                        onMinChange={(value) => updateFormData({ bedroomsMin: value })}
                        onMaxChange={(value) => updateFormData({ bedroomsMax: value })}
                        unit="bedrooms"
                        step={1}
                        min={1}
                        max={10}
                      />

                      <RangeInput
                        label="Number of Bathrooms (Optional)"
                        minValue={formData.bathroomsMin || 0}
                        maxValue={formData.bathroomsMax || 0}
                        onMinChange={(value) => updateFormData({ bathroomsMin: value })}
                        onMaxChange={(value) => updateFormData({ bathroomsMax: value })}
                        unit="bathrooms"
                        step={1}
                        min={1}
                        max={8}
                      />
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
                  <RangeInput
                    label="Land Size (Perch) *"
                    minValue={formData.landSizeMin || 0}
                    maxValue={formData.landSizeMax || 0}
                    onMinChange={(value) => updateFormData({ landSizeMin: value })}
                    onMaxChange={(value) => updateFormData({ landSizeMax: value })}
                    unit="perch"
                    step={1}
                    min={1}
                    max={1000}
                  />
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
                description="Add any special requirements and review your request"
              />

              <div className="space-y-6">
                {/* Notes */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Notes / Special Requirements (Optional)</Label>
                  <Textarea
                    value={formData.notes || ""}
                    onChange={(e) => updateFormData({ notes: e.target.value })}
                    placeholder="Any additional preferences, special requirements, or details you'd like to mention..."
                    rows={4}
                  />
                </div>

                {/* Review Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Request Summary</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p><strong>Purpose:</strong> {formData.purpose}</p>
                          <p><strong>Property Category:</strong> {formData.propertyCategory}</p>
                          {formData.propertyType && (
                            <p><strong>Property Type:</strong> {formData.propertyType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</p>
                          )}
                          <p><strong>District:</strong> {formData.district}</p>
                          {formData.city && <p><strong>City:</strong> {formData.city}</p>}
                        </div>
                        <div className="space-y-2">
                          <p><strong>Price Range:</strong> {formatPrice(formData.priceMin)} - {formatPrice(formData.priceMax)}</p>
                          {formData.landSizeMin && formData.landSizeMax && (
                            <p><strong>Land Size:</strong> {formData.landSizeMin} - {formData.landSizeMax} perch</p>
                          )}
                          {formData.floorAreaMin && formData.floorAreaMax && (
                            <p><strong>Floor Area:</strong> {formData.floorAreaMin} - {formData.floorAreaMax} sq.ft</p>
                          )}
                          {formData.bedroomsMin && formData.bedroomsMax && (
                            <p><strong>Bedrooms:</strong> {formData.bedroomsMin} - {formData.bedroomsMax}</p>
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
                              <Badge key={feature} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Our team will review your request within 24 hours</li>
                    <li>• We'll match your criteria with available properties</li>
                    <li>• You'll receive notifications when suitable matches are found</li>
                    <li>• Premium matches require a small fee to unlock contact details</li>
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
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        )}


      </div>
    </div>
  )
}
