'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Sidebar from '@/components/Sidebar';

interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  email: string;
  bio: string;
  gamesPlayed: number;
  winRate: number;
  rank: number;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: string;
    points?: number;
  }>;
}

const ProfilePage: React.FC = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      router.push('/lobby');
      return;
    }

    // Simüle edilmiş profil verisi
    const mockProfile: UserProfile = {
      username,
      displayName: username.charAt(0).toUpperCase() + username.slice(1),
      avatar: username.substring(0, 2).toUpperCase(),
      email: `${username}@example.com`,
      bio: t('defaultBio'),
      gamesPlayed: Math.floor(Math.random() * 100),
      winRate: Math.floor(Math.random() * 100),
      rank: Math.floor(Math.random() * 100),
      recentActivity: [
        {
          type: 'win',
          description: t('wonGame'),
          timestamp: '2 hours ago',
          points: 25
        },
        {
          type: 'join',
          description: t('joinedRoom'),
          timestamp: '5 hours ago'
        }
      ]
    };

    setProfile(mockProfile);
    setEditedProfile(mockProfile);
    setIsLoading(false);
  }, [router, t]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (profile && editedProfile) {
      setProfile({ ...profile, ...editedProfile });
      // Burada API çağrısı yapılabilir
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile || {});
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-[#0C78F2] flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">{profile.avatar}</span>
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="displayName"
                          value={editedProfile.displayName}
                          onChange={handleChange}
                          className="text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-primary outline-none"
                        />
                        <input
                          type="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleChange}
                          className="text-gray-600 dark:text-[#9BABBA] bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-primary outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.displayName}</h1>
                        <p className="text-gray-600 dark:text-[#9BABBA]">{profile.email}</p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {isEditing ? (
                    <div className="space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {t('save')}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {t('editProfile')}
                    </button>
                  )}
                </div>
              </div>
              {isEditing ? (
                <div className="mt-6">
                  <textarea
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary outline-none"
                    rows={3}
                    placeholder={t('writeBio')}
                  />
                </div>
              ) : (
                <p className="mt-6 text-gray-600 dark:text-[#9BABBA]">{profile.bio}</p>
              )}
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('gamesPlayed')}</h3>
                <p className="text-3xl font-bold text-[#0C78F2]">{profile.gamesPlayed}</p>
              </div>
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('winRate')}</h3>
                <p className="text-3xl font-bold text-[#0C78F2]">{profile.winRate}%</p>
              </div>
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('rank')}</h3>
                <p className="text-3xl font-bold text-[#0C78F2]">#{profile.rank}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('recentActivity')}</h2>
              <div className="space-y-4">
                {profile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E2328] rounded-lg hover:bg-gray-100 dark:hover:bg-[#2A2F35] transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-sm">{profile.avatar}</span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-600 dark:text-[#9BABBA]">{activity.timestamp}</p>
                      </div>
                    </div>
                    {activity.points && (
                      <span className="text-[#0C78F2] font-medium">+{activity.points} points</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 