import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Clock,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

const TEAM_MEMBERS = ['Shane Black', 'Jane Wilson', 'Ronald Robertson', 'Judith Black', 'Calvin Flores']

const featuredProjects = [
  {
    id: 1,
    brand: 'dropbox',
    title: 'App Development',
    company: 'Dropbox, Inc.',
    description: 'Create a mobile application on iOS and Android devices.',
    progress: 50,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
  },
  {
    id: 2,
    brand: 'gitlab',
    title: 'Website Redesign',
    company: 'GitLab Inc.',
    description: 'Redesign the company website with a modern responsive layout.',
    progress: 75,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
  },
  {
    id: 3,
    brand: 'bitbucket',
    title: 'Landing Page',
    company: 'Bitbucket, Inc.',
    description: 'Build a conversion-focused landing page for the new product launch.',
    progress: 100,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Completed',
    teamSize: 2,
  },
  {
    id: 4,
    brand: 'python',
    title: 'Parser Development',
    company: 'Driveway, Inc.',
    description: 'Develop a data parser to process incoming API payloads efficiently.',
    progress: 50,
    timeLeft: '5 days left',
    urgent: true,
    status: 'Started',
    teamSize: 3,
  },
  {
    id: 5,
    brand: 'slack',
    title: 'App Development',
    company: 'Slack Technologies, Inc.',
    description: 'Create integrations and workflow automations for the Slack platform.',
    progress: 50,
    timeLeft: '5 days left',
    urgent: true,
    status: 'Started',
    teamSize: 2,
  },
  {
    id: 6,
    brand: 'firebase',
    title: 'App Development',
    company: 'Google, Inc.',
    description: 'Build a cross-platform app backed by Firebase authentication and storage.',
    progress: 25,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 2,
  },
  {
    id: 7,
    brand: 'angular',
    title: 'Admin Dashboard',
    company: 'ArtTemplate, Inc.',
    description: 'Design and implement an admin dashboard with role-based access control.',
    progress: 30,
    timeLeft: '2 weeks left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
  },
  {
    id: 8,
    brand: 'vue',
    title: 'Web App on Vue.js',
    company: 'ArtTemplate, Inc.',
    description: 'Deliver a production-ready Vue.js web application for internal teams.',
    progress: 100,
    timeLeft: '3 days left',
    urgent: false,
    status: 'Completed',
    teamSize: 2,
  },
  {
    id: 9,
    brand: 'facebook',
    title: 'App Development',
    company: 'Facebook, Inc.',
    description: 'Develop a Messenger mini-app with real-time chat and media sharing.',
    progress: 50,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
  },
]

const extraTitles = [
  'API Integration',
  'Mobile UI Kit',
  'Analytics Module',
  'Payment Gateway',
  'CRM Migration',
  'Cloud Deployment',
  'Security Audit',
  'Brand Refresh',
  'Customer Portal',
  'Inventory Sync',
]

const extraCompanies = [
  'Acme Corp.',
  'Northwind LLC',
  'Blue Harbor Ltd.',
  'Summit Digital',
  'Vertex Systems',
  'Horizon Labs',
  'Pulse Media',
  'NovaTech Inc.',
]

const extraBrands = ['dropbox', 'gitlab', 'bitbucket', 'python', 'slack', 'firebase', 'angular', 'vue', 'facebook']

function buildProjects() {
  const projects = [...featuredProjects]
  const statusTargets = { Started: 128, 'On Hold': 15, Completed: 8 }
  const currentCounts = {
    Started: featuredProjects.filter((project) => project.status === 'Started').length,
    'On Hold': featuredProjects.filter((project) => project.status === 'On Hold').length,
    Completed: featuredProjects.filter((project) => project.status === 'Completed').length,
  }

  let id = featuredProjects.length + 1

  Object.entries(statusTargets).forEach(([status, target]) => {
    while (currentCounts[status] < target) {
      const index = id - 1
      projects.push({
        id,
        brand: extraBrands[index % extraBrands.length],
        title: extraTitles[index % extraTitles.length],
        company: extraCompanies[index % extraCompanies.length],
        description: 'Coordinate milestones, deliverables, and stakeholder reviews for this initiative.',
        progress: status === 'Completed' ? 100 : 15 + (index % 75),
        timeLeft: index % 4 === 0 ? '5 days left' : index % 3 === 0 ? '2 weeks left' : '1 week left',
        urgent: index % 4 === 0,
        status,
        teamSize: 2 + (index % 2),
      })
      currentCounts[status] += 1
      id += 1
    }
  })

  return projects
}

const projects = buildProjects()

