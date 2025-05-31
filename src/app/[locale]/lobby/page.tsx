'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';

interface Room {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'playing';
  gameType: string;
  createdAt: string;
}

const LobbyPage: React.FC = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const { locale } = useLanguage();
  const { data: session, status } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedGameType, setSelectedGameType] = useState('cssource');
  const [maxPlayers, setMaxPlayers] = useState(100);

  const updateRoomList = useCallback(() => {
    const storedRooms = localStorage.getItem('gameRooms');
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push(`/${locale}/`);
      return;
    }

    updateRoomList();
  }, [status, locale, router, updateRoomList]);

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) {
      alert(t('roomNameRequired'));
      return;
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      name: newRoomName,
      players: 1,
      maxPlayers,
      status: 'waiting',
      gameType: selectedGameType,
      createdAt: new Date().toISOString()
    };

    const updatedRooms = [newRoom, ...rooms];
    localStorage.setItem('gameRooms', JSON.stringify(updatedRooms));
    setRooms(updatedRooms);
    setShowCreateRoom(false);
    setNewRoomName('');
    setSelectedGameType('battlefield1');
    setMaxPlayers(2);
  };

  const handleJoinRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    if (room.players >= room.maxPlayers) {
      alert(t('maxParticipantsExceeded'));
      return;
    }

    const updatedRooms = rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, players: r.players + 1 };
      }
      return r;
    });

    localStorage.setItem('gameRooms', JSON.stringify(updatedRooms));
    setRooms(updatedRooms);
    router.push(`/${locale}/chat?room=${roomId}`);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm(t('deleteRoomConfirm'))) {
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      localStorage.setItem('gameRooms', JSON.stringify(updatedRooms));
      setRooms(updatedRooms);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('gameRooms')}</h1>
              <button
                onClick={() => setShowCreateRoom(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('createNewRoom')}
              </button>
            </div>

            {showCreateRoom && (
              <div className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('createNewRoom')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('roomName')}
                    </label>
                    <input
                      type="text"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1E2328] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('enterRoomName')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('gameType')}
                    </label>
                    <select
                      value={selectedGameType}
                      onChange={(e) => setSelectedGameType(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1E2328] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="battlefield1">{t('battlefield1')}</option>
                      <option value="cssource">{t('cssource')}</option>
                      <option value="csgo">{t('csgo')}</option>
                      <option value="dota2">{t('dota2')}</option>
                      <option value="fortnite">{t('fortnite')}</option>
                      <option value="lol">{t('lol')}</option>
                      <option value="valorant">{t('valorant')}</option>
                      <option value="overwatch">{t('overwatch')}</option>
                      <option value="apex">{t('apex')}</option>
                      <option value="cod">{t('cod')}</option>
                      <option value="minecraft">{t('minecraft')}</option>
                      <option value="gtav">{t('gtav')}</option>
                      <option value="fifa23">{t('fifa23')}</option>
                      <option value="pubg">{t('pubg')}</option>
                      <option value="r6">{t('r6')}</option>
                      <option value="wow">{t('wow')}</option>
                      <option value="hearthstone">{t('hearthstone')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('maxPlayers')}
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="8"
                      value={maxPlayers}
                      onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1E2328] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowCreateRoom(false)}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      onClick={handleCreateRoom}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      {t('create')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      room.status === 'waiting' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {room.status === 'waiting' ? t('waiting') : t('playing')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('gameType')}: {t(room.gameType)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('players')}: {room.players}/{room.maxPlayers}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('createdAt')}: {new Date(room.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      {t('delete')}
                    </button>
                    <button
                      onClick={() => handleJoinRoom(room.id)}
                      className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
                    >
                      {t('join')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;

