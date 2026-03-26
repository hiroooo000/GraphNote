import { ReactFlow, Controls, Background, BackgroundVariant, addEdge, useNodesState, useEdgesState, Connection, Edge, NodeTypes } from '@xyflow/react';
import { useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import './index.css';
import { CustomNode, CustomNodeType } from './components/CustomNode';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const initialNodes: CustomNodeType[] = [
  { id: '1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Load Dataset (CSV)', filename: 'load_data.py', status: 'success' } },
  { id: '2', type: 'custom', position: { x: 50, y: 180 }, data: { label: 'Remove Nulls & Clean', filename: 'clean_data.py', status: 'running' } },
  { id: '3', type: 'custom', position: { x: 50, y: 310 }, data: { label: 'Generate Plot', filename: 'plot.py', status: 'idle' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--vscode-focusBorder, #3b82f6)' } },
  { id: 'e2-3', source: '2', target: '3', animated: false, style: { stroke: 'var(--vscode-editorLineNumber-foreground, #cbd5e1)' } }
];

function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--vscode-editorLineNumber-foreground, #cbd5e1)" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
