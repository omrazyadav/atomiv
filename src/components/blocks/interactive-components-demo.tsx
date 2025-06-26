"use client";

import { Calendar, Code, FileText, User, Clock, Bot, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function InteractiveComponentsDemo() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Component Integration
            <br />
            <span className="text-blue-400">
              Instructions
            </span>
          </h2>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                You are given a task to integrate an existing React component in the codebase
              </p>
              
              <h3 className="text-white text-xl font-semibold mb-4">The codebase should support:</h3>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>- shadcn project structure</li>
                <li>- Tailwind CSS</li>
                <li>- Typescript</li>
              </ul>

              <p className="text-gray-300 mb-6">
                If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.
              </p>

              <p className="text-gray-300 mb-4">
                Determine the default path for components and styles.
              </p>
              
              <p className="text-gray-300 mb-6">
                If default path for components is not /components/ui, provide instructions on why it's important to create this folder
              </p>

              <h3 className="text-white text-xl font-semibold mb-4">Copy-paste this component to /components/ui folder:</h3>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`database-with-rest-api.tsx
"use client";

import React from "react";
import { motion } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG component implementation */}
      {/* ... component implementation ... */}
    </div>
  );
};

export default DatabaseWithRestApi;`}
                </pre>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`demo.tsx
"use client";

import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export const Page = () => {
  return (
    <div className="p-4 rounded-xl bg-accent/20 w-full">
      <DatabaseWithRestApi />
    </div>
  );
};`}
                </pre>
              </div>

              <h3 className="text-white text-xl font-semibold mb-4">Install NPM dependencies:</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <code className="text-blue-400">motion, lucide-react</code>
              </div>

              <h3 className="text-white text-xl font-semibold mb-4">Extend existing globals.css with this code:</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`.database {
  offset-anchor: 10px 0px;
  animation: database-animation-path;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  animation-duration: 4s;
  animation-delay: 1s;
}

.db-light-1 {
  offset-path: path("M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 25");
}

.db-light-2 {
  offset-path: path("M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 25");
}

.db-light-3 {
  offset-path: path("M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 25");
}

.db-light-4 {
  offset-path: path("M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 25");
}

@keyframes database-animation-path {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}`}
                </pre>
              </div>

              <h3 className="text-white text-xl font-semibold mb-4">Implementation Guidelines</h3>
              <ol className="text-gray-300 mb-6 space-y-2 list-decimal list-inside">
                <li>Analyze the component structure and identify all required dependencies</li>
                <li>Review the component's arguments and state</li>
                <li>Identify any required context providers or hooks and install them</li>
              </ol>

              <h3 className="text-white text-xl font-semibold mb-4">Questions to Ask</h3>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>- What data/props will be passed to this component?</li>
                <li>- Are there any specific state management requirements?</li>
                <li>- Are there any required assets (images, icons, etc.)?</li>
                <li>- What is the expected responsive behavior?</li>
                <li>- What is the best place to use this component in the app?</li>
              </ul>

              <h3 className="text-white text-xl font-semibold mb-4">Steps to integrate</h3>
              <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                <li>Copy paste all the code above in the correct directories</li>
                <li>Install external dependencies</li>
                <li>Fill image assets with Unsplash stock images you know exist</li>
                <li>Use lucide-react icons for svgs or logos if component requires them</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 