import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  Grid2X2,
  List,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import { formToProject, initialProjects, TEAM_MEMBERS } from './projectsData'

const projectFormStatusOptions = [
  { id: 'Started', label: 'Started' },
  { id: 'On Hold', label: 'On Hold' },
  { id: 'Completed', label: 'Completed' },
]

const dateOptions = ['12.07.2020', '15.01.2020', '20.08.2020', '01.09.2020']
const timeOptions = ['00:00', '09:00', '12:00', '18:00']

const addProjectFormDefaults = {
  brand: 'dropbox',
  status: 'Started',
  title: 'App Development',
  company: 'Dropbox, Inc.',
  description: 'Create a mobile application on iOS and Android devices.',
  startTime: '00:00',
  startDate: '12.07.2020',
  endTime: '00:00',
  endDate: '12.07.2020',
  members: ['Shane Black'],
  budget: '2.500.000',
}

function projectToForm(project) {
  return {
    brand: project.brand,
    status: project.status,
    title: project.title,
    company: project.company,
    description: project.description,
    startTime: project.startTime || '00:00',
    startDate: project.startDate || '12.07.2020',
    endTime: project.endTime || '00:00',
    endDate: project.endDate || '12.07.2020',
    members: [...project.members],
    budget: project.budget || '2.500.000',
  }
}

const dueDateOptions = [
  { id: 'anytime', label: 'Due anytime' },
  { id: 'week', label: 'Due this week' },
  { id: 'soon', label: 'Due in 5 days' },
  { id: 'overdue', label: 'Overdue' },
]

const projectStatusOptions = [
  { id: 'All', label: 'Any status' },
  { id: 'Started', label: 'Started' },
  { id: 'On Hold', label: 'On Hold' },
  { id: 'Completed', label: 'Completed' },
]

const emptyFilters = {
  search: '',
  members: [],
  dueDate: 'anytime',
  status: 'All',
}

const filterPanelDefaults = {
  search: '',
  members: ['Shane Black'],
  dueDate: 'anytime',
  status: 'Completed',
}

function projectMatchesDueDate(project, dueDate) {
  if (dueDate === 'anytime') return true
  if (dueDate === 'week') return project.timeLeft.includes('1 week')
  if (dueDate === 'soon') return project.timeLeft.includes('5 days') || project.timeLeft.includes('3 days')
  if (dueDate === 'overdue') return project.urgent
  return true
}

function projectMatchesFilters(project, filters) {
  const filterQuery = filters.search.trim().toLowerCase()
  if (
    filterQuery &&
    !project.title.toLowerCase().includes(filterQuery) &&
    !project.company.toLowerCase().includes(filterQuery) &&
    !project.description.toLowerCase().includes(filterQuery)
  ) {
    return false
  }

  if (filters.members.length > 0) {
    const hasMember = filters.members.some((member) => project.members.includes(member))
    if (!hasMember) return false
  }

  if (filters.status !== 'All' && project.status !== filters.status) {
    return false
  }

  if (!projectMatchesDueDate(project, filters.dueDate)) {
    return false
  }

  return true
}

