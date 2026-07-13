import { useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  SlidersHorizontal,
} from 'lucide-react'

const projects = ['Design Plan', 'Development Sprint', 'Marketing Launch']

const columns = [
  { id: 'todo', title: 'TODO', accent: 'bg-yellow-400' },
  { id: 'inProgress', title: 'IN PROGRESS', accent: 'bg-sky-400' },
  { id: 'completed', title: 'COMPLETED', accent: 'bg-brand-dark' },
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
    },
    {
      id: 'todo-3',
      title: 'Wireframe for App',
      description: 'Make a wramework for an app for a pre-presentation.',
      date: 'Jun 17',
      attachments: 0,
      comments: 1,
      assignees: ['Jane Wilson', 'Ronald Robertson'],
    },
    {
      id: 'todo-4',
      title: 'Color Palette Review',
      description: 'Review brand colors for the new marketing site.',
      date: 'Jun 16',
      attachments: 1,
      comments: 2,
      assignees: ['Regina Cooper'],
    },
    {
      id: 'todo-5',
      title: 'Icon Set Update',
      description: 'Refresh the icon library for dashboard navigation.',
      date: 'Jun 16',
      attachments: 0,
      comments: 4,
      assignees: ['Judith Black', 'Dustin Williamson'],
    },
    {
      id: 'todo-6',
      title: 'Landing Page Copy',
      description: 'Draft hero section copy for the product launch.',
      date: 'Jun 15',
      attachments: 0,
      comments: 3,
      assignees: ['Jane Wilson'],
    },
    {
      id: 'todo-7',
      title: 'Mobile Navigation',
      description: 'Design collapsed navigation for smaller breakpoints.',
      date: 'Jun 15',
      attachments: 2,
      comments: 1,
      assignees: ['Ronald Robertson'],
    },
    {
      id: 'todo-8',
      title: 'Footer Redesign',
      description: 'Update footer links and newsletter signup block.',
      date: 'Jun 14',
      attachments: 0,
      comments: 2,
      assignees: ['Calvin Flores'],
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
      assignees: ['Brandon Pena'],
      gallery: ['sunset', 'coast', 'city'],
    },
    {
      id: 'done-2',
      title: 'Server Startup',
      description: 'Running the server in test mode and configuring.',
      date: 'Jun 17',
      attachments: 0,
      comments: 17,
      assignees: ['Jacob Hawkins', 'Shane Black'],
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
    },
    {
      id: 'done-4',
      title: 'Profile Settings',
      description: 'Completed settings panel with avatar upload.',
      date: 'Jun 16',
      attachments: 1,
      comments: 4,
      assignees: ['Judith Black'],
    },
    {
      id: 'done-5',
      title: 'Sidebar Icons',
      description: 'Updated icon set across the main navigation.',
      date: 'Jun 16',
      attachments: 0,
      comments: 2,
      assignees: ['Dustin Williamson', 'Jane Wilson'],
    },
    {
      id: 'done-6',
      title: 'Table Pagination',
      description: 'Shipped reusable pagination for data tables.',
      date: 'Jun 15',
      attachments: 1,
      comments: 5,
      assignees: ['Regina Cooper'],
    },
    {
      id: 'done-7',
      title: 'Filter Popover',
      description: 'Added advanced filters to ecommerce pages.',
      date: 'Jun 15',
      attachments: 0,
      comments: 3,
      assignees: ['Robert Edwards'],
    },
    {
      id: 'done-8',
      title: 'Mail Layout',
      description: 'Built full-width mail client with compose view.',
      date: 'Jun 14',
      attachments: 2,
      comments: 8,
      assignees: ['Colleen Warren', 'Calvin Flores'],
    },
    {
      id: 'done-9',
      title: 'Calendar Events',
      description: 'Interactive month view with event management.',
      date: 'Jun 14',
      attachments: 0,
      comments: 6,
      assignees: ['Nathan Fox'],
    },
  ],
}

const imageStyles = {
  mountain: 'bg-gradient-to-br from-sky-300 via-indigo-300 to-slate-500',
  forest: 'bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-800',
  sunset: 'bg-gradient-to-br from-orange-300 via-rose-300 to-violet-400',
  coast: 'bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500',
  city: 'bg-gradient-to-br from-slate-400 via-zinc-500 to-slate-700',
}

