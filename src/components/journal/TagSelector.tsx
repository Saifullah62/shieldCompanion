import React from 'react';
import { Tag } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: string[];
  onTagToggle: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onTagToggle }: TagSelectorProps) {
  const tags = ['critical incident', 'positive interaction', 'training', 'routine'];

  const toggleTag = (tag: string) => {
    onTagToggle(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 mb-2">
        <Tag className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Tags</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}