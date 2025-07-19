import React, { useState } from 'react';
import { Play, Plus, Save, Download, Zap, Layers, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface WorkflowNode {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  inputs: string[];
  outputs: string[];
}

const WorkflowCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'sdxl_model',
      title: 'SDXL Model',
      x: 50,
      y: 50,
      inputs: [],
      outputs: ['model'],
    },
    {
      id: '2',
      type: 'text_prompt',
      title: 'Text Prompt',
      x: 280,
      y: 80,
      inputs: [],
      outputs: ['prompt'],
    },
    {
      id: '3',
      type: 'pbr_generator',
      title: 'PBR Generator',
      x: 500,
      y: 50,
      inputs: ['model', 'prompt'],
      outputs: ['diffuse', 'normal', 'roughness'],
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const handleExecuteWorkflow = () => {
    console.log('Executing workflow...');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Layers className="w-5 h-5 mr-2 text-miktos-primary" />
            AI Workflow Canvas
          </h2>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Node</span>
            </button>
            
            <button 
              onClick={handleExecuteWorkflow}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-miktos-primary to-miktos-secondary rounded-lg text-sm text-white hover:shadow-lg hover:shadow-miktos-primary/30 transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Execute</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex">
        {/* Node Canvas */}
        <div className="flex-1 bg-gray-950 relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Workflow Nodes */}
          <div className="relative z-10 p-4">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute bg-gray-800 border rounded-lg p-3 min-w-[180px] cursor-pointer transition-all duration-200 ${
                  selectedNode === node.id 
                    ? 'border-miktos-primary shadow-lg shadow-miktos-primary/30' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                style={{ left: node.x, top: node.y }}
                onClick={() => handleNodeClick(node.id)}
              >
                {/* Node Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{node.title}</h3>
                  <div className="flex items-center space-x-1">
                    {node.type === 'sdxl_model' && <Zap className="w-4 h-4 text-miktos-primary" />}
                    {node.type === 'text_prompt' && <Settings className="w-4 h-4 text-miktos-secondary" />}
                    {node.type === 'pbr_generator' && <Layers className="w-4 h-4 text-miktos-accent" />}
                  </div>
                </div>

                {/* Node Content */}
                <div className="text-xs text-gray-400 mb-2">
                  {node.type === 'sdxl_model' && 'stable-diffusion-xl-base'}
                  {node.type === 'text_prompt' && 'Enter your description...'}
                  {node.type === 'pbr_generator' && 'Generate PBR texture maps'}
                </div>

                {/* Node Ports */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {node.inputs.map((input, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"
                        title={input}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-1">
                    {node.outputs.map((output, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 bg-miktos-primary rounded-full border-2 border-gray-800"
                        title={output}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none">
              <path
                d="M 230 90 Q 280 90 280 100 T 320 100"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 460 100 Q 480 100 480 75 T 500 75"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-gray-900 border-l border-gray-800 p-4">
          <div className="space-y-4">
            {/* Live Preview */}
            <div>
              <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Live Preview
              </h3>
              <div className="bg-gray-800 rounded-lg h-48 flex items-center justify-center border border-gray-700">
                <div className="text-center text-gray-400">
                  <Download className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Preview will appear here</p>
                </div>
              </div>
            </div>

            {/* Generation Progress */}
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Generation Progress</h3>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Processing...</span>
                  <span className="text-miktos-primary">0%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-miktos-primary to-miktos-secondary h-2 rounded-full transition-all duration-300" style={{ width: '0%' }} />
                </div>
              </div>
            </div>

            {/* Node Properties */}
            {selectedNode && (
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Node Properties</h3>
                <div className="bg-gray-800 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Node ID:</span>
                    <span className="text-white">{selectedNode}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{nodes.find(n => n.id === selectedNode)?.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">Ready</span>
                  </div>
                </div>
              </div>
            )}

            {/* Model Info */}
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Active Models</h3>
              <div className="bg-gray-800 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Base Model:</span>
                  <span className="text-white">SDXL 1.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ControlNet:</span>
                  <span className="text-white">None</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">LoRA:</span>
                  <span className="text-white">None</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">VRAM:</span>
                  <span className="text-white">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;