'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { FileText, Search, Mail, Phone, Building, Calendar, DollarSign } from 'lucide-react'

interface QuoteRequest {
  id: string
  business_name: string
  business_type: string
  contact_person: string
  email: string
  phone: string
  call_volume: string
  current_solution: string
  special_requirements: string
  status: string
  created_at: string
}

export default function QuoteRequestsAdmin() {
  const { authenticated, loading: authLoading } = useAdminAuth()
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (authenticated) {
    fetchQuotes()
    }
  }, [authenticated])

  const fetchQuotes = async () => {
    try {
      const password = localStorage.getItem('atomiv_admin_password')
      if (!password) return
      
      const response = await fetch(`/api/admin/quotes?password=${encodeURIComponent(password)}`)
      if (response.ok) {
        const data = await response.json()
        setQuotes(data)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'quoted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'closed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
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

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter
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
          <div className="text-white">Loading quote requests...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Quote Requests</h1>
            <p className="text-gray-400 mt-1">Manage pricing requests and proposals</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {quotes.length} Total
          </Badge>
        </div>

        <Card className="p-4 bg-white/5 border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by business, contact, or email..."
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
              <option value="quoted">Quoted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </Card>

        {filteredQuotes.length > 0 ? (
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <Card key={quote.id} className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 rounded-full p-3">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{quote.business_name}</h3>
                      <p className="text-gray-400">{quote.business_type}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">{quote.email}</span>
                        </div>
                        {quote.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{quote.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Contact Person</p>
                    <p className="text-white">{quote.contact_person}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Call Volume</p>
                    <p className="text-white">{quote.call_volume}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Current Solution</p>
                    <p className="text-white">{quote.current_solution || 'None'}</p>
                  </div>
                </div>

                {quote.special_requirements && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">Special Requirements</p>
                    <p className="text-white">{quote.special_requirements}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{formatDate(quote.created_at)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                      Send Quote
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-500/20 text-green-400 hover:bg-green-500/10">
                      Mark Closed
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-white/5 border-white/10 text-center">
            <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No quote requests found</h3>
            <p className="text-gray-400">Quote requests will appear here when submitted</p>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
} 