'use client';

import React from 'react';
import Image from 'next/image';

const Notifications: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-10 h-10 bg-gray-700 rounded-2xl flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
        <Image 
          src="/images/img_vector_0.svg" 
          alt="Notifications" 
          width={20} 
          height={20}
        />
      </div>
    </div>
  );
};

export default Notifications;