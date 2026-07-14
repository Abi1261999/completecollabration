import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  DollarSign,
  Download,
  FileArchive,
  FileText,
  GripVertical,
  Image as ImageIcon,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Smile,
  Trash2,
} from 'lucide-react'
import BrandLogo from '../components/BrandLogo'

const imageStyles = {
  sunset: 'bg-gradient-to-br from-orange-300 via-rose-300 to-violet-400',
  coast: 'bg-gradient-to-br from-lime-300 via-emerald-400 to-green-600',
  city: 'bg-gradient-to-br from-fuchsia-300 via-violet-400 to-indigo-500',
}

const MEMBER_ROLES = {
  'Jacob Hawkins': 'UI/UX Designer',
  'Jane Wilson': 'Project Manager',
  'Regina Cooper': 'Developer',
  'Shane Black': 'Team Lead',
  'Ronald Robertson': 'Backend Developer',
  'Judith Black': 'QA Engineer',
  'Calvin Flores': 'Product Owner',
}

const detailStatusOptions = [
  { id: 'Started', label: 'Started', dot: 'bg-amber-400' },
  { id: 'On Hold', label: 'On Hold', dot: 'bg-brand-teal' },
  { id: 'Completed', label: 'Completed', dot: 'bg-brand-green' },
]

const defaultChecklist = [
  { id: 'cl-1', label: 'Create wireframes', done: true },
  { id: 'cl-2', label: 'Layout design', done: true },
  { id: 'cl-3', label: 'UI / UX design development', done: true },
  { id: 'cl-4', label: 'Functional programming', done: false },
  { id: 'cl-5', label: 'Testing for possible errors', done: false },
  { id: 'cl-6', label: 'Final debugging applications', done: false },
]

const defaultComments = [
  {
    id: 'cm-1',
    author: 'Jane Wilson',
    time: '5 min ago',
    text: 'Hi Cody, any progress on the project? 🧐',
  },
  {
    id: 'cm-2',
    author: 'Jacob Hawkins',
    time: '1 day ago',
    text: 'Hi Jane! Yes. I just finished developing the "Chat" template.',
    images: ['sunset', 'coast', 'city'],
    moreImages: 3,
  },
  {
    id: 'cm-3',
    author: 'Regina Cooper',
    time: '5 min ago',
    text: 'Hi Jacob. Will you be able to finish the last item of the task by tomorrow?',
  },
]

const defaultFiles = [
  { id: 'fl-1', name: 'Attachment.zip', size: '4.2 MB', type: 'zip' },
  { id: 'fl-2', name: 'Brief.pdf', size: '1.1 MB', type: 'pdf' },
  { id: 'fl-3', name: 'Design.fig', size: '8.4 MB', type: 'figma' },
  { id: 'fl-4', name: 'Screenshot.png', size: '620 KB', type: 'image', thumb: 'sunset' },
]

const longDescriptions = {
  1: 'The plan for the development of a React Native application project. It should be a ready-to-use application for Android and iOS mobile devices with about 30 screens, including login, registration, maps, history, and API integration.',
}

export function getProjectDetail(project) {
  return {
    budget: project.budget || '2.500.000',
    startDateLabel: project.startDateLabel || '17 Jun, 2020',
    endDateLabel: project.endDateLabel || '04 Jul, 2020',
    longDescription:
      longDescriptions[project.id] ||
      project.description ||
      'No extended description is available for this project yet.',
    checklist: project.checklist || defaultChecklist,
    comments: project.comments || defaultComments,
    files: project.files || defaultFiles,
    teamMembers: project.members.map((name) => ({
      name,
      role: MEMBER_ROLES[name] || 'Team Member',
    })),
  }
}

