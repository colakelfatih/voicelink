'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Notifications from '@/components/ui/Notifications';
import { usePathname } from "next/navigation";

interface HeaderProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="bg-[#293036] border-b border-[#121415]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0C78F2] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">GameTalk</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden p-2 rounded-lg text-[#9BABBA] hover:text-white hover:bg-[#293036]/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-4">
            <Link
              href="/lobby"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/lobby'
                  ? 'bg-[#0C78F2] text-white'
                  : 'text-[#9BABBA] hover:bg-[#293036]/80 hover:text-white'
              }`}
            >
              Lobby
            </Link>
            <Link
              href="/chat"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/chat'
                  ? 'bg-[#0C78F2] text-white'
                  : 'text-[#9BABBA] hover:bg-[#293036]/80 hover:text-white'
              }`}
            >
              Chat
            </Link>
            <Link
              href="/profile"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/profile'
                  ? 'bg-[#0C78F2] text-white'
                  : 'text-[#9BABBA] hover:bg-[#293036]/80 hover:text-white'
              }`}
            >
              Profile
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0C78F2] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-[#293036]" />
            </div>
            <div>
              <p className="text-white text-sm sm:text-base font-medium">John Doe</p>
              <p className="text-[#9BABBA] text-xs sm:text-sm">Online</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}