import React, { useState } from 'react';
import { Trophy, Calendar, Star, Plus, ChevronRight } from 'lucide-react';
import { SpeechInput } from '../common/SpeechInput';

interface Milestone {
  id: string;
  title: string;
  date: string;
  category: 'training' | 'certification' | 'achievement' | 'promotion';
  description: string;
  reflection?: string;
}

export function MilestoneTracker() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    category: 'achievement'
  });

  const handleSpeechResult = (text: string) => {
    if (newMilestone) {
      setNewMilestone(prev => ({
        ...prev,
        description: (prev.description || '') + ' ' + text
      }));
    }
  };

  const handleSave = () => {
    if (newMilestone.title && newMilestone.description) {
      const milestone: Milestone = {
        id: Date.now().toString(),
        title: newMilestone.title!,
        date: newMilestone.date || new Date().toISOString().split('T')[0],
        category: newMilestone.category as 'training' | 'certification' | 'achievement' | 'promotion',
        description: newMilestone.description!,
        reflection: newMilestone.reflection
      };

      setMilestones(prev => [...prev, milestone]);
      setNewMilestone({ category: 'achievement' });
      setIsAdding(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'training':
        return <Star className="w-5 h-5 text-green-500" />;
      case 'certification':
        return <Trophy className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'promotion':
        return <Trophy className="w-5 h-5 text-blue-500" />;
      default:
        return <Star className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Career Milestones</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            placeholder="Milestone Title"
            value={newMilestone.title || ''}
            onChange={e => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded-md"
          />

          <div className="flex space-x-4">
            <input
              type="date"
              value={newMilestone.date || ''}
              onChange={e => setNewMilestone(prev => ({ ...prev, date: e.target.value }))}
              className="p-2 border rounded-md"
            />
            <select
              value={newMilestone.category}
              onChange={e => setNewMilestone(prev => ({ ...prev, category: e.target.value }))}
              className="p-2 border rounded-md"
            >
              <option value="training">Training</option>
              <option value="certification">Certification</option>
              <option value="achievement">Achievement</option>
              <option value="promotion">Promotion</option>
            </select>
          </div>

          <div className="relative">
            <textarea
              placeholder="Description"
              value={newMilestone.description || ''}
              onChange={e => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded-md h-24 pr-12"
            />
            <div className="absolute right-2 top-2">
              <SpeechInput onTextUpdate={handleSpeechResult} />
            </div>
          </div>

          <textarea
            placeholder="Personal Reflection (Optional)"
            value={newMilestone.reflection || ''}
            onChange={e => setNewMilestone(prev => ({ ...prev, reflection: e.target.value }))}
            className="w-full p-2 border rounded-md h-24"
          />

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Milestone
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {milestones.map(milestone => (
          <div
            key={milestone.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getCategoryIcon(milestone.category)}
                <div>
                  <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(milestone.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
