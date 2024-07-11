import React, { Fragment } from 'react';

import EmptyComponent from './component';

interface DataNotFoundProps {
  title: string;
  goback?: boolean;
  backUrl?: string;
}

const DataNotFound = (props: DataNotFoundProps) => {
  return (
    <Fragment>
      <EmptyComponent
        title={props.title}
        goback={props.goback}
        backUrl={props.backUrl}
      />
    </Fragment>
  );
};

export default DataNotFound;