export default function Task() {
  const [activeProject, setActiveProject] = useState('Design Plan')
  const [projectOpen, setProjectOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)
  const [draggingId, setDraggingId] = useState(null)
  const [dropColumn, setDropColumn] = useState(null)
  const [newTaskColumn, setNewTaskColumn] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const counts = useMemo(
    () => ({
      todo: tasks.todo.length,
      inProgress: tasks.inProgress.length,
      completed: tasks.completed.length,
    }),
    [tasks],
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

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative">
          <button
            className="flex items-center gap-2 text-2xl font-semibold text-ink-900"
            onClick={() => setProjectOpen((open) => !open)}
          >
            {activeProject}
            <ChevronDown size={20} className="text-ink-400" />
          </button>
          {projectOpen ? (
            <div className="absolute left-0 top-11 z-20 min-w-[220px] overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
              {projects.map((project) => (
                <button
                  key={project}
                  className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                    project === activeProject ? 'font-medium text-brand-dark' : 'text-ink-600'
                  }`}
                  onClick={() => {
                    setActiveProject(project)
                    setProjectOpen(false)
                  }}
                >
                  {project}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 ${
                filterOpen ? 'bg-ink-50 text-ink-700' : 'text-ink-500 hover:bg-ink-50'
              }`}
              onClick={() => setFilterOpen((open) => !open)}
              aria-label="Filter tasks"
            >
              <SlidersHorizontal size={18} />
            </button>
            {filterOpen ? (
              <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-ink-100 bg-white p-4 shadow-card">
                <p className="mb-3 text-sm font-medium text-ink-700">Show columns</p>
                {columns.map((column) => (
                  <label key={column.id} className="flex items-center gap-2 py-1.5 text-sm text-ink-500">
                    <input type="checkbox" defaultChecked className="accent-brand-dark" />
                    {column.title}
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-green"
              onClick={() => setAddOpen((open) => !open)}
            >
              Add
              <ChevronDown size={14} />
            </button>
            {addOpen ? (
              <div className="absolute right-0 top-12 z-20 w-48 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
                {columns.map((column) => (
                  <button
                    key={column.id}
                    className="block w-full px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50"
                    onClick={() => {
                      setNewTaskColumn(column.id)
                      setAddOpen(false)
                    }}
                  >
                    Add to {column.title}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-4 overflow-x-auto pb-2">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks[column.id]}
            count={counts[column.id]}
            isDropTarget={dropColumn === column.id}
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

function KanbanColumn({
  column,
  tasks,
  count,
  isDropTarget,
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDrop,
  onToggleSubtask,
  onAddCard,
}) {
  return (
    <section
      className={`flex w-[min(100%,340px)] shrink-0 flex-col rounded-xl2 bg-white shadow-card ${
        isDropTarget ? 'ring-2 ring-brand-dark/30' : ''
      }`}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
    >
      <div className={`h-1 rounded-t-xl2 ${column.accent}`} />
      <div className="flex items-center justify-between border-b border-ink-100 px-4 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-400">{column.title}</h2>
          <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-500">{count}</span>
        </div>
        <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700" aria-label={`${column.title} options`}>
          <MoreHorizontal size={16} />
        </button>
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

      <button
        className="m-3 flex h-10 items-center justify-center rounded-xl border border-dashed border-ink-200 text-ink-400 hover:border-brand-dark hover:text-brand-dark"
        onClick={onAddCard}
        aria-label={`Add card to ${column.title}`}
      >
        <Plus size={18} />
      </button>
    </section>
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
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink-900">{task.title}</h3>
        <span className="shrink-0 text-xs text-ink-400">{task.date}</span>
      </div>

      {task.coverImage ? (
        <div className={`mb-3 h-28 overflow-hidden rounded-lg ${imageStyles[task.coverImage]}`} />
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
            <span>Sub-Tasks: {task.subtaskCount}</span>
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

function Avatar({ name }) {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#E98B70] to-[#C65E43] text-[9px] font-semibold text-white"
      title={name}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}
