import React from 'react';
import { Book, Award, Lightbulb, Archive } from 'lucide-react';

const tabs = [
  { name: 'Journal', icon: Book },
  { name: 'Milestones', icon: Award },
  { name: 'Resources', icon: Lightbulb },
  { name: 'Vault', icon: Archive },
];

export function NavTabs() {
  const [activeTab, setActiveTab] = React.useState('Journal');

  return (
    <div className="flex space-x-4">
      {tabs.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setActiveTab(name)}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === name 
              ? 'bg-blue-800 text-white' 
              : 'text-blue-100 hover:bg-blue-800 hover:text-white'}`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {name}
        </button>
      ))}
    </div>
  );
}