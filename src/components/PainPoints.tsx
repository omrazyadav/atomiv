'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingDown, Clock, Users, PhoneOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const businessChallenges = [
  {
    icon: PhoneOff,
    title: 'Missed Calls = Lost Revenue',
    description: 'Every unanswered call is potential revenue walking away. 30% of calls go to voicemail and most customers won\'t call back.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30'
  },
  {
    icon: Clock,
    title: 'After-Hours Opportunities',
    description: 'Customers call outside business hours but get voicemail. Your competitors with 24/7 solutions capture these leads.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30'
  },
  {
    icon: Users,
    title: 'Staff Interruptions',
    description: 'Phone calls interrupt customer service, reducing quality for in-person clients and creating scheduling conflicts.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30'
  },
  {
    icon: TrendingDown,
    title: 'Inconsistent Service',
    description: 'Different staff members provide varying phone service quality, leading to inconsistent customer experiences.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  }
]

export function PainPoints() {
  return (
    <section className="relative py-8 md:py-16 bg-black border-t border-white/10">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Stop Losing Customers to
            <br />
            <span className="text-gradient bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Missed Phone Calls
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            These common business challenges cost you customers and revenue every single day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-6 md:mb-12">
          {businessChallenges.map((challenge, idx) => (
            <div 
              key={idx}
              className={`relative group p-4 md:p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${challenge.bgColor} border ${challenge.borderColor}`}
            >
              <div className={`inline-flex p-2 md:p-3 rounded-full ${challenge.bgColor} ${challenge.borderColor} border mb-3 md:mb-4`}>
                <challenge.icon className={`h-4 w-4 md:h-5 md:w-5 ${challenge.color}`} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{challenge.title}</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{challenge.description}</p>
            </div>
          ))}
        </div>
        
        {/* Solution CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4">
              What If You Never Missed Another Call?
            </h3>
            <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
              AI voice agents handle every call professionally, book appointments instantly, 
              and capture leads 24/7 - even when you're busy or closed.
            </p>
            
            <Link href="/demo">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg font-semibold">
                Get Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 