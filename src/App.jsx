import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PlaceholderPage from './components/PlaceholderPage'
import Dashboard from './pages/Dashboard'
import ArtTemplate from './pages/ArtTemplate'
import EcommerceProducts from './pages/EcommerceProducts'
import EcommerceOrders from './pages/EcommerceOrders'
import EcommerceCustomers from './pages/EcommerceCustomers'
import Calendar from './pages/Calendar'
import Mail from './pages/Mail'
import Task from './pages/Task'
import Projects from './pages/Projects'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import FileManager from './pages/FileManager'
import Notes from './pages/Notes'
import Contacts from './pages/Contacts'
import { navItems } from './navConfig'

function isProjectDetailsPath(pathname) {
  return /^\/projects\/\d+$/.test(pathname)
}

export default function App() {
  const { pathname } = useLocation()

  if (pathname === '/arttemplate') {
    return <ArtTemplate />
  }

  if (pathname === '/mail') {
    return <Mail />
  }

  if (pathname === '/file-manager') {
    return <FileManager />
  }

  if (isProjectDetailsPath(pathname)) {
    return (
      <div className="flex h-screen overflow-hidden bg-ink-50">
        <div className="flex min-h-0 flex-1 flex-col">
          <Topbar />
          <div className="min-h-0 flex-1 overflow-hidden">
            <Routes>
              <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-ink-50">
      <Sidebar />
      <div className="flex min-h-0 flex-1 flex-col">
        <Topbar />
        <div className="min-h-0 flex-1 overflow-auto">
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/arttemplate" element={<ArtTemplate />} />
          <Route path="/ecommerce" element={<EcommerceProducts />} />
          <Route path="/ecommerce/products" element={<EcommerceProducts />} />
          <Route path="/ecommerce/orders" element={<EcommerceOrders />} />
          <Route path="/ecommerce/customers" element={<EcommerceCustomers />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/task" element={<Task />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/contacts" element={<Contacts />} />
          {navItems
            .flatMap((item) => item.children || [item])
            .filter((item) => !['/', '/ecommerce', '/ecommerce/products', '/ecommerce/orders', '/ecommerce/customers', '/calendar', '/mail', '/task', '/projects', '/file-manager', '/notes', '/contacts'].includes(item.path))
            .map(({ path, label, icon }) => (
              <Route
                key={path}
                path={path}
                element={<PlaceholderPage title={label} icon={icon || navItems.find((item) => item.children?.some((child) => child.path === path))?.icon} />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  )
}
