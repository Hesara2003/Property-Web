"use client"

import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollProgressBar } from "@/components/scroll-progress"

export function SharedHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto lg:px-24 px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Building2 className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-light tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Property Scout
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wider">
            <Link
              href="/about"
              className={`transition-all duration-500 hover:scale-105 font-medium ${pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-all duration-500 hover:scale-105 font-medium ${pathname === "/contact" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Contact
            </Link>
            <Link
              href="/help"
              className={`transition-all duration-500 hover:scale-105 font-medium ${pathname === "/help" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Help
            </Link>
            <Link
              href="/privacy"
              className={`transition-all duration-500 hover:scale-105 font-medium ${pathname === "/privacy" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className={`transition-all duration-500 hover:scale-105 font-medium ${pathname === "/terms" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              Terms
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hover:bg-primary/40 hover:text-black text-sm font-medium" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              className="gradient-primary hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-primary/30 text-sm font-medium px-6"
              asChild
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Progress bar only on home page */}
      {isHomePage && (
        <div className="absolute left-0 right-0 bottom-0 h-1 overflow-hidden">
          <ScrollProgressBar />
        </div>
      )}
    </header>
  )
}