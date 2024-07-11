import { sortBy } from 'lodash/fp';
import moment, { Moment } from 'moment-timezone';
// import moment, { Moment } from 'moment';
import { LatencyMetrics } from 'src/clusterMetrics/domain/latencyMetrics';

export enum TIMESTAMP_FILTER {
  last_24_hours = 'last_24_hours',
  last_6_hours = 'last_6_hours',
  last_hour = 'last_hour',
  last_30_minutes = 'last_30_minutes',
  last_15_minutes = 'last_15_minutes',
  last_5_minutes = 'last_5_minutes',
  last_minute = 'last_minute',
}

export const generateTimestamps = (filter: TIMESTAMP_FILTER) => {
  if (!filter) return [];
  const currentTime = moment.utc();
  const filterConfig = {
    last_24_hours: { divisor: 1, points: 24, type: 'hour' },
    last_6_hours: { divisor: 1, points: 6, type: 'hour' },
    last_hour: { divisor: 1, points: 60, type: 'minute' },
    last_30_minutes: { divisor: 30, points: 60, type: 'second' },
    last_15_minutes: { divisor: 15, points: 60, type: 'second' },
    last_5_minutes: { divisor: 5, points: 60, type: 'second' },
    last_minute: { divisor: 1, points: 60, type: 'second' },
  };

  const { divisor, points, type } = filterConfig[filter];
  const timestamps: string[] = [];

  for (let i = points - 1; i >= 0; i--) {
    let timestamp = moment.utc(currentTime);
    if (type === 'hour') {
      timestamp = timestamp.subtract(i, 'hours').startOf('hour');
    }
    if (type === 'minute') {
      timestamp = timestamp.subtract(i * divisor, 'minutes').startOf('minute');
    }
    if (type === 'second') {
      timestamp = moment
        .utc(currentTime)
        .subtract(i * divisor, 'seconds')
        .startOf('second');
    }
    timestamps.push(timestamp.format());
  }

  return timestamps;
};

export const getClosetsItemByTimestamp = (timestamp: string, items: any[]) => {
  if (!timestamp || !items.length) return;
  const filterTimestamp = moment.utc(timestamp);
  const sortedItems = sortBy(
    (item) => Math.abs(moment(item.timestamp).diff(filterTimestamp)),
    items,
  );
  return sortedItems[0];
};

export const convertMillisecondsToHHMM = (value: number | string) => {
  const milliseconds = typeof value === 'string' ? parseInt(value, 10) : value;

  // Calculate total hours, minutes, and seconds
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
  const totalMinutes = Math.floor(
    (milliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  const totalSeconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  // Format hours, minutes, and seconds with leading zeros if necessary
  const hours = totalHours.toString().padStart(2, '0');
  const minutes = totalMinutes.toString().padStart(2, '0');
  const seconds = totalSeconds.toString().padStart(2, '0');

  if (totalHours === 0 && totalMinutes === 0 && totalSeconds < 60) {
    return `${milliseconds}ms`;
  }

  // Check if total hours is 0 and total minutes is less than 60
  if (totalHours === 0 && totalMinutes < 60) {
    return `${seconds}s`;
  }

  // Return the formatted string in hh:mm format
  return `${hours}h ${minutes}m`;
};

export const convertBytes = (bytes: number | string) => {
  // Convert input to number if it's a string
  const bytesValue = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;

  const MB = 1024 * 1024;
  const GB = 1024 * 1024 * 1024;

  if (bytesValue >= GB) {
    const gigabytes = (bytesValue / GB).toFixed(2); // Convert to GB and keep 2 decimal places
    return `${gigabytes} GB`;
  } else if (bytesValue >= MB) {
    const megabytes = (bytesValue / MB).toFixed(2); // Convert to MB and keep 2 decimal places
    return `${megabytes} MB`;
  } else {
    return `${bytesValue} Bytes`;
  }
};

export const calculateAverageLatencyBetweenTimestamps = (
  queryResults: LatencyMetrics[],
  timestamps: Moment[],
): number[] => {
  const results: number[] = [];

  for (let i = 0; i < timestamps.length; i++) {
    const startTime = moment.utc(timestamps[i]);
    const endTime = moment.utc(timestamps[i + 1]);

    // Filter query results within the current interval
    const filteredResults = queryResults.filter((qr) => {
      let queryTime = moment.utc(qr.start_time);
      const timezoneOffset = qr.start_time.getTimezoneOffset();
      if (qr.start_time.getTimezoneOffset() < 0) {
        queryTime = queryTime.add(-timezoneOffset, 'minutes');
      } else {
        queryTime = queryTime.subtract(timezoneOffset, 'minutes');
      }
      return endTime
        ? queryTime >= startTime && queryTime < endTime
        : queryTime >= startTime;
    });

    // Calculate average latency
    const totalLatency = filteredResults.reduce(
      (sum, qr) => sum + parseInt(qr.latency),
      0,
    );

    const averageLatency =
      filteredResults.length > 0 ? totalLatency / filteredResults.length : 0;

    // Push the result
    results.push(averageLatency);
  }
  return results;
};
