'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { User, LobbyState } from '@/types/lobby';
import Link from "next/link";

const LobbyPage: React.FC = () => {
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Game Selection */}
          <div className="p-4 border-b border-gray-800">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white text-xl font-medium mb-4">Select Game</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGame(game.id)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      selectedGame === game.id
                        ? 'bg-[#0C78F2] text-white'
                        : 'bg-[#293036] text-[#9BABBA] hover:bg-[#293036]/80'
                    }`}
                  >
                    <h3 className="font-medium">{game.name}</h3>
                    <p className="text-sm">{game.players} players online</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white text-xl font-medium mb-4">Online Players</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-[#293036] rounded-lg p-4 flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#0C78F2] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#293036] ${
                        user.status === 'online' ? 'bg-green-500' :
                        user.status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{user.name}</h3>
                      <p className="text-[#9BABBA] text-sm">{user.game}</p>
                    </div>
                    <Link
                      href={`/chat?room=${user.game.toLowerCase()}&username=${user.name}`}
                      className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
                    >
                      Chat
                    </Link>
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

export default LobbyPage;