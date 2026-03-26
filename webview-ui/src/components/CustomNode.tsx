import { Handle, Position, NodeProps, Node } from '@xyflow/react';

export type CustomNodeData = {
  label: string;
  filename: string;
  status?: 'idle' | 'running' | 'success' | 'error';
};

export type CustomNodeType = Node<CustomNodeData, 'custom'>;

export function CustomNode({ data, selected }: NodeProps<CustomNodeType>) {
  const statusColors = {
    idle: 'border-slate-300',
    running: 'border-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
    success: 'border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]',
    error: 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
  };

  const borderColor = data.status ? statusColors[data.status] : statusColors.idle;
  const selectedClass = selected ? 'ring-2 ring-blue-500 ring-offset-2' : '';

  return (
    <div className={`bg-white rounded-md shadow-sm border ${borderColor} ${selectedClass} min-w-[160px] transition-all duration-200`}>
      <Handle type="source" position={Position.Top} id="top" className="w-2.5 h-2.5 bg-slate-400 border-white border-[1px]" />
      <Handle type="source" position={Position.Left} id="left" className="w-2.5 h-2.5 bg-slate-400 border-white border-[1px]" />
      
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 bg-slate-50/50 rounded-t-md">
        <div className="flex items-center gap-1.5">
          <span className="text-sm" title="Python">🐍</span> 
          <span className="text-[11px] font-semibold text-slate-700 font-mono tracking-wide">{data.filename}</span>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center ml-2">
          {data.status === 'success' && <div className="w-2 h-2 rounded-full bg-green-500" title="Success" />}
          {data.status === 'running' && (
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </div>
          )}
          {data.status === 'error' && <div className="w-2 h-2 rounded-full bg-red-500" title="Error" />}
          {(!data.status || data.status === 'idle') && <div className="w-2 h-2 rounded-full bg-slate-300" title="Idle" />}
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5 text-xs text-slate-700">
        {data.label}
      </div>

      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2.5 h-2.5 bg-slate-400 border-white border-[1px]" />
      <Handle type="source" position={Position.Right} id="right" className="w-2.5 h-2.5 bg-slate-400 border-white border-[1px]" />
    </div>
  );
}
