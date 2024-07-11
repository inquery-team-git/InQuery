import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled, useTheme } from '@mui/material/styles';
import type { OverridableStringUnion } from '@mui/types';
import * as React from 'react';

const drawerWidth = 250;

interface FilterButtonProps {
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  endIcon?: React.ReactNode;
  variant?: OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >;
}

const FilterButton = (props: FilterButtonProps) => {
  const variant = props.variant || 'outlined';
  return (
    <Button
      variant={variant}
      color="primary"
      sx={{
        textAlign: 'center',
        padding: '4px 16px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: variant === 'contained' ? '#FFFFFF' : '#525151',
        background: variant === 'contained' ? '#000000' : '#FFFFFF',
        cursor: 'pointer',
        borderRadius: '15px',
        border: ['contained', 'text'].includes(variant)
          ? 'none'
          : '1px solid #D9D9D9',
        transition: 'all 0.1s ease-in-out',
        minWidth: 'max-content',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        textTransform: 'none',
        marginLeft: '15px',
      }}
      onClick={props.onClick}
      endIcon={props.endIcon}
    >
      {props.label}
    </Button>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export interface Option {
  text: string;
  value: string;
}

interface Filter {
  id: string;
  label: string;
  type: string;
  options: Option[];
}

interface DBMenuItemProps {
  filter: Filter;
  appliedFilters: Record<string, any>;
  onMenuItemClick: (
    filter: string,
    value: string,
    checked: boolean,
    type?: string
  ) => void;
}

function FilterItem(props: DBMenuItemProps) {
  const { filter, onMenuItemClick, appliedFilters = {} } = props;
  const { label, options } = filter;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {options.map((opt: Option) => {
            return (
              <ListItem key={opt.value}>
                <Checkbox
                  inputProps={{ 'aria-label': 'controlled' }}
                  checked={
                    appliedFilters[filter.id] &&
                    appliedFilters[filter.id].includes(opt.value)
                  }
                  onChange={(_event, checked) =>
                    onMenuItemClick(filter.id, opt.value, checked)
                  }
                />
                {opt.text}
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

interface QueryFiltersSidebarProps {
  openDrawer: boolean;
  appliedFilters: Record<string, any>;
  filters: Filter[];
  handleDrawerClose: () => void;
  handleDrawerOpen?: () => void;
  handleFilterReset: () => void;
  handleFiltersSelection: (
    filter: string,
    value: string,
    checked: boolean,
    type?: string
  ) => void;
}

export default function QueryFiltersSidebar(props: QueryFiltersSidebarProps) {
  const { appliedFilters = {}, filters = [], handleFiltersSelection } = props;
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
        borderLeft: '1px solid #D6D9DF',
        height: '100%',
        background: '#FFFFFF',
        position: 'relative',
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
            {'All Filters'}
          </ListSubheader>
        }
      >
        {filters.map((f) => (
          <FilterItem
            key={f.id}
            filter={f}
            appliedFilters={appliedFilters}
            onMenuItemClick={handleFiltersSelection}
          />
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <h6 className="text-muted" style={{ fontSize: '14px' }}>
            {'Other'}
          </h6>
        </ListItem>
        {['Search', 'Gb Scanned', 'Timestamp'].map((text, index) => (
          <ListItem key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: '20px',
          marginBottom: '50px',
        }}
      >
        <FilterButton
          label={'Apply Filters'}
          onClick={() => {}}
          variant="contained"
        />
      </div>
    </Grid>
  );
}
