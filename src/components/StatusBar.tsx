import React from 'react';
import { Wifi, WifiOff, Cpu, HardDrive, Zap } from 'lucide-react';

interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
}

interface AIBridgeStatus {
  bridge_status: string;
  comfyui_status: string;
  available_models: string[];
  active_tasks: number;
  available_workflows: number;
}

interface StatusBarProps {
  aiConnected: boolean;
  aiBridgeStatus: AIBridgeStatus | null;
  systemInfo: SystemInfo | null;
  isGenerating: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  aiConnected, 
  aiBridgeStatus, 
  systemInfo, 
  isGenerating 
}) => {
  return (
    <div className="bg-gray-900 border-t border-gray-800 px-4 py-2">
      <div className="flex items-center justify-between text-sm">
        {/* Left side - AI Connection */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {aiConnected ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-gray-400">
              {aiConnected ? 'AI Bridge Connected' : 'AI Bridge Disconnected'}
            </span>
          </div>
          
          {/* ComfyUI Status */}
          {aiBridgeStatus && (
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                aiBridgeStatus.comfyui_status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <span className="text-gray-400">
                ComfyUI {aiBridgeStatus.comfyui_status}
              </span>
            </div>
          )}
          
          {/* Generation Status */}
          <div className="flex items-center space-x-2">
            <Zap className={`w-4 h-4 ${isGenerating ? 'text-miktos-primary animate-pulse' : 'text-gray-400'}`} />
            <span className="text-gray-400">
              {isGenerating ? 'Generating...' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Center - AI Stats */}
        <div className="flex items-center space-x-4">
          {aiBridgeStatus ? (
            <>
              <span className="text-gray-400">
                {aiBridgeStatus.available_workflows} workflows
              </span>
              <span className="text-gray-400">
                {aiBridgeStatus.active_tasks} active tasks
              </span>
              <span className="text-gray-400">
                Phase 2: Core Features
              </span>
            </>
          ) : (
            <span className="text-gray-400">
              Phase 2: Core Features Development
            </span>
          )}
        </div>

        {/* Right side - System Info */}
        <div className="flex items-center space-x-4">
          {systemInfo && (
            <>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">
                  {systemInfo.platform} {systemInfo.arch}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">
                  v{systemInfo.version}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;