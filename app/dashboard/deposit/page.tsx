"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bitcoin, Copy, ArrowLeft, Upload, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"
import { useToast } from "@/components/ui/use-toast"

export default function DepositPage() {
  const { toast } = useToast()
  const [selectedCurrency, setSelectedCurrency] = useState("BTC")
  const [depositAmount, setDepositAmount] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [walletAddresses] = useState({
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    USDT: "TJYeasTPa6gpEEiNGJgLFzKMhTmMHXmCpk",
  })

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddresses[selectedCurrency as keyof typeof walletAddresses])
    toast({
      title: "Address copied!",
      description: "Wallet address has been copied to clipboard.",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!depositAmount || !file) {
      toast({
        title: "Missing information",
        description: "Please enter deposit amount and upload proof of payment.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("screenshot", file)
      formData.append("amount", depositAmount)
      formData.append("currency", selectedCurrency)

      // In a real app, you would upload the file and create a deposit request
      // const response = await fetch("/api/deposit", {
      //   method: "POST",
      //   body: formData,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Deposit submitted!",
        description: "Your deposit request has been submitted for review.",
      })
    } catch (error) {
      console.error("Error submitting deposit:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your deposit. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case "BTC":
        return <Bitcoin className="h-6 w-6 text-orange-500" />
      case "ETH":
        return <div className="w-6 h-6 bg-blue-500 rounded-full" />
      case "USDT":
        return <div className="w-6 h-6 bg-green-500 rounded-full" />
      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold">Deposit Funds</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {isSubmitted ? (
            <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-600/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-white text-2xl">Deposit Request Submitted</CardTitle>
                <CardDescription className="text-gray-400">
                  Your deposit request has been submitted and is pending approval.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-medium">
                      {depositAmount} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-yellow-500 font-medium">Pending Approval</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Submitted:</span>
                    <span className="text-white">{new Date().toLocaleString()}</span>
                  </div>
                </div>

                <Alert className="bg-blue-900/20 border-blue-800 text-blue-100">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription>
                    Our team will verify your deposit and credit your account within 1-2 hours.
                  </AlertDescription>
                </Alert>

                <div className="flex space-x-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <Link href="/dashboard">Return to Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600" asChild>
                    <Link href="/dashboard/deposit">Make Another Deposit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Deposit Cryptocurrency</CardTitle>
                  <CardDescription className="text-gray-400">
                    Select a cryptocurrency and follow the instructions to make a deposit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="BTC" onValueChange={setSelectedCurrency} className="space-y-6">
                    <TabsList className="bg-gray-700 border-gray-600">
                      <TabsTrigger value="BTC" className="data-[state=active]:bg-orange-600">
                        Bitcoin (BTC)
                      </TabsTrigger>
                      <TabsTrigger value="ETH" className="data-[state=active]:bg-blue-600">
                        Ethereum (ETH)
                      </TabsTrigger>
                      <TabsTrigger value="USDT" className="data-[state=active]:bg-green-600">
                        Tether (USDT)
                      </TabsTrigger>
                    </TabsList>

                    {["BTC", "ETH", "USDT"].map((currency) => (
                      <TabsContent key={currency} value={currency} className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            {getCurrencyIcon(currency)}
                            <h3 className="text-lg font-medium text-white">
                              {currency === "BTC" ? "Bitcoin" : currency === "ETH" ? "Ethereum" : "Tether"} Deposit
                            </h3>
                          </div>

                          <Alert className="bg-yellow-900/20 border-yellow-800 text-yellow-100">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            <AlertDescription>
                              Please only send {currency} to this address. Sending any other cryptocurrency may result
                              in permanent loss.
                            </AlertDescription>
                          </Alert>

                          <div className="space-y-2">
                            <Label htmlFor={`${currency}-address`} className="text-white">
                              {currency} Deposit Address
                            </Label>
                            <div className="flex">
                              <Input
                                id={`${currency}-address`}
                                value={walletAddresses[currency as keyof typeof walletAddresses]}
                                readOnly
                                className="bg-gray-700 border-gray-600 text-white rounded-r-none"
                              />
                              <Button
                                onClick={handleCopyAddress}
                                className="bg-red-600 hover:bg-red-700 rounded-l-none"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </Button>
                            </div>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount" className="text-white">
                                Deposit Amount
                              </Label>
                              <Input
                                id="amount"
                                type="number"
                                step="0.00000001"
                                placeholder={`Enter ${currency} amount`}
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="screenshot" className="text-white">
                                Upload Proof of Payment
                              </Label>
                              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                                <Input
                                  id="screenshot"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                                <Label
                                  htmlFor="screenshot"
                                  className="flex flex-col items-center cursor-pointer space-y-2"
                                >
                                  <Upload className="h-8 w-8 text-gray-400" />
                                  <span className="text-gray-400">
                                    {file ? file.name : "Click to upload screenshot"}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Supported formats: JPG, PNG, PDF (Max 5MB)
                                  </span>
                                </Label>
                              </div>
                            </div>

                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isUploading}>
                              {isUploading ? "Submitting..." : "Submit Deposit"}
                            </Button>
                          </form>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-medium text-white">Deposit Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Copy the deposit address for your selected cryptocurrency.</li>
                  <li>Send your funds to this address from your external wallet or exchange.</li>
                  <li>Enter the exact amount you sent and upload a screenshot of the transaction.</li>
                  <li>Submit your deposit request for verification.</li>
                  <li>Once verified by our team, the funds will be credited to your account.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
