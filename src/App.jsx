import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PlaceholderPage from './components/PlaceholderPage'
import Dashboard from './pages/Dashboard'
import ArtTemplate from './pages/ArtTemplate'
import { navItems } from './navConfig'

export default function App() {
  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/arttemplate" element={<ArtTemplate />} />
          {navItems
            .filter((item) => item.path !== '/')
            .map(({ path, label, icon }) => (
              <Route
                key={path}
                path={path}
                element={<PlaceholderPage title={label} icon={icon} />}
              />
            ))}
        </Routes>
      </div>
    </div>
  )
}
