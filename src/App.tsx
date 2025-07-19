import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Brain, Settings, Image } from 'lucide-react';
import { motion } from 'framer-motion';

import Sidebar from './components/Sidebar';
import AICommandBar from './components/AICommandBar';
import WorkflowCanvas from './components/WorkflowCanvas';
import StatusBar from './components/StatusBar';

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

function App() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [aiConnected, setAiConnected] = useState(false);
  const [aiBridgeStatus, setAiBridgeStatus] = useState<AIBridgeStatus | null>(null);
  const [activeView, setActiveView] = useState('workspace');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load system info and check AI bridge connection
    const initApp = async () => {
      try {
        const info = await invoke<SystemInfo>('get_system_info');
        setSystemInfo(info);
        
        await checkAIBridgeConnection();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initApp();
    
    // Set up periodic status checks
    const statusInterval = setInterval(checkAIBridgeConnection, 10000); // Check every 10 seconds
    
    return () => clearInterval(statusInterval);
  }, []);

  const checkAIBridgeConnection = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/status');
      if (response.ok) {
        const status = await response.json();
        setAiBridgeStatus(status);
        setAiConnected(status.bridge_status === 'running');
      } else {
        setAiConnected(false);
        setAiBridgeStatus(null);
      }
    } catch (error) {
      setAiConnected(false);
      setAiBridgeStatus(null);
    }
  };

  const handleAICommand = async (command: string) => {
    try {
      setIsGenerating(true);
      
      const response = await fetch('http://localhost:8000/api/v1/execute-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          parameters: {},
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('AI Command Response:', result);
        
        // If we got a task_id, we can monitor progress
        if (result.task_id) {
          await monitorTaskProgress(result.task_id);
        }
      } else {
        console.error('AI Command failed:', response.statusText);
      }
    } catch (error) {
      console.error('AI Command Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const monitorTaskProgress = async (taskId: string) => {
    const maxAttempts = 30; // 5 minutes max
    let attempts = 0;
    
    const checkProgress = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/task/${taskId}`);
        if (response.ok) {
          const progress = await response.json();
          console.log('Task Progress:', progress);
          
          if (progress.status === 'completed') {
            console.log('Task completed successfully:', progress.result);
            return true;
          } else if (progress.status === 'error') {
            console.error('Task failed:', progress.message);
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error('Error checking task progress:', error);
        return false;
      }
    };
    
    const progressInterval = setInterval(async () => {
      attempts++;
      const isComplete = await checkProgress();
      
      if (isComplete || attempts >= maxAttempts) {
        clearInterval(progressInterval);
      }
    }, 2000); // Check every 2 seconds
  };

  return (
    <div className="flex h-screen bg-miktos-dark text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* AI Command Bar */}
        <AICommandBar 
          onCommand={handleAICommand} 
          connected={aiConnected}
        />

        {/* Main Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {activeView === 'workspace' && (
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WorkflowCanvas />
            </motion.div>
          )}

          {activeView === 'models' && (
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 text-miktos-purple" />
                <h2 className="text-2xl font-semibold mb-2">AI Models</h2>
                <p className="text-gray-400">Model management coming soon...</p>
              </div>
            </motion.div>
          )}

          {activeView === 'gallery' && (
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <Image className="w-16 h-16 mx-auto mb-4 text-miktos-accent" />
                <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
                <p className="text-gray-400">Generated content gallery coming soon...</p>
              </div>
            </motion.div>
          )}

          {activeView === 'settings' && (
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <Settings className="w-16 h-16 mx-auto mb-4 text-miktos-blue" />
                <h2 className="text-2xl font-semibold mb-2">Settings</h2>
                <p className="text-gray-400">Application settings coming soon...</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Status Bar */}
        <StatusBar 
          aiConnected={aiConnected}
          aiBridgeStatus={aiBridgeStatus}
          systemInfo={systemInfo}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}

export default App;