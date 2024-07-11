import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button, Grid } from '@mui/material';
import * as React from 'react';

import { DEFAULT_TIME_FILTER, timePeriodFilters } from '@/constants';
import type { TimestampFilter } from '@/types';

import SelectField from '../ReduxFields/SelectField';

interface OverViewItemProps {
  title: string;
  total: string;
  increment?: string;
  decrement?: string;
}

type OverViewItem = {
  title: string;
  total: string;
  increment?: string;
  decrement?: string;
};

const OverViewItemComponent = (props: OverViewItemProps) => {
  return (
    <Grid
      item
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '100%',
        minWidth: '200px',
        overflowWrap: 'break-word',
        padding: '15px 20px',
        borderRadius: '15px',
        background: 'border-box rgb(255, 255, 255)',
        minHeight: '100px',
        marginRight: '10px',
        marginTop: '15px',
        position: 'relative',
      }}
      xs={12}
      sm={5.6}
      lg={2.8}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p
          style={{
            fontSize: '24px',
            margin: '0px',
            fontWeight: 600,
          }}
        >
          {props.total}
        </p>
        <div
          style={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}
        >
          {props.increment && (
            <React.Fragment>
              <ArrowDropUpIcon fontSize="large" htmlColor="#2AAF66" />
              <p
                style={{
                  margin: '0px',
                  color: '#2AAF66',
                }}
              >
                {props.increment}
              </p>
            </React.Fragment>
          )}
          {props.decrement && (
            <React.Fragment>
              <ArrowDropDownIcon fontSize="large" htmlColor="#EB0013" />
              <p
                style={{
                  margin: '0px',
                  color: '#EB0013',
                }}
              >
                {props.decrement}
              </p>
            </React.Fragment>
          )}
        </div>
      </div>
      <p
        style={{
          margin: '0px',
        }}
      >
        {props.title}
      </p>
    </Grid>
  );
};

interface WorkerOverViewProps {
  title?: string;
  items: OverViewItem[];
  handleFilterChange?: (value: TimestampFilter) => void;
}

export default function WorkerOverViewComponent(props: WorkerOverViewProps) {
  const { title, items, handleFilterChange } = props;
  const [timePeriod, setTimePeriod] =
    React.useState<TimestampFilter>(DEFAULT_TIME_FILTER);

  const hanldeTimePeriod = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const filter = event.target.value as TimestampFilter;
    setTimePeriod(filter);
    if (handleFilterChange) {
      handleFilterChange(filter);
    }
  };

  return (
    <React.Fragment>
      {title && (
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
          }}
          container
        >
          <Grid
            item
            style={{
              marginRight: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              position: 'relative',
              minWidth: '200px',
              overflowWrap: 'break-word',
              padding: '15px 20px',
              borderRadius: '15px',
              background: 'border-box rgb(255, 255, 255)',
              minHeight: '100px',
              marginTop: '15px',
            }}
          >
            <p
              style={{
                marginBottom: '10px',
                marginRight: '20px',
                lineHeight: 1.7,
                fontSize: '24px',
                margin: '0px',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  color: '#000',
                  marginRight: '5px',
                }}
              >
                {title}
              </span>
              <span>Overview</span>
            </p>
            <p style={{ color: '#2BAE66FF', margin: '0px' }}>
              <a
                href="http://inquery-demo.com:8081"
                target="_blank"
                style={{ color: '#2BAE66FF' }}
                rel="noreferrer"
              >
                http://inquery-demo.com:8081
              </a>
            </p>
          </Grid>
        </Grid>
      )}
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
        container
      >
        {items.map((item) => (
          <OverViewItemComponent {...item} key={item.title} />
        ))}
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            minWidth: '200px',
            overflowWrap: 'break-word',
            padding: '15px 20px',
            borderRadius: '15px',
            background: 'border-box rgb(255, 255, 255)',
            minHeight: '100px',
            marginRight: '10px',
            marginTop: '15px',
            position: 'relative',
          }}
          xs={12}
          sm={5.6}
          lg={2.8}
        >
          <Button
            variant="text"
            disableRipple
            style={{
              // textDecoration: "underline",
              padding: '0px',
              lineHeight: 1.7,
              fontSize: '14px',
            }}
          >
            Cluster Properties
          </Button>

          <SelectField
            name="time_period"
            value={timePeriod}
            options={timePeriodFilters}
            variant="standard"
            style={{ minWidth: '166px' }}
            onChange={hanldeTimePeriod}
            disableUnderline={true}
            height="48px"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
