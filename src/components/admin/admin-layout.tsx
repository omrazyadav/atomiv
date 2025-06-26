'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { isSupabaseConfigured } from '@/lib/supabase'
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Database,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { authenticated, loading } = useAdminAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState('')

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-300">Enter the admin password to continue</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const password = formData.get('password') as string
            if (password === 'atomiv2025') {
              localStorage.setItem('atomiv_admin_password', password)
              window.location.reload()
            } else {
              alert('Invalid password')
            }
          }}>
            <input
              type="password"
              name="password"
              placeholder="Admin password"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              required
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Access Admin Panel
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  // Check if Supabase is configured for admin functionality
  if (!isSupabaseConfigured()) {
    const sqlScript = `-- Create tables for Atomiv AI admin panel

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  business_name VARCHAR(255),
  business_type VARCHAR(100),
  source VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo pages table
CREATE TABLE demo_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  client_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  elevenlabs_agent_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'draft',
  primary_color VARCHAR(7) DEFAULT '#3b82f6',
  secondary_color VARCHAR(7) DEFAULT '#8b5cf6',
  logo_url TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  features JSONB DEFAULT '[]',
  testimonials JSONB DEFAULT '[]',
  custom_message TEXT,
  password_protected BOOLEAN DEFAULT FALSE,
  password VARCHAR(255),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Quote requests table
CREATE TABLE quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  business_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  business_type VARCHAR(100) NOT NULL,
  call_volume VARCHAR(100) NOT NULL,
  current_solution TEXT,
  special_requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  quoted_amount DECIMAL(10,2),
  quote_sent_at TIMESTAMP WITH TIME ZONE,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo requests table
CREATE TABLE demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  business_name VARCHAR(255),
  business_type VARCHAR(100),
  call_volume VARCHAR(100),
  timeframe VARCHAR(100),
  current_solution TEXT,
  preferred_time VARCHAR(255),
  message TEXT,
  demo_scheduled_at TIMESTAMP WITH TIME ZONE,
  demo_completed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  source VARCHAR(100),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Form analytics table
CREATE TABLE form_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type VARCHAR(50) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_demo_pages_slug ON demo_pages(slug);
CREATE INDEX idx_demo_pages_status ON demo_pages(status);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_demo_requests_status ON demo_requests(status);
CREATE INDEX idx_form_analytics_form_type ON form_analytics(form_type);`

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl p-8 bg-white/10 backdrop-blur-lg border-white/20">
          <div className="text-center mb-8">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Database Setup Required</h1>
            <p className="text-gray-300 text-lg">
              The admin panel requires a Supabase database to store demo pages, leads, and analytics.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">1</Badge>
                Create a Supabase Project
              </h3>
              <p className="text-gray-300 mb-4">
                Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                  supabase.com <ExternalLink className="h-4 w-4" />
                </a> and create a new project.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">2</Badge>
                Get Your Environment Variables
              </h3>
              <p className="text-gray-300 mb-4">
                From your Supabase project settings, copy these values and add them to your <code className="bg-black/30 px-2 py-1 rounded">.env.local</code> file:
              </p>
              
              <div className="space-y-3">
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-green-400">NEXT_PUBLIC_SUPABASE_URL</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('NEXT_PUBLIC_SUPABASE_URL=your_project_url', 'url')}
                    >
                      {copied === 'url' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm">Found in Project Settings → API → Project URL</p>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-green-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key', 'key')}
                    >
                      {copied === 'key' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm">Found in Project Settings → API → anon public key</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">3</Badge>
                Create Database Tables
              </h3>
              <p className="text-gray-300 mb-4">
                Run this SQL in your Supabase SQL Editor to create the required tables:
              </p>
              
              <div className="bg-black/50 rounded-lg p-4 relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(sqlScript, 'sql')}
                >
                  {copied === 'sql' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto pr-8">
{`-- Create tables for Atomiv AI admin panel
-- (Click copy button to get full SQL)`}
                </pre>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">4</Badge>
                Restart Development Server
              </h3>
              <p className="text-gray-300 mb-4">
                After adding the environment variables, restart your development server:
              </p>
              <div className="bg-black/50 rounded-lg p-4">
                <code className="text-green-400">npm run dev</code>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Database className="mr-2 h-4 w-4" />
              I've completed the setup - Check again
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Demo Pages', href: '/admin/demos', icon: Eye },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Demo Requests', href: '/admin/demo-requests', icon: MessageSquare },
    { name: 'Quotes', href: '/admin/quotes', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const handleLogout = () => {
    localStorage.removeItem('atomiv_admin_password')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-black/50 backdrop-blur-lg border-r border-white/10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="ml-3 text-xl font-bold text-white">Atomiv AI</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-400">admin@atomiv.com</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 