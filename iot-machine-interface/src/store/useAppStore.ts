import { create } from 'zustand';
import {
  Machine,
  Template,
  Deployment,
  WizardFormData,
  AIMessage,
  GitSyncStatus,
  DataPoint,
  MachineType,
  ProtocolType,
} from '../types';
import { generateId } from '../lib/utils';

interface AppState {
  // Machines
  machines: Machine[];
  addMachine: (machine: Machine) => void;
  updateMachine: (id: string, updates: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;

  // Templates
  templates: Template[];

  // Deployments
  deployments: Deployment[];
  currentDeployment: Deployment | null;
  startDeployment: (machineId: string, machineName: string) => void;
  updateDeploymentStage: (stageId: string, status: string, log?: string) => void;
  completeDeployment: () => void;

  // Wizard
  wizardData: WizardFormData;
  setWizardStep: (step: number) => void;
  updateWizardBasicInfo: (data: Partial<WizardFormData['basicInfo']>) => void;
  updateWizardProtocol: (data: Partial<WizardFormData['protocol']>) => void;
  updateWizardDataPoints: (dataPoints: DataPoint[]) => void;
  addWizardDataPoint: (dataPoint: DataPoint) => void;
  removeWizardDataPoint: (id: string) => void;
  resetWizard: () => void;
  loadTemplate: (template: Template) => void;

  // AI Assistant
  aiMessages: AIMessage[];
  isAiOpen: boolean;
  toggleAi: () => void;
  addAiMessage: (message: AIMessage) => void;

  // Git Sync
  gitSyncStatus: GitSyncStatus;
  setGitSyncStatus: (status: GitSyncStatus) => void;
  lastCommit: { message: string; timestamp: string } | null;
  setLastCommit: (commit: { message: string; timestamp: string }) => void;
}

const initialWizardData: WizardFormData = {
  step: 1,
  basicInfo: {
    name: '',
    type: '',
    location: '',
    description: '',
  },
  protocol: {
    type: '',
    config: {},
  },
  dataPoints: [],
};

export const useAppStore = create<AppState>((set, get) => ({
  machines: [],
  templates: [],
  deployments: [],
  currentDeployment: null,
  wizardData: initialWizardData,
  aiMessages: [],
  isAiOpen: false,
  gitSyncStatus: 'synced',
  lastCommit: null,

  addMachine: (machine) => set((state) => ({
    machines: [...state.machines, machine]
  })),

  updateMachine: (id, updates) => set((state) => ({
    machines: state.machines.map((m) => m.id === id ? { ...m, ...updates } : m)
  })),

  deleteMachine: (id) => set((state) => ({
    machines: state.machines.filter((m) => m.id !== id)
  })),

  startDeployment: (machineId, machineName) => {
    const deployment: Deployment = {
      id: generateId(),
      machineId,
      machineName,
      status: 'in_progress',
      progress: 0,
      startedAt: new Date().toISOString(),
      stages: [
        { id: 's1', name: 'Validating Configuration', status: 'in_progress', logs: [] },
        { id: 's2', name: 'Generating Service Files', status: 'pending', logs: [] },
        { id: 's3', name: 'Committing to Git', status: 'pending', logs: [] },
        { id: 's4', name: 'Running Pipeline', status: 'pending', logs: [] },
        { id: 's5', name: 'Testing Connections', status: 'pending', logs: [] },
        { id: 's6', name: 'Deployment Complete', status: 'pending', logs: [] },
      ],
    };
    set({ currentDeployment: deployment });
  },

  updateDeploymentStage: (stageId, status, log) => set((state) => {
    if (!state.currentDeployment) return state;

    const stages = state.currentDeployment.stages.map((stage) => {
      if (stage.id === stageId) {
        const logs = log ? [...stage.logs, log] : stage.logs;
        return { ...stage, status: status as any, logs };
      }
      return stage;
    });

    const completedStages = stages.filter(s => s.status === 'completed').length;
    const progress = (completedStages / stages.length) * 100;

    return {
      currentDeployment: {
        ...state.currentDeployment,
        stages,
        progress,
      }
    };
  }),

  completeDeployment: () => set((state) => {
    if (!state.currentDeployment) return state;

    return {
      deployments: [...state.deployments, {
        ...state.currentDeployment,
        status: 'completed',
        completedAt: new Date().toISOString(),
        progress: 100,
      }],
      currentDeployment: null,
    };
  }),

  setWizardStep: (step) => set((state) => ({
    wizardData: { ...state.wizardData, step }
  })),

  updateWizardBasicInfo: (data) => set((state) => ({
    wizardData: {
      ...state.wizardData,
      basicInfo: { ...state.wizardData.basicInfo, ...data }
    }
  })),

  updateWizardProtocol: (data) => set((state) => ({
    wizardData: {
      ...state.wizardData,
      protocol: { ...state.wizardData.protocol, ...data }
    }
  })),

  updateWizardDataPoints: (dataPoints) => set((state) => ({
    wizardData: { ...state.wizardData, dataPoints }
  })),

  addWizardDataPoint: (dataPoint) => set((state) => ({
    wizardData: {
      ...state.wizardData,
      dataPoints: [...state.wizardData.dataPoints, dataPoint]
    }
  })),

  removeWizardDataPoint: (id) => set((state) => ({
    wizardData: {
      ...state.wizardData,
      dataPoints: state.wizardData.dataPoints.filter(dp => dp.id !== id)
    }
  })),

  resetWizard: () => set({ wizardData: initialWizardData }),

  loadTemplate: (template) => set((state) => {
    const config = template.config;
    return {
      wizardData: {
        step: 2,
        basicInfo: {
          name: config.name || '',
          type: (config.type || '') as MachineType | '',
          location: config.location || '',
          description: config.description || '',
        },
        protocol: {
          type: template.protocol as ProtocolType,
          config: config.protocol?.config || {},
        },
        dataPoints: config.dataPoints || [],
      }
    };
  }),

  toggleAi: () => set((state) => ({ isAiOpen: !state.isAiOpen })),

  addAiMessage: (message) => set((state) => ({
    aiMessages: [...state.aiMessages, message]
  })),

  setGitSyncStatus: (status) => set({ gitSyncStatus: status }),

  setLastCommit: (commit) => set({ lastCommit: commit }),
}));
