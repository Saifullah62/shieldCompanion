// Common Types
export type MoodType = 'Great' | 'Good' | 'Okay' | 'Rough';
export type ShiftType = 'day' | 'night' | 'other';
export type EntryType = 'shift' | 'critical' | 'training' | 'other';
export type ResourceType = 'link' | 'document' | 'video' | 'checklist' | 'contact';

// Journal Types
export interface JournalEntry {
  id: string;
  timestamp: string;
  content: string;
  tags: string[];
  mood: MoodType;
  type: EntryType;
  shiftDetails?: {
    startTime: string;
    endTime: string;
    type: ShiftType;
  };
  callsAttended?: CallEntry[];
  reflectionPrompt?: ReflectionPrompt;
  criticalIncident?: boolean;
}

export interface CallEntry {
  id: string;
  callType: string;
  description: string;
  timestamp: string;
  tags: string[];
}

export interface JournalFilter {
  startDate?: string;
  endDate?: string;
  tags?: string[];
  mood?: MoodType;
  type?: EntryType;
  searchText?: string;
}

// Resource Types
export type ResourceCategory = 
  | 'procedures'
  | 'training'
  | 'wellness'
  | 'legal'
  | 'contacts'
  | 'checklists'
  | 'department'
  | 'custom';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url?: string;
  category: ResourceCategory;
  tags: string[];
  priority: number;
  lastAccessed?: string;
  department?: string;
  isBookmarked: boolean;
  type: ResourceType;
  content?: string;
}

// Memory Vault Types
export interface Memory {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'note' | 'achievement';
  timestamp: string;
  tags: string[];
  url?: string;
  category?: 'personal' | 'professional' | 'training';
}

// Prompt Types
export interface ReflectionPrompt {
  id: string;
  text: string;
  category: 'professional' | 'wellness' | 'achievement';
  response?: string;
}

export interface WellnessInsight {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'reminder' | 'affirmation';
  tags?: string[];
}