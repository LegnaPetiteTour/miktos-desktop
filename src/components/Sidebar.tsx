import React from 'react';
import { Brain, Layers, Image, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'workspace', icon: Brain, label: 'AI Workspace', tooltip: 'AI-powered creative workspace' },
    { id: 'workflows', icon: Layers, label: 'Workflows', tooltip: 'ComfyUI workflows and templates' },
    { id: 'models', icon: Brain, label: 'Models', tooltip: 'AI models and LoRAs' },
    { id: 'gallery', icon: Image, label: 'Gallery', tooltip: 'Generated content gallery' },
  ];

  const settingsItems = [
    { id: 'settings', icon: Settings, label: 'Settings', tooltip: 'Application settings' },
  ];

  return (
    <div className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-miktos-primary to-miktos-accent rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col space-y-4">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
              ${activeView === item.id 
                ? 'bg-gradient-to-br from-miktos-primary to-miktos-secondary shadow-lg shadow-miktos-primary/30' 
                : 'bg-gray-800 hover:bg-gray-700'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={item.tooltip}
          >
            <item.icon className={`w-6 h-6 ${activeView === item.id ? 'text-white' : 'text-gray-400'}`} />
          </motion.button>
        ))}
      </nav>

      {/* Settings */}
      <div className="mt-auto">
        {settingsItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
              ${activeView === item.id 
                ? 'bg-gradient-to-br from-miktos-primary to-miktos-secondary shadow-lg shadow-miktos-primary/30' 
                : 'bg-gray-800 hover:bg-gray-700'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={item.tooltip}
          >
            <item.icon className={`w-6 h-6 ${activeView === item.id ? 'text-white' : 'text-gray-400'}`} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;