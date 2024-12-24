import React, { useState } from 'react';
import {
  Book,
  Link as LinkIcon,
  FileText,
  Bell,
  Search,
  Plus,
  Bookmark,
  Star,
  Clock,
  X,
  Edit2,
  Trash2,
  CheckSquare,
  Video,
  Users,
  FolderPlus
} from 'lucide-react';
import { useResources, Resource, ResourceCategory } from '../../services/resourceService';

const categoryIcons: Record<ResourceCategory, React.ReactNode> = {
  procedures: <FileText className="w-5 h-5 text-blue-600" />,
  training: <Book className="w-5 h-5 text-green-600" />,
  wellness: <Star className="w-5 h-5 text-purple-600" />,
  legal: <FileText className="w-5 h-5 text-red-600" />,
  contacts: <Users className="w-5 h-5 text-cyan-600" />,
  checklists: <CheckSquare className="w-5 h-5 text-orange-600" />,
  department: <Bell className="w-5 h-5 text-indigo-600" />,
  custom: <FolderPlus className="w-5 h-5 text-gray-600" />
};

const resourceTypeIcons = {
  link: <LinkIcon className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  checklist: <CheckSquare className="w-4 h-4" />,
  contact: <Users className="w-4 h-4" />
};

export function ResourceHub() {
  const {
    resources,
    loading,
    addResource,
    updateResource,
    deleteResource,
    toggleBookmark,
    getBookmarked,
    search,
    getByCategory,
    getRecent
  } = useResources();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all' | 'bookmarked'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    category: 'custom',
    tags: [],
    type: 'document',
    isBookmarked: false,
    priority: 3
  });
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
  };

  const handleAddResource = () => {
    if (newResource.title && newResource.description) {
      addResource(newResource as Omit<Resource, 'id'>);
      setNewResource({
        category: 'custom',
        tags: [],
        type: 'document',
        isBookmarked: false,
        priority: 3
      });
      setShowAddForm(false);
    }
  };

  const handleUpdateResource = () => {
    if (editingResource) {
      updateResource(editingResource.id, editingResource);
      setEditingResource(null);
    }
  };

  const getDisplayedResources = () => {
    if (searchQuery) {
      return search(searchQuery);
    }
    if (selectedCategory === 'bookmarked') {
      return getBookmarked();
    }
    if (selectedCategory === 'all') {
      return resources;
    }
    return getByCategory(selectedCategory);
  };

  const displayedResources = getDisplayedResources();

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Resource Hub</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Resources
        </button>
        <button
          onClick={() => setSelectedCategory('bookmarked')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md whitespace-nowrap ${
            selectedCategory === 'bookmarked'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bookmarked</span>
        </button>
        {Object.entries(categoryIcons).map(([category, icon]) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as ResourceCategory)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {icon}
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Recent Resources */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Recently Accessed</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRecent(3).map(resource => (
              <div
                key={resource.id}
                className="p-4 border rounded-md hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {resourceTypeIcons[resource.type]}
                    <span className="font-medium">{resource.title}</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(resource.id)}
                    className={`${
                      resource.isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                    } hover:text-yellow-600`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedResources.map(resource => (
          <div
            key={resource.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {categoryIcons[resource.category]}
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleBookmark(resource.id)}
                  className={`${
                    resource.isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                  } hover:text-yellow-600`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingResource(resource)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteResource(resource.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline mt-2 inline-block"
              >
                View Resource →
              </a>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {resource.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Resource</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newResource.title || ''}
                onChange={e => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
              <textarea
                placeholder="Description"
                value={newResource.description || ''}
                onChange={e => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border rounded-md h-24"
              />
              <input
                type="text"
                placeholder="URL (optional)"
                value={newResource.url || ''}
                onChange={e => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
              <select
                value={newResource.category}
                onChange={e => setNewResource(prev => ({ ...prev, category: e.target.value as ResourceCategory }))}
                className="w-full p-2 border rounded-md"
              >
                {Object.keys(categoryIcons).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={newResource.type}
                onChange={e => setNewResource(prev => ({ ...prev, type: e.target.value as Resource['type'] }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="document">Document</option>
                <option value="link">Link</option>
                <option value="video">Video</option>
                <option value="checklist">Checklist</option>
                <option value="contact">Contact</option>
              </select>
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                onChange={e => setNewResource(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                className="w-full p-2 border rounded-md"
              />
              <button
                onClick={handleAddResource}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resource Modal */}
      {editingResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Resource</h3>
              <button
                onClick={() => setEditingResource(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={editingResource.title}
                onChange={e => setEditingResource(prev => ({ ...prev!, title: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
              <textarea
                value={editingResource.description}
                onChange={e => setEditingResource(prev => ({ ...prev!, description: e.target.value }))}
                className="w-full p-2 border rounded-md h-24"
              />
              <input
                type="text"
                value={editingResource.url || ''}
                onChange={e => setEditingResource(prev => ({ ...prev!, url: e.target.value }))}
                className="w-full p-2 border rounded-md"
                placeholder="URL (optional)"
              />
              <select
                value={editingResource.category}
                onChange={e => setEditingResource(prev => ({ ...prev!, category: e.target.value as ResourceCategory }))}
                className="w-full p-2 border rounded-md"
              >
                {Object.keys(categoryIcons).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={editingResource.tags.join(', ')}
                onChange={e => setEditingResource(prev => ({ ...prev!, tags: e.target.value.split(',').map(t => t.trim()) }))}
                className="w-full p-2 border rounded-md"
                placeholder="Tags (comma-separated)"
              />
              <button
                onClick={handleUpdateResource}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
