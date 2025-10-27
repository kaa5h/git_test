# Industrial IoT Machine Connection Interface

A modern, no-code/low-code web application for connecting industrial machines to data platforms. This prototype helps OT (Operational Technology) and IT users configure and deploy industrial machine connections without manual coding.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-7-646cff)

## Features

### Core Functionality

- **Dashboard**: Overview of all connected machines with real-time status, statistics, and quick actions
- **5-Step Add Machine Wizard**: Guided process for configuring new machines
  - Step 1: Basic Information (name, type, location)
  - Step 2: Protocol Selection (OPC UA, Siemens S7, Modbus TCP, MQTT)
  - Step 3: Connection Parameters (protocol-specific configuration)
  - Step 4: Data Points Configuration (with import, browse, and AI assistance)
  - Step 5: Review & Deploy (test connection and deploy)

- **Deployment Progress Tracking**: Real-time deployment status with stages:
  - Configuration validation
  - Service file generation
  - Git commit
  - Pipeline execution
  - Connection testing
  - Completion

- **Device Discovery**: Browse device nodes in a tree view structure with multi-select capabilities
- **File Import**: Drag-and-drop CSV/XLSX import with column mapping
- **Templates Library**: Pre-configured templates for common machine types
- **AI Assistant**: Interactive chat-based help for configuration and troubleshooting
- **Machine List**: Comprehensive table view with filtering and sorting
- **Git Sync Indicator**: Real-time sync status with last commit information
- **Settings**: User preferences, Git configuration, and pipeline settings

### Supported Protocols

1. **OPC UA** - Unified Architecture for industrial automation
2. **Siemens S7** - Siemens PLC communication
3. **Modbus TCP** - Serial communication protocol
4. **MQTT** - Lightweight IoT messaging
5. **Custom** - Extensible for custom protocols

### Mock Data

The application comes pre-loaded with 8 example machines:
- Assembly Line Robot (OPC UA)
- Temperature Sensor Array (Modbus)
- CNC Machine (Siemens S7)
- Conveyor Belt System (Siemens S7)
- Pressure Monitor (Modbus)
- Welding Robot (OPC UA)
- Paint Booth Monitor (MQTT)
- Material Dispensing System (OPC UA - Draft)

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Utilities**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd git_test/iot-machine-interface
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
iot-machine-interface/
├── src/
│   ├── components/
│   │   ├── Layout/          # Layout components (Sidebar, TopBar)
│   │   ├── ui/              # Reusable UI components
│   │   ├── modals/          # Modal dialogs
│   │   ├── wizard/          # Wizard step components
│   │   ├── AIAssistant.tsx  # AI chat interface
│   │   └── GitSyncPanel.tsx # Git sync indicator
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── AddMachineWizard.tsx
│   │   ├── Machines.tsx
│   │   ├── Templates.tsx
│   │   ├── Deployments.tsx
│   │   └── Settings.tsx
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── lib/                 # Utilities and mock data
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

## Key User Flows

### Flow 1: Add New Machine (Primary Flow)

1. Click "Add New Machine" from Dashboard
2. Enter basic information (name, type, location)
3. Select communication protocol
4. Configure connection parameters
5. Add data points via:
   - Manual entry
   - File import (CSV/XLSX)
   - Device browsing (simulated auto-discovery)
   - AI generation
6. Review configuration
7. Test connection
8. Deploy and watch real-time progress

### Flow 2: Use Template

1. Navigate to Templates page
2. Browse available templates
3. Click "Use Template" on desired template
4. Wizard opens with pre-filled configuration
5. Modify IP address and machine name
6. Deploy immediately

### Flow 3: AI-Assisted Configuration

1. Click AI Assistant icon in top bar
2. Ask questions or use suggested prompts
3. AI provides contextual help and can generate configurations
4. Apply AI-generated configurations to wizard

## Design Decisions

### Color Scheme (Industrial Theme)
- **Primary**: Blue (#2563EB) - Primary actions and highlights
- **Success**: Green (#10B981) - Connected state and successful operations
- **Warning**: Yellow/Amber (#F59E0B) - Warnings and syncing states
- **Error**: Red (#EF4444) - Errors and disconnected states
- **Info**: Light Blue (#3B82F6) - Informational and in-progress states

### State Management
- Zustand for lightweight, intuitive state management
- Centralized store for machines, templates, deployments, wizard state, and AI chat
- No prop drilling - direct access to state from any component

### Simulated Behaviors
All async operations are simulated with realistic timing:
- Test Connection: 2-3 seconds
- Device Browsing: 3 seconds loading
- AI Responses: 1-2 seconds
- Deployment: ~25 seconds total (simulating real pipeline)

## Future Enhancements

Potential features for production version:
- Real backend integration
- Actual device communication
- User authentication and authorization
- Multi-tenancy support
- Advanced filtering and search
- Bulk operations
- Export/import configurations
- Real-time monitoring dashboards
- Alert and notification system
- Audit logging

## Contributing

This is a prototype application. For production use, additional security, error handling, and backend integration would be required.

## License

MIT

---

**Built with Claude Code** - AI-powered development assistant
