import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import type { Route } from '@/types';

interface NavListProps {
  routes: Route[];
}

const NavList = ({ routes }: NavListProps) => {
  const router = useRouter();

  const activeRoute = (routeName: string) => {
    return router.route.indexOf(routeName) > -1;
  };

  return (
    <List style={{ padding: '0px' }}>
      {routes.map((route: Route, key) => {
        const showActive = activeRoute(route.layout + route.path);
        return (
          <ListItem key={key} style={{ padding: '8px 0px' }}>
            <Link href={route.layout + route.path}>
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '8px',
                  background: showActive ? '#000000' : '#FFFFFF',
                  padding: '0 12px',
                }}
              >
                {route.icon && (
                  <ListItemIcon
                    style={{
                      minWidth: '0px',
                      marginRight: '10px',
                      color: showActive ? '#FFFFFF' : '#000000',
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={route.name}
                  style={{ color: showActive ? '#FFFFFF' : '#000000' }}
                />
              </div>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default NavList;
