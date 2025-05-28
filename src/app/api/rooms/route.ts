import { RoomServiceClient } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_URL || 'http://localhost:7880',
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

// Oda listesini getir
export async function GET() {
  try {
    const rooms = await roomService.listRooms();
    return NextResponse.json({ rooms });
  } catch (error) {
    console.error('Oda listesi alınamadı:', error);
    return NextResponse.json(
      { error: 'Oda listesi alınamadı' },
      { status: 500 }
    );
  }
}

// Yeni oda oluştur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, emptyTimeout, maxParticipants } = body;

    const room = await roomService.createRoom({
      name: name || 'myroom',
      emptyTimeout: emptyTimeout || 10 * 60, // 10 dakika
      maxParticipants: maxParticipants || 20,
    });

    return NextResponse.json({ room });
  } catch (error) {
    console.error('Oda oluşturulamadı:', error);
    return NextResponse.json(
      { error: 'Oda oluşturulamadı' },
      { status: 500 }
    );
  }
} 