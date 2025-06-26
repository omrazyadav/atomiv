'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, Users, Calendar, FileText, 
  Settings, LogOut, Menu, X, ChevronRight,
  Phone, Mail, TrendingUp, Eye, CheckCircle
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Demo Pages', href: '/admin/demos', icon: Eye },
    { name: 'Finalization Requests', href: '/admin/finalization-requests', icon: CheckCircle },
    { name: 'Quote Requests', href: '/admin/quotes', icon: FileText },
    { name: 'Demo Requests', href: '/admin/demo-requests', icon: Calendar },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-white/10 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 px-6 border-b border-white/10">
            <img src="/assets/Atomiv White Full Transparent.svg" alt="Atomiv AI" className="h-8" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {active && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 p-4">
            <Button
              variant="outline"
              className="w-full justify-start border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              onClick={() => {
                localStorage.removeItem('atomiv_admin_auth')
                localStorage.removeItem('atomiv_admin_password')
                window.location.href = '/'
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Exit Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : ''}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Administrator</p>
                <p className="text-xs text-gray-400">admin@atomiv.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 