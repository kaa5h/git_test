import { Search, Bell, Bot, User } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import Button from '../ui/Button';

const TopBar = () => {
  const { toggleAi } = useAppStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search machines, templates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button
          onClick={toggleAi}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          title="AI Assistant"
        >
          <Bot className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
