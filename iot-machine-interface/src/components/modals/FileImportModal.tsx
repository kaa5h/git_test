import { useState } from 'react';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { useAppStore } from '../../store/useAppStore';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { generateId } from '../../lib/utils';
import { DataPoint, DataType, AccessType } from '../../types';

interface FileImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileImportModal = ({ isOpen, onClose }: FileImportModalProps) => {
  const { updateWizardDataPoints, wizardData } = useAppStore();
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState({
    name: '',
    address: '',
    dataType: '',
    access: '',
    pollingRate: '',
  });

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // Simulate parsing the file
    const mockData = [
      { col1: 'Temperature_1', col2: 'ns=2;s=Device.Temp1', col3: 'Float', col4: 'Read', col5: '1000' },
      { col1: 'Pressure_1', col2: 'ns=2;s=Device.Press1', col3: 'Float', col4: 'Read', col5: '1000' },
      { col1: 'Status', col2: 'ns=2;s=Device.Status', col3: 'Boolean', col4: 'Read', col5: '500' },
      { col1: 'Speed', col2: 'ns=2;s=Device.Speed', col3: 'Float', col4: 'ReadWrite', col5: '2000' },
    ];
    setPreviewData(mockData);
    setColumnMapping({
      name: 'col1',
      address: 'col2',
      dataType: 'col3',
      access: 'col4',
      pollingRate: 'col5',
    });
    setStep('preview');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.csv') || droppedFile.name.endsWith('.xlsx'))) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleImport = () => {
    const newDataPoints: DataPoint[] = previewData.map(row => ({
      id: generateId(),
      name: row[columnMapping.name] || '',
      address: row[columnMapping.address] || '',
      dataType: (row[columnMapping.dataType] as DataType) || 'Float',
      access: (row[columnMapping.access]?.toLowerCase() as AccessType) || 'read',
      pollingRate: parseInt(row[columnMapping.pollingRate]) || 1000,
    }));

    updateWizardDataPoints([...wizardData.dataPoints, ...newDataPoints]);
    onClose();
  };

  const columnOptions = previewData.length > 0
    ? Object.keys(previewData[0]).map(key => ({ value: key, label: key }))
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Data Points" size="lg">
      <ModalContent>
        {step === 'upload' ? (
          <div className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Drop your file here</p>
              <p className="text-sm text-gray-600 mb-4">or click to browse</p>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileSelect(selectedFile);
                }}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="inline-block cursor-pointer">
                <span className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all">
                  Browse Files
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Accepted formats: CSV, XLSX</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-900">File uploaded: {file?.name}</span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Preview Data</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="max-h-48 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {previewData.length > 0 && Object.keys(previewData[0]).map(key => (
                          <th key={key} className="px-3 py-2 text-left font-medium text-gray-700">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {previewData.slice(0, 3).map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val: any, j) => (
                            <td key={j} className="px-3 py-2 text-gray-900">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Showing 3 of {previewData.length} rows</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Map Columns</h3>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Name Column"
                  options={[{ value: '', label: 'Select column' }, ...columnOptions]}
                  value={columnMapping.name}
                  onChange={(e) => setColumnMapping({ ...columnMapping, name: e.target.value })}
                />
                <Select
                  label="Address Column"
                  options={[{ value: '', label: 'Select column' }, ...columnOptions]}
                  value={columnMapping.address}
                  onChange={(e) => setColumnMapping({ ...columnMapping, address: e.target.value })}
                />
                <Select
                  label="Data Type Column"
                  options={[{ value: '', label: 'Select column' }, ...columnOptions]}
                  value={columnMapping.dataType}
                  onChange={(e) => setColumnMapping({ ...columnMapping, dataType: e.target.value })}
                />
                <Select
                  label="Access Column"
                  options={[{ value: '', label: 'Select column' }, ...columnOptions]}
                  value={columnMapping.access}
                  onChange={(e) => setColumnMapping({ ...columnMapping, access: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </ModalContent>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {step === 'preview' && (
          <Button onClick={handleImport}>
            Import {previewData.length} Data Points
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default FileImportModal;
