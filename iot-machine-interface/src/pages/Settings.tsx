import { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { cn } from '../lib/utils';

const tabs = ['User Preferences', 'Git Repository', 'Pipeline Configuration'];

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application settings</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-1">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={cn(
                'w-full text-left px-4 py-2 rounded-lg font-medium transition-colors',
                activeTab === index
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{tabs[activeTab]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeTab === 0 && (
                <>
                  <Select
                    label="Default Protocol"
                    options={[
                      { value: 'opcua', label: 'OPC UA' },
                      { value: 's7', label: 'Siemens S7' },
                      { value: 'modbus', label: 'Modbus TCP' },
                      { value: 'mqtt', label: 'MQTT' },
                    ]}
                    value="opcua"
                  />
                  <Input
                    label="Default Polling Rate (ms)"
                    type="number"
                    value="1000"
                  />
                  <Select
                    label="Language"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'German' },
                      { value: 'fr', label: 'French' },
                    ]}
                    value="en"
                  />
                </>
              )}

              {activeTab === 1 && (
                <>
                  <Input
                    label="Repository URL"
                    value="https://github.com/company/iot-configs"
                    disabled
                  />
                  <Input
                    label="Branch Name"
                    value="main"
                    disabled
                  />
                  <Select
                    label="Sync Frequency"
                    options={[
                      { value: 'realtime', label: 'Real-time' },
                      { value: '5min', label: 'Every 5 minutes' },
                      { value: '15min', label: 'Every 15 minutes' },
                      { value: 'manual', label: 'Manual only' },
                    ]}
                    value="realtime"
                  />
                </>
              )}

              {activeTab === 2 && (
                <>
                  <Input
                    label="Deployment Timeout (seconds)"
                    type="number"
                    value="300"
                  />
                  <Input
                    label="Retry Attempts on Failure"
                    type="number"
                    value="3"
                  />
                </>
              )}

              <div className="pt-4 border-t">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
