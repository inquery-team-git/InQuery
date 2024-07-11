/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import { Container } from 'reactstrap';

import inQueryLogo from '@/assets/images/brand/inquery_small_dark.png';
import StandardFooter from '@/components/Footers/Standard';
import StandardNavbar from '@/components/Navbars/StandardNavbar';

import { standardNavbarRoutes } from './routes';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function StandardLayout(props: AdminLayoutProps) {
  const mainContentRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  });

  return (
    <div className="main-content p-0" ref={mainContentRef}>
      <StandardNavbar
        leftRoutes={standardNavbarRoutes.left}
        rightRoutes={standardNavbarRoutes.right}
        logo={{
          innerLink: '/',
          imgSrc: inQueryLogo,
          imgAlt: 'Inquery Logo',
        }}
      />
      {props.children}
      <Container
        fluid
        style={{
          width: '100%',
          textAlign: 'center',
          position: 'fixed',
          bottom: 0,
          boxShadow: '0px 0px 8px 8px #e6e6e6',
        }}
      >
        <StandardFooter />
      </Container>
    </div>
  );
}

export default StandardLayout;