const statusTabs = [
  { label: 'All', value: 'All' },
  { label: 'Started', value: 'Started' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Completed', value: 'Completed' },
]

export default function Projects() {
  const navigate = useNavigate()
  const location = useLocation()
  const [projectList, setProjectList] = useState(() => location.state?.projectList || initialProjects)
  const [activeTab, setActiveTab] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters)
  const [draftFilters, setDraftFilters] = useState(filterPanelDefaults)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [projectModal, setProjectModal] = useState(null)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [projectForm, setProjectForm] = useState(addProjectFormDefaults)

  useEffect(() => {
    if (location.state?.projectList) {
      setProjectList(location.state.projectList)
    }
  }, [location.state])

  const tabCounts = useMemo(() => {
    return {
      All: projectList.length,
      Started: projectList.filter((project) => project.status === 'Started').length,
      'On Hold': projectList.filter((project) => project.status === 'On Hold').length,
      Completed: projectList.filter((project) => project.status === 'Completed').length,
    }
  }, [projectList])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projectList.filter((project) => {
      const matchesTab = activeTab === 'All' || project.status === activeTab
      const matchesQuery =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.company.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery)

      return matchesTab && matchesQuery && projectMatchesFilters(project, appliedFilters)
    })
  }, [activeTab, appliedFilters, projectList, query])

  const openFilterPanel = () => {
    setDraftFilters(filterPanelDefaults)
    setFilterOpen(true)
    setOpenMenuId(null)
    setProjectModal(null)
  }

  const openAddProjectModal = () => {
    setProjectForm(addProjectFormDefaults)
    setEditingProjectId(null)
    setProjectModal('add')
    setOpenMenuId(null)
    setFilterOpen(false)
  }

  const openEditProjectModal = (project) => {
    setProjectForm(projectToForm(project))
    setEditingProjectId(project.id)
    setProjectModal('edit')
    setOpenMenuId(null)
    setFilterOpen(false)
  }

  const closeProjectModal = () => {
    setProjectModal(null)
    setEditingProjectId(null)
  }

  const saveProject = () => {
    if (projectModal === 'add') {
      const nextId = projectList.reduce((max, project) => Math.max(max, project.id), 0) + 1
      const newProject = formToProject({ ...projectForm, status: 'Started' }, { id: nextId })
      setProjectList((current) => [...current, newProject])
    }

    if (projectModal === 'edit' && editingProjectId) {
      const existingProject = projectList.find((project) => project.id === editingProjectId)
      if (existingProject) {
        const updatedProject = formToProject(projectForm, existingProject)
        setProjectList((current) =>
          current.map((project) => (project.id === editingProjectId ? updatedProject : project)),
        )
      }
    }

    closeProjectModal()
  }

  const openProjectDetails = (project) => {
    setOpenMenuId(null)
    setFilterOpen(false)
    setProjectModal(null)
    navigate(`/projects/${project.id}`, { state: { projectList } })
  }

  const applyFilters = () => {
    setAppliedFilters(draftFilters)
    setFilterOpen(false)
  }

  const resetFilters = () => {
    setDraftFilters(emptyFilters)
    setAppliedFilters(emptyFilters)
    setFilterOpen(false)
  }

  return (
    <div className="relative p-4 md:p-8">
      {projectModal ? (
        <ProjectFormModal
          mode={projectModal}
          form={projectForm}
          memberOptions={TEAM_MEMBERS}
          onChange={setProjectForm}
          onClose={closeProjectModal}
          onSave={saveProject}
        />
      ) : null}

      {filterOpen ? (
        <>
          <button className="fixed inset-0 z-30 bg-ink-900/40" aria-label="Close filter panel" onClick={() => setFilterOpen(false)} />
          <FilterPanel
            filters={draftFilters}
            memberOptions={TEAM_MEMBERS}
            onChange={setDraftFilters}
            onClose={() => setFilterOpen(false)}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </>
      ) : null}

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
            onClick={openFilterPanel}
            aria-expanded={filterOpen}
            aria-label="Filter projects"
          >
            <SlidersHorizontal size={17} />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-green"
            onClick={openAddProjectModal}
          >
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
              onMenuToggle={() => {
                setOpenMenuId((current) => (current === project.id ? null : project.id))
                setFilterOpen(false)
              }}
              onMenuClose={() => setOpenMenuId(null)}
              onEdit={openEditProjectModal}
              onOpenDetails={openProjectDetails}
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
                  onMenuToggle={() => {
                setOpenMenuId((current) => (current === project.id ? null : project.id))
                setFilterOpen(false)
              }}
                  onMenuClose={() => setOpenMenuId(null)}
                  onEdit={openEditProjectModal}
                  onOpenDetails={openProjectDetails}
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

function ProjectCard({ project, menuOpen, onMenuToggle, onMenuClose, onEdit, onOpenDetails }) {
  return (
    <article
      className="cursor-pointer rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-md"
      onClick={() => onOpenDetails(project)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <BrandLogo brand={project.brand} />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-ink-900">{project.title}</h2>
            <p className="truncate text-xs text-ink-400">{project.company}</p>
          </div>
        </div>
        <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()} role="presentation">
          <CardMenu project={project} open={menuOpen} onToggle={onMenuToggle} onClose={onMenuClose} onEdit={onEdit} onOpenDetails={onOpenDetails} />
        </div>
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
        <TeamAvatars members={project.members} />
      </div>
    </article>
  )
}

function ProjectListRow({ project, menuOpen, onMenuToggle, onMenuClose, onEdit, onOpenDetails }) {
  return (
    <tr
      className="cursor-pointer border-b border-ink-100 last:border-b-0 hover:bg-ink-50/70"
      onClick={() => onOpenDetails(project)}
    >
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
        <TeamAvatars members={project.members} />
      </td>
      <td className="px-3 py-4" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()} role="presentation">
        <CardMenu project={project} open={menuOpen} onToggle={onMenuToggle} onClose={onMenuClose} onEdit={onEdit} onOpenDetails={onOpenDetails} align="right" />
      </td>
    </tr>
  )
}

