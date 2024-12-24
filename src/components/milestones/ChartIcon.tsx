import React from 'react';

interface ChartIconProps {
  className?: string;
}

export function ChartIcon({ className }: ChartIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 12l4-4 4 4 4-4" />
    </svg>
  );
}