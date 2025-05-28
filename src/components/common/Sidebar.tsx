'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

const Sidebar: React.FC = () => {
  const sidebarItems: SidebarItem[] = [
    { icon: '/images/img_vector_0_white_a700.svg', label: 'Home', href: '/home', isActive: true },
    { icon: '/images/img_vector_0_white_a700_24x24.svg', label: 'Direct Messages', href: '/messages' },
    { icon: '/images/img_vector_0_24x24.svg', label: 'Friends', href: '/friends' },
    { icon: '/images/img_vector_0_1.svg', label: 'Activity', href: '/activity' },
    { icon: '/images/img_vector_0_2.svg', label: 'Nitro', href: '/nitro' },
  ];

  const bottomItems: SidebarItem[] = [
    { icon: '/images/img_vector_0_3.svg', label: 'Voice Connected', href: '/voice' },
    { icon: '/images/img_vector_0_4.svg', label: 'User Settings', href: '/settings' },
  ];

  return (
    <aside className="bg-gray-900 w-80 h-full flex flex-col p-6">
      {/* Main Navigation */}
      <nav className="flex-1">
        {sidebarItems.map((item, index) => (
          <div key={index} className="mb-4">
            {item.isActive ? (
              <div className="bg-gray-700 rounded-2xl p-4 flex items-center space-x-3">
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <span className="text-white text-sm font-medium">{item.label}</span>
              </div>
            ) : (
              <Link href={item.href} className="flex items-center space-x-3 p-4 hover:bg-gray-800 rounded-2xl transition-colors">
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <span className="text-white text-sm font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="space-y-4">
        {bottomItems.map((item, index) => (
          <Link key={index} href={item.href} className="flex items-center space-x-3 p-4 hover:bg-gray-800 rounded-2xl transition-colors">
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <span className="text-white text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;