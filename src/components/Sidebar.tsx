'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#121415] min-h-screen p-4">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <div className="w-12 h-12 bg-[#0C78F2] rounded-xl flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="ml-3 text-xl font-bold text-white">GameTalk</span>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            pathname === '/' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>

        <Link
          href="/lobby"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            pathname === '/lobby' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Lobby
        </Link>

        <Link
          href="/chat"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            pathname === '/chat' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Chat
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            pathname === '/settings' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Settings
        </Link>

        <Link
          href="/profile"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            pathname === '/profile' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
          }`}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Profile
        </Link>

        {/* Auth Links */}
        <div className="pt-4 mt-4 border-t border-[#293036]">
          <Link
            href="/login"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === '/login' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Login
          </Link>

          <Link
            href="/register"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === '/register' ? 'bg-[#0C78F2] text-white' : 'text-[#9BABBA] hover:bg-[#293036]'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
} 