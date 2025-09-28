"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Search, 
  Home, 
  Eye, 
  CheckCircle,
  Bell
} from "lucide-react"
import Link from "next/link"

// Mock data for stats
const mockRequests = 3
const mockMatches = 5
const mockListings = 2
const mockInquiries = 2

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold">{mockRequests}</div>
                <div className="text-xs text-muted-foreground">Active Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <div className="text-xl font-bold">{mockMatches}</div>
                <div className="text-xs text-muted-foreground">Available Matches</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-xl font-bold">{mockListings}</div>
                <div className="text-xs text-muted-foreground">Active Listings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <div className="text-xl font-bold">{mockInquiries}</div>
                <div className="text-xs text-muted-foreground">Pending Inquiries</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Performance Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="flex-1">
                  <p className="font-medium text-sm">New match found</p>
                  <p className="text-xs text-muted-foreground">Property in Colombo 6</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="font-medium text-sm">New inquiry</p>
                  <p className="text-xs text-muted-foreground">Rajesh interested</p>
                </div>
                <span className="text-xs text-muted-foreground">3h ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Request approved</p>
                  <p className="text-xs text-muted-foreground">3BR house request</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Total Views</span>
                <Badge className="bg-blue-600 text-white">245</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Conversion Rate</span>
                <Badge className="bg-green-600 text-white">12%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Avg Response</span>
                <Badge className="bg-purple-600 text-white">2.3h</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" size="sm" asChild>
                <Link href="/request">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Property Request
                </Link>
              </Button>
              <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                <Link href="/listing">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </Link>
              </Button>
              <Button className="w-full justify-start" size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}