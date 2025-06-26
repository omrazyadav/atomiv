'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { 
  Phone, CheckCircle, Zap, ArrowRight 
} from 'lucide-react'
import { useEffect } from 'react'
import { trackFormEvent } from '@/lib/form-submissions'
import Link from 'next/link'

export function CTA() {
  // Track CTA section view
  useEffect(() => {
    trackFormEvent('newsletter', 'view', { section: 'cta' })
  }, [])

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedGroup
          preset="blur-slide"
          className="text-center mb-16"
        >
          <Badge className="bg-green-600 text-white px-6 py-3 text-sm mb-6 shadow-lg">
            🚀 Ready to Get Started?
          </Badge>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Stop Missing <span className="text-green-400">Customer Calls</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join growing businesses who've transformed their customer service 
            with AI. Get started today and never miss another opportunity.
          </p>
        </AnimatedGroup>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits Recap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              What You Get Starting Today:
            </h3>
            
            <div className="space-y-4">
              {[
                "24/7 professional phone answering",
                "Instant appointment booking",
                "Custom training for your business",
                "Real-time analytics and insights"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-900/50 rounded-lg p-4 border border-green-700">
              <p className="text-green-200 text-sm">
                💰 <strong>Special Offer:</strong> No setup fees for the first 50 businesses this month. 
                Get started immediately!
              </p>
            </div>
          </motion.div>

          {/* Right Side - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold text-black">
                  Start Your Free Consultation
                </h3>
                <p className="text-gray-600">
                  Speak with our team to discuss your needs and get a custom quote
                </p>

                <div className="space-y-4">
                  <Button 
                    asChild
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                  >
                    <Link href="/demo" onClick={() => trackFormEvent('newsletter', 'start', { button: 'schedule_call' })}>
                      <Phone className="w-5 h-5 mr-2" />
                      Schedule Free Call
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    size="lg" 
                    className="w-full border-2 border-black text-black hover:bg-black hover:text-white py-4 text-lg font-semibold transition-all"
                  >
                    <Link href="/#pricing" onClick={() => trackFormEvent('newsletter', 'start', { button: 'get_quote' })}>
                      <Zap className="w-5 h-5 mr-2" />
                      Get Custom Quote
                    </Link>
                  </Button>
                </div>

                <div className="space-y-3 text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free 30-minute consultation</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Custom pricing based on your needs</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No setup fees this month</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-400">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 