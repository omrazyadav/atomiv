'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, Zap, Bot, MessageSquare, Calendar, Phone, BarChart3, Clock, Headphones, Globe, Settings } from 'lucide-react'

const features = [
  {
    icon: Phone,
    title: "24/7 Call Handling",
    description: "Never miss a call again. Your AI answers instantly, professionally, and captures every lead - even when you're busy or closed.",
    details: ["Instant pickup", "Professional greetings", "Lead capture", "After-hours service"]
  },
  {
    icon: Calendar,
    title: "Smart Appointment Booking",
    description: "Customers can book appointments instantly. AI checks your real-time calendar and schedules based on your availability and preferences.",
    details: ["Real-time calendar sync", "Automatic scheduling", "Confirmation emails", "Reminder notifications"]
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Human-like voice interactions that sound natural and professional. Customers won't know they're talking to AI.",
    details: ["Human-like voice", "Context awareness", "Emotional intelligence", "Industry-specific knowledge"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track call performance, conversion rates, and customer insights. See exactly how your AI agent is growing your business.",
    details: ["Call analytics", "Conversion tracking", "Performance metrics", "Business insights"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with encrypted calls, secure data storage, and HIPAA compliance for medical practices.",
    details: ["Encrypted calls", "Secure storage", "HIPAA compliant", "Data protection"]
  }
]

export function EnhancedFeatures() {
    return (
        <section id="features" className="bg-black py-8 sm:py-12 md:py-16 lg:py-24">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6">
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                        Why Businesses Choose
                        <br />
                        <span className="text-blue-400">
                            Atomiv AI Assistant
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                        Advanced AI technology that transforms your business communications with enterprise-grade reliability.
                    </p>
                </div>
                
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
                        {/* 24/7 Availability - Main Feature */}
                        <div className="relative col-span-1 sm:col-span-2 lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
                            <div className="relative flex h-12 sm:h-16 lg:h-20 w-full items-center justify-center mb-3 sm:mb-4">
                                <svg className="text-gray-600 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="mx-auto block w-fit text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-400">24/7</span>
                            </div>
                            <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-white">Always Available</h2>
                        </div>
                        
                        {/* Enterprise Security */}
                        <div className="relative col-span-1 sm:col-span-1 lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
                            <div className="relative mx-auto flex aspect-square size-16 sm:size-20 lg:size-24 rounded-full border border-white/10 mb-3 sm:mb-4">
                                <Shield className="m-auto size-6 sm:size-8 lg:size-10 text-blue-400" strokeWidth={1} />
                            </div>
                            <div className="text-center">
                                <h2 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Enterprise Security</h2>
                                <p className="text-xs sm:text-sm text-gray-300 leading-snug">Bank-level encryption and compliance with GDPR, HIPAA, and SOC 2 standards.</p>
                            </div>
                        </div>
                        
                        {/* Lightning Fast */}
                        <div className="relative col-span-1 sm:col-span-1 lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
                            <div className="relative mx-auto flex aspect-square size-16 sm:size-20 lg:size-24 rounded-full border border-white/10 mb-3 sm:mb-4">
                                <Zap className="m-auto size-6 sm:size-8 lg:size-10 text-blue-400" strokeWidth={1} />
                            </div>
                            <div className="text-center">
                                <h2 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Lightning Fast</h2>
                                <p className="text-xs sm:text-sm text-gray-300 leading-snug">Sub-second response times with natural conversation flow.</p>
                            </div>
                        </div>
                        
                        {/* Smart AI Assistant */}
                        <div className="relative col-span-1 sm:col-span-2 lg:col-span-3 bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="flex flex-col justify-between">
                                    <div className="relative flex aspect-square size-6 sm:size-8 lg:size-12 rounded-full border border-white/10 mb-3 sm:mb-4">
                                        <Bot className="m-auto size-3 sm:size-4 lg:size-5 text-blue-400" strokeWidth={1} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Smart AI Assistant</h2>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-snug">Advanced conversational AI that understands context and handles complex queries.</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-3 sm:p-4 border border-gray-700">
                                    <div className="flex gap-1 mb-2 sm:mb-3">
                                        <span className="block size-1 sm:size-1.5 rounded-full bg-red-400"></span>
                                        <span className="block size-1 sm:size-1.5 rounded-full bg-yellow-400"></span>
                                        <span className="block size-1 sm:size-1.5 rounded-full bg-green-400"></span>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <div className="bg-gray-600 rounded-lg p-1.5 sm:p-2">
                                            <p className="text-xs text-gray-100">"Hi, I'd like to book an appointment"</p>
                                        </div>
                                        <div className="bg-blue-500 text-white rounded-lg p-1.5 sm:p-2 ml-1 sm:ml-2">
                                            <p className="text-xs">"I'd be happy to help! What service?"</p>
                                        </div>
                                        <div className="bg-gray-600 rounded-lg p-1.5 sm:p-2">
                                            <p className="text-xs text-gray-100">"Business consultation"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Smart Scheduling */}
                        <div className="relative col-span-1 sm:col-span-2 lg:col-span-3 bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="flex flex-col justify-between">
                                    <div className="relative flex aspect-square size-6 sm:size-8 lg:size-12 rounded-full border border-white/10 mb-3 sm:mb-4">
                                        <Calendar className="m-auto size-3 sm:size-4 lg:size-6 text-blue-400" strokeWidth={1} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-2">Smart Scheduling</h2>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-snug">Automatically books appointments and integrates with your calendar systems.</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600"></div>
                                    <div className="flex flex-col justify-center space-y-3 sm:space-y-4 py-2">
                                        <div className="flex items-center justify-end gap-2 pr-3 sm:pr-4">
                                            <span className="text-xs bg-blue-900 text-blue-200 border border-blue-700 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">Available</span>
                                            <div className="size-3 sm:size-4 bg-green-900 rounded-full flex items-center justify-center">
                                                <div className="size-1.5 sm:size-2 bg-green-400 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pl-3 sm:pl-4">
                                            <div className="size-4 sm:size-5 bg-yellow-900 rounded-full flex items-center justify-center">
                                                <div className="size-1.5 sm:size-2 bg-yellow-400 rounded-full"></div>
                                            </div>
                                            <span className="text-xs bg-yellow-900 text-yellow-200 border border-yellow-700 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">Booked</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-2 pr-3 sm:pr-4">
                                            <span className="text-xs bg-red-900 text-red-200 border border-red-700 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">Busy</span>
                                            <div className="size-3 sm:size-4 bg-red-900 rounded-full flex items-center justify-center">
                                                <div className="size-1.5 sm:size-2 bg-red-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}