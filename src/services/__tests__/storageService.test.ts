import { storageService } from '../storageService';

describe('StorageService', () => {
  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear();
  });

  describe('set', () => {
    it('should store data with proper prefix', async () => {
      const testData = { test: 'value' };
      await storageService.set('test-key', testData);
      
      const stored = localStorage.getItem('shield_companion_test-key');
      expect(JSON.parse(stored!)).toEqual(testData);
    });

    it('should handle complex objects', async () => {
      const complexData = {
        string: 'test',
        number: 123,
        boolean: true,
        array: [1, 2, 3],
        nested: { key: 'value' }
      };
      
      await storageService.set('complex', complexData);
      const retrieved = await storageService.get<typeof complexData>('complex');
      expect(retrieved).toEqual(complexData);
    });

    it('should throw on circular references', async () => {
      const circular: any = { self: null };
      circular.self = circular;
      
      await expect(storageService.set('circular', circular))
        .rejects
        .toThrow();
    });
  });

  describe('get', () => {
    it('should retrieve stored data', async () => {
      const testData = { test: 'value' };
      await storageService.set('test-key', testData);
      
      const retrieved = await storageService.get<typeof testData>('test-key');
      expect(retrieved).toEqual(testData);
    });

    it('should return null for non-existent keys', async () => {
      const retrieved = await storageService.get('non-existent');
      expect(retrieved).toBeNull();
    });

    it('should handle JSON parse errors', async () => {
      // Manually set invalid JSON
      localStorage.setItem('shield_companion_invalid', 'invalid json');
      
      await expect(storageService.get('invalid'))
        .rejects
        .toThrow();
    });
  });

  describe('remove', () => {
    it('should remove stored data', async () => {
      await storageService.set('test-key', { test: 'value' });
      await storageService.remove('test-key');
      
      const retrieved = await storageService.get('test-key');
      expect(retrieved).toBeNull();
    });

    it('should only remove specified key', async () => {
      await storageService.set('keep', { keep: true });
      await storageService.set('remove', { remove: true });
      
      await storageService.remove('remove');
      
      const kept = await storageService.get('keep');
      const removed = await storageService.get('remove');
      
      expect(kept).toEqual({ keep: true });
      expect(removed).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear all Shield Companion data', async () => {
      // Set some Shield Companion data
      await storageService.set('key1', 'value1');
      await storageService.set('key2', 'value2');
      
      // Set some other data
      localStorage.setItem('other_key', 'other_value');
      
      await storageService.clear();
      
      // Shield Companion data should be cleared
      expect(await storageService.get('key1')).toBeNull();
      expect(await storageService.get('key2')).toBeNull();
      
      // Other data should remain
      expect(localStorage.getItem('other_key')).toBe('other_value');
    });
  });

  describe('keys', () => {
    it('should list all Shield Companion keys', async () => {
      await storageService.set('key1', 'value1');
      await storageService.set('key2', 'value2');
      localStorage.setItem('other_key', 'other_value');
      
      const keys = await storageService.keys();
      
      expect(keys).toEqual(['key1', 'key2']);
      expect(keys).not.toContain('other_key');
    });

    it('should return empty array when no keys exist', async () => {
      const keys = await storageService.keys();
      expect(keys).toEqual([]);
    });
  });
});
