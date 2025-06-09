"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LanguageSelector from "@/components/language-selector"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Login successful, user data:", data.user)

        // Check if user is admin
        const isAdmin = data.user.role === "super_admin" || data.user.email === "admin@teslainvest.com"

        // Get redirect parameter from URL
        const urlParams = new URLSearchParams(window.location.search)
        const redirect = urlParams.get("redirect")

        console.log("Is admin:", isAdmin)
        console.log("Redirect param:", redirect)

        // Determine where to redirect
        let redirectUrl = "/dashboard" // default

        if (isAdmin && redirect === "/admin") {
          redirectUrl = "/admin"
        } else if (isAdmin) {
          redirectUrl = "/admin"
        }

        console.log("Redirecting to:", redirectUrl)

        // Show success message
        alert("Login successful! Redirecting...")

        // Use router.push for client-side navigation
        router.push(redirectUrl)
      } else {
        alert(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Zap className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-white">Tesla Invest</span>
          </Link>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-4">
          <LanguageSelector />
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your Tesla Invest account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-red-400 hover:text-red-300">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {typeof window !== "undefined" &&
              new URLSearchParams(window.location.search).get("error") === "unauthorized" && (
                <div className="mt-4 p-3 bg-red-600/20 border border-red-600 rounded-md">
                  <p className="text-red-400 text-sm">You need admin privileges to access that page.</p>
                </div>
              )}

            {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("redirect") && (
              <div className="mt-4 p-3 bg-blue-600/20 border border-blue-600 rounded-md">
                <p className="text-blue-400 text-sm">Please log in to access the admin panel.</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {"Don't have an account? "}
                <Link href="/signup" className="text-red-400 hover:text-red-300">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Quick Admin Login for Testing */}
            <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <p className="text-xs text-gray-400 mb-2">Quick Admin Login:</p>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: "admin@teslainvest.com",
                    password: "admin123",
                    rememberMe: false,
                  })
                }}
                className="text-xs text-blue-400 hover:text-blue-300"
                disabled={isLoading}
              >
                Fill Admin Credentials
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  disabled={isLoading}
                >
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
