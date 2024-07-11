import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import type { QueryExecution } from '@/types';

interface ExecutionDetailsProps {
  rows: QueryExecution[];
}

export default function ExecutionDetails(props: ExecutionDetailsProps) {
  const { rows = [] } = props;
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
          Execution Details
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
        <TableContainer style={{ maxWidth: '600px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {rows.map((row: Record<string, any>, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.text}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </div>
  );
}
