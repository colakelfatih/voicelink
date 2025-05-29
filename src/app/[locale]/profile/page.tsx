'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/common/Header';
import Sidebar from '@/components/Sidebar';

const ProfilePage: React.FC = () => {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6 mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-[#0C78F2] flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">JD</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">John Doe</h1>
                  <p className="text-gray-600 dark:text-[#9BABBA]">@johndoe</p>
                </div>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('gamesPlayed')}</h3>
                <p className="text-3xl font-bold text-[#0C78F2]">42</p>
              </div>
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('winRate')}</h3>
                <p className="text-3xl font-bold text-[#0C78F2]">68%</p>
              </div>
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('rank')}</h3>
                <p className="text-3xl font-bold text-[#0C78F2]">#12</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('recentActivity')}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E2328] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#0C78F2] flex items-center justify-center">
                      <span className="text-white text-sm">JD</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Won a game</p>
                      <p className="text-sm text-gray-600 dark:text-[#9BABBA]">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-[#0C78F2] font-medium">+25 points</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E2328] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#0C78F2] flex items-center justify-center">
                      <span className="text-white text-sm">JD</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Joined a new room</p>
                      <p className="text-sm text-gray-600 dark:text-[#9BABBA]">5 hours ago</p>
                    </div>
                  </div>
                  <span className="text-[#0C78F2] font-medium">New room</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 