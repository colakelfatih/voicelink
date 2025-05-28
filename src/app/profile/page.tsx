'use client';

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/common/Header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Profile Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Profile Info */}
              <div className="bg-[#293036] rounded-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-[#0C78F2] rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-[#293036]"></div>
                  </div>
                  <div>
                    <h2 className="text-white text-2xl font-medium">John Doe</h2>
                    <p className="text-[#9BABBA]">@johndoe</p>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-[#293036] rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#9BABBA] mb-2">Email</label>
                    <input
                      type="email"
                      value="john.doe@example.com"
                      className="w-full bg-[#121415] text-white px-4 py-2 rounded-lg outline-none"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-[#9BABBA] mb-2">Password</label>
                    <input
                      type="password"
                      value="••••••••"
                      className="w-full bg-[#121415] text-white px-4 py-2 rounded-lg outline-none"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Connections */}
              <div className="bg-[#293036] rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4">Connections</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Friends</h4>
                      <p className="text-[#9BABBA]">Manage your friends list</p>
                    </div>
                    <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Friend Requests</h4>
                      <p className="text-[#9BABBA]">View pending requests</p>
                    </div>
                    <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-[#293036] rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Notifications</h4>
                      <p className="text-[#9BABBA]">Manage notification preferences</p>
                    </div>
                    <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                      Configure
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Audio Settings</h4>
                      <p className="text-[#9BABBA]">Configure voice and audio</p>
                    </div>
                    <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                      Configure
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white">Appearance</h4>
                      <p className="text-[#9BABBA]">Customize your interface</p>
                    </div>
                    <button className="bg-[#0C78F2] text-white px-4 py-2 rounded-lg hover:bg-[#0C78F2]/80 transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 