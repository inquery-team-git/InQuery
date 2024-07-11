import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import QueryRecommendations from '../QueryRecommendations';

interface QueryEditorProps {
  query: string;
}

export default function QueryEditor(props: QueryEditorProps) {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackText, setSnackText] = useState('');

  const handleClick = () => {
    setOpen(!open);
  };

  const showSnackBar = () => {
    setOpenSnack(true);
  };

  const hideSnackBar = () => {
    setOpenSnack(false);
  };

  const copyQueryText = () => {
    navigator.clipboard.writeText(props.query);
    showSnackBar();
    setSnackText('Query Copied!');
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
          Query Text
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <List
          sx={{
            display: 'flex',
            padding: '0px !important',
          }}
        >
          <ListItem disablePadding>
            <QueryRecommendations query={props.query} />
          </ListItem>

          <ListItem disablePadding>
            <Tooltip title="Copy Query">
              <IconButton
                onClick={copyQueryText}
                sx={{
                  marginLeft: '15px',
                }}
              >
                <ContentCopyIcon htmlColor="#000" />
              </IconButton>
            </Tooltip>
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
        <SyntaxHighlighter
          language="sql"
          wrapLines
          wrapLongLines
          customStyle={{
            minHeight: 300,
            maxHeight: 400,
            overflow: 'scroll',
          }}
        >
          {props.query}
        </SyntaxHighlighter>
      </Collapse>
      <Snackbar
        open={openSnack}
        onClose={hideSnackBar}
        TransitionComponent={Fade}
        message={snackText}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}
