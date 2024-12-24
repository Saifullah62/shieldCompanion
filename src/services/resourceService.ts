import { useState, useEffect } from 'react';

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
  type: 'link' | 'document' | 'video' | 'checklist' | 'contact';
  content?: string;
}

export type ResourceCategory = 
  | 'procedures'
  | 'training'
  | 'wellness'
  | 'legal'
  | 'contacts'
  | 'checklists'
  | 'department'
  | 'custom';

const defaultResources: Resource[] = [
  {
    id: '1',
    title: 'Daily Patrol Checklist',
    description: 'Standard operating procedures for daily patrol duties',
    category: 'procedures',
    tags: ['patrol', 'daily', 'checklist'],
    priority: 1,
    isBookmarked: false,
    type: 'checklist',
    content: `
- Equipment Check
  * Radio functionality
  * Body camera
  * Vehicle inspection
  * Weapon systems
- Briefing Review
  * Recent incidents
  * BOLOs
  * Special assignments
- Administrative
  * Reports completion
  * Evidence processing
  * End of shift procedures`
  },
  {
    id: '2',
    title: 'Crisis Intervention Guide',
    description: 'Best practices for handling mental health crisis situations',
    category: 'training',
    tags: ['mental health', 'crisis', 'intervention'],
    priority: 2,
    isBookmarked: false,
    type: 'document',
    content: 'Detailed guide for crisis intervention...'
  }
];

export class ResourceService {
  private storageKey = 'shield_companion_resources';

  constructor() {
    // Bind all methods to ensure proper 'this' context
    this.getResources = this.getResources.bind(this);
    this.saveResources = this.saveResources.bind(this);
    this.addResource = this.addResource.bind(this);
    this.updateResource = this.updateResource.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.getBookmarkedResources = this.getBookmarkedResources.bind(this);
    this.searchResources = this.searchResources.bind(this);
    this.getResourcesByCategory = this.getResourcesByCategory.bind(this);
    this.getResourcesByTag = this.getResourcesByTag.bind(this);
    this.updateResourceAccess = this.updateResourceAccess.bind(this);
    this.getRecentResources = this.getRecentResources.bind(this);
  }

  getResources(): Resource[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : defaultResources;
  }

  saveResources(resources: Resource[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(resources));
  }

  addResource(resource: Omit<Resource, 'id'>): Resource {
    const resources = this.getResources();
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      lastAccessed: new Date().toISOString()
    };
    this.saveResources([...resources, newResource]);
    return newResource;
  }

  updateResource(id: string, updates: Partial<Resource>): Resource | null {
    const resources = this.getResources();
    const index = resources.findIndex(r => r.id === id);
    if (index === -1) return null;

    const updatedResource = {
      ...resources[index],
      ...updates,
      lastAccessed: new Date().toISOString()
    };
    resources[index] = updatedResource;
    this.saveResources(resources);
    return updatedResource;
  }

  deleteResource(id: string): boolean {
    const resources = this.getResources();
    const filtered = resources.filter(r => r.id !== id);
    if (filtered.length === resources.length) return false;
    this.saveResources(filtered);
    return true;
  }

  toggleBookmark(id: string): Resource | null {
    const resources = this.getResources();
    const resource = resources.find(r => r.id === id);
    if (!resource) return null;
    return this.updateResource(id, { isBookmarked: !resource.isBookmarked });
  }

  getBookmarkedResources(): Resource[] {
    return this.getResources().filter(r => r.isBookmarked);
  }

  searchResources(query: string): Resource[] {
    const resources = this.getResources();
    const searchTerm = query.toLowerCase();
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  getResourcesByCategory(category: ResourceCategory): Resource[] {
    return this.getResources().filter(r => r.category === category);
  }

  getResourcesByTag(tag: string): Resource[] {
    return this.getResources().filter(r =>
      r.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  updateResourceAccess(id: string): void {
    this.updateResource(id, { lastAccessed: new Date().toISOString() });
  }

  getRecentResources(limit: number = 5): Resource[] {
    return this.getResources()
      .filter(r => r.lastAccessed)
      .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
      .slice(0, limit);
  }
}

export const resourceService = new ResourceService();

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setResources(resourceService.getResources());
    setLoading(false);
  }, []);

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = resourceService.addResource(resource);
    setResources(prev => [...prev, newResource]);
    return newResource;
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    const updated = resourceService.updateResource(id, updates);
    if (updated) {
      setResources(prev =>
        prev.map(r => (r.id === id ? updated : r))
      );
    }
    return updated;
  };

  const deleteResource = (id: string) => {
    const success = resourceService.deleteResource(id);
    if (success) {
      setResources(prev => prev.filter(r => r.id !== id));
    }
    return success;
  };

  const toggleBookmark = (id: string) => {
    const updated = resourceService.toggleBookmark(id);
    if (updated) {
      setResources(prev =>
        prev.map(r => (r.id === id ? updated : r))
      );
    }
    return updated;
  };

  return {
    resources,
    loading,
    addResource,
    updateResource,
    deleteResource,
    toggleBookmark,
    getBookmarked: resourceService.getBookmarkedResources,
    search: resourceService.searchResources,
    getByCategory: resourceService.getResourcesByCategory,
    getByTag: resourceService.getResourcesByTag,
    getRecent: resourceService.getRecentResources
  };
}
