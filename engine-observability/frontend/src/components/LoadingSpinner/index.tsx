/* eslint-disable tailwindcss/no-custom-classname */

import styled from '@emotion/styled';
import { Backdrop, CircularProgress } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

import inquerySmallLogo from '@/assets/images/brand/inquery_small_dark.png';

import { BrandImage } from '../Brand/small';

const LoadingWarppper = styled.div`
  display: inline-block;
  position: relative;
  .middleRoot {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    position: absolute;
    &$inherit g: {
      fill: theme.palette.common.white;
    }
  }
`;

interface LoadingSpinnerProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';
  middle?: boolean;
  size?: number;
  className?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { size = 50, middle, color = 'primary', className } = props;

  if (middle) {
    return (
      <Backdrop
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress size={size} color={color} thickness={2} />
        <BrandImage
          logo={{
            innerLink: '/',
            imgSrc: inquerySmallLogo,
            imgAlt: 'Inquery Logo',
          }}
          style={{
            width: size * 0.6,
            height: size * 0.6,
            left: `calc(50% - ${(size * 0.6) / 2}px)`,
            top: `calc(50% - ${(size * 0.6) / 2}px)`,
            position: 'absolute',
          }}
        />
      </Backdrop>
    );
  }

  return (
    <LoadingWarppper className={classNames(className)}>
      <div className={classNames('container')}>
        <CircularProgress size={size} color={color} thickness={2} />
        <BrandImage
          logo={{
            innerLink: '/',
            imgSrc: inquerySmallLogo,
            imgAlt: 'Inquery Logo',
          }}
          style={{
            width: size * 0.6,
            height: size * 0.6,
            left: `calc(50% - ${(size * 0.6) / 2}px)`,
            top: `calc(50% - ${(size * 0.6) / 2}px)`,
            position: 'absolute',
          }}
        />
      </div>
    </LoadingWarppper>
  );
};

export default LoadingSpinner;
