"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to sign in page by default
    router.replace("/auth/signin")
  }, [router])

  return null
}
