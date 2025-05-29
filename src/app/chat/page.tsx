'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/common/Header';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  ParticipantTile,
  GridLayout,
} from '@livekit/components-react';
import '@livekit/components-styles';

export default function ChatPage() {
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
    <div className="min-h-screen bg-[#121415] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            connect={true}
            video={true}
            audio={true}
            className="h-[calc(100vh-8rem)]"
            data-lk-theme="default"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#293036] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Voice Chat</h2>
                <div className="aspect-video bg-[#121415] rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#0C78F2] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-white text-lg font-medium">Voice Chat Active</p>
                    <p className="text-[#9BABBA] text-sm mt-2">You can now speak with other participants</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ControlBar className="[&_*]:text-white [&_*]:!text-white" controls={{ camera: false, screenShare: false }} />
                </div>
              </div>
              <div className="bg-[#293036] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Connected Users</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#0C78F2] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#293036]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-[#9BABBA] text-sm">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#0C78F2] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#293036]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Jane Smith</p>
                      <p className="text-[#9BABBA] text-sm">Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RoomAudioRenderer />
          </LiveKitRoom>
        </main>
      </div>
    </div>
  );
} 