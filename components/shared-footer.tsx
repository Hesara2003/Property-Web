import { Building2 } from "lucide-react"
import Link from "next/link"

export function SharedFooter() {
  return (
    <footer className="pt-12 pb-4 border-t border-border/50 glass-card">
      <div className="container mx-auto px-4 lg:px-24">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-light tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Property Scout
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Connecting buyers and sellers through intelligent property matching and architectural excellence.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <Link href="/" className="hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </div>
              <div>
                <Link href="/about" className="hover:text-primary transition-colors duration-300">
                  About
                </Link>
              </div>
              <div>
                <Link href="/contact" className="hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Services</h4>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <Link href="/user" className="hover:text-primary transition-colors duration-300">
                  Dashboard
                </Link>
              </div>
              <div>
                <Link href="/matches" className="hover:text-primary transition-colors duration-300">
                  Find Matches
                </Link>
              </div>
              <div>
                <Link href="/listing" className="hover:text-primary transition-colors duration-300">
                  Browse Listings
                </Link>
              </div>
              <div>
                <Link href="/request" className="hover:text-primary transition-colors duration-300">
                  Request Property
                </Link>
              </div>
              <div>
                <Link href="/pricing" className="hover:text-primary transition-colors duration-300">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Support</h4>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <Link href="/help" className="hover:text-primary transition-colors duration-300">
                  Help Center
                </Link>
              </div>
              <div>
                <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link href="/terms" className="hover:text-primary transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 mt-12 pt-4 text-center text-muted-foreground">
          <p>&copy; 2025 Property Scout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}