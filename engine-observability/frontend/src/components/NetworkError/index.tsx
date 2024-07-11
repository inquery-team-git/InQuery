import Grid from '@mui/material/Grid';
import * as React from 'react';

interface NoClusterProps {
  title?: string;
}

export default function NetworkError(props: NoClusterProps) {
  const { title } = props;

  return (
    <React.Fragment>
      <Grid
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'max-content',
          overflow: 'hidden',
          position: 'absolute',
          top: 'calc(50% - 60px)',
          left: 'calc(50% - 125px)',
        }}
        container
      >
        <Grid item>
          <h1>{title}</h1>
          <p>Something went wrong. Please try again later.</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
