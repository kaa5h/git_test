import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { mockMachines, mockTemplates } from './lib/mockData';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Machines from './pages/Machines';
import Templates from './pages/Templates';
import Deployments from './pages/Deployments';
import Settings from './pages/Settings';
import AddMachineWizard from './pages/AddMachineWizard';

function App() {
  const { machines, templates } = useAppStore();

  // Initialize with mock data
  useEffect(() => {
    if (machines.length === 0) {
      mockMachines.forEach(machine => useAppStore.getState().addMachine(machine));
    }
    if (templates.length === 0) {
      useAppStore.setState({ templates: mockTemplates });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wizard" element={<AddMachineWizard />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/machines" element={<Machines />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/deployments" element={<Deployments />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
