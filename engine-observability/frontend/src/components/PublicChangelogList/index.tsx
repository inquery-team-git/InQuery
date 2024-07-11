import { useSelector } from 'react-redux';

import PublicChangelogPreview from '@/components/PublicChangelogPreview';
import { getFormattedLabelsList } from '@/redux/public/labels.slice';
import type { ChangelogPost } from '@/types';
import { ChangelogPostStatus } from '@/types';

interface PublicChangelogListProps {
  posts: ChangelogPost[];
  enabledOptions: string[];
  showMore: boolean;
}

function PublicChangelogList(props: PublicChangelogListProps) {
  const allLabels = useSelector(getFormattedLabelsList);
  const { showMore, enabledOptions = [], posts = [] } = props;
  return (
    <div className="plistContainer">
      {posts &&
        posts.map((data, index) => {
          return (
            <PublicChangelogPreview
              allLabels={allLabels}
              key={index}
              data={data}
              enabledOptions={enabledOptions}
              fullHeight={false}
              isDraft={data.status === ChangelogPostStatus.DRAFT}
              showMore={showMore}
            />
          );
        })}
    </div>
  );
}

export default PublicChangelogList;
