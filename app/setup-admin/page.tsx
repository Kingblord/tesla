"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function SetupAdminPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/setup-admin?action=check")
      const data = await response.json()
      setResults({ type: "check", data })
    } catch (error) {
      setResults({ type: "error", data: { error: error.message } })
    } finally {
      setLoading(false)
    }
  }

  const createAdmin = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/setup-admin", {
        method: "POST",
      })
      const data = await response.json()
      setResults({ type: "create", data })
    } catch (error) {
      setResults({ type: "error", data: { error: error.message } })
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
        type: "login",
        data: {
          status: response.status,
          success: response.ok,
          response: data,
        },
      })
    } catch (error) {
      setResults({ type: "error", data: { error: error.message } })
    } finally {
      setLoading(false)
    }
  }

  const resetAndCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/setup-admin?action=reset", {
        method: "POST",
      })
      const data = await response.json()
      setResults({ type: "reset", data })
    } catch (error) {
      setResults({ type: "error", data: { error: error.message } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Tesla Invest Admin Setup & Debug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={checkDatabase}
                disabled={loading}
                variant="outline"
                className="border-gray-600 text-white"
              >
                {loading ? "Checking..." : "1. Check Database"}
              </Button>
              <Button onClick={createAdmin} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Creating..." : "2. Create Admin"}
              </Button>
              <Button onClick={testLogin} disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? "Testing..." : "3. Test Login"}
              </Button>
              <Button onClick={resetAndCreate} disabled={loading} variant="destructive">
                {loading ? "Resetting..." : "4. Reset & Create"}
              </Button>
            </div>

            {/* Instructions */}
            <Alert className="bg-gray-700 border-gray-600">
              <AlertCircle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-gray-300">
                <strong>Instructions:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>First click "Check Database" to see current status</li>
                  <li>Click "Create Admin" to create the admin user</li>
                  <li>Click "Test Login" to verify login works</li>
                  <li>If issues persist, click "Reset & Create" for a fresh start</li>
                </ol>
              </AlertDescription>
            </Alert>

            {/* Results Display */}
            {results && (
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {results.data?.success || results.data?.adminUserExists ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    Results ({results.type})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-800 p-4 rounded text-sm text-gray-300 overflow-auto max-h-96 whitespace-pre-wrap">
                    {JSON.stringify(results.data, null, 2)}
                  </pre>

                  {/* Show credentials if successful */}
                  {results.data?.success && (
                    <Alert className="mt-4 bg-green-900 border-green-600">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-100">
                        <strong>Admin Login Credentials:</strong>
                        <br />
                        Email: admin@teslainvest.com
                        <br />
                        Password: admin123
                        <br />
                        <br />
                        <a
                          href="/login"
                          className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Go to Login Page
                        </a>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
