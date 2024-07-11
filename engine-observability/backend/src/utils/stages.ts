import _ from 'lodash';
import moment, { Moment } from 'moment';

interface TaskStats {
  createTime: string;
  endTime: string;
  elapsedTime: number;
  queuedTime: number;
}

interface Task {
  stats: TaskStats;
}

interface StageData {
  stageId: string;
  tasks: Task[];
  subStages?: StageData[];
}

interface Stage1 {
  elapsed: number[];
  queued: number[];
  startTime: Moment[];
  endTime: Moment[];
  maxChildEnd?: Moment;
}

interface StageDict {
  stage: string;
  startTime: Date;
  realStartTime: Date;
  endTime: Date;
}

const processStageData = (stageData: StageData): Stage1 => {
  const createTimes: string[] = stageData.tasks.map(
    (task) => task.stats.createTime,
  );
  const endTimes: string[] = stageData.tasks.map((task) => task.stats.endTime);
  const elapsed: number[] = stageData.tasks.map(
    (task) => task.stats.elapsedTime,
  );
  const queued: number[] = stageData.tasks.map((task) => task.stats.queuedTime);

  const startTime: Moment[] = createTimes.map((time) => moment(time));
  const endTime: Moment[] = endTimes.map((time) => moment(time));

  return {
    elapsed: elapsed,
    queued: queued,
    startTime: startTime,
    endTime: endTime,
  };
};

const extractStages = (
  stage: StageData,
  allStages: { [key: string]: Stage1 },
): Moment => {
  const stageId = stage.stageId;
  allStages[stageId] = processStageData(stage);

  let childEnd: Moment = moment.min(
    allStages[stageId].startTime as unknown as Moment[],
  );

  if (stage.subStages && stage.subStages.length) {
    _.forEach(stage.subStages, (subStage) => {
      const curChildEnd = extractStages(subStage, allStages);
      if (curChildEnd > childEnd) {
        childEnd = curChildEnd;
      }
    });
  }

  allStages[stageId].maxChildEnd = childEnd;
  return moment.max(allStages[stageId].endTime as unknown as Moment[]);
};

export const generateStagesExecutionMetrics = (
  stage: StageData,
): StageDict[] => {
  const allStages: { [key: string]: Stage1 } = {};
  extractStages(stage, allStages);
  return Object.entries(allStages).map(([k, v]) => ({
    stage: k,
    startTime: moment.min(v.startTime as unknown as Moment[]).toDate(),
    realStartTime: v.maxChildEnd
      ? moment(v.maxChildEnd).toDate()
      : moment.min(v.startTime as unknown as Moment[]).toDate(),
    endTime: moment.max(v.endTime as unknown as Moment[]).toDate(),
  }));
};