export default function ProjectDetailsView({ projects, selectedProject, onSelectProject, onClose, onUpdateProject }) {
  const detail = useMemo(() => getProjectDetail(selectedProject), [selectedProject])
  const [sidebarQuery, setSidebarQuery] = useState('')
  const [statusOpen, setStatusOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('comments')
  const [commentDraft, setCommentDraft] = useState('')
  const [checklist, setChecklist] = useState(detail.checklist)
  const [comments, setComments] = useState(detail.comments)
  const [hoveredChecklistId, setHoveredChecklistId] = useState(null)

  useEffect(() => {
    const nextDetail = getProjectDetail(selectedProject)
    setChecklist(nextDetail.checklist)
    setComments(nextDetail.comments)
    setActiveTab('comments')
    setCommentDraft('')
    setStatusOpen(false)
  }, [selectedProject.id])

  const sidebarProjects = useMemo(() => {
    const normalized = sidebarQuery.trim().toLowerCase()
    if (!normalized) return projects
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(normalized) || project.company.toLowerCase().includes(normalized),
    )
  }, [projects, sidebarQuery])

  const checklistProgress = useMemo(() => {
    if (checklist.length === 0) return 0
    return Math.round((checklist.filter((item) => item.done).length / checklist.length) * 100)
  }, [checklist])

  const toggleChecklistItem = (itemId) => {
    setChecklist((current) => {
      const next = current.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item))
      const progress = Math.round((next.filter((item) => item.done).length / next.length) * 100)
      onUpdateProject(selectedProject.id, { progress, checklist: next })
      return next
    })
  }

  const handleAddComment = () => {
    const text = commentDraft.trim()
    if (!text) return

    setComments((current) => [
      ...current,
      {
        id: `cm-${Date.now()}`,
        author: 'ArtTemplate',
        time: 'Just now',
        text,
      },
    ])
    setCommentDraft('')
  }

  const handleStatusChange = (status) => {
    onUpdateProject(selectedProject.id, {
      status,
      progress: status === 'Completed' ? 100 : selectedProject.progress,
    })
    setStatusOpen(false)
  }

  const selectedStatus = detailStatusOptions.find((option) => option.id === selectedProject.status) || detailStatusOptions[0]

  return (
    <div className="flex h-full min-h-0 flex-col bg-white lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-ink-100 lg:h-full lg:w-72 lg:border-b-0 lg:border-r xl:w-80">
        <div className="shrink-0 border-b border-ink-100 p-4">
          <button
            type="button"
            className="mb-4 text-body font-medium text-brand-dark hover:text-brand-green"
            onClick={onClose}
          >
            ← Back to Projects
          </button>
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={sidebarQuery}
              onChange={(event) => setSidebarQuery(event.target.value)}
              placeholder="Search..."
              className="h-10 w-full rounded-xl border border-ink-100 bg-ink-50 pl-10 pr-3 text-body text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
            />
          </div>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto p-3 lg:max-h-none">
          {sidebarProjects.map((project) => {
            const isActive = project.id === selectedProject.id
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                  className={`mb-2 w-full rounded-xl2 p-4 text-left transition-shadow ${
                    isActive ? 'bg-white shadow-card ring-1 ring-ink-100' : 'hover:bg-ink-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <BrandLogo brand={project.brand} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-card-title text-ink-900">{project.title}</p>
                      <p className="truncate text-caption text-ink-500">{project.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((name, index) => (
                        <MemberAvatar key={`${project.id}-${name}-${index}`} name={name} />
                      ))}
                    </div>
                    <TimeBadge timeLeft={project.timeLeft} urgent={project.urgent} compact />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-4">
            <BrandLogo brand={selectedProject.brand} size="md" />
            <div className="min-w-0">
              <h2 className="text-page-title text-ink-900 md:text-[1.875rem]">{selectedProject.title}</h2>
              <p className="text-body text-ink-500">{selectedProject.company}</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        <DetailSection label="Details">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MetaCard icon={DollarSign} label="Budget" value={detail.budget} iconClass="text-brand-dark" />
            <MetaCard icon={CalendarDays} label="Start Date" value={detail.startDateLabel} iconClass="text-brand-teal" />
            <MetaCard icon={CalendarDays} label="End Date" value={detail.endDateLabel} iconClass="text-ink-500" />
          </div>
        </DetailSection>

        <DetailSection label="Description">
          <p className="text-body leading-7 text-ink-600">{detail.longDescription}</p>
        </DetailSection>

        <DetailSection label={`Checklist (${checklistProgress}%)`}>
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-green transition-all" style={{ width: `${checklistProgress}%` }} />
          </div>
          <ul className="space-y-1">
            {checklist.map((item) => (
              <li
                key={item.id}
                className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
                  hoveredChecklistId === item.id ? 'bg-ink-50' : ''
                }`}
                onMouseEnter={() => setHoveredChecklistId(item.id)}
                onMouseLeave={() => setHoveredChecklistId(null)}
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 text-left text-body text-ink-600"
                  onClick={() => toggleChecklistItem(item.id)}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      item.done ? 'border-brand-dark bg-brand-dark text-white' : 'border-ink-200 bg-white'
                    }`}
                  >
                    {item.done ? <Check size={10} /> : null}
                  </span>
                  <span className={item.done ? 'text-ink-400 line-through' : ''}>{item.label}</span>
                </button>
                {hoveredChecklistId === item.id ? (
                  <div className="flex items-center gap-1 text-ink-400">
                    <GripVertical size={14} />
                    <button type="button" className="rounded p-1 hover:bg-white hover:text-red-500" aria-label="Delete item">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <button type="button" className="mt-3 inline-flex items-center gap-2 text-body font-medium text-brand-dark hover:text-brand-green">
            <Plus size={14} />
            Add Checklist Item
          </button>
        </DetailSection>

        <div className="mt-8 border-t border-ink-100 pt-6">
          <div className="flex gap-6 border-b border-ink-100">
            <button
              type="button"
              className={`pb-3 text-section-title uppercase ${
                activeTab === 'comments' ? 'border-b-2 border-brand-dark text-brand-dark' : 'text-ink-500'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
            <button
              type="button"
              className={`pb-3 text-section-title uppercase ${
                activeTab === 'activity' ? 'border-b-2 border-brand-dark text-brand-dark' : 'text-ink-500'
              }`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>

          {activeTab === 'comments' ? (
            <>
              <div className="mt-4 rounded-xl border border-ink-100 p-4">
                <textarea
                  value={commentDraft}
                  onChange={(event) => setCommentDraft(event.target.value)}
                  placeholder="Add Comment..."
                  className="min-h-[80px] w-full resize-none bg-transparent text-body text-ink-700 outline-none placeholder:text-ink-400"
                />
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-xl bg-brand-dark px-4 py-2 text-body font-medium text-white hover:bg-brand-green"
                    onClick={handleAddComment}
                  >
                    Comment
                  </button>
                  <div className="flex items-center gap-2 text-ink-400">
                    <button type="button" className="rounded p-1.5 hover:bg-ink-50 hover:text-ink-700" aria-label="Attach file">
                      <Paperclip size={16} />
                    </button>
                    <button type="button" className="rounded p-1.5 hover:bg-ink-50 hover:text-ink-700" aria-label="Add emoji">
                      <Smile size={16} />
                    </button>
                    <button type="button" className="rounded p-1.5 hover:bg-ink-50 hover:text-ink-700" aria-label="Add image">
                      <ImageIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-6">
                {comments.map((comment) => (
                  <li key={comment.id} className="flex gap-3">
                    <MemberAvatar name={comment.author} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-card-title text-ink-900">{comment.author}</span>
                        <span className="text-caption text-ink-500">{comment.time}</span>
                      </div>
                      <p className="mt-2 whitespace-pre-line text-body leading-6 text-ink-600">{comment.text}</p>
                      {comment.images ? (
                        <div className="mt-3 flex items-center gap-2">
                          {comment.images.slice(0, 3).map((image) => (
                            <div key={image} className={`h-12 w-12 rounded-lg ${imageStyles[image]}`} />
                          ))}
                          {comment.moreImages ? (
                            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/15 text-body font-semibold text-brand-dark">
                              +{comment.moreImages}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="mt-4 space-y-4">
              <li className="text-body text-ink-500">
                <span className="font-medium text-ink-700">Jane Wilson</span> commented on the project
              </li>
              <li className="text-body text-ink-500">
                <span className="font-medium text-ink-700">Jacob Hawkins</span> updated the checklist
              </li>
              <li className="text-body text-ink-500">
                <span className="font-medium text-ink-700">Regina Cooper</span> changed the status to Started
              </li>
            </ul>
          )}
        </div>
      </main>

      <aside className="w-full shrink-0 overflow-y-auto border-t border-ink-100 p-5 md:p-6 lg:h-full lg:w-72 lg:border-l lg:border-t-0 xl:w-80">
        <div className="relative">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-between rounded-xl border border-ink-100 px-4 text-body text-ink-700 hover:bg-ink-50"
            onClick={() => setStatusOpen((open) => !open)}
          >
            <span className="flex items-center gap-2">
              <Check size={16} className="text-brand-dark" />
              {selectedStatus.label}
            </span>
            <ChevronDown size={16} className="text-ink-400" />
          </button>
          {statusOpen ? (
            <div className="absolute left-0 right-0 top-14 z-10 overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
              {detailStatusOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-body hover:bg-ink-50"
                  onClick={() => handleStatusChange(option.id)}
                >
                  <span className="flex items-center gap-3 text-ink-700">
                    <span className={`h-2.5 w-2.5 rounded-full ${option.dot}`} />
                    {option.label}
                  </span>
                  {option.id === selectedProject.status ? <Check size={16} className="text-brand-dark" /> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <DetailSection label="Members">
          <div className="mb-2 flex items-center justify-between">
            <span className="sr-only">Members</span>
            <button
              type="button"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-ink-200 text-ink-400 hover:border-brand-dark hover:text-brand-dark"
              aria-label="Add member"
            >
              <Plus size={14} />
            </button>
          </div>
          <ul className="space-y-3">
            {detail.teamMembers.map((member) => (
              <li key={member.name} className="flex items-center gap-3">
                <MemberAvatar name={member.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-card-title text-ink-800">{member.name}</p>
                  <p className="truncate text-caption text-ink-500">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection label="Files">
          <div className="mb-2 flex items-center justify-end">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-ink-200 text-ink-400 hover:border-brand-dark hover:text-brand-dark"
              aria-label="Add file"
            >
              <Plus size={14} />
            </button>
          </div>
          <ul className="space-y-3">
            {detail.files.map((file) => (
              <li key={file.id} className="flex items-center gap-3">
                {file.type === 'image' ? (
                  <div className={`h-10 w-10 shrink-0 rounded-lg ${imageStyles[file.thumb]}`} />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
                    {file.type === 'pdf' ? <FileText size={16} /> : <FileArchive size={16} />}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-card-title text-ink-800">{file.name}</p>
                  <p className="text-caption text-ink-500">{file.size}</p>
                </div>
                <button type="button" className="rounded p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700" aria-label={`Download ${file.name}`}>
                  <Download size={14} />
                </button>
              </li>
            ))}
          </ul>
        </DetailSection>
      </aside>
    </div>
  )
}

function DetailSection({ label, children }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-section-title uppercase text-ink-500">{label}</h3>
      {children}
    </section>
  )
}

function MetaCard({ icon: Icon, label, value, iconClass }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-100 p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 ${iconClass}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-caption text-ink-500">{label}</p>
        <p className="truncate text-card-title text-ink-800">{value}</p>
      </div>
    </div>
  )
}

function TimeBadge({ timeLeft, urgent, compact = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full text-caption font-medium ${
        compact ? 'bg-transparent px-0 py-0' : 'px-2.5 py-1'
      } ${urgent ? 'text-orange-500' : 'text-ink-400'}`}
    >
      <Clock size={12} className={urgent ? 'text-orange-500' : 'text-ink-400'} />
      {timeLeft}
    </span>
  )
}

function MemberAvatar({ name, size = 'sm' }) {
  const sizes = {
    sm: 'h-7 w-7 text-caption',
    md: 'h-10 w-10 text-caption',
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#E98B70] to-[#C65E43] font-semibold text-white ${sizes[size]}`}
      title={name}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}
