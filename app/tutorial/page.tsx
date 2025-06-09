"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import LanguageSelector from "@/components/language-selector"

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  views: string
  category: string
  videoUrl: string
  topics: string[]
}

const tutorials: Tutorial[] = [
  {
    id: "getting-started",
    title: "Getting Started with Tesla Invest",
    description: "Learn the basics of our platform and how to create your first investment",
    duration: "8:45",
    views: "12.5K",
    category: "Beginner",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topics: ["Account Setup", "Platform Overview", "First Steps"],
  },
  {
    id: "investment-strategies",
    title: "Investment Strategies & Plans",
    description: "Understand different investment plans and choose the right strategy for you",
    duration: "12:30",
    views: "8.9K",
    category: "Intermediate",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topics: ["Tesla Starter", "Tesla Pro", "Tesla Elite", "Risk Management"],
  },
  {
    id: "deposits-withdrawals",
    title: "Deposits & Withdrawals Guide",
    description: "Complete guide on how to deposit and withdraw funds safely",
    duration: "10:15",
    views: "15.2K",
    category: "Essential",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topics: ["Crypto Deposits", "Withdrawal Process", "Security Tips"],
  },
  {
    id: "daily-returns",
    title: "Understanding Daily Returns",
    description: "How our daily return system works and when you can expect payments",
    duration: "6:20",
    views: "9.7K",
    category: "Beginner",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topics: ["Return Calculation", "Payment Schedule", "Compounding"],
  },
  {
    id: "referral-program",
    title: "Referral Program Explained",
    description: "Maximize your earnings through our referral program",
    duration: "7:55",
    views: "6.3K",
    category: "Advanced",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topics: ["Referral Bonuses", "Commission Structure", "Team Building"],
  },
  {
    id: "security-best-practices",
    title: "Security Best Practices",
    description: "Keep your account and investments secure with these essential tips",
    duration: "9:40",
    views: "11.1K",
    category: "Essential",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    topics: ["2FA Setup", "Password Security", "Phishing Protection"],
  },
]

export default function TutorialPage() {
  const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", "Beginner", "Intermediate", "Advanced", "Essential"]

  const filteredTutorials =
    selectedCategory === "All" ? tutorials : tutorials.filter((tutorial) => tutorial.category === selectedCategory)

  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop()
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-red-500" />
                <span className="text-xl font-bold text-white">Tesla Invest</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-white font-medium">Video Tutorials</span>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tesla Invest Tutorials</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the Tesla Invest platform with our comprehensive video tutorials. Learn everything from basic setup
            to advanced investment strategies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-red-600 hover:bg-red-700"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tutorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={`
                      ${tutorial.category === "Beginner" ? "bg-green-600" : ""}
                      ${tutorial.category === "Intermediate" ? "bg-yellow-600" : ""}
                      ${tutorial.category === "Advanced" ? "bg-red-600" : ""}
                      ${tutorial.category === "Essential" ? "bg-blue-600" : ""}
                    `}
                  >
                    {tutorial.category}
                  </Badge>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </div>
                </div>
                <CardTitle className="text-white text-lg">{tutorial.title}</CardTitle>
                <CardDescription className="text-gray-400">{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {tutorial.views} views
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tutorial.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <Button onClick={() => setSelectedVideo(tutorial)} className="w-full bg-red-600 hover:bg-red-700">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">{selectedVideo.title}</h3>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-3">{selectedVideo.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
