import React from 'react';
import { JournalEntry } from '../journal/JournalEntry';
import { DailyPrompt } from '../prompts/DailyPrompt';

export function JournalSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <JournalEntry />
      </div>
      <div className="space-y-6">
        <DailyPrompt />
      </div>
    </div>
  );
}