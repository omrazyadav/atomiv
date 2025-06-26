import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // Enhanced dark theme styling to match app
      "bg-white/5 border border-white/10 backdrop-blur-sm",
      "[box-shadow:0_8px_32px_rgba(59,130,246,0.15)]",
      "hover:[box-shadow:0_20px_60px_rgba(59,130,246,0.25)]",
      "transition-all duration-500 ease-out",
      "hover:bg-white/10 hover:border-blue-500/30",
      className,
    )}
  >
    <div className="absolute inset-0">{background}</div>
    
    {/* Blue glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
      <Icon className="h-12 w-12 origin-left transform-gpu text-blue-400 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-300" />
      <h3 className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">
        {name}
      </h3>
      <p className="max-w-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{description}</p>
    </div>

    <div
      className={cn(
        "relative z-10 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button 
        variant="ghost" 
        asChild 
        size="sm" 
        className="text-blue-400 hover:text-white hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    
    {/* Subtle overlay */}
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300" />
  </div>
);

export { BentoCard, BentoGrid }; 