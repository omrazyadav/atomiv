'use client'

import { 
  ChevronDown, HelpCircle, Shield, Clock, 
  Zap, Phone, Settings, CreditCard, CheckCircle 
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const faqs = [
  {
    question: "How does the AI voice agent work?",
    answer: "Our AI uses advanced voice technology to understand customers naturally, answer questions about your business, and book appointments. It sounds human and handles calls professionally 24/7.",
    icon: Phone,
  },
  {
    question: "How long does setup take?",
    answer: "Setup takes 5 business days. We gather your business information, train the AI with your services and pricing, integrate with your calendar, and test everything before going live.",
    icon: Clock,
  },
  {
    question: "Can it integrate with my calendar?",
    answer: "Yes, we integrate with Google Calendar, Outlook, and most major calendar systems. The AI checks real-time availability and books appointments directly into your calendar.",
    icon: Settings,
  },
  {
    question: "What if the AI can't answer a question?",
    answer: "If the AI encounters something it can't handle, it politely takes a detailed message, schedules a callback, or can transfer to your team if available. No customer goes unattended.",
    icon: HelpCircle,
  },
  {
    question: "Is our data secure?",
    answer: "Absolutely. We use enterprise-grade security with encryption and secure data storage. Your business and customer information is protected with the same standards as major financial institutions.",
    icon: Shield,
  }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="faq" className="relative py-8 md:py-16 bg-black border-t border-white/10">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Frequently Asked
            <br />
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Common questions about AI voice agents and how they work for your business.
          </p>
        </div>
      
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-blue-500/20 rounded-full p-1.5 md:p-2 border border-blue-500/30 flex-shrink-0">
                      <faq.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white">{faq.question}</h3>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 md:h-5 md:w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      openItems.includes(idx) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openItems.includes(idx) && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="ml-8 md:ml-12 text-sm md:text-base text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 