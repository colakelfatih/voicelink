'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#0C78F2] rounded-xl flex items-center justify-center mx-auto">
            <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mt-4">GameTalk</h1>
          <p className="text-[#9BABBA] mt-2">Connect with gamers worldwide</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-[#0C78F2] text-white px-6 py-3 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="block w-full bg-[#293036] text-white px-6 py-3 rounded-lg hover:bg-[#293036]/80 transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#293036] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#0C78F2] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Voice Chat</h3>
            <p className="text-[#9BABBA]">Connect with other gamers through high-quality voice chat</p>
          </div>

          <div className="bg-[#293036] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#0C78F2] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Game Rooms</h3>
            <p className="text-[#9BABBA]">Join game-specific rooms and find players for your favorite games</p>
          </div>
        </div>
      </div>
    </div>
  );
}