import React from 'react';
import { ResourceCard } from './ResourceCard';
import { Resource } from '../../types';

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}