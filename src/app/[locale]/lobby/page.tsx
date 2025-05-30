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
import { useParams, useRouter } from 'next/navigation';
import { useRoom } from '@/hooks/useRoom';

interface Room {
  name: string;
  numParticipants: number;
  createdAt: string;
}

const LobbyPage: React.FC = () => {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const router = useRouter();
  const { createRoom, listRooms, loading, error, canJoinRoom, getToken, deleteRoom, getRoomFromStorage } = useRoom();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('5');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [username, setUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username') || '';
    }
    return '';
  });

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

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const loadRooms = async () => {
    try {
      const roomList = await listRooms();
      setRooms(roomList);
    } catch (err) {
      console.error('Error loading rooms:', err);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      const roomData = {
        name: newRoomName,
        maxParticipants: parseInt(maxParticipants) || 5
      };
      await createRoom(roomData);
      setNewRoomName('');
      setMaxParticipants('5');
      setIsCreateModalOpen(false);
      loadRooms();
    } catch (err) {
      console.error('Error creating room:', err);
    }
  };

  const handleJoinRoom = (room: Room) => {
    if (!canJoinRoom(room)) {
      alert('Bu oda maksimum katılımcı sayısına ulaştı.');
      return;
    }
    setSelectedRoom(room.name);
    setIsJoinModalOpen(true);
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      alert('Lütfen bir kullanıcı adı girin');
      return;
    }

    if (!selectedRoom) return;

    try {
      const token = await getToken(selectedRoom, username);
      if (token) {
        router.push(`/chat?room=${selectedRoom}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

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

  const handleDeleteRoom = async (roomName: string) => {
    if (!confirm('Bu odayı silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteRoom(roomName);
      loadRooms();
    } catch (err) {
      console.error('Error deleting room:', err);
      alert('Oda silinirken bir hata oluştu');
    }
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
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
              >
                {t('createRoom')}
              </button>
            </div>

            {/* Active Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.name} className="bg-white dark:bg-[#293036] rounded-lg shadow-sm dark:shadow-none overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getRoomFromStorage(room.name)?.password && (
                          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                            {t('passwordProtected')}
                          </span>
                        )}
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                          {t('active')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600 dark:text-[#9BABBA]">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{room.numParticipants}/5 {t('players')}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-[#9BABBA]">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {(() => {
                            try {
                              if (!room.createdAt) return 'Tarih bilgisi yok';
                              const date = new Date(room.createdAt);
                              console.log('asssssss');
                              if (isNaN(date.getTime())) return 'Geçersiz tarih';
                              return date.toLocaleString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              });
                            } catch (error) {
                              console.error('Tarih formatı hatası:', error);
                              return 'Tarih formatı hatası';
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1E2328] px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(room.numParticipants, 3) }).map((_, index) => (
                          <div key={index} className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                            <span className="text-white text-xs">{String.fromCharCode(65 + index)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleJoinRoom(room)}
                          className="text-[#0C78F2] hover:text-[#0C78F2]/80 transition-colors"
                        >
                          {t('join')}
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.name)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#293036] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Room
            </h2>
            <form onSubmit={handleCreateRoom}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-[#1E2328] rounded-lg bg-gray-50 dark:bg-[#1E2328] text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Participants (Optional)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-[#1E2328] rounded-lg bg-gray-50 dark:bg-[#1E2328] text-gray-900 dark:text-white"
                  placeholder="Default: 5"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E2328] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#293036] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Join Room
            </h2>
            <form onSubmit={handleJoinSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#1E2328] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#1E2328] dark:text-white"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default LobbyPage;