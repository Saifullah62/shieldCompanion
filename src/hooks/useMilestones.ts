import { useState } from 'react';
import { Milestone } from '../types';

// Temporary mock data
const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Promoted to Sergeant',
    description: 'Achieved promotion after 5 years of service',
    type: 'promotion',
    date: '2024-02-15',
  },
  {
    id: '2',
    title: 'Crisis Intervention Certification',
    description: 'Completed advanced training in crisis management',
    type: 'certification',
    date: '2024-01-10',
  },
];

export function useMilestones() {
  const [milestones] = useState<Milestone[]>(mockMilestones);

  return {
    milestones,
    // TODO: Implement CRUD operations
  };
}