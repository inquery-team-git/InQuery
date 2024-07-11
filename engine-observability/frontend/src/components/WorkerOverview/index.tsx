import React from 'react';

// import { isObject } from "lodash/fp";
// import { getWorkerOverview } from "@/data/worker.data";
import type { TimestampFilter } from '@/types';

import OverViewComponent from './component';

// interface IWorkerOverview {
//   title: string;
//   total: string;
//   increment: string;
// }

interface WorkerOverViewProps {
  handleFilterChange?: (value: TimestampFilter) => void;
}
const WorkerOverview = (props: WorkerOverViewProps) => {
  // const [workerOverviews, setWorkerOverviews] = useState<IWorkerOverview[]>(
  //   []
  // );
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  // const onError = (err: string | ErrorProps) => {
  //   setError(isObject(err) ? err.message : err);
  //   setLoading(false);
  // };

  // const onFetchWorkerOverviewSuccess = (data: any) => {
  //   setWorkerOverviews(data);
  //   setLoading(false);
  // };

  // const handleFetchWorkerOverview = () => {
  //   if (loading) return false;
  //   setLoading(true);
  //   return getWorkerOverview().then(onFetchWorkerOverviewSuccess, onError);
  // };

  // useEffect(() => {
  //   handleFetchWorkerOverview();
  //   const interval = setInterval(handleFetchWorkerOverview, 30 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <OverViewComponent
      items={[]}
      handleFilterChange={props.handleFilterChange}
    />
  );
};

export default WorkerOverview;
