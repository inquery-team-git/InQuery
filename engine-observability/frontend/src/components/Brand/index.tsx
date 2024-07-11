import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

import type { Logo } from '@/types';

interface BrandImageProps {
  logo: Logo;
}

function BrandImage({ logo }: BrandImageProps) {
  return (
    <Image
      alt={logo.imgAlt}
      className="navbar-brand-img"
      src={logo.imgSrc}
      height={46}
      width={40}
    />
  );
}

function Brand({ logo }: BrandImageProps) {
  return (
    <Fragment>
      {logo && logo.innerLink ? (
        <Link href={logo.innerLink}>
          <BrandImage logo={logo} />
        </Link>
      ) : null}
      {logo && logo.outterLink ? (
        <a href={logo.innerLink} target="_blank" rel="noreferrer">
          <BrandImage logo={logo} />
        </a>
      ) : null}
    </Fragment>
  );
}

export default Brand;
