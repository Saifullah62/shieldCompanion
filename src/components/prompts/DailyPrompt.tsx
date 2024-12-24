import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { usePrompts } from '../../hooks/usePrompts';

export function DailyPrompt() {
  const { todaysPrompt } = usePrompts();

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start space-x-3">
      <LightbulbIcon className="w-5 h-5 text-blue-500 mt-0.5" />
      <div>
        <h3 className="font-medium text-blue-900">Daily Reflection</h3>
        <p className="text-blue-700 mt-1">{todaysPrompt}</p>
      </div>
    </div>
  );
}