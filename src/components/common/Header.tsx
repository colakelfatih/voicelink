'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Notifications from '@/components/ui/Notifications';
import { usePathname } from "next/navigation";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('common');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as 'en' | 'tr');
  };

  return (
    <header className="bg-white dark:bg-[#293036] border-b border-gray-200 dark:border-[#1E2328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-gray-900 dark:text-white text-xl font-bold">
              GameTalk
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href={`/${locale}/lobby`}
              className="text-gray-600 dark:text-[#9BABBA] hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('lobby')}
            </Link>
            <Link
              href={`/${locale}/chat`}
              className="text-gray-600 dark:text-[#9BABBA] hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('chat')}
            </Link>
            <Link
              href={`/${locale}/settings`}
              className="text-gray-600 dark:text-[#9BABBA] hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('settings')}
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-[#9BABBA] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1E2328] transition-colors"
              title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="bg-white dark:bg-[#1E2328] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg outline-none"
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>

            {/* Profile Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-[#9BABBA] hover:text-gray-900 dark:hover:text-white">
                <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                  <span className="text-white text-sm">JD</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}