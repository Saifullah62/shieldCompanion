import React from 'react';
import { BarChart, Calendar, TrendingUp, Activity, Brain, Shield, Clock, AlertTriangle } from 'lucide-react';
import { useJournal } from '../../hooks/useJournal';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface StressIndicator {
  level: 'Low' | 'Moderate' | 'High';
  factors: string[];
  recommendations: string[];
}

interface PatternInsight {
  type: string;
  description: string;
  frequency: number;
  impact: 'Positive' | 'Neutral' | 'Negative';
}

function JournalInsightsContent() {
  const { entries } = useJournal();

  if (!entries || entries.length === 0) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">No Journal Entries Yet</h3>
        <p className="text-sm text-blue-600">
          Start adding journal entries to see insights and patterns about your work.
        </p>
      </div>
    );
  }

  // Calculate mood distribution
  const moodDistribution = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate call type distribution
  const callTypeDistribution = entries.reduce((acc, entry) => {
    entry.callsAttended?.forEach(call => {
      acc[call.callType] = (acc[call.callType] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Calculate tag trends
  const tagTrends = entries.reduce((acc, entry) => {
    entry.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Analyze stress levels and patterns
  const analyzeStressLevel = (): StressIndicator => {
    const stressKeywords = ['stressed', 'overwhelmed', 'tired', 'exhausted', 'anxious'];
    const stressFactors: string[] = [];
    let stressPoints = 0;

    entries.slice(-7).forEach(entry => {
      // Check mood
      if (entry.mood === 'Stressed' || entry.mood === 'Exhausted') {
        stressPoints += 2;
      }

      // Check content for stress keywords
      stressKeywords.forEach(keyword => {
        if (entry.content.toLowerCase().includes(keyword)) {
          stressPoints++;
          if (!stressFactors.includes(keyword)) {
            stressFactors.push(keyword);
          }
        }
      });

      // Check call volume
      if (entry.callsAttended && entry.callsAttended.length > 5) {
        stressPoints++;
        stressFactors.push('high call volume');
      }
    });

    const level = stressPoints > 10 ? 'High' : stressPoints > 5 ? 'Moderate' : 'Low';
    const recommendations = getStressRecommendations(level, stressFactors);

    return { level, factors: stressFactors, recommendations };
  };

  // Get recommendations based on stress level
  const getStressRecommendations = (level: string, factors: string[]): string[] => {
    const recommendations: string[] = [];

    if (level === 'High') {
      recommendations.push(
        'Consider scheduling a wellness check-in',
        'Review your department\'s mental health resources',
        'Practice stress-reduction techniques between calls'
      );
    }

    if (factors.includes('high call volume')) {
      recommendations.push(
        'Ensure you\'re taking your designated breaks',
        'Use quick relaxation techniques between calls'
      );
    }

    if (factors.includes('tired') || factors.includes('exhausted')) {
      recommendations.push(
        'Review your sleep schedule',
        'Consider discussing shift rotation with your supervisor'
      );
    }

    return recommendations;
  };

  // Identify patterns and trends
  const analyzePatterns = (): PatternInsight[] => {
    const patterns: PatternInsight[] = [];
    const recentEntries = entries.slice(-30); // Last 30 entries

    if (recentEntries.length === 0) {
      return [
        {
          type: 'Time Pattern',
          description: 'Not enough entries to analyze time patterns',
          frequency: 0,
          impact: 'Neutral'
        },
        {
          type: 'Mood Stability',
          description: 'Not enough entries to analyze mood stability',
          frequency: 0,
          impact: 'Neutral'
        }
      ];
    }

    // Analyze time patterns
    const timePatterns = recentEntries.reduce((acc, entry) => {
      const timestamp = entry.timestamp ? new Date(entry.timestamp) : new Date();
      const hour = timestamp.getHours();
      const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
      acc[timeOfDay] = (acc[timeOfDay] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const timeEntries = Object.entries(timePatterns);
    if (timeEntries.length > 0) {
      const mostCommonTime = timeEntries.sort((a, b) => b[1] - a[1])[0];
      patterns.push({
        type: 'Time Pattern',
        description: `Most entries are logged during the ${mostCommonTime[0]}`,
        frequency: mostCommonTime[1],
        impact: 'Neutral'
      });
    }

    // Analyze mood patterns
    if (recentEntries.length > 1) {
      const moodSequence = recentEntries.map(e => e.mood).filter(Boolean);
      const moodChanges = moodSequence.reduce((acc, mood, i) => {
        if (i > 0 && mood !== moodSequence[i - 1]) {
          acc++;
        }
        return acc;
      }, 0);

      patterns.push({
        type: 'Mood Stability',
        description: moodChanges > (moodSequence.length / 2) 
          ? 'Frequent mood changes observed' 
          : 'Relatively stable mood patterns',
        frequency: moodChanges,
        impact: moodChanges > (moodSequence.length / 2) ? 'Negative' : 'Positive'
      });
    }

    return patterns;
  };

  const stressAnalysis = analyzeStressLevel();
  const patterns = analyzePatterns();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stress Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Stress Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className={`text-lg font-medium ${
              stressAnalysis.level === 'High' ? 'text-red-600' :
              stressAnalysis.level === 'Moderate' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {stressAnalysis.level} Stress Level
            </div>
            {stressAnalysis.factors.length > 0 && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Contributing Factors:</div>
                <ul className="list-disc list-inside">
                  {stressAnalysis.factors.map(factor => (
                    <li key={factor}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}
            {stressAnalysis.recommendations.length > 0 && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Recommendations:</div>
                <ul className="list-disc list-inside">
                  {stressAnalysis.recommendations.map(rec => (
                    <li key={rec}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Pattern Recognition */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Pattern Recognition</h3>
          </div>
          <div className="space-y-3">
            {patterns.map((pattern, index) => (
              <div key={index} className="border-b pb-2 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{pattern.type}</span>
                  <span className={`text-sm ${
                    pattern.impact === 'Positive' ? 'text-green-600' :
                    pattern.impact === 'Negative' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {pattern.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{pattern.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Trends */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Mood Trends</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(moodDistribution).map(([mood, count]) => (
              <div key={mood} className="flex items-center space-x-2">
                <div className="w-24 text-sm text-gray-600">{mood}</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${(count / entries.length) * 100}%`
                    }}
                  />
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">
                  {Math.round((count / entries.length) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call Type Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Call Types</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(callTypeDistribution)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([type, count]) => (
                <div key={type} className="flex items-center space-x-2">
                  <div className="w-24 text-sm text-gray-600 truncate">
                    {type}
                  </div>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{
                        width: `${(count / Object.values(callTypeDistribution).reduce((a, b) => a + b, 0)) * 100}%`
                      }}
                    />
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Time Analysis */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Time Analysis</h3>
          </div>
          <div className="space-y-2">
            {entries.length > 0 && (
              <>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Most Active Hours:</span>
                  <div className="mt-1">
                    {new Date(entries[entries.length - 1].timestamp).toLocaleTimeString()} -
                    {new Date(entries[0].timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Entry Frequency:</span>
                  <div className="mt-1">
                    {Math.round(entries.length / ((new Date().getTime() - new Date(entries[0].timestamp).getTime()) / (1000 * 60 * 60 * 24)))} entries/day
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Risk Factors</h3>
          </div>
          <div className="space-y-2">
            {entries.length > 0 && (
              <div className="text-sm text-gray-600">
                {stressAnalysis.level === 'High' ? (
                  <div className="space-y-2">
                    <div className="text-red-600 font-medium">High Risk Indicators:</div>
                    <ul className="list-disc list-inside">
                      <li>Elevated stress levels</li>
                      {stressAnalysis.factors.map(factor => (
                        <li key={factor}>{factor}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-gray-900 font-medium">Recommended Actions:</div>
                    <ul className="list-disc list-inside">
                      {stressAnalysis.recommendations.map(rec => (
                        <li key={rec}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-green-600">
                    No significant risk factors detected at this time.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JournalInsights() {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Unable to Load Insights</h3>
          <p className="text-sm text-yellow-600">
            We encountered an issue while analyzing your journal entries. Please try again later.
          </p>
        </div>
      }
    >
      <JournalInsightsContent />
    </ErrorBoundary>
  );
}
