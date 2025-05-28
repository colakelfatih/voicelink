'use client';

import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'online' | 'offline' | 'away';
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'online',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variants = {
    online: 'bg-green-100 text-green-800',
    offline: 'bg-gray-100 text-gray-800',
    away: 'bg-yellow-100 text-yellow-800',
  };
  
  const chipClasses = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <span className={chipClasses}>
      {children}
    </span>
  );
};

export default Chip;