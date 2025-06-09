"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Send, Clock, CheckCircle, AlertCircle, Mail, Zap, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "medium",
    message: "",
  })

  const [tickets] = useState([
    {
      id: "TI-001",
      subject: "Withdrawal Delay",
      status: "open",
      priority: "high",
      created: "2024-01-20",
      lastUpdate: "2024-01-20",
    },
    {
      id: "TI-002",
      subject: "Investment Question",
      status: "resolved",
      priority: "low",
      created: "2024-01-18",
      lastUpdate: "2024-01-19",
    },
  ])

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket submission
    console.log("Ticket submitted:", ticketForm)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">Tesla Invest</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get help with your Tesla Invest account. Our support team is available 24/7 to assist you.
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <CardTitle className="text-white">WhatsApp Support</CardTitle>
              <CardDescription className="text-gray-400">Get instant help via WhatsApp chat</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a
                href="https://wa.me/1234567890?text=Hello%2C%20I%20need%20help%20with%20my%20Tesla%20Invest%20account"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <p className="text-xs text-gray-500 mt-2">Usually responds within 5 minutes</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <CardTitle className="text-white">Telegram Channel</CardTitle>
              <CardDescription className="text-gray-400">Join our community and get updates</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="https://t.me/teslainvestchannel" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Join Telegram
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <p className="text-xs text-gray-500 mt-2">Get announcements and updates</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <CardTitle className="text-white">Email Support</CardTitle>
              <CardDescription className="text-gray-400">Send us a detailed message</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a href="mailto:support@teslainvest.com">
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Mail className="mr-2 h-4 w-4" />
                  support@teslainvest.com
                </Button>
              </a>
              <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Support Content */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="tickets" className="data-[state=active]:bg-red-600">
              Support Tickets
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-red-600">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-red-600">
              Contact Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create New Ticket */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Create Support Ticket</CardTitle>
                  <CardDescription className="text-gray-400">
                    Describe your issue and we'll get back to you soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-white">
                        Priority
                      </Label>
                      <select
                        id="priority"
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide detailed information about your issue..."
                        value={ticketForm.message}
                        onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Tickets */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Your Tickets</CardTitle>
                  <CardDescription className="text-gray-400">Track the status of your support requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(ticket.status)}
                          <span className="font-medium text-white">#{ticket.id}</span>
                        </div>
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </div>
                      <h4 className="text-white font-medium mb-2">{ticket.subject}</h4>
                      <div className="text-sm text-gray-400">
                        <p>Created: {ticket.created}</p>
                        <p>Last Update: {ticket.lastUpdate}</p>
                        <p className="capitalize">Status: {ticket.status}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-gray-400">Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-white font-semibold mb-2">How do I make a deposit?</h3>
                    <p className="text-gray-400">
                      You can deposit Bitcoin (BTC), Ethereum (ETH), or USDT to your wallet. Go to your dashboard,
                      select the wallet tab, and click on deposit to get your unique wallet address.
                    </p>
                  </div>

                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-white font-semibold mb-2">How long do withdrawals take?</h3>
                    <p className="text-gray-400">
                      Withdrawals are typically processed within 24-48 hours. During high volume periods, it may take up
                      to 72 hours. You'll receive an email notification once processed.
                    </p>
                  </div>

                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-white font-semibold mb-2">What are the minimum investment amounts?</h3>
                    <p className="text-gray-400">
                      Tesla Starter: 0.001 BTC minimum
                      <br />
                      Tesla Pro: 0.1 BTC minimum
                      <br />
                      Tesla Elite: 1 BTC minimum
                    </p>
                  </div>

                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-white font-semibold mb-2">How does the referral program work?</h3>
                    <p className="text-gray-400">
                      Share your unique referral code with friends. When they make their first investment, you'll earn
                      5% commission on their investment amount, credited to your account immediately.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2">Is my investment secure?</h3>
                    <p className="text-gray-400">
                      Yes, we use bank-level security with 2FA authentication, encrypted data storage, and cold wallet
                      storage for cryptocurrency funds. Your investments are protected by multiple security layers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                  <CardDescription className="text-gray-400">Multiple ways to reach our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <p className="text-gray-400">+1 (234) 567-8900</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Telegram</p>
                      <p className="text-gray-400">@teslainvestchannel</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400">support@teslainvest.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-white font-medium">Support Hours</p>
                      <p className="text-gray-400">24/7 Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Response Times</CardTitle>
                  <CardDescription className="text-gray-400">Expected response times by channel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">WhatsApp</span>
                    <Badge className="bg-green-600">5 minutes</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Telegram</span>
                    <Badge className="bg-blue-600">15 minutes</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Support Ticket</span>
                    <Badge className="bg-yellow-600">2-4 hours</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Email</span>
                    <Badge className="bg-gray-600">24 hours</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
