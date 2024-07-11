/* eslint-disable no-console */
/* eslint-disable tailwindcss/no-custom-classname */
import React, { Fragment, memo } from 'react';
import { Handle, Position } from 'reactflow';

import {
  formatRows,
  getStageStateColor,
  parseAndFormatDataSize,
} from '@/utils/queries';

// eslint-disable-next-line react/display-name
export default memo(({ data, isConnectable }: any) => {
  return (
    <Fragment>
      {(data.nodeType === 'output' || data.nodeType === 'input-output') && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#555' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      )}
      <div>
        <div
          style={{
            background: getStageStateColor(
              data.state,
              data.stageStats.fullyBlocked
            ),
            color: '#FFF',
            paddingTop: '5px',
          }}
        >
          <h3 className="margin-top: 0" style={{ color: '#FFF' }}>
            Stage {data.stageId}
          </h3>
          {data.state}
        </div>
        <div style={{ padding: '10px 2px' }}>
          CPU: {data.stageStats.totalCpuTime}
          <br />
          Buffered: {parseAndFormatDataSize(data.stageStats.bufferedDataSize)}
          <br />
          {data.stageStats.fullyBlocked ? (
            <div style={{ color: '#ff0000' }}>
              Blocked: {data.stageStats.totalBlockedTime}{' '}
            </div>
          ) : (
            <div>Blocked: {data.stageStats.totalBlockedTime} </div>
          )}
          Memory:{' '}
          {parseAndFormatDataSize(data.stageStats.userMemoryReservation)}
          <br />
          Splits:{' '}
          {`Q:${data.stageStats.queuedDrivers}, R:${data.stageStats.runningDrivers}, F:${data.stageStats.completedDrivers}`}
          <hr style={{ margin: '0px' }} />
          Input:{' '}
          {`${parseAndFormatDataSize(
            data.stageStats.rawInputDataSize
          )} / ${formatRows(data.stageStats.rawInputPositions)}`}
        </div>
      </div>
      {(data.nodeType === 'input' || data.nodeType === 'input-output') && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
      )}
    </Fragment>
  );
});
