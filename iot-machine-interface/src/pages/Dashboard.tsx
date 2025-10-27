import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Plus, Server, Activity, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { Machine, MachineType } from '../types';

const machineTypeIcons: Record<MachineType, string> = {
  'PLC': '🎛️',
  'Robot': '🤖',
  'Sensor': '📡',
  'HMI': '🖥️',
  'CNC Machine': '⚙️',
  'Custom': '🔧',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { machines } = useAppStore();

  const stats = {
    total: machines.length,
    connected: machines.filter(m => m.status === 'connected').length,
    deploying: machines.filter(m => m.status === 'deploying').length,
    error: machines.filter(m => m.status === 'error' || m.status === 'disconnected').length,
  };

  const handleAddMachine = () => {
    navigate('/wizard');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your connected machines</p>
        </div>
        <Button onClick={handleAddMachine} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add New Machine
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Machines</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Connections</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.connected}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deploying</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.deploying}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Issues</p>
                <p className="text-3xl font-bold text-error mt-1">{stats.error}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-error" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Machines Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Machines</h2>
        {machines.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No machines yet</h3>
              <p className="text-gray-600 mb-6">Add your first machine to get started</p>
              <Button onClick={handleAddMachine}>
                <Plus className="h-5 w-5 mr-2" />
                Add New Machine
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MachineCard = ({ machine }: { machine: Machine }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/machines/${machine.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{machineTypeIcons[machine.type]}</div>
            <div>
              <CardTitle className="text-base">{machine.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{machine.location}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge status={machine.status}>
            {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
          </Badge>
          <Badge protocol={machine.protocol.type}>
            {machine.protocol.type.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Endpoint:</span>
            <span className="text-gray-900 font-mono text-xs">{machine.endpoint}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Data Points:</span>
            <span className="text-gray-900 font-medium">{machine.dataPoints.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Updated:</span>
            <span className="text-gray-900">{formatDate(machine.lastUpdated)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
