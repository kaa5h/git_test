import { Machine, Template, DeviceNode } from '../types';

export const mockMachines: Machine[] = [
  {
    id: 'm001',
    name: 'Assembly Line Robot 1',
    type: 'Robot',
    location: 'Production Floor A',
    description: 'Primary assembly robot for widget production',
    protocol: {
      type: 'opcua',
      config: {
        endpoint: 'opc.tcp://192.168.1.100:4840',
        securityMode: 'None',
        securityPolicy: 'None',
      },
    },
    endpoint: 'opc.tcp://192.168.1.100:4840',
    status: 'connected',
    dataPoints: [
      { id: 'dp1', name: 'Position_X', address: 'ns=2;s=Robot.Position.X', dataType: 'Float', access: 'read', pollingRate: 1000 },
      { id: 'dp2', name: 'Position_Y', address: 'ns=2;s=Robot.Position.Y', dataType: 'Float', access: 'read', pollingRate: 1000 },
      { id: 'dp3', name: 'Position_Z', address: 'ns=2;s=Robot.Position.Z', dataType: 'Float', access: 'read', pollingRate: 1000 },
      { id: 'dp4', name: 'Speed', address: 'ns=2;s=Robot.Speed', dataType: 'Float', access: 'readwrite', pollingRate: 1000 },
    ],
    lastUpdated: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
  },
  {
    id: 'm002',
    name: 'Temperature Sensor Array',
    type: 'Sensor',
    location: 'Production Floor B',
    description: 'Multi-zone temperature monitoring system',
    protocol: {
      type: 'modbus',
      config: {
        ip: '192.168.1.150',
        port: 502,
        unitId: 1,
      },
    },
    endpoint: '192.168.1.150:502',
    status: 'connected',
    dataPoints: [
      { id: 'dp5', name: 'Zone1_Temp', address: '40001', dataType: 'Float', access: 'read', pollingRate: 5000 },
      { id: 'dp6', name: 'Zone2_Temp', address: '40002', dataType: 'Float', access: 'read', pollingRate: 5000 },
      { id: 'dp7', name: 'Zone3_Temp', address: '40003', dataType: 'Float', access: 'read', pollingRate: 5000 },
      { id: 'dp8', name: 'Alarm_Status', address: '00001', dataType: 'Boolean', access: 'read', pollingRate: 1000 },
    ],
    lastUpdated: new Date(Date.now() - 540000).toISOString(), // 9 mins ago
  },
  {
    id: 'm003',
    name: 'CNC Machine 5',
    type: 'CNC Machine',
    location: 'Machining Center',
    description: 'High-precision CNC milling machine',
    protocol: {
      type: 's7',
      config: {
        ip: '192.168.1.200',
        rack: 0,
        slot: 1,
      },
    },
    endpoint: '192.168.1.200',
    status: 'deploying',
    dataPoints: [
      { id: 'dp9', name: 'Spindle_Speed', address: 'DB1.DBD0', dataType: 'Float', access: 'read', pollingRate: 500 },
      { id: 'dp10', name: 'Feed_Rate', address: 'DB1.DBD4', dataType: 'Float', access: 'read', pollingRate: 500 },
      { id: 'dp11', name: 'Tool_Number', address: 'DB1.DBW8', dataType: 'Int32', access: 'read', pollingRate: 1000 },
    ],
    lastUpdated: new Date(Date.now() - 60000).toISOString(), // 1 min ago
  },
  {
    id: 'm004',
    name: 'Conveyor Belt System',
    type: 'PLC',
    location: 'Production Floor A',
    description: 'Main conveyor belt control system',
    protocol: {
      type: 's7',
      config: {
        ip: '192.168.1.201',
        rack: 0,
        slot: 2,
      },
    },
    endpoint: '192.168.1.201',
    status: 'connected',
    dataPoints: [
      { id: 'dp12', name: 'Belt_Speed', address: 'DB2.DBD0', dataType: 'Float', access: 'readwrite', pollingRate: 1000 },
      { id: 'dp13', name: 'Motor_Status', address: 'DB2.DBX4.0', dataType: 'Boolean', access: 'read', pollingRate: 500 },
      { id: 'dp14', name: 'Emergency_Stop', address: 'DB2.DBX4.1', dataType: 'Boolean', access: 'read', pollingRate: 100 },
    ],
    lastUpdated: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
  },
  {
    id: 'm005',
    name: 'Pressure Monitor Station',
    type: 'Sensor',
    location: 'Quality Control',
    description: 'Hydraulic pressure monitoring',
    protocol: {
      type: 'modbus',
      config: {
        ip: '192.168.1.160',
        port: 502,
        unitId: 2,
      },
    },
    endpoint: '192.168.1.160:502',
    status: 'error',
    dataPoints: [
      { id: 'dp15', name: 'Pressure_PSI', address: '40010', dataType: 'Float', access: 'read', pollingRate: 2000 },
      { id: 'dp16', name: 'High_Alarm', address: '00010', dataType: 'Boolean', access: 'read', pollingRate: 500 },
    ],
    lastUpdated: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 'm006',
    name: 'Welding Robot Station',
    type: 'Robot',
    location: 'Welding Bay',
    description: 'Automated welding robot',
    protocol: {
      type: 'opcua',
      config: {
        endpoint: 'opc.tcp://192.168.1.110:4840',
        securityMode: 'SignAndEncrypt',
        securityPolicy: 'Basic256Sha256',
        username: 'operator',
      },
    },
    endpoint: 'opc.tcp://192.168.1.110:4840',
    status: 'connected',
    dataPoints: [
      { id: 'dp17', name: 'Arc_Voltage', address: 'ns=3;s=Welder.Arc.Voltage', dataType: 'Float', access: 'read', pollingRate: 500 },
      { id: 'dp18', name: 'Wire_Feed', address: 'ns=3;s=Welder.Wire.Feed', dataType: 'Float', access: 'readwrite', pollingRate: 1000 },
      { id: 'dp19', name: 'Cycle_Count', address: 'ns=3;s=Welder.CycleCount', dataType: 'Int32', access: 'read', pollingRate: 5000 },
    ],
    lastUpdated: new Date(Date.now() - 900000).toISOString(), // 15 mins ago
  },
  {
    id: 'm007',
    name: 'Paint Booth Monitor',
    type: 'HMI',
    location: 'Paint Shop',
    protocol: {
      type: 'mqtt',
      config: {
        broker: '192.168.1.50',
        port: 1883,
        clientId: 'paint_booth_001',
      },
    },
    endpoint: '192.168.1.50:1883',
    status: 'disconnected',
    dataPoints: [
      { id: 'dp20', name: 'Temperature', address: 'paintbooth/zone1/temp', dataType: 'Float', access: 'read', pollingRate: 3000 },
      { id: 'dp21', name: 'Humidity', address: 'paintbooth/zone1/humidity', dataType: 'Float', access: 'read', pollingRate: 3000 },
      { id: 'dp22', name: 'Airflow', address: 'paintbooth/zone1/airflow', dataType: 'Float', access: 'read', pollingRate: 2000 },
    ],
    lastUpdated: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: 'm008',
    name: 'Material Dispensing System',
    type: 'Custom',
    location: 'Raw Materials',
    description: 'Automated material dispensing and tracking',
    protocol: {
      type: 'opcua',
      config: {
        endpoint: 'opc.tcp://192.168.1.120:4840',
        securityMode: 'None',
      },
    },
    endpoint: 'opc.tcp://192.168.1.120:4840',
    status: 'draft',
    dataPoints: [],
    lastUpdated: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
];

export const mockTemplates: Template[] = [
  {
    id: 't001',
    name: 'Standard OPC UA PLC Configuration',
    description: 'Basic OPC UA configuration for standard PLCs with common data points',
    protocol: 'opcua',
    tags: ['Manufacturing', 'Beginner', 'OPC UA'],
    config: {
      type: 'PLC',
      protocol: {
        type: 'opcua',
        config: {
          endpoint: 'opc.tcp://192.168.1.1:4840',
          securityMode: 'None',
          securityPolicy: 'None',
        },
      },
      dataPoints: [
        { id: 'dp_t1', name: 'Production_Count', address: 'ns=2;s=PLC.ProductionCount', dataType: 'Int32', access: 'read', pollingRate: 1000 },
        { id: 'dp_t2', name: 'Machine_Status', address: 'ns=2;s=PLC.Status', dataType: 'Boolean', access: 'read', pollingRate: 500 },
        { id: 'dp_t3', name: 'Cycle_Time', address: 'ns=2;s=PLC.CycleTime', dataType: 'Float', access: 'read', pollingRate: 1000 },
      ],
    },
  },
  {
    id: 't002',
    name: 'Siemens S7-1500 Temperature Monitoring',
    description: 'Template for Siemens S7 PLCs monitoring temperature sensors',
    protocol: 's7',
    tags: ['Siemens', 'Temperature', 'Intermediate'],
    config: {
      type: 'Sensor',
      protocol: {
        type: 's7',
        config: {
          ip: '192.168.1.1',
          rack: 0,
          slot: 1,
        },
      },
      dataPoints: [
        { id: 'dp_t4', name: 'Temp_Sensor_1', address: 'DB10.DBD0', dataType: 'Float', access: 'read', pollingRate: 2000 },
        { id: 'dp_t5', name: 'Temp_Sensor_2', address: 'DB10.DBD4', dataType: 'Float', access: 'read', pollingRate: 2000 },
        { id: 'dp_t6', name: 'Alarm_High', address: 'DB10.DBX8.0', dataType: 'Boolean', access: 'read', pollingRate: 500 },
        { id: 'dp_t7', name: 'Alarm_Low', address: 'DB10.DBX8.1', dataType: 'Boolean', access: 'read', pollingRate: 500 },
      ],
    },
  },
  {
    id: 't003',
    name: 'Modbus RTU Multi-Sensor Setup',
    description: 'Configuration for multiple Modbus sensors on a single network',
    protocol: 'modbus',
    tags: ['Modbus', 'Sensors', 'Beginner'],
    config: {
      type: 'Sensor',
      protocol: {
        type: 'modbus',
        config: {
          ip: '192.168.1.1',
          port: 502,
          unitId: 1,
        },
      },
      dataPoints: [
        { id: 'dp_t8', name: 'Analog_Input_1', address: '30001', dataType: 'Float', access: 'read', pollingRate: 1000 },
        { id: 'dp_t9', name: 'Analog_Input_2', address: '30002', dataType: 'Float', access: 'read', pollingRate: 1000 },
        { id: 'dp_t10', name: 'Digital_Input_1', address: '10001', dataType: 'Boolean', access: 'read', pollingRate: 500 },
      ],
    },
  },
  {
    id: 't004',
    name: 'MQTT IoT Gateway Basic',
    description: 'Basic MQTT configuration for IoT gateway devices',
    protocol: 'mqtt',
    tags: ['IoT', 'MQTT', 'Beginner'],
    config: {
      type: 'Sensor',
      protocol: {
        type: 'mqtt',
        config: {
          broker: '192.168.1.50',
          port: 1883,
          clientId: 'gateway_001',
        },
      },
      dataPoints: [
        { id: 'dp_t11', name: 'Temperature', address: 'sensors/temp1', dataType: 'Float', access: 'read', pollingRate: 5000 },
        { id: 'dp_t12', name: 'Humidity', address: 'sensors/hum1', dataType: 'Float', access: 'read', pollingRate: 5000 },
        { id: 'dp_t13', name: 'Status', address: 'sensors/status', dataType: 'Boolean', access: 'read', pollingRate: 10000 },
      ],
    },
  },
  {
    id: 't005',
    name: 'Industrial Robot Arm (Universal Robots)',
    description: 'Complete configuration for UR series collaborative robots',
    protocol: 'opcua',
    tags: ['Robotics', 'Advanced', 'UR'],
    config: {
      type: 'Robot',
      protocol: {
        type: 'opcua',
        config: {
          endpoint: 'opc.tcp://192.168.1.1:4840',
          securityMode: 'Sign',
          securityPolicy: 'Basic256Sha256',
        },
      },
      dataPoints: [
        { id: 'dp_t14', name: 'Joint_1_Angle', address: 'ns=2;s=Robot.Joints.J1.Angle', dataType: 'Float', access: 'read', pollingRate: 100 },
        { id: 'dp_t15', name: 'Joint_2_Angle', address: 'ns=2;s=Robot.Joints.J2.Angle', dataType: 'Float', access: 'read', pollingRate: 100 },
        { id: 'dp_t16', name: 'Tool_Position_X', address: 'ns=2;s=Robot.TCP.X', dataType: 'Float', access: 'read', pollingRate: 100 },
        { id: 'dp_t17', name: 'Tool_Position_Y', address: 'ns=2;s=Robot.TCP.Y', dataType: 'Float', access: 'read', pollingRate: 100 },
        { id: 'dp_t18', name: 'Tool_Position_Z', address: 'ns=2;s=Robot.TCP.Z', dataType: 'Float', access: 'read', pollingRate: 100 },
        { id: 'dp_t19', name: 'Program_Running', address: 'ns=2;s=Robot.ProgramRunning', dataType: 'Boolean', access: 'read', pollingRate: 500 },
      ],
    },
  },
  {
    id: 't006',
    name: 'CNC Machine Monitoring',
    description: 'Standard CNC machine monitoring with spindle and feed data',
    protocol: 's7',
    tags: ['CNC', 'Manufacturing', 'Intermediate'],
    config: {
      type: 'CNC Machine',
      protocol: {
        type: 's7',
        config: {
          ip: '192.168.1.1',
          rack: 0,
          slot: 1,
        },
      },
      dataPoints: [
        { id: 'dp_t20', name: 'Spindle_Speed', address: 'DB1.DBD0', dataType: 'Float', access: 'read', pollingRate: 500 },
        { id: 'dp_t21', name: 'Feed_Rate', address: 'DB1.DBD4', dataType: 'Float', access: 'read', pollingRate: 500 },
        { id: 'dp_t22', name: 'Active_Tool', address: 'DB1.DBW8', dataType: 'Int32', access: 'read', pollingRate: 1000 },
        { id: 'dp_t23', name: 'Program_Number', address: 'DB1.DBW10', dataType: 'Int32', access: 'read', pollingRate: 5000 },
        { id: 'dp_t24', name: 'Machine_Running', address: 'DB1.DBX12.0', dataType: 'Boolean', access: 'read', pollingRate: 500 },
      ],
    },
  },
];

export const mockDeviceTree: DeviceNode = {
  id: 'root',
  name: 'Device Root',
  type: 'folder',
  children: [
    {
      id: 'sensors',
      name: 'Sensors',
      type: 'folder',
      children: [
        {
          id: 'temp',
          name: 'Temperature',
          type: 'endpoint',
          address: 'ns=2;s=Device.Sensors.Temp',
          dataType: 'Float',
          selected: true,
        },
        {
          id: 'press',
          name: 'Pressure',
          type: 'endpoint',
          address: 'ns=2;s=Device.Sensors.Press',
          dataType: 'Float',
          selected: true,
        },
        {
          id: 'hum',
          name: 'Humidity',
          type: 'endpoint',
          address: 'ns=2;s=Device.Sensors.Hum',
          dataType: 'Float',
          selected: false,
        },
        {
          id: 'flow',
          name: 'Flow_Rate',
          type: 'endpoint',
          address: 'ns=2;s=Device.Sensors.Flow',
          dataType: 'Float',
          selected: false,
        },
      ],
    },
    {
      id: 'actuators',
      name: 'Actuators',
      type: 'folder',
      children: [
        {
          id: 'valve1',
          name: 'Valve1',
          type: 'endpoint',
          address: 'ns=2;s=Device.Actuators.V1',
          dataType: 'Boolean',
          selected: false,
        },
        {
          id: 'valve2',
          name: 'Valve2',
          type: 'endpoint',
          address: 'ns=2;s=Device.Actuators.V2',
          dataType: 'Boolean',
          selected: false,
        },
        {
          id: 'motor1',
          name: 'Motor1_Speed',
          type: 'endpoint',
          address: 'ns=2;s=Device.Actuators.M1.Speed',
          dataType: 'Float',
          selected: false,
        },
        {
          id: 'motor1_status',
          name: 'Motor1_Status',
          type: 'endpoint',
          address: 'ns=2;s=Device.Actuators.M1.Status',
          dataType: 'Boolean',
          selected: false,
        },
      ],
    },
    {
      id: 'counters',
      name: 'Counters',
      type: 'folder',
      children: [
        {
          id: 'prod_count',
          name: 'Production_Count',
          type: 'endpoint',
          address: 'ns=2;s=Device.Counters.Production',
          dataType: 'Int32',
          selected: true,
        },
        {
          id: 'error_count',
          name: 'Error_Count',
          type: 'endpoint',
          address: 'ns=2;s=Device.Counters.Errors',
          dataType: 'Int32',
          selected: false,
        },
      ],
    },
  ],
};
