'use client'

import { 
  Phone, MessageSquare, Calendar, Clock, 
  Users, TrendingUp, Shield, Zap,
  CheckCircle, ArrowRight, Bot, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  {
    icon: Phone,
    title: "Smart Call Handling",
    description: "AI answers every call with natural conversation, qualifying leads and booking appointments automatically.",
    benefits: ["Never miss a call", "Instant responses", "Professional voice"],
    color: "blue"
  },
  {
    icon: Calendar,
    title: "Automated Booking",
    description: "Seamlessly schedule appointments, check availability, and sync with your existing calendar systems.",
    benefits: ["Real-time calendar sync", "Appointment reminders", "Rescheduling support"],
    color: "purple"
  },
  {
    icon: MessageSquare,
    title: "Lead Qualification",
    description: "Intelligent conversation flows that capture lead information and qualify prospects before they hang up.",
    benefits: ["Capture contact details", "Qualify prospects", "Route to right team"],
    color: "green"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Detailed insights into call patterns, conversion rates, and customer interactions to optimize your business.",
    benefits: ["Call analytics", "Conversion tracking", "Performance insights"],
    color: "orange"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Your AI receptionist works around the clock, ensuring customers can reach you anytime, anywhere.",
    benefits: ["Round-the-clock service", "No holidays or breaks", "Consistent availability"],
    color: "indigo"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and security protocols protect your customer data and business information.",
    benefits: ["Data encryption", "HIPAA compliant", "Secure infrastructure"],
    color: "red"
  }
]

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      icon: "text-blue-400",
      iconBg: "bg-blue-500/20",
      border: "border-blue-500/30",
      hoverBg: "hover:bg-blue-500/10"
    },
    purple: {
      icon: "text-purple-400",
      iconBg: "bg-purple-500/20",
      border: "border-purple-500/30",
      hoverBg: "hover:bg-purple-500/10"
    },
    green: {
      icon: "text-green-400",
      iconBg: "bg-green-500/20",
      border: "border-green-500/30",
      hoverBg: "hover:bg-green-500/10"
    },
    orange: {
      icon: "text-orange-400",
      iconBg: "bg-orange-500/20",
      border: "border-orange-500/30",
      hoverBg: "hover:bg-orange-500/10"
    },
    indigo: {
      icon: "text-indigo-400",
      iconBg: "bg-indigo-500/20",
      border: "border-indigo-500/30",
      hoverBg: "hover:bg-indigo-500/10"
    },
    red: {
      icon: "text-red-400",
      iconBg: "bg-red-500/20",
      border: "border-red-500/30",
      hoverBg: "hover:bg-red-500/10"
    }
  }
  return colors[color as keyof typeof colors] || colors.blue
}

export function CustomFeatures() {
  return (
    <section id="features" className="relative py-24 bg-black border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-black to-purple-900/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything You Need to 
            <br />
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Never Miss a Call
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI voice technology combines advanced conversation capabilities with seamless business integrations 
            to transform how you handle customer communications.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color)
            const Icon = feature.icon
            
            return (
              <div
                key={index}
                className={`group bg-white/5 rounded-2xl p-8 border border-white/10 ${colorClasses.hoverBg} transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10`}
              >
                {/* Icon */}
                <div className={`${colorClasses.iconBg} rounded-xl p-3 w-fit mb-6 ${colorClasses.border} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${colorClasses.icon}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="h-6 w-6 text-blue-400" />
              <span className="text-blue-300 font-semibold">Ready to Get Started?</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              See Your AI Voice Agent in Action
            </h3>
            
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience how our AI handles real customer calls with a personalized demo 
              tailored to your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/demo">
                  Get Free Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Setup in 24 hours • No contracts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 