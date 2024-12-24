import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export function Logo({ className = '', size = 'md', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-[#131838]';
  const iconColor = variant === 'white' ? 'text-white' : 'text-[#ba9665]';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Shield 
        size={iconSizes[size]} 
        className={iconColor} 
        strokeWidth={2.5}
        fill="currentColor"
      />
      <span className={`font-semibold ${sizeClasses[size]} ${textColor}`}>
        Shield Companion
      </span>
    </div>
  );
}
