import Link from 'next/link';
import { Fragment } from 'react';

import type { LinkType } from '@/types';

interface PublicAttributionsProps {
  links: LinkType[];
}

const PublicAttributions = (props: PublicAttributionsProps) => {
  const { links = [] } = props;

  if (links.length === 0) return null;

  return (
    <div className="attribution">
      <ul className="links">
        {links.map((link, index) => (
          <Fragment key={index}>
            <div className="link-separator">.</div>
            <Link href={link.url} target="_blank" className="link-label">
              {link.label}
            </Link>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default PublicAttributions;
