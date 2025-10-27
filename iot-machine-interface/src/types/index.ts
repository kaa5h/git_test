export type MachineType = 'PLC' | 'Robot' | 'Sensor' | 'HMI' | 'CNC Machine' | 'Custom';
export type ProtocolType = 'opcua' | 's7' | 'modbus' | 'mqtt' | 'custom';
export type MachineStatus = 'connected' | 'disconnected' | 'deploying' | 'error' | 'draft';
export type DataType = 'Float' | 'Int32' | 'Boolean' | 'String';
export type AccessType = 'read' | 'write' | 'readwrite';
export type GitSyncStatus = 'synced' | 'syncing' | 'conflict';

export interface DataPoint {
  id: string;
  name: string;
  address: string;
  dataType: DataType;
  access: AccessType;
  pollingRate?: number;
}

export interface ProtocolConfig {
  type: ProtocolType;
  config: Record<string, any>;
}

export interface Machine {
  id: string;
  name: string;
  type: MachineType;
  location: string;
  description?: string;
  protocol: ProtocolConfig;
  status: MachineStatus;
  dataPoints: DataPoint[];
  lastUpdated: string;
  endpoint?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  protocol: ProtocolType;
  tags: string[];
  config: Partial<Machine>;
}

export interface DeploymentStage {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  logs: string[];
}

export interface Deployment {
  id: string;
  machineId: string;
  machineName: string;
  status: 'in_progress' | 'completed' | 'failed';
  stages: DeploymentStage[];
  progress: number;
  startedAt: string;
  completedAt?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  hasConfig?: boolean;
  config?: any;
}

export interface WizardFormData {
  step: number;
  basicInfo: {
    name: string;
    type: MachineType | '';
    location: string;
    description: string;
  };
  protocol: {
    type: ProtocolType | '';
    config: Record<string, any>;
  };
  dataPoints: DataPoint[];
}

export interface DeviceNode {
  id: string;
  name: string;
  type: 'folder' | 'endpoint';
  address?: string;
  dataType?: DataType;
  children?: DeviceNode[];
  selected?: boolean;
}
