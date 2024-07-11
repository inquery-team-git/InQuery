import type { IPublicChangelogSidebar } from '@/interfaces';

import PublicAttributions from './Attribution';
import BackButton from './BackButton';
import PublicChangelogFilters from './Filters';

const PublicChangelogSidebar = (props: IPublicChangelogSidebar) => {
  const { backEnabled, filters = [], links = [], onClickFilter } = props;

  return (
    <div className="psidebar">
      <BackButton backEnabled={backEnabled} buttonText={'Back to changelog'} />
      <PublicChangelogFilters filters={filters} onClickFilter={onClickFilter} />
      <PublicAttributions links={links} />
    </div>
  );
};

export default PublicChangelogSidebar;
