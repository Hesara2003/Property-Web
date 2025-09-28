"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Edit, Calendar, Crown, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"

const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+94 77 123 4567",
  joined: "2024-01-10",
  location: "Mumbai, Maharashtra",
  profession: "Software Engineer",
  bio: "Looking for a modern apartment in Mumbai with good connectivity to tech hubs.",
  subscription: {
    type: "premium",
    expiryDate: "2025-12-31",
  }
}

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [form, setForm] = useState(user)

  const handleEdit = () => {
    setEditMode(true)
    setForm(user)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(form)
    setEditMode(false)
  }

  const handleCancel = () => {
    setForm(user)
    setEditMode(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={user.subscription.type === "premium" ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            <Crown className="h-3 w-3" />
            {user.subscription.type === "premium" ? "Premium" : "Free"}
          </Badge>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/user/profile/notifications">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500">Manage alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/profile/subscription">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Crown className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium">Subscription</h3>
                  <p className="text-sm text-gray-500">Plan & billing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-gray-500">Account & security</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic profile information
              </CardDescription>
            </div>
            {!editMode && (
              <Button onClick={handleEdit} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editMode ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={form.profession}
                  onChange={(e) => setForm({ ...form, profession: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us about yourself and what you're looking for..."
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                    <p className="text-sm font-medium">{user.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p className="text-sm">{user.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Location</Label>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {user.location}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Profession</Label>
                    <p className="text-sm flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {user.profession}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.joined).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              {user.bio && (
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium text-gray-500">About</Label>
                  <p className="text-sm mt-1">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600">12</h3>
              <p className="text-sm text-gray-600">Active Requests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600">8</h3>
              <p className="text-sm text-gray-600">Property Listings</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-600">45</h3>
              <p className="text-sm text-gray-600">Total Matches</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}