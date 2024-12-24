import { useState, useEffect, useCallback } from 'react';
import { JournalEntry, JournalFilter } from '../types/journal';
import { journalService } from '../services/journalService';

interface Call {
  id: string;
  callType: string;
  description: string;
  timestamp: string;
  tags: string[];
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'Great' | 'Good' | 'Okay' | 'Rough';
  callsAttended?: Call[];
  tags: string[];
  criticalIncident?: boolean;
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journal_entries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);

  const loadEntries = useCallback(async () => {
    try {
      const loadedEntries = await journalService.getAllEntries();
      setEntries(loadedEntries);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const addEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      tags: entry.tags || []
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const updateEntry = (id: string, updates: Partial<JournalEntry>) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const searchEntries = (query: string) => {
    return entries.filter(entry =>
      entry.content.toLowerCase().includes(query.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      entry.callsAttended?.some(call =>
        call.description.toLowerCase().includes(query.toLowerCase()) ||
        call.callType.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const getEntriesByDate = (startDate: Date, endDate: Date) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  const getEntriesByTag = (tag: string) => {
    return entries.filter(entry =>
      entry.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  };

  const getMoodTrends = () => {
    return entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const getCallTypeTrends = () => {
    return entries.reduce((acc, entry) => {
      entry.callsAttended?.forEach(call => {
        acc[call.callType] = (acc[call.callType] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
  };

  const getCriticalIncidents = () => {
    return entries.filter(entry => entry.criticalIncident);
  };

  const getCommonTags = () => {
    const tagCounts = entries.reduce((acc, entry) => {
      entry.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  const saveEntry = async (entry: JournalEntry) => {
    try {
      await journalService.saveEntry(entry);
      await loadEntries();
    } catch (err) {
      console.error(err);
    }
  };

  const refreshEntries = async () => {
    await loadEntries();
  };

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    searchEntries,
    getEntriesByDate,
    getEntriesByTag,
    getMoodTrends,
    getCallTypeTrends,
    getCriticalIncidents,
    getCommonTags,
    saveEntry,
    refreshEntries
  };
}
