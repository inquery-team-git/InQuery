import { TaskMetrics } from '../../../../domain/taskMetrics';
import { TaskMetricsEntity } from '../entities/taskMetrics.entity';

export class TaskMetricsMapper {
  static toDomain(raw: TaskMetricsEntity): TaskMetrics {
    const taskMetrics = new TaskMetrics();
    taskMetrics.task_names = raw.task_names;
    taskMetrics.elapsed = raw.elapsed;
    taskMetrics.queued = raw.queued;
    taskMetrics.start = raw.start;
    taskMetrics.end_time = raw.end_time;
    taskMetrics.node = raw.node;
    taskMetrics.drivers = raw.drivers;
    taskMetrics.total_scheduled_time = raw.total_scheduled_time;
    taskMetrics.total_cpu_time = raw.total_cpu_time;
    taskMetrics.total_blocked_time = raw.total_blocked_time;
    taskMetrics.processed_input_data_size = raw.processed_input_data_size;
    taskMetrics.processed_input_positions = raw.processed_input_positions;
    taskMetrics.time_difference_seconds = raw.time_difference_seconds;
    taskMetrics.total_time_stage = raw.total_time_stage;
    taskMetrics.max_child_end = raw.max_child_end;
    taskMetrics.inserted_at = raw.inserted_at;
    return taskMetrics;
  }

  static toPersistence(taskMetrics: TaskMetrics): TaskMetricsEntity {
    const taskMetricsEntity = new TaskMetricsEntity();
    taskMetricsEntity.task_names = taskMetrics.task_names;
    taskMetricsEntity.elapsed = taskMetrics.elapsed;
    taskMetricsEntity.queued = taskMetrics.queued;
    taskMetricsEntity.start = taskMetrics.start;
    taskMetricsEntity.end_time = taskMetrics.end_time;
    taskMetricsEntity.node = taskMetrics.node;
    taskMetricsEntity.drivers = taskMetrics.drivers;
    taskMetricsEntity.total_scheduled_time = taskMetrics.total_scheduled_time;
    taskMetricsEntity.total_cpu_time = taskMetrics.total_cpu_time;
    taskMetricsEntity.total_blocked_time = taskMetrics.total_blocked_time;
    taskMetricsEntity.processed_input_data_size =
      taskMetrics.processed_input_data_size;
    taskMetricsEntity.processed_input_positions =
      taskMetrics.processed_input_positions;
    taskMetricsEntity.time_difference_seconds =
      taskMetrics.time_difference_seconds;
    taskMetricsEntity.total_time_stage = taskMetrics.total_time_stage;
    taskMetricsEntity.max_child_end = taskMetrics.max_child_end;
    taskMetricsEntity.inserted_at = taskMetrics.inserted_at;
    return taskMetricsEntity;
  }
}
