'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0C78F2] rounded-xl flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">GameTalk</h1>
          <p className="text-[#9BABBA] mt-2 text-sm sm:text-base">Welcome back!</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#293036] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C78F2] text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm sm:text-base font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#293036] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C78F2] text-sm sm:text-base"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-[#0C78F2] bg-[#293036] border-[#293036] rounded focus:ring-[#0C78F2]"
              />
              <label htmlFor="remember" className="ml-2 text-[#9BABBA]">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-[#0C78F2] hover:text-[#0C78F2]/80">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0C78F2] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#0C78F2]/80 transition-colors text-sm sm:text-base"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 sm:mt-8 text-center text-[#9BABBA] text-sm sm:text-base">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#0C78F2] hover:text-[#0C78F2]/80">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
} 