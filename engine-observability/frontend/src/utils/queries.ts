/* eslint-disable no-param-reassign */

export function parseDataSize(value: string): number | null {
  const DATA_SIZE_PATTERN = /^\s*(\d+(?:\.\d+)?)\s*([a-zA-Z]+)\s*$/;
  const match = DATA_SIZE_PATTERN.exec(value);
  if (match === null) {
    return null;
  }
  const number = parseFloat(match[1] as string);
  switch (match[2]) {
    case 'B':
      return number;
    case 'kB':
      return number * 2 ** 10;
    case 'MB':
      return number * 2 ** 20;
    case 'GB':
      return number * 2 ** 30;
    case 'TB':
      return number * 2 ** 40;
    case 'PB':
      return number * 2 ** 50;
    default:
      return null;
  }
}

export function precisionRound(n: number): string {
  if (n < 10) {
    return n.toFixed(2);
  }
  if (n < 100) {
    return n.toFixed(1);
  }
  return Math.round(n).toString();
}

function formatDataSizeMinUnit(size: number, minUnit: string): string {
  let unit = minUnit;
  if (size === 0) {
    return `0${unit}`;
  }
  if (size >= 1024) {
    size /= 1024;
    unit = `K${minUnit}`;
  }
  if (size >= 1024) {
    size /= 1024;
    unit = `M${minUnit}`;
  }
  if (size >= 1024) {
    size /= 1024;
    unit = `G${minUnit}`;
  }
  if (size >= 1024) {
    size /= 1024;
    unit = `T${minUnit}`;
  }
  if (size >= 1024) {
    size /= 1024;
    unit = `P${minUnit}`;
  }
  return precisionRound(size) + unit;
}

export function formatDataSize(size: number): string {
  return formatDataSizeMinUnit(size, 'B');
}

export function formatCount(count: number): string {
  let unit = '';
  if (count > 1000) {
    count /= 1000;
    unit = 'K';
  }
  if (count > 1000) {
    count /= 1000;
    unit = 'M';
  }
  if (count > 1000) {
    count /= 1000;
    unit = 'B';
  }
  if (count > 1000) {
    count /= 1000;
    unit = 'T';
  }
  if (count > 1000) {
    count /= 1000;
    unit = 'Q';
  }
  return precisionRound(count) + unit;
}

export function formatRows(count: number): string {
  if (count === 1) {
    return '1 row';
  }

  return `${formatCount(count)} rows`;
}

export function parseAndFormatDataSize(value: string): string {
  const parsed = parseDataSize(value);

  if (parsed == null) {
    return '';
  }

  return formatDataSize(parsed);
}

const STATE_COLOR_MAP = {
  QUEUED: '#1b8f72',
  RUNNING: '#19874e',
  PLANNING: '#674f98',
  FINISHED: '#1a4629',
  BLOCKED: '#61003b',
  USER_ERROR: '#9a7d66',
  CANCELED: '#858959',
  INSUFFICIENT_RESOURCES: '#7f5b72',
  EXTERNAL_ERROR: '#ca7640',
  UNKNOWN_ERROR: '#943524',
};

export function getQueryStateColor(
  queryState: string,
  error: any,
  fullyBlocked = false
): string {
  switch (queryState) {
    case 'QUEUED':
      return STATE_COLOR_MAP.QUEUED;
    case 'PLANNING':
      return STATE_COLOR_MAP.PLANNING;
    case 'STARTING':
    case 'FINISHING':
    case 'RUNNING':
      if (fullyBlocked) {
        return STATE_COLOR_MAP.BLOCKED;
      }
      return STATE_COLOR_MAP.RUNNING;
    case 'FAILED':
      switch (error.errorType) {
        case 'USER_ERROR':
          if (error.errorCode.name === 'USER_CANCELED') {
            return STATE_COLOR_MAP.CANCELED;
          }
          return STATE_COLOR_MAP.USER_ERROR;
        case 'EXTERNAL':
          return STATE_COLOR_MAP.EXTERNAL_ERROR;
        case 'INSUFFICIENT_RESOURCES':
          return STATE_COLOR_MAP.INSUFFICIENT_RESOURCES;
        default:
          return STATE_COLOR_MAP.UNKNOWN_ERROR;
      }
    case 'FINISHED':
      return STATE_COLOR_MAP.FINISHED;
    default:
      return STATE_COLOR_MAP.QUEUED;
  }
}

export function getStageStateColor(
  stageState: string,
  fullyBlocked: false
): string {
  switch (stageState) {
    case 'PLANNED':
      return STATE_COLOR_MAP.QUEUED;
    case 'SCHEDULING':
    case 'SCHEDULING_SPLITS':
    case 'SCHEDULED':
      return STATE_COLOR_MAP.PLANNING;
    case 'RUNNING':
      if (fullyBlocked) {
        return STATE_COLOR_MAP.BLOCKED;
      }
      return STATE_COLOR_MAP.RUNNING;
    case 'FINISHED':
      return STATE_COLOR_MAP.FINISHED;
    case 'CANCELED':
    case 'ABORTED':
      return STATE_COLOR_MAP.CANCELED;
    case 'FAILED':
      return STATE_COLOR_MAP.UNKNOWN_ERROR;
    default:
      return '#b5b5b5';
  }
}
