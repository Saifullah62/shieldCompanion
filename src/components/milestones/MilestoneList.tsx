import React from 'react';
import { MilestoneCard } from './MilestoneCard';
import { useMilestones } from '../../hooks/useMilestones';

export function MilestoneList() {
  const { milestones } = useMilestones();

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}