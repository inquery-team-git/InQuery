import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import SuccessIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorIcon from '@mui/icons-material/ErrorRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RunningIcon from '@mui/icons-material/PlayCircleFilledRounded';
import SearchIcon from '@mui/icons-material/Search';
import PausedIcon from '@mui/icons-material/StopCircleRounded';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

const QueryStatusMapping = {
  succes: {
    title: 'Succeded',
    icon: SuccessIcon,
    color: '#2BAE66',
  },
  error: {
    title: 'Failed',
    icon: ErrorIcon,
    color: '#ff3d00',
  },
  paused: {
    title: 'Paused',
    icon: PausedIcon,
    color: '#ff9800',
  },
  running: {
    title: 'Running',
    icon: RunningIcon,
    color: '#03a9f4',
  },
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create('width'),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(10)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      overflow: 'scroll',
    },
  },
}));

export default function QueryResultTab() {
  const [open, setOpen] = useState(true);
  const [showSearchTools, setShowSearchTools] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);
  const statusConfig = QueryStatusMapping.succes;
  const StatusIcon = statusConfig.icon;
  const rawLogs = 'Log Entries goes here...';

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearchTools = () => {
    setShowSearchTools(true);
  };

  const hideSearchTools = () => {
    setShowSearchTools(false);
  };

  const handleUserKeyPress = (event: any) => {
    const { keyCode, ctrlKey, metaKey } = event;
    if (keyCode === 70 && (ctrlKey || metaKey)) {
      if (document.getElementById('search-input') !== document.activeElement) {
        event.preventDefault();
        document.getElementById('search-input')?.focus();
        return setShowSearchTools(true);
      }
      return true;
    }
    return false;
  };

  const handleSearch = (event: any) => {
    const searchText = event.target.value;
    const content = rawLogs;
    // Perform custom search logic
    const regex = new RegExp(searchText, 'gi');
    const matches = content.match(regex);

    // Highlight matching text
    if (matches && document.getElementById('searchable-area')) {
      const highlightedContent = content.replace(regex, (match) => {
        return `<span
          style="
            padding-top: 2px;
            padding-bottom: 2px;
            color: #FFF !important;
            background: #9e6a02;
            border-radius: 2px;
          "
        >${match}</span>`;
      });
      setMatchesFound(searchText ? matches.length : 0);
      document.getElementById('searchable-area').innerHTML = highlightedContent;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, []);

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
          Logs
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
        <Box sx={{ flexGrow: 1 }} />
        <List
          sx={{
            display: 'flex',
            padding: '0px !important',
          }}
        >
          <ListItem disablePadding>
            <Search
              id="search-area"
              onFocus={handleSearchTools}
              onBlur={hideSearchTools}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search logs"
                inputProps={{ 'aria-label': 'search' }}
                id="search-input"
                onChange={handleSearch}
                onFocus={handleSearchTools}
                onBlur={hideSearchTools}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                  position: 'absolute',
                  right: 0,
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '14px',
                    marginLeft: '8px',
                  }}
                  hidden={!showSearchTools}
                >
                  {`0/${matchesFound}`}
                </span>
                <IconButton
                  sx={{
                    marginLeft: '8px',
                    padding: '0px',
                  }}
                  hidden={!showSearchTools}
                >
                  {<ExpandLess fontSize="small" />}
                </IconButton>
                <IconButton
                  sx={{
                    marginLeft: '8px',
                    padding: '0px',
                  }}
                  hidden={!showSearchTools}
                >
                  {<ExpandMore fontSize="small" />}
                </IconButton>
              </div>
            </Search>
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
        <div
          id="searchable-area"
          style={{
            lineHeight: '20px',
            letterSpacing: '0.5px',
          }}
        >
          {rawLogs}
        </div>
      </Collapse>
    </div>
  );
}
