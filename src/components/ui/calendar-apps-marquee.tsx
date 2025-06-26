import { Marquee } from "@/components/ui/marquee"
import Image from "next/image"

const Logos = {
  googleCalendar: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/google-calendar-2020.svg" 
          alt="Google Calendar" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Google Calendar</span>
    </div>
  ),
  
  calendly: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/calendly-logo.svg" 
          alt="Calendly" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Calendly</span>
    </div>
  ),
  
  calCom: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/cal-com-logo.png" 
          alt="Cal.com" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Cal.com</span>
    </div>
  ),
  
  outlook: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/outlook-calendar-logo.svg" 
          alt="Outlook Calendar" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Outlook Calendar</span>
    </div>
  ),
  
  appleCalendar: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/apple-calendar-logo.svg" 
          alt="Apple Calendar" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Apple Calendar</span>
    </div>
  ),
  
  notion: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/notion-logo.png" 
          alt="Notion" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Notion</span>
    </div>
  ),
  
  googleMeet: () => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm flex items-center justify-center flex-shrink-0">
        <Image 
          src="/assets/google-meet-logo.webp" 
          alt="Google Meet" 
          width={24} 
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
      <span className="text-white/60 text-sm font-medium whitespace-nowrap">Google Meet</span>
    </div>
  ),
};

export function CalendarAppsMarquee() {
  const apps = [
    Logos.googleCalendar,
    Logos.calendly,
    Logos.calCom,
    Logos.outlook,
    Logos.appleCalendar,
    Logos.notion,
    Logos.googleMeet,
  ]

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm font-medium">
          Seamless integration with your favorite apps
        </p>
      </div>
      
      <div className="relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <Marquee direction="left" className="py-4">
          {apps.map((Logo, index) => (
            <div
              key={index}
              className="relative h-full w-fit mx-[3rem] flex items-center justify-start"
            >
              <Logo />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
} 