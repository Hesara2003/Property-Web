"use client"

import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-blue-600 to-violet-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <img
          src="https://d18slle4wlf9ku.cloudfront.net/www.cinnamonhotels.com-1302818674/cms/imagepool/67d3c92725330.jpg"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        {/* Back to Home - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Home className="h-10 w-10" />
              <span className="text-3xl font-bold">Property Scout</span>
            </div>
            <h2 className="text-2xl font-semibold">Find Your Perfect Property Match</h2>
            <p className="text-lg opacity-90">
              Connect with verified buyers and sellers in Sri Lanka's most trusted property network.
            </p>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Verified Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Smart Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Manual Approve</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg space-y-6">
          {/* Header - Only show on mobile */}
          <div className="text-center space-y-4 lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Property Scout</span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}