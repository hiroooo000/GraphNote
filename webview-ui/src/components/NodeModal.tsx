import { X, Play, Code, Terminal, FolderOpen, Pencil } from 'lucide-react';
import { CustomNodeType } from './CustomNode';

interface NodeModalProps {
  node: CustomNodeType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NodeModal({ node, isOpen, onClose }: NodeModalProps) {
  if (!isOpen || !node) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl h-[600px] rounded-lg shadow-2xl flex flex-col border border-slate-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()} // 枠外クリックで閉じるための対応
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
              <span>🐍</span>
              {node.data.filename}
              <button
                className="ml-1 p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-blue-600 transition-colors"
                title="Open file"
              >
                <FolderOpen size={14} />
              </button>
            </h2>
            <p className="text-base font-bold text-slate-800 ml-6 flex items-center gap-1.5">
              {node.data.label}
              <button
                className="p-0.5 hover:bg-slate-200 rounded text-slate-400 hover:text-blue-600 transition-colors"
                title="Edit title"
              >
                <Pencil size={13} />
              </button>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-md text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5 gap-4 overflow-hidden bg-white">
          {/* Code Input Field */}
          <div className="flex-1 flex flex-col border border-slate-200 rounded-md shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 flex justify-between items-center border-b border-slate-200">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wide">
                <Code size={14} /> Code Editor
              </span>
              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-sm font-medium">
                <Play size={12} fill="currentColor" /> Run Node
              </button>
            </div>
            <textarea
              className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-[13px] leading-relaxed resize-none focus:outline-none"
              defaultValue={`import pandas as pd\nimport matplotlib.pyplot as plt\n\ndef main():\n    # TODO: Implement logic for ${node.data.filename}\n    print("Executing ${node.data.label}...")\n    pass\n\nif __name__ == "__main__":\n    main()\n`}
              spellCheck={false}
            />
          </div>

          {/* Execution Result Field */}
          <div className="h-[180px] flex flex-col border border-slate-200 rounded-md shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wide">
                <Terminal size={14} /> Output
              </span>
            </div>
            <div className="flex-1 bg-white p-3 font-mono text-[13px] text-slate-700 overflow-auto whitespace-pre-wrap leading-relaxed">
              {node.data.status === 'success'
                ? 'Execution successful.\nProcessed datasets.\n> Done in 0.45s'
                : '> Waiting for execution...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
