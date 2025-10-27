import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import Button from '../ui/Button';
import { Plus, Upload, Search, Sparkles, Trash2 } from 'lucide-react';
import { generateId } from '../../lib/utils';
import { DataPoint, DataType, AccessType } from '../../types';
import DeviceBrowseModal from '../modals/DeviceBrowseModal';
import FileImportModal from '../modals/FileImportModal';

interface Step4Props {
  onNext?: () => void;
}

const Step4DataPoints = ({ onNext }: Step4Props) => {
  const { wizardData, updateWizardDataPoints, addWizardDataPoint, removeWizardDataPoint } = useAppStore();
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const dataPoints = wizardData.dataPoints;

  const handleAddRow = () => {
    const newDataPoint: DataPoint = {
      id: generateId(),
      name: '',
      address: '',
      dataType: 'Float',
      access: 'read',
      pollingRate: 1000,
    };
    addWizardDataPoint(newDataPoint);
  };

  const handleUpdateDataPoint = (id: string, field: keyof DataPoint, value: any) => {
    const updated = dataPoints.map(dp =>
      dp.id === id ? { ...dp, [field]: value } : dp
    );
    updateWizardDataPoints(updated);
  };

  const handleGenerateWithAI = () => {
    // Simulate AI generation
    const aiGeneratedPoints: DataPoint[] = [
      {
        id: generateId(),
        name: 'Temperature_Sensor_1',
        address: 'ns=2;s=Device.Temp1',
        dataType: 'Float',
        access: 'read',
        pollingRate: 2000,
      },
      {
        id: generateId(),
        name: 'Pressure_Sensor_1',
        address: 'ns=2;s=Device.Press1',
        dataType: 'Float',
        access: 'read',
        pollingRate: 2000,
      },
      {
        id: generateId(),
        name: 'Status_Indicator',
        address: 'ns=2;s=Device.Status',
        dataType: 'Boolean',
        access: 'read',
        pollingRate: 1000,
      },
    ];
    updateWizardDataPoints([...dataPoints, ...aiGeneratedPoints]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Data Points Configuration</h2>
        <p className="text-gray-600">Define the data points to monitor and control</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Button onClick={handleAddRow} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Row
        </Button>
        <Button onClick={() => setShowImportModal(true)} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import from File
        </Button>
        <Button onClick={() => setShowBrowseModal(true)} variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Browse Device
        </Button>
        <Button onClick={handleGenerateWithAI} variant="outline">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </div>

      {dataPoints.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">No data points configured yet</p>
          <Button onClick={handleAddRow}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Data Point
          </Button>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Address/Node ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Access</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Polling Rate (ms)</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataPoints.map((dp) => (
                  <tr key={dp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={dp.name}
                        onChange={(e) => handleUpdateDataPoint(dp.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Temperature"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={dp.address}
                        onChange={(e) => handleUpdateDataPoint(dp.id, 'address', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                        placeholder="e.g., ns=2;s=Device.Temp"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={dp.dataType}
                        onChange={(e) => handleUpdateDataPoint(dp.id, 'dataType', e.target.value as DataType)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Float">Float</option>
                        <option value="Int32">Int32</option>
                        <option value="Boolean">Boolean</option>
                        <option value="String">String</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={dp.access}
                        onChange={(e) => handleUpdateDataPoint(dp.id, 'access', e.target.value as AccessType)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="read">Read</option>
                        <option value="write">Write</option>
                        <option value="readwrite">Read/Write</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={dp.pollingRate || 1000}
                        onChange={(e) => handleUpdateDataPoint(dp.id, 'pollingRate', parseInt(e.target.value))}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeWizardDataPoint(dp.id)}
                        className="text-error hover:text-red-700 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showBrowseModal && (
        <DeviceBrowseModal
          isOpen={showBrowseModal}
          onClose={() => setShowBrowseModal(false)}
        />
      )}

      {showImportModal && (
        <FileImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
        />
      )}
    </div>
  );
};

export default Step4DataPoints;
