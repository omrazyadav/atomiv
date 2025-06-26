"use client"

import Link from 'next/link'
import { ArrowRight, Shield, Clock, Users, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CTAProps {
  badge?: {
    text: string
  }
  title: string
  description?: string
  action: {
    text: string
    href: string
    variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
  }
  withGlow?: boolean
  className?: string
}

export function CTAWithRectangle() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      
      {/* Main Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12 lg:p-16 text-center shadow-2xl">
            {/* Glow Effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl sm:rounded-3xl blur-sm opacity-75" />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl sm:rounded-3xl blur-lg opacity-50" />
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 rounded-2xl sm:rounded-3xl blur-xl opacity-25" />
            
            <div className="relative z-10">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm mb-4 sm:mb-6">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                <span className="text-xs sm:text-sm text-green-300 font-medium">Trusted by 500+ Businesses</span>
              </div>
              
              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
                Start Capturing Every Call
                <br />
                <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  with AI Today
                </span>
              </h2>
              
              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Join 500+ businesses who never miss another customer call. Setup takes just <span className="text-blue-400 font-semibold">24 hours</span>, 
                and you'll see results immediately.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 px-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">24 Hour Setup</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">500+ Happy Customers</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Button 
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-400/50 cursor-pointer"
                >
                  <Link href="/demo">
                    Get Your Free Demo
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <a href="mailto:hello@atomiv.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </a>
                </Button>
              </div>
              
              {/* Simple Footer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                <p className="text-xs sm:text-sm text-gray-400">
                  No setup fees • Cancel anytime • Enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 