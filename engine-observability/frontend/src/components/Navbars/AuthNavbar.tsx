import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Nav, Navbar, NavItem } from 'reactstrap';

import Brand from '@/components/Brand';
import NavTextLink from '@/components/Buttons/NavTextButton';
import type { Logo } from '@/types';

interface StandardNavbarProps {
  logo: Logo;
  className?: string;
}

function StandardNavbar({ logo, className }: StandardNavbarProps) {
  const router = useRouter();

  const showSignup =
    router.pathname.includes('/login') ||
    router.pathname.includes('/forgot-password');
  const showLogin = router.pathname.includes('/sign-up');

  return (
    <>
      <Navbar
        className={cn('navbar-top navbar-light', className)}
        expand="md"
        id="navbar-main"
        style={{
          background: '#000',
        }}
      >
        <Container fluid style={{ margin: 'auto' }}>
          {/* Left Navs */}
          <Nav className="align-items-center d-md-flex" navbar>
            <NavItem>
              {/* Brand */}
              <Brand logo={logo} />
            </NavItem>
          </Nav>
          {/* Right Navs */}
          <Nav className="align-items-center d-md-flex" navbar>
            {showSignup && (
              <NavTextLink
                description={'Don’t have an account?'}
                linkText={'Sign Up'}
                path={'/sign-up'}
              />
            )}
            {showLogin && (
              <NavTextLink
                description={'Already have an account?'}
                linkText={'Login'}
                path={'/login'}
              />
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default StandardNavbar;
