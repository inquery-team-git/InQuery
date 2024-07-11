import { useRouter } from 'next/router';
import React from 'react';
import { Container, Nav, Navbar, NavItem } from 'reactstrap';

import Brand from '@/components/Brand';
import NavButton from '@/components/Buttons/NavButton';
import NavIconButton from '@/components/Buttons/NavIconButton';
import type { Logo, Route } from '@/types';

interface PublicNavbarProps {
  logo: Logo;
  leftRoutes: Route[];
  rightRoutes: Route[];
}

function PublicNavbar({ logo, leftRoutes, rightRoutes }: PublicNavbarProps) {
  const router = useRouter();
  const activeRoute = (routeName: string) => {
    return router.route.indexOf(routeName) > -1;
  };

  return (
    <Navbar
      className="navbar-top navbar-light public-navbar"
      expand="md"
      id="navbar-main"
      style={{
        background: '#000',
      }}
    >
      <div className="content-container">
        <Container className="content-inner-container" fluid>
          {/* Left Navs */}
          <Nav className="align-items-center d-md-flex" navbar>
            <NavItem>
              {/* Brand */}
              <Brand logo={logo} />
            </NavItem>
            <NavButton routes={leftRoutes} activeRoute={activeRoute} />
          </Nav>
          {/* Right Navs */}
          <Nav className="align-items-center d-md-flex" navbar>
            <NavIconButton routes={rightRoutes} activeRoute={activeRoute} />
          </Nav>
        </Container>
      </div>
    </Navbar>
  );
}

export default PublicNavbar;
