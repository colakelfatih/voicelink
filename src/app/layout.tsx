import React from 'react';
import '../styles/index.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageProvider } from '@/contexts/LanguageContext';


export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'GameTalk',
  description: 'Connect with gamers worldwide',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
