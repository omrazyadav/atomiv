'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Users, Search, Calendar } from 'lucide-react'

interface Lead {
  id: string
  email: string
  business_name: string
  source: string
  status: string
  created_at: string
}

export default function LeadsAdmin() {
  const { authenticated, loading: authLoading } = useAdminAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authenticated) {
      fetchLeads()
    }
  }, [authenticated])

  const fetchLeads = async () => {
    try {
      const password = localStorage.getItem('atomiv_admin_password')
      if (!password) return
      
      const response = await fetch(`/api/admin/leads?password=${encodeURIComponent(password)}`)
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      }
    } finally {
      setLoading(false)
    }
  }

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
          <div className="text-white">Loading leads...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Leads Management</h1>
        <Card className="p-12 bg-white/5 border-white/10 text-center">
          <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Leads Dashboard</h3>
          <p className="text-gray-400">Leads management coming soon</p>
        </Card>
      </div>
    </AdminLayout>
  )
} 