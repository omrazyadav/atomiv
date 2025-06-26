'use client'

import { 
  Check, X, Zap, Crown, Target, 
  Phone, Calendar, Clock, Shield,
  Star, ArrowRight, TrendingUp, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { submitQuoteRequest, trackFormEvent } from '@/lib/form-submissions'

const callVolumeOptions = [
  { range: '0-50 calls/month', description: 'Small business or startup' },
  { range: '51-200 calls/month', description: 'Growing local business' },
  { range: '201-500 calls/month', description: 'Established business' },
  { range: '500+ calls/month', description: 'High-volume operation' }
]

const businessTypes = [
  'Hair Salon', 'Medical Clinic', 'Auto Repair', 'Restaurant', 
  'Dental Office', 'Spa & Wellness', 'Legal Firm', 'Real Estate',
  'Fitness Center', 'Veterinary Clinic', 'Accounting Firm', 'Other'
]

const includedFeatures = [
  'Custom AI training for your business',
  '24/7 call handling & appointment booking',
  'Natural, human-like conversations',
  'Lead capture & contact management',
  'Real-time calendar synchronization',
  'Detailed analytics & reporting',
  'Multi-language support',
  'Dedicated support team'
]

export function Pricing() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    callVolume: '',
    currentSolution: '',
    specialRequirements: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Track form view on component mount
  useEffect(() => {
    trackFormEvent('pricing', 'view')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const result = await submitQuoteRequest(formData)
      
      if (result.success) {
        setIsSubmitted(true)
        // Clear form data
        setFormData({
          businessName: '',
          contactName: '',
          email: '',
          phone: '',
          businessType: '',
          callVolume: '',
          currentSolution: '',
          specialRequirements: ''
        })
      } else {
        setError(result.error || 'Failed to submit quote request. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Quote submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    // Track form start on first input
    if (!formData.businessName && !formData.contactName && !formData.email && !formData.phone) {
      trackFormEvent('pricing', 'start')
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section id="pricing" className="relative py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="bg-green-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Check className="w-12 h-12 text-green-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Quote Request Submitted!
              </h2>
              
              <p className="text-lg text-gray-300 mb-8">
                Thank you for your interest! Our team will send you a detailed custom quote within 24 hours.
              </p>
              
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-1">
                      <span className="text-blue-400 text-sm font-bold">1</span>
                    </div>
                    <span className="text-gray-300">Our team analyzes your requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-1">
                      <span className="text-blue-400 text-sm font-bold">2</span>
                    </div>
                    <span className="text-gray-300">We prepare a custom pricing proposal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-1">
                      <span className="text-blue-400 text-sm font-bold">3</span>
                    </div>
                    <span className="text-gray-300">Schedule a call to discuss implementation</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    businessName: '',
                    contactName: '',
                    email: '',
                    phone: '',
                    businessType: '',
                    callVolume: '',
                    currentSolution: '',
                    specialRequirements: ''
                  })
                }}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="relative py-24 bg-black border-t border-white/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-black to-purple-900/5" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Custom Pricing</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get Your <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Custom Quote</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our pricing is based on your actual call volume and specific business needs. 
            Get a personalized quote in under 24 hours.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Quote Request Form */}
            <div className="bg-white/5 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Request Your Quote</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Your Business Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Business Type *
                  </label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                      <option value="">Select business type</option>
                    {businessTypes.map((type, idx) => (
                      <option key={idx} value={type} className="bg-black">{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Monthly Call Volume *
                  </label>
                  <select
                    required
                    value={formData.callVolume}
                    onChange={(e) => handleInputChange('callVolume', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                      <option value="">Select call volume</option>
                    {callVolumeOptions.map((option, idx) => (
                      <option key={idx} value={option.range} className="bg-black">
                          {option.range}
                      </option>
                    ))}
                  </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Phone Solution
                  </label>
                  <input
                    type="text"
                    value={formData.currentSolution}
                    onChange={(e) => handleInputChange('currentSolution', e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Current receptionist, voicemail, call center, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Any specific needs, integrations, or requirements..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-3 text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Custom Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}
                
                <p className="text-sm text-gray-500 text-center">
                  We'll send you a detailed quote within 24 hours
                </p>
              </form>
            </div>
            
            {/* What's Included */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Everything Included
                </h3>
                
                <ul className="space-y-4">
                  {includedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pricing Information */}
              <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Transparent Pricing
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-2">
                      <Phone className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Call Volume Based</div>
                      <div className="text-gray-400 text-sm">Pay only for what you use</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">No Setup Fees</div>
                      <div className="text-gray-400 text-sm">Get started immediately</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Monthly Billing</div>
                      <div className="text-gray-400 text-sm">Cancel anytime, no contracts</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Guarantee */}
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 rounded-full p-2">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    30-Day Money-Back Guarantee
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  If you're not completely satisfied with our service, we'll refund your money. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 