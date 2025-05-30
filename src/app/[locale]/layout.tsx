import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@/styles/index.css';
import { locales } from '@/i18n/config';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  // Validate locale
  if (!locales.includes(locale as any)) notFound();

  let messages: Record<string, string>;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <LanguageProvider>
              <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-1">
                  <main className="flex-1 overflow-auto">{children}</main>
                </div>
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
