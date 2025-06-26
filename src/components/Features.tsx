'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { 
  Bot, Phone, Calendar, MessageSquare, 
  BarChart3, Shield, Zap, Users, CheckCircle, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  {
    icon: Phone,
    title: 'Smart Call Handling',
    description: 'Answers calls naturally with human-like conversations and professional responses.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: Calendar,
    title: 'Appointment Booking',
    description: 'Books appointments directly into your calendar while talking to customers.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: MessageSquare,
    title: 'Lead Qualification',
    description: 'Identifies high-value prospects and collects important customer information.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: BarChart3,
    title: 'Call Analytics',
    description: 'Tracks call patterns, customer questions, and booking success rates.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  }
]

export function Features() {
  return (
    <section id="features" className="relative py-16 bg-black border-t border-white/10">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to
            <br />
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Handle Every Call
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced AI technology that handles calls professionally and captures every opportunity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className={`group relative p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${feature.bgColor} border ${feature.borderColor}`}
            >
              <div className={`inline-flex p-3 rounded-full ${feature.bgColor} ${feature.borderColor} border mb-4`}>
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              See It in Action
            </h3>
            <p className="text-gray-300 mb-6">
              Get a custom demo built specifically for your business and see how it handles real customer calls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
                  Get Free Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 