'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, Mail, Calendar, TrendingUp, 
  Eye, Clock, Phone, Building, 
  MapPin, MessageSquare, ArrowUp, ArrowDown,
  FileText, DollarSign, Activity, Plus
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/admin-layout'
import Link from 'next/link'

interface AdminData {
  leads: any[]
  quotes: any[]
  demos: any[]
  subscribers: any[]
  analytics: any[]
  demoPages: any[]
  stats: {
    totalLeads: number
    totalQuotes: number
    totalDemos: number
    totalSubscribers: number
    pendingQuotes: number
    pendingDemos: number
    activeDemoPages: number
    totalDemoViews: number
  }
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // Check for existing authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('atomiv_admin_auth')
    const storedPassword = localStorage.getItem('atomiv_admin_password')
    if (isAuthenticated === 'true' && storedPassword) {
      setPassword(storedPassword)
      setAuthenticated(true)
      fetchDataWithPassword(storedPassword)
    }
  }, [])

  const fetchDataWithPassword = async (adminPassword: string) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/admin/dashboard?password=${encodeURIComponent(adminPassword)}`)
      const result = await response.json()
      
      if (response.ok) {
        setData(result)
        setAuthenticated(true)
        // Store authentication state
        localStorage.setItem('atomiv_admin_auth', 'true')
        localStorage.setItem('atomiv_admin_password', adminPassword)
      } else {
        setError(result.error || 'Failed to fetch data')
        // Clear stored auth on failure
        localStorage.removeItem('atomiv_admin_auth')
        localStorage.removeItem('atomiv_admin_password')
        setAuthenticated(false)
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    await fetchDataWithPassword(password)
  }

  const refreshData = async () => {
    if (!authenticated) return
    setRefreshing(true)
    const storedPassword = localStorage.getItem('atomiv_admin_password')
    if (storedPassword) {
      await fetchDataWithPassword(storedPassword)
    }
    setRefreshing(false)
  }

  useEffect(() => {
    if (authenticated) {
      const interval = setInterval(refreshData, 60000) // Refresh every 60 seconds instead of 30
      return () => clearInterval(interval)
    }
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <Card className="p-8 bg-white/5 border-white/10 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-blue-600 rounded-lg p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Atomiv Admin</h1>
            <p className="text-gray-400">Enter password to access dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
            
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading dashboard...</div>
        </div>
      </AdminLayout>
    )
  }

  // Calculate growth percentages (mock data for now)
  const growthStats = {
    leads: 23.5,
    quotes: 18.2,
    demos: 45.3,
    revenue: 32.1
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={refreshData}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/admin/demos/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-white mt-1">{data.stats.totalLeads}</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">+{growthStats.leads}%</span>
                  <span className="text-gray-400 text-sm ml-2">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded-full p-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Demo Pages</p>
                <p className="text-3xl font-bold text-white mt-1">{data.stats.activeDemoPages}</p>
                <div className="flex items-center mt-2">
                  <Activity className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">{data.stats.totalDemoViews} views</span>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded-full p-3">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Quote Requests</p>
                <p className="text-3xl font-bold text-white mt-1">{data.stats.totalQuotes}</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-gray-500/20 text-gray-400">
                    {data.stats.pendingQuotes} pending
                  </Badge>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded-full p-3">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Demo Requests</p>
                <p className="text-3xl font-bold text-white mt-1">{data.stats.totalDemos}</p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {data.stats.pendingDemos} to schedule
                  </Badge>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded-full p-3">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Recent Leads</h3>
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link href="/admin/leads">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {data.leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 rounded-full p-2">
                      <Users className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{lead.email}</p>
                      <p className="text-gray-400 text-sm">
                        {lead.business_name || 'No business name'} • {lead.source}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`
                      ${lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' : ''}
                      ${lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${lead.status === 'qualified' ? 'bg-green-500/20 text-green-400' : ''}
                    `}>
                      {lead.status}
                    </Badge>
                    <p className="text-gray-500 text-xs mt-1">{formatDate(lead.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Demo Pages */}
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Active Demo Pages</h3>
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link href="/admin/demos">Manage</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {(data.demoPages || []).slice(0, 5).map((demo: any) => (
                <div key={demo.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 rounded-full p-2">
                      <Eye className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{demo.client_name}</p>
                      <p className="text-gray-400 text-sm">{demo.company_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{demo.views_count} views</p>
                    <p className="text-gray-500 text-xs">/{demo.slug}</p>
                  </div>
                </div>
              ))}
              {(!data.demoPages || data.demoPages.length === 0) && (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No demo pages created yet</p>
                  <Button asChild size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                    <Link href="/admin/demos/new">Create First Demo</Link>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 h-auto py-4 flex-col">
              <Link href="/admin/demos/new">
                <Eye className="h-6 w-6 mb-2" />
                <span>Create Demo</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 h-auto py-4 flex-col">
              <Link href="/admin/quotes">
                <FileText className="h-6 w-6 mb-2" />
                <span>View Quotes</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 h-auto py-4 flex-col">
              <Link href="/admin/demo-requests">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Demo Requests</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 h-auto py-4 flex-col">
              <Link href="/admin/analytics">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Analytics</span>
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
} 