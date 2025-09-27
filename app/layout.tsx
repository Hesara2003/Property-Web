import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
})

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
      <body className={`${poppins.className} ${poppins.variable} overflow-x-hidden`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
