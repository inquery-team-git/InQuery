import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import Box from '@mui/material/Box';
import type { ButtonPropsVariantOverrides } from '@mui/material/Button';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import type { OverridableStringUnion } from '@mui/types';
import React, { useState } from 'react';

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
    <ListItem disablePadding>
      <Button
        variant={variant}
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
          border: variant === 'text' ? 'none' : '1px solid #D9D9D9',
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
    </ListItem>
  );
};

interface FilterOptionsProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  options: Record<string, any>[];
  appliedFilters: Record<string, any>;
  currentFilter: string;
  onClose: () => void;
  onMenuItemClick: (
    filter: string,
    value: string,
    checked: boolean,
    type?: string
  ) => void;
}

const FilterOptions = (props: FilterOptionsProps) => {
  const {
    options = [],
    currentFilter,
    onMenuItemClick,
    appliedFilters = {},
  } = props;

  if (!options.length) return null;
  return (
    <Menu
      id="lock-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
      }}
    >
      {options.map((opt) => (
        <MenuItem
          key={opt.value}
          selected={
            appliedFilters[currentFilter] &&
            appliedFilters[currentFilter].includes(opt.value)
          }
        >
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            checked={
              (appliedFilters[currentFilter] &&
                appliedFilters[currentFilter].includes(opt.value)) ||
              false
            }
            onChange={(_event, checked) =>
              onMenuItemClick(currentFilter, opt.value, checked)
            }
          />
          {opt.text}
        </MenuItem>
      ))}
    </Menu>
  );
};

interface Options {
  text: string;
  value: string;
}

interface Filter {
  id: string;
  label: string;
  type: string;
  options: Options[];
}

interface QueryFiltersProps {
  appliedFilters: Record<string, any>;
  filters: Filter[];
  handleDrawerOpen: () => void;
  handleFilterReset: () => void;
  handleFiltersSelection: (
    filter: string,
    value: string,
    checked: boolean,
    type?: string
  ) => void;
}

export default function QueryFiltersTab(props: QueryFiltersProps) {
  const {
    appliedFilters = {},
    filters = [],
    handleFilterReset,
    handleFiltersSelection,
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentFilter, setCurrentFilter] = React.useState<string>('');
  const [currentFilterOptions, setCurrentFilterOptions] = React.useState<
    Record<string, any>[]
  >([]);
  const open = Boolean(anchorEl);

  const handleClickListItem = (
    event: React.MouseEvent<HTMLElement>,
    filter: string,
    options: Record<string, any>[]
  ) => {
    setCurrentFilter(filter);
    setCurrentFilterOptions(options);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <List
          sx={{
            display: 'flex',
            padding: '0px !important',
          }}
        >
          {filters.map((f, index) => {
            return (
              <FilterButton
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  handleClickListItem(event, f.id, f.options)
                }
                label={f.label}
                endIcon={<KeyboardArrowDownIcon />}
                key={index}
              />
            );
          })}
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{ margin: '0 0 0 16px' }}
          />

          {/* <FilterButton
            onClick={props.handleDrawerOpen}
            label={"All Filters"}
          /> */}

          <FilterButton
            onClick={handleFilterReset}
            label={'Reset'}
            variant="text"
          />
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List
          sx={{
            display: 'flex',
            padding: '0px !important',
          }}
        >
          <ListItem disablePadding>
            <Tooltip title="Clear Filters">
              <IconButton
                sx={{
                  marginLeft: '15px',
                }}
                onClick={handleFilterReset}
              >
                <RepeatIcon htmlColor="#000000" fontSize="medium" />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </Toolbar>
      <FilterOptions
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        currentFilter={currentFilter}
        appliedFilters={appliedFilters}
        options={currentFilterOptions}
        onMenuItemClick={handleFiltersSelection}
      />
    </div>
  );
}
