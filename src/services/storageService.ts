/**
 * StorageService provides a centralized interface for managing persistent data storage
 * using localStorage with proper error handling and type safety.
 * 
 * @class StorageService
 * @example
 * ```typescript
 * // Store data
 * await storageService.set('user-preferences', { theme: 'dark' });
 * 
 * // Retrieve data
 * const prefs = await storageService.get<{ theme: string }>('user-preferences');
 * 
 * // Remove data
 * await storageService.remove('user-preferences');
 * ```
 */
class StorageService {
  /** Prefix for all storage keys to avoid naming conflicts */
  private prefix = 'shield_companion_';

  /**
   * Generates a prefixed storage key
   * @param {string} key - The original key
   * @returns {string} The prefixed key
   * @private
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Stores data in localStorage with type safety
   * 
   * @template T - Type of the value to store
   * @param {string} key - Storage key
   * @param {T} value - Value to store
   * @throws {Error} If storage fails
   */
  async set<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error(`Error storing data for key ${key}:`, error);
      throw new Error(`Failed to store data: ${error.message}`);
    }
  }

  /**
   * Retrieves data from localStorage with type safety
   * 
   * @template T - Type of the value to retrieve
   * @param {string} key - Storage key
   * @returns {Promise<T | null>} Retrieved value or null if not found
   * @throws {Error} If retrieval fails
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const serialized = localStorage.getItem(this.getKey(key));
      if (!serialized) return null;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      throw new Error(`Failed to retrieve data: ${error.message}`);
    }
  }

  /**
   * Removes data from localStorage
   * 
   * @param {string} key - Storage key
   * @throws {Error} If removal fails
   */
  async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
      throw new Error(`Failed to remove data: ${error.message}`);
    }
  }

  /**
   * Clears all Shield Companion data from localStorage
   * Only removes items with the Shield Companion prefix
   * 
   * @throws {Error} If clearing fails
   */
  async clear(): Promise<void> {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error(`Failed to clear storage: ${error.message}`);
    }
  }

  /**
   * Lists all Shield Companion storage keys
   * Returns keys without the prefix
   * 
   * @returns {Promise<string[]>} List of storage keys
   * @throws {Error} If key retrieval fails
   */
  async keys(): Promise<string[]> {
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.slice(this.prefix.length));
    } catch (error) {
      console.error('Error retrieving keys:', error);
      throw new Error(`Failed to retrieve keys: ${error.message}`);
    }
  }
}

export const storageService = new StorageService();
