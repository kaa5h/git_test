import { useAppStore } from '../../store/useAppStore';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import { MachineType } from '../../types';

interface Step1Props {
  onNext?: () => void;
}

const machineTypeOptions = [
  { value: '', label: 'Select machine type' },
  { value: 'PLC', label: 'PLC' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Sensor', label: 'Sensor' },
  { value: 'HMI', label: 'HMI' },
  { value: 'CNC Machine', label: 'CNC Machine' },
  { value: 'Custom', label: 'Custom' },
];

const Step1BasicInfo = ({ onNext }: Step1Props) => {
  const { wizardData, updateWizardBasicInfo } = useAppStore();
  const { basicInfo } = wizardData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Enter the basic details about your machine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Machine Name"
          placeholder="e.g., Assembly Robot 1"
          value={basicInfo.name}
          onChange={(e) => updateWizardBasicInfo({ name: e.target.value })}
          required
        />

        <Select
          label="Machine Type"
          options={machineTypeOptions}
          value={basicInfo.type}
          onChange={(e) => updateWizardBasicInfo({ type: e.target.value as MachineType })}
          required
        />
      </div>

      <Input
        label="Location / Area"
        placeholder="e.g., Production Floor A"
        value={basicInfo.location}
        onChange={(e) => updateWizardBasicInfo({ location: e.target.value })}
      />

      <TextArea
        label="Description"
        placeholder="Optional description of the machine"
        value={basicInfo.description}
        onChange={(e) => updateWizardBasicInfo({ description: e.target.value })}
        rows={4}
      />
    </div>
  );
};

export default Step1BasicInfo;
