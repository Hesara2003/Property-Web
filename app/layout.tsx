import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ConditionalLayout } from "@/components/conditional-layout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Property Scout – Sri Lanka's Intelligent Property Marketplace",
  description:
    "Discover and match with verified properties across Colombo, Kandy, Galle, Jaffna & beyond using AI-driven insights.",
  keywords: [
    "Sri Lanka property",
    "Colombo real estate",
    "Property Scout",
    "apartments Colombo",
    "lands Sri Lanka",
    "houses for sale Sri Lanka",
  ],
  openGraph: {
    title: "Property Scout – Intelligent Property Matching in Sri Lanka",
    description:
      "AI-powered platform connecting serious buyers with verified sellers across Sri Lanka's key cities.",
    locale: "en_LK",
    siteName: "Property Scout",
  },
  metadataBase: new URL("https://www.example.com"), // TODO: replace with real domain
  generator: "Property Scout",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-region="lk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins overflow-x-hidden">
        <ConditionalLayout>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  )
}
