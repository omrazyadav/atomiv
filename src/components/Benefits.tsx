'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { 
  TrendingUp, DollarSign, Clock, Users, 
  CheckCircle, Target, BarChart3, Zap,
  Phone, Calendar, ArrowRight, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const benefits = [
  {
    icon: Clock,
    title: '24/7 Revenue Capture',
    description: 'Never lose another lead to after-hours missed calls or busy signals',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: Users,
    title: 'Enterprise-Grade Consistency',
    description: 'Every caller receives the same high-quality, professional experience',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: Calendar,
    title: 'Intelligent Booking System',
    description: 'Advanced scheduling logic that maximizes appointment conversion rates',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: BarChart3,
    title: 'Revenue Intelligence',
    description: 'AI-powered analytics reveal untapped revenue opportunities in your business',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  }
]

const businessImprovements = [
  {
    title: 'Operational Excellence',
    description: 'Eliminate phone interruptions and focus your team on high-value activities that drive growth',
    icon: Target,
    points: ['Zero phone interruptions', 'Enhanced service delivery', 'Improved team productivity']
  },
  {
    title: 'Professional Brand Image',
    description: 'Project enterprise-level professionalism that builds trust and credibility with every interaction',
    icon: Star,
    points: ['Consistent communication', 'Always-available service', 'Professional call handling']
  },
  {
    title: 'Revenue Optimization',
    description: 'Streamline customer acquisition and maximize conversion rates with intelligent automation',
    icon: Zap,
    points: ['Automated lead qualification', 'Optimized appointment booking', 'Reduced customer acquisition cost']
  },
  {
    title: 'Customer Experience Excellence',
    description: 'Deliver superior customer service that exceeds expectations and drives loyalty',
    icon: Users,
    points: ['Instant response times', 'Personalized interactions', 'Seamless booking experience']
  }
]

export function Benefits() {
  return (
    <section className="relative py-20 bg-black border-t border-white/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-black to-purple-900/5" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Business Transformation</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Measurable Business
            <br />
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Impact & Growth
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced AI voice technology delivers quantifiable improvements across every aspect 
            of your customer acquisition and service delivery operations.
          </p>
        </div>
        
        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className={`group relative p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${benefit.bgColor} border ${benefit.borderColor}`}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-full ${benefit.bgColor} ${benefit.borderColor} border mb-4`}>
                <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        {/* Detailed Benefits */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Competitive Advantage Through <span className="text-blue-400">AI Technology</span>
            </h3>
            <p className="text-gray-300 text-lg">
              See how AI voice agents create sustainable competitive advantages for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessImprovements.map((improvement, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-full p-3 border border-blue-500/30">
                    <improvement.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-3">{improvement.title}</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{improvement.description}</p>
                    <ul className="space-y-2">
                      {improvement.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer Success Story */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Success Story: <span className="text-blue-400">Elite Medical Practice</span>
            </h3>
            <p className="text-gray-300 text-lg">
              How one practice transformed their patient acquisition with AI voice technology
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 mb-6">
              <p className="text-gray-300 italic text-lg leading-relaxed">
                "Our AI voice agent has revolutionized our practice. We've eliminated missed appointment opportunities 
                and now capture leads 24/7. Patient satisfaction scores increased 40% due to consistent, professional 
                service. The ROI was evident within the first month of implementation."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">EM</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Dr. Sarah Chen</div>
                  <div className="text-gray-400 text-sm">Medical Director, Elite Medical Practice</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">$85K+</div>
                <div className="text-sm text-gray-400">Additional revenue in first year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">98%</div>
                <div className="text-sm text-gray-400">Call conversion rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">40%</div>
                <div className="text-sm text-gray-400">Increase in patient satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to Achieve Similar Results?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/demo">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/25">
                Get Custom Demo Agent
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-lg backdrop-blur-sm">
                See Implementation Process
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            📈 Join 500+ businesses experiencing 40%+ revenue growth with AI voice technology
          </p>
        </div>
      </div>
    </section>
  )
} 