import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';

const livekitHost = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';
const apiKey = process.env.LIVEKIT_API_KEY || '';
const apiSecret = process.env.LIVEKIT_API_SECRET || '';

const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

export const createRoom = async (roomName: string, maxParticipants?: number, password?: string) => {
  try {
    const room = await roomService.createRoom({
      name: roomName,
      emptyTimeout: 10 * 60, // 10 minutes
      maxParticipants: maxParticipants || 20,
      metadata: password ? JSON.stringify({ password }) : undefined,
    });
    return room;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

export const deleteRoom = async (roomName: string) => {
  try {
    await roomService.deleteRoom(roomName);
    return true;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};

export const listRooms = async () => {
  try {
    const rooms = await roomService.listRooms();
    return rooms;
  } catch (error) {
    console.error('Error listing rooms:', error);
    throw error;
  }
};

export const generateToken = async (roomName: string, participantName: string) => {
  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return await at.toJwt();
}; 