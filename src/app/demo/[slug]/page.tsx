'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Lock, CheckCircle, Sparkles, ArrowRight, Star, Zap, Shield, Clock
} from 'lucide-react'
import Script from 'next/script'

interface DemoPageData {
  id: string
  slug: string
  client_name: string
  company_name: string
  title: string
  elevenlabs_agent_id: string
  primary_color: string
  secondary_color: string
  logo_url?: string
  hero_title: string
  hero_subtitle: string
  features: Array<{
    icon: string
    title: string
    description: string
  }>
  testimonials: Array<{
    name: string
    role: string
    content: string
  }>
  custom_message?: string
  password_protected: boolean
  expires_at?: string
}

export default function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const [demoData, setDemoData] = useState<DemoPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [slug, setSlug] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (slug) {
      fetchDemoData()
      trackPageView()
    }
  }, [slug])

  // Hide ElevenLabs branding
  useEffect(() => {
    const hideElevenLabsBranding = () => {
      const interval = setInterval(() => {
        // Hide any element containing branding text
        const allElements = document.querySelectorAll('*')
        allElements.forEach(el => {
          const text = el.textContent?.toLowerCase() || ''
          if (text.includes('powered by elevenlabs') ||
              text.includes('powered by elevenlabs conversational ai') ||
              text === 'powered by elevenlabs conversational ai' ||
              (text.includes('powered') && text.includes('elevenlabs')) ||
              (text.includes('elevenlabs') && text.includes('conversational'))) {
            (el as HTMLElement).style.display = 'none !important'
            ;(el as HTMLElement).style.visibility = 'hidden !important'
            ;(el as HTMLElement).style.opacity = '0 !important'
            ;(el as HTMLElement).style.height = '0 !important'
            ;(el as HTMLElement).style.overflow = 'hidden !important'
          }
        })

        // Target specific ElevenLabs widget elements
        const convaiElements = document.querySelectorAll('elevenlabs-convai, elevenlabs-convai *')
        convaiElements.forEach(el => {
          const element = el as HTMLElement
          const text = element.textContent?.toLowerCase() || ''
          
          // Hide text elements but preserve buttons and interactive elements
          if ((text.includes('powered') || text.includes('elevenlabs')) && 
              !element.tagName.toLowerCase().includes('button') &&
              !element.tagName.toLowerCase().includes('input') &&
              !element.hasAttribute('onclick') &&
              !element.closest('button')) {
            element.style.display = 'none !important'
            element.style.visibility = 'hidden !important'
            element.style.opacity = '0 !important'
          }
        })

        // Hide by common branding selectors
        const brandingSelectors = [
          '[data-testid*="powered"]',
          '[class*="powered"]',
          '[class*="branding"]',
          '[class*="footer"]',
          '[class*="attribution"]',
          'div:contains("Powered by")',
          'span:contains("ElevenLabs")',
          'p:contains("Conversational AI")'
        ]
        
        brandingSelectors.forEach(selector => {
          try {
            const elements = document.querySelectorAll(selector)
            elements.forEach(el => {
              (el as HTMLElement).style.display = 'none !important'
            })
          } catch (e) {
            // Ignore selector errors
          }
        })
      }, 300)

      // Clear interval after 15 seconds
      setTimeout(() => clearInterval(interval), 15000)
    }

    if (demoData) {
      hideElevenLabsBranding()
    }
  }, [demoData])

  const fetchDemoData = async () => {
    try {
      const response = await fetch(`/api/demo/${slug}`)
      
      if (response.status === 404) {
        notFound()
      }
      
      if (response.status === 401) {
        setPasswordRequired(true)
        setLoading(false)
        return
      }
      
      const data = await response.json()
      setDemoData(data)
    } catch (error) {
      console.error('Error fetching demo:', error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  const trackPageView = async () => {
    try {
      await fetch(`/api/demo/${slug}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'view' })
      })
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    
    try {
      const response = await fetch(`/api/demo/${slug}`, {
        headers: {
          'X-Demo-Password': password
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setDemoData(data)
        setPasswordRequired(false)
      } else {
        setPasswordError('Incorrect password')
      }
    } catch (error) {
      setPasswordError('An error occurred')
    }
  }

  const handleFinalizeRequest = async () => {
    setSubmitting(true)
    
    try {
      // Submit finalization request to database
      const response = await fetch('/api/admin/finalization-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demo_slug: slug,
          client_name: demoData?.client_name,
          company_name: demoData?.company_name,
          demo_title: demoData?.title,
          elevenlabs_agent_id: demoData?.elevenlabs_agent_id,
          custom_message: demoData?.custom_message,
          status: 'pending'
        })
      })

      console.log('Response status:', response.status)
      const responseText = await response.text()
      console.log('Response text:', responseText)

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      // Track the finalize action
      await fetch(`/api/demo/${slug}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event_type: 'finalize_request',
          metadata: {
            client_name: demoData?.client_name,
            company_name: demoData?.company_name,
            timestamp: new Date().toISOString()
          }
        })
      })
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Failed to submit request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
        <div className="text-white text-lg animate-pulse">Loading your demo...</div>
      </div>
    )
  }

  if (passwordRequired) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 overflow-hidden">
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Password Required</h1>
            <p className="text-gray-300">This demo is password protected</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-black/30 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Access Demo
            </Button>
            
            {passwordError && (
              <p className="text-red-400 text-sm text-center">{passwordError}</p>
            )}
          </form>
        </Card>
      </div>
    )
  }

  if (!demoData) {
    notFound()
  }

  if (submitted) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Header */}
        <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
          <div className="w-full px-4 py-4 sm:py-6">
            <div className="flex items-center justify-center">
              <img 
                src="/assets/Atomiv White Full Transparent.svg" 
                alt="Atomiv AI" 
                className="h-6 sm:h-8 md:h-10"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full mb-8 shadow-2xl">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                🎉 Request Submitted Successfully!
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Congratulations, <span className="text-white font-bold">{demoData.client_name}</span>! 
                Your request to implement the AI receptionist for{' '}
                <span className="text-white font-bold">{demoData.company_name}</span> has been received.
              </p>
            </div>

            {/* What's Next Section */}
            <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-blue-500/20 shadow-2xl">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">What's Next?</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Quick Response</h3>
                    <p className="text-gray-300 text-sm">Our team will contact you as soon as possible</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Voice Training</h3>
                    <p className="text-gray-300 text-sm">Custom voice training for your business</p>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Go Live</h3>
                    <p className="text-gray-300 text-sm">Complete setup and integration</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Benefits Section */}
            <Card className="mb-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20 shadow-2xl">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Final Version Benefits</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                      <h4 className="text-white font-medium mb-1">Tailored Responses</h4>
                      <p className="text-gray-300 text-sm">More accurate & personalized conversations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Service Knowledge</h4>
                      <p className="text-gray-300 text-sm">Custom knowledge about your services</p>
                </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                      <h4 className="text-white font-medium mb-1">Smart Booking</h4>
                      <p className="text-gray-300 text-sm">Advanced booking & scheduling integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Features Section */}
            <Card className="mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20 shadow-2xl">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-purple-400" />
                      </div>
                  <h2 className="text-2xl font-bold text-white">Your Final AI Will Include</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">Personalized voice & tone</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">Your exact pricing & services</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">Real-time appointment booking</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">Advanced conversation handling</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/20 shadow-2xl">
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  Questions about your implementation?
                </p>
                <a 
                  href="mailto:support@atomiv.com" 
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Contact Support
                </a>
            </div>
            </Card>

          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script 
        src="https://unpkg.com/@elevenlabs/convai-widget-embed" 
        strategy="afterInteractive"
        type="text/javascript"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
        {/* Minimal Header */}
        <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
          <div className="w-full px-4 py-3 sm:py-4">
            <div className="flex items-center justify-center">
              <img 
                src="/assets/Atomiv White Full Transparent.svg" 
                alt="Atomiv AI" 
                className="h-6 sm:h-7 md:h-8"
              />
            </div>
          </div>
        </header>

        {/* Main Content - Positioned at Top */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 pt-8 pb-6 space-y-8">
          {/* Title */}
          <div className="text-center">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
              Personalized for {demoData.client_name}
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              {demoData.hero_title || `Your AI Receptionist for ${demoData.company_name}`}
            </h1>
          </div>

          {/* AI Demo Widget - Clean and Centered */}
          <div className="flex justify-center">
            <Card className="bg-black backdrop-blur-sm border-white/[0.05] shadow-none w-full max-w-none min-h-[169px] px-48 py-8 flex items-center justify-center">
              {/* Hide branding with CSS */}
              <style jsx>{`
                :global(elevenlabs-convai *[class*="powered"]),
                :global(elevenlabs-convai *[data-testid*="powered"]),
                :global([class*="elevenlabs-branding"]),
                :global([data-testid*="elevenlabs-branding"]),
                :global(elevenlabs-convai *:contains("Powered by")),
                :global(elevenlabs-convai *:contains("ElevenLabs")),
                :global(elevenlabs-convai *:contains("Conversational AI")),
                :global(elevenlabs-convai div),
                :global(elevenlabs-convai span),
                :global(elevenlabs-convai p) {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  height: 0 !important;
                  overflow: hidden !important;
                }
                :global(elevenlabs-convai) {
                  width: 100% !important;
                  max-width: none !important;
                }
                :global(elevenlabs-convai iframe) {
                  display: block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                  height: auto !important;
                }
                :global(elevenlabs-convai button) {
                  display: block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                  height: auto !important;
                }
              `}</style>
              
              <div 
                className="w-full flex justify-center"
                dangerouslySetInnerHTML={{
                  __html: `<elevenlabs-convai agent-id="${demoData.elevenlabs_agent_id}"></elevenlabs-convai>`
                }}
              />
            </Card>
          </div>



          {/* Finalization Section with CTA Text */}
          <div className="text-center">
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              Ready to get your own AI receptionist? The final version will be customized specifically for {demoData.company_name}.
                </p>
            <Button 
              onClick={handleFinalizeRequest}
              disabled={submitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-0 mb-4"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Finalize Your AI Receptionist
                </>
              )}
            </Button>

            {/* Simple Horizontal Checkmarks */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                <span>Custom for your business</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                <span>24/7 availability</span>
                </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                <span>Quick & easy setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 