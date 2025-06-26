'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AdminLayout } from '@/components/admin/admin-layout'
import { useRouter } from 'next/navigation'
import { 
  Save, Eye, Palette, Users, MessageSquare,
  Calendar, Shield, ChevronLeft, Sparkles,
  Plus, Trash2, ArrowRight, Loader2
} from 'lucide-react'

interface Feature {
  icon: string
  title: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  content: string
}

interface DemoPageData {
  id: string
  slug: string
  client_name: string
  company_name: string
  title: string
  elevenlabs_agent_id: string
  status: 'draft' | 'active' | 'expired' | 'archived'
  primary_color: string
  secondary_color: string
  logo_url?: string
  hero_title: string
  hero_subtitle: string
  features: Feature[]
  testimonials: Testimonial[]
  pricing_info?: any
  custom_message?: string
  password_protected: boolean
  password?: string
  expires_at?: string
  created_at: string
  updated_at: string
}

export default function EditDemoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [templates, setTemplates] = useState<any[]>([])
  const [demoId, setDemoId] = useState<string>('')
  
  // Form data
  const [formData, setFormData] = useState({
    // Basic info
    clientName: '',
    companyName: '',
    title: '',
    slug: '',
    
    // ElevenLabs integration
    elevenlabsAgentId: '',
    
    // Customization
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    logoUrl: '',
    
    // Content
    heroTitle: '',
    heroSubtitle: '',
    features: [] as Feature[],
    testimonials: [] as Testimonial[],
    customMessage: '',
    
    // Settings
    passwordProtected: false,
    password: '',
    expiresAt: '',
    status: 'draft' as 'draft' | 'active' | 'expired' | 'archived'
  })

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setDemoId(resolvedParams.id)
      await loadDemoData(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    fetchTemplates()
  }, [])

  const loadDemoData = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/demos/${id}`)
      if (response.ok) {
        const data: DemoPageData = await response.json()
        
        // Populate form data with existing demo data
        setFormData({
          clientName: data.client_name,
          companyName: data.company_name,
          title: data.title,
          slug: data.slug,
          elevenlabsAgentId: data.elevenlabs_agent_id || '',
          primaryColor: data.primary_color || '#3b82f6',
          secondaryColor: data.secondary_color || '#8b5cf6',
          logoUrl: data.logo_url || '',
          heroTitle: data.hero_title || '',
          heroSubtitle: data.hero_subtitle || '',
          features: data.features || [],
          testimonials: data.testimonials || [],
          customMessage: data.custom_message || '',
          passwordProtected: data.password_protected || false,
          password: data.password || '',
          expiresAt: data.expires_at ? new Date(data.expires_at).toISOString().slice(0, 16) : '',
          status: data.status || 'draft'
        })
      } else {
        console.error('Failed to load demo data')
        router.push('/admin/demos')
      }
    } catch (error) {
      console.error('Error loading demo data:', error)
      router.push('/admin/demos')
    } finally {
      setLoading(false)
    }
  }

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template && template.template_data) {
      setFormData(prev => ({
        ...prev,
        heroTitle: template.template_data.hero_title || prev.heroTitle,
        heroSubtitle: template.template_data.hero_subtitle || prev.heroSubtitle,
        features: template.template_data.features || prev.features,
        primaryColor: template.template_data.primary_color || prev.primaryColor,
        secondaryColor: template.template_data.secondary_color || prev.secondaryColor
      }))
      setSelectedTemplate(templateId)
    }
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { icon: 'Sparkles', title: '', description: '' }]
    }))
  }

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', role: '', content: '' }]
    }))
  }

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const newTestimonials = [...formData.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    setFormData(prev => ({ ...prev, testimonials: newTestimonials }))
  }

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (status: 'draft' | 'active') => {
    setSaving(true)
    
    try {
      const response = await fetch(`/api/admin/demos/${demoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: formData.slug,
          clientName: formData.clientName,
          companyName: formData.companyName,
          title: formData.title || `${formData.companyName} Demo`,
          elevenlabsAgentId: formData.elevenlabsAgentId,
          status: status,
          primaryColor: formData.primaryColor,
          secondaryColor: formData.secondaryColor,
          logoUrl: formData.logoUrl,
          heroTitle: formData.heroTitle,
          heroSubtitle: formData.heroSubtitle,
          features: formData.features,
          testimonials: formData.testimonials,
          customMessage: formData.customMessage,
          passwordProtected: formData.passwordProtected,
          password: formData.password,
          expiresAt: formData.expiresAt
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Demo updated successfully:', data)
        router.push('/admin/demos')
      } else {
        const errorData = await response.json()
        console.error('Failed to update demo page:', errorData)
        alert('Failed to update demo page: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error updating demo page:', error)
      alert('Failed to update demo page. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const iconOptions = ['Sparkles', 'Shield', 'Clock', 'Users', 'MessageSquare', 'Calendar', 'Phone']

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="h-6 w-6 animate-spin" />
            Loading demo data...
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => router.push('/admin/demos')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Demo Page</h1>
              <p className="text-gray-400 mt-1">Customize the demo experience for {formData.clientName}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <a href={`/demo/${formData.slug}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleSubmit('draft')}
              disabled={saving || !formData.clientName || !formData.companyName}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleSubmit('active')}
              disabled={saving || !formData.clientName || !formData.companyName || !formData.elevenlabsAgentId}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Publish Demo
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Templates */}
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Apply Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className={`border-white/20 text-white hover:bg-white/10 h-auto p-4 flex-col ${
                      selectedTemplate === template.id ? 'bg-white/10 border-blue-500' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <Sparkles className="h-6 w-6 mb-2" />
                    <span className="text-sm">{template.name}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Basic Information */}
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Smith's Hair Salon"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">/demo/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="smiths-hair-salon"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ElevenLabs Agent ID *
                    <span className="text-gray-400 text-xs ml-2">(Required for AI widget)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.elevenlabsAgentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, elevenlabsAgentId: e.target.value }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="agent_01jyk0wj5ve45vz43a2kz2c2pb"
                  />
                </div>
              </div>
            </Card>

            {/* Customization */}
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Customization
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="h-10 w-20 bg-black/50 border border-white/20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="h-10 w-20 bg-black/50 border border-white/20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Content */}
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="See How AI Transforms Your Business"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hero Subtitle</label>
                  <input
                    type="text"
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Experience the future of customer service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Custom Message</label>
                  <textarea
                    value={formData.customMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a personalized message for this client..."
                    rows={3}
                  />
                </div>

                <Separator className="border-white/10" />

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-300">Features</label>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={addFeature}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="p-4 bg-black/30 rounded-lg space-y-3">
                        <div className="flex items-start gap-3">
                          <select
                            value={feature.icon}
                            onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                            className="px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                          >
                            {iconOptions.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                            className="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400"
                            placeholder="Feature title"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <textarea
                          value={feature.description}
                          onChange={(e) => updateFeature(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400"
                          placeholder="Feature description"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.passwordProtected}
                      onChange={(e) => setFormData(prev => ({ ...prev, passwordProtected: e.target.checked }))}
                      className="w-4 h-4 rounded border-white/20 bg-black/50 text-blue-600"
                    />
                    <span className="text-white">Password protect this demo</span>
                  </label>
                  {formData.passwordProtected && (
                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="mt-3 w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400"
                      placeholder="Enter password"
                    />
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiration Date</label>
                  <input
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-8rem)]">
            <Card className="h-full bg-white/5 border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h3>
              </div>
              <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                {/* Exact replica of the actual demo page */}
                <div className="min-h-full flex flex-col">
                  {/* Minimal Header */}
                  <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
                    <div className="w-full px-4 py-3 sm:py-4">
                      <div className="flex items-center justify-center">
                        <img 
                          src="/assets/Atomiv White Full Transparent.svg" 
                          alt="Atomiv AI" 
                          className="h-6 sm:h-7 md:h-8"
                        />
                      </div>
                    </div>
                  </header>

                  {/* Main Content - Positioned at Top */}
                  <div className="flex-1 flex flex-col items-center justify-start px-4 pt-8 pb-6 space-y-8">
                    {/* Title */}
                    <div className="text-center">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
                        Personalized for {formData.clientName || '[Client Name]'}
                      </Badge>
                      
                      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                        {formData.heroTitle || `Your AI Receptionist for ${formData.companyName || '[Company Name]'}`}
                      </h1>
                    </div>

                    {/* AI Demo Widget - Clean and Centered */}
                    <div className="flex justify-center">
                      <Card className="bg-black backdrop-blur-sm border-white/[0.05] shadow-none w-full max-w-none min-h-[169px] px-48 py-8 flex items-center justify-center">
                        {formData.elevenlabsAgentId ? (
                          <div className="text-center">
                            <div className="h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mb-2 border border-blue-500/20">
                              <Sparkles className="h-6 w-6 text-blue-400 mr-2" />
                              <span className="text-blue-300 text-sm">AI Widget Active</span>
                            </div>
                            <p className="text-gray-400 text-xs">Agent ID: {formData.elevenlabsAgentId.slice(0, 20)}...</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="h-16 bg-gray-500/10 rounded-lg flex items-center justify-center mb-2 border border-gray-500/20">
                              <span className="text-gray-500 text-sm">Add ElevenLabs Agent ID</span>
                            </div>
                            <p className="text-gray-400 text-xs">Widget will appear here</p>
                          </div>
                        )}
                      </Card>
                    </div>

                    {/* Finalization Section with CTA Text */}
                    <div className="text-center">
                      <p className="text-gray-300 text-sm sm:text-base mb-4">
                        Ready to get your own AI receptionist? The final version will be customized specifically for {formData.companyName || '[Company Name]'}.
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-0 mb-4"
                        disabled
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Finalize Your AI Receptionist
                      </Button>

                      {/* Simple Horizontal Checkmarks */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <div className="h-3.5 w-3.5 bg-green-400 rounded-full flex-shrink-0" />
                          <span>Custom for your business</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-3.5 w-3.5 bg-green-400 rounded-full flex-shrink-0" />
                          <span>24/7 availability</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-3.5 w-3.5 bg-green-400 rounded-full flex-shrink-0" />
                          <span>Quick & easy setup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 