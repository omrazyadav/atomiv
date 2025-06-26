import {
  Phone,
  Calendar,
  MessageSquare,
  BarChart,
  Clock,
  Users,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: Phone,
    name: "24/7 Call Handling",
    description: "Never miss a customer call again. Our AI answers instantly, day or night.",
    href: "#contact",
    cta: "Start Today",
    background: (
      <div className="absolute inset-0">
        {/* Phone network pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <div className="absolute top-8 left-8 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" />
          <div className="absolute top-16 right-12 w-3 h-3 bg-blue-500/40 rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-blue-300/50 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-8 right-8 w-5 h-5 bg-blue-400/25 rounded-full animate-pulse delay-700" />
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M 50 50 Q 150 100 250 150" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" />
            <path d="M 80 200 Q 180 150 280 100" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        {/* Floating phone icon effect */}
        <div className="absolute bottom-6 right-6 opacity-10">
          <Phone className="w-20 h-20 text-blue-400" />
        </div>
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Calendar,
    name: "Smart Scheduling",
    description: "AI automatically books appointments and manages your calendar seamlessly.",
    href: "#contact",
    cta: "Learn More",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 to-purple-500/6">
          {/* Calendar grid pattern */}
          <div className="absolute inset-6 grid grid-cols-7 gap-1 opacity-20">
            {Array.from({ length: 28 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-full h-3 rounded-sm ${
                  [5, 12, 19].includes(i) 
                    ? 'bg-blue-400/60 animate-pulse' 
                    : 'bg-blue-300/20'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          
          {/* Floating calendar icon */}
          <div className="absolute bottom-4 right-4 opacity-10">
            <Calendar className="w-16 h-16 text-blue-400" />
          </div>
        </div>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: MessageSquare,
    name: "Natural Conversations",
    description: "Human-like voice interactions that customers love.",
    href: "#contact",
    cta: "Try Demo",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-400/10 to-indigo-500/8">
          {/* Chat bubbles */}
          <div className="absolute top-6 left-6 max-w-32">
            <div className="bg-blue-400/20 rounded-2xl rounded-tl-sm p-3 mb-2 text-xs text-blue-200 backdrop-blur-sm">
              Hello! How can I help?
            </div>
            <div className="bg-blue-500/15 rounded-2xl rounded-tr-sm p-3 ml-6 text-xs text-blue-200 backdrop-blur-sm">
              Book appointment
            </div>
          </div>
          
          {/* Sound waves */}
          <div className="absolute bottom-8 right-8 flex items-center space-x-1">
            {[1, 2, 3, 4, 3, 2, 1].map((height, i) => (
              <div 
                key={i}
                className="bg-blue-400/40 animate-pulse"
                style={{ 
                  width: '3px', 
                  height: `${height * 8}px`,
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: BarChart,
    name: "Analytics Dashboard",
    description: "Track call metrics, conversion rates, and customer insights.",
    href: "#contact",
    cta: "View Stats",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/12 to-cyan-500/8">
          {/* Animated chart bars */}
          <div className="absolute bottom-6 left-6 right-6 h-20 flex items-end justify-between">
            {[0.4, 0.7, 0.3, 0.8, 0.6, 0.9, 0.5].map((height, i) => (
              <div 
                key={i}
                className="bg-blue-400/40 rounded-t-sm animate-pulse flex-1 mx-0.5"
                style={{ 
                  height: `${height * 100}%`,
                  animationDelay: `${i * 200}ms`
                }}
              />
            ))}
          </div>
          
          {/* Data points */}
          <div className="absolute top-8 right-8 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" />
              <span className="text-xs text-blue-200/60">98% Success</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse delay-300" />
              <span className="text-xs text-blue-200/60">24/7 Active</span>
            </div>
          </div>
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Clock,
    name: "Instant Response",
    description: "Sub-second response times ensure customers never wait on hold.",
    href: "#contact",
    cta: "Get Started",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/8">
          {/* Clock face */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 border-2 border-blue-400/30 rounded-full relative">
              {/* Clock numbers */}
              <div className="absolute inset-2 rounded-full border border-blue-300/20">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                  <div
                    key={num}
                    className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${num * 30}deg) translateY(-8px)`,
                    }}
                  />
                ))}
              </div>
              
              {/* Clock hands */}
              <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-blue-400/60 rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full rotate-90 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-blue-300/80 rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full rotate-180 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
          
          {/* Speed indicators */}
          <div className="absolute bottom-6 left-6 space-y-1">
            <div className="text-xs text-blue-200/60">Response time:</div>
            <div className="text-lg font-bold text-blue-300">0.3s</div>
          </div>
        </div>
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function BentoDemo() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="border border-blue-500/30 bg-blue-500/10 py-2 px-4 rounded-lg backdrop-blur-sm">
              <span className="text-blue-300 font-medium text-sm">Features</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Everything your business needs in one
            <span className="text-blue-400"> AI assistant</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From call handling to appointment booking, our AI voice assistant handles 
            all customer interactions with human-like conversations and instant responses.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
} 