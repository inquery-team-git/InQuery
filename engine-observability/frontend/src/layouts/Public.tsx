/* eslint-disable tailwindcss/no-custom-classname */
import { isObject } from 'lodash';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import inQueryLogo from '@/assets/images/brand/inquery_small_dark.png';
import PublicNavbar from '@/components/Navbars/PublicNavbar';
import PublicChangelogSidebar from '@/components/PublicChangelogSidebar';
import { getAllLabels } from '@/data/public/labels.data';
import type { IPublicChangelogSidebar } from '@/interfaces';
import { setLabelsList } from '@/redux/public/labels.slice';
import type { Label } from '@/types';

import { publicNavBarRoutes } from './routes';

interface PublicLayoutProps {
  children: React.ReactNode;
}
interface ErrorProps {
  message: string;
}

function PublicLayout(props: PublicLayoutProps & IPublicChangelogSidebar) {
  const { backEnabled, filters = [], links = [], onClickFilter } = props;
  const mainContentRef = React.createRef<HTMLDivElement>();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const dataFetchedRef = useRef(false);
  console.log(error, processing);

  const onError = (err: string | ErrorProps) => {
    setError(isObject(err) ? err.message : err);
    setProcessing(false);
  };

  const onFetchCompanyLabelsSuccess = (data: Label[]) => {
    dispatch(setLabelsList(data));
    setError('');
    setProcessing(false);
  };

  const handleFetchCompanyLabels = () => {
    return getAllLabels().then(onFetchCompanyLabelsSuccess, onError);
  };

  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handleFetchCompanyLabels();
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  });

  return (
    <div className="main-content p-0" ref={mainContentRef}>
      <PublicNavbar
        leftRoutes={publicNavBarRoutes.left}
        rightRoutes={publicNavBarRoutes.right}
        logo={{
          innerLink: '/admin/cluster',
          imgSrc: inQueryLogo,
          imgAlt: 'Inquery Logo',
        }}
      />
      <div className="content-container">
        <div className="content-inner-container">
          <div className="public-changelog">
            <PublicChangelogSidebar
              backEnabled={backEnabled}
              filters={filters}
              links={links}
              onClickFilter={onClickFilter}
            />
            <div className="pchangelogList">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
