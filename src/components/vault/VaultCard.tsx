import React from 'react';
import { Image, FileText, Calendar } from 'lucide-react';
import { Memory } from '../../types';

export function VaultCard({ memory }: { memory: Memory }) {
  const Icon = memory.type === 'image' ? Image : FileText;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="aspect-w-3 aspect-h-2 mb-4">
        {memory.type === 'image' ? (
          <img
            src={memory.url}
            alt={memory.title}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="font-medium text-gray-900">{memory.title}</h3>
      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>{new Date(memory.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}