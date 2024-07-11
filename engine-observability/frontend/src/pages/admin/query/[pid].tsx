'use-client';

import HomeIcon from '@mui/icons-material/Home';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Divider } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

import EnsureLoginRoute from '@/components/auth/ensure-login-route';
import DataNotFound from '@/components/DataNotFound';
import CustomizedBreadcrumbs from '@/components/MuiBreadcrumbs';
import QueryDetails from '@/components/QueryDetails';
import { getQueryDetails } from '@/data/query.data';
import AdminLayout from '@/layouts/Admin';
import type { ErrorProps, IQuery } from '@/types';

const pageCrumbs: Record<string, any>[] = [
  {
    label: 'InQuery',
    disabled: false,
    href: '/admin/cluster',
    actions: [''],
    startIcon: <HomeIcon fontSize="small" style={{ color: '#FFF' }} />,
  },
  {
    label: 'Query History',
    disabled: false,
    href: '/admin/query-history',
    actions: [''],
  },
];

const QueryDetailsPage = () => {
  const router = useRouter();
  const currentQueryId = router.query.pid as string;
  const [queryDetails, setQueryDetails] = useState<IQuery | null>(null);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onError = (err: string | ErrorProps) => {
    setError(_.isObject(err) ? err.message : err);
    setLoading(false);
  };

  const onFetchQueryDetailsSuccess = (query: any) => {
    if (query) {
      setQueryDetails(query);
    }
    setLoading(false);
  };

  const handleFetchQueryDetails = () => {
    if (loading || !currentQueryId) return false;
    setLoading(true);
    return getQueryDetails(currentQueryId).then(
      onFetchQueryDetailsSuccess,
      onError
    );
  };

  useEffect(() => {
    handleFetchQueryDetails();
  }, [currentQueryId]);

  return (
    <EnsureLoginRoute>
      <AdminLayout loading={loading}>
        {_.isEmpty(queryDetails) && !loading ? (
          <DataNotFound
            goback
            title="Query Details not found!"
            backUrl="/admin/query-history"
          />
        ) : (
          <Container className="mt-1" fluid>
            <CustomizedBreadcrumbs
              crumbs={[
                ...pageCrumbs,
                ...(!_.isEmpty(queryDetails)
                  ? [
                      {
                        label: queryDetails.query_id,
                        disabled: false,
                        href: `/admin/query/${queryDetails.query_id}`,
                        actions: [],
                        endIcon: (
                          <UnfoldMoreIcon
                            fontSize="small"
                            style={{ color: '#FFF' }}
                          />
                        ),
                      },
                    ]
                  : []),
              ]}
              selecPlaceholder="Select Query"
            />
            <Divider />
            {queryDetails?.query_id && (
              <QueryDetails
                queryId={currentQueryId}
                queryDetails={queryDetails}
              />
            )}
          </Container>
        )}
      </AdminLayout>
    </EnsureLoginRoute>
  );
};

export default QueryDetailsPage;
