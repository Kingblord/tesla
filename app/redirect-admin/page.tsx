"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectAdmin() {
  const router = useRouter()

  useEffect(() => {
    // Wait a moment then redirect to admin
    const timer = setTimeout(() => {
      router.push("/admin")
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to Admin Panel...</p>
        <p className="text-gray-400 text-sm mt-2">
          If you're not redirected,{" "}
          <a href="/admin" className="text-red-400 hover:text-red-300">
            click here
          </a>
        </p>
      </div>
    </div>
  )
}
