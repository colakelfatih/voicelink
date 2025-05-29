'use client';

import { useEffect, useState } from 'react';
import { LiveKitRoom, ControlBar } from '@livekit/components-react';
import { Room, RoomEvent } from 'livekit-client';
import '@livekit/components-styles';

interface RoomInfo {
  name: string;
  numParticipants: number;
  maxParticipants: number;
}

export default function RoomPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  // Oda listesini getir
  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms');
      if (!response.ok) throw new Error('Oda listesi alınamadı');
      const data = await response.json();
      setRooms(data.rooms);
    } catch (err) {
      console.error('Oda listesi alınamadı:', err);
    }
  };

  // Yeni oda oluştur
  const createRoom = async () => {
    try {
      setIsCreatingRoom(true);
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'myroom',
          emptyTimeout: 10 * 60,
          maxParticipants: 20,
        }),
      });

      if (!response.ok) throw new Error('Oda oluşturulamadı');
      const data = await response.json();
      console.log('Oda oluşturuldu:', data.room);
      
      // Oda listesini güncelle
      await fetchRooms();
    } catch (err) {
      console.error('Oda oluşturma hatası:', err);
      setError('Oda oluşturulamadı');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  useEffect(() => {
    // Oda listesini getir
    fetchRooms();

    const initializeRoom = async () => {
      try {
        // Önce token al
        const response = await fetch('/api/token?room=test-room&username=test-user');
        if (!response.ok) {
          throw new Error('Token alınamadı');
        }
        const data = await response.json();
        setToken(data.token);

        // Yeni oda oluştur
        const newRoom = new Room({
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
          },
        });

        // Oda olaylarını dinle
        newRoom.on(RoomEvent.Connected, () => {
          console.log('Odaya bağlandı');
        });

        newRoom.on(RoomEvent.Disconnected, () => {
          console.log('Odadan ayrıldı');
        });

        newRoom.on(RoomEvent.Reconnecting, () => {
          console.log('Yeniden bağlanıyor...');
        });

        newRoom.on(RoomEvent.Reconnected, () => {
          console.log('Yeniden bağlandı');
        });

        setRoom(newRoom);

        // Odaya bağlan
        const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
        if (!wsUrl) {
          throw new Error('LiveKit URL bulunamadı');
        }

        console.log('Bağlanılıyor:', wsUrl);
        await newRoom.connect(wsUrl, data.token, {
          autoSubscribe: true,
        });

      } catch (err) {
        console.error('Oda bağlantı hatası:', err);
        setError('Bağlantı kurulamadı. Lütfen tekrar deneyin.');
      }
    };

    initializeRoom();

    // Cleanup
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
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

  if (!token || !room) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C78F2] mx-auto mb-4"></div>
          <p>Bağlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Oda Listesi */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Aktif Odalar</h2>
            <button
              onClick={createRoom}
              disabled={isCreatingRoom}
              className="w-full sm:w-auto bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 disabled:opacity-50 text-sm sm:text-base"
            >
              {isCreatingRoom ? 'Oda Oluşturuluyor...' : 'Yeni Oda Oluştur'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div key={room.name} className="bg-[#293036] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2 text-sm sm:text-base">{room.name}</h3>
                <p className="text-[#9BABBA] text-xs sm:text-sm">
                  Katılımcılar: {room.numParticipants}/{room.maxParticipants}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LiveKit Room */}
        <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          video={false}
          audio={true}
          data-lk-theme="default"
          className="h-[calc(100vh-16rem)]"
        >
          <div className="flex flex-col items-center justify-center h-full text-white p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0C78F2] rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg sm:text-xl mb-8 text-center">Sesli Sohbet Aktif</p>
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
    </div>
  );
} 