'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { AdminLayout } from '@/components/admin/admin-layout'
import { 
  BarChart, TrendingUp, Eye, Clock, 
  Users, Activity, Calendar, Filter
} from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  avgViewDuration: number
  conversionRate: number
  topDemos: Array<{
    title: string
    views: number
    conversions: number
  }>
  dailyStats: Array<{
    date: string
    views: number
    submissions: number
  }>
  formStats: {
    pricing: { views: number, starts: number, completions: number }
    demo: { views: number, starts: number, completions: number }
    newsletter: { views: number, starts: number, completions: number }
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`)
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading analytics...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="text-white">No analytics data available</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Track performance across all demos and forms</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-600/10 border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Page Views</p>
                <p className="text-3xl font-bold text-white mt-1">{data.totalViews.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+23% from last period</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-600/20 to-green-600/10 border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Unique Visitors</p>
                <p className="text-3xl font-bold text-white mt-1">{data.uniqueVisitors.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+18% from last period</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-600/10 border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg. View Duration</p>
                <p className="text-3xl font-bold text-white mt-1">{data.avgViewDuration}s</p>
                <div className="flex items-center mt-2 text-purple-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Good engagement</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-600/20 to-orange-600/10 border-orange-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold text-white mt-1">{data.conversionRate}%</p>
                <div className="flex items-center mt-2 text-orange-400">
                  <Activity className="h-4 w-4 mr-1" />
                  <span className="text-sm">Above average</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-orange-400" />
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Demos */}
          <Card className="p-6 bg-white/5 border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Top Demo Pages</h3>
            <div className="space-y-4">
              {data.topDemos.map((demo, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium">{demo.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-gray-400 text-sm">{demo.views} views</span>
                      <span className="text-green-400 text-sm">{demo.conversions} conversions</span>
                    </div>
                  </div>
                  <div className="w-32 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: `${(demo.views / data.topDemos[0].views) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Form Performance */}
          <Card className="p-6 bg-white/5 border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Form Performance</h3>
            <div className="space-y-6">
              {Object.entries(data.formStats).map(([formType, stats]) => (
                <div key={formType}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium capitalize">{formType} Form</h4>
                    <span className="text-gray-400 text-sm">
                      {((stats.completions / stats.views) * 100).toFixed(1)}% conversion
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs w-20">Views</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '100%' }} />
                      </div>
                      <span className="text-white text-sm w-12 text-right">{stats.views}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs w-20">Starts</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500" 
                          style={{ width: `${(stats.starts / stats.views) * 100}%` }} 
                        />
                      </div>
                      <span className="text-white text-sm w-12 text-right">{stats.starts}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs w-20">Completed</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(stats.completions / stats.views) * 100}%` }} 
                        />
                      </div>
                      <span className="text-white text-sm w-12 text-right">{stats.completions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Daily Trend Chart (Placeholder) */}
        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">Daily Activity</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <BarChart className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Chart visualization would go here</p>
              <p className="text-sm mt-2">Integrate with Chart.js or Recharts for actual graphs</p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
} 