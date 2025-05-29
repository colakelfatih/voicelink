import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { locales, defaultLocale } from '@/i18n/config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import * as React from 'react';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!params.locale || !locales.includes(params.locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = require(`@/messages/${params.locale}/common.json`);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <LanguageProvider>
            <ThemeProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </ThemeProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 