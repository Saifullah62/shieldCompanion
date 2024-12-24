import React from 'react';
import { Award, Medal, GraduationCap } from 'lucide-react';
import { Milestone } from '../../types';

interface MilestoneCardProps {
  milestone: Milestone;
}

const typeIcons = {
  promotion: Award,
  certification: GraduationCap,
  achievement: Medal,
};

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  const Icon = typeIcons[milestone.type];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{milestone.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-sm text-gray-500">
              {new Date(milestone.date).toLocaleDateString()}
            </span>
            <span className="text-sm font-medium text-blue-600 capitalize">
              {milestone.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}