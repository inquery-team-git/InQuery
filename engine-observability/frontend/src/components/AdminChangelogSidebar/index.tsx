import { Button } from '@mui/material';
import Link from 'next/link';

import FormGroups from '@/components/FormGroups';
import type { FormConfig } from '@/types';

interface ChangelogSidebarProps {
  formConfigs: FormConfig[];
  enabledOptions?: string[];
}

function AdminChangelogSidebar(props: ChangelogSidebarProps) {
  const { formConfigs = [], enabledOptions = [] } = props;
  return (
    <div className="changelogSidebar">
      {enabledOptions.includes('create') && (
        <Link
          style={{ cursor: 'pointer' }}
          className="p-0"
          href={'/admin/cluster'}
        >
          <Button
            className="createNewEntry"
            style={{ textTransform: 'none', width: '100%', fontSize: '16px' }}
          >
            <div>{'Create a new entry'}</div>
            <i className="ni ni-fat-add"></i>
          </Button>
        </Link>
      )}

      <div className="sidebarContents">
        <FormGroups formConfigs={formConfigs} />
      </div>
    </div>
  );
}

export default AdminChangelogSidebar;
