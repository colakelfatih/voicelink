import { NextResponse } from 'next/server';
import { generateToken } from '@/services/livekit';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room');
    const username = searchParams.get('username');

    if (!room || !username) {
      return NextResponse.json(
        { error: 'Missing room or username parameter' },
        { status: 400 }
      );
    }

    const token = await generateToken(room, username);
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
} 