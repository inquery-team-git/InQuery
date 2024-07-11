/* eslint-disable tailwindcss/no-custom-classname */
import { IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import React, { Fragment } from 'react';

import type { Route } from '@/types';

interface NavIconButtonProps {
  routes: Route[];
  activeRoute: (routeName: string) => boolean;
}

function NavIconButton({ routes, activeRoute }: NavIconButtonProps) {
  if (routes.length === 0) return null;
  return (
    <Fragment>
      {routes.map((route: Route, key: number) => {
        const showActive = activeRoute(route.layout + route.path);
        return (
          <Link href={route.layout + route.path} key={`${route.id}-${key}`}>
            <Tooltip title={route.name}>
              <IconButton
                color={showActive ? 'primary' : 'default'}
                style={{ cursor: 'pointer', marginRight: '15px' }}
                className="hide-top-menu"
              >
                {route.icon}
              </IconButton>
            </Tooltip>
          </Link>
        );
      })}
    </Fragment>
  );
}

export default NavIconButton;
