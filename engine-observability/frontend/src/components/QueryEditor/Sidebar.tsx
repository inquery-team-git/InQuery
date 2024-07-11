import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TableIcon from '@mui/icons-material/TableChartOutlined';
import ColumnIcon from '@mui/icons-material/TableRowsOutlined';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';

const drawerWidth = 250;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const datasets = [
  {
    db: 'cluster_metrics',
    properties: [
      {
        name: 'id',
        dataType: 'integer',
        not_null: true,
        primary_key: true,
      },
      {
        name: 'used_cpu',
        dataType: 'double_precision',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'total_cpu',
        dataType: 'double_precision',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'used_memory',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'total_memory',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'worker_count',
        dataType: 'integer',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'timestamp',
        dataType: 'timestamp_without_time_zone',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'uptime',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
    ],
  },
  {
    db: 'worker_metrics',
    properties: [
      {
        name: 'id',
        dataType: 'integer',
        not_null: true,
        primary_key: true,
      },
      {
        name: 'used_cpu',
        dataType: 'double_precision',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'total_cpu',
        dataType: 'double_precision',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'used_memory',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'total_memory',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'worker_count',
        dataType: 'integer',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'timestamp',
        dataType: 'timestamp_without_time_zone',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'uptime',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
    ],
  },
  {
    db: 'query_metrics',
    properties: [
      {
        name: 'id',
        dataType: 'integer',
        not_null: true,
        primary_key: true,
      },
      {
        name: 'used_cpu',
        dataType: 'double_precision',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'total_cpu',
        dataType: 'double_precision',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'used_memory',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'total_memory',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'worker_count',
        dataType: 'integer',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'timestamp',
        dataType: 'timestamp_without_time_zone',
        not_null: false,
        primary_key: false,
      },
      {
        name: 'uptime',
        dataType: 'bigint',
        not_null: false,
        primary_key: false,
      },
    ],
  },
];

interface DBColumn {
  name: string;
  dataType: string;
  not_null: boolean;
  primary_key: boolean;
}

interface DBMenuItemProps {
  db: string;
  properties: DBColumn[];
}

function DBMenuItem(props: DBMenuItemProps) {
  const { db, properties = [] } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItem onClick={handleClick}>
        <ListItemIcon
          style={{
            minWidth: 'unset',
            marginRight: '10px',
          }}
        >
          <TableIcon fontSize="small" htmlColor="#2978D5" />
        </ListItemIcon>
        <ListItemText primary={db} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {properties.map((col: DBColumn, idx: number) => {
            return (
              <ListItem
                sx={{
                  pl: 4,
                  overflow: 'scroll',
                  scrollbarWidth: 'none',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
                key={idx}
              >
                <ListItemIcon
                  style={{
                    minWidth: 'unset',
                    marginRight: '10px',
                  }}
                >
                  <ColumnIcon
                    fontSize="small"
                    htmlColor="#36B36F"
                    style={{
                      height: '13px',
                    }}
                  />
                </ListItemIcon>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 200,
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#000',
                    }}
                  >{`${col.name}`}</span>
                  &nbsp;
                  <span>{`(${col.dataType})`}</span>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

interface QueryEditorSideBarProps {
  openDrawer: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen?: () => void;
}

export default function QueryEditorSideBar(props: QueryEditorSideBarProps) {
  const theme = useTheme();
  const { openDrawer, handleDrawerClose } = props;

  return (
    <Grid
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        display: openDrawer ? 'block' : 'none',
        borderRight: '1px solid #D6D9DF',
        height: '100%',
        background: '#FFFFFF',
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className="text-muted"
            style={{ fontSize: '14px' }}
          >
            {'Datasets'}
          </ListSubheader>
        }
      >
        {datasets.map((ds) => (
          <DBMenuItem key={ds.db} db={ds.db} properties={ds.properties} />
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <h6 className="text-muted" style={{ fontSize: '14px' }}>
            {'Your Queries'}
          </h6>
        </ListItem>
        {['Newest Market', 'Top 10 Customers', 'Top 10 Products'].map(
          (text) => (
            <ListItem key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Grid>
  );
}
