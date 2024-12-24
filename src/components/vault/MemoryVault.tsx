import React, { useState, useRef } from 'react';
import { Image, Lock, Plus, X } from 'lucide-react';

interface Memory {
  id: string;
  type: 'photo' | 'note';
  title: string;
  description?: string;
  date: string;
  content: string; // URL for photos, text for notes
  tags: string[];
}

export function MemoryVault() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMemory, setNewMemory] = useState<Partial<Memory>>({
    type: 'photo',
    tags: []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMemory(prev => ({
          ...prev,
          content: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newMemory.title && (newMemory.content || newMemory.type === 'note')) {
      const memory: Memory = {
        id: Date.now().toString(),
        type: newMemory.type as 'photo' | 'note',
        title: newMemory.title,
        description: newMemory.description,
        date: new Date().toISOString(),
        content: newMemory.content || '',
        tags: newMemory.tags || []
      };

      setMemories(prev => [...prev, memory]);
      setNewMemory({ type: 'photo', tags: [] });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Lock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Memory Vault</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Memory</span>
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Add New Memory</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <select
                value={newMemory.type}
                onChange={e => setNewMemory(prev => ({ ...prev, type: e.target.value as 'photo' | 'note' }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="photo">Photo</option>
                <option value="note">Note</option>
              </select>

              <input
                type="text"
                placeholder="Title"
                value={newMemory.title || ''}
                onChange={e => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />

              <textarea
                placeholder="Description (optional)"
                value={newMemory.description || ''}
                onChange={e => setNewMemory(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border rounded-md h-24"
              />

              {newMemory.type === 'photo' ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed rounded-md text-center hover:bg-gray-50"
                  >
                    <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-gray-600">Click to upload photo</span>
                  </button>
                </div>
              ) : (
                <textarea
                  placeholder="Write your note here..."
                  value={newMemory.content || ''}
                  onChange={e => setNewMemory(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-2 border rounded-md h-32"
                />
              )}

              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Memory
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memories.map(memory => (
          <div key={memory.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {memory.type === 'photo' && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={memory.content}
                  alt={memory.title}
                  className="object-cover w-full h-48"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{memory.title}</h3>
              {memory.description && (
                <p className="text-sm text-gray-600 mt-1">{memory.description}</p>
              )}
              {memory.type === 'note' && (
                <p className="text-sm text-gray-800 mt-2 bg-gray-50 p-2 rounded">
                  {memory.content}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {memory.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {new Date(memory.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
