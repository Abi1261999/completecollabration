import { useMemo, useState } from 'react'
import {
  Archive,
  ArrowUpDown,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Layers,
  LayoutGrid,
  MessageSquare,
  MoreHorizontal,
  Move,
  Paperclip,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react'

const projectList = [
  { id: 'design-plans', name: 'Design Plans' },
  { id: 'wireframe-ui-kit', name: 'Wireframe UI Kit' },
  { id: 'admin-dashboard', name: 'Admin Dashboard' },
  { id: 'sochi-hotel', name: 'Sochi – Hotel Booking' },
]

const addMenuItems = [
  { id: 'task', label: 'Task', icon: FileText },
  { id: 'board', label: 'Board', icon: LayoutGrid },
  { id: 'project', label: 'Project', icon: Layers },
  { id: 'invite', label: 'Invite', icon: UserPlus },
]

const columnColorOptions = [
  'bg-yellow-400',
  'bg-sky-400',
  'bg-brand-dark',
  'bg-red-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-orange-400',
  'bg-teal-400',
  'bg-indigo-400',
  'bg-slate-400',
]

const defaultColumnAccents = {
  todo: 'bg-yellow-400',
  inProgress: 'bg-sky-400',
  completed: 'bg-brand-dark',
}

const columns = [
  { id: 'todo', title: 'TODO' },
  { id: 'inProgress', title: 'IN PROGRESS' },
  { id: 'completed', title: 'COMPLETED' },
]

const initialTasks = {
  todo: [
    {
      id: 'todo-1',
      title: 'Brand Logo Design',
      description: 'Make a redesign of the logo in corporate colors.',
      date: 'Jun 17',
      attachments: 2,
      comments: 5,
      assignees: ['Regina Cooper', 'Judith Black'],
      statusBar: ['bg-brand-dark', 'bg-brand-dark'],
    },
    {
      id: 'todo-2',
      title: 'New Header Image',
      description: '',
      date: 'Jun 17',
      attachments: 1,
      comments: 3,
      assignees: ['Dustin Williamson'],
      coverImage: 'mountain',
      statusBar: ['bg-brand-dark'],
    },
    {
      id: 'todo-3',
      title: 'Wireframe for App',
      description: 'Make a wireframe for an app for a pre-presentation.',
      date: 'Jun 17',
      attachments: 0,
      comments: 1,
      assignees: ['Jane Wilson', 'Ronald Robertson'],
      statusBar: ['bg-sky-400', 'bg-brand-dark'],
    },
    {
      id: 'todo-4',
      title: 'Color Palette Review',
      description: 'Review brand colors for the new marketing site.',
      date: 'Jun 16',
      attachments: 1,
      comments: 2,
      assignees: ['Regina Cooper'],
      statusBar: ['bg-purple-400'],
    },
    {
      id: 'todo-5',
      title: 'Icon Set Update',
      description: 'Refresh the icon library for dashboard navigation.',
      date: 'Jun 16',
      attachments: 0,
      comments: 4,
      assignees: ['Judith Black', 'Dustin Williamson'],
      statusBar: ['bg-orange-400'],
    },
    {
      id: 'todo-6',
      title: 'Landing Page Copy',
      description: 'Draft hero section copy for the product launch.',
      date: 'Jun 15',
      attachments: 0,
      comments: 3,
      assignees: ['Jane Wilson'],
      statusBar: ['bg-teal-400'],
    },
    {
      id: 'todo-7',
      title: 'Mobile Navigation',
      description: 'Design collapsed navigation for smaller breakpoints.',
      date: 'Jun 15',
      attachments: 2,
      comments: 1,
      assignees: ['Ronald Robertson'],
      statusBar: ['bg-indigo-400'],
    },
    {
      id: 'todo-8',
      title: 'Footer Redesign',
      description: 'Update footer links and newsletter signup block.',
      date: 'Jun 14',
      attachments: 0,
      comments: 2,
      assignees: ['Calvin Flores'],
      statusBar: ['bg-pink-400'],
    },
  ],
  inProgress: [
    {
      id: 'progress-1',
      title: 'Updating Modules',
      description: 'Step-by-step update of modules.',
      date: 'Jun 17',
      attachments: 2,
      comments: 5,
      assignees: ['Calvin Flores', 'Robert Edwards'],
      progress: 50,
      subtaskCount: 4,
      statusBar: ['bg-brand-dark', 'bg-brand-dark'],
    },
    {
      id: 'progress-2',
      title: 'Template Progress',
      description: 'Designing cool UI design templates.',
      date: 'Jun 17',
      attachments: 2,
      comments: 5,
      assignees: ['Nathan Fox', 'Colleen Warren'],
      progress: 75,
      subtaskCount: 4,
      statusBar: ['bg-brand-dark'],
      subtasks: [
        { id: 'sub-1', label: 'Inbox Template', done: true },
        { id: 'sub-2', label: 'Chat Template', done: true },
        { id: 'sub-3', label: 'Tasks Template', done: true },
        { id: 'sub-4', label: 'Projects Template', done: false },
      ],
    },
    {
      id: 'progress-3',
      title: 'Dashboard Charts',
      description: 'Implement analytics widgets for overview page.',
      date: 'Jun 16',
      attachments: 1,
      comments: 3,
      assignees: ['Brandon Pena'],
      progress: 30,
      subtaskCount: 3,
      statusBar: ['bg-indigo-400'],
    },
    {
      id: 'progress-4',
      title: 'Auth Screens',
      description: 'Design login, signup, and reset password flows.',
      date: 'Jun 15',
      attachments: 0,
      comments: 6,
      assignees: ['Jacob Hawkins', 'Shane Black'],
      progress: 20,
      subtaskCount: 5,
      statusBar: ['bg-pink-400'],
    },
    {
      id: 'progress-5',
      title: 'Notification Panel',
      description: 'Build dropdown notification list in the header.',
      date: 'Jun 14',
      attachments: 2,
      comments: 4,
      assignees: ['Nathan Fox'],
      progress: 65,
      subtaskCount: 2,
      statusBar: ['bg-orange-400'],
    },
  ],
  completed: [
    {
      id: 'done-1',
      title: 'Refresh Photo Slider',
      description: '',
      date: 'Jun 17',
      attachments: 3,
      comments: 2,
      assignees: ['Brandon Pena', 'Regina Cooper'],
      gallery: ['sunset', 'coast', 'city'],
      statusBar: ['bg-brand-dark', 'bg-brand-dark'],
    },
    {
      id: 'done-2',
      title: 'Server Startup',
      description: 'Running the server in test mode and configuring.',
      date: 'Jun 17',
      attachments: 0,
      comments: 17,
      assignees: ['Jacob Hawkins', 'Shane Black'],
      labels: ['frontend', 'backend'],
      statusBar: ['bg-sky-400'],
    },
    {
      id: 'done-3',
      title: 'New Background',
      description: '',
      date: 'Jun 17',
      attachments: 1,
      comments: 2,
      assignees: ['Regina Cooper'],
      coverImage: 'forest',
      statusBar: ['bg-teal-400'],
    },
    {
      id: 'done-4',
      title: 'Profile Settings',
      description: 'Completed settings panel with avatar upload.',
      date: 'Jun 16',
      attachments: 1,
      comments: 4,
      assignees: ['Judith Black'],
      statusBar: ['bg-purple-400'],
    },
    {
      id: 'done-5',
      title: 'Sidebar Icons',
      description: 'Updated icon set across the main navigation.',
      date: 'Jun 16',
      attachments: 0,
      comments: 2,
      assignees: ['Dustin Williamson', 'Jane Wilson'],
      statusBar: ['bg-yellow-400'],
    },
    {
      id: 'done-6',
      title: 'Table Pagination',
      description: 'Shipped reusable pagination for data tables.',
      date: 'Jun 15',
      attachments: 1,
      comments: 5,
      assignees: ['Regina Cooper'],
      statusBar: ['bg-orange-400'],
    },
    {
      id: 'done-7',
      title: 'Filter Popover',
      description: 'Added advanced filters to ecommerce pages.',
      date: 'Jun 15',
      attachments: 0,
      comments: 3,
      assignees: ['Robert Edwards'],
      statusBar: ['bg-pink-400'],
    },
    {
      id: 'done-8',
      title: 'Mail Layout',
      description: 'Built full-width mail client with compose view.',
      date: 'Jun 14',
      attachments: 2,
      comments: 8,
      assignees: ['Colleen Warren', 'Calvin Flores'],
      statusBar: ['bg-indigo-400'],
    },
    {
      id: 'done-9',
      title: 'Calendar Events',
      description: 'Interactive month view with event management.',
      date: 'Jun 14',
      attachments: 0,
      comments: 6,
      assignees: ['Nathan Fox'],
      statusBar: ['bg-red-400'],
    },
  ],
}

const imageStyles = {
  mountain: 'bg-gradient-to-br from-orange-400 via-red-400 to-amber-600',
  forest: 'bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-800',
  sunset: 'bg-gradient-to-br from-orange-300 via-rose-300 to-violet-400',
  coast: 'bg-gradient-to-br from-lime-300 via-emerald-400 to-green-600',
  city: 'bg-gradient-to-br from-fuchsia-300 via-violet-400 to-indigo-500',
}

const labelOptions = [
  { id: 'design', label: 'Design', className: 'bg-brand-dark text-white' },
  { id: 'frontend', label: 'Frontend', className: 'bg-brand-teal text-white' },
  { id: 'backend', label: 'Backend', className: 'bg-[#F08B7B] text-white' },
]

const dueDateOptions = [
  { id: 'anytime', label: 'Due anytime' },
  { id: 'today', label: 'Due today' },
  { id: 'week', label: 'Due this week' },
  { id: 'overdue', label: 'Overdue' },
]

const statusOptions = [
  { id: 'any', label: 'Any status' },
  { id: 'todo', label: 'To Do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
]

const defaultFilters = {
  search: '',
  labels: ['frontend'],
  members: ['Shane Black'],
  dueDate: 'anytime',
  status: 'completed',
}

function getTaskLabels(task) {
  if (task.labels) {
    return task.labels
  }

  const title = task.title.toLowerCase()
  if (title.includes('server') || title.includes('startup')) {
    return ['backend']
  }

  if (title.includes('module') || title.includes('template') || title.includes('dashboard') || title.includes('auth')) {
    return ['frontend']
  }

  return ['design']
}

function taskMatchesFilters(task, columnId, filters) {
  const query = filters.search.trim().toLowerCase()
  if (query && !task.title.toLowerCase().includes(query) && !task.description?.toLowerCase().includes(query)) {
    return false
  }

  if (filters.labels.length > 0) {
    const taskLabels = getTaskLabels(task)
    if (!filters.labels.some((label) => taskLabels.includes(label))) {
      return false
    }
  }

  if (filters.members.length > 0 && !task.assignees.some((member) => filters.members.includes(member))) {
    return false
  }

  if (filters.status !== 'any' && filters.status !== columnId) {
    return false
  }

  return true
}

function filterColumnTasks(columnTasks, columnId, filters) {
  return columnTasks.filter((task) => taskMatchesFilters(task, columnId, filters))
}

export default function Task() {
  const [activeProjectId, setActiveProjectId] = useState('design-plans')
  const [projectOpen, setProjectOpen] = useState(false)
  const [projectQuery, setProjectQuery] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters)
  const [draftFilters, setDraftFilters] = useState(defaultFilters)
  const [tasks, setTasks] = useState(initialTasks)
  const [columnAccents, setColumnAccents] = useState(defaultColumnAccents)
  const [openColumnMenu, setOpenColumnMenu] = useState(null)
  const [draggingId, setDraggingId] = useState(null)
  const [dropColumn, setDropColumn] = useState(null)
  const [newTaskColumn, setNewTaskColumn] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const activeProject = projectList.find((project) => project.id === activeProjectId)?.name || 'Design Plans'

  const filteredProjects = useMemo(() => {
    const query = projectQuery.trim().toLowerCase()
    if (!query) {
      return projectList
    }

    return projectList.filter((project) => project.name.toLowerCase().includes(query))
  }, [projectQuery])

  const visibleTasks = useMemo(
    () => ({
      todo: filterColumnTasks(tasks.todo, 'todo', appliedFilters),
      inProgress: filterColumnTasks(tasks.inProgress, 'inProgress', appliedFilters),
      completed: filterColumnTasks(tasks.completed, 'completed', appliedFilters),
    }),
    [tasks, appliedFilters],
  )

  const memberOptions = useMemo(() => {
    const members = new Set()
    Object.values(tasks).forEach((columnTasks) => {
      columnTasks.forEach((task) => {
        task.assignees.forEach((member) => members.add(member))
      })
    })

    return [...members].sort()
  }, [tasks])

  const counts = useMemo(
    () => ({
      todo: visibleTasks.todo.length,
      inProgress: visibleTasks.inProgress.length,
      completed: visibleTasks.completed.length,
    }),
    [visibleTasks],
  )

  const moveTask = (taskId, fromColumn, toColumn) => {
    if (fromColumn === toColumn) {
      return
    }

    setTasks((current) => {
      const task = current[fromColumn].find((item) => item.id === taskId)
      if (!task) {
        return current
      }

      return {
        ...current,
        [fromColumn]: current[fromColumn].filter((item) => item.id !== taskId),
        [toColumn]: [...current[toColumn], task],
      }
    })
  }

  const addTask = (columnId, title) => {
    const trimmed = title.trim()
    if (!trimmed) {
      return
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: trimmed,
      description: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      attachments: 0,
      comments: 0,
      assignees: ['ArtTemplate'],
      statusBar: ['bg-brand-dark'],
    }

    setTasks((current) => ({
      ...current,
      [columnId]: [...current[columnId], newTask],
    }))
    setNewTaskTitle('')
    setNewTaskColumn(null)
    setAddOpen(false)
  }

  const toggleSubtask = (columnId, taskId, subtaskId) => {
    setTasks((current) => ({
      ...current,
      [columnId]: current[columnId].map((task) => {
        if (task.id !== taskId || !task.subtasks) {
          return task
        }

        const subtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, done: !subtask.done } : subtask,
        )
        const completedCount = subtasks.filter((subtask) => subtask.done).length
        const progress = Math.round((completedCount / subtasks.length) * 100)

        return { ...task, subtasks, progress }
      }),
    }))
  }

  const completeColumnTasks = (columnId) => {
    if (columnId === 'completed') {
      return
    }

    setTasks((current) => ({
      ...current,
      [columnId]: [],
      completed: [...current.completed, ...current[columnId]],
    }))
    setOpenColumnMenu(null)
  }

  const deleteColumnTasks = (columnId) => {
    setTasks((current) => ({
      ...current,
      [columnId]: [],
    }))
    setOpenColumnMenu(null)
  }

  const handleDrop = (columnId) => {
    if (!draggingId) {
      return
    }

    const fromColumn = Object.keys(tasks).find((key) => tasks[key].some((task) => task.id === draggingId))
    if (fromColumn) {
      moveTask(draggingId, fromColumn, columnId)
    }

    setDraggingId(null)
    setDropColumn(null)
  }

  const handleAddMenuSelect = (itemId) => {
    setAddOpen(false)
    if (itemId === 'task') {
      setNewTaskColumn('todo')
    }
  }

  const openFilterPanel = () => {
    setDraftFilters(appliedFilters)
    setFilterOpen(true)
    setProjectOpen(false)
    setAddOpen(false)
  }

  const applyFilters = () => {
    setAppliedFilters(draftFilters)
    setFilterOpen(false)
  }

  const resetFilters = () => {
    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-4 md:p-6">
      {(projectOpen || addOpen || openColumnMenu) && (
        <button
          className="fixed inset-0 z-10 cursor-default"
          aria-label="Close menus"
          onClick={() => {
            setProjectOpen(false)
            setAddOpen(false)
            setOpenColumnMenu(null)
          }}
        />
      )}

      {filterOpen ? (
        <>
          <button className="fixed inset-0 z-30 bg-ink-900/40" aria-label="Close filter panel" onClick={() => setFilterOpen(false)} />
          <FilterPanel
            filters={draftFilters}
            memberOptions={memberOptions}
            onChange={setDraftFilters}
            onClose={() => setFilterOpen(false)}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </>
      ) : null}

      <div className="relative z-20 mb-4 flex shrink-0 flex-col gap-4 md:mb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative">
          <button
            className="flex items-center gap-2 text-2xl font-semibold text-ink-900"
            onClick={() => {
              setProjectOpen((open) => !open)
              setAddOpen(false)
              setFilterOpen(false)
            }}
          >
            {activeProject}
            <ChevronDown size={20} className="text-ink-400" />
          </button>
          {projectOpen ? <ProjectsDropdown projects={filteredProjects} activeProjectId={activeProjectId} query={projectQuery} onQueryChange={setProjectQuery} onSelect={(id) => { setActiveProjectId(id); setProjectOpen(false); setProjectQuery('') }} /> : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 ${
                filterOpen ? 'bg-ink-50 text-ink-700' : 'text-ink-500 hover:bg-ink-50'
              }`}
              onClick={openFilterPanel}
              aria-label="Filter tasks"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-green"
              onClick={() => {
                setAddOpen((open) => !open)
                setProjectOpen(false)
                setFilterOpen(false)
              }}
            >
              Add
              <ChevronDown size={14} />
            </button>
            {addOpen ? <AddDropdown onSelect={handleAddMenuSelect} /> : null}
          </div>
        </div>
      </div>

      <div className="relative z-0 flex min-h-0 flex-1 gap-4 overflow-x-auto overflow-y-hidden pb-1">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            accent={columnAccents[column.id]}
            tasks={visibleTasks[column.id]}
            count={counts[column.id]}
            isDropTarget={dropColumn === column.id}
            menuOpen={openColumnMenu === column.id}
            onMenuToggle={() => setOpenColumnMenu((current) => (current === column.id ? null : column.id))}
            onColorSelect={(color) => {
              setColumnAccents((current) => ({ ...current, [column.id]: color }))
              setOpenColumnMenu(null)
            }}
            onCompleteTasks={() => completeColumnTasks(column.id)}
            onDeleteTasks={() => deleteColumnTasks(column.id)}
            onDragStart={setDraggingId}
            onDragEnd={() => {
              setDraggingId(null)
              setDropColumn(null)
            }}
            onDragEnter={() => setDropColumn(column.id)}
            onDrop={() => handleDrop(column.id)}
            onToggleSubtask={(taskId, subtaskId) => toggleSubtask(column.id, taskId, subtaskId)}
            onAddCard={() => setNewTaskColumn(column.id)}
          />
        ))}
      </div>

      {newTaskColumn ? (
        <AddTaskModal
          title={newTaskTitle}
          onTitleChange={setNewTaskTitle}
          onClose={() => {
            setNewTaskColumn(null)
            setNewTaskTitle('')
          }}
          onSave={() => addTask(newTaskColumn, newTaskTitle)}
        />
      ) : null}
    </div>
  )
}

function ProjectsDropdown({ projects, activeProjectId, query, onQueryChange, onSelect }) {
  return (
    <div className="absolute left-0 top-12 z-30 w-[min(100vw-2rem,300px)] rounded-xl2 border border-ink-100 bg-white p-5 shadow-2xl">
      <h3 className="text-lg font-semibold text-ink-900">Projects</h3>
      <div className="relative mt-4">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search Project..."
          className="h-11 w-full rounded-xl border border-ink-100 bg-ink-50 pl-10 pr-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
        />
      </div>
      <ul className="mt-3 max-h-56 overflow-y-auto">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm hover:bg-ink-50 ${
                project.id === activeProjectId ? 'font-medium text-ink-900' : 'text-ink-600'
              }`}
              onClick={() => onSelect(project.id)}
            >
              <Layers size={16} className="text-ink-400" />
              <span className="flex-1">{project.name}</span>
              {project.id === activeProjectId ? <Check size={16} className="text-brand-dark" /> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AddDropdown({ onSelect }) {
  return (
    <div className="absolute right-0 top-12 z-30 w-52 overflow-hidden rounded-xl border border-ink-100 bg-white py-2 shadow-2xl">
      {addMenuItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50"
            onClick={() => onSelect(item.id)}
          >
            <Icon size={16} className="text-ink-400" />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function KanbanColumn({
  column,
  accent,
  tasks,
  count,
  isDropTarget,
  menuOpen,
  onMenuToggle,
  onColorSelect,
  onCompleteTasks,
  onDeleteTasks,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDrop,
  onToggleSubtask,
  onAddCard,
}) {
  return (
    <section
      className={`relative flex h-full min-h-0 min-w-[300px] flex-1 flex-col rounded-xl2 bg-white shadow-card ${
        isDropTarget ? 'ring-2 ring-brand-dark/30' : ''
      }`}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
    >
      <div className={`h-1 rounded-t-xl2 ${accent}`} />
      <div className="relative flex items-center justify-between border-b border-ink-100 px-4 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-400">{column.title}</h2>
          <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-500">{count}</span>
        </div>
        <button
          className={`rounded-lg p-1.5 ${menuOpen ? 'bg-ink-50 text-ink-700' : 'text-ink-400 hover:bg-ink-50 hover:text-ink-700'}`}
          onClick={onMenuToggle}
          aria-label={`${column.title} options`}
        >
          <MoreHorizontal size={16} />
        </button>
        {menuOpen ? (
          <ColumnMenu
            accent={accent}
            onColorSelect={onColorSelect}
            onCompleteTasks={onCompleteTasks}
            onDeleteTasks={onDeleteTasks}
          />
        ) : null}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={() => onDragStart(task.id)}
            onDragEnd={onDragEnd}
            onToggleSubtask={(subtaskId) => onToggleSubtask(task.id, subtaskId)}
          />
        ))}
      </div>

      <div className="flex justify-center pb-4 pt-1">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15 text-brand-dark hover:bg-brand-green/25"
          onClick={onAddCard}
          aria-label={`Add card to ${column.title}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </section>
  )
}

function ColumnMenu({ accent, onColorSelect, onCompleteTasks, onDeleteTasks }) {
  return (
    <div className="absolute right-3 top-14 z-30 w-56 rounded-xl border border-ink-100 bg-white py-2 shadow-2xl">
      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50">
        <Move size={16} className="text-ink-400" />
        Move
      </button>
      <button className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50">
        <span className="flex items-center gap-3">
          <ArrowUpDown size={16} className="text-ink-400" />
          Sort Tasks
        </span>
        <ChevronRight size={14} className="text-ink-300" />
      </button>

      <div className="my-2 border-t border-ink-100" />

      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50" onClick={onCompleteTasks}>
        <Check size={16} className="text-ink-400" />
        Complete Tasks
      </button>
      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50">
        <Archive size={16} className="text-ink-400" />
        Archive Tasks
      </button>

      <div className="my-2 border-t border-ink-100" />

      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50" onClick={onDeleteTasks}>
        <Trash2 size={16} />
        Delete Tasks
      </button>

      <div className="border-t border-ink-100 px-4 py-3">
        <div className="grid grid-cols-5 gap-2">
          {columnColorOptions.map((color) => (
            <button
              key={color}
              className={`relative flex h-6 w-6 items-center justify-center rounded-full ${color}`}
              onClick={() => onColorSelect(color)}
              aria-label="Change column color"
            >
              {accent === color ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task, onDragStart, onDragEnd, onToggleSubtask }) {
  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="cursor-grab rounded-xl border border-ink-100 bg-white p-4 shadow-card active:cursor-grabbing"
    >
      {task.statusBar ? (
        <div className="mb-3 flex gap-1">
          {task.statusBar.map((color, index) => (
            <div key={`${task.id}-bar-${index}`} className={`h-1 flex-1 rounded-full ${color}`} />
          ))}
        </div>
      ) : null}

      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink-900">{task.title}</h3>
        <span className="flex shrink-0 items-center gap-1 text-xs text-ink-400">
          <CalendarDays size={12} />
          {task.date}
        </span>
      </div>

      {task.coverImage ? (
        <div className={`mb-3 h-32 overflow-hidden rounded-lg ${imageStyles[task.coverImage]}`} />
      ) : null}

      {task.gallery ? (
        <div className="mb-3 grid grid-cols-3 gap-2">
          {task.gallery.map((image) => (
            <div key={image} className={`h-16 rounded-lg ${imageStyles[image]}`} />
          ))}
        </div>
      ) : null}

      {task.description ? <p className="mb-3 text-sm leading-6 text-ink-500">{task.description}</p> : null}

      {typeof task.progress === 'number' ? (
        <div className="mb-3">
          <div className="mb-2 flex items-center justify-between text-xs text-ink-400">
            <span>SUB-TASKS: {task.subtaskCount}</span>
            <span className="font-semibold text-brand-dark">{task.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-dark transition-all" style={{ width: `${task.progress}%` }} />
          </div>
        </div>
      ) : null}

      {task.subtasks ? (
        <ul className="mb-3 space-y-2">
          {task.subtasks.map((subtask) => (
            <li key={subtask.id}>
              <button
                type="button"
                className="flex w-full items-center gap-2 text-left text-sm text-ink-600"
                onClick={() => onToggleSubtask(subtask.id)}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    subtask.done ? 'border-brand-dark bg-brand-dark text-white' : 'border-ink-200 bg-white'
                  }`}
                >
                  {subtask.done ? <Check size={10} /> : null}
                </span>
                <span className={subtask.done ? 'text-ink-400 line-through' : ''}>{subtask.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-ink-400">
          {task.attachments > 0 ? (
            <span className="flex items-center gap-1 text-xs">
              <Paperclip size={13} />
              {task.attachments}
            </span>
          ) : null}
          {task.comments > 0 ? (
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare size={13} />
              {task.comments}
            </span>
          ) : null}
        </div>

        <div className="flex -space-x-2">
          {task.assignees.map((assignee) => (
            <Avatar key={assignee} name={assignee} />
          ))}
        </div>
      </div>
    </article>
  )
}

function FilterPanel({ filters, memberOptions, onChange, onClose, onApply, onReset }) {
  const [memberQuery, setMemberQuery] = useState('')
  const [dueDateOpen, setDueDateOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  const updateFilters = (patch) => {
    onChange((current) => ({ ...current, ...patch }))
  }

  const toggleLabel = (labelId) => {
    onChange((current) => {
      const labels = current.labels.includes(labelId)
        ? current.labels.filter((label) => label !== labelId)
        : [...current.labels, labelId]

      return { ...current, labels }
    })
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
    (member) =>
      member.toLowerCase().includes(memberQuery.toLowerCase()) && !filters.members.includes(member),
  )

  const selectedDueDate = dueDateOptions.find((option) => option.id === filters.dueDate) || dueDateOptions[0]
  const selectedStatus = statusOptions.find((option) => option.id === filters.status) || statusOptions[0]

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
            placeholder="Search Tasks..."
            className="h-12 w-full rounded-xl border border-ink-100 bg-white pl-11 pr-4 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
          />
        </div>

        <FilterSection label="Labels">
          <div className="flex flex-wrap gap-2">
            {labelOptions.map((label) => {
              const isSelected = filters.labels.includes(label.id)
              return (
                <button
                  key={label.id}
                  type="button"
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-opacity ${label.className} ${
                    isSelected ? 'opacity-100 ring-2 ring-white ring-offset-1' : 'opacity-90 hover:opacity-100'
                  }`}
                  onClick={() => toggleLabel(label.id)}
                >
                  {label.label}
                  {isSelected ? <Check size={14} /> : null}
                </button>
              )
            })}
          </div>
        </FilterSection>

        <FilterSection label="Members">
          <div className="rounded-xl border border-ink-100 p-3">
            <div className="flex flex-wrap gap-2">
              {filters.members.map((member) => (
                <span
                  key={member}
                  className="inline-flex items-center gap-2 rounded-lg bg-ink-50 px-2 py-1.5 text-sm text-ink-700"
                >
                  <Avatar name={member} size="xs" />
                  {member}
                  <button type="button" className="text-ink-400 hover:text-ink-700" onClick={() => removeMember(member)} aria-label={`Remove ${member}`}>
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
                      <Avatar name={member} size="xs" />
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
                <CalendarDays size={16} className="text-ink-400" />
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
                {statusOptions.map((option) => (
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

function AddTaskModal({ title, onTitleChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-ink-900/40" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-md rounded-xl2 bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-ink-900">Add Task</h2>
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Task title"
          className="mt-4 h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
          autoFocus
        />
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-500 hover:bg-ink-50" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-xl bg-brand-dark px-4 py-2 text-sm font-medium text-white hover:bg-brand-green" onClick={onSave}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}

function Avatar({ name, size = 'md' }) {
  const sizes = {
    xs: 'h-6 w-6 text-[8px]',
    md: 'h-7 w-7 text-[9px]',
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#E98B70] to-[#C65E43] font-semibold text-white ${sizes[size] || sizes.md}`}
      title={name}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}
