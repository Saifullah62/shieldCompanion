import React from 'react';
import { ResourceGrid } from '../resources/ResourceGrid';
import { ResourceCategories } from '../resources/ResourceCategories';
import { useResources } from '../../hooks/useResources';

export function ResourceSection() {
  const { resources, activeCategory, setActiveCategory } = useResources();

  return (
    <div className="space-y-6">
      <ResourceCategories 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <ResourceGrid resources={resources} />
    </div>
  );
}