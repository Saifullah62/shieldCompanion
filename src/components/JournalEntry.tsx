import React, { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import { SpeechInput } from './common/SpeechInput';
import { DailyInsight } from './common/DailyInsight';
import { Smile, Frown, Meh, AlertTriangle, Tag, Phone, X, Plus } from 'lucide-react';

interface CallEntry {
  id: string;
  callType: string;
  description: string;
  timestamp: string;
  tags: string[];
}

const moods = ['Great', 'Good', 'Okay', 'Rough'];

export function JournalEntry() {
  const { addEntry } = useJournal();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [calls, setCalls] = useState<CallEntry[]>([]);
  const [showCallForm, setShowCallForm] = useState(false);
  const [newCall, setNewCall] = useState<Partial<CallEntry>>({
    tags: []
  });
  const [criticalIncident, setCriticalIncident] = useState(false);

  const moodEmojis = {
    Great: <Smile className="w-6 h-6 text-green-500" />,
    Good: <Smile className="w-6 h-6 text-blue-500" />,
    Okay: <Meh className="w-6 h-6 text-yellow-500" />,
    Rough: <Frown className="w-6 h-6 text-red-500" />
  };

  const reflectionPrompts = [
    "What call stood out today?",
    "How did you handle a challenging situation?",
    "What's one thing you learned today?",
    "Did you have any positive interactions with the community?",
    "What made you proud today?",
    "How did you support your fellow officers?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({
      date: new Date().toISOString(),
      content,
      mood,
      tags,
      callsAttended: calls,
      criticalIncident
    });
    setContent('');
    setMood('');
    setTags([]);
    setCalls([]);
    setCriticalIncident(false);
  };

  const handleAddCall = () => {
    if (newCall.callType && newCall.description) {
      const call: CallEntry = {
        id: Date.now().toString(),
        callType: newCall.callType,
        description: newCall.description,
        timestamp: new Date().toISOString(),
        tags: newCall.tags || []
      };
      setCalls(prev => [...prev, call]);
      setNewCall({ tags: [] });
      setShowCallForm(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags(prev => [...prev, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags(prev => [...prev, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  return (
    <div className="space-y-6">
      <DailyInsight />

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Journal Entry</h2>
          <div className="flex items-center space-x-4">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md text-primary focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="">Select Mood</option>
              {moods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-primary">
              What's on your mind?
            </label>
            <div className="relative">
              <SpeechInput
                value={content}
                onChange={setContent}
                className="w-full h-32 px-4 py-2 text-primary bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                placeholder="Share your thoughts, experiences, or reflections..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Calls Attended
            </label>
            <div className="space-y-2">
              {calls.map((call, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={call.callType}
                    onChange={(e) => {
                      const newCalls = [...calls];
                      newCalls[index].callType = e.target.value;
                      setCalls(newCalls);
                    }}
                    placeholder="Call type"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-primary focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newCalls = [...calls];
                      newCalls.splice(index, 1);
                      setCalls(newCalls);
                    }}
                    className="p-2 text-neutral hover:text-neutral-dark"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setShowCallForm(true)}
                className="flex items-center space-x-2 px-4 py-2 text-accent hover:text-accent-dark"
              >
                <Plus className="w-5 h-5" />
                <span>Add Call</span>
              </button>
              {showCallForm && (
                <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-md">
                  <input
                    type="text"
                    placeholder="Call Type"
                    value={newCall.callType || ''}
                    onChange={e => setNewCall(prev => ({ ...prev, callType: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  />
                  <SpeechInput
                    value={newCall.description || ''}
                    onChange={value => setNewCall(prev => ({ ...prev, description: value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="Call Description..."
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowCallForm(false)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddCall}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Call
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = [...tags];
                      newTags.splice(index, 1);
                      setTags(newTags);
                    }}
                    className="ml-2 text-accent hover:text-accent-dark"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags..."
                className="px-3 py-1 text-sm border border-gray-200 rounded-full text-primary focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}