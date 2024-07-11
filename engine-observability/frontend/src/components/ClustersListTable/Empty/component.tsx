import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import * as React from 'react';

interface NoClusterProps {
  title?: string;
  openNewClusterDialog: () => void;
}

export default function NoClusterComponent(props: NoClusterProps) {
  const { title, openNewClusterDialog } = props;

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
              lineHeight: 1.7,
              fontSize: '24px',
              margin: '0px',
              fontWeight: 600,
            }}
          >
            <span>No Cluster configured!</span>
          </p>
        </Grid>
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
            minWidth: '200px',
            overflowWrap: 'break-word',
            padding: '15px 20px',
            borderRadius: '15px',
            background: 'border-box rgb(255, 255, 255)',
            minHeight: '100px',
            marginTop: '15px',
            cursor: 'pointer',
            color: '#000',
          }}
          onClick={openNewClusterDialog}
        >
          <AddIcon fontSize="large" />
          {title && (
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
              Add New Cluster
            </p>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
