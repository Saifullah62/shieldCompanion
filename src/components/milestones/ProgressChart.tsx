import React from 'react';
import { ChartIcon } from './ChartIcon';
import { useMilestones } from '../../hooks/useMilestones';

export function ProgressChart() {
  const { milestones } = useMilestones();
  
  const stats = {
    total: milestones.length,
    promotions: milestones.filter(m => m.type === 'promotion').length,
    certifications: milestones.filter(m => m.type === 'certification').length,
    achievements: milestones.filter(m => m.type === 'achievement').length,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <ChartIcon className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Progress Overview</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Total Milestones</span>
          <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="space-y-2">
          {Object.entries(stats).slice(1).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{key}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{
                    width: `${(value / stats.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}