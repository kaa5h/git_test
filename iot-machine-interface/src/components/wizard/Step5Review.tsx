import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { generateId, delay } from '../../lib/utils';
import { Machine } from '../../types';
import DeploymentModal from '../modals/DeploymentModal';

interface Step5Props {
  onNext?: () => void;
}

const Step5Review = ({ onNext }: Step5Props) => {
  const navigate = useNavigate();
  const { wizardData, addMachine, startDeployment, resetWizard, setGitSyncStatus, setLastCommit } = useAppStore();
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [showDeployment, setShowDeployment] = useState(false);

  const handleTestConnection = async () => {
    setTestStatus('testing');
    await delay(2000);
    // 80% success rate
    const success = Math.random() > 0.2;
    setTestStatus(success ? 'success' : 'error');
  };

  const handleDeploy = async () => {
    const machineId = generateId();
    const machine: Machine = {
      id: machineId,
      name: wizardData.basicInfo.name,
      type: wizardData.basicInfo.type as any,
      location: wizardData.basicInfo.location,
      description: wizardData.basicInfo.description,
      protocol: {
        type: wizardData.protocol.type as any,
        config: wizardData.protocol.config,
      },
      status: 'deploying',
      dataPoints: wizardData.dataPoints,
      lastUpdated: new Date().toISOString(),
      endpoint: getEndpoint(),
    };

    addMachine(machine);
    startDeployment(machineId, machine.name);
    setShowDeployment(true);
  };

  const getEndpoint = () => {
    const config = wizardData.protocol.config;
    if (wizardData.protocol.type === 'opcua') return config.endpoint;
    if (wizardData.protocol.type === 's7') return config.ip;
    if (wizardData.protocol.type === 'modbus') return `${config.ip}:${config.port}`;
    if (wizardData.protocol.type === 'mqtt') return `${config.broker}:${config.port}`;
    return 'N/A';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review & Deploy</h2>
        <p className="text-gray-600">Review your configuration before deployment</p>
      </div>

      <div className="space-y-4">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Machine Name</p>
                <p className="font-medium text-gray-900">{wizardData.basicInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium text-gray-900">{wizardData.basicInfo.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{wizardData.basicInfo.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium text-gray-900">{wizardData.basicInfo.description || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protocol Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Protocol Configuration
              <Badge protocol={wizardData.protocol.type as any}>
                {wizardData.protocol.type?.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(wizardData.protocol.config).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="font-medium text-gray-900 font-mono text-sm">
                    {key.includes('password') ? '••••••••' : String(value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Points */}
        <Card>
          <CardHeader>
            <CardTitle>Data Points ({wizardData.dataPoints.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {wizardData.dataPoints.length === 0 ? (
              <p className="text-gray-500 text-sm">No data points configured</p>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Name</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Address</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Type</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {wizardData.dataPoints.map((dp) => (
                      <tr key={dp.id}>
                        <td className="px-3 py-2 font-medium">{dp.name}</td>
                        <td className="px-3 py-2 font-mono text-xs">{dp.address}</td>
                        <td className="px-3 py-2">
                          <Badge variant="gray">{dp.dataType}</Badge>
                        </td>
                        <td className="px-3 py-2 capitalize">{dp.access}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t">
        <Button variant="outline" onClick={() => {}}>
          Save as Draft
        </Button>
        <Button variant="outline" onClick={() => {}}>
          Save as Template
        </Button>
        <Button
          variant="outline"
          onClick={handleTestConnection}
          loading={testStatus === 'testing'}
        >
          Test Connection
        </Button>
        <div className="flex-1"></div>
        <Button onClick={handleDeploy} size="lg">
          Deploy Machine
        </Button>
      </div>

      {/* Test Connection Status */}
      {testStatus === 'success' && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-900">Connection successful (latency: 45ms)</p>
        </div>
      )}

      {testStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <XCircle className="h-5 w-5 text-error" />
          <p className="text-sm text-red-900">Failed to connect: Connection timeout after 5 seconds</p>
        </div>
      )}

      {showDeployment && (
        <DeploymentModal
          isOpen={showDeployment}
          onClose={() => {}}
          onComplete={() => {
            setShowDeployment(false);
            resetWizard();
            navigate('/');
          }}
        />
      )}
    </div>
  );
};

export default Step5Review;
