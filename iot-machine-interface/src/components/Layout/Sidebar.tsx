import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Server, FileText, Settings, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Machines', to: '/machines', icon: Server },
  { name: 'Templates', to: '/templates', icon: FileText },
  { name: 'Deployments', to: '/deployments', icon: Rocket },
  { name: 'Settings', to: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Server className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">IoT Connect</h1>
            <p className="text-xs text-gray-500">Machine Interface</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="px-3 py-2 bg-blue-50 rounded-lg">
          <p className="text-xs font-medium text-blue-900">Version 1.0.0</p>
          <p className="text-xs text-blue-600">Prototype Build</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
