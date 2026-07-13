import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PlaceholderPage from './components/PlaceholderPage'
import Dashboard from './pages/Dashboard'
import ArtTemplate from './pages/ArtTemplate'
import EcommerceProducts from './pages/EcommerceProducts'
import { navItems } from './navConfig'

export default function App() {
  const { pathname } = useLocation()

  if (pathname === '/arttemplate') {
    return <ArtTemplate />
  }

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/arttemplate" element={<ArtTemplate />} />
          <Route path="/ecommerce" element={<EcommerceProducts />} />
          <Route path="/ecommerce/products" element={<EcommerceProducts />} />
          {navItems
            .flatMap((item) => item.children || [item])
            .filter((item) => !['/', '/ecommerce', '/ecommerce/products'].includes(item.path))
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
  )
}
