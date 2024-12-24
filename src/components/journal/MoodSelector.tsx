import React from 'react';
import { MoodType } from '../../types';

/**
 * Props for the MoodSelector component
 * @interface MoodSelectorProps
 * @property {MoodType} value - Currently selected mood
 * @property {function} onChange - Callback function when mood is changed
 */
interface MoodSelectorProps {
  value: MoodType;
  onChange: (mood: MoodType) => void;
}

/**
 * Mapping of moods to their corresponding emoji icons
 */
const MOOD_ICONS = {
  Great: '😊',
  Good: '🙂',
  Okay: '😐',
  Rough: '😔'
} as const;

/**
 * MoodSelector component allows users to select their current mood using emoji buttons
 * 
 * @component
 * @example
 * ```tsx
 * const [mood, setMood] = useState<MoodType>('Good');
 * 
 * return (
 *   <MoodSelector
 *     value={mood}
 *     onChange={setMood}
 *   />
 * );
 * ```
 */
export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        How was your shift?
      </label>
      <div className="flex gap-4">
        {(Object.keys(MOOD_ICONS) as MoodType[]).map((mood) => (
          <button
            key={mood}
            onClick={() => onChange(mood)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              value === mood
                ? 'bg-primary text-white scale-105'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            aria-label={`Select mood: ${mood}`}
            aria-pressed={value === mood}
          >
            <span className="text-2xl mb-1" role="img" aria-label={mood}>
              {MOOD_ICONS[mood]}
            </span>
            <span className="text-sm font-medium">{mood}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
