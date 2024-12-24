import React from 'react';
import { ExternalLink, BookOpen, Brain, Scale, GraduationCap, MessageSquare } from 'lucide-react';
import { Resource } from '../../types';

const categoryIcons = {
  communication: MessageSquare,
  stress: Brain,
  procedures: BookOpen,
  legal: Scale,
  training: GraduationCap,
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = categoryIcons[resource.category];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
        </div>
        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
      <p className="mt-2 text-gray-600">{resource.description}</p>
    </div>
  );
}