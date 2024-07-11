/* eslint-disable tailwindcss/no-custom-classname */
import cn from 'classnames';
import React from 'react';

import inQueryLogo from '@/assets/images/brand/inquery_small_dark.png';
import AuthNavbar from '@/components/Navbars/AuthNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function AuthLayout(props: AdminLayoutProps) {
  const mainContentRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  });

  return (
    <div className={cn('main-content p-0')} ref={mainContentRef}>
      <AuthNavbar
        logo={{
          innerLink: '/',
          imgSrc: inQueryLogo,
          imgAlt: 'Inquery Logo',
        }}
        className={props.className}
      />
      {props.children}
    </div>
  );
}

export default AuthLayout;
