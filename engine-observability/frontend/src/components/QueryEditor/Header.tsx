import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface QueryEditorHeaderProps {
  openDrawer: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose?: () => void;
}

export default function QueryEditorHeader(props: QueryEditorHeaderProps) {
  const { openDrawer, handleDrawerOpen } = props;

  return (
    <div>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Query Title
        </Typography>
      </Toolbar>
      <Divider />
    </div>
  );
}
