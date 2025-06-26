'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, Users, Clock, CheckCircle } from 'lucide-react'
import { LiveStats } from '@/components/ui/live-stats'

export function Stats() {
  const stats = [
    {
      icon: Phone,
      number: "10,000+",
      label: "Calls Handled",
      description: "Successfully managed for our clients",
      color: "text-blue-600"
    },
    {
      icon: Users,
      number: "100+",
      label: "Active Clients",
      description: "Growing businesses we serve",
      color: "text-green-600"
    },
    {
      icon: Clock,
      number: "< 2 sec",
      label: "Response Time",
      description: "Instant customer answers",
      color: "text-purple-600"
    },
    {
      icon: CheckCircle,
      number: "99%",
      label: "Customer Satisfaction",
      description: "Clients love our AI service",
      color: "text-orange-600"
    }
  ]

  return (
    <section className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-blue-500/20 text-blue-400 px-4 py-2 text-sm mb-4">
            📊 Real Results
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-blue-400">Growing Businesses</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join successful business owners who've transformed their customer 
            service with our AI phone assistant.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                <div className="space-y-4">
                  <div className={`p-3 rounded-2xl bg-white/10 w-fit mx-auto`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.replace('text-', 'text-').replace('-600', '-400')}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-3xl lg:text-4xl font-bold ${stat.color.replace('text-', 'text-').replace('-600', '-400')}`}>
                      {stat.number}
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {stat.label}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Live Platform Statistics</h3>
            <p className="text-gray-300">Real-time data from our AI network</p>
          </div>
          <LiveStats />
        </motion.div>

        {/* Customer Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <blockquote className="text-xl text-gray-300 italic">
              "Our AI receptionist has been a game-changer. We went from missing calls 
              to answering every single one. Our booking rate increased significantly!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-left">
                <div className="font-semibold text-white">Sarah Martinez</div>
                <div className="text-sm text-gray-400">Owner, Bella Hair Studio</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 