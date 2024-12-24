import React from 'react';
import { ShiftType } from '../../types';

/**
 * Props for the ShiftDetails component
 * @interface ShiftDetailsProps
 * @property {string} startTime - Shift start time in HH:mm format
 * @property {string} endTime - Shift end time in HH:mm format
 * @property {ShiftType} type - Type of shift (day/night/other)
 * @property {function} onTimeChange - Callback when time fields change
 * @property {function} onTypeChange - Callback when shift type changes
 */
interface ShiftDetailsProps {
  startTime: string;
  endTime: string;
  type: ShiftType;
  onTimeChange: (field: 'startTime' | 'endTime', value: string) => void;
  onTypeChange: (type: ShiftType) => void;
}

/**
 * ShiftDetails component handles the input and display of shift timing and type information
 * 
 * @component
 * @example
 * ```tsx
 * const [shiftData, setShiftData] = useState({
 *   startTime: '09:00',
 *   endTime: '17:00',
 *   type: 'day' as ShiftType
 * });
 * 
 * return (
 *   <ShiftDetails
 *     startTime={shiftData.startTime}
 *     endTime={shiftData.endTime}
 *     type={shiftData.type}
 *     onTimeChange={(field, value) => 
 *       setShiftData(prev => ({ ...prev, [field]: value }))
 *     }
 *     onTypeChange={type => 
 *       setShiftData(prev => ({ ...prev, type }))
 *     }
 *   />
 * );
 * ```
 */
export function ShiftDetails({
  startTime,
  endTime,
  type,
  onTimeChange,
  onTypeChange
}: ShiftDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label 
            htmlFor="shift-start-time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Time
          </label>
          <input
            id="shift-start-time"
            type="time"
            value={startTime}
            onChange={(e) => onTimeChange('startTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Shift start time"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label 
            htmlFor="shift-end-time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Time
          </label>
          <input
            id="shift-end-time"
            type="time"
            value={endTime}
            onChange={(e) => onTimeChange('endTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Shift end time"
          />
        </div>
      </div>

      <div role="radiogroup" aria-label="Shift type">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Shift Type
        </label>
        <div className="flex gap-4">
          {(['day', 'night', 'other'] as ShiftType[]).map((shiftType) => (
            <label
              key={shiftType}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="shift-type"
                checked={type === shiftType}
                onChange={() => onTypeChange(shiftType)}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                aria-label={`${shiftType} shift`}
              />
              <span className="text-sm text-gray-700 capitalize">
                {shiftType}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
