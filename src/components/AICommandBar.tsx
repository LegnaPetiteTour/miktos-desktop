import React, { useState } from 'react';
import { Send, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface AICommandBarProps {
  onCommand: (command: string) => void;
  connected: boolean;
}

const AICommandBar: React.FC<AICommandBarProps> = ({ onCommand, connected }) => {
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      await onCommand(command.trim());
      setCommand('');
    } catch (error) {
      console.error('Command execution failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const quickCommands = [
    'Generate a weathered stone texture',
    'Create a cyberpunk metal material',
    'Make a realistic wood surface',
    'Generate sci-fi panel texture',
    'Create rusty metal with scratches',
    'Make seamless brick texture',
  ];

  return (
    <div className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Command Input */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center space-x-3">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-400">
                {connected ? 'AI Connected' : 'AI Disconnected'}
              </span>
            </div>

            {/* Command Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Describe what you want to create... (e.g., 'Make this texture look more realistic')"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-miktos-primary focus:ring-2 focus:ring-miktos-primary/20"
                disabled={!connected || isProcessing}
              />
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!connected || !command.trim() || isProcessing}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-miktos-primary to-miktos-secondary p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-miktos-primary/30 transition-all duration-200"
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Commands */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 mr-2">Quick commands:</span>
          {quickCommands.map((quickCommand, index) => (
            <button
              key={index}
              onClick={() => !isProcessing && setCommand(quickCommand)}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-sm text-gray-300 transition-colors duration-200"
              disabled={!connected || isProcessing}
            >
              {quickCommand}
            </button>
          ))}
        </div>

        {/* AI Status */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center space-x-2 text-miktos-primary"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm">AI is processing your request...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AICommandBar;