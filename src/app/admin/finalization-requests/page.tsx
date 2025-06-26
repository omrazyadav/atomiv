'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, Clock, XCircle, User, Building, Calendar,
  Phone, MessageCircle, ExternalLink, Filter
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/admin-layout'

interface FinalizationRequest {
  id: string
  demo_slug: string
  client_name: string
  company_name: string
  demo_title: string
  elevenlabs_agent_id: string
  custom_message?: string
  submitted_at: string
  status: 'pending' | 'contacted' | 'completed' | 'cancelled'
}

export default function FinalizationRequestsPage() {
  const [requests, setRequests] = useState<FinalizationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchRequests()
  }, [filter])

  const fetchRequests = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/admin/finalization-requests' 
        : `/api/admin/finalization-requests?status=${filter}`
      
      const response = await fetch(url)
      const result = await response.json()
      
      if (result.data) {
        setRequests(result.data)
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/finalization-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        await fetchRequests()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case 'contacted':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Contacted</Badge>
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{status}</Badge>
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-gray-400">Loading finalization requests...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Finalization Requests</h1>
            <p className="text-gray-400">Manage demo finalization requests from potential clients</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {requests.length} Total Requests
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-white text-black' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            All ({requests.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
            className={filter === 'pending' ? 'bg-white text-black' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            <Clock className="h-4 w-4 mr-1" />
            Pending
          </Button>
          <Button
            size="sm"
            variant={filter === 'contacted' ? 'default' : 'outline'}
            onClick={() => setFilter('contacted')}
            className={filter === 'contacted' ? 'bg-white text-black' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Contacted
          </Button>
          <Button
            size="sm"
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'bg-white text-black' : 'border-gray-600 text-gray-300 hover:bg-gray-800'}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </Button>
        </div>

        {/* Requests Grid */}
        {requests.length === 0 ? (
          <Card className="p-8 bg-gray-900/50 border-gray-700 text-center">
            <div className="text-gray-400 mb-2">No finalization requests found</div>
            <p className="text-gray-500 text-sm">
              {filter === 'all' 
                ? 'Finalization requests will appear here when users request to finalize their AI demos.'
                : `No ${filter} requests at the moment.`
              }
            </p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="p-6 bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{request.client_name}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Building className="h-4 w-4" />
                        {request.company_name}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">Submitted: {formatDate(request.submitted_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">Demo: {request.demo_slug}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">Demo Title: {request.demo_title || 'AI Receptionist Demo'}</span>
                    </div>
                    {request.elevenlabs_agent_id && (
                      <div className="flex items-center gap-2 text-sm">
                        <MessageCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 truncate">Agent ID: {request.elevenlabs_agent_id}</span>
                      </div>
                    )}
                  </div>
                </div>

                {request.custom_message && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-gray-300 italic">"{request.custom_message}"</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                  <Button
                    size="sm"
                    onClick={() => window.open(`/demo/${request.demo_slug}`, '_blank')}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Demo
                  </Button>
                  
                  {request.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'contacted')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Mark Contacted
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'completed')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Completed
                      </Button>
                    </>
                  )}
                  
                  {request.status === 'contacted' && (
                    <Button
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'completed')}
                      className="bg-green-600 hover:green-blue-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Completed
                    </Button>
                  )}
                  
                  {request.status !== 'cancelled' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateRequestStatus(request.id, 'cancelled')}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 