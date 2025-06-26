'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, MessageSquare, CheckCircle, Play, Clock, Users, Star, ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { submitDemoRequest, trackFormEvent } from '@/lib/form-submissions'

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    callVolume: '',
    timeframe: '',
    currentSolution: '',
    preferredTime: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Track demo page view
  useEffect(() => {
    trackFormEvent('demo', 'view')
  }, [])

  const businessTypes = [
    'Hair Salon', 'Medical Clinic', 'Auto Repair', 'Restaurant', 
    'Dental Office', 'Spa & Wellness', 'Legal Firm', 'Real Estate',
    'Fitness Center', 'Veterinary Clinic', 'Accounting Firm', 'Other'
  ]

  const callVolumeOptions = [
    '0-50 calls/month',
    '51-200 calls/month', 
    '201-500 calls/month',
    '500+ calls/month'
  ]

  const timeframeOptions = [
    'ASAP (within 24 hours)',
    'Within 1 week',
    'Within 2-4 weeks',
    'Just exploring options'
  ]

  const preferredTimeOptions = [
    'Morning (9am-12pm)',
    'Afternoon (12pm-5pm)',
    'Evening (5pm-8pm)',
    'Flexible'
  ]

  const handleInputChange = (field: string, value: string) => {
    // Track form start on first meaningful input
    if (!formData.firstName && !formData.lastName && !formData.email && !formData.phone) {
      trackFormEvent('demo', 'start')
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const result = await submitDemoRequest(formData)
      
      if (result.success) {
        setIsSubmitted(true)
        // Clear form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          businessType: '',
          callVolume: '',
          timeframe: '',
          currentSolution: '',
          preferredTime: '',
          message: ''
        })
      } else {
        setError(result.error || 'Failed to submit demo request. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Demo submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="bg-green-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Demo Request Submitted!
            </h1>
            
            <p className="text-lg text-gray-300 mb-6">
              Thank you for your interest in Atomiv AI. Our team will contact you within <span className="text-blue-400 font-semibold">24 hours</span> to schedule your custom demo.
            </p>
            
            <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1">
                    <span className="text-blue-400 text-sm font-bold">1</span>
                  </div>
                  <span className="text-gray-300">Our team reviews your business requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1">
                    <span className="text-blue-400 text-sm font-bold">2</span>
                  </div>
                  <span className="text-gray-300">We build a custom AI agent for your business</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1">
                    <span className="text-blue-400 text-sm font-bold">3</span>
                  </div>
                  <span className="text-gray-300">Schedule a live demo call to see it in action</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1">
                    <span className="text-blue-400 text-sm font-bold">4</span>
                  </div>
                  <span className="text-gray-300">Go live in just 24 hours after approval</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <a href="mailto:hello@atomiv.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* Header */}
      <header className="relative border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button 
              asChild
              variant="ghost"
              className="text-gray-400 hover:text-white cursor-pointer transition-all duration-300"
            >
              <Link href="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <div className="text-2xl font-bold text-white">
              Atomiv AI
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column - Information */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
                  <Play className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">Free Custom Demo</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  See Your AI Agent
                  <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> In Action</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Get a live demonstration of how our AI voice agent will handle calls for your specific business. 
                  We'll build a custom demo agent trained on your services and pricing, ready in just <span className="text-blue-400 font-semibold">24 hours</span>.
                </p>
              </div>

              {/* Demo Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">What you'll see in your demo:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 group-hover:bg-blue-500/30 transition-all duration-300">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Live Call Simulation</h4>
                      <p className="text-gray-300">Watch as your AI agent handles real customer scenarios specific to your business</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 group-hover:bg-blue-500/30 transition-all duration-300">
                      <Calendar className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Appointment Booking</h4>
                      <p className="text-gray-300">See how the AI schedules appointments using your actual calendar system</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 group-hover:bg-blue-500/30 transition-all duration-300">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Natural Conversations</h4>
                      <p className="text-gray-300">Experience human-like interactions that sound just like your best receptionist</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className="bg-blue-500/20 rounded-full p-2 flex-shrink-0 group-hover:bg-blue-500/30 transition-all duration-300">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">24-Hour Setup</h4>
                      <p className="text-gray-300">From demo approval to live AI agent in just 24 hours - no lengthy deployments</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-white font-semibold">4.9/5 Rating</span>
                </div>
                <p className="text-gray-300 italic">
                  "The demo blew us away. Within 30 minutes, we saw exactly how this would transform our business. 
                  Setup was completed in just 24 hours!"
                </p>
                <p className="text-blue-400 font-medium mt-2">- Sarah M., Dental Practice Owner</p>
              </div>
            </div>

            {/* Right Column - Demo Request Form */}
            <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Request Your Custom Demo</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@business.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Business Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Type *
                    </label>
                    <select
                      required
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map((type, idx) => (
                        <option key={idx} value={type} className="bg-black">{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Call Volume *
                    </label>
                    <select
                      required
                      value={formData.callVolume}
                      onChange={(e) => handleInputChange('callVolume', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Select call volume</option>
                      {callVolumeOptions.map((option, idx) => (
                        <option key={idx} value={option} className="bg-black">{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Implementation Timeframe *
                    </label>
                    <select
                      required
                      value={formData.timeframe}
                      onChange={(e) => handleInputChange('timeframe', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <option value="">When do you need this?</option>
                      {timeframeOptions.map((option, idx) => (
                        <option key={idx} value={option} className="bg-black">{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Solution
                    </label>
                    <input
                      type="text"
                      value={formData.currentSolution}
                      onChange={(e) => handleInputChange('currentSolution', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Receptionist, voicemail, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Demo Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Any time works</option>
                      {preferredTimeOptions.map((option, idx) => (
                        <option key={idx} value={option} className="bg-black">{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Any specific requirements or questions for your demo..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/25 cursor-pointer hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Request My Free Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}
                
                <p className="text-sm text-gray-500 text-center">
                  Our team will contact you within <span className="text-blue-400 font-semibold">24 hours</span> to schedule your custom demo
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 