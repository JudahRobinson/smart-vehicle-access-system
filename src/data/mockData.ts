export const dashboardMetrics = [
  {
    label: 'Total Vehicles',
    value: '24',
    trend: '+2',
    trendUp: true,
    icon: 'car' as const,
    accent: 'blue' as const,
  },
  {
    label: 'Active Vehicles',
    value: '18',
    trend: '+5',
    trendUp: true,
    icon: 'pulse' as const,
    accent: 'green' as const,
  },
  {
    label: 'Unauthorized Attempts',
    value: '3',
    trend: '-2',
    trendUp: false,
    icon: 'shield' as const,
    accent: 'red' as const,
  },
  {
    label: 'RFID Scans Today',
    value: '156',
    trend: '+28',
    trendUp: true,
    icon: 'signal' as const,
    accent: 'purple' as const,
  },
]

export const recentActivity = [
  {
    name: 'John Doe',
    vehicle: 'EV-001',
    status: 'Started' as const,
    time: '2 mins ago',
    ok: true,
  },
  {
    name: 'Sarah Smith',
    vehicle: 'EV-003',
    status: 'Stopped' as const,
    time: '5 mins ago',
    ok: true,
  },
  {
    name: 'Unknown',
    vehicle: 'EV-007',
    status: 'Denied' as const,
    time: '12 mins ago',
    ok: false,
  },
]

export const liveVehicles = [
  {
    id: 'EV-001',
    online: true,
    on: true,
    user: { name: 'John Doe', uid: '0x3A4F21B8' },
    battery: 85,
    lastScan: '2 mins ago',
  },
  {
    id: 'EV-002',
    online: true,
    on: false,
    user: null,
    battery: 67,
    lastScan: '5 mins ago',
  },
  {
    id: 'EV-003',
    online: false,
    on: false,
    user: null,
    battery: 45,
    lastScan: '30 mins ago',
  },
  {
    id: 'EV-004',
    online: true,
    on: true,
    user: { name: 'Sarah Smith', uid: '0x91AC44E1' },
    battery: 92,
    lastScan: '1 min ago',
  },
]

export const vehicleControlFleet = [
  {
    id: 'EV-001',
    model: 'Tesla Model 3',
    online: true,
    on: true,
    locked: false,
    battery: 85,
  },
  {
    id: 'EV-005',
    model: 'Hyundai Kona',
    online: true,
    on: true,
    locked: true,
    battery: 78,
  },
  {
    id: 'EV-006',
    model: 'Nissan Leaf',
    online: true,
    on: false,
    locked: true,
    battery: 88,
  },
  {
    id: 'EV-007',
    model: 'Chevy Bolt',
    online: false,
    on: false,
    locked: false,
    battery: 45,
  },
]

export const rfidLogs = [
  {
    user: 'John Doe',
    rfid: '0x3A4F21B8',
    vehicle: 'EV-001',
    date: '2026-04-18',
    time: '10:45 AM',
    allowed: true,
  },
  {
    user: 'Sarah Smith',
    rfid: '0x91AC44E1',
    vehicle: 'EV-003',
    date: '2026-04-18',
    time: '09:12 AM',
    allowed: true,
  },
  {
    user: 'Unknown',
    rfid: '0xFFFFFFFF',
    vehicle: 'EV-007',
    date: '2026-04-17',
    time: '06:30 PM',
    allowed: false,
  },
  {
    user: 'Mike Johnson',
    rfid: '0x7D1E4A32',
    vehicle: 'EV-005',
    date: '2026-04-17',
    time: '02:15 PM',
    allowed: true,
  },
]

export const usersList = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    rfid: '0x3A4F21B8',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '+1987654321',
    rfid: '0x91AC44E1',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1555000111',
    rfid: '0x7D1E4A32',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
  },
]

export const weeklyUsage = [
  { day: 'Mon', denied: 12, success: 45 },
  { day: 'Tue', denied: 8, success: 52 },
  { day: 'Wed', denied: 15, success: 38 },
  { day: 'Thu', denied: 6, success: 61 },
  { day: 'Fri', denied: 10, success: 55 },
  { day: 'Sat', denied: 4, success: 28 },
  { day: 'Sun', denied: 7, success: 33 },
]

export const peakHours = [
  { t: '6AM', v: 12 },
  { t: '10AM', v: 45 },
  { t: '2PM', v: 38 },
  { t: '6PM', v: 52 },
  { t: '10PM', v: 22 },
]
