"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface EnhancedNavBarProps {
  items: NavItem[]
  className?: string
}

export function EnhancedNavBar({ items, className }: EnhancedNavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Throttle the active tab updates
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // More precise scroll-based active state tracking
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        
        if (scrollY < 200) {
          setActiveTab('Home')
        } else {
          // Check actual section positions
          const howItWorksEl = document.querySelector('#how-it-works')
          const featuresEl = document.querySelector('#features')
          const pricingEl = document.querySelector('#pricing')
          const faqEl = document.querySelector('#faq')
          
          const howItWorksTop = howItWorksEl?.getBoundingClientRect().top ?? 0
          const featuresTop = featuresEl?.getBoundingClientRect().top ?? 0
          const pricingTop = pricingEl?.getBoundingClientRect().top ?? 0
          const faqTop = faqEl?.getBoundingClientRect().top ?? 0
          
          // Section is active when it's in the upper half of the viewport
          if (faqTop <= windowHeight * 0.5) {
            setActiveTab('FAQ')
          } else if (pricingTop <= windowHeight * 0.5) {
            setActiveTab('Pricing')
          } else if (featuresTop <= windowHeight * 0.5) {
            setActiveTab('Features')
          } else if (howItWorksTop <= windowHeight * 0.5) {
            setActiveTab('How It Works')
          }
        }
      }, 100) // 100ms throttle
    }

    handleResize()
    handleScroll()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [items])

  // Close mobile menu when clicking on a link
  const handleLinkClick = (itemName: string) => {
    setActiveTab(itemName)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Navbar - Simplified */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/assets/Atomiv White Full Transparent.svg" 
              alt="Atomiv" 
              className="h-7 w-auto"
            />
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10 border border-white/20"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 pt-3 px-3 sm:pt-4 sm:px-4 hidden md:block",
          className,
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo - Left */}
          <div className={cn(
            "navbar-glow rounded-full transition-all duration-300",
            "bg-black/10 backdrop-blur-lg px-3 py-2 sm:px-6 sm:py-3",
            "border border-blue-500/30",
            isScrolled && "bg-black/80",
            "hover:border-blue-400/50"
          )}>
            <Link href="/" className="nav-content flex items-center">
              <img 
                src="/assets/Atomiv White Full Transparent.svg" 
                alt="Atomiv" 
                className="h-6 sm:h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Items - Center */}
          <div className={cn(
            "navbar-glow rounded-full transition-all duration-300 hidden md:block",
            "bg-black/10 backdrop-blur-lg px-2 py-2",
            "border border-blue-500/30",
            isScrolled && "bg-black/80",
            "hover:border-blue-400/50"
          )}>
            <div className="nav-content flex items-center gap-1">
              {items.map((item) => {
                const isActive = activeTab === item.name

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "cursor-pointer text-sm font-medium px-4 lg:px-6 py-2 rounded-full transition-all duration-300",
                      "text-white/70 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/20",
                      isActive && "text-white bg-white/10 shadow-md shadow-white/30"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* CTA Button - Right */}
          <div className={cn(
            "navbar-glow rounded-full transition-all duration-300",
            "bg-black/10 backdrop-blur-lg px-3 py-2 sm:px-6 sm:py-3",
            "border border-blue-500/30",
            isScrolled && "bg-black/80",
            "hover:border-blue-400/50"
          )}>
            <Button
              asChild
              size="sm"
              className="nav-content bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/40 border border-blue-400/50 text-sm"
            >
              <Link href="/demo">
                <span className="sm:inline">Get Free Demo</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col min-h-screen pt-20 p-6">
            {/* Navigation Items */}
            <nav className="flex flex-col space-y-4 mb-8">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => handleLinkClick(item.name)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                      "border text-lg font-medium",
                      isActive 
                        ? "bg-blue-600/20 border-blue-500/30 text-white shadow-lg" 
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon size={24} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* CTA Button */}
            <div className="mt-auto pb-8">
              <Button
                asChild
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-xl font-semibold shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/demo">
                  Get Free Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 