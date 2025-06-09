"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugAdminPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-admin")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@teslainvest.com",
          password: "admin123",
        }),
      })

      const data = await response.json()
      setResults({
        loginTest: {
          status: response.status,
          success: response.ok,
          data: data,
        },
      })
    } catch (error) {
      setResults({ loginError: error.message })
    } finally {
      setLoading(false)
    }
  }

  const resetAdmin = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/reset-admin", {
        method: "POST",
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login Debug Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={checkDatabase} disabled={loading}>
                {loading ? "Checking..." : "Check Database"}
              </Button>
              <Button onClick={testLogin} disabled={loading} variant="outline">
                {loading ? "Testing..." : "Test Login"}
              </Button>
              <Button onClick={resetAdmin} disabled={loading} variant="destructive">
                {loading ? "Resetting..." : "Reset Admin User"}
              </Button>
            </div>

            {results && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Results:</h3>
                <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
