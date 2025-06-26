'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Calendar, Search, Mail, Phone, Clock, User, Building } from 'lucide-react'

interface DemoRequest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  business_type: string
  timeframe: string
  preferred_demo_time: string
  status: string
  created_at: string
}

export default function DemoRequestsAdmin() {
  const { authenticated, loading: authLoading } = useAdminAuth()
  const [demos, setDemos] = useState<DemoRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (authenticated) {
      fetchDemos()
    }
  }, [authenticated])

  const fetchDemos = async () => {
    try {
      const password = localStorage.getItem('atomiv_admin_password')
      if (!password) return
      
      const response = await fetch(`/api/admin/demo-requests?password=${encodeURIComponent(password)}`)
      if (response.ok) {
        const data = await response.json()
        setDemos(data)
      }
    } catch (error) {
      console.error('Error fetching demo requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
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

  const filteredDemos = demos.filter(demo => {
    const matchesSearch = demo.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || demo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Checking authentication...</div>
        </div>
      </AdminLayout>
    )
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading demo requests...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Demo Requests</h1>
            <p className="text-gray-400 mt-1">Manage demo scheduling and follow-ups</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              {demos.filter(d => d.status === 'pending').length} Pending
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Total: {demos.length}
            </Badge>
          </div>
        </div>

        <Card className="p-4 bg-white/5 border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, company, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </Card>

        {filteredDemos.length > 0 ? (
          <div className="space-y-4">
            {filteredDemos.map((demo) => (
              <Card key={demo.id} className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/20 rounded-full p-3">
                      <Calendar className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {demo.first_name} {demo.last_name}
                      </h3>
                      <p className="text-gray-400">{demo.company_name} • {demo.business_type}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">{demo.email}</span>
                        </div>
                        {demo.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{demo.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(demo.status)}>
                    {demo.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Timeframe</p>
                    <p className="text-white">{demo.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Preferred Demo Time</p>
                    <p className="text-white">{demo.preferred_demo_time || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Request Date</p>
                    <p className="text-white">{formatDate(demo.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">
                      Requested {formatDate(demo.created_at)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                      Schedule Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-500/20 text-green-400 hover:bg-green-500/10">
                      Mark Completed
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-white/5 border-white/10 text-center">
            <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No demo requests found</h3>
            <p className="text-gray-400">Demo requests will appear here when submitted</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
} 