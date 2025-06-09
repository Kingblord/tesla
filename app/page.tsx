"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, TrendingUp, Clock, Users, Star, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import LanguageSelector from "@/components/language-selector"

// Define translations directly in the component to avoid context issues
const translations = {
  en: {
    "hero.title": "Invest in Tesla's Future",
    "hero.subtitle": "Join thousands of investors earning daily returns through our Tesla investment platform",
    "hero.cta": "Start Investing",
    "hero.watchTutorials": "Watch Tutorials",
    "plans.title": "Investment Plans",
    "plans.subtitle": "Choose the perfect plan for your investment goals",
    "plans.popular": "Popular",
    "plans.investment": "Investment",
    "plans.returns": "Returns",
    "plans.duration": "Duration",
    "plans.dailyProfit": "Daily Profit",
    "plans.totalProfit": "Total Profit",
    "plans.roi": "ROI",
    "plans.days": "days",
    "plans.getStarted": "Get Started",
    "features.title": "Why Choose Tesla Invest?",
    "features.security.title": "Bank-Level Security",
    "features.security.description": "Your investments are protected with military-grade encryption",
    "features.returns.title": "Daily Returns",
    "features.returns.description": "Earn consistent daily profits from your Tesla investments",
    "features.support.title": "24/7 Support",
    "features.support.description": "Our expert team is available around the clock",
    "features.transparent.title": "Transparent",
    "features.transparent.description": "No hidden fees or charges, everything is transparent",
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have questions? We're here to help",
    "contact.whatsapp": "WhatsApp",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
  },
  es: {
    "hero.title": "Invierte en el Futuro de Tesla",
    "hero.subtitle": "Únete a miles de inversores que ganan retornos diarios a través de nuestra plataforma Tesla",
    "hero.cta": "Comenzar a Invertir",
    "hero.watchTutorials": "Ver Tutoriales",
    "plans.title": "Planes de Inversión",
    "plans.subtitle": "Elige el plan perfecto para tus objetivos de inversión",
    "plans.popular": "Popular",
    "plans.investment": "Inversión",
    "plans.returns": "Retornos",
    "plans.duration": "Duración",
    "plans.dailyProfit": "Ganancia Diaria",
    "plans.totalProfit": "Ganancia Total",
    "plans.roi": "ROI",
    "plans.days": "días",
    "plans.getStarted": "Comenzar",
    "features.title": "¿Por Qué Elegir Tesla Invest?",
    "features.security.title": "Seguridad Bancaria",
    "features.security.description": "Tus inversiones están protegidas con encriptación de grado militar",
    "features.returns.title": "Retornos Diarios",
    "features.returns.description": "Gana ganancias diarias consistentes de tus inversiones Tesla",
    "features.support.title": "Soporte 24/7",
    "features.support.description": "Nuestro equipo experto está disponible las 24 horas",
    "features.transparent.title": "Transparente",
    "features.transparent.description": "Sin tarifas ocultas, todo es transparente",
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "¿Tienes preguntas? Estamos aquí para ayudar",
    "contact.whatsapp": "WhatsApp",
    "contact.telegram": "Telegram",
    "contact.email": "Correo",
  },
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    setMounted(true)
    // Get language from localStorage
    const savedLanguage = localStorage.getItem("language") || "en"
    setCurrentLanguage(savedLanguage)

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("language") || "en"
      setCurrentLanguage(newLanguage)
    }

    window.addEventListener("storage", handleLanguageChange)
    return () => window.removeEventListener("storage", handleLanguageChange)
  }, [])

  const t = (key: string): string => {
    if (!mounted) return key
    return translations[currentLanguage as keyof typeof translations]?.[key] || translations.en[key] || key
  }

  const investmentPlans = [
    {
      id: "starter",
      name: "Tesla Starter",
      description: "Perfect for beginners",
      investment: 100,
      returns: 500,
      duration: 5,
      dailyProfit: 80,
      totalProfit: 400,
      roi: 400,
      popular: false,
    },
    {
      id: "pro",
      name: "Tesla Pro",
      description: "For experienced investors",
      investment: 500,
      returns: 1000,
      duration: 5,
      dailyProfit: 100,
      totalProfit: 500,
      roi: 100,
      popular: true,
    },
    {
      id: "elite",
      name: "Tesla Elite",
      description: "Premium investment plan",
      investment: 2000,
      returns: 5000,
      duration: 5,
      dailyProfit: 600,
      totalProfit: 3000,
      roi: 150,
      popular: false,
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-red-500" />
                <span className="text-xl font-bold text-white">Tesla Invest</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="#plans" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Plans
                </Link>
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
                <Link
                  href="/tutorial"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tutorials
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-red-600 hover:bg-red-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t("hero.title")}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Play className="mr-2 h-5 w-5" />
                {t("hero.watchTutorials")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section id="plans" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("plans.title")}</h2>
            <p className="text-xl text-gray-300">{t("plans.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {investmentPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-gray-800 border-gray-700 relative ${plan.popular ? "ring-2 ring-red-500" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600">
                    {t("plans.popular")}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">${plan.investment}</div>
                    <div className="text-sm text-gray-400">{t("plans.investment")}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t("plans.returns")}:</span>
                      <span className="text-green-400 font-semibold">${plan.returns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t("plans.duration")}:</span>
                      <span className="text-white">
                        {plan.duration} {t("plans.days")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t("plans.dailyProfit")}:</span>
                      <span className="text-green-400 font-semibold">${plan.dailyProfit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t("plans.totalProfit")}:</span>
                      <span className="text-green-400 font-semibold">${plan.totalProfit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t("plans.roi")}:</span>
                      <span className="text-yellow-400 font-semibold">{plan.roi}%</span>
                    </div>
                  </div>

                  <Link href="/signup" className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700">{t("plans.getStarted")}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("features.title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t("features.security.title")}</h3>
              <p className="text-gray-400">{t("features.security.description")}</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t("features.returns.title")}</h3>
              <p className="text-gray-400">{t("features.returns.description")}</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t("features.support.title")}</h3>
              <p className="text-gray-400">{t("features.support.description")}</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t("features.transparent.title")}</h3>
              <p className="text-gray-400">{t("features.transparent.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("contact.title")}</h2>
          <p className="text-xl text-gray-300 mb-12">{t("contact.subtitle")}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("contact.whatsapp")}</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("contact.telegram")}</h3>
                <p className="text-gray-400">@teslainvest</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{t("contact.email")}</h3>
                <p className="text-gray-400">support@teslainvest.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-red-500" />
                <span className="text-lg font-bold text-white">Tesla Invest</span>
              </div>
              <p className="text-gray-400">
                Invest in Tesla's future with our secure cryptocurrency investment platform.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Tesla Invest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
