'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, Phone, Clock, DollarSign } from 'lucide-react'

export function LiveStats() {
  const [stats, setStats] = useState({
    callsHandled: 12847,
    businessesServed: 247,
    moneyEarned: 1240000,
    uptime: 99.9
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        callsHandled: prev.callsHandled + Math.floor(Math.random() * 3),
        businessesServed: prev.businessesServed + (Math.random() > 0.95 ? 1 : 0),
        moneyEarned: prev.moneyEarned + Math.floor(Math.random() * 500),
        uptime: 99.9 + (Math.random() * 0.09)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    }
    return num.toLocaleString()
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 bg-white/5 border-white/10 text-center">
        <Phone className="h-6 w-6 text-blue-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">{stats.callsHandled.toLocaleString()}</div>
        <div className="text-sm text-gray-400">Calls Handled</div>
        <div className="flex items-center justify-center mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          <span className="text-xs text-green-400">Live</span>
        </div>
      </Card>

      <Card className="p-4 bg-white/5 border-white/10 text-center">
        <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">{stats.businessesServed}</div>
        <div className="text-sm text-gray-400">Businesses Served</div>
        <div className="text-xs text-green-400 mt-1">+{Math.floor(stats.businessesServed * 0.1)} this month</div>
      </Card>

      <Card className="p-4 bg-white/5 border-white/10 text-center">
        <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">{formatNumber(stats.moneyEarned)}</div>
        <div className="text-sm text-gray-400">Revenue Generated</div>
        <div className="text-xs text-yellow-400 mt-1">For our clients</div>
      </Card>

      <Card className="p-4 bg-white/5 border-white/10 text-center">
        <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">{stats.uptime.toFixed(1)}%</div>
        <div className="text-sm text-gray-400">Uptime</div>
        <div className="text-xs text-purple-400 mt-1">24/7 availability</div>
      </Card>
    </div>
  )
} 