import React, { useState } from 'react';
import { Upload, Image, FileText } from 'lucide-react';
import { Memory } from '../../types';

interface VaultUploadProps {
  onUpload: (memory: Omit<Memory, 'id'>) => void;
}

export function VaultUpload({ onUpload }: VaultUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'image' | 'note'>('image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload({
      title,
      description,
      type,
      date: new Date().toISOString(),
      url: '', // TODO: Implement file upload
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Upload className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Add to Vault</h2>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setType('image')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              type === 'image' ? 'border-blue-600' : 'border-gray-200'
            }`}
          >
            <Image className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <span className="block text-sm font-medium text-gray-700">Image</span>
          </button>
          <button
            type="button"
            onClick={() => setType('note')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              type === 'note' ? 'border-blue-600' : 'border-gray-200'
            }`}
          >
            <FileText className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <span className="block text-sm font-medium text-gray-700">Note</span>
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
        />

        {type === 'image' && (
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </div>
    </form>
  );
}