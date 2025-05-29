'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/common/Header';
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const ChatPage: React.FC = () => {
  const t = useTranslations('common');
  const [token, setToken] = useState('');
  const [roomName] = useState('main-lobby');
  const [username] = useState('user-' + Math.random().toString(36).substring(7));

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/token?room=${roomName}&username=${username}`
        );
        const data = await resp.json();
        if (data.token) {
          setToken(data.token);
        } else {
          console.error('Failed to get token:', data.error);
        }
      } catch (e) {
        console.error('Error fetching token:', e);
      }
    })();
  }, [roomName, username]);

  if (token === '') {
    return (
      <div className="min-h-screen bg-[#121415] flex items-center justify-center">
        <div className="text-white">Connecting to room...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white dark:bg-[#293036] border-b border-gray-200 dark:border-[#1E2328] p-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#0C78F2] flex items-center justify-center">
                <span className="text-white text-sm">JD</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">John Doe</h2>
                <p className="text-sm text-gray-600 dark:text-[#9BABBA]">Online</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Message from other user */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                <span className="text-white text-xs">JD</span>
              </div>
              <div className="bg-gray-100 dark:bg-[#1E2328] rounded-lg p-3 max-w-[70%]">
                <p className="text-gray-900 dark:text-white">Hey, how's it going?</p>
                <span className="text-xs text-gray-500 dark:text-[#9BABBA]">10:30 AM</span>
              </div>
            </div>

            {/* Your message */}
            <div className="flex items-start justify-end space-x-3">
              <div className="bg-[#0C78F2] rounded-lg p-3 max-w-[70%]">
                <p className="text-white">I'm good! Just playing some games. How about you?</p>
                <span className="text-xs text-white/70">10:31 AM</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0C78F2] flex items-center justify-center">
                <span className="text-white text-xs">ME</span>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="bg-white dark:bg-[#293036] border-t border-gray-200 dark:border-[#1E2328] p-4">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder={t('typeMessage')}
                className="flex-1 bg-gray-50 dark:bg-[#1E2328] text-gray-900 dark:text-white border border-gray-200 dark:border-[#1E2328] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C78F2]"
              />
              <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 