import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { EntryForm } from './EntryForm';
import { TagSelector } from './TagSelector';

export function JournalEntry() {
  const [entry, setEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving entry:', { entry, selectedTags });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Daily Log</h2>
      </div>
      
      <EntryForm value={entry} onChange={setEntry} />
      <TagSelector selectedTags={selectedTags} onTagToggle={setSelectedTags} />

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Entry
      </button>
    </div>
  );
}