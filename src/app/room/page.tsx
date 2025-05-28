'use client';

import { useEffect, useState } from 'react';
import { LiveKitRoom, ControlBar } from '@livekit/components-react';
import '@livekit/components-styles';

export default function RoomPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/token?room=test-room&username=test-user');
        if (!response.ok) {
          throw new Error('Token alınamadı');
        }
        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        console.error('Token alma hatası:', err);
        setError('Bağlantı kurulamadı. Lütfen tekrar deneyin.');
      }
    };

    fetchToken();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C78F2] mx-auto mb-4"></div>
          <p>Bağlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        video={false}
        audio={true}
        data-lk-theme="default"
        className="h-screen"
      >
        <div className="flex flex-col items-center justify-center h-full text-white">
          <div className="w-16 h-16 bg-[#0C78F2] rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-xl mb-8">Sesli Sohbet Aktif</p>
          <ControlBar
            controls={{
              camera: false,
              screenShare: false,
              leave: true,
            }}
          />
        </div>
      </LiveKitRoom>
    </div>
  );
} 