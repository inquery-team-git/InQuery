import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

interface QueryPlanProps {
  plan: string;
}

export default function QueryPlan(props: QueryPlanProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'white',
        marginTop: '10px',
      }}
    >
      <Toolbar
        sx={{
          padding: '10px !important',
          minHeight: 'unset !important',
          borderBottom: '2px solid #eeeff1',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ mr: 1, fontSize: '20px', fontWeight: 600 }}
        >
          Query Plan
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <List
          sx={{
            display: 'flex',
            padding: '0px !important',
          }}
        >
          <ListItem disablePadding>
            <IconButton
              onClick={handleClick}
              sx={{
                marginLeft: '15px',
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
        </List>
      </Toolbar>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          id="searchable-area"
          style={{
            fontSize: '14px',
            letterSpacing: '0.7px',
            lineHeight: '24px',
            whiteSpace: 'break-spaces',
            maxHeight: '400px',
            overflow: 'scroll',
            padding: '10px',
            color: '#000',
            fontWeight: 300,
          }}
        >
          {props.plan}
        </div>
      </Collapse>
    </div>
  );
}
