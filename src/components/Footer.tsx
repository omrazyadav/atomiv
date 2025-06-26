'use client'

import { 
  Mail, CheckCircle, Star
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/ui/newsletter-signup'

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Company Info */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/Atomiv White Full Transparent.svg" 
                  alt="Atomiv AI" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                AI voice technology that helps businesses capture every call, 
                book appointments, and provide 24/7 customer service.
              </p>
              <div className="flex items-center gap-2 text-blue-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Trusted by 500+ businesses</span>
              </div>
            </div>
            
            {/* Solutions */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/demo" className="hover:text-white transition-colors">AI Voice Agent</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Call Handling</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Appointment Booking</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Lead Qualification</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Call Analytics</Link></li>
              </ul>
            </div>
            
            {/* Industries */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white transition-colors">Hair Salons</span></li>
                <li><span className="hover:text-white transition-colors">Medical Clinics</span></li>
                <li><span className="hover:text-white transition-colors">Auto Repair</span></li>
                <li><span className="hover:text-white transition-colors">Restaurants</span></li>
                <li><span className="hover:text-white transition-colors">Professional Services</span></li>
              </ul>
            </div>
            
            {/* Contact & Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-3">Get AI insights and updates delivered to your inbox</p>
                  <NewsletterSignup source="footer" />
                </div>
                
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-400">support@atomiv.com</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="text-blue-400 font-semibold text-sm mb-2">🚀 Free Demo</div>
                <div className="text-white font-medium mb-2">Custom AI agent in 24 hours</div>
                <Link href="/demo">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm">
                    Get Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom Bar */}
      <section className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Atomiv AI Agency. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-blue-400">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              <span className="text-sm font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
} 