import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { promptService, type ReflectionPrompt, type WellnessInsight } from '../../services/promptService';

export function DailyInsight() {
  const [insight, setInsight] = useState<WellnessInsight | null>(null);
  const [prompt, setPrompt] = useState<ReflectionPrompt | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadInsightAndPrompt();
  }, []);

  const loadInsightAndPrompt = () => {
    const dailyInsight = promptService.getDailyInsight();
    const randomPrompt = promptService.getRandomPrompt();
    setInsight(dailyInsight);
    setPrompt(randomPrompt);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadInsightAndPrompt();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!insight || !prompt) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Daily Insight</h3>
        </div>
        <button
          onClick={handleRefresh}
          className={`text-blue-600 hover:text-blue-700 transition-transform ${
            isRefreshing ? 'animate-spin' : ''
          }`}
          title="Get new insight"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white bg-opacity-60 rounded p-3">
          <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
          <p className="text-gray-700">{insight.content}</p>
          <span className="text-xs text-blue-600 mt-2 inline-block">
            #{insight.type}
          </span>
        </div>

        <div className="bg-white bg-opacity-60 rounded p-3">
          <h4 className="font-medium text-gray-900 mb-1">Reflection Question</h4>
          <p className="text-gray-700">{prompt.text}</p>
          <span className="text-xs text-blue-600 mt-2 inline-block">
            #{prompt.category}
          </span>
        </div>
      </div>
    </div>
  );
}
