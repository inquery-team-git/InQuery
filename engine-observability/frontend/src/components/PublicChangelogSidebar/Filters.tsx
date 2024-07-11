import classNames from 'classnames';
import { useState } from 'react';

import type { FilterType } from '@/types';

interface PublicChangelogFiltersProps {
  filters: FilterType[];
  onClickFilter?: (type: string) => void;
}

const PublicChangelogFilters = (props: PublicChangelogFiltersProps) => {
  const { filters = [], onClickFilter } = props;
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    if (onClickFilter) {
      onClickFilter(type);
    }
  };

  if (filters.length === 0) return null;

  return (
    <div className="filters">
      {filters.map((filter) => (
        <div
          className={classNames('filterType', {
            selected: selectedType === filter.type,
          })}
          key={filter.type}
          onClick={() => handleFilterChange(filter.type)}
        >
          <div className={`typeDot ${filter.type}`}></div>
          <div className="filterLabel">{filter.label}</div>
        </div>
      ))}
    </div>
  );
};

export default PublicChangelogFilters;
