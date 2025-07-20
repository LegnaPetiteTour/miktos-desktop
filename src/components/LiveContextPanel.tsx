import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveContextData {
  sceneInfo?: {
    name: string;
    objects: string[];
    selectedObjects: string[];
    frameCount: number;
  };
  connectorStatus?: {
    blender: boolean;
    comfyui: boolean;
    aibridge: boolean;
  };
  activeWorkflows?: Array<{
    id: string;
    name: string;
    progress: number;
    status: string;
  }>;
  lastUpdate?: number;
}

interface LiveContextPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LiveContextPanel: React.FC<LiveContextPanelProps> = ({ isOpen, onToggle }) => {
  const [contextData, setContextData] = useState<LiveContextData>({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WebSocket connection for real-time updates
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: number | null = null;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket('ws://localhost:8000/ws/status');
        
        ws.onopen = () => {
          console.log('Live context WebSocket connected');
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setContextData(prev => ({
              ...prev,
              ...data,
              lastUpdate: Date.now()
            }));
          } catch (e) {
            console.error('Failed to parse WebSocket message:', e);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          // Attempt to reconnect after 3 seconds
          reconnectTimer = window.setTimeout(connectWebSocket, 3000);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setError('Connection error');
          setIsConnected(false);
        };

      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
        setError('Failed to connect');
        setIsConnected(false);
        // Try to reconnect
        reconnectTimer = window.setTimeout(connectWebSocket, 3000);
      }
    };

    // Initial connection
    connectWebSocket();

    // Cleanup
    return () => {
      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
      }
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Fetch initial data via REST API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/status');
        if (response.ok) {
          const data = await response.json();
          setContextData(prev => ({
            ...prev,
            connectorStatus: {
              blender: data.blender_connected || false,
              comfyui: data.comfyui_status === 'connected',
              aibridge: data.bridge_status === 'running'
            },
            activeWorkflows: data.active_workflows || []
          }));
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
    // Refresh every 30 seconds as fallback
    const interval = setInterval(fetchInitialData, 30000);
    return () => clearInterval(interval);
  }, []);

  const ConnectionStatus: React.FC<{ status: boolean; label: string }> = ({ status, label }) => (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-gray-300">{label}</span>
      <div className={`w-2 h-2 rounded-full ${status ? 'bg-green-400' : 'bg-red-400'}`} />
    </div>
  );

  const WorkflowProgress: React.FC<{ workflow: any }> = ({ workflow }) => (
    <div className="bg-gray-800 rounded p-2 mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-300 truncate">{workflow.name}</span>
        <span className="text-xs text-gray-400">{Math.round(workflow.progress * 100)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1">
        <motion.div
          className="bg-blue-500 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${workflow.progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed right-4 top-20 z-50 p-2 rounded-lg transition-colors ${
          isOpen ? 'bg-blue-600' : 'bg-gray-700'
        } hover:bg-blue-500 text-white shadow-lg`}
        title="Live Context"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          📡
        </motion.div>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-4 top-32 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-40 max-h-96 overflow-y-auto"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Live Context</h3>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
              )}
            </div>

            <div className="p-4 space-y-4">
              {/* Connection Status */}
              <div>
                <h4 className="text-gray-300 text-sm font-medium mb-2">Connections</h4>
                <div className="space-y-1">
                  <ConnectionStatus 
                    status={contextData.connectorStatus?.aibridge || false} 
                    label="AI Bridge" 
                  />
                  <ConnectionStatus 
                    status={contextData.connectorStatus?.comfyui || false} 
                    label="ComfyUI" 
                  />
                  <ConnectionStatus 
                    status={contextData.connectorStatus?.blender || false} 
                    label="Blender" 
                  />
                </div>
              </div>

              {/* Scene Information */}
              {contextData.sceneInfo && (
                <div>
                  <h4 className="text-gray-300 text-sm font-medium mb-2">Scene</h4>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-xs text-gray-300">
                      <span className="text-blue-400">Scene:</span> {contextData.sceneInfo.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      <span className="text-blue-400">Objects:</span> {contextData.sceneInfo.objects.length}
                    </p>
                    <p className="text-xs text-gray-300">
                      <span className="text-blue-400">Selected:</span> {contextData.sceneInfo.selectedObjects.length}
                    </p>
                  </div>
                </div>
              )}

              {/* Active Workflows */}
              {contextData.activeWorkflows && contextData.activeWorkflows.length > 0 && (
                <div>
                  <h4 className="text-gray-300 text-sm font-medium mb-2">Active Workflows</h4>
                  <div className="space-y-1">
                    {contextData.activeWorkflows.map(workflow => (
                      <WorkflowProgress key={workflow.id} workflow={workflow} />
                    ))}
                  </div>
                </div>
              )}

              {/* System Status */}
              <div>
                <h4 className="text-gray-300 text-sm font-medium mb-2">System</h4>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-xs text-gray-300">
                    <span className="text-blue-400">Status:</span> {isConnected ? 'Online' : 'Offline'}
                  </p>
                  {contextData.lastUpdate && (
                    <p className="text-xs text-gray-300">
                      <span className="text-blue-400">Last Update:</span>{' '}
                      {new Date(contextData.lastUpdate).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-gray-300 text-sm font-medium mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-1 px-2 rounded transition-colors"
                    onClick={() => {
                      // Refresh scene info
                      fetch('http://localhost:8000/api/v1/scene-info')
                        .then(res => res.json())
                        .then(data => {
                          setContextData(prev => ({
                            ...prev,
                            sceneInfo: data.scene_info
                          }));
                        })
                        .catch(console.error);
                    }}
                  >
                    Refresh Scene
                  </button>
                  <button 
                    className="bg-green-600 hover:bg-green-500 text-white text-xs py-1 px-2 rounded transition-colors"
                    onClick={() => {
                      // Test connection
                      fetch('http://localhost:8000/health')
                        .then(res => {
                          if (res.ok) {
                            setError(null);
                          } else {
                            setError('Service unavailable');
                          }
                        })
                        .catch(() => setError('Connection failed'));
                    }}
                  >
                    Test Connection
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
