'use client';

import {
    ControlBar,
    LiveKitRoom,
    RoomAudioRenderer,
    useTracks,
    ParticipantTile,
    GridLayout
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Track } from 'livekit-client';
import Header from "@/components/common/Header";

export default function RoomPage() {
  const searchParams = useSearchParams();
  const roomName = searchParams.get('room');
  const username = searchParams.get('username');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!roomName || !username) return;

    const getToken = async () => {
      try {
        const resp = await fetch(`/api/token?room=${roomName}&username=${username}`);
        const data = await resp.json();
        if (data.token) {
          setToken(data.token);
        }
      } catch (e) {
        console.error('Failed to get token:', e);
      }
    };

    getToken();
  }, [roomName, username]);

  // Update participant count when leaving
  useEffect(() => {
    return () => {
      if (roomName) {
        fetch('/api/rooms', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomName })
        }).catch(console.error);
      }
    };
  }, [roomName]);

  if (!roomName || !username) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121415]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error!</h1>
          <p className="mt-2 text-white">Room name or username is missing.</p>
          <Link href="/" className="mt-4 inline-block text-[#0C78F2] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (token === '') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121415]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Connecting to room...</p>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      video={false}
      audio={true}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <div className="flex flex-1">
          {/* Main Content */}
          <div className="flex-1 p-4">
            <MyAudioConference />
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-[#293036]">
            <ControlBar />
          </div>

          <RoomAudioRenderer />
        </div>
      </div>
    </LiveKitRoom>
  );
}

function MyAudioConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Microphone, withPlaceholder: true },
    ],
    { onlySubscribed: false },
  );

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - 200px)' }}>
      <ParticipantTile />
    </GridLayout>
  );
} 