import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { ProtocolType } from '../../types';
import { Network, Cpu, Zap, Radio, Box } from 'lucide-react';

interface Step2Props {
  onNext?: () => void;
}

const protocols = [
  {
    type: 'opcua' as ProtocolType,
    name: 'OPC UA',
    icon: Network,
    description: 'Unified Architecture for industrial automation',
    color: 'purple',
  },
  {
    type: 's7' as ProtocolType,
    name: 'Siemens S7',
    icon: Cpu,
    description: 'Siemens S7 communication protocol',
    color: 'cyan',
  },
  {
    type: 'modbus' as ProtocolType,
    name: 'Modbus TCP',
    icon: Zap,
    description: 'Serial communication protocol for PLCs',
    color: 'orange',
  },
  {
    type: 'mqtt' as ProtocolType,
    name: 'MQTT',
    icon: Radio,
    description: 'Lightweight messaging for IoT devices',
    color: 'green',
  },
  {
    type: 'custom' as ProtocolType,
    name: 'Custom',
    icon: Box,
    description: 'Custom protocol configuration',
    color: 'gray',
  },
];

const Step2Protocol = ({ onNext }: Step2Props) => {
  const { wizardData, updateWizardProtocol } = useAppStore();
  const selectedProtocol = wizardData.protocol.type;

  const handleSelectProtocol = (type: ProtocolType) => {
    updateWizardProtocol({ type, config: {} });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Protocol</h2>
        <p className="text-gray-600">Choose the communication protocol for your machine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocols.map((protocol) => {
          const Icon = protocol.icon;
          const isSelected = selectedProtocol === protocol.type;

          return (
            <button
              key={protocol.type}
              onClick={() => handleSelectProtocol(protocol.type)}
              className={cn(
                'p-6 rounded-lg border-2 text-left transition-all hover:shadow-md',
                isSelected
                  ? 'border-primary bg-blue-50 ring-4 ring-blue-100'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center',
                    isSelected ? 'bg-primary' : `bg-${protocol.color}-100`
                  )}
                >
                  <Icon
                    className={cn(
                      'h-8 w-8',
                      isSelected ? 'text-white' : `text-${protocol.color}-600`
                    )}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{protocol.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{protocol.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedProtocol && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>{protocols.find(p => p.type === selectedProtocol)?.name}</strong> selected.
            Click Next to configure connection parameters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Step2Protocol;
