'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LiveKitRoom, VideoConference, ControlBar } from '@livekit/components-react';
import '@livekit/components-styles';
import { Room } from 'livekit-client';
import { useRoom } from '@/hooks/useRoom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from 'next-auth/react';

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loading } = useRoom();
  const { locale } = useLanguage();
  const roomName = searchParams?.get('room') || '';

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push(`/${locale}/`);
      return;
    }

    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/token?room=${roomName}&username=${session?.user?.name}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get token');
        }

        setToken(data.token);
        setError(null);
      } catch (err) {
        console.error('Error fetching token:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect to room');
      } finally {
        setIsLoading(false);
      }
    };

    if (roomName && session?.user?.name) {
      fetchToken();
    }
  }, [roomName, session, status, locale, router]);

  const handleLeave = () => {
    router.push(`/${locale}/lobby`);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Connecting to room...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push(`/${locale}/lobby`)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return to Lobby
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className="h-screen">
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        video={true}
        audio={true}
        data-lk-theme="default"
        onDisconnected={handleLeave}
      >
        <VideoConference />
        <ControlBar />
      </LiveKitRoom>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
} 