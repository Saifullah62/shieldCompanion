import React from 'react';
import { LightbulbIcon } from 'lucide-react';

const prompts = [
  "What call stood out today?",
  "How did today's shift make you feel?",
  "What's one thing you're proud of today?",
  "What did you learn today?",
  "How did you help someone today?",
];

export function DailyPrompt() {
  const todaysPrompt = prompts[Math.floor(Math.random() * prompts.length)];

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