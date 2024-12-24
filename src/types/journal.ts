export interface JournalEntry {
    id: string;
    date: string;
    shiftDetails: {
        startTime: string;
        endTime: string;
        type: 'day' | 'night' | 'other';
    };
    content: string;
    tags: string[];
    mood?: 'Great' | 'Okay' | 'Rough';
    callsAttended?: {
        callType: string;
        description: string;
        timeStamp: string;
    }[];
    reflectionPrompt?: {
        question: string;
        answer: string;
    };
}

export type MoodType = 'Great' | 'Okay' | 'Rough';

export interface JournalFilter {
    startDate?: string;
    endDate?: string;
    tags?: string[];
    mood?: MoodType;
    searchText?: string;
}
