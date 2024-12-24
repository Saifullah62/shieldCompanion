import React from 'react';
import { VaultGrid } from '../vault/VaultGrid';
import { VaultUpload } from '../vault/VaultUpload';
import { useVault } from '../../hooks/useVault';

export function VaultSection() {
  const { memories, addMemory } = useVault();

  return (
    <div className="space-y-6">
      <VaultUpload onUpload={addMemory} />
      <VaultGrid memories={memories} />
    </div>
  );
}