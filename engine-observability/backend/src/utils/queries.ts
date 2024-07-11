import _ from 'lodash';
import { type Edge, type Node } from 'reactflow';
import { convertBytes, convertMillisecondsToHHMM } from './helper';

const NODE_WIDTH = 400;
const VERTICAL_DISTANCE = 400;
export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

const calculateTreeWidth = (root: any): number => {
  if (root.subStages.length === 0) {
    return NODE_WIDTH;
  }
  return root.subStages.reduce(
    (acc: any, child: any) => acc + calculateTreeWidth(child),
    0,
  );
};

export const calculatePositions = (
  root: any,
  xCenter: number = 0,
  level: number = 0,
) => {
  if (!root) {
    return;
  }
  const numberOfChildren = root.subStages.length;

  // Calculate the width required for this subtree
  const totalWidth = calculateTreeWidth(root);

  // Set the position for the current root node
  root.xPosition = xCenter;
  root.yPosition = level * VERTICAL_DISTANCE;

  if (numberOfChildren === 0) {
    return;
  }

  // Calculate the starting X position for the first child
  let startX =
    xCenter - totalWidth / 2 + calculateTreeWidth(root.subStages[0]) / 2;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfChildren; i++) {
    const child = root.subStages[i];
    const childWidth = calculateTreeWidth(child);
    const childCenter = startX;

    // Recursively calculate positions for subStages
    calculatePositions(child, childCenter, level + 1);

    // Move startX to the next position for the following child
    startX += childWidth;
  }
};

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

const flattenStage = (
  nodes: Node<any>[],
  edges: Edge<any>[],
  root: any,
  level = 0,
) => {
  if (!root) return;
  const numberOfChildren = root.subStages.length;
  let nodeType = 'input-output';
  if (level === 0) {
    nodeType = 'input';
  } else if (!numberOfChildren) {
    nodeType = 'output';
  }
  nodes.push({
    id: root.plan.id,
    type: 'customNode',
    data: {
      nodeType,
      label: root.stageId,
      stageId: root.stageId,
      stageStats: _.pick(root.stageStats, [
        'fullyBlocked',
        'totalCpuTime',
        'bufferedDataSize',
        'totalBlockedTime',
        'userMemoryReservation',
        'queuedDrivers',
        'runningDrivers',
        'completedDrivers',
        'rawInputDataSize',
        'rawInputPositions',
      ]),
      state: root.state,
    },
    position: {
      y: root.yPosition,
      x: root.xPosition,
    },
    style: {
      width: `${NODE_WIDTH}px`,
      height: 'max-content',
    },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  });

  if (root.subStages && root.subStages.length) {
    root.subStages.forEach((child: any) => {
      edges.push({
        id: `edge${root.plan.id}-${child.plan.id}`,
        source: root.plan.id,
        target: child.plan.id,
        animated: true,
        style: { stroke: '#fff' },
        data: {
          label: `${parseAndFormatDataSize(
            child.stageStats.outputDataSize,
          )} / ${formatRows(child.stageStats.outputPositions)}`,
        },
        type: 'custom',
      });
      flattenStage(nodes, edges, child, level + 1);
    });
  }
};

export const getQueryActivePercentage = (
  elapsed_time = 0,
  execution_time = 0,
) => {
  if (elapsed_time > 0) return (execution_time / elapsed_time) * 100;
  return 0;
};

export const getStageNodesAndEdges = (
  stage_info_json: any,
): {
  nodes: Node<any>[];
  edges: Edge<any>[];
} => {
  const nodes: Node<any>[] = [];
  const edges: Edge<any>[] = [];
  calculatePositions(stage_info_json);
  flattenStage(nodes, edges, stage_info_json);
  return { nodes, edges };
};

export const parseDateFromQueryId = (dateString: string): Date | null => {
  const regex = /^(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/;
  const match = dateString.match(regex);

  if (!match) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_x, year, month, day, hour, minute, second] = match;

  // Create a new Date object
  const date = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // Month is zero-based in JavaScript Date
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(minute, 10),
    parseInt(second, 10),
  );

  return date;
};

export const getQueryOverView = (data: Record<string, any>) => {
  return [
    {
      title: 'User',
      total: data.user,
    },
    {
      title: 'Query State',
      total: data.query_state,
    },
    {
      title: 'Catalog',
      total: data.catalog,
    },
    {
      title: 'CPU Time',
      total: convertMillisecondsToHHMM(data.cpu_time_millis),
    },
    {
      title: 'Active',
      total: `${getQueryActivePercentage(
        data.wall_time_millis,
        data.execution_time_millis,
      ).toFixed(2)}%`,
    },
    {
      title: 'Elapsed Time',
      total: convertMillisecondsToHHMM(data.wall_time_millis),
    },
    {
      title: 'Peak Memory',
      total: convertBytes(data.peak_memory_bytes),
    },
    {
      title: 'Bytes Read',
      total: convertBytes(data.total_bytes),
    },
    {
      title: 'Rows Read',
      total: data.total_rows,
    },
    {
      title: 'Bytes Output',
      total: convertBytes(data.output_bytes),
    },
    {
      title: 'Rows Output',
      total: data.output_rows,
    },
  ];
};

export const getExecutionDetails = (data: Record<string, any>) => {
  return [
    {
      text: 'Resource Group',
      value: data.resource_group_id,
    },
    {
      text: 'Submission Time',
      value: '2024-05-19 1:47am',
    },
    {
      text: 'Completion Time',
      value: '2024-05-19 1:47am',
    },
    {
      text: 'Elapsed Time',
      value: convertMillisecondsToHHMM(data.wall_time_millis),
    },
    {
      text: 'Queued Time',
      value: convertMillisecondsToHHMM(data.queued_time_millis),
    },
    {
      text: 'Analysis Time',
      value: convertMillisecondsToHHMM(data.analysis_time_millis),
    },
    {
      text: 'Planning Time',
      value: convertMillisecondsToHHMM(data.planning_time_millis),
    },
    {
      text: 'Execution Time',
      value: convertMillisecondsToHHMM(data.execution_time_millis),
    },
  ];
};
