import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import type { Edge, Node } from 'reactflow';

import type { StageMetricsDict } from '@/types';

import ExecutionMetrics from './ExecutionMetrics';
import StageGraph from './StageGraph';

interface QueryStagesProps {
  nodes: Node<any>[];
  edges: Edge<any>[];
  metrics: StageMetricsDict[];
}

export default function QueryStages(props: QueryStagesProps) {
  const { nodes = [], edges = [], metrics = [] } = props;
  const [open, setOpen] = useState(true);

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
          Stages
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
        <Grid container direction="row">
          {!!metrics.length && (
            <Grid
              item
              xs={12}
              md={6}
              id="searchable-area"
              className="stagegraph"
              style={{
                fontSize: '16px',
                letterSpacing: '0.7px',
                lineHeight: '24px',
                whiteSpace: 'break-spaces',
                overflow: 'scroll',
                minHeight: '500px',
                paddingBottom: '20px',
              }}
            >
              <ExecutionMetrics metrics={metrics} />
            </Grid>
          )}
          {!!nodes.length && (
            <Grid
              item
              xs={12}
              md={6}
              id="searchable-area"
              className="stagegraph"
              style={{
                fontSize: '16px',
                letterSpacing: '0.7px',
                lineHeight: '24px',
                whiteSpace: 'break-spaces',
                overflow: 'scroll',
                minHeight: '500px',
              }}
            >
              <StageGraph stageNodes={nodes} stageEdges={edges} />
            </Grid>
          )}
        </Grid>
      </Collapse>
    </div>
  );
}
