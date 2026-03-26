import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  NodeTypes,
  MarkerType,
  Node,
  ConnectionMode,
} from '@xyflow/react';
import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';
import './index.css';
import { CustomNode, CustomNodeType } from './components/CustomNode';
import { CustomEdge } from './components/CustomEdge';
import { Toolbar } from './components/Toolbar';
import { NodeModal } from './components/NodeModal';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  customCurve: CustomEdge,
};

const initialNodes: CustomNodeType[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 50, y: 50 },
    data: { label: 'Load Dataset (CSV)', filename: 'load_data.py', status: 'success' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 50, y: 180 },
    data: { label: 'Remove Nulls & Clean', filename: 'clean_data.py', status: 'running' },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 50, y: 310 },
    data: { label: 'Generate Plot', filename: 'plot.py', status: 'idle' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customCurve',
    animated: true,
    style: { stroke: 'var(--vscode-focusBorder, #3b82f6)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--vscode-focusBorder, #3b82f6)' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'customCurve',
    style: { stroke: 'var(--vscode-editorLineNumber-foreground, #cbd5e1)', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'var(--vscode-editorLineNumber-foreground, #cbd5e1)',
    },
  },
];

function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes as CustomNodeType[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState<CustomNodeType | null>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'customCurve',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: 'var(--vscode-editorLineNumber-foreground, #cbd5e1)',
            },
            style: { strokeWidth: 2 },
          } as Edge,
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as CustomNodeType);
  }, []);

  return (
    <div className="w-screen h-screen relative bg-slate-50">
      <Toolbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--vscode-editorLineNumber-foreground, #cbd5e1)"
        />
        <Controls />
      </ReactFlow>

      <NodeModal
        node={selectedNode}
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}

export default App;
