import Grid from '@mui/material/Grid';
import * as React from 'react';

interface EmptyComponentProps {
  title?: string;
  goback?: boolean;
  backUrl?: string;
}

export default function EmptyComponent(props: EmptyComponentProps) {
  const { title, goback = false, backUrl } = props;

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
          <p
            style={{
              marginBottom: '10px',
              marginRight: '20px',
              lineHeight: 1.7,
              fontSize: '24px',
              margin: '0px',
              fontWeight: 600,
            }}
          >
            <span>{title}</span>
          </p>
        </Grid>
        {goback && backUrl && (
          <Grid
            item
            sx={{
              '&.MuiGrid-root:hover': {
                background: '#d9dae0 !important',
              },
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowWrap: 'break-word',
              padding: '10px',
              borderRadius: '15px',
              cursor: 'pointer',
              color: '#000',
            }}
          >
            <a
              style={{
                marginBottom: '10px',
                marginRight: '20px',
                lineHeight: 1.7,
                fontSize: '16px',
                margin: '0px',
                fontWeight: 600,
              }}
              href={backUrl}
            >
              Click Here to go back.
            </a>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
