import { NextResponse } from 'next/server';
import { createRoom, deleteRoom, listRooms } from '@/services/livekit';

export async function POST(request: Request) {
  try {
    const { name, maxParticipants, password } = await request.json();
    const room = await createRoom(name, maxParticipants, password);
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rooms = await listRooms();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list rooms' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { roomName } = await request.json();
    await deleteRoom(roomName);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
} 