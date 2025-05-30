import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    return {
      locale: defaultLocale,
      messages: (await import(`./locales/${defaultLocale}.json`)).default
    };
  }
  
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
}); 