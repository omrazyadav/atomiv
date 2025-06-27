'use client'

import Link from 'next/link'
import { ArrowRight, Play, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalendarAppsMarquee } from '@/components/ui/calendar-apps-marquee'


export function HeroSection() {
    return (
        <main className="relative overflow-hidden bg-black">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
            
            {/* Blue Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
            
            <section className="relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-24 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
                        
                        {/* Professional Badge */}
                        <div className="text-center mb-4 sm:mb-4 md:mb-6">
                            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-4 sm:mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <span className="text-xs sm:text-sm text-blue-300 font-medium">AI Voice Technology</span>
                            </div>
                        </div>
                        
                        {/* Main Headline */}
                        <div className="text-center mb-6 sm:mb-6 md:mb-8">
                            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-4 tracking-tight leading-tight px-2">
                                Never Miss Another
                                <br />
                                <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Customer Call Again
                                </span>
                            </h1>
                            
                            <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-6 leading-relaxed px-4">
                                AI voice agent that answers calls, books appointments, and captures leads 24/7. 
                                Ready in just <span className="text-blue-400 font-semibold">24 hours</span> with human-level conversations.
                            </p>
                            
                            {/* Value Props */}
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 mb-4 sm:mb-6 md:mb-8 px-4">
                                <div className="flex items-center justify-center gap-2 text-blue-400">
                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base font-medium">24/7 Availability</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-blue-400">
                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base font-medium">Human-Like Voice</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-blue-400">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base font-medium">24-Hour Setup</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12 px-4">
                            <Button 
                                asChild
                                size="lg" 
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg shadow-lg font-semibold cursor-pointer hover:scale-105 transition-all duration-300 border border-blue-400/50"
                            >
                                <Link href="/demo">
                                    Get Free Demo Now
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Link>
                            </Button>
                            <Button 
                                asChild
                                size="lg" 
                                variant="outline"
                                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-300"
                            >
                                <Link href="#how-it-works">
                                    <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    How It Works
                                </Link>
                            </Button>
                        </div>
                        
                        {/* Calendar Apps Integration */}
                        <CalendarAppsMarquee />

                    </div>
                </div>
            </section>
        </main>
    )
}

 