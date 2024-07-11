import { TimestampFilter } from './types';

export const PASSWORD_REGEX = /^(?=[a-zA-Z0-9])[\w@]{8,16}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const DEFAULT_TIME_FILTER = TimestampFilter.last_minute;
export const timePeriodFilters = [
  {
    text: 'Last 24 hours',
    value: 'last_24_hours',
    type: 'hour',
    intervalPeriod: 60 * 60 * 1000,
  },
  {
    text: 'Last 6 Hours',
    value: 'last_6_hours',
    type: 'hour',
    intervalPeriod: 60 * 60 * 1000,
  },
  {
    text: 'Last Hour',
    value: 'last_hour',
    type: 'minute',
    intervalPeriod: 60 * 1000,
  },
  {
    text: 'Last 30 minutes',
    value: 'last_30_minutes',
    type: 'minute',
    intervalPeriod: 60 * 1000,
  },
  {
    text: 'Last 15 minutes',
    value: 'last_15_minutes',
    type: 'minute',
    intervalPeriod: 60 * 1000,
  },
  {
    text: 'Last 5 minutes',
    value: 'last_5_minutes',
    type: 'minute',
    intervalPeriod: 5 * 1000,
  },
  {
    text: 'Last minute',
    value: 'last_minute',
    type: 'second',
    intervalPeriod: 3 * 1000,
  },
];
