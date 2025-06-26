"use client"

import { Home, Zap, DollarSign, HelpCircle, Play } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function AtomivNavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Features', url: '#features', icon: Zap },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'Demo', url: '#demo', icon: Play },
    { name: 'FAQ', url: '#faq', icon: HelpCircle }
  ]

  return <NavBar items={navItems} />
} 