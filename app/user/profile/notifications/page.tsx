"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"

const mockNotifications = {
  emailMatches: true,
  emailInquiries: true,
  smsMatches: false,
  smsInquiries: true,
  pushNotifications: true
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const updateNotification = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const saveNotifications = () => {
    // Save notification preferences
    console.log('Saving notifications:', notifications)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600">Manage how you receive notifications about property matches and inquiries</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Control email notifications for different activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Property Matches</Label>
              <p className="text-sm text-gray-500">Get notified when new properties match your criteria</p>
            </div>
            <Switch
              checked={notifications.emailMatches}
              onCheckedChange={(checked) => updateNotification('emailMatches', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Property Inquiries</Label>
              <p className="text-sm text-gray-500">Get notified when someone inquires about your property</p>
            </div>
            <Switch
              checked={notifications.emailInquiries}
              onCheckedChange={(checked) => updateNotification('emailInquiries', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
          <CardDescription>
            Control SMS notifications for urgent updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Property Matches</Label>
              <p className="text-sm text-gray-500">Receive SMS for high-priority matches</p>
            </div>
            <Switch
              checked={notifications.smsMatches}
              onCheckedChange={(checked) => updateNotification('smsMatches', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Property Inquiries</Label>
              <p className="text-sm text-gray-500">Receive SMS for new inquiries on your properties</p>
            </div>
            <Switch
              checked={notifications.smsInquiries}
              onCheckedChange={(checked) => updateNotification('smsInquiries', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Control push notifications on your devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Push Notifications</Label>
              <p className="text-sm text-gray-500">Receive push notifications on your mobile device</p>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => updateNotification('pushNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveNotifications}>
          Save Notification Settings
        </Button>
      </div>
    </div>
  )
}
