'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/common/Header';
import Sidebar from '@/components/Sidebar';

const SettingsPage: React.FC = () => {
  const t = useTranslations('common');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t('settings')}</h1>
          
          <div className="space-y-6">
            {/* Theme Settings */}
            <div className="bg-white dark:bg-[#293036] rounded-lg p-6 shadow-sm dark:shadow-none">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('appearance')}</h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-[#9BABBA]">{t('darkMode')}</span>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C78F2] focus:ring-offset-2 ${
                    theme === 'dark' ? 'bg-[#0C78F2]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Language Settings */}
            <div className="bg-white dark:bg-[#293036] rounded-lg p-6 shadow-sm dark:shadow-none">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('language')}</h2>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-[#9BABBA]">{t('selectLanguage')}</span>
                <select className="bg-white dark:bg-[#1E2328] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C78F2]">
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
                </select>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-[#293036] rounded-lg p-6 shadow-sm dark:shadow-none">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('notifications')}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-[#9BABBA]">{t('pushNotifications')}</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#0C78F2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C78F2] focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-[#9BABBA]">{t('emailNotifications')}</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0C78F2] focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 