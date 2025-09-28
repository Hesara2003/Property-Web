"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, CreditCard, Calendar } from "lucide-react"

const mockSubscription = {
  type: "premium", // "free" or "premium"
  expiryDate: "2025-12-31",
  features: ["Unlimited Requests", "Priority Support", "Advanced Filters", "Direct Contact"]
}

export default function SubscriptionPage() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600">Manage your subscription plan and billing</p>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium capitalize">{mockSubscription.type} Plan</h3>
                <Badge variant={mockSubscription.type === "premium" ? "default" : "secondary"}>
                  {mockSubscription.type === "premium" ? "Active" : "Basic"}
                </Badge>
              </div>
              {mockSubscription.type === "premium" && (
                <p className="text-sm text-gray-600 mt-1">
                  Expires on {new Date(mockSubscription.expiryDate).toLocaleDateString()}
                </p>
              )}
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Included Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockSubscription.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            {mockSubscription.type === "premium" && (
              <div className="text-right">
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Billing
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Free",
              price: "LKR 0",
              period: "month",
              features: [
                "Dashboard Access",
                "3 Property Listings",
                "3 Buying Requests", 
                "Up to 3 Matches/month",
                "Free + Verified Pool Access",
                "Basic Email Notifications"
              ]
            },
            {
              name: "Verified",
              price: "LKR 2,000",
              period: "month",
              features: [
                "Dashboard Access",
                "Unlimited Property Listings",
                "Unlimited Buying Requests",
                "Unlimited Matches",
                "Verified-only Matching Pool",
                "Profile Verification Badge",
                "Instant Push/Email Notifications",
                "Full Analytics & Insights"
              ],
              popular: true
            }
          ].map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500">Recommended</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {plan.name.toLowerCase() === mockSubscription.type && (
                    <Badge variant="default">Current</Badge>
                  )}
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {plan.name === "Free" ? "Get started with limited access" : "Full access to verified network"}
                </p>
                
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  {plan.name.toLowerCase() === mockSubscription.type ? (
                    <Button disabled className="w-full">
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                    >
                      {plan.name === "Free" ? "Downgrade to Free" : "Upgrade to Verified"}
                    </Button>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  {plan.name === "Free" ? "No credit card required" : "Access verified network • Cancel anytime"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      {mockSubscription.type === "premium" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "2024-09-01", amount: "LKR 999", status: "Paid" },
                { date: "2024-08-01", amount: "LKR 999", status: "Paid" },
                { date: "2024-07-01", amount: "LKR 999", status: "Paid" }
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{bill.date}</p>
                    <p className="text-xs text-gray-500">Premium Subscription</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{bill.amount}</p>
                    <Badge variant="outline" className="text-xs">
                      {bill.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}