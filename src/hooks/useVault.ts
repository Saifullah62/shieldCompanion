import { useState } from 'react';
import { Memory } from '../types';

const mockMemories: Memory[] = [
  {
    id: '1',
    title: 'Graduation Day',
    description: 'Academy graduation ceremony',
    type: 'image',
    date: '2024-01-15',
    url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'First Day Notes',
    description: 'Reflections from my first day on patrol',
    type: 'note',
    date: '2024-01-16',
  },
];

export function useVault() {
  const [memories, setMemories] = useState<Memory[]>(mockMemories);

  const addMemory = (newMemory: Omit<Memory, 'id'>) => {
    setMemories(prev => [...prev, { ...newMemory, id: Date.now().toString() }]);
  };

  return {
    memories,
    addMemory,
  };
}