const statusTabs = [
  { label: 'All', value: 'All' },
  { label: 'Started', value: 'Started' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Completed', value: 'Completed' },
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    minProgress: 0,
    maxProgress: 100,
    urgentOnly: false,
  })
  const [openMenuId, setOpenMenuId] = useState(null)

  const tabCounts = useMemo(() => {
    return {
      All: projects.length,
      Started: projects.filter((project) => project.status === 'Started').length,
      'On Hold': projects.filter((project) => project.status === 'On Hold').length,
      Completed: projects.filter((project) => project.status === 'Completed').length,
    }
  }, [])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesTab = activeTab === 'All' || project.status === activeTab
      const matchesQuery =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.company.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery)
      const matchesProgress =
        project.progress >= appliedFilters.minProgress && project.progress <= appliedFilters.maxProgress
      const matchesUrgent = !appliedFilters.urgentOnly || project.urgent

      return matchesTab && matchesQuery && matchesProgress && matchesUrgent
    })
  }, [activeTab, appliedFilters, query])

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-ink-900">Projects</h1>
          <ProjectTabs
            activeTab={activeTab}
            tabCounts={tabCounts}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setOpenMenuId(null)
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 bg-white text-ink-500 shadow-card hover:bg-ink-50 ${
              filterOpen ? 'text-brand-dark ring-2 ring-brand-dark/20' : ''
            }`}
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            aria-label="Filter projects"
          >
            <SlidersHorizontal size={17} />
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-green">
            <Plus size={16} />
            Add Project
          </button>
          <div className="ml-0 flex items-center gap-3 text-ink-400 lg:ml-4">
            <button
              className={viewMode === 'list' ? 'text-brand-dark' : 'hover:text-ink-700'}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List size={18} />
            </button>
            <button
              className={viewMode === 'grid' ? 'text-brand-dark' : 'hover:text-ink-700'}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid2X2 size={17} />
            </button>
          </div>
        </div>
      </div>

      {filterOpen ? (
        <FilterPanel
          filters={appliedFilters}
          onChange={setAppliedFilters}
          onClose={() => setFilterOpen(false)}
        />
      ) : null}

      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex h-11 min-w-0 flex-1 max-w-md items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 shadow-card">
          <Search size={17} className="text-ink-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
            placeholder="Search projects..."
          />
        </div>
        <p className="text-sm text-ink-400">
          {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-xl2 border border-ink-100 bg-white p-12 text-center shadow-card">
          <p className="text-sm font-medium text-ink-700">No projects match your filters</p>
          <p className="mt-1 text-sm text-ink-400">Try another tab or clear your search.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              menuOpen={openMenuId === project.id}
              onMenuToggle={() => setOpenMenuId((current) => (current === project.id ? null : project.id))}
              onMenuClose={() => setOpenMenuId(null)}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-4 font-semibold">Project</th>
                <th className="px-3 py-4 font-semibold">Status</th>
                <th className="px-3 py-4 font-semibold">Progress</th>
                <th className="px-3 py-4 font-semibold">Time Left</th>
                <th className="px-3 py-4 font-semibold">Team</th>
                <th className="w-10 px-3 py-4" />
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <ProjectListRow
                  key={project.id}
                  project={project}
                  menuOpen={openMenuId === project.id}
                  onMenuToggle={() => setOpenMenuId((current) => (current === project.id ? null : project.id))}
                  onMenuClose={() => setOpenMenuId(null)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ProjectTabs({ activeTab, tabCounts, onTabChange }) {
  return (
    <div className="mt-7 flex h-auto w-full flex-wrap items-center gap-7 border-b border-ink-100 text-sm md:h-10">
      {statusTabs.map((tab) => (
        <button
          key={tab.value}
          className={`relative flex items-center gap-2 pb-3 font-medium ${
            activeTab === tab.value ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
          <span className="rounded-md bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-400">{tabCounts[tab.value]}</span>
          {activeTab === tab.value ? <span className="absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full bg-brand-dark" /> : null}
        </button>
      ))}
    </div>
  )
}

