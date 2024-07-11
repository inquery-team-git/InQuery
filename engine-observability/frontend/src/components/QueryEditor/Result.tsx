import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { QueryStatusMapping } from '@/utils/helper';

export default function QueryResultTab() {
  const [open, setOpen] = useState(false);
  const statusConfig = QueryStatusMapping.finished;
  const StatusIcon = statusConfig.icon;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        position: 'relative',
        fontSize: '1.2vw',
        letterSpacing: '0.1rem',
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        backgroundColor: 'white',
        textAlign: 'left',
        borderBottom: '2px solid #eeeff1',
        lineHeight: '3.3vh',
        padding: '10px',
      }}
    >
      <Toolbar
        sx={{
          padding: '0px !important',
          minHeight: 'unset !important',
        }}
      >
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          Results
        </Typography>
        <Tooltip title={statusConfig.title}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StatusIcon
              fontSize="small"
              sx={{ mr: 3 }}
              htmlColor={statusConfig.color}
            />
          </div>
        </Tooltip>
        <Tooltip title="Last executed at">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 1 }} htmlColor="#2978D5" />
            <Typography variant="body1" sx={{ mr: 2 }}>
              2 hours ago
            </Typography>
          </div>
        </Tooltip>
        <Tooltip title="Rows">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TableRowsIcon
              fontSize="small"
              sx={{ mr: 1 }}
              htmlColor="#2978D5"
            />
            <Typography variant="body1" sx={{ mr: 2 }}>
              5
            </Typography>
          </div>
        </Tooltip>
        <Tooltip title="Query Execution Time">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TimeIcon fontSize="small" sx={{ mr: 1 }} htmlColor="#2978D5" />
            <Typography variant="body1" sx={{ mr: 2 }}>
              24sec
            </Typography>
          </div>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <List
          sx={{
            display: 'flex',
            padding: '0px !important',
          }}
        >
          <ListItem disablePadding>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                padding: '4px 16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '15px',
                transition: 'all 0.1s ease-in-out',
                minWidth: 'max-content',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                textTransform: 'none',
                marginLeft: '15px',
              }}
            >
              {'Schedule Query'}
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                padding: '4px 16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '15px',
                transition: 'all 0.1s ease-in-out',
                minWidth: 'max-content',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                textTransform: 'none',
                marginLeft: '15px',
              }}
            >
              {'Run'}
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                textAlign: 'center',
                padding: '4px 16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: '#525151',
                cursor: 'pointer',
                borderRadius: '15px',
                transition: 'all 0.1s ease-in-out',
                minWidth: 'max-content',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                textTransform: 'none',
                marginLeft: '15px',
              }}
            >
              {'Stop'}
            </Button>
          </ListItem>
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
        <div className="mr-2">Table</div>
      </Collapse>
    </div>
  );
}
