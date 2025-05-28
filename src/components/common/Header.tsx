'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Notifications from '@/components/ui/Notifications';
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="bg-[#293036] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0C78F2] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-bold text-lg">GameTalk</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              href="/lobby"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/lobby'
                  ? 'bg-[#0C78F2] text-white'
                  : 'text-[#9BABBA] hover:bg-[#293036]/80'
              }`}
            >
              Lobby
            </Link>
            <Link
              href="/chat"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/chat'
                  ? 'bg-[#0C78F2] text-white'
                  : 'text-[#9BABBA] hover:bg-[#293036]/80'
              }`}
            >
              Chat
            </Link>
            <Link
              href="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/profile'
                  ? 'bg-[#0C78F2] text-white'
                  : 'text-[#9BABBA] hover:bg-[#293036]/80'
              }`}
            >
              Profile
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center">
            <Link href="/profile" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#0C78F2] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white text-sm font-medium">John Doe</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;