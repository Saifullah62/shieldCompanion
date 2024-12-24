import React from 'react';
import { VaultCard } from './VaultCard';
import { Memory } from '../../types';

export function VaultGrid({ memories }: { memories: Memory[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <VaultCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
}