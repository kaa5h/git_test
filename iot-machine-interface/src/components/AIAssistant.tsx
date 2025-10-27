import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { X, Send, Sparkles } from 'lucide-react';
import { cn, generateId, delay } from '../lib/utils';
import Button from './ui/Button';

const suggestedPrompts = [
  'Generate template for OPC UA PLC',
  'What parameters do I need for Modbus?',
  'Help me troubleshoot connection error',
  'Create 10 similar machine configs',
];

const AIAssistant = () => {
  const { isAiOpen, toggleAi, aiMessages, addAiMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    addAiMessage({
      id: generateId(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    });

    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await delay(2000);

    let response = '';
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('template') || lowerMessage.includes('generate')) {
      response = `I can help you generate a machine configuration template. Here's a basic OPC UA PLC template:

**Configuration Details:**
- Protocol: OPC UA
- Default endpoint: opc.tcp://192.168.1.1:4840
- Security: None (adjust as needed)
- Suggested data points:
  * Production Count (ns=2;s=PLC.ProductionCount)
  * Machine Status (ns=2;s=PLC.Status)
  * Cycle Time (ns=2;s=PLC.CycleTime)

Would you like me to apply this configuration to your current wizard?`;
    } else if (lowerMessage.includes('modbus')) {
      response = `For Modbus TCP configuration, you'll need:

**Required Parameters:**
1. IP Address - The device's network address (e.g., 192.168.1.100)
2. Port - Usually 502 (default Modbus port)
3. Unit/Slave ID - Device identifier on the network (usually 1)

**Data Point Addresses:**
- Holding Registers: 40001-49999
- Input Registers: 30001-39999
- Coils: 00001-09999
- Discrete Inputs: 10001-19999

What type of data are you looking to read?`;
    } else if (lowerMessage.includes('troubleshoot') || lowerMessage.includes('error')) {
      response = `Let me help you troubleshoot. Common connection issues:

**1. Network Connectivity**
- Verify the device is reachable: ping [IP address]
- Check firewall settings
- Ensure correct port is open

**2. Protocol Configuration**
- Verify endpoint URL format
- Check security settings match device
- Confirm credentials if required

**3. Device Settings**
- Ensure device is configured to accept connections
- Verify protocol is enabled on device
- Check device is powered and operational

What specific error message are you seeing?`;
    } else {
      response = `I'm here to help with your industrial machine configuration. I can assist with:

- Generating configuration templates
- Explaining protocol parameters
- Troubleshooting connection issues
- Providing best practices for data point setup
- Creating multiple similar configurations

What would you like help with today?`;
    }

    addAiMessage({
      id: generateId(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    });

    setIsTyping(false);
  };

  if (!isAiOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-xl flex flex-col z-40">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-xs text-gray-500">Powered by Claude</p>
          </div>
        </div>
        <button
          onClick={toggleAi}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {aiMessages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">How can I help you today?</p>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="block w-full text-left px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {aiMessages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-lg px-4 py-2',
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Warning Banner */}
      <div className="px-6 py-2 bg-yellow-50 border-t border-yellow-200">
        <p className="text-xs text-yellow-800">⚠️ AI-generated content requires validation</p>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={() => handleSend(input)} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
