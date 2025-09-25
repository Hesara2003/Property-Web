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
type PropertyType = "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL"
type Purpose = "BUY" | "RENT"
type Province = "Western" | "Central" | "Southern" | "Northern" | "Eastern" | "North Western" | "North Central" | "Uva" | "Sabaragamuwa"

interface PropertyRequest {
  // Common
  locations: string[]
  budgetMin: number
  budgetMax: number
  propertyType: PropertyType
  purpose: Purpose
  
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
  utilities?: string[]
  
  // Commercial specific
  floorAreaMin?: number
  floorAreaMax?: number
  facilities?: string[]
  
  // Additional
  description?: string
  urgency?: string
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

const amenitiesOptions = ["Lift", "Gym", "Swimming Pool", "Security", "Garden", "Playground", "Parking", "Generator"]
const utilitiesOptions = ["Water", "Electricity", "Gas", "Internet", "Sewerage"]
const facilitiesOptions = ["Loading Bays", "Lifts", "Security", "Reception", "Conference Rooms", "Parking", "Generator"]
const zoningTypes = ["Residential", "Commercial", "Agricultural", "Industrial", "Mixed Use"]

export default function PropertyRequestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PropertyRequest>({
    locations: [],
    budgetMin: 0,
    budgetMax: 0,
    propertyType: "HOUSE",
    purpose: "BUY"
  })

