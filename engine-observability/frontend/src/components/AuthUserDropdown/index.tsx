import { Divider } from '@mui/material';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  UncontrolledDropdown,
} from 'reactstrap';

import type { DropDownRoute } from '@/types';

interface DropdownProps {
  img?: StaticImageData;
  text?: string;
  items: DropDownRoute[];
  companies: DropDownRoute[];
  logout: DropDownRoute;
}

interface DropDownItemProps {
  route: DropDownRoute;
}

const DropDownComponent = (props: DropDownItemProps) => {
  const { route } = props;

  if (route && route.path) {
    return (
      <Link href={route.path}>
        <DropdownItem style={{ display: 'flex' }}>
          <div style={{ marginRight: '10px', minWidth: '24px' }}>
            {route.icon}
          </div>
          <span style={{ color: route.showActive ? '#2AAF66' : '#6f6e77' }}>
            {route.text}
          </span>
        </DropdownItem>
      </Link>
    );
  }
  return (
    <DropdownItem onClick={route.onClick} style={{ display: 'flex' }}>
      <div style={{ marginRight: '10px', minWidth: '24px' }}>{route.icon}</div>
      <span style={{ color: route.showActive ? '#2AAF66' : '#6f6e77' }}>
        {route.text}
      </span>
    </DropdownItem>
  );
};

function AuthUserDropdown({
  img,
  text,
  items,
  companies,
  logout,
}: DropdownProps) {
  return (
    <UncontrolledDropdown nav className="profileSection">
      <DropdownToggle className="pr-0" nav style={{ padding: '0px' }}>
        <Media className="align-items-center">
          {img && (
            <div className="avatar rounded-circle">
              <Image alt="..." src={img} style={{ height: '100%' }} />
            </div>
          )}
          {text && (
            <Media className="d-none d-lg-block ml-2" style={{ color: '#FFF' }}>
              <span className="font-weight-bold mb-0 text-sm">{text}</span>
            </Media>
          )}
        </Media>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" end>
        <DropdownItem header tag="div">
          <h6>Welcome!</h6>
        </DropdownItem>
        {items.map((item, index) => (
          <DropDownComponent route={item} key={index} />
        ))}
        <Divider />
        {companies.map((item, index) => (
          <DropDownComponent route={item} key={index} />
        ))}
        <Divider />
        <DropDownComponent route={logout} />
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default AuthUserDropdown;
