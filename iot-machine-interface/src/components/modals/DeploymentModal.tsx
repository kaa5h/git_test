import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Progress from '../ui/Progress';
import Button from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle, Loader2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, delay } from '../../lib/utils';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const DeploymentModal = ({ isOpen, onClose, onComplete }: DeploymentModalProps) => {
  const { currentDeployment, updateDeploymentStage, completeDeployment, updateMachine, setGitSyncStatus, setLastCommit } = useAppStore();
  const [showLogs, setShowLogs] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(25);

  useEffect(() => {
    if (!currentDeployment || !isOpen) return;

    const runDeployment = async () => {
      // Stage 1: Validating Configuration
      updateDeploymentStage('s1', 'in_progress');
      await delay(1000);
      updateDeploymentStage('s1', 'in_progress', `[${getTimestamp()}] Starting deployment for '${currentDeployment.machineName}'`);
      await delay(1000);
      updateDeploymentStage('s1', 'in_progress', `[${getTimestamp()}] Validating protocol configuration...`);
      await delay(1500);
      updateDeploymentStage('s1', 'in_progress', `[${getTimestamp()}] ✓ Configuration valid`);
      await delay(1000);
      updateDeploymentStage('s1', 'completed');
      setEstimatedTime(20);

      // Stage 2: Generating Service Files
      updateDeploymentStage('s2', 'in_progress');
      await delay(800);
      updateDeploymentStage('s2', 'in_progress', `[${getTimestamp()}] Generating service commissioning file...`);
      await delay(1200);
      updateDeploymentStage('s2', 'in_progress', `[${getTimestamp()}] Writing entries.yaml...`);
      await delay(1000);
      updateDeploymentStage('s2', 'in_progress', `[${getTimestamp()}] ✓ Service files generated`);
      await delay(800);
      updateDeploymentStage('s2', 'completed');
      setEstimatedTime(15);

      // Stage 3: Committing to Git
      updateDeploymentStage('s3', 'in_progress');
      setGitSyncStatus('syncing');
      await delay(700);
      updateDeploymentStage('s3', 'in_progress', `[${getTimestamp()}] Staging changes...`);
      await delay(900);
      updateDeploymentStage('s3', 'in_progress', `[${getTimestamp()}] Creating commit: "Add ${currentDeployment.machineName}"`);
      await delay(1000);
      updateDeploymentStage('s3', 'in_progress', `[${getTimestamp()}] ✓ Changes committed`);
      await delay(500);
      updateDeploymentStage('s3', 'completed');
      setLastCommit({
        message: `Add ${currentDeployment.machineName}`,
        timestamp: new Date().toISOString(),
      });
      setEstimatedTime(10);

      // Stage 4: Running Pipeline
      updateDeploymentStage('s4', 'in_progress');
      await delay(1000);
      updateDeploymentStage('s4', 'in_progress', `[${getTimestamp()}] Triggering CI/CD pipeline...`);
      await delay(1500);
      updateDeploymentStage('s4', 'in_progress', `[${getTimestamp()}] Pipeline started (job #1234)`);
      await delay(2000);
      updateDeploymentStage('s4', 'in_progress', `[${getTimestamp()}] Building Docker image...`);
      await delay(2500);
      updateDeploymentStage('s4', 'in_progress', `[${getTimestamp()}] Image built successfully`);
      await delay(1500);
      updateDeploymentStage('s4', 'in_progress', `[${getTimestamp()}] Deploying to cluster...`);
      await delay(2000);
      updateDeploymentStage('s4', 'in_progress', `[${getTimestamp()}] ✓ Deployment successful`);
      await delay(1000);
      updateDeploymentStage('s4', 'completed');
      setEstimatedTime(4);

      // Stage 5: Testing Connections
      updateDeploymentStage('s5', 'in_progress');
      await delay(1000);
      updateDeploymentStage('s5', 'in_progress', `[${getTimestamp()}] Initializing connection...`);
      await delay(1500);
      updateDeploymentStage('s5', 'in_progress', `[${getTimestamp()}] Connecting to ${currentDeployment.machineName}...`);
      await delay(1500);
      updateDeploymentStage('s5', 'in_progress', `[${getTimestamp()}] Reading data points...`);
      await delay(1000);
      updateDeploymentStage('s5', 'in_progress', `[${getTimestamp()}] ✓ Connection established`);
      await delay(800);
      updateDeploymentStage('s5', 'completed');
      setEstimatedTime(0);

      // Stage 6: Complete
      updateDeploymentStage('s6', 'in_progress');
      await delay(500);
      updateDeploymentStage('s6', 'in_progress', `[${getTimestamp()}] Finalizing deployment...`);
      await delay(1000);
      updateDeploymentStage('s6', 'completed', `[${getTimestamp()}] ✓ Deployment complete!`);

      // Update machine status
      updateMachine(currentDeployment.machineId, { status: 'connected' });
      completeDeployment();
      setGitSyncStatus('synced');
    };

    runDeployment();
  }, [isOpen]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  if (!currentDeployment) return null;

  const allStagesComplete = currentDeployment.stages.every(s => s.status === 'completed');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deploying Machine"
      size="lg"
      closeOnOverlayClick={false}
      showCloseButton={false}
    >
      <div className="px-6 py-6 space-y-6">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Overall Progress</p>
            <p className="text-sm text-gray-600">
              {allStagesComplete ? 'Complete!' : `~${estimatedTime} seconds remaining`}
            </p>
          </div>
          <Progress value={currentDeployment.progress} showLabel />
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {currentDeployment.stages.map((stage) => (
            <div key={stage.id} className="flex items-start gap-3">
              <div className="mt-1">
                {stage.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {stage.status === 'in_progress' && (
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                )}
                {stage.status === 'pending' && (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    'font-medium',
                    stage.status === 'completed' && 'text-green-700',
                    stage.status === 'in_progress' && 'text-blue-700',
                    stage.status === 'pending' && 'text-gray-500'
                  )}
                >
                  {stage.name}
                </p>
                {stage.logs.length > 0 && (
                  <div className="mt-1 text-xs text-gray-600 space-y-0.5">
                    {stage.logs.slice(-2).map((log, i) => (
                      <p key={i} className="font-mono">{log}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Logs Section */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
          >
            {showLogs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Deployment Logs
          </button>
          {showLogs && (
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs max-h-64 overflow-y-auto">
              {currentDeployment.stages.flatMap(s => s.logs).map((log, i) => (
                <div key={i} className="py-0.5">{log}</div>
              ))}
            </div>
          )}
        </div>

        {/* Success State */}
        {allStagesComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Deployment Successful!</h3>
            <p className="text-sm text-green-700 mb-4">
              {currentDeployment.machineName} has been successfully deployed and is now connected.
            </p>
            <Button onClick={onComplete}>
              View Machine
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeploymentModal;
