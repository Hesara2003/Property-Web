"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  HelpCircle,
  Phone,
  Mail,
  FileText
} from "lucide-react"

export default function UserHelp() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">1. Create Property Request</h4>
              <p className="text-xs text-muted-foreground">Define what you're looking for</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">2. List Your Property</h4>
              <p className="text-xs text-muted-foreground">Add properties you want to sell/rent</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">3. Get Matched</h4>
              <p className="text-xs text-muted-foreground">Our system finds the best matches</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-1">How does matching work?</h4>
              <p className="text-xs text-muted-foreground">Our AI system analyzes your preferences and finds properties that match your criteria.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">What are unlock fees?</h4>
              <p className="text-xs text-muted-foreground">A small fee to access detailed property information and seller contacts.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">How to improve visibility?</h4>
              <p className="text-xs text-muted-foreground">Add high-quality photos and detailed descriptions to your listings.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Need help? Our support team is here to assist you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}