function CardMenu({ project, open, onToggle, onClose, onEdit, onOpenDetails, align = 'right' }) {
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

  const menuItems = [
    { label: 'View Details', icon: Search, destructive: false, action: () => onOpenDetails(project) },
    { label: 'Edit', icon: Pencil, destructive: false, action: () => onEdit(project) },
    { label: 'Add Member', icon: UserPlus, destructive: false },
    { label: 'Add Due Date', icon: Clock, destructive: false },
    { label: 'Delete Project', icon: Trash2, destructive: true, separated: true },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`rounded-lg p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700 ${open ? 'bg-ink-50 text-ink-700' : ''}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`Actions for ${project.title}`}
      >
        <MoreVertical size={16} />
      </button>
      {open ? (
        <div
          className={`absolute top-full z-30 mt-2 min-w-[196px] overflow-hidden rounded-2xl border border-ink-100 bg-white py-2 shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                  item.separated ? 'mt-1 border-t border-ink-100' : ''
                } ${item.destructive ? 'text-[#E98B70] hover:text-[#D97757]' : 'text-ink-600 hover:text-ink-900'}`}
                onClick={() => {
                  item.action?.()
                  onClose()
                }}
              >
                <Icon size={16} className={item.destructive ? 'text-[#E98B70]' : 'text-ink-400'} />
                {item.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function ProjectFormModal({ mode, form, memberOptions, onChange, onClose, onSave }) {
  const [statusOpen, setStatusOpen] = useState(false)
  const [memberQuery, setMemberQuery] = useState('')
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  const isEdit = mode === 'edit'

  const updateForm = (patch) => {
    onChange((current) => ({ ...current, ...patch }))
  }

  const removeMember = (member) => {
    updateForm({ members: form.members.filter((name) => name !== member) })
  }

  const addMember = (member) => {
    if (!form.members.includes(member)) {
      updateForm({ members: [...form.members, member] })
    }
    setMemberQuery('')
  }

  const filteredMemberOptions = memberOptions.filter(
    (member) => member.toLowerCase().includes(memberQuery.toLowerCase()) && !form.members.includes(member),
  )

  const selectedStatus =
    projectFormStatusOptions.find((option) => option.id === form.status) || projectFormStatusOptions[0]

  const cycleBrand = () => {
    const brands = ['dropbox', 'gitlab', 'bitbucket', 'python', 'slack', 'firebase', 'angular', 'vue', 'facebook']
    const currentIndex = brands.indexOf(form.brand)
    updateForm({ brand: brands[(currentIndex + 1) % brands.length] })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl2 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <h2 className="text-xl font-semibold text-ink-900">{isEdit ? 'Edit Project' : 'Add Project'}</h2>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-700"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {isEdit ? (
            <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-ink-50">
              <BrandLogo brand={form.brand} size="lg" />
              <button
                type="button"
                className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-500 shadow-card hover:bg-ink-50"
                onClick={cycleBrand}
                aria-label="Change project logo"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 text-ink-400 hover:border-ink-300 hover:text-ink-500"
              aria-label="Upload project image"
            >
              <Plus size={28} strokeWidth={1.5} />
            </button>
          )}

          {isEdit ? (
            <ProjectFormField label="Status">
              <div className="relative">
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-between rounded-xl border border-ink-100 px-4 text-sm text-ink-700 hover:bg-ink-50"
                  onClick={() => setStatusOpen((open) => !open)}
                >
                  <span className="flex items-center gap-2">
                    <Check size={16} className="text-ink-400" />
                    {selectedStatus.label}
                  </span>
                  <ChevronDown size={16} className="text-ink-400" />
                </button>
                {statusOpen ? (
                  <div className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
                    {projectFormStatusOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                          option.id === form.status ? 'font-medium text-brand-dark' : 'text-ink-600'
                        }`}
                        onClick={() => {
                          updateForm({ status: option.id })
                          setStatusOpen(false)
                        }}
                      >
                        {option.id === form.status ? `✓ ${option.label}` : option.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </ProjectFormField>
          ) : null}

          <ProjectFormField label="Project Name">
            <input
              value={form.title}
              onChange={(event) => updateForm({ title: event.target.value })}
              className="h-12 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
            />
          </ProjectFormField>

          <ProjectFormField label="Client Name">
            <input
              value={form.company}
              onChange={(event) => updateForm({ company: event.target.value })}
              className="h-12 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
            />
          </ProjectFormField>

          <ProjectFormField label="Description">
            <textarea
              value={form.description}
              onChange={(event) => updateForm({ description: event.target.value })}
              rows={isEdit ? 5 : 3}
              className="w-full resize-none rounded-xl border border-ink-100 px-4 py-3 text-sm leading-6 text-ink-700 outline-none focus:border-brand-dark"
            />
          </ProjectFormField>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <ProjectFormField label="Start Date">
              <div className="flex gap-2">
                <select
                  value={form.startTime}
                  onChange={(event) => updateForm({ startTime: event.target.value })}
                  className="h-12 min-w-0 flex-1 rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-700 outline-none focus:border-brand-dark"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <div className="relative min-w-0 flex-[1.4]">
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-ink-100 px-3 text-sm text-ink-700 hover:bg-ink-50"
                    onClick={() => {
                      setStartDateOpen((open) => !open)
                      setEndDateOpen(false)
                    }}
                  >
                    <span className="truncate">{form.startDate}</span>
                    <ChevronDown size={16} className="shrink-0 text-ink-400" />
                  </button>
                  {startDateOpen ? (
                    <div className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
                      {dateOptions.map((date) => (
                        <button
                          key={date}
                          type="button"
                          className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                            date === form.startDate ? 'font-medium text-brand-dark' : 'text-ink-600'
                          }`}
                          onClick={() => {
                            updateForm({ startDate: date })
                            setStartDateOpen(false)
                          }}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </ProjectFormField>

            <span className="hidden pb-3 text-center text-ink-400 sm:block">-</span>

            <ProjectFormField label="End Date">
              <div className="flex gap-2">
                <select
                  value={form.endTime}
                  onChange={(event) => updateForm({ endTime: event.target.value })}
                  className="h-12 min-w-0 flex-1 rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-700 outline-none focus:border-brand-dark"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <div className="relative min-w-0 flex-[1.4]">
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-ink-100 px-3 text-sm text-ink-700 hover:bg-ink-50"
                    onClick={() => {
                      setEndDateOpen((open) => !open)
                      setStartDateOpen(false)
                    }}
                  >
                    <span className="truncate">{form.endDate}</span>
                    <ChevronDown size={16} className="shrink-0 text-ink-400" />
                  </button>
                  {endDateOpen ? (
                    <div className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
                      {dateOptions.map((date) => (
                        <button
                          key={date}
                          type="button"
                          className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                            date === form.endDate ? 'font-medium text-brand-dark' : 'text-ink-600'
                          }`}
                          onClick={() => {
                            updateForm({ endDate: date })
                            setEndDateOpen(false)
                          }}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </ProjectFormField>
          </div>

          <ProjectFormField label="Members">
            <div className="rounded-xl border border-ink-100 p-3">
              <div className="flex flex-wrap gap-2">
                {form.members.map((member) => (
                  <span
                    key={member}
                    className="inline-flex items-center gap-2 rounded-lg bg-ink-50 px-2 py-1.5 text-sm text-ink-700"
                  >
                    <MemberAvatar name={member} size="xs" />
                    {member}
                    <button
                      type="button"
                      className="text-ink-400 hover:text-ink-700"
                      onClick={() => removeMember(member)}
                      aria-label={`Remove ${member}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative mt-3">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  value={memberQuery}
                  onChange={(event) => setMemberQuery(event.target.value)}
                  placeholder="Search members..."
                  className="h-10 w-full rounded-lg border border-ink-100 bg-white pl-10 pr-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
                />
              </div>
              {memberQuery && filteredMemberOptions.length > 0 ? (
                <ul className="mt-2 max-h-32 overflow-y-auto rounded-lg border border-ink-100">
                  {filteredMemberOptions.map((member) => (
                    <li key={member}>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink-600 hover:bg-ink-50"
                        onClick={() => addMember(member)}
                      >
                        <MemberAvatar name={member} size="xs" />
                        {member}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </ProjectFormField>

          <ProjectFormField label="Budget">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink-400">$</span>
              <input
                value={form.budget}
                onChange={(event) => updateForm({ budget: event.target.value })}
                className="h-12 w-full rounded-xl border border-ink-100 pl-8 pr-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
              />
            </div>
          </ProjectFormField>
        </div>

        <div className="flex justify-end border-t border-ink-100 px-6 py-5">
          <button
            type="button"
            className="h-12 rounded-xl bg-brand-dark px-8 text-sm font-semibold text-white hover:bg-brand-green"
            onClick={onSave}
          >
            {isEdit ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectFormField({ label, children }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-sm text-ink-400">{label}</span>
      {children}
    </label>
  )
}

function FilterPanel({ filters, memberOptions, onChange, onClose, onApply, onReset }) {
  const [memberQuery, setMemberQuery] = useState('')
  const [dueDateOpen, setDueDateOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const updateFilters = (patch) => {
    onChange((current) => ({ ...current, ...patch }))
  }

  const removeMember = (member) => {
    updateFilters({ members: filters.members.filter((name) => name !== member) })
  }

  const addMember = (member) => {
    if (!filters.members.includes(member)) {
      updateFilters({ members: [...filters.members, member] })
    }
    setMemberQuery('')
  }

  const filteredMemberOptions = memberOptions.filter(
    (member) => member.toLowerCase().includes(memberQuery.toLowerCase()) && !filters.members.includes(member),
  )

  const selectedDueDate = dueDateOptions.find((option) => option.id === filters.dueDate) || dueDateOptions[0]
  const selectedStatus = projectStatusOptions.find((option) => option.id === filters.status) || projectStatusOptions[0]

  return (
    <aside className="fixed right-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-full max-w-[403px] flex-col border-l border-ink-100 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
        <h2 className="text-2xl font-semibold text-ink-900">Filter</h2>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-700"
          onClick={onClose}
          aria-label="Close filter panel"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={filters.search}
            onChange={(event) => updateFilters({ search: event.target.value })}
            placeholder="Search Projects..."
            className="h-12 w-full rounded-xl border border-ink-100 bg-white pl-11 pr-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
          />
        </div>

        <FilterSection label="Members">
          <div className="rounded-xl border border-ink-100 p-3">
            <div className="flex flex-wrap gap-2">
              {filters.members.map((member) => (
                <span
                  key={member}
                  className="inline-flex items-center gap-2 rounded-lg bg-ink-50 px-2 py-1.5 text-sm text-ink-700"
                >
                  <MemberAvatar name={member} size="xs" />
                  {member}
                  <button
                    type="button"
                    className="text-ink-400 hover:text-ink-700"
                    onClick={() => removeMember(member)}
                    aria-label={`Remove ${member}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="relative mt-3">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={memberQuery}
                onChange={(event) => setMemberQuery(event.target.value)}
                placeholder="Search members..."
                className="h-10 w-full rounded-lg border border-ink-100 bg-white pl-10 pr-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
              />
            </div>
            {memberQuery && filteredMemberOptions.length > 0 ? (
              <ul className="mt-2 max-h-32 overflow-y-auto rounded-lg border border-ink-100">
                {filteredMemberOptions.map((member) => (
                  <li key={member}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink-600 hover:bg-ink-50"
                      onClick={() => addMember(member)}
                    >
                      <MemberAvatar name={member} size="xs" />
                      {member}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </FilterSection>

        <FilterSection label="Due Date">
          <div className="relative">
            <button
              type="button"
              className="flex h-12 w-full items-center justify-between rounded-xl border border-ink-100 px-4 text-sm text-ink-700 hover:bg-ink-50"
              onClick={() => {
                setDueDateOpen((open) => !open)
                setStatusOpen(false)
              }}
            >
              <span className="flex items-center gap-3">
                <CalendarClock size={16} className="text-ink-400" />
                {selectedDueDate.label}
              </span>
              <ChevronDown size={16} className="text-ink-400" />
            </button>
            {dueDateOpen ? (
              <div className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
                {dueDateOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                      option.id === filters.dueDate ? 'font-medium text-brand-dark' : 'text-ink-600'
                    }`}
                    onClick={() => {
                      updateFilters({ dueDate: option.id })
                      setDueDateOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </FilterSection>

        <FilterSection label="Status">
          <div className="relative">
            <button
              type="button"
              className="flex h-12 w-full items-center justify-between rounded-xl border border-ink-100 px-4 text-sm text-ink-700 hover:bg-ink-50"
              onClick={() => {
                setStatusOpen((open) => !open)
                setDueDateOpen(false)
              }}
            >
              <span className="flex items-center gap-3">
                <Check size={16} className="text-ink-400" />
                {selectedStatus.label}
              </span>
              <ChevronDown size={16} className="text-ink-400" />
            </button>
            {statusOpen ? (
              <div className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
                {projectStatusOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                      option.id === filters.status ? 'font-medium text-brand-dark' : 'text-ink-600'
                    }`}
                    onClick={() => {
                      updateFilters({ status: option.id })
                      setStatusOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </FilterSection>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-ink-100 px-6 py-5">
        <button
          type="button"
          className="h-12 flex-1 rounded-xl bg-brand-dark text-sm font-semibold text-white hover:bg-brand-green"
          onClick={onApply}
        >
          Apply Filters
        </button>
        <button type="button" className="text-sm font-medium text-brand-dark underline hover:text-brand-green" onClick={onReset}>
          Reset all Filters
        </button>
      </div>
    </aside>
  )
}

function FilterSection({ label, children }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</h3>
      {children}
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

function TeamAvatars({ members }) {
  return (
    <div className="flex -space-x-2">
      {members.map((name, index) => (
        <MemberAvatar key={`${name}-${index}`} name={name} />
      ))}
    </div>
  )
}

function MemberAvatar({ name, size = 'md' }) {
  const sizes = {
    xs: 'h-6 w-6 text-[8px]',
    md: 'h-7 w-7 text-[9px]',
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#E98B70] to-[#C65E43] font-semibold text-white ${sizes[size] || sizes.md}`}
      title={name}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}
