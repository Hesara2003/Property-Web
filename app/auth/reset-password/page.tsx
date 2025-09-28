"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsEmailSent(true)
    setIsLoading(false)
  }

  if (isEmailSent) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              Email sent successfully! If you don't see the email in your inbox, please check your spam folder.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEmailSent(false)}
            >
              Resend Email
            </Button>
            
            <Link href="/auth/signin" className="block">
              <Button variant="link" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your email address and we'll send you a password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetEmail">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="resetEmail" 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="pl-10" 
                  required 
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send a password reset link to this email address
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-primary hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/auth/signin" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </>
  )
}