  const totalSteps = 5

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
        <div className="flex items-center justify-between">
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
                <span className="text-xl font-bold">Property Request</span>
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
                description="Let's start with what type of property you're looking for"
              />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">What are you looking to do?</Label>
                  <RadioGroup
                    value={formData.purpose}
                    onValueChange={(value: Purpose) => updateFormData({ purpose: value })}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label htmlFor="buy" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.purpose === 'BUY' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="BUY" id="buy" />
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Buy Property
                      </div>
                    </Label>
                    <Label htmlFor="rent" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.purpose === 'RENT' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="RENT" id="rent" />
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Rent Property
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
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        House
                      </div>
                    </Label>
                    <Label htmlFor="apartment" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'APARTMENT' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="APARTMENT" id="apartment" />
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Apartment
                      </div>
                    </Label>
                    <Label htmlFor="land" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'LAND' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="LAND" id="land" />
                      <div className="flex items-center gap-2">
                        <TreePine className="h-5 w-5" />
                        Land
                      </div>
                    </Label>
                    <Label htmlFor="commercial" className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted ${formData.propertyType === 'COMMERCIAL' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="COMMERCIAL" id="commercial" />
                      <div className="flex items-center gap-2">
                        <Store className="h-5 w-5" />
                        Commercial
                      </div>
                    </Label>
                  </RadioGroup>
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

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={2}
                title="Location Preferences"
                description="Where would you like to find your property?"
              />

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-medium flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Preferred Locations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Select multiple provinces and districts for broader search options
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {provinces.map(province => (
                      <div key={province} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={province}
                            checked={formData.locations.includes(province)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Add province and all its districts
                                const provinceDistricts = districts[province as Province] || []
                                const newLocations = [
                                  ...formData.locations.filter(loc => 
                                    loc !== province && !provinceDistricts.includes(loc)
                                  ),
                                  province,
                                  ...provinceDistricts
                                ]
                                updateFormData({
                                  locations: newLocations
                                })
                              } else {
                                // Remove province and all its districts
                                updateFormData({
                                  locations: formData.locations.filter(loc => 
                                    loc !== province && !districts[province as Province]?.includes(loc)
                                  )
                                })
                              }
                            }}
                          />
                          <Label htmlFor={province} className="font-medium cursor-pointer">
                            {province} Province
                          </Label>
                        </div>
                        
                        {districts[province as Province] && (
                          <div className="ml-6 space-y-2">
                            {districts[province as Province].map(district => (
                              <div key={district} className="flex items-center space-x-2">
                                <Checkbox
                                  id={district}
                                  checked={formData.locations.includes(district)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      const newLocations = [...formData.locations, district]
                                      
                                      // Check if all districts in this province are now selected
                                      const provinceDistricts = districts[province as Province] || []
                                      const allDistrictsSelected = provinceDistricts.every(d => 
                                        newLocations.includes(d)
                                      )
                                      
                                      // If all districts are selected, also add the province
                                      if (allDistrictsSelected && !newLocations.includes(province)) {
                                        newLocations.push(province)
                                      }
                                      
                                      updateFormData({
                                        locations: newLocations
                                      })
                                    } else {
                                      // Remove district and province (if selected)
                                      updateFormData({
                                        locations: formData.locations.filter(loc => 
                                          loc !== district && loc !== province
                                        )
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={district} className="text-sm cursor-pointer">
                                  {district}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {formData.locations.length > 0 && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium">Selected Locations:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.locations.map(location => (
                          <Badge key={location} variant="secondary">
                            {location}
                          </Badge>
                        ))}
                      </div>
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
                  disabled={formData.locations.length === 0}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Budget */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={3}
                title="Budget Range"
                description={`What's your budget for ${formData.purpose === "BUY" ? "buying" : "renting"} this property?`}
              />

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-medium">
                    {formData.purpose === "BUY" ? "Purchase" : "Monthly Rent"} Budget (LKR)
                  </Label>
                </div>

                <RangeInput
                  label="Budget Range"
                  minValue={formData.budgetMin}
                  maxValue={formData.budgetMax}
                  onMinChange={(value) => updateFormData({ budgetMin: value })}
                  onMaxChange={(value) => updateFormData({ budgetMax: value })}
                  unit="LKR"
                  step={formData.purpose === "BUY" ? 1000000 : 10000}
                  min={formData.purpose === "BUY" ? 5000000 : 20000}
                  max={formData.purpose === "BUY" ? 500000000 : 500000}
                />

                {formData.budgetMin > 0 && formData.budgetMax > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Your budget range:</p>
                    <p className="text-lg font-semibold">
                      {formatPrice(formData.budgetMin)} - {formatPrice(formData.budgetMax)}
                      {formData.purpose === "RENT" && " per month"}
                    </p>
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
                  disabled={formData.budgetMin === 0 || formData.budgetMax === 0}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Property Specifications */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={4}
                title="Property Specifications"
                description={`Tell us about your ${formData.propertyType.toLowerCase()} requirements`}
              />

              <div className="space-y-8">
                {/* House Specifications */}
                {formData.propertyType === "HOUSE" && (
                  <>
                    <RangeInput
                      label="Land Size (Perches)"
                      minValue={formData.landSizeMin || 0}
                      maxValue={formData.landSizeMax || 0}
                      onMinChange={(value) => updateFormData({ landSizeMin: value })}
                      onMaxChange={(value) => updateFormData({ landSizeMax: value })}
                      unit="perches"
                      step={5}
                      min={5}
                      max={200}
                    />

                    <RangeInput
                      label="House Size (sq ft)"
                      minValue={formData.houseSizeMin || 0}
                      maxValue={formData.houseSizeMax || 0}
                      onMinChange={(value) => updateFormData({ houseSizeMin: value })}
                      onMaxChange={(value) => updateFormData({ houseSizeMax: value })}
                      unit="sq ft"
                      step={100}
                      min={500}
                      max={10000}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <RangeInput
                        label="Bedrooms"
                        minValue={formData.bedroomsMin || 0}
                        maxValue={formData.bedroomsMax || 0}
                        onMinChange={(value) => updateFormData({ bedroomsMin: value })}
                        onMaxChange={(value) => updateFormData({ bedroomsMax: value })}
                        unit="bedrooms"
                        step={1}
                        min={1}
                        max={8}
                      />

                      <RangeInput
                        label="Bathrooms"
                        minValue={formData.bathroomsMin || 0}
                        maxValue={formData.bathroomsMax || 0}
                        onMinChange={(value) => updateFormData({ bathroomsMin: value })}
                        onMaxChange={(value) => updateFormData({ bathroomsMax: value })}
                        unit="bathrooms"
                        step={1}
                        min={1}
                        max={6}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <RangeInput
                        label="Number of Floors"
                        minValue={formData.floorsMin || 0}
                        maxValue={formData.floorsMax || 0}
                        onMinChange={(value) => updateFormData({ floorsMin: value })}
                        onMaxChange={(value) => updateFormData({ floorsMax: value })}
                        unit="floors"
                        step={1}
                        min={1}
                        max={4}
                      />

                      <RangeInput
                        label="Parking Spaces"
                        minValue={formData.parkingMin || 0}
                        maxValue={formData.parkingMax || 0}
                        onMinChange={(value) => updateFormData({ parkingMin: value })}
                        onMaxChange={(value) => updateFormData({ parkingMax: value })}
                        unit="spaces"
                        step={1}
                        min={0}
                        max={6}
                      />
                    </div>

                    <RangeInput
                      label="Year Built (Optional)"
                      minValue={formData.yearBuiltMin || 1980}
                      maxValue={formData.yearBuiltMax || 2025}
                      onMinChange={(value) => updateFormData({ yearBuiltMin: value })}
                      onMaxChange={(value) => updateFormData({ yearBuiltMax: value })}
                      unit=""
                      step={1}
                      min={1980}
                      max={2025}
                    />
                  </>
                )}

                {/* Apartment Specifications */}
                {formData.propertyType === "APARTMENT" && (
                  <>
                    <RangeInput
                      label="Apartment Size (sq ft)"
                      minValue={formData.sizeMin || 0}
                      maxValue={formData.sizeMax || 0}
                      onMinChange={(value) => updateFormData({ sizeMin: value })}
                      onMaxChange={(value) => updateFormData({ sizeMax: value })}
                      unit="sq ft"
                      step={100}
                      min={400}
                      max={5000}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <RangeInput
                        label="Bedrooms"
                        minValue={formData.bedroomsMin || 0}
                        maxValue={formData.bedroomsMax || 0}
                        onMinChange={(value) => updateFormData({ bedroomsMin: value })}
                        onMaxChange={(value) => updateFormData({ bedroomsMax: value })}
                        unit="bedrooms"
                        step={1}
                        min={1}
                        max={6}
                      />

                      <RangeInput
                        label="Bathrooms"
                        minValue={formData.bathroomsMin || 0}
                        maxValue={formData.bathroomsMax || 0}
                        onMinChange={(value) => updateFormData({ bathroomsMin: value })}
                        onMaxChange={(value) => updateFormData({ bathroomsMax: value })}
                        unit="bathrooms"
                        step={1}
                        min={1}
                        max={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <RangeInput
                        label="Floor Number"
                        minValue={formData.floorMin || 0}
                        maxValue={formData.floorMax || 0}
                        onMinChange={(value) => updateFormData({ floorMin: value })}
                        onMaxChange={(value) => updateFormData({ floorMax: value })}
                        unit="floor"
                        step={1}
                        min={0}
                        max={50}
                      />

                      <RangeInput
                        label="Parking Spaces"
                        minValue={formData.parkingMin || 0}
                        maxValue={formData.parkingMax || 0}
                        onMinChange={(value) => updateFormData({ parkingMin: value })}
                        onMaxChange={(value) => updateFormData({ parkingMax: value })}
                        unit="spaces"
                        step={1}
                        min={0}
                        max={4}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Preferred Amenities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {amenitiesOptions.map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={formData.amenities?.includes(amenity) || false}
                              onCheckedChange={(checked) => {
                                const current = formData.amenities || []
                                if (checked) {
                                  updateFormData({ amenities: [...current, amenity] })
                                } else {
                                  updateFormData({ amenities: current.filter(a => a !== amenity) })
                                }
                              }}
                            />
                            <Label htmlFor={amenity} className="text-sm cursor-pointer">
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Land Specifications */}
                {formData.propertyType === "LAND" && (
                  <>
                    <RangeInput
                      label="Land Size (Perches)"
                      minValue={formData.landSizeMin || 0}
                      maxValue={formData.landSizeMax || 0}
                      onMinChange={(value) => updateFormData({ landSizeMin: value })}
                      onMaxChange={(value) => updateFormData({ landSizeMax: value })}
                      unit="perches"
                      step={5}
                      min={5}
                      max={1000}
                    />

                    <RangeInput
                      label="Frontage (feet)"
                      minValue={formData.frontageMin || 0}
                      maxValue={formData.frontageMax || 0}
                      onMinChange={(value) => updateFormData({ frontageMin: value })}
                      onMaxChange={(value) => updateFormData({ frontageMax: value })}
                      unit="feet"
                      step={5}
                      min={20}
                      max={200}
                    />

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Zoning Type</Label>
                      <Select
                        value={formData.zoningType || ""}
                        onValueChange={(value) => updateFormData({ zoningType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select zoning type" />
                        </SelectTrigger>
                        <SelectContent>
                          {zoningTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Required Utilities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {utilitiesOptions.map((utility) => (
                          <div key={utility} className="flex items-center space-x-2">
                            <Checkbox
                              id={utility}
                              checked={formData.utilities?.includes(utility) || false}
                              onCheckedChange={(checked) => {
                                const current = formData.utilities || []
                                if (checked) {
                                  updateFormData({ utilities: [...current, utility] })
                                } else {
                                  updateFormData({ utilities: current.filter(u => u !== utility) })
                                }
                              }}
                            />
                            <Label htmlFor={utility} className="text-sm cursor-pointer">
                              {utility}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Commercial Specifications */}
                {formData.propertyType === "COMMERCIAL" && (
                  <>
                    <RangeInput
                      label="Floor Area (sq ft)"
                      minValue={formData.floorAreaMin || 0}
                      maxValue={formData.floorAreaMax || 0}
                      onMinChange={(value) => updateFormData({ floorAreaMin: value })}
                      onMaxChange={(value) => updateFormData({ floorAreaMax: value })}
                      unit="sq ft"
                      step={500}
                      min={500}
                      max={50000}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <RangeInput
                        label="Floors Available"
                        minValue={formData.floorsMin || 0}
                        maxValue={formData.floorsMax || 0}
                        onMinChange={(value) => updateFormData({ floorsMin: value })}
                        onMaxChange={(value) => updateFormData({ floorsMax: value })}
                        unit="floors"
                        step={1}
                        min={1}
                        max={20}
                      />

                      <RangeInput
                        label="Parking Spaces"
                        minValue={formData.parkingMin || 0}
                        maxValue={formData.parkingMax || 0}
                        onMinChange={(value) => updateFormData({ parkingMin: value })}
                        onMaxChange={(value) => updateFormData({ parkingMax: value })}
                        unit="spaces"
                        step={1}
                        min={0}
                        max={100}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Required Facilities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {facilitiesOptions.map((facility) => (
                          <div key={facility} className="flex items-center space-x-2">
                            <Checkbox
                              id={facility}
                              checked={formData.facilities?.includes(facility) || false}
                              onCheckedChange={(checked) => {
                                const current = formData.facilities || []
                                if (checked) {
                                  updateFormData({ facilities: [...current, facility] })
                                } else {
                                  updateFormData({ facilities: current.filter(f => f !== facility) })
                                }
                              }}
                            />
                            <Label htmlFor={facility} className="text-sm cursor-pointer">
                              {facility}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <Card>
            <CardContent className="p-8">
              <StepHeader
                step={5}
                title="Review & Submit"
                description="Please review your property request before submitting"
              />

              <div className="space-y-6">
                {/* Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Purpose:</span> {formData.purpose}</p>
                      <p><span className="font-medium">Property Type:</span> {formData.propertyType}</p>
                      <p><span className="font-medium">Budget:</span> {formatPrice(formData.budgetMin)} - {formatPrice(formData.budgetMax)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Locations</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.locations.map(location => (
                        <Badge key={location} variant="secondary">{location}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Property Specifications Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Property Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {formData.propertyType === "HOUSE" && (
                      <>
                        {formData.landSizeMin && formData.landSizeMax && (
                          <p><span className="font-medium">Land Size:</span> {formData.landSizeMin} - {formData.landSizeMax} perches</p>
                        )}
                        {formData.houseSizeMin && formData.houseSizeMax && (
                          <p><span className="font-medium">House Size:</span> {formData.houseSizeMin} - {formData.houseSizeMax} sq ft</p>
                        )}
                        {formData.bedroomsMin && formData.bedroomsMax && (
                          <p><span className="font-medium">Bedrooms:</span> {formData.bedroomsMin} - {formData.bedroomsMax}</p>
                        )}
                        {formData.bathroomsMin && formData.bathroomsMax && (
                          <p><span className="font-medium">Bathrooms:</span> {formData.bathroomsMin} - {formData.bathroomsMax}</p>
                        )}
                      </>
                    )}

                    {formData.propertyType === "APARTMENT" && (
                      <>
                        {formData.sizeMin && formData.sizeMax && (
                          <p><span className="font-medium">Size:</span> {formData.sizeMin} - {formData.sizeMax} sq ft</p>
                        )}
                        {formData.bedroomsMin && formData.bedroomsMax && (
                          <p><span className="font-medium">Bedrooms:</span> {formData.bedroomsMin} - {formData.bedroomsMax}</p>
                        )}
                        {formData.floorMin && formData.floorMax && (
                          <p><span className="font-medium">Floor:</span> {formData.floorMin} - {formData.floorMax}</p>
                        )}
                        {formData.amenities && formData.amenities.length > 0 && (
                          <div className="md:col-span-2">
                            <span className="font-medium">Amenities:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {formData.amenities.map(amenity => (
                                <Badge key={amenity} variant="outline" className="text-xs">{amenity}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {formData.propertyType === "LAND" && (
                      <>
                        {formData.landSizeMin && formData.landSizeMax && (
                          <p><span className="font-medium">Land Size:</span> {formData.landSizeMin} - {formData.landSizeMax} perches</p>
                        )}
                        {formData.frontageMin && formData.frontageMax && (
                          <p><span className="font-medium">Frontage:</span> {formData.frontageMin} - {formData.frontageMax} feet</p>
                        )}
                        {formData.zoningType && (
                          <p><span className="font-medium">Zoning:</span> {formData.zoningType}</p>
                        )}
                      </>
                    )}

                    {formData.propertyType === "COMMERCIAL" && (
                      <>
                        {formData.floorAreaMin && formData.floorAreaMax && (
                          <p><span className="font-medium">Floor Area:</span> {formData.floorAreaMin} - {formData.floorAreaMax} sq ft</p>
                        )}
                        {formData.floorsMin && formData.floorsMax && (
                          <p><span className="font-medium">Floors:</span> {formData.floorsMin} - {formData.floorsMax}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {formData.description && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Comments</h3>
                    <p className="text-sm bg-muted p-3 rounded-lg">{formData.description}</p>
                  </div>
                )}

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