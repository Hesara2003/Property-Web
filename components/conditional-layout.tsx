"use client"

import { usePathname } from "next/navigation"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Define routes where header and footer should be hidden
  const hideHeaderFooterRoutes = [
    '/auth',
    '/listing',
    '/request',
    '/admin',
    '/user',
    '/profile'
  ]
  
  // Check if current pathname starts with any of the specified routes
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  return (
    <>
      {!shouldHideHeaderFooter && <SharedHeader />}
      {children}
      {!shouldHideHeaderFooter && <SharedFooter />}
    </>
  )
}