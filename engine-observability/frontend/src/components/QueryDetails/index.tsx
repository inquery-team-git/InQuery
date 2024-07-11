'use-client';

import _ from 'lodash';
import React, { Fragment } from 'react';

import QueryEditor from '@/components/QueryDetails/Editor';
import QueryOverview from '@/components/QueryDetails/Overview';
import QueryPlan from '@/components/QueryDetails/Plan';
import QueryStages from '@/components/QueryDetails/Stages';
import type { IQuery } from '@/types';

import ExecutionDetails from './ExecutionDetails';

interface QueryDetailsProps {
  queryDetails: IQuery;
  queryId: string;
}

const QueryDetails = (props: QueryDetailsProps) => {
  const { queryDetails } = props;

  if (_.isEmpty(queryDetails)) return null;
  return (
    <Fragment>
      <QueryOverview
        title={'Query Id'}
        urlText={props.queryId}
        url={`#`}
        subText={props.queryDetails.submission_time}
        items={queryDetails.overview}
      />
      <QueryEditor query={queryDetails.query} />
      <QueryPlan plan={queryDetails.plan} />
      <QueryStages
        nodes={queryDetails.stage_info.nodes}
        edges={queryDetails.stage_info.edges}
        metrics={queryDetails.execution_metrics}
      />
      <ExecutionDetails rows={queryDetails.execution} />
    </Fragment>
  );
};

export default QueryDetails;
