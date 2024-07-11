import React from 'react';
import { Spinner } from 'reactstrap';

interface PageChangeProps {
  path: string;
}

export default function PageChange(props: PageChangeProps) {
  return (
    <div>
      <div className="page-transition-wrapper-div">
        <div className="page-transition-icon-wrapper mb-3">
          <Spinner
            color="primary"
            style={{ width: '6rem', height: '6rem', borderWidth: '.3rem' }}
          />
        </div>
        <h4 className="title text-white">
          Loading page contents for: {props.path}
        </h4>
      </div>
    </div>
  );
}
