import DescriptionIcon from '@mui/icons-material/Description';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Nav, Navbar, NavItem } from 'reactstrap';

import team from '@/assets/images/theme/user_image.png';
import AuthUserDropdown from '@/components/AuthUserDropdown';
import Brand from '@/components/Brand';
import NavButton from '@/components/Buttons/NavButton';
import NavIconButton from '@/components/Buttons/NavIconButton';
import { unAuthenticateUser } from '@/redux/auth/auth.slice';
import type { CompanyDetail, Logo, Route } from '@/types';

interface AdminNavbarProps {
  logo: Logo;
  leftRoutes: Route[];
  rightRoutes: Route[];
  companies: CompanyDetail[];
  handleCompanyChange: (company: CompanyDetail) => void;
}

function AdminNavbar({
  logo,
  leftRoutes,
  rightRoutes,
  companies,
  handleCompanyChange,
}: AdminNavbarProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const activeRoute = (routeName: string) => {
    return router.route.indexOf(routeName) > -1;
  };

  const handleLogout = () => {
    dispatch(unAuthenticateUser());
  };

  const renderCompanies = () => {
    return companies.map((company) => ({
      text: company.companyName,
      showActive: company.showActive,
      onClick: () => handleCompanyChange(company),
    }));
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
          <Nav
            className="align-items-center d-md-flex"
            navbar
            style={{ alignItems: 'center !important' }}
          >
            <NavItem>
              {/* Brand */}
              <Brand logo={logo} />
            </NavItem>
            <NavButton routes={leftRoutes} activeRoute={activeRoute} />
          </Nav>
          {/* Right Navs */}
          <Nav className="align-items-center d-md-flex" navbar>
            <NavIconButton routes={rightRoutes} activeRoute={activeRoute} />
            <AuthUserDropdown
              img={team}
              text={'InQuery User'}
              items={[
                {
                  icon: <SettingsIcon htmlColor="#6f6e77" fontSize="small" />,
                  text: 'Settings',
                  path: '/admin/settings/profile',
                },
                {
                  icon: (
                    <DescriptionIcon htmlColor="#6f6e77" fontSize="small" />
                  ),
                  text: 'Docs',
                  path: '#docs',
                },
                {
                  icon: <HelpIcon htmlColor="#6f6e77" fontSize="small" />,
                  text: 'Help',
                  path: '#help',
                },
              ]}
              companies={renderCompanies()}
              logout={{
                icon: <LogoutIcon htmlColor="#6f6e77" fontSize="small" />,
                text: 'Logout',
                onClick: handleLogout,
              }}
            />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
