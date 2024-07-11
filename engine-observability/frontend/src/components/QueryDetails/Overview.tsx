import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Grid from '@mui/material/Grid';
import * as React from 'react';

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
        minWidth: '120px',
        overflowWrap: 'break-word',
        padding: '6px 12px',
        borderRadius: '15px',
        background: 'border-box rgb(255, 255, 255)',
        minHeight: '60px',
        marginRight: '10px',
        marginTop: '15px',
        position: 'relative',
      }}
      xs={5.6}
      sm={3.6}
      lg={1.8}
    >
      <p
        style={{
          margin: '0px',
        }}
      >
        {props.title}
      </p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p
          style={{
            fontSize: '16px',
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
    </Grid>
  );
};

interface QueryOverviewProps {
  title?: string;
  url?: string;
  urlText?: string;
  subText?: string;
  items: OverViewItem[];
}

export default function QueryOverview(props: QueryOverviewProps) {
  const { title, url, urlText, subText, items } = props;

  return (
    <React.Fragment>
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
            minWidth: '220px',
            overflowWrap: 'break-word',
            padding: '15px 20px',
            borderRadius: '15px',
            background: 'border-box rgb(255, 255, 255)',
            minHeight: '60px',
            marginTop: '15px',
          }}
        >
          {title && (
            <p
              style={{
                marginBottom: '10px',
                marginRight: '20px',
                lineHeight: 1.7,
                fontSize: '16px',
                margin: '0px',
                fontWeight: 600,
                color: '#000',
              }}
            >
              {title}
            </p>
          )}
          {url && (
            <p style={{ color: '#2BAE66FF', margin: '0px' }}>
              <a href={url} style={{ color: '#2BAE66FF' }} rel="noreferrer">
                {urlText}
              </a>
            </p>
          )}
          {subText && (
            <p
              style={{ color: '#000', margin: '0px' }}
            >{`Submitted at: ${subText}`}</p>
          )}
        </Grid>
      </Grid>
      <Grid
        style={{
          display: 'flex',
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
      </Grid>
    </React.Fragment>
  );
}
