'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, PlayCircle, CheckCircle } from 'lucide-react'

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-32 pb-16 sm:pt-28 sm:pb-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <Badge className="bg-black text-white px-4 py-2 text-sm">
                🤖 AI-Powered Phone Assistant
              </Badge>
              
              <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Never Miss a 
                <span className="text-gray-600"> Customer</span> Again
              </h1>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-600 leading-relaxed">
                Your AI receptionist answers every call, books appointments, and converts 
                prospects into customers while you focus on running your business.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">Instant Setup</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">Custom Training</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">More Bookings</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Custom Quote
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold transition-all"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                See Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Trusted by growing businesses:</p>
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <span className="font-medium">Local Salons</span>
                <span className="font-medium">Medical Clinics</span>
                <span className="font-medium">Service Businesses</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Modern Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Modern Phone Interface */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-900">AI Assistant Active</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Live</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-700">"Hi, I'd like to book an appointment for tomorrow."</p>
                  </div>
                  <div className="bg-black rounded-2xl p-4 text-white ml-4">
                    <p className="text-sm">"Perfect! I can help you with that. What time works best for you?"</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-700">"Around 2 PM if possible."</p>
                  </div>
                  <div className="bg-black rounded-2xl p-4 text-white ml-4">
                    <p className="text-sm">"Great! I have 2:15 PM available. I'll book that for you now."</p>
                  </div>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">47</div>
                    <div className="text-xs text-gray-500">Calls Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-500">Answered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">32</div>
                    <div className="text-xs text-gray-500">Bookings</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
      )
} 