'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121415]">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C78F2]/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex flex-col items-center text-center">
            <Image src="/logo.png" alt="GameTalk" width={150} height={150} className="mb-8" />
            <h1 className="text-5xl font-bold text-white mb-6">
              Connect with Gamers Worldwide
            </h1>
            <p className="text-xl text-[#9BABBA] mb-8 max-w-2xl">
              Join GameTalk, the ultimate voice chat platform for gamers. Create rooms, chat with friends, and enhance your gaming experience.
            </p>
            <div className="flex gap-4">
              <Link
                href="/register"
                className="bg-[#0C78F2] text-white px-8 py-3 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/lobby"
                className="bg-[#293036] text-white px-8 py-3 rounded-lg hover:bg-[#293036]/80 transition-colors"
              >
                Join Lobby
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose GameTalk?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#293036] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#0C78F2] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Voice Chat Rooms</h3>
            <p className="text-[#9BABBA]">Create and join voice chat rooms with your friends and fellow gamers.</p>
          </div>

          <div className="bg-[#293036] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#0C78F2] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Chat</h3>
            <p className="text-[#9BABBA]">Stay connected with text chat and share your gaming moments.</p>
          </div>

          <div className="bg-[#293036] p-6 rounded-lg">
            <div className="w-12 h-12 bg-[#0C78F2] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-[#9BABBA]">Your conversations are encrypted and your privacy is our priority.</p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-[#293036] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
            <p className="text-[#9BABBA] mb-6">Perfect for casual gamers</p>
            <div className="text-3xl font-bold text-white mb-6">$0<span className="text-[#9BABBA] text-lg">/month</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic voice chat
              </li>
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Up to 5 users per room
              </li>
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic chat features
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full bg-[#0C78F2] text-white text-center px-6 py-3 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#0C78F2] rounded-lg p-8 relative">
            <div className="absolute top-0 right-0 bg-[#293036] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
            <p className="text-white/80 mb-6">For serious gamers</p>
            <div className="text-3xl font-bold text-white mb-6">$9.99<span className="text-white/80 text-lg">/month</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                HD voice quality
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Up to 20 users per room
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Advanced chat features
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom room themes
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full bg-white text-[#0C78F2] text-center px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#293036] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
            <p className="text-[#9BABBA] mb-6">For gaming communities</p>
            <div className="text-3xl font-bold text-white mb-6">$19.99<span className="text-[#9BABBA] text-lg">/month</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Ultra HD voice quality
              </li>
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited users per room
              </li>
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                All Pro features
              </li>
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center text-[#9BABBA]">
                <svg className="w-5 h-5 text-[#0C78F2] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom branding
              </li>
            </ul>
            <Link
              href="/register"
              className="block w-full bg-[#0C78F2] text-white text-center px-6 py-3 rounded-lg hover:bg-[#0C78F2]/80 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#293036] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src="/logo.png" alt="GameTalk" width={100} height={100} className="mb-4" />
              <p className="text-[#9BABBA]">Connect with gamers worldwide through voice chat.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-[#9BABBA] hover:text-white">Home</Link></li>
                <li><Link href="/lobby" className="text-[#9BABBA] hover:text-white">Lobby</Link></li>
                <li><Link href="/chat" className="text-[#9BABBA] hover:text-white">Chat</Link></li>
                <li><Link href="/settings" className="text-[#9BABBA] hover:text-white">Settings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-[#9BABBA] hover:text-white">Help Center</Link></li>
                <li><Link href="/terms" className="text-[#9BABBA] hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-[#9BABBA] hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/contact" className="text-[#9BABBA] hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-[#9BABBA] hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#9BABBA] hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#9BABBA] hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#121415] mt-8 pt-8 text-center">
            <p className="text-[#9BABBA]">&copy; 2024 GameTalk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}