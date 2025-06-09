"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Users,
  Bell,
  Settings,
  LogOut,
  Copy,
  MessageCircle,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardPage() {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    wallet_balance: 0,
    totalInvested: 0,
    totalEarnings: 0,
    activeInvestments: 0,
    referralCode: "TESLA123",
  })

  const [investments, setInvestments] = useState([])
  const [transactions, setTransactions] = useState([])
  const { logout } = useAuth()

  useEffect(() => {
    // Fetch user data and transactions
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const userResponse = await fetch("/api/auth/me")
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser((prev) => ({ ...prev, ...userData.user }))
      }

      // Fetch user investments
      const investmentsResponse = await fetch("/api/user/investments")
      if (investmentsResponse.ok) {
        const investmentsData = await investmentsResponse.json()
        setInvestments(investmentsData.investments || [])
      }

      // Fetch user transactions
      const transactionsResponse = await fetch("/api/user/transactions")
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData.transactions || [])
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode)
    alert("Referral code copied to clipboard!")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-white">Tesla Invest</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-300 hover:text-white">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user.name}!</h1>
            <p className="text-gray-400">Here's your investment overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">${user.wallet_balance.toFixed(2)}</div>
                <p className="text-xs text-gray-400 mt-1">Available for investment</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Invested</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${user.totalInvested.toFixed(2)}</div>
                <p className="text-xs text-gray-400 mt-1">Across {user.activeInvestments} active plans</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">${user.totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-gray-400 mt-1">Lifetime earnings</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Referrals</CardTitle>
                <Users className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-400 mr-2">Code: {user.referralCode}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyReferralCode}
                    className="h-4 w-4 p-0 text-gray-400 hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="investments" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger
                value="investments"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                Investments
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="wallet"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
              >
                Wallet
              </TabsTrigger>
            </TabsList>

            <TabsContent value="investments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Active Investments</h2>
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">New Investment</Button>
                </Link>
              </div>

              <div className="grid gap-6">
                {investments.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No Investments Yet</h3>
                        <p className="text-gray-400">Start your investment journey by choosing a plan</p>
                      </div>
                      <Link href="/">
                        <Button className="bg-red-600 hover:bg-red-700 text-white">Choose Investment Plan</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  investments.map((investment) => (
                    <Card key={investment.id} className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white">{investment.plan}</CardTitle>
                            <CardDescription className="text-gray-400">
                              ${investment.amount} {investment.currency} • ${investment.dailyReturn}/day
                            </CardDescription>
                          </div>
                          <Badge
                            variant={investment.status === "active" ? "default" : "secondary"}
                            className={
                              investment.status === "active" ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                            }
                          >
                            {investment.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Start Date</p>
                            <p className="text-white">{investment.startDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">End Date</p>
                            <p className="text-white">{investment.endDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Earned</p>
                            <p className="text-green-400">
                              +${investment.earned} {investment.currency}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Progress</p>
                            <p className="text-white">{investment.progress}%</p>
                          </div>
                        </div>
                        <Progress value={investment.progress} className="h-2" />
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Transaction History</h2>

              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <ArrowUpRight className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No Transactions Yet</h3>
                        <p className="text-gray-400">Your transaction history will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  transactions.map((transaction) => (
                    <Card key={transaction.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "deposit"
                                ? "bg-green-600"
                                : transaction.type === "withdrawal"
                                  ? "bg-red-600"
                                  : "bg-blue-600"
                            }`}
                          >
                            {transaction.type === "deposit" ? (
                              <ArrowDownLeft className="h-4 w-4 text-white" />
                            ) : transaction.type === "withdrawal" ? (
                              <ArrowUpRight className="h-4 w-4 text-white" />
                            ) : (
                              <DollarSign className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium capitalize">{transaction.type}</p>
                            <p className="text-gray-400 text-sm">{transaction.date}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.type === "deposit" || transaction.type === "earning"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {transaction.type === "withdrawal" ? "-" : "+"}${transaction.amount} {transaction.currency}
                          </p>
                          <Badge
                            variant={transaction.status === "completed" ? "default" : "secondary"}
                            className={
                              transaction.status === "completed"
                                ? "bg-green-600 text-white"
                                : "bg-yellow-600 text-white"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Wallet</h2>
                <div className="flex space-x-2">
                  <Link href="/dashboard/deposit">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Deposit
                    </Button>
                  </Link>
                  <Link href="/dashboard/withdraw">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Withdraw
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-6 w-6 text-green-500" />
                      <CardTitle className="text-white">USD Balance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400 mb-2">${user.wallet_balance.toFixed(2)}</div>
                    <p className="text-gray-400">Available for investment</p>
                    <div className="mt-4 flex space-x-2">
                      <Link href="/dashboard/deposit" className="flex-1">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          <ArrowDownLeft className="mr-2 h-4 w-4" />
                          Deposit Funds
                        </Button>
                      </Link>
                      <Link href="/dashboard/withdraw" className="flex-1">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Withdraw Funds
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
                <CardDescription className="text-gray-400">Contact our 24/7 support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://wa.me/1234567890?text=Hello%2C%20I%20need%20help%20with%20my%20Tesla%20Invest%20account"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Support
                  </Button>
                </a>
                <a href="https://t.me/teslainvestchannel" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Join Telegram
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Refer Friends</CardTitle>
                <CardDescription className="text-gray-400">Earn 5% commission on referrals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={user.referralCode}
                    readOnly
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyReferralCode}
                    className="border-gray-600 text-gray-300 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Security</CardTitle>
                <CardDescription className="text-gray-400">Enable 2FA for extra security</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Setup 2FA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
