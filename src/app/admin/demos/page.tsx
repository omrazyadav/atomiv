'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import Link from 'next/link'
import { 
  Plus, Eye, Edit, Trash2, Copy, 
  ExternalLink, Clock, Users, BarChart,
  Search, Filter
} from 'lucide-react'

interface DemoPage {
  id: string
  slug: string
  client_name: string
  company_name: string
  title: string
  status: 'draft' | 'active' | 'expired' | 'archived'
  views_count: number
  created_at: string
  expires_at: string | null
  last_viewed_at: string | null
}

export default function DemoPagesAdmin() {
  const { authenticated, loading: authLoading } = useAdminAuth()
  const [demoPages, setDemoPages] = useState<DemoPage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (authenticated) {
    fetchDemoPages()
    }
  }, [authenticated])

  const fetchDemoPages = async () => {
    try {
      const password = localStorage.getItem('atomiv_admin_password')
      if (!password) return
      
      const response = await fetch(`/api/admin/demos?password=${encodeURIComponent(password)}`)
      if (response.ok) {
        const data = await response.json()
        setDemoPages(data)
      }
    } catch (error) {
      console.error('Error fetching demo pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this demo page?')) return
    
    try {
      const response = await fetch(`/api/admin/demos/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setDemoPages(prev => prev.filter(page => page.id !== id))
      }
    } catch (error) {
      console.error('Error deleting demo page:', error)
    }
  }

  const handleClone = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/demos/${id}/clone`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const clonedPage = await response.json()
        setDemoPages(prev => [clonedPage, ...prev])
      }
    } catch (error) {
      console.error('Error cloning demo page:', error)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400'
      case 'draft':
        return 'bg-gray-500/20 text-gray-400'
      case 'expired':
        return 'bg-red-500/20 text-red-400'
      case 'archived':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const filteredPages = demoPages.filter(page => {
    const matchesSearch = page.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter
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
          <div className="text-white">Loading demo pages...</div>
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
            <h1 className="text-3xl font-bold text-white">Demo Pages</h1>
            <p className="text-gray-400 mt-1">Create and manage custom demo pages for your clients</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/demos/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Demo Page
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-white/5 border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by client, company, or URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Demo Pages Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <Card key={page.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{page.client_name}</h3>
                      <p className="text-gray-400">{page.company_name}</p>
                    </div>
                    <Badge className={getStatusColor(page.status)}>
                      {page.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">/demo/{page.slug}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{page.views_count} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">Created {formatDate(page.created_at)}</span>
                    </div>
                    {page.expires_at && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-red-400" />
                        <span className="text-red-400">Expires {formatDate(page.expires_at)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <Link href={`/demo/${page.slug}`} target="_blank">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <Link href={`/admin/demos/${page.id}/edit`}>
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => handleClone(page.id)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-white/5 border-white/10 text-center">
            <Eye className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No demo pages found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Create your first demo page to get started'}
            </p>
            {searchTerm === '' && statusFilter === 'all' && (
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/demos/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Demo Page
                </Link>
              </Button>
            )}
          </Card>
        )}
      </div>
    </AdminLayout>
  )
} 