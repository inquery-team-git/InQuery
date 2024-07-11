import { useSelector } from 'react-redux';

import AdminChangelogPreview from '@/components/AdminChangelogPreview';
import { getFormattedLabelsList } from '@/redux/admin/labels.slice';
import type { ChangelogPost } from '@/types';
import { ChangelogPostStatus } from '@/types';

interface ChangeLogListProps {
  posts: ChangelogPost[];
  enabledOptions: string[];
}

function AdminChangelogList(props: ChangeLogListProps) {
  const allLabels = useSelector(getFormattedLabelsList);
  const { enabledOptions = [], posts = [] } = props;
  return (
    <div className="changelogList">
      <div className="listContainer">
        {posts &&
          posts.map((data, index) => {
            return (
              <AdminChangelogPreview
                allLabels={allLabels}
                key={index}
                data={data}
                enabledOptions={enabledOptions}
                fullHeight={false}
                isDraft={data.status === ChangelogPostStatus.DRAFT}
              />
            );
          })}
      </div>
    </div>
  );
}

export default AdminChangelogList;
