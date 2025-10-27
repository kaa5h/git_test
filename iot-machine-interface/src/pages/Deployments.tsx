import { Rocket } from 'lucide-react';

const Deployments = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Deployments</h1>
        <p className="text-gray-600 mt-1">View deployment history and status</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Rocket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Deployment History</h3>
        <p className="text-gray-600">Recent deployments will appear here</p>
      </div>
    </div>
  );
};

export default Deployments;
