"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bitcoin, ArrowLeft, Check, AlertCircle, Info } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"
import { useToast } from "@/components/ui/use-toast"

export default function WithdrawPage() {
  const { toast } = useToast()
  const [selectedCurrency, setSelectedCurrency] = useState("BTC")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [balances] = useState({
    BTC: 0.15432,
    ETH: 2.5643,
    USDT: 1250.0,
  })

  const [fees] = useState({
    BTC: 0.0005,
    ETH: 0.005,
    USDT: 5,
  })

  const [minimumWithdrawals] = useState({
    BTC: 0.001,
    ETH: 0.01,
    USDT: 10,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!withdrawalAmount || !walletAddress) {
      toast({
        title: "Missing information",
        description: "Please enter withdrawal amount and wallet address.",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(withdrawalAmount)
    const minAmount = minimumWithdrawals[selectedCurrency as keyof typeof minimumWithdrawals]
    const balance = balances[selectedCurrency as keyof typeof balances]
    const fee = fees[selectedCurrency as keyof typeof fees]

    if (amount < minAmount) {
      toast({
        title: "Amount too small",
        description: `Minimum withdrawal amount is ${minAmount} ${selectedCurrency}.`,
        variant: "destructive",
      })
      return
    }

    if (amount + fee > balance) {
      toast({
        title: "Insufficient balance",
        description: `Your balance is not enough to cover the withdrawal amount plus fee.`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would send the withdrawal request to your API
      // const response = await fetch("/api/withdraw", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     amount,
      //     currency: selectedCurrency,
      //     address: walletAddress,
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Withdrawal requested!",
        description: "Your withdrawal request has been submitted for approval.",
      })
    } catch (error) {
      console.error("Error submitting withdrawal:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your withdrawal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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
            <h1 className="text-xl font-bold">Withdraw Funds</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {isSubmitted ? (
            <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-600/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-white text-2xl">Withdrawal Request Submitted</CardTitle>
                <CardDescription className="text-gray-400">
                  Your withdrawal request has been submitted and is pending approval.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-medium">
                      {withdrawalAmount} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee:</span>
                    <span className="text-white">
                      {fees[selectedCurrency as keyof typeof fees]} {selectedCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Receiving Address:</span>
                    <span className="text-white break-all">{walletAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-yellow-500 font-medium">Pending Approval</span>
                  </div>
                </div>

                <Alert className="bg-blue-900/20 border-blue-800 text-blue-100">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription>
                    Withdrawals are typically processed within 24 hours. You will receive an email notification once
                    your withdrawal is processed.
                  </AlertDescription>
                </Alert>

                <div className="flex space-x-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <Link href="/dashboard">Return to Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600" asChild>
                    <Link href="/dashboard/withdraw">Make Another Withdrawal</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Withdraw Cryptocurrency</CardTitle>
                  <CardDescription className="text-gray-400">
                    Select a cryptocurrency and enter your withdrawal details
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
                              {currency === "BTC" ? "Bitcoin" : currency === "ETH" ? "Ethereum" : "Tether"} Withdrawal
                            </h3>
                          </div>

                          <div className="bg-gray-700/50 rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <span className="text-gray-400 text-sm">Available Balance</span>
                              <div className="text-white font-medium">
                                {balances[currency as keyof typeof balances]} {currency}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() =>
                                setWithdrawalAmount(balances[currency as keyof typeof balances].toString())
                              }
                            >
                              Max
                            </Button>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount" className="text-white">
                                Withdrawal Amount
                              </Label>
                              <Input
                                id="amount"
                                type="number"
                                step="0.00000001"
                                placeholder={`Enter ${currency} amount`}
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white"
                                required
                              />
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">
                                  Min: {minimumWithdrawals[currency as keyof typeof minimumWithdrawals]} {currency}
                                </span>
                                <span className="text-gray-400">
                                  Fee: {fees[currency as keyof typeof fees]} {currency}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="address" className="text-white">
                                {currency} Wallet Address
                              </Label>
                              <Input
                                id="address"
                                placeholder={`Enter your ${currency} wallet address`}
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white"
                                required
                              />
                            </div>

                            <Alert className="bg-yellow-900/20 border-yellow-800 text-yellow-100">
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                              <AlertDescription>
                                Please double-check your wallet address. Incorrect addresses may result in permanent
                                loss of funds.
                              </AlertDescription>
                            </Alert>

                            <Button
                              type="submit"
                              className="w-full bg-red-600 hover:bg-red-700"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Request Withdrawal"}
                            </Button>
                          </form>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-medium text-white">Withdrawal Information</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p>
                      Withdrawals are processed manually within 24 hours. Large withdrawals may require additional
                      verification.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p>
                      Withdrawal fees are deducted from the withdrawal amount. Please ensure your balance is sufficient
                      to cover both the withdrawal amount and the fee.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p>For security reasons, withdrawals to new addresses may be subject to additional verification.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
