import { useState } from 'react';
import { Resource, ResourceCategory } from '../types';

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'De-escalation Techniques',
    description: 'Learn effective communication strategies for tense situations.',
    category: 'communication',
    url: 'https://example.com/de-escalation',
  },
  {
    id: '2',
    title: 'Stress Management Guide',
    description: 'Practical techniques for managing work-related stress.',
    category: 'stress',
  },
];

export function useResources() {
  const [resources] = useState<Resource[]>(mockResources);
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  return {
    resources: filteredResources,
    activeCategory,
    setActiveCategory,
  };
}