import pandas as pd
import numpy as np
import re
from datetime import timedelta


def str_to_timedelta(duration_str):
    # Regex pattern to match the duration parts
    pattern = r'(?P<value>\d+\.?\d*)(?P<unit>ns|us|ms|s|m|h|d)'
    match = re.search(pattern, duration_str)
    if match:
        value = float(match.group('value'))
        unit = match.group('unit')

        # Convert based on unit
        if unit == 'ns':
            return timedelta(microseconds=value/1000).total_seconds()
        elif unit == 'us':
            return timedelta(microseconds=value).total_seconds()
        elif unit == 'ms':
            return timedelta(milliseconds=value).total_seconds()
        elif unit == 's':
            return timedelta(seconds=value).total_seconds()
        elif unit == 'm':
            return timedelta(minutes=value).total_seconds()
        elif unit == 'h':
            return timedelta(hours=value).total_seconds()
        elif unit == 'd':
            return timedelta(days=value).total_seconds()
    return timedelta(0).total_seconds()


def get_value(d, keys):
    # Function to safely get data from nested dicts
    for key in keys:
        try:
            d = d[key]
        except KeyError:
            return None  # or a default value, e.g., 0 or ''
    if ((keys == ('queryStats', 'totalCpuTime')) | (key == "uptime")):
        d = str_to_timedelta(d)
    return d


def calculate_duration(row):
    if pd.isna(row['End']):
        return None  # or some placeholder value, like 'NA'
    else:
        return (row['End'] - row['Start']).total_seconds()


def process_stage_data(stage_data):
    task_names = [i['taskStatus']['taskId'] for i in stage_data['tasks']]
    create_times = [i['stats']['createTime'] for i in stage_data['tasks']]
    end_times = [i['stats'].get('endTime', np.nan)
                 for i in stage_data['tasks']]
    nodes = [i['taskStatus']['nodeId'] for i in stage_data['tasks']]
    # Assuming get_pipelines() is a predefined function you have
    # pipelines = [get_pipelines(i['stats']['pipelines']) for i in stage_data['tasks']]
    drivers = [i['stats']['totalDrivers'] for i in stage_data['tasks']]
    elapsed = [i['stats']['elapsedTime'] for i in stage_data['tasks']]
    queued = [i['stats']['queuedTime'] for i in stage_data['tasks']]

    # Creating a DataFrame
    stage_1 = pd.DataFrame({
        'task_names': task_names,
        'elapsed': elapsed,
        'queued': queued,
        'Start': pd.to_datetime(create_times),
        'End': pd.to_datetime(end_times),
        'node': nodes,
        #     'pipelines': pipelines,
        'drivers': drivers
    })
    metrics = ['totalScheduledTime', 'totalCpuTime', 'totalBlockedTime',
               'processedInputDataSize', 'processedInputPositions']
    for metric in metrics:
        stage_1[metric] = [i['stats'][metric] for i in stage_data['tasks']]
    # Calculate the difference in seconds
    stage_1['time_difference_seconds'] = stage_1.apply(
        calculate_duration, axis=1)
    stage_1['total_time_stage'] = (
        stage_1['End'].max() - stage_1['Start'].min()).total_seconds()
    return stage_1


def extract_stages(all_stages, stage, parent=None):
    # Extract the current stage ID
    stage_id = stage['stageId']
    all_stages[stage_id] = process_stage_data(stage)
#     for task in stage['tasks']:
#         all_tasks[task['taskStatus']['taskId']] = process_pipeline_data(task)
    # If there are subStages, recursively process them
    if 'subStages' in stage:
        child_end = all_stages[stage_id]['Start'].min()
        for substage in stage['subStages']:
            cur_child_end = extract_stages(all_stages, substage, parent=stage_id)
            if (cur_child_end == None):
                child_end = None
                break
            if ((cur_child_end > child_end)):
                child_end = cur_child_end
        # all_stages[stage_id]['maxChildEnd'] = child_end
    all_stages[stage_id]['maxChildEnd'] = child_end
    if (len(all_stages[stage_id]) == 0):
        return None
    return pd.to_datetime(max(all_stages[stage_id]['End']))
