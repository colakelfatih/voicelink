import { useState } from 'react';

interface Room {
  name: string;
  numParticipants: number;
  createdAt: string;
  maxParticipants?: number;
}

interface CreateRoomData {
  name: string;
  maxParticipants?: number;
}

const ROOM_STORAGE_KEY = 'game_talk_rooms';

export const useRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRoomToStorage = (room: Room) => {
    if (typeof window === 'undefined') return;
    const rooms = JSON.parse(localStorage.getItem(ROOM_STORAGE_KEY) || '{}');
    rooms[room.name] = {
      maxParticipants: room.maxParticipants,
      createdAt: room.createdAt
    };
    localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(rooms));
  };

  const getRoomFromStorage = (roomName: string) => {
    if (typeof window === 'undefined') return null;
    const rooms = JSON.parse(localStorage.getItem(ROOM_STORAGE_KEY) || '{}');
    return rooms[roomName] || null;
  };

  const createRoom = async (roomData: CreateRoomData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const data = await response.json();
      saveRoomToStorage({
        ...data,
        maxParticipants: roomData.maxParticipants
      });
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (roomName: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rooms', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      // Remove room from storage
      if (typeof window !== 'undefined') {
        const rooms = JSON.parse(localStorage.getItem(ROOM_STORAGE_KEY) || '{}');
        delete rooms[roomName];
        localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(rooms));
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const listRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rooms');
      
      if (!response.ok) {
        throw new Error('Failed to list rooms');
      }

      const data = await response.json();
      return data as Room[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const canJoinRoom = (room: Room) => {
    const storedRoom = getRoomFromStorage(room.name);
    if (!storedRoom) return true;

    // Check participant limit
    if (storedRoom.maxParticipants && room.numParticipants >= storedRoom.maxParticipants) {
      return false;
    }

    return true;
  };

  const getToken = async (roomName: string, participantName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/token?room=${roomName}&username=${participantName}`);

      if (!response.ok) {
        throw new Error('Failed to get token');
      }

      const data = await response.json();
      return data.token;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createRoom,
    deleteRoom,
    listRooms,
    getToken,
    canJoinRoom,
    getRoomFromStorage,
    loading,
    error,
  };
}; 