"use client"

import { AtomivNavBarDemo } from '@/components/blocks/atomiv-navbar-demo'
import { NavBarDemo } from '@/components/blocks/tubelight-navbar-demo'

export default function NavBarDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Atomiv-specific navbar */}
      <AtomivNavBarDemo />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Tubelight Navbar Components
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Beautiful animated navigation bars with tubelight effects. Responsive design 
            that adapts to mobile and desktop views.
          </p>
        </div>

        <div className="grid gap-12 max-w-4xl mx-auto">
          {/* Feature showcase */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Key Features
              </h2>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Smooth animated transitions with Framer Motion</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Responsive design (text on desktop, icons on mobile)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Beautiful tubelight glow effect on active items</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Backdrop blur and glassmorphism effects</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Fixed positioning (top on desktop, bottom on mobile)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Usage Example
              </h2>
              <pre className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, User, Briefcase } from 'lucide-react'

const navItems = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Projects', url: '#projects', icon: Briefcase }
]

<NavBar items={navItems} />`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative demo at bottom for mobile testing */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:hidden">
        <p className="text-xs text-slate-500 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          ↑ Original navbar ↓ Alternative demo
        </p>
      </div>
      
      {/* Alternative navbar for comparison */}
      <div className="sm:relative sm:mt-8">
        <NavBarDemo />
      </div>
    </div>
  )
} 