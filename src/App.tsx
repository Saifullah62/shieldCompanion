import React, { useState } from 'react';
import { JournalEntry } from './components/JournalEntry';
import { JournalInsights } from './components/insights/JournalInsights';
import { MemoryVault } from './components/vault/MemoryVault';
import { ResourceHub } from './components/resources/ResourceHub';
import { Logo } from './components/common/Logo';
import { 
  BookOpen, 
  Shield, 
  BookMarked, 
  Archive, 
  BarChart2 
} from 'lucide-react';

type TabType = 'journal' | 'resources' | 'vault' | 'insights';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('journal');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'journal', label: 'Journal', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'vault', label: 'Memory Vault', icon: <Archive className="w-5 h-5" /> },
    { id: 'insights', label: 'Insights', icon: <BarChart2 className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'journal':
        return <JournalEntry />;
      case 'resources':
        return <ResourceHub />;
      case 'vault':
        return <MemoryVault />;
      case 'insights':
        return <JournalInsights />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="lg" variant="white" />
            <nav className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent text-primary'
                      : 'text-white/80 hover:text-white hover:bg-primary-light'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;