import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { GitBranch, Clock } from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import Badge from './ui/Badge';

const GitSyncPanel = () => {
  const { gitSyncStatus, lastCommit } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    synced: {
      color: 'bg-green-500',
      text: 'Synced',
      badge: 'success' as const,
    },
    syncing: {
      color: 'bg-yellow-500 animate-pulse',
      text: 'Syncing...',
      badge: 'warning' as const,
    },
    conflict: {
      color: 'bg-red-500',
      text: 'Conflict',
      badge: 'error' as const,
    },
  };

  const config = statusConfig[gitSyncStatus];

  return (
    <div
      className="fixed bottom-6 right-6 z-30"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={cn(
          'bg-white rounded-lg shadow-lg border border-gray-200 transition-all',
          isExpanded ? 'w-80' : 'w-auto'
        )}
      >
        {/* Compact View */}
        {!isExpanded && (
          <div className="px-4 py-3 flex items-center gap-3">
            <div className={cn('w-3 h-3 rounded-full', config.color)}></div>
            <span className="text-sm font-medium text-gray-700">{config.text}</span>
          </div>
        )}

        {/* Expanded View */}
        {isExpanded && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Git Sync Status</span>
              <Badge variant={config.badge}>{config.text}</Badge>
            </div>

            {lastCommit && (
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Last commit:</p>
                  <p className="font-medium text-gray-900">{lastCommit.message}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(lastCommit.timestamp)}</span>
                </div>
                <div>
                  <p className="text-gray-600">Changed files:</p>
                  <p className="font-mono text-xs text-gray-700">
                    entries.yaml, config.yml
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
              <button className="text-sm text-primary hover:text-blue-700 font-medium">
                View in Git
              </button>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="rounded border-gray-300"
                />
                Auto-sync
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitSyncPanel;
