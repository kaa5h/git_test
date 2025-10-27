import { useAppStore } from '../../store/useAppStore';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Search } from 'lucide-react';

interface Step3Props {
  onNext?: () => void;
}

const Step3Connection = ({ onNext }: Step3Props) => {
  const { wizardData, updateWizardProtocol } = useAppStore();
  const { protocol } = wizardData;
  const config = protocol.config || {};

  const updateConfig = (key: string, value: any) => {
    updateWizardProtocol({
      config: { ...config, [key]: value }
    });
  };

  const renderOPCUAConfig = () => (
    <div className="space-y-6">
      <Input
        label="Endpoint URL"
        placeholder="opc.tcp://192.168.1.100:4840"
        value={config.endpoint || ''}
        onChange={(e) => updateConfig('endpoint', e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Security Mode"
          options={[
            { value: 'None', label: 'None' },
            { value: 'Sign', label: 'Sign' },
            { value: 'SignAndEncrypt', label: 'Sign and Encrypt' },
          ]}
          value={config.securityMode || 'None'}
          onChange={(e) => updateConfig('securityMode', e.target.value)}
        />

        <Select
          label="Security Policy"
          options={[
            { value: 'None', label: 'None' },
            { value: 'Basic256Sha256', label: 'Basic256Sha256' },
            { value: 'Aes128_Sha256_RsaOaep', label: 'Aes128_Sha256_RsaOaep' },
          ]}
          value={config.securityPolicy || 'None'}
          onChange={(e) => updateConfig('securityPolicy', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Username (Optional)"
          placeholder="username"
          value={config.username || ''}
          onChange={(e) => updateConfig('username', e.target.value)}
        />

        <Input
          label="Password (Optional)"
          type="password"
          placeholder="••••••••"
          value={config.password || ''}
          onChange={(e) => updateConfig('password', e.target.value)}
        />
      </div>

      <Button variant="outline">
        <Search className="h-4 w-4 mr-2" />
        Browse Endpoints
      </Button>
    </div>
  );

  const renderS7Config = () => (
    <div className="space-y-6">
      <Input
        label="IP Address"
        placeholder="192.168.1.100"
        value={config.ip || ''}
        onChange={(e) => updateConfig('ip', e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Rack Number"
          type="number"
          placeholder="0"
          value={config.rack !== undefined ? config.rack : 0}
          onChange={(e) => updateConfig('rack', parseInt(e.target.value))}
        />

        <Input
          label="Slot Number"
          type="number"
          placeholder="1"
          value={config.slot !== undefined ? config.slot : 1}
          onChange={(e) => updateConfig('slot', parseInt(e.target.value))}
        />
      </div>

      <Button variant="outline">
        <Search className="h-4 w-4 mr-2" />
        Browse Tags
      </Button>
    </div>
  );

  const renderModbusConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="IP Address"
          placeholder="192.168.1.100"
          value={config.ip || ''}
          onChange={(e) => updateConfig('ip', e.target.value)}
          required
        />

        <Input
          label="Port"
          type="number"
          placeholder="502"
          value={config.port !== undefined ? config.port : 502}
          onChange={(e) => updateConfig('port', parseInt(e.target.value))}
        />
      </div>

      <Input
        label="Unit / Slave ID"
        type="number"
        placeholder="1"
        value={config.unitId !== undefined ? config.unitId : 1}
        onChange={(e) => updateConfig('unitId', parseInt(e.target.value))}
      />
    </div>
  );

  const renderMQTTConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Broker Address"
          placeholder="192.168.1.50"
          value={config.broker || ''}
          onChange={(e) => updateConfig('broker', e.target.value)}
          required
        />

        <Input
          label="Port"
          type="number"
          placeholder="1883"
          value={config.port !== undefined ? config.port : 1883}
          onChange={(e) => updateConfig('port', parseInt(e.target.value))}
        />
      </div>

      <Input
        label="Client ID"
        placeholder="client_001"
        value={config.clientId || ''}
        onChange={(e) => updateConfig('clientId', e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Username (Optional)"
          placeholder="username"
          value={config.username || ''}
          onChange={(e) => updateConfig('username', e.target.value)}
        />

        <Input
          label="Password (Optional)"
          type="password"
          placeholder="••••••••"
          value={config.password || ''}
          onChange={(e) => updateConfig('password', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connection Parameters</h2>
        <p className="text-gray-600">
          Configure connection parameters for {protocol.type?.toUpperCase() || 'the selected protocol'}
        </p>
      </div>

      {protocol.type === 'opcua' && renderOPCUAConfig()}
      {protocol.type === 's7' && renderS7Config()}
      {protocol.type === 'modbus' && renderModbusConfig()}
      {protocol.type === 'mqtt' && renderMQTTConfig()}
      {protocol.type === 'custom' && (
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">Custom protocol configuration will be added here</p>
        </div>
      )}
    </div>
  );
};

export default Step3Connection;
