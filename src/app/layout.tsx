import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atomiv AI - Professional Voice Assistants for Your Business",
  description: "24/7 AI voice assistants that answer calls, book appointments, and handle customer inquiries for local businesses. Setup in 5 minutes.",
  icons: {
    icon: [
      {
        url: "/assets/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/assets/favicon.svg",
        sizes: "any",
      },
    ],
    shortcut: "/assets/favicon.svg",
    apple: "/assets/favicon.svg",
  },
  metadataBase: new URL("https://atomiv.vercel.app"),
  openGraph: {
    title: "Atomiv AI - Professional Voice Assistants for Your Business",
    description: "24/7 AI voice assistants that answer calls, book appointments, and handle customer inquiries for local businesses. Setup in 5 minutes.",
    url: "https://atomiv.vercel.app",
    siteName: "Atomiv AI",
    images: [
      {
        url: "/assets/Atomiv Dashboard Black Full.svg",
        width: 1200,
        height: 630,
        alt: "Atomiv AI - Professional Voice Assistants",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atomiv AI - Professional Voice Assistants for Your Business",
    description: "24/7 AI voice assistants that answer calls, book appointments, and handle customer inquiries for local businesses. Setup in 5 minutes.",
    images: ["/assets/Atomiv Dashboard Black Full.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/assets/favicon.svg" />
        <link rel="apple-touch-icon" href="/assets/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
