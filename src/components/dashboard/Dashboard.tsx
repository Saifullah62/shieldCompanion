import React from 'react';
import { JournalSection } from './JournalSection';
import { MilestoneSection } from './MilestoneSection';
import { ResourceSection } from './ResourceSection';
import { VaultSection } from './VaultSection';

interface DashboardProps {
  activeTab: string;
}

export function Dashboard({ activeTab }: DashboardProps) {
  const renderContent = () => {
    switch (activeTab) {
      case 'Journal':
        return <JournalSection />;
      case 'Milestones':
        return <MilestoneSection />;
      case 'Resources':
        return <ResourceSection />;
      case 'Vault':
        return <VaultSection />;
      default:
        return <JournalSection />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderContent()}
    </main>
  );
}