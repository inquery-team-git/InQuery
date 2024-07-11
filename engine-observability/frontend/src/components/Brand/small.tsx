import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

import type { Logo } from '@/types';

interface BrandImageProps {
  logo: Logo;
  style?: Record<string, any>;
}

export function BrandImage({ logo, style }: BrandImageProps) {
  return (
    <Image
      alt={logo.imgAlt}
      className="navbar-brand-img"
      src={logo.imgSrc}
      style={{ width: '35px', height: '20px', ...style }}
    />
  );
}

function BrandSmall({ logo }: BrandImageProps) {
  return (
    <Fragment>
      {logo && logo.innerLink ? (
        <Link
          href={logo.innerLink}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <BrandImage logo={logo} />
        </Link>
      ) : null}
      {logo && logo.outterLink ? (
        <a
          href={logo.innerLink}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <BrandImage logo={logo} />
        </a>
      ) : null}
    </Fragment>
  );
}

export default BrandSmall;
