import React from 'react';
import { MessageSquare, Brain, BookOpen, Scale, GraduationCap } from 'lucide-react';
import { ResourceCategory } from '../../types';

const categories = [
  { id: 'all', label: 'All Resources', icon: BookOpen },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'stress', label: 'Stress Management', icon: Brain },
  { id: 'procedures', label: 'Procedures', icon: BookOpen },
  { id: 'legal', label: 'Legal Updates', icon: Scale },
  { id: 'training', label: 'Training', icon: GraduationCap },
];

interface ResourceCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: ResourceCategory | 'all') => void;
}

export function ResourceCategories({ activeCategory, onCategoryChange }: ResourceCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id as ResourceCategory | 'all')}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
}