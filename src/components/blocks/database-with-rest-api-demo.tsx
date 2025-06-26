"use client";

import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export const DatabaseWithRestApiDemo = () => {
  return (
    <div className="p-4 rounded-xl bg-accent/20 w-full">
      <DatabaseWithRestApi 
        title="Atomiv AI Call Processing System"
        circleText="AI"
        badgeTexts={{
          first: "LISTEN",
          second: "PROCESS",
          third: "RESPOND",
          fourth: "INTEGRATE",
        }}
        buttonTexts={{
          first: "Atomiv AI",
          second: "Voice Engine",
        }}
        lightColor="#3B82F6"
      />
    </div>
  );
}; 