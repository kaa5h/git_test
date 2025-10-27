import { useAppStore } from '../store/useAppStore';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate } from '../lib/utils';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Machines = () => {
  const navigate = useNavigate();
  const { machines } = useAppStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Machines</h1>
          <p className="text-gray-600 mt-1">All connected machines</p>
        </div>
        <Button onClick={() => navigate('/wizard')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Machine
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Machine Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Protocol</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Endpoint</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {machines.map((machine) => (
              <tr key={machine.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{machine.name}</td>
                <td className="px-6 py-4 text-gray-700">{machine.type}</td>
                <td className="px-6 py-4">
                  <Badge protocol={machine.protocol.type}>
                    {machine.protocol.type.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-gray-600">{machine.endpoint}</td>
                <td className="px-6 py-4">
                  <Badge status={machine.status}>
                    {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(machine.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Machines;
