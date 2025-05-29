'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { User, LobbyState } from '@/types/lobby';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const LobbyPage: React.FC = () => {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params?.locale as string || 'en';

  const [lobbyState, setLobbyState] = useState<LobbyState>({
    isConnected: true,
    isMuted: false,
    connectedUsers: [],
    currentUser: {
      id: 'current-user',
      name: 'You',
      avatar: '/images/img_depth_4_frame_2.png',
      status: 'online'
    }
  });

  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { id: 'valorant', name: 'Valorant', players: 12 },
    { id: 'csgo', name: 'CS:GO', players: 8 },
    { id: 'lol', name: 'League of Legends', players: 15 },
    { id: 'dota2', name: 'Dota 2', players: 10 },
  ];

  const users = [
    { id: 1, name: 'John Doe', game: 'Valorant', status: 'online' },
    { id: 2, name: 'Jane Smith', game: 'CS:GO', status: 'online' },
    { id: 3, name: 'Mike Johnson', game: 'League of Legends', status: 'away' },
    { id: 4, name: 'Sarah Wilson', game: 'Dota 2', status: 'offline' },
  ];

  useEffect(() => {
    // Initialize connected users
    const users: User[] = [
      {
        id: '1',
        name: 'Alex',
        avatar: '/images/img_depth_6_frame_0.png',
        status: 'online',
        isMuted: false,
        isSpeaking: true
      },
      {
        id: '2',
        name: 'Jordan',
        avatar: '/images/img_depth_6_frame_0_56x56.png',
        status: 'online',
        isMuted: true,
        isSpeaking: false
      },
      {
        id: '3',
        name: 'Chris',
        avatar: '/images/img_depth_6_frame_0_1.png',
        status: 'online',
        isMuted: false,
        isSpeaking: true
      },
      {
        id: '4',
        name: 'Taylor',
        avatar: '/images/img_depth_6_frame_0_2.png',
        status: 'online',
        isMuted: true,
        isSpeaking: false
      }
    ];
    setLobbyState(prev => ({
      ...prev,
      connectedUsers: users
    }));
  }, []);

  const handleMuteToggle = () => {
    setLobbyState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  };

  const handleUserMuteToggle = (userId: string) => {
    setLobbyState(prev => ({
      ...prev,
      connectedUsers: prev.connectedUsers.map(user =>
        user.id === userId ? { ...user, isMuted: !user.isMuted } : user
      )
    }));
  };

  const handleUserSpeakerToggle = (userId: string) => {
    setLobbyState(prev => ({
      ...prev,
      connectedUsers: prev.connectedUsers.map(user =>
        user.id === userId ? { ...user, isSpeaking: !user.isSpeaking } : user
      )
    }));
  };

  const handleLeaveChannel = () => {
    setLobbyState(prev => ({
      ...prev,
      isConnected: false
    }));
    alert('Left the channel');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Lobby Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('gameLobby')}</h1>
              <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                {t('createRoom')}
              </button>
            </div>

            {/* Active Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Room Card */}
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Valorant Squad</h3>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                      {t('active')}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-[#9BABBA]">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>4/5 {t('players')}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-[#9BABBA]">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>2 {t('hoursAgo')}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E2328] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-xs">JD</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-xs">JS</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-xs">MS</span>
                      </div>
                    </div>
                    <a
                      href={`/${locale}/chat`}
                      className="text-[#0C78F2] hover:text-[#0C78F2]/80 transition-colors"
                    >
                      {t('join')}
                    </a>
                  </div>
                </div>
              </div>

              {/* More Room Cards */}
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CS:GO Team</h3>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                      {t('active')}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-[#9BABBA]">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>3/5 {t('players')}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-[#9BABBA]">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>1 {t('hourAgo')}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E2328] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-xs">AB</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-xs">CD</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                        <span className="text-white text-xs">EF</span>
                      </div>
                    </div>
                    <a
                      href={`/${locale}/chat`}
                      className="text-[#0C78F2] hover:text-[#0C78F2]/80 transition-colors"
                    >
                      {t('join')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;