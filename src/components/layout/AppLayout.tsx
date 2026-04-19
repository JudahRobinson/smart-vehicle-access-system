import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#11142d]">
      <Sidebar />
      <main className="min-h-screen flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
