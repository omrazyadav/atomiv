'use client'

import { Card } from '@/components/ui/card'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Settings } from 'lucide-react'

export default function SettingsAdmin() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your admin panel configuration</p>
        </div>

        <Card className="p-12 bg-white/5 border-white/10 text-center">
          <Settings className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Settings Panel</h3>
          <p className="text-gray-400">Configuration options coming soon</p>
        </Card>
      </div>
    </AdminLayout>
  )
} 