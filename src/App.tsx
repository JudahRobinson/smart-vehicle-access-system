import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { LiveMonitoring } from './pages/LiveMonitoring'
import { RFIDLogs } from './pages/RFIDLogs'
import { VehicleControl } from './pages/VehicleControl'
import { UserManagement } from './pages/UserManagement'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="live" element={<LiveMonitoring />} />
          <Route path="logs" element={<RFIDLogs />} />
          <Route path="vehicles" element={<VehicleControl />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
