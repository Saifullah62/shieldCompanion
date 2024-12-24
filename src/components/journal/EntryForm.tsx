import React from 'react';

interface EntryFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function EntryForm({ value, onChange }: EntryFormProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Record your shift details, notable calls, or reflections..."
    />
  );
}