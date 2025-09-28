"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Lock, Eye, EyeOff, Check, Star, Shield, Users, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'verified'>('free')
  const [accountData, setAccountData] = useState<any>(null)
  const router = useRouter()

  // Form refs
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const handleAccountCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store account data and move to plan selection using refs
    setAccountData({
      firstName: firstNameRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      email: emailRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      password: password
    })
    
    setCurrentStep(2)
    setIsLoading(false)
  }

  const handlePlanSelection = async () => {
    setIsLoading(true)

    // Simulate account creation with selected plan
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful authentication - redirect to dashboard
    router.push("/dashboard")
    setIsLoading(false)
  }

  const formatLKR = (value: number) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(value)
  }

  if (currentStep === 1) {
    return (
      <>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join Property Scout to start finding your perfect property match</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAccountCreation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" ref={firstNameRef} placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" ref={lastNameRef} placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" ref={emailRef} type="email" placeholder="john@example.com" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" ref={phoneRef} type="tel" placeholder="0117 771 979" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Continue to Plan Selection"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </>
    )
  }

  // Step 2: Plan Selection
  return (
    <>
      <Card className="max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle>Choose Your Plan</CardTitle>
          <CardDescription>
            Welcome, {accountData?.firstName}! Select the plan that best fits your property needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6">
            {/* Free Plan */}
            <Card 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPlan === 'free' 
                  ? 'ring-2 ring-blue-500 border-blue-500' 
                  : 'border-border hover:border-blue-300'
              }`}
              onClick={() => setSelectedPlan('free')}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Free</CardTitle>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === 'free' 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-muted-foreground'
                  }`}>
                    {selectedPlan === 'free' && (
                      <Check className="w-full h-full text-white" />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">Free</div>
                  <p className="text-sm text-muted-foreground">Perfect for getting started</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { icon: Users, text: "3 Property Listings" },
                    { icon: Users, text: "3 Buying Requests" },
                    { icon: Zap, text: "Up to 3 Matches/month" },
                    { icon: Mail, text: "Basic Email Notifications" },
                    { icon: Shield, text: "Access to Free + Verified Pool" },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <feature.icon className="w-4 h-4 text-blue-600" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verified Plan */}
            <Card 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPlan === 'verified' 
                  ? 'ring-2 ring-blue-500 border-blue-500' 
                  : 'border-border hover:border-blue-300'
              }`}
              onClick={() => setSelectedPlan('verified')}
            >
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                Recommended
              </Badge>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    Verified
                    <Shield className="w-5 h-5 text-blue-600" />
                  </CardTitle>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === 'verified' 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-muted-foreground'
                  }`}>
                    {selectedPlan === 'verified' && (
                      <Check className="w-full h-full text-white" />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      {formatLKR(2000)}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Full access to verified network</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { icon: Star, text: "Unlimited Property Listings" },
                    { icon: Star, text: "Unlimited Buying Requests" },
                    { icon: Zap, text: "Unlimited Matches" },
                    { icon: Shield, text: "Verified-only Network Access" },
                    { icon: Users, text: "Profile Verification Badge" },
                    { icon: Mail, text: "Instant Push Notifications" },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <feature.icon className="w-4 h-4 text-blue-600" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handlePlanSelection}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {isLoading ? "Setting up your account..." : (
                <>
                  {selectedPlan === 'free' ? 'Start Free' : 'Get Verified'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            {selectedPlan === 'free' 
              ? 'No credit card required • Upgrade anytime' 
              : 'Cancel anytime • No hidden fees'}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </>
  )
}