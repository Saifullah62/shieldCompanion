import React from 'react';
import { MilestoneList } from '../milestones/MilestoneList';
import { MilestoneForm } from '../milestones/MilestoneForm';
import { ProgressChart } from '../milestones/ProgressChart';

export function MilestoneSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <MilestoneForm />
        <MilestoneList />
      </div>
      <div>
        <ProgressChart />
      </div>
    </div>
  );
}