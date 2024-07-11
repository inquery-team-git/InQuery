/* eslint-disable tailwindcss/no-custom-classname */
import Button from '@mui/material/Button';
import Link from 'next/link';
import React, { Fragment } from 'react';

import type { Route } from '@/types';

interface NavButtonProps {
  routes: Route[];
  activeRoute: (routeName: string) => boolean;
}

function NavButton({ routes, activeRoute }: NavButtonProps) {
  if (routes.length === 0) return null;

  return (
    <Fragment>
      {routes.map((route: Route) => {
        const showActive =
          route.path.includes('/sign-up') ||
          activeRoute(route.layout + route.path);

        return (
          <Link href={route.layout + route.path} key={route.id} id={route.id}>
            <Button
              aria-label={route.name}
              variant={showActive ? 'contained' : 'outlined'}
              style={{
                color: showActive ? '#FFFFFF' : '#2BAE66FF',
                cursor: 'pointer',
                marginLeft: '15px',
              }}
              className="hide-top-menu"
            >
              {route.name}
            </Button>
          </Link>
        );
      })}
    </Fragment>
  );
}

export default NavButton;
