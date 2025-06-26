'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black">
              Atomiv
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-black transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-600 hover:text-black transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              className="bg-black hover:bg-gray-800 text-white px-6 py-2"
            >
              <Phone className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-black">
                Features
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-black">
                How It Works
              </a>
              <a href="#pricing" className="block text-gray-600 hover:text-black">
                Pricing
              </a>
              <a href="#faq" className="block text-gray-600 hover:text-black">
                FAQ
              </a>
              <Button className="w-full bg-black hover:bg-gray-800 text-white mt-4">
                <Phone className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 