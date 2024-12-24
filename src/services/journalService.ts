import { JournalEntry } from '../types/journal';

class JournalService {
  private readonly STORAGE_KEY = 'shield_companion_journal';

  async saveEntry(entry: JournalEntry): Promise<void> {
    try {
      const entries = await this.getAllEntries();
      entries.push(entry);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw new Error('Failed to save journal entry');
    }
  }

  async getAllEntries(): Promise<JournalEntry[]> {
    try {
      const entriesJson = localStorage.getItem(this.STORAGE_KEY);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      return [];
    }
  }

  async getEntryById(id: string): Promise<JournalEntry | null> {
    try {
      const entries = await this.getAllEntries();
      return entries.find(entry => entry.id === id) || null;
    } catch (error) {
      console.error('Error getting journal entry:', error);
      return null;
    }
  }

  async searchEntries(params: {
    startDate?: string;
    endDate?: string;
    tags?: string[];
    mood?: string;
    searchText?: string;
  }): Promise<JournalEntry[]> {
    try {
      let entries = await this.getAllEntries();

      if (params.startDate) {
        entries = entries.filter(entry => entry.date >= params.startDate!);
      }

      if (params.endDate) {
        entries = entries.filter(entry => entry.date <= params.endDate!);
      }

      if (params.tags && params.tags.length > 0) {
        entries = entries.filter(entry =>
          params.tags!.some(tag => entry.tags.includes(tag))
        );
      }

      if (params.mood) {
        entries = entries.filter(entry => entry.mood === params.mood);
      }

      if (params.searchText) {
        const searchLower = params.searchText.toLowerCase();
        entries = entries.filter(entry =>
          entry.content.toLowerCase().includes(searchLower) ||
          entry.callsAttended?.some(call =>
            call.description.toLowerCase().includes(searchLower) ||
            call.callType.toLowerCase().includes(searchLower)
          )
        );
      }

      return entries;
    } catch (error) {
      console.error('Error searching journal entries:', error);
      return [];
    }
  }

  async deleteEntry(id: string): Promise<void> {
    try {
      const entries = await this.getAllEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw new Error('Failed to delete journal entry');
    }
  }

  async updateEntry(id: string, updatedEntry: Partial<JournalEntry>): Promise<void> {
    try {
      const entries = await this.getAllEntries();
      const index = entries.findIndex(entry => entry.id === id);
      
      if (index === -1) {
        throw new Error('Entry not found');
      }

      entries[index] = { ...entries[index], ...updatedEntry };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw new Error('Failed to update journal entry');
    }
  }
}

export const journalService = new JournalService();