function ProjectCard({ project, menuOpen, onMenuToggle, onMenuClose }) {
  return (
    <article className="rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <BrandLogo brand={project.brand} />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-ink-900">{project.title}</h2>
            <p className="truncate text-xs text-ink-400">{project.company}</p>
          </div>
        </div>
        <CardMenu project={project} open={menuOpen} onToggle={onMenuToggle} onClose={onMenuClose} />
      </div>

      <p className="mt-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-ink-500">{project.description}</p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-ink-400">Progress</span>
          <span className="font-medium text-ink-700">{project.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <TimeBadge timeLeft={project.timeLeft} urgent={project.urgent} />
        <TeamAvatars count={project.teamSize} />
      </div>
    </article>
  )
}

function ProjectListRow({ project, menuOpen, onMenuToggle, onMenuClose }) {
  return (
    <tr className="border-b border-ink-100 last:border-b-0 hover:bg-ink-50/70">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <BrandLogo brand={project.brand} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium text-ink-900">{project.title}</p>
            <p className="truncate text-xs text-ink-400">{project.company}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <StatusBadge status={project.status} />
      </td>
      <td className="px-3 py-4">
        <div className="flex min-w-[140px] items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-green" style={{ width: `${project.progress}%` }} />
          </div>
          <span className="w-10 text-xs font-medium text-ink-700">{project.progress}%</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <TimeBadge timeLeft={project.timeLeft} urgent={project.urgent} compact />
      </td>
      <td className="px-3 py-4">
        <TeamAvatars count={project.teamSize} />
      </td>
      <td className="px-3 py-4">
        <CardMenu project={project} open={menuOpen} onToggle={onMenuToggle} onClose={onMenuClose} align="right" />
      </td>
    </tr>
  )
}

function CardMenu({ project, open, onToggle, onClose, align = 'right' }) {
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handleClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`Actions for ${project.title}`}
      >
        <MoreVertical size={16} />
      </button>
      {open ? (
        <div
          className={`absolute top-full z-20 mt-1 min-w-[160px] rounded-xl border border-ink-100 bg-white py-1 shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {['View Details', 'Edit Project', 'Archive', 'Delete'].map((action) => (
            <button
              key={action}
              className="block w-full px-4 py-2 text-left text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              onClick={onClose}
            >
              {action}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function FilterPanel({ filters, onChange, onClose }) {
  return (
    <section className="mb-5 rounded-xl2 border border-ink-100 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink-900">Filters</h2>
        <button className="text-sm text-ink-400 hover:text-ink-700" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm text-ink-500">
          Min progress ({filters.minProgress}%)
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minProgress}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                minProgress: Math.min(Number(event.target.value), current.maxProgress),
              }))
            }
            className="mt-2 w-full accent-brand-dark"
          />
        </label>
        <label className="text-sm text-ink-500">
          Max progress ({filters.maxProgress}%)
          <input
            type="range"
            min="0"
            max="100"
            value={filters.maxProgress}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                maxProgress: Math.max(Number(event.target.value), current.minProgress),
              }))
            }
            className="mt-2 w-full accent-brand-dark"
          />
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-600">
          <input
            type="checkbox"
            checked={filters.urgentOnly}
            onChange={(event) => onChange((current) => ({ ...current, urgentOnly: event.target.checked }))}
            className="h-4 w-4 rounded border-ink-200 text-brand-dark focus:ring-brand-dark/30"
          />
          Urgent deadlines only
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-500 hover:bg-ink-50"
          onClick={() =>
            onChange({
              minProgress: 0,
              maxProgress: 100,
              urgentOnly: false,
            })
          }
        >
          Reset
        </button>
        <button className="rounded-xl bg-brand-dark px-4 py-2 text-sm font-medium text-white hover:bg-brand-green" onClick={onClose}>
          Apply
        </button>
      </div>
    </section>
  )
}

function TimeBadge({ timeLeft, urgent, compact = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full text-xs font-medium ${
        compact ? 'bg-transparent px-0 py-0' : 'px-2.5 py-1'
      } ${urgent ? 'bg-orange-50 text-orange-500' : 'bg-ink-100 text-ink-500'}`}
    >
      <Clock size={12} className={urgent ? 'text-orange-500' : 'text-ink-400'} />
      {timeLeft}
    </span>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Started: 'bg-emerald-50 text-brand-dark',
    'On Hold': 'bg-amber-50 text-amber-600',
    Completed: 'bg-ink-100 text-ink-600',
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status] || 'bg-ink-100 text-ink-500'}`}>
      {status}
    </span>
  )
}

function TeamAvatars({ count }) {
  const members = TEAM_MEMBERS.slice(0, count)

  return (
    <div className="flex -space-x-2">
      {members.map((name, index) => (
        <TeamAvatar key={`${name}-${index}`} name={name} />
      ))}
    </div>
  )
}

function TeamAvatar({ name }) {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#E98B70] to-[#C65E43] text-[9px] font-semibold text-white"
      title={name}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}

function BrandLogo({ brand, size = 'md' }) {
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
  }

  const logos = {
    dropbox: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#0061FF" d="M6 2l6 4 6-4v5l-6 4-6-4V2zm12 7l6 4-6 4-6-4 6-4zm-6 9l6 4 6-4v-5l-6-4-6 4v5zM0 13l6-4 6 4-6 4-6-4z" />
      </svg>
    ),
    gitlab: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#FC6D26" d="m12 22 10-7.5L12 2 2 14.5 12 22z" />
        <path fill="#E24329" d="M12 22 2 14.5l3.2-9.8L12 22z" />
        <path fill="#FC6D26" d="M12 22 18.8 4.7 22 14.5 12 22z" />
        <path fill="#FCA326" d="M12 22 5.2 4.7 2 14.5 12 22z" />
      </svg>
    ),
    bitbucket: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#2684FF" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h17A1.5 1.5 0 0 1 22 3.5v3.8c0 .5-.3 1-.7 1.3L14.6 18.2a2 2 0 0 1-3.2 0L2.7 8.6A1.5 1.5 0 0 1 2 7.3V3.5z" />
        <path fill="#fff" d="M9.5 11.5h5l1.2 4.5h-7.4l1.2-4.5z" />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#3776AB" d="M12 2c-3.2 0-3 .5-3 1.7v1.6h3v.5H7.2C4.8 5.8 3 7.4 3 10.2c0 1.8.9 3 2.4 3.6-.3.5-.4 1.1-.4 1.8 0 1.5.8 2.6 2.4 3.1V22h2.1v-3.1c3.2-.2 5.5-1.5 5.5-4.9 0-2.3-1.4-3.5-3.8-4.1.3-.5.4-1 .4-1.7C11.6 5.1 10.8 4 9.2 3.5V2H12zm-1.1 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
        <path fill="#FFD43B" d="M12 22c3.2 0 3-.5 3-1.7v-1.6h-3v-.5h4.8c2.4 0 4.2-1.6 4.2-4.4 0-1.8-.9-3-2.4-3.6.3-.5.4-1.1.4-1.8 0-1.5-.8-2.6-2.4-3.1V2h-2.1v3.1c-3.2.2-5.5 1.5-5.5 4.9 0 2.3 1.4 3.5 3.8 4.1-.3.5-.4 1 .4 1.7 0 1.5-.8 2.6-2.4 3.1V22H12zm1.1-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
      </svg>
    ),
    slack: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#E01E5A" d="M5.5 14.5A2.5 2.5 0 1 1 3 12H5.5v2.5zM6 12a2.5 2.5 0 1 1 5 0v6a2.5 2.5 0 1 1-5 0V12z" />
        <path fill="#36C5F0" d="M9.5 5.5A2.5 2.5 0 1 1 12 3v2.5H9.5zM12 6a2.5 2.5 0 1 1 0 5H6a2.5 2.5 0 1 1 0-5h6z" />
        <path fill="#2EB67D" d="M18.5 9.5A2.5 2.5 0 1 1 21 12H18.5V9.5zM18 12a2.5 2.5 0 1 1-5 0V6a2.5 2.5 0 1 1 5 0v6z" />
        <path fill="#ECB22E" d="M14.5 18.5A2.5 2.5 0 1 1 12 21v-2.5h2.5zM12 18a2.5 2.5 0 1 1 0-5h6a2.5 2.5 0 1 1 0 5h-6z" />
      </svg>
    ),
    firebase: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#FFCA28" d="M5.5 20 12 4l3.2 6.8L12 20H5.5z" />
        <path fill="#FFA000" d="M12 4 18.5 20H12V4z" />
        <path fill="#F57C00" d="M5.5 20 12 10.8 18.5 20H5.5z" />
      </svg>
    ),
    angular: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#DD0031" d="M12 2 3 5.2l1.4 12.1L12 22l7.6-4.7L21 5.2 12 2z" />
        <path fill="#fff" d="M12 5.2 7.2 16.2h2l.8-2.2h3.2l.8 2.2h2L12 5.2zm-.4 7.2 1.4-3.8 1.4 3.8H11.6z" />
      </svg>
    ),
    vue: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#41B883" d="M12 3 3 20h4.5l4.5-7.8L16.5 20H21L12 3z" />
        <path fill="#35495E" d="M12 8.2 8.8 14.2h6.4L12 8.2z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#0084FF"
          d="M12 2C6.5 2 2 6.1 2 11.4c0 4.7 3.5 8.6 8.1 9.3v-6.6H7.4V11h2.7V9.1c0-2.7 1.6-4.2 4-4.2 1.2 0 2.4.2 2.4.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V11h3l-.5 2.7H13v6.6c4.6-.7 8.1-4.6 8.1-9.3C21.1 6.1 16.6 2 12 2z"
        />
      </svg>
    ),
  }

  return (
    <div className={`flex shrink-0 items-center justify-center rounded-xl bg-ink-50 ${sizes[size] || sizes.md}`}>
      {logos[brand] || logos.dropbox}
    </div>
  )
}
