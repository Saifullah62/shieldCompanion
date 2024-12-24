import React from 'react';
import { CallEntry } from '../../types';
import { Clock, Tag, Trash2 } from 'lucide-react';

/**
 * Props for the CallsList component
 * @interface CallsListProps
 * @property {CallEntry[]} calls - Array of call entries to display
 * @property {function} onRemoveCall - Callback when a call is removed
 * @property {function} onEditCall - Callback when a call entry is edited
 */
interface CallsListProps {
  calls: CallEntry[];
  onRemoveCall: (id: string) => void;
  onEditCall: (id: string, field: keyof CallEntry, value: string) => void;
}

/**
 * CallsList component displays and manages a list of calls attended during a shift
 * 
 * @component
 * @example
 * ```tsx
 * const [calls, setCalls] = useState<CallEntry[]>([]);
 * 
 * const handleRemoveCall = (id: string) => {
 *   setCalls(prev => prev.filter(call => call.id !== id));
 * };
 * 
 * const handleEditCall = (id: string, field: keyof CallEntry, value: string) => {
 *   setCalls(prev => prev.map(call => 
 *     call.id === id ? { ...call, [field]: value } : call
 *   ));
 * };
 * 
 * return (
 *   <CallsList
 *     calls={calls}
 *     onRemoveCall={handleRemoveCall}
 *     onEditCall={handleEditCall}
 *   />
 * );
 * ```
 */
export function CallsList({ calls, onRemoveCall, onEditCall }: CallsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Calls Attended</h3>
      
      <div className="space-y-4" role="list">
        {calls.map((call) => (
          <div
            key={call.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            role="listitem"
          >
            <div className="flex justify-between items-start mb-3">
              <input
                type="text"
                value={call.callType}
                onChange={(e) => onEditCall(call.id, 'callType', e.target.value)}
                placeholder="Call Type"
                className="text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0"
                aria-label="Call type"
              />
              <button
                onClick={() => onRemoveCall(call.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove call"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                <input
                  type="time"
                  value={call.timestamp}
                  onChange={(e) => onEditCall(call.id, 'timestamp', e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0"
                  aria-label="Call time"
                />
              </div>

              <textarea
                value={call.description}
                onChange={(e) => onEditCall(call.id, 'description', e.target.value)}
                placeholder="Description of the call..."
                className="w-full min-h-[80px] p-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                aria-label="Call description"
              />

              <div className="flex flex-wrap gap-2" role="list" aria-label="Call tags">
                {call.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                    role="listitem"
                  >
                    <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
