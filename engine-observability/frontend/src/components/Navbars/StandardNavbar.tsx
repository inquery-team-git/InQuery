import { useRouter } from 'next/router';
import React from 'react';
import { Container, Nav, Navbar, NavItem } from 'reactstrap';

import Brand from '@/components/Brand';
import NavButton from '@/components/Buttons/NavButton';
import type { Logo, Route } from '@/types';

interface StandardNavbarProps {
  logo: Logo;
  leftRoutes: Route[];
  rightRoutes: Route[];
}

function StandardNavbar({
  logo,
  leftRoutes,
  rightRoutes,
}: StandardNavbarProps) {
  const router = useRouter();
  const activeRoute = (routeName: string) => {
    return router.route.indexOf(routeName) > -1;
  };

  return (
    <>
      <Navbar
        className="navbar-top navbar-light"
        expand="md"
        id="navbar-main"
        style={{
          background: '#000',
        }}
      >
        <Container fluid>
          {/* Left Navs */}
          <Nav className="align-items-start d-md-flex" navbar>
            <NavItem>
              {/* Brand */}
              <Brand logo={logo} />
            </NavItem>
            <NavButton routes={leftRoutes} activeRoute={activeRoute} />
          </Nav>
          {/* Right Navs */}
          <Nav className="align-items-center d-md-flex" navbar>
            <NavButton routes={rightRoutes} activeRoute={activeRoute} />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default StandardNavbar;
