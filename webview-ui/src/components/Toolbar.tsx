import React from 'react';
import { Save, Plus, Scissors, Copy, ClipboardPaste, Play, Square, RotateCw, FastForward, Bug, ExternalLink } from 'lucide-react';

export function Toolbar() {
  return (
    <div className="absolute top-0 left-0 w-full z-40 bg-slate-100 border-b border-slate-300 flex items-center justify-between px-4 py-1.5 shadow-sm text-slate-700 font-sans">
      
      {/* Left Group */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Save size={16} strokeWidth={2.5} />} label="Save" />
        <ToolbarButton icon={<Plus size={16} strokeWidth={2.5} />} label="Add Cell (Node)" />
        
        <div className="w-px h-5 bg-slate-300 mx-1.5" />
        
        <ToolbarButton icon={<Scissors size={16} strokeWidth={2.5} />} label="Cut Cell" />
        <ToolbarButton icon={<Copy size={16} strokeWidth={2.5} />} label="Copy Cell" />
        <ToolbarButton icon={<ClipboardPaste size={16} strokeWidth={2.5} />} label="Paste Cell" />
        
        <div className="w-px h-5 bg-slate-300 mx-1.5" />
        
        <ToolbarButton icon={<Play size={16} fill="currentColor" />} label="Run Cell" />
        <ToolbarButton icon={<Square size={16} fill="currentColor" />} label="Interrupt the kernel" />
        <ToolbarButton icon={<RotateCw size={16} strokeWidth={2.5} />} label="Restart the kernel" />
        <ToolbarButton icon={<FastForward size={16} fill="currentColor" />} label="Restart and Run All" />
        
        <div className="w-px h-5 bg-slate-300 mx-1.5" />
        
        {/* Dropdown Mock */}
        <select className="bg-slate-50 border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700 ml-1 outline-none font-medium appearance-none min-w-[80px]">
          <option>Code</option>
          <option>Markdown</option>
          <option>Raw</option>
        </select>
      </div>

      {/* Right Group */}
      <div className="flex items-center gap-4 text-[13px] font-medium text-slate-600">
        <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
          JupyterLab <ExternalLink size={14} />
        </button>
        <ToolbarButton icon={<Bug size={16} strokeWidth={2.5} />} label="Debugger" />
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-1 rounded transition-colors">
          <span>Python 3 (ipykernel)</span>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-600" title="Kernel Status (Idle)"></div>
        </div>
      </div>

    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors flex items-center justify-center group relative cursor-pointer" title={label}>
      {icon}
      {/* Tooltip */}
      <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity shadow-lg z-50 font-normal">
        {label}
      </span>
    </button>
  );
}
