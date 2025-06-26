'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Eye, Sparkles, Phone, Calendar, MessageSquare, 
  Clock, Users, Shield, Plus, Trash2, Move,
  Palette, Type, Image, Layout, Settings
} from 'lucide-react'

interface Section {
  id: string
  type: 'hero' | 'features' | 'testimonials' | 'cta' | 'custom'
  content: any
  visible: boolean
}

interface DemoBuilderProps {
  initialData?: any
  onSave?: (data: any) => void
  onPreview?: () => void
}

export function DemoPageBuilder({ initialData, onSave, onPreview }: DemoBuilderProps) {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Your AI Receptionist for [Company Name]',
        subtitle: 'Experience the future of customer service',
        agentId: '',
        badge: 'Personalized for [Client Name]'
      },
      visible: true
    },
    {
      id: 'features',
      type: 'features',
      content: {
        features: [
          {
            icon: 'Phone',
            title: '24/7 Availability',
            description: 'Never miss a call, even after hours'
          },
          {
            icon: 'Calendar',
            title: 'Smart Scheduling',
            description: 'Automatically book appointments'
          },
          {
            icon: 'Users',
            title: 'Professional Service',
            description: 'Consistent, professional interactions'
          }
        ]
      },
      visible: true
    },
    {
      id: 'cta',
      type: 'cta',
      content: {
        title: 'Ready to get your own AI receptionist?',
        subtitle: 'The final version will be customized specifically for [Company Name]',
        buttonText: 'Finalize Your AI Receptionist',
        benefits: [
          'Custom for your business',
          '24/7 availability',
          'Quick & easy setup'
        ]
      },
      visible: true
    }
  ])

  const [selectedSection, setSelectedSection] = useState<string | null>('hero')
  const [theme, setTheme] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    backgroundColor: '#000000',
    textColor: '#ffffff'
  })

  const iconMap = {
    Phone, Calendar, MessageSquare, Clock, Users, Shield, Sparkles
  }

  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: `${type}_${Date.now()}`,
      type,
      content: getSectionDefaults(type),
      visible: true
    }
    setSections([...sections, newSection])
  }

  const getSectionDefaults = (type: Section['type']) => {
    switch (type) {
      case 'hero':
        return {
          title: 'New Hero Title',
          subtitle: 'Hero subtitle',
          agentId: '',
          badge: 'Custom Badge'
        }
      case 'features':
        return {
          features: [
            { icon: 'Sparkles', title: 'New Feature', description: 'Feature description' }
          ]
        }
      case 'testimonials':
        return {
          testimonials: [
            { name: 'John Doe', role: 'Business Owner', content: 'Great service!' }
          ]
        }
      case 'cta':
        return {
          title: 'Call to Action',
          subtitle: 'Subtitle for CTA',
          buttonText: 'Get Started',
          benefits: ['Benefit 1', 'Benefit 2']
        }
      default:
        return {}
    }
  }

  const updateSection = (sectionId: string, newContent: any) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, content: { ...section.content, ...newContent } }
        : section
    ))
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId))
  }

  const toggleSectionVisibility = (sectionId: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    ))
  }

  const renderSectionEditor = (section: Section) => {
    const IconComponent = iconMap[section.content.features?.[0]?.icon as keyof typeof iconMap] || Sparkles

    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Badge Text</label>
              <input
                type="text"
                value={section.content.badge || ''}
                onChange={(e) => updateSection(section.id, { badge: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="Personalized for [Client Name]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="Your AI Receptionist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <input
                type="text"
                value={section.content.subtitle || ''}
                onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="Experience the future of customer service"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ElevenLabs Agent ID</label>
              <input
                type="text"
                value={section.content.agentId || ''}
                onChange={(e) => updateSection(section.id, { agentId: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="agent_01jyk0wj5ve45vz43a2kz2c2pb"
              />
            </div>
          </div>
        )
      
      case 'features':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Features</label>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  const newFeatures = [...(section.content.features || []), {
                    icon: 'Sparkles',
                    title: 'New Feature',
                    description: 'Feature description'
                  }]
                  updateSection(section.id, { features: newFeatures })
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Feature
              </Button>
            </div>
            {(section.content.features || []).map((feature: any, index: number) => (
              <div key={index} className="p-3 bg-black/30 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <select
                    value={feature.icon}
                    onChange={(e) => {
                      const newFeatures = [...section.content.features]
                      newFeatures[index] = { ...feature, icon: e.target.value }
                      updateSection(section.id, { features: newFeatures })
                    }}
                    className="px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                  >
                    {Object.keys(iconMap).map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...section.content.features]
                      newFeatures[index] = { ...feature, title: e.target.value }
                      updateSection(section.id, { features: newFeatures })
                    }}
                    className="flex-1 px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                    placeholder="Feature title"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-red-400 hover:text-red-300"
                    onClick={() => {
                      const newFeatures = section.content.features.filter((_: any, i: number) => i !== index)
                      updateSection(section.id, { features: newFeatures })
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <textarea
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...section.content.features]
                    newFeatures[index] = { ...feature, description: e.target.value }
                    updateSection(section.id, { features: newFeatures })
                  }}
                  className="w-full px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                  placeholder="Feature description"
                  rows={2}
                />
              </div>
            ))}
          </div>
        )

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="Ready to get your own AI receptionist?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <input
                type="text"
                value={section.content.subtitle || ''}
                onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="The final version will be customized..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
              <input
                type="text"
                value={section.content.buttonText || ''}
                onChange={(e) => updateSection(section.id, { buttonText: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                placeholder="Finalize Your AI Receptionist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Benefits</label>
              {(section.content.benefits || []).map((benefit: string, index: number) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => {
                      const newBenefits = [...section.content.benefits]
                      newBenefits[index] = e.target.value
                      updateSection(section.id, { benefits: newBenefits })
                    }}
                    className="flex-1 px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                    placeholder="Benefit"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-red-400 hover:text-red-300"
                    onClick={() => {
                      const newBenefits = section.content.benefits.filter((_: any, i: number) => i !== index)
                      updateSection(section.id, { benefits: newBenefits })
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  const newBenefits = [...(section.content.benefits || []), 'New benefit']
                  updateSection(section.id, { benefits: newBenefits })
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Benefit
              </Button>
            </div>
          </div>
        )

      default:
        return <div>Custom section editor</div>
    }
  }

  const renderPreviewSection = (section: Section) => {
    if (!section.visible) return null

    switch (section.type) {
      case 'hero':
        return (
          <div className="text-center space-y-6">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {section.content.badge || 'Demo Badge'}
            </Badge>
            <h1 className="text-3xl font-bold text-white">
              {section.content.title || 'Demo Title'}
            </h1>
            <p className="text-gray-300">
              {section.content.subtitle || 'Demo subtitle'}
            </p>
            {section.content.agentId && (
              <div className="p-4 bg-black rounded-lg border border-white/10">
                <p className="text-gray-400 text-sm mb-2">AI Widget Placeholder</p>
                <div className="h-16 bg-white/5 rounded flex items-center justify-center">
                  <span className="text-gray-500">ElevenLabs Widget</span>
                </div>
              </div>
            )}
          </div>
        )

      case 'features':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Features</h2>
            <div className="grid gap-4">
              {(section.content.features || []).map((feature: any, index: number) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Sparkles
                return (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'cta':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">{section.content.title}</h2>
            <p className="text-gray-300">{section.content.subtitle}</p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {section.content.buttonText}
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-400">
              {(section.content.benefits || []).map((benefit: string, index: number) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 bg-green-400 rounded-full" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Custom section</div>
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Editor Side */}
      <div className="space-y-6">
        {/* Theme Controls */}
        <Card className="p-4 bg-white/5 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme & Colors
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="h-8 w-16 bg-black/50 border border-white/20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="h-8 w-16 bg-black/50 border border-white/20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Add Sections */}
        <Card className="p-4 bg-white/5 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Add Sections
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => addSection('hero')}
            >
              <Type className="h-4 w-4 mr-2" />
              Hero
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => addSection('features')}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Features
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => addSection('testimonials')}
            >
              <Users className="h-4 w-4 mr-2" />
              Testimonials
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => addSection('cta')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call to Action
            </Button>
          </div>
        </Card>

        {/* Sections List */}
        <Card className="p-4 bg-white/5 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Page Sections</h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedSection === section.id
                    ? 'bg-blue-500/20 border-blue-500/50'
                    : 'bg-black/30 border-white/10 hover:bg-white/5'
                }`}
                onClick={() => setSelectedSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Move className="h-4 w-4 text-gray-400" />
                    <span className="text-white capitalize">{section.type}</span>
                    {!section.visible && <Badge variant="secondary" className="text-xs">Hidden</Badge>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSectionVisibility(section.id)
                      }}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-red-400 hover:text-red-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSection(section.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section Editor */}
        {selectedSection && (
          <Card className="p-4 bg-white/5 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Edit {sections.find(s => s.id === selectedSection)?.type} Section
            </h3>
            {renderSectionEditor(sections.find(s => s.id === selectedSection)!)}
          </Card>
        )}
      </div>

      {/* Preview Side */}
      <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-8rem)]">
        <Card className="h-full bg-white/5 border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Live Preview
            </h3>
          </div>
          <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="p-8 space-y-8">
              {sections.map((section) => (
                <div key={section.id} className={selectedSection === section.id ? 'ring-2 ring-blue-500 rounded-lg p-2' : ''}>
                  {renderPreviewSection(section)}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 