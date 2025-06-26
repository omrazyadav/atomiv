import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

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
  metadataBase: new URL("https://atomiv.com"),
  openGraph: {
    title: "Atomiv AI - Professional Voice Assistants for Your Business",
    description: "24/7 AI voice assistants that answer calls, book appointments, and handle customer inquiries for local businesses. Setup in 5 minutes.",
    url: "https://atomiv.com",
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
  verification: {
    google: "your-google-search-console-verification-code", // You'll need to replace this with actual verification code
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Google Analytics ID
const GA_MEASUREMENT_ID = 'G-DKBHZ3L07D';

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
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {/* Google Search Console Verification - Replace with your actual verification code */}
        <meta name="google-site-verification" content="your-verification-code-here" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Atomiv AI" />
        <meta name="keywords" content="AI voice assistant, business automation, call handling, appointment booking, customer service AI, virtual receptionist" />
        <link rel="canonical" href="https://atomiv.com" />
        
        {/* Structured Data for SEO */}
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Atomiv AI",
              "url": "https://atomiv.com",
              "logo": "https://atomiv.com/assets/Atomiv Dashboard Black Full.svg",
              "description": "24/7 AI voice assistants that answer calls, book appointments, and handle customer inquiries for local businesses.",
              "sameAs": [
                "https://twitter.com/atomivai",
                "https://linkedin.com/company/atomivai"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-0123",
                "contactType": "customer service"
              }
            }
          `}
        </Script>
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
