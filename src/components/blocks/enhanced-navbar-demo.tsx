"use client"

import { Home, Zap, DollarSign, HelpCircle, Play, Cog } from 'lucide-react'
import { EnhancedNavBar } from "@/components/ui/enhanced-tubelight-navbar"

export function EnhancedNavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'How It Works', url: '#how-it-works', icon: Cog },
    { name: 'Features', url: '#features', icon: Zap },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'FAQ', url: '#faq', icon: HelpCircle }
  ]

  return <EnhancedNavBar items={navItems} />
} 