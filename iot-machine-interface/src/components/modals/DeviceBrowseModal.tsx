import { useState, useEffect } from 'react';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAppStore } from '../../store/useAppStore';
import { DeviceNode, DataPoint } from '../../types';
import { mockDeviceTree } from '../../lib/mockData';
import { Folder, FolderOpen, CheckSquare, Square, Loader2 } from 'lucide-react';
import { generateId, delay } from '../../lib/utils';

interface DeviceBrowseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeviceBrowseModal = ({ isOpen, onClose }: DeviceBrowseModalProps) => {
  const { updateWizardDataPoints, wizardData } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState<DeviceNode>(mockDeviceTree);
  const [search, setSearch] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'sensors', 'actuators']));

  useEffect(() => {
    if (isOpen) {
      simulateLoading();
    }
  }, [isOpen]);

  const simulateLoading = async () => {
    setLoading(true);
    await delay(3000);
    setLoading(false);
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleSelection = (node: DeviceNode) => {
    const updateNodeSelection = (n: DeviceNode): DeviceNode => {
      if (n.id === node.id) {
        return { ...n, selected: !n.selected };
      }
      if (n.children) {
        return { ...n, children: n.children.map(updateNodeSelection) };
      }
      return n;
    };
    setTreeData(updateNodeSelection(treeData));
  };

  const getSelectedCount = (node: DeviceNode): number => {
    let count = node.selected && node.type === 'endpoint' ? 1 : 0;
    if (node.children) {
      count += node.children.reduce((sum, child) => sum + getSelectedCount(child), 0);
    }
    return count;
  };

  const getAllSelectedEndpoints = (node: DeviceNode): DeviceNode[] => {
    let endpoints: DeviceNode[] = [];
    if (node.type === 'endpoint' && node.selected) {
      endpoints.push(node);
    }
    if (node.children) {
      node.children.forEach(child => {
        endpoints = [...endpoints, ...getAllSelectedEndpoints(child)];
      });
    }
    return endpoints;
  };

  const handleAddSelected = () => {
    const selectedEndpoints = getAllSelectedEndpoints(treeData);
    const newDataPoints: DataPoint[] = selectedEndpoints.map(node => ({
      id: generateId(),
      name: node.name,
      address: node.address!,
      dataType: node.dataType!,
      access: 'read',
      pollingRate: 1000,
    }));

    updateWizardDataPoints([...wizardData.dataPoints, ...newDataPoints]);
    onClose();
  };

  const renderNode = (node: DeviceNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const matchesSearch = !search || node.name.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch && node.type === 'endpoint') return null;

    return (
      <div key={node.id}>
        <div
          className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer"
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {node.type === 'folder' ? (
            <>
              <button onClick={() => toggleNode(node.id)} className="flex-shrink-0">
                {isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-blue-600" />
                ) : (
                  <Folder className="h-4 w-4 text-blue-600" />
                )}
              </button>
              <span className="font-medium text-gray-900">{node.name}</span>
            </>
          ) : (
            <>
              <button onClick={() => toggleSelection(node)} className="flex-shrink-0">
                {node.selected ? (
                  <CheckSquare className="h-4 w-4 text-primary" />
                ) : (
                  <Square className="h-4 w-4 text-gray-400" />
                )}
              </button>
              <span className="text-gray-700">{node.name}</span>
              <span className="text-xs text-gray-500">({node.dataType})</span>
              <span className="text-xs text-gray-400 font-mono ml-auto">{node.address}</span>
            </>
          )}
        </div>
        {node.children && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedCount = getSelectedCount(treeData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Browse Device" size="lg">
      <ModalContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Browsing device at endpoint...</p>
            <p className="text-sm text-gray-500 mt-1">Discovering available data points</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              placeholder="Search nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              {renderNode(treeData)}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{selectedCount} data point(s) selected</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const selectAll = (node: DeviceNode): DeviceNode => {
                      const updated = { ...node, selected: node.type === 'endpoint' };
                      if (node.children) {
                        updated.children = node.children.map(selectAll);
                      }
                      return updated;
                    };
                    setTreeData(selectAll(treeData));
                  }}
                  className="text-primary hover:text-blue-700 font-medium"
                >
                  Select All
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => {
                    const deselectAll = (node: DeviceNode): DeviceNode => {
                      const updated = { ...node, selected: false };
                      if (node.children) {
                        updated.children = node.children.map(deselectAll);
                      }
                      return updated;
                    };
                    setTreeData(deselectAll(treeData));
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Deselect All
                </button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddSelected} disabled={loading || selectedCount === 0}>
          Add Selected ({selectedCount})
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeviceBrowseModal;
