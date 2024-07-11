/* eslint-disable unused-imports/no-unused-vars */
import 'reactflow/dist/style.css';

import React, { useCallback } from 'react';
import type { Connection, Edge, EdgeTypes, Node } from 'reactflow';
import ReactFlow, {
  addEdge,
  Controls,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import CustomEdge from './CustomEdge';
import CustomEdgeStartEnd from './CustomEdgeStartEnd';
import CustomNode from './CustomNode';

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid: [number, number] = [20, 20];

const nodeTypes = {
  customNode: CustomNode,
};
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
  startEnd: CustomEdgeStartEnd,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

interface StagesGraphProps {
  stageNodes: Node<any>[];
  stageEdges: Edge<any>[];
}

const StagesGraph = (props: StagesGraphProps) => {
  const { stageNodes = [], stageEdges = [] } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(stageNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(stageEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)
      ),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: initBgColor }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
      nodesDraggable={false}
    >
      <Controls onInteractiveChange={() => {}} showInteractive={false} />
    </ReactFlow>
  );
};

export default StagesGraph;
