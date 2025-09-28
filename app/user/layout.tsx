"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Home, 
  User, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  BarChart3,
  FileText,
  CheckCircle,
  Bell,
  Settings,
  HelpCircle,
  Crown,
  Shield
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Navigation menu structure
interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "overview",
    label: "Dashboard",
    icon: BarChart3,
    href: "/user"
  },
  {
    id: "buying",
    label: "Buying",
    icon: Search,
    href: "/user",
    submenu: [
      { id: "new-request", label: "New Request", icon: Plus, href: "/user/request" },
      { id: "requests", label: "My Requests", icon: FileText, href: "/user/requests" },
      { id: "matches", label: "Matched Properties", icon: CheckCircle, href: "/user/matches" }
    ]
  },
  {
    id: "selling",
    label: "Selling",
    icon: Home,
    href: "/user",
    submenu: [
      { id: "add-listing", label: "Add Listing", icon: Plus, href: "/user/listing" },
      { id: "listings", label: "My Listings", icon: FileText, href: "/user/listings" },
      { id: "inquiries", label: "Inquiries", icon: Bell, href: "/user/inquiries" }
    ]
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/user",
    submenu: [
      { id: "profile-info", label: "Profile Info", icon: User, href: "/user/profile" },
      { id: "notifications", label: "Notifications", icon: Bell, href: "/user/profile/notifications" },
      { id: "subscription", label: "Subscription", icon: Crown, href: "/user/profile/subscription" },
      { id: "settings", label: "Settings", icon: Settings, href: "/user/profile/settings" },
      { id: "help", label: "Help", icon: HelpCircle, href: "/user/help" }
    ]
  }
]

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["buying", "selling"])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const isActiveLink = (href: string, itemId?: string) => {
    if (href === "/user") {
      // Only highlight Dashboard when on exact /user path
      return pathname === "/user" && itemId === "overview"
    }
    return pathname === href
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50
        ${sidebarOpen ? "w-64" : "w-16"}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">Property Scout</span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => {
                  if (item.submenu) {
                    toggleMenu(item.id)
                  } else {
                    // For items without submenu, navigate directly
                    window.location.href = item.href
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                  ${isActiveLink(item.href, item.id) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                  ${!sidebarOpen ? "justify-center" : ""}
                `}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.submenu && (
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform ${
                          expandedMenus.includes(item.id) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && sidebarOpen && expandedMenus.includes(item.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link key={subItem.id} href={subItem.href}>
                      <button
                        className={`
                          w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
                          ${isActiveLink(subItem.href) ? "bg-primary/10 text-primary" : "hover:bg-muted"}
                        `}
                      >
                        <subItem.icon className="h-3 w-3" />
                        {subItem.label}
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-4 left-2 right-2">
          <div className="border-t border-border pt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className={`w-full ${!sidebarOpen ? "justify-center" : "justify-start"}`}
            >
              <Link href="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                {sidebarOpen && <span>Logout</span>}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Top Header */}
        <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                {pathname === "/user" ? "Dashboard" :
                 pathname === "/user/requests" ? "My Requests" :
                 pathname === "/user/matches" ? "Matched Properties" :
                 pathname === "/user/listings" ? "My Listings" :
                 pathname === "/user/inquiries" ? "Inquiries" :
                 pathname === "/user/settings" ? "Settings" :
                 pathname === "/user/help" ? "Help" :
                 "Dashboard"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome back, John! Manage your properties and connections.
              </p>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
              <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/request" className="flex items-center justify-center gap-1">
                  <Plus className="h-3 w-3" />
                  New Request
                </Link>
              </Button>
              <Button size="sm" asChild className="w-full sm:w-auto">
                <Link href="/listing" className="flex items-center justify-center gap-1">
                  <Plus className="h-3 w-3" />
                  Add Listing
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}