import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface QueryHistoryHeaderProps {}

export default function QueryHistoryHeader(_props: QueryHistoryHeaderProps) {
  return (
    <div>
      <Typography
        variant="h6"
        noWrap
        component="div"
        style={{
          padding: '16px 0',
          color: '#525151',
        }}
      >
        Query History
      </Typography>
      <Divider />
    </div>
  );
}
