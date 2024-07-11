'use-client';

import { styled } from '@mui/material/styles';
import React from 'react';

import QueryFiltersTab from '@/components/QueryHistory/Filters';
import QueryHistoryHeader from '@/components/QueryHistory/Header';
import QueryHistoryTable from '@/components/QueryHistory/Result';
import type { Option } from '@/components/QueryHistory/Sidebar';
import QueryFiltersSidebar from '@/components/QueryHistory/Sidebar';

const queryFilters = [
  {
    id: 'status',
    label: 'Status',
    type: 'multiselect',
    options: [
      {
        text: 'Failed',
        value: 'FAILED',
      },
      {
        text: 'Finished',
        value: 'FINISHED',
      },
    ],
  },
  {
    id: 'user',
    label: 'User',
    type: 'multiselect',
    options: [
      {
        text: 'trino',
        value: 'trino',
      },
      {
        text: 'Arturas',
        value: 'Arturas',
      },
      {
        text: 'Anurag',
        value: 'Anurag',
      },
      {
        text: 'Erick',
        value: 'Erick',
      },
      {
        text: 'Khalil',
        value: 'Khalil',
      },
    ],
  },
  {
    id: 'source',
    label: 'Source',
    type: 'multiselect',
    options: [
      {
        text: 'API',
        value: 'API',
      },
      {
        text: 'Trino CLI',
        value: 'trino-cli',
      },
    ],
  },
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: "15px 0px 15px 15px",
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface QueryHistoryProps {
  clusterOptions: Option[];
  handleLoading?: (value: boolean) => void;
}

const QueryHistoryComponent = (props: QueryHistoryProps) => {
  const { clusterOptions = [], handleLoading } = props;
  const [open, setOpen] = React.useState(false);
  const [appliedFilters, setAppliedFilters] = React.useState<
    Record<string, any>
  >({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFiltersSelection = (
    filter: string,
    value: string,
    checked: boolean,
    type?: string
  ) => {
    setAppliedFilters((prevFilters) => {
      const filters = { ...prevFilters };
      filters[filter] = filters[filter] || [];
      if (type === 'singleSelect') {
        filters[filter] = checked ? (filters[filter] = [value]) : [];
        return filters;
      }
      const index = filters[filter].indexOf(value);
      if (checked) filters[filter].push(value);
      else if (index > -1) filters[filter].splice(index, 1);
      return filters;
    });
  };

  const handleFilterReset = () => {
    setAppliedFilters({});
  };

  if (!clusterOptions.length) return null;
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <QueryHistoryHeader />
        <Main open={open}>
          <QueryFiltersTab
            handleDrawerOpen={handleDrawerOpen}
            appliedFilters={appliedFilters}
            handleFilterReset={handleFilterReset}
            handleFiltersSelection={handleFiltersSelection}
            filters={[
              // TODO: Disabled cluster filter temporarily
              // {
              //   id: 'cluster',
              //   label: 'Clusters',
              //   type: 'multiselect',
              //   options: clusterOptions,
              // },
              ...queryFilters,
            ]}
          />
          <QueryHistoryTable
            appliedFilters={appliedFilters}
            handleLoading={handleLoading}
          />
        </Main>
      </div>
      <QueryFiltersSidebar
        openDrawer={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        appliedFilters={appliedFilters}
        handleFilterReset={handleFilterReset}
        handleFiltersSelection={handleFiltersSelection}
        filters={[
          {
            id: 'cluster',
            label: 'Clusters',
            type: 'multiselect',
            options: clusterOptions,
          },
          ...queryFilters,
        ]}
      />
    </div>
  );
};

export default QueryHistoryComponent;
