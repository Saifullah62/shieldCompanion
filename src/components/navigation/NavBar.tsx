import React from 'react';
import { Shield } from 'lucide-react';
import { NavTabs } from './NavTabs';

export function NavBar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 mr-2" />
            <span className="text-xl font-semibold">Shield Companion</span>
          </div>
          <NavTabs />
        </div>
      </div>
    </nav>
  );
}