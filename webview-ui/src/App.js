"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@xyflow/react");
require("@xyflow/react/dist/style.css");
require("./index.css");
const initialNodes = [
    { id: '1', position: { x: 50, y: 50 }, data: { label: 'Input Data' }, className: 'bg-slate-800 border-slate-700 text-white rounded-lg shadow-xl' },
    { id: '2', position: { x: 50, y: 150 }, data: { label: 'Process Data' }, className: 'bg-slate-800 border-slate-700 text-white rounded-lg shadow-xl' },
    { id: '3', position: { x: 50, y: 250 }, data: { label: 'Visualize' }, className: 'bg-slate-800 border-blue-500 text-blue-100 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]' },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6' } }
];
function App() {
    return (<div className="w-screen h-screen bg-slate-900">
      <react_1.ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <react_1.Background variant={react_1.BackgroundVariant.Dots} gap={20} size={1} color="#334155"/>
        <react_1.Controls />
      </react_1.ReactFlow>
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map