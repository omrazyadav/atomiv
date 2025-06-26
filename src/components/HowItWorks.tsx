'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Settings, Rocket, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { CheckCircle, Users, Zap, Clock, Star } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      step: "1",
      title: "Quick Setup Call",
      description: "We learn about your business, services, and how you want your AI to handle calls. Takes just 30 minutes.",
      details: ["Business information", "Service details", "Pricing & policies", "Call handling preferences"]
    },
    {
      icon: Settings,
      step: "2", 
      title: "AI Training & Customization",
      description: "Our team trains your AI receptionist with your specific business knowledge and integrates with your systems.",
      details: ["Custom voice training", "Calendar integration", "Business script creation", "Quality testing"]
    },
    {
      icon: Rocket,
      step: "3",
      title: "Go Live in 24 Hours",
      description: "Your AI receptionist starts handling calls immediately. Monitor performance and make adjustments as needed.",
      details: ["Phone number setup", "Live call testing", "Analytics dashboard", "Ongoing support"]
    }
  ]

  return (
    <section id="how-it-works" className="relative py-12 md:py-24 bg-black border-t border-white/10">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-4 md:mb-6">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
            <span className="text-xs md:text-sm text-blue-300 font-medium">Lightning Fast Setup</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            From Setup to Success in
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> 24 Hours</span>
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process gets your AI voice agent up and running in less than a day, 
            with full training and support every step of the way.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/10 rounded-2xl p-4 md:p-6 border border-blue-500/30 mb-3 md:mb-6 group-hover:from-blue-600/30 group-hover:to-blue-500/20 transition-all duration-300 hover:scale-105">
                <div className="bg-blue-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Business Analysis</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  We learn your business, services, pricing, and common customer questions to create your custom AI personality.
                </p>
              </div>
              <div className="text-xs md:text-sm text-blue-400 font-medium">Hour 1-8</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/10 rounded-2xl p-4 md:p-6 border border-purple-500/30 mb-3 md:mb-6 group-hover:from-purple-600/30 group-hover:to-purple-500/20 transition-all duration-300 hover:scale-105">
                <div className="bg-purple-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl font-bold text-purple-400">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">AI Training & Testing</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  Your AI agent is trained, tested with real scenarios, and integrated with your calendar and phone systems.
                </p>
              </div>
              <div className="text-xs md:text-sm text-purple-400 font-medium">Hour 8-20</div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-r from-green-600/20 to-green-500/10 rounded-2xl p-4 md:p-6 border border-green-500/30 mb-3 md:mb-6 group-hover:from-green-600/30 group-hover:to-green-500/20 transition-all duration-300 hover:scale-105">
                <div className="bg-green-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl font-bold text-green-400">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Go Live & Support</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  Your AI goes live and starts handling calls immediately. We monitor and optimize performance continuously.
                </p>
              </div>
              <div className="text-xs md:text-sm text-green-400 font-medium">Hour 20-24</div>
            </div>
          </div>

          {/* Results Preview - Hidden on mobile for better space utilization */}
          <div className="hidden md:block bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                What You Get From Hour One
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your AI voice agent starts working immediately, giving you these instant benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center group cursor-pointer hover:scale-105 transition-all duration-300">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">24/7 Availability</h4>
                <p className="text-gray-400 text-sm">Never miss another call, even when you're closed</p>
              </div>
              
              <div className="text-center group cursor-pointer hover:scale-105 transition-all duration-300">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Instant Booking</h4>
                <p className="text-gray-400 text-sm">Customers can book appointments immediately</p>
              </div>
              
              <div className="text-center group cursor-pointer hover:scale-105 transition-all duration-300">
                <Star className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Professional Service</h4>
                <p className="text-gray-400 text-sm">Consistent, friendly customer experience</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">
              Ready to Transform Your Business?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <Button 
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Link href="/demo">
                  Get Free Demo Now
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <Link href="#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
              ⚡ Setup takes just <span className="text-blue-400 font-semibold">24 hours</span> • No contracts • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 