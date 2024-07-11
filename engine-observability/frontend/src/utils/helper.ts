import SuccessIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorIcon from '@mui/icons-material/ErrorRounded';
import RunningIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PausedIcon from '@mui/icons-material/StopCircleRounded';
import moment from 'moment';

export const formatBytes = (bytes: number): string => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
  if (!bytes) return '0 Byte';
  const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
  console.log(bytes, i);
  const convertedValue: number = bytes / 1024 ** i;
  const roundedValue: number = Math.round(convertedValue * 100) / 100; // Keep two decimal places
  return `${roundedValue} ${sizes[i]}`;
};

export const convertTimeDifference = (value: Date) => {
  const creationMoment = moment(value);
  const currentMoment = moment();
  // Calculate the difference
  const duration = moment.duration(currentMoment.diff(creationMoment));

  // Get the difference in days, hours, minutes, and seconds
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let age = '';
  if (days) age += `${days} d `;
  if (hours) age += `${hours} h `;
  if (minutes) age += `${minutes} m `;
  if (seconds) age += `${seconds} s `;
  return age;
};

export const QueryStatusMapping = {
  finished: {
    title: 'Finished',
    icon: SuccessIcon,
    color: '#2BAE66',
  },
  failed: {
    title: 'Failed',
    icon: ErrorIcon,
    color: '#ff3d00',
  },
  paused: {
    title: 'Paused',
    icon: PausedIcon,
    color: '#ff9800',
  },
  running: {
    title: 'Running',
    icon: RunningIcon,
    color: '#03a9f4',
  },
};

export const ClusterStatusMapping = {
  deleted: {
    title: 'Deleted',
    icon: ErrorIcon,
    color: '#ff3d00',
  },
  inactive: {
    title: 'Inactive',
    icon: PausedIcon,
    color: '#ff9800',
  },
  active: {
    title: 'Active',
    icon: RunningIcon,
    color: '#03a9f4',
  },
};
