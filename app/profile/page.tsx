"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Lock, Unlock, Edit, Key, LogOut, Bell, Crown, Check, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+94 77 123 4567",
  joined: "2024-01-10",
  subscription: {
    type: "premium", // "free" or "premium"
    expiryDate: "2025-12-31",
    features: ["Unlimited Requests", "Priority Support", "Advanced Filters", "Direct Contact"]
  },
  notifications: {
    emailMatches: true,
    emailInquiries: true,
    smsMatches: false,
    smsInquiries: true,
    pushNotifications: true
  }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [form, setForm] = useState(user)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" })
  const [notifications, setNotifications] = useState(user.notifications)

  const handleEdit = () => {
    setEditMode(true)
    setForm(user)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(form)
    setEditMode(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add password change logic here
    setShowPasswordDialog(false)
    setPasswordForm({ current: "", new: "", confirm: "" })
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
    // Update user state as well
    setUser(prev => ({ 
      ...prev, 
      notifications: { ...prev.notifications, [key]: value }
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Profile</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 lg:px-24 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>View and edit your profile details</CardDescription>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <form className="space-y-6" onSubmit={handleSave}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button type="button" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{user.name}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{user.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Joined</Label>
                      <Badge variant="outline">{new Date(user.joined).toLocaleDateString()}</Badge>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" className="gap-2" onClick={handleEdit}>
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Email Notifications</h4>
                  </div>
                  <div className="grid gap-4 pl-7">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Property Matches</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new properties match your criteria</p>
                      </div>
                      <Switch 
                        checked={notifications.emailMatches}
                        onCheckedChange={(checked) => handleNotificationChange('emailMatches', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Property Inquiries</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about inquiries on your listings</p>
                      </div>
                      <Switch 
                        checked={notifications.emailInquiries}
                        onCheckedChange={(checked) => handleNotificationChange('emailInquiries', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">SMS Notifications</h4>
                  </div>
                  <div className="grid gap-4 pl-7">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Property Matches</Label>
                        <p className="text-sm text-muted-foreground">Get SMS alerts for high-priority matches</p>
                      </div>
                      <Switch 
                        checked={notifications.smsMatches}
                        onCheckedChange={(checked) => handleNotificationChange('smsMatches', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Property Inquiries</Label>
                        <p className="text-sm text-muted-foreground">Receive SMS for urgent inquiries</p>
                      </div>
                      <Switch 
                        checked={notifications.smsInquiries}
                        onCheckedChange={(checked) => handleNotificationChange('smsInquiries', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Push Notifications</h4>
                  </div>
                  <div className="grid gap-4 pl-7">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Browser Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show desktop notifications for important updates</p>
                      </div>
                      <Switch 
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>Manage your Property Scout subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      user.subscription.type === "premium" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      {user.subscription.type === "premium" ? (
                        <Crown className="h-6 w-6" />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">
                        {user.subscription.type} Plan
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {user.subscription.type === "premium" 
                          ? `Expires: ${new Date(user.subscription.expiryDate).toLocaleDateString()}`
                          : "Free forever"
                        }
                      </p>
                    </div>
                  </div>
                  <Badge className={
                    user.subscription.type === "premium" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }>
                    {user.subscription.type === "premium" ? "Active" : "Free"}
                  </Badge>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Current Features</h4>
                  <div className="grid gap-3">
                    {user.subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {user.subscription.type === "free" ? (
                    <Button className="gap-2">
                      <Crown className="h-4 w-4" />
                      Upgrade to Premium
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="gap-2">
                        <Crown className="h-4 w-4" />
                        Extend Subscription
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <X className="h-4 w-4" />
                        Cancel Subscription
                      </Button>
                    </>
                  )}
                </div>

                {/* Billing History */}
                {user.subscription.type === "premium" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Billing History</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Premium Subscription</p>
                          <p className="text-sm text-muted-foreground">Jan 10, 2024 - Dec 31, 2025</p>
                        </div>
                        <span className="font-semibold">LKR 12,000</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Transactions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Change or reset your password</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2" onClick={() => setShowPasswordDialog(true)}>
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Unlock className="h-4 w-4" />
                    Reset Password
                  </Button>
                </div>
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>Update your account password</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" name="current" type="password" value={passwordForm.current} onChange={handlePasswordChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" name="new" type="password" value={passwordForm.new} onChange={handlePasswordChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm New Password</Label>
                        <Input id="confirm" name="confirm" type="password" value={passwordForm.confirm} onChange={handlePasswordChange} required />
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
                        <Button type="submit">Change Password</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
