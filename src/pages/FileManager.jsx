import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowUpFromLine,
  Bell,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  Flower2,
  Folder,
  Grid2X2,
  Link2,
  List,
  Menu,
  MoreVertical,
  Move,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Trash2,
  X,
} from 'lucide-react'
import { navItems } from '../navConfig'

const folderTree = [
  { id: 'design', label: 'Design' },
  {
    id: 'projects',
    label: 'Projects',
    children: [
      { id: 'projects_01', label: 'Projects_01' },
      { id: 'projects_02', label: 'Projects_02' },
      { id: 'projects_03', label: 'Projects_03' },
      { id: 'projects_04', label: 'Projects_04' },
    ],
  },
  { id: 'music', label: 'Music' },
  { id: 'pictures', label: 'Pictures' },
  { id: 'documents', label: 'Documents' },
  { id: 'downloads', label: 'Downloads' },
]

const gridFolders = [
  { id: 'design', name: 'Design', size: '5.8 GB', kind: 'folder' },
  { id: 'projects', name: 'Projects', size: '3.2 GB', kind: 'folder' },
  { id: 'music', name: 'Music', size: '1.5 GB', kind: 'folder' },
  { id: 'pictures', name: 'Pictures', size: '1.7 GB', kind: 'folder' },
  { id: 'documents', name: 'Documents', size: '440 MB', kind: 'folder' },
  { id: 'downloads', name: 'Downloads', size: '10.1 GB', kind: 'folder' },
]

const gridFiles = [
  { id: 'file-1', name: 'Rocket - Admin Dashboard UI8', size: '2.4 MB', type: 'figma', kind: 'file' },
  { id: 'file-2', name: 'Rocket - Admin Dashboard UI8', size: '1.8 MB', type: 'sketch', kind: 'file' },
  { id: 'file-3', name: 'Project Brief', size: '1.2 MB', type: 'word', kind: 'file' },
  { id: 'file-4', name: 'Arion - Admin Dashboard UI8', size: '2.1 MB', type: 'sketch', kind: 'file' },
  { id: 'file-5', name: 'Design', size: '4.5 MB', type: 'illustrator', kind: 'file' },
  { id: 'file-6', name: 'Attachment.zip', size: '8.4 MB', type: 'zip', kind: 'file' },
  { id: 'file-7', name: 'vCard - Resume', size: '3.2 MB', type: 'photoshop', kind: 'file' },
  { id: 'file-8', name: 'Brand Styles Guide', size: '1.4 MB', type: 'pdf', kind: 'file' },
]

const itemDetails = {
  design: {
    type: 'Folder',
    size: '5.8 GB',
    owner: 'ArtTemplate',
    location: 'My Files',
    modified: 'Sep 15, 2020 3:10',
    created: 'Aug 28, 2020 11:20',
  },
  projects: {
    type: 'Folder',
    size: '3.2 GB',
    owner: 'ArtTemplate',
    location: 'My Files',
    modified: 'Sep 17, 2020 4:25',
    created: 'Sep 10, 2020 2:25',
  },
  music: { type: 'Folder', size: '1.5 GB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 12, 2020 1:15', created: 'Aug 20, 2020 9:00' },
  pictures: { type: 'Folder', size: '1.7 GB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 14, 2020 6:40', created: 'Aug 25, 2020 4:30' },
  documents: { type: 'Folder', size: '440 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 11, 2020 10:05', created: 'Aug 18, 2020 8:15' },
  downloads: { type: 'Folder', size: '10.1 GB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 18, 2020 7:50', created: 'Sep 01, 2020 12:00' },
  'file-1': { type: 'Figma File', size: '2.4 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 16, 2020 2:30', created: 'Sep 08, 2020 1:10' },
  'file-2': { type: 'Sketch File', size: '1.8 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 14, 2020 1:20', created: 'Sep 06, 2020 2:00' },
  'file-3': { type: 'Word Document', size: '1.2 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 13, 2020 5:20', created: 'Sep 05, 2020 3:45' },
  'file-4': { type: 'Sketch File', size: '2.1 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 12, 2020 4:10', created: 'Sep 04, 2020 11:30' },
  'file-5': { type: 'Illustrator File', size: '4.5 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 11, 2020 9:45', created: 'Sep 03, 2020 8:20' },
  'file-6': { type: 'ZIP Archive', size: '8.4 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 10, 2020 6:30', created: 'Sep 02, 2020 5:15' },
  'file-7': { type: 'Photoshop File', size: '3.2 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 09, 2020 3:55', created: 'Sep 01, 2020 10:40' },
  'file-8': { type: 'PDF Document', size: '1.4 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 09, 2020 11:00', created: 'Sep 02, 2020 9:30' },
}

const uploadQueueSeed = [
  { id: 'up-1', name: 'Rocket - Admin Dashboard UI8', size: '1.8 MB', type: 'figma', progress: 100, status: 'done' },
  { id: 'up-2', name: 'Rocket - Admin Dashboard UI8', size: '1.8 MB', type: 'sketch', progress: 100, status: 'done' },
  { id: 'up-3', name: 'Project Brief.docx', size: '1.2 MB', type: 'word', progress: 0, status: 'failed' },
  { id: 'up-4', name: 'Attachment.zip', size: '8.4 MB', type: 'zip', progress: 95, status: 'uploading' },
  { id: 'up-5', name: 'vCard - Resume.psd', size: '3.2 MB', type: 'photoshop', progress: 75, status: 'uploading' },
  { id: 'up-6', name: 'Brand Styles Guide.pdf', size: '1.4 MB', type: 'pdf', progress: 50, status: 'uploading' },
  { id: 'up-7', name: 'Arion - Admin Dashboard UI8', size: '2.1 MB', type: 'sketch', progress: 100, status: 'done' },
  { id: 'up-8', name: 'Design.ai', size: '4.5 MB', type: 'illustrator', progress: 100, status: 'done' },
]

const listRows = [
  ...gridFolders.map((item) => ({ ...item, date: '12.09.20', owner: 'ArtTemplate' })),
  ...gridFiles.map((item) => ({ ...item, date: '12.09.20', owner: 'ArtTemplate' })),
]

export default function FileManager() {
  const [activeTreeFolder, setActiveTreeFolder] = useState('projects')
  const [expandedFolders, setExpandedFolders] = useState({ projects: true })
  const [selectedId, setSelectedId] = useState('projects')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [folderSidebarOpen, setFolderSidebarOpen] = useState(true)
  const [iconNavOpen, setIconNavOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploads, setUploads] = useState(uploadQueueSeed)
  const [settings, setSettings] = useState({ fileSharing: true, backup: false, sync: false })
  const [mobilePanel, setMobilePanel] = useState('main')
  const menuRef = useRef(null)

  const selectedItem = useMemo(() => {
    return [...gridFolders, ...gridFiles].find((item) => item.id === selectedId) || gridFolders[1]
  }, [selectedId])

  const selectedDetails = itemDetails[selectedId] || itemDetails.projects

  const filteredFolders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return gridFolders
    return gridFolders.filter((item) => item.name.toLowerCase().includes(q))
  }, [searchQuery])

  const filteredFiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return gridFiles
    return gridFiles.filter((item) => item.name.toLowerCase().includes(q))
  }, [searchQuery])

  const filteredListRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return listRows
    return listRows.filter((item) => item.name.toLowerCase().includes(q))
  }, [searchQuery])

  useEffect(() => {
    if (!contextMenu) return undefined
    const handleClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setContextMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [contextMenu])

  const toggleTreeFolder = (folderId) => {
    setExpandedFolders((current) => ({ ...current, [folderId]: !current[folderId] }))
  }

  const selectItem = (id) => {
    setSelectedId(id)
    setContextMenu(null)
    if (window.innerWidth < 1024) {
      setMobilePanel('info')
    }
  }

  const openContextMenu = (event, itemId) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedId(itemId)
    setContextMenu({ itemId, x: event.clientX, y: event.clientY })
  }

  const retryUpload = (uploadId) => {
    setUploads((current) =>
      current.map((item) => (item.id === uploadId ? { ...item, status: 'uploading', progress: 12 } : item)),
    )
  }

  const openUploadPanel = () => {
    setUploads(uploadQueueSeed.map((item) => ({ ...item })))
    setUploadOpen(true)
  }

  useEffect(() => {
    if (!uploadOpen) return undefined

    const interval = window.setInterval(() => {
      setUploads((current) =>
        current.map((item) => {
          if (item.status !== 'uploading') return item
          const nextProgress = Math.min(item.progress + 1, 100)
          if (nextProgress >= 100) {
            return { ...item, progress: 100, status: 'done' }
          }
          return { ...item, progress: nextProgress }
        }),
      )
    }, 600)

    return () => window.clearInterval(interval)
  }, [uploadOpen])

  return (
    <div className="flex h-screen overflow-hidden bg-white text-ink-900">
      <IconRail open={iconNavOpen} onClose={() => setIconNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 bg-white px-4 md:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-ink-500 hover:bg-ink-50"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIconNavOpen(true)
              }
              setFolderSidebarOpen((open) => !open)
            }}
            aria-label="Toggle folders"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 md:gap-4">
            <button type="button" className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" aria-label="Search">
              <Search size={18} />
            </button>
            <button type="button" className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-50" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
            </button>
            <div className="flex items-center gap-2 border-l border-ink-100 pl-3">
              <Avatar name="ArtTemplate" size="sm" />
              <span className="hidden text-sm font-medium text-ink-900 sm:inline">ArtTemplate</span>
              <ChevronDown size={14} className="hidden text-ink-400 sm:inline" />
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {folderSidebarOpen ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden"
              onClick={() => setFolderSidebarOpen(false)}
              aria-label="Close folders overlay"
            />
          ) : null}

          <aside
            className={`${
              folderSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'
            } fixed inset-y-16 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-ink-100 bg-white transition-transform lg:static lg:inset-auto lg:z-auto lg:flex lg:w-56 xl:w-64`}
          >
            <div className="flex items-center justify-between border-b border-ink-100 p-4 lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Folders</p>
              <button type="button" className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" onClick={() => setFolderSidebarOpen(false)} aria-label="Close folders">
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Folders</p>
              <ul className="space-y-0.5">
                {folderTree.map((folder) => {
                  const isExpanded = expandedFolders[folder.id]
                  const hasChildren = Boolean(folder.children)

                  return (
                    <li key={folder.id}>
                      <button
                        type="button"
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                          activeTreeFolder === folder.id ? 'font-medium text-ink-900' : 'text-ink-600 hover:bg-ink-50'
                        }`}
                        onClick={() => {
                          setActiveTreeFolder(folder.id)
                          if (hasChildren) {
                            toggleTreeFolder(folder.id)
                          } else {
                            selectItem(folder.id)
                          }
                        }}
                      >
                        {hasChildren ? (
                          <ChevronDown
                            size={14}
                            className={`shrink-0 text-ink-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                          />
                        ) : (
                          <ChevronRight size={14} className="shrink-0 text-ink-400" />
                        )}
                        <FolderGlyph size="xs" />
                        <span className="truncate">{folder.label}</span>
                      </button>

                      {hasChildren && isExpanded ? (
                        <ul className="ml-[18px] mt-0.5 space-y-0.5 border-l border-dashed border-ink-200 pl-4">
                          {folder.children.map((child) => (
                            <li key={child.id}>
                              <button
                                type="button"
                                className={`flex w-full items-center gap-2 rounded-lg py-1.5 pl-1 text-sm ${
                                  activeTreeFolder === child.id ? 'font-medium text-ink-900' : 'text-ink-500 hover:bg-ink-50'
                                }`}
                                onClick={() => {
                                  setActiveTreeFolder(child.id)
                                  selectItem('projects')
                                }}
                              >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-300" />
                                {child.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 border-t border-ink-100 pt-4">
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink-500 hover:bg-ink-50">
                  <Trash2 size={16} />
                  Trash
                </button>
              </div>
            </nav>

            <div className="border-t border-ink-100 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-ink-500">
                <span>Storage</span>
                <span>70%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full w-[70%] rounded-full bg-brand-dark" />
              </div>
            </div>
          </aside>

          <main
            className={`min-w-0 flex-1 overflow-y-auto bg-white ${
              mobilePanel === 'main' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
            }`}
          >
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-6">
              <div className="relative flex flex-1 items-center gap-3 rounded-xl bg-ink-50 px-4 py-3">
                <Search size={17} className="shrink-0 text-ink-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1 rounded-xl border border-ink-100 p-1 sm:flex">
                  <button
                    type="button"
                    className={`rounded-lg p-2 ${viewMode === 'grid' ? 'bg-ink-50 text-brand-dark' : 'text-ink-400 hover:text-ink-700'}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid2X2 size={16} />
                  </button>
                  <button
                    type="button"
                    className={`rounded-lg p-2 ${viewMode === 'list' ? 'bg-ink-50 text-brand-dark' : 'text-ink-400 hover:text-ink-700'}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-green"
                  onClick={openUploadPanel}
                >
                  <ArrowUpFromLine size={16} />
                  Upload
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="space-y-8 px-4 pb-8 md:px-6">
                <section>
                  <h2 className="mb-5 text-base font-semibold text-ink-900">Folders</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {filteredFolders.map((folder) => (
                      <button
                        key={folder.id}
                        type="button"
                        className={`group rounded-2xl p-4 text-center transition-colors ${
                          selectedId === folder.id ? 'bg-ink-100' : 'hover:bg-ink-50'
                        }`}
                        onClick={() => selectItem(folder.id)}
                        onContextMenu={(event) => openContextMenu(event, folder.id)}
                      >
                        <FolderGlyph size="lg" className="mx-auto" />
                        <p className="mt-3 truncate text-sm font-medium text-ink-800">{folder.name}</p>
                        <p className="mt-0.5 text-xs text-ink-400">{folder.size}</p>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={openUploadPanel}
                      className="group flex min-h-[148px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/50 transition-colors hover:border-ink-300 hover:bg-ink-50"
                      aria-label="Add folder and upload files"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-ink-100 transition-transform group-hover:scale-105">
                        <Plus size={22} className="text-ink-700" strokeWidth={1.75} />
                      </span>
                      <span className="mt-3 text-sm text-ink-400 group-hover:text-ink-500">Add Folder</span>
                    </button>
                  </div>
                </section>

                <section>
                  <h2 className="mb-5 text-base font-semibold text-ink-900">Files</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {filteredFiles.map((file) => (
                      <button
                        key={file.id}
                        type="button"
                        className={`rounded-2xl p-4 text-center transition-colors ${
                          selectedId === file.id ? 'bg-ink-100' : 'hover:bg-ink-50'
                        }`}
                        onClick={() => selectItem(file.id)}
                        onContextMenu={(event) => openContextMenu(event, file.id)}
                      >
                        <FileTypeIcon type={file.type} className="mx-auto" />
                        <p className="mt-3 line-clamp-2 text-xs font-medium leading-snug text-ink-800">{file.name}</p>
                        <p className="mt-1 text-xs text-ink-400">{file.size}</p>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="overflow-x-auto px-4 pb-8 md:px-6">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                      <th className="w-10 px-3 py-3" />
                      <th className="px-3 py-3 font-semibold">Name</th>
                      <th className="px-3 py-3 font-semibold">Date</th>
                      <th className="px-3 py-3 font-semibold">Size</th>
                      <th className="px-3 py-3 font-semibold">Owner</th>
                      <th className="w-10 px-3 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredListRows.map((row) => (
                      <tr
                        key={row.id}
                        className={`cursor-pointer border-b border-ink-100 hover:bg-ink-50/70 ${
                          selectedId === row.id ? 'bg-brand-green/5' : ''
                        }`}
                        onClick={() => selectItem(row.id)}
                        onContextMenu={(event) => openContextMenu(event, row.id)}
                      >
                        <td className="px-3 py-3">
                          <input
                            type="checkbox"
                            checked={selectedId === row.id}
                            onChange={() => selectItem(row.id)}
                            className="h-4 w-4 rounded border-ink-200 text-brand-dark accent-brand-dark"
                            onClick={(event) => event.stopPropagation()}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            {row.kind === 'folder' ? <FolderGlyph size="sm" /> : <FileTypeIcon type={row.type} size="sm" />}
                            <span className="font-medium text-ink-800">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-ink-500">{row.date}</td>
                        <td className="px-3 py-3 text-ink-500">{row.size}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={row.owner} size="xs" />
                            <span className="text-ink-500">{row.owner}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <button type="button" className="rounded p-1 text-ink-400 hover:bg-ink-100" onClick={(event) => openContextMenu(event, row.id)}>
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>

          <aside
            className={`${
              mobilePanel === 'info' ? 'flex' : 'hidden'
            } w-full shrink-0 flex-col border-l border-ink-100 bg-white lg:flex lg:w-72 xl:w-80`}
          >
            <div className="flex items-center justify-between border-b border-ink-100 p-4 lg:hidden">
              <button type="button" className="flex items-center gap-2 text-sm text-ink-500" onClick={() => setMobilePanel('main')}>
                <ChevronRight size={16} className="rotate-180" />
                Back
              </button>
              <p className="font-medium text-ink-900">Details</p>
              <span className="w-14" />
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-center">
                {selectedItem.kind === 'folder' ? (
                  <FolderGlyph size="xl" className="mx-auto" />
                ) : (
                  <FileTypeIcon type={selectedItem.type} size="lg" className="mx-auto" />
                )}
                <h2 className="mt-4 text-lg font-semibold text-ink-900">{selectedItem.name}</h2>
              </div>

              <section className="mt-8">
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Info</h3>
                <dl className="space-y-3.5 text-sm">
                  <InfoRow label="Type" value={selectedDetails.type} />
                  <InfoRow label="Size" value={selectedDetails.size} />
                  <InfoRow label="Owner" value={selectedDetails.owner} />
                  <InfoRow label="Location" value={selectedDetails.location} valueClass="text-brand-dark" />
                  <InfoRow label="Modified" value={selectedDetails.modified} />
                  <InfoRow label="Created" value={selectedDetails.created} />
                </dl>
              </section>

              <section className="mt-8">
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Settings</h3>
                <ul className="space-y-4">
                  <ToggleRow label="File Sharing" checked={settings.fileSharing} onChange={(value) => setSettings((s) => ({ ...s, fileSharing: value }))} />
                  <ToggleRow label="Backup" checked={settings.backup} onChange={(value) => setSettings((s) => ({ ...s, backup: value }))} />
                  <ToggleRow label="Sync" checked={settings.sync} onChange={(value) => setSettings((s) => ({ ...s, sync: value }))} />
                </ul>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {contextMenu ? (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-[190px] overflow-hidden rounded-xl border border-ink-100 bg-white py-2 shadow-xl"
          style={{ left: Math.min(contextMenu.x, window.innerWidth - 210), top: Math.min(contextMenu.y, window.innerHeight - 300) }}
        >
          {[
            { label: 'Share', icon: Share2 },
            { label: 'Sharing Link', icon: Link2 },
            { label: 'Download', icon: Download },
            { label: 'Rename', icon: Pencil },
            { label: 'Copy', icon: Copy },
            { label: 'Move', icon: Move },
            { label: 'Delete', icon: Trash2, destructive: true },
          ].map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-ink-50 ${
                  action.destructive ? 'text-red-500' : 'text-ink-600'
                }`}
                onClick={() => setContextMenu(null)}
              >
                <Icon size={16} />
                {action.label}
              </button>
            )
          })}
        </div>
      ) : null}

      {uploadOpen ? (
        <UploadPanel uploads={uploads} onClose={() => setUploadOpen(false)} onRetry={retryUpload} />
      ) : null}
    </div>
  )
}

function UploadPanel({ uploads, onClose, onRetry }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const overallProgress = Math.round(uploads.reduce((sum, item) => sum + item.progress, 0) / uploads.length)
  const uploadingCount = uploads.filter((item) => item.status === 'uploading').length
  const timeLeft = uploadingCount > 0 ? '2 minutes left' : 'Complete'

  useEffect(() => {
    if (!menuOpen) return undefined
    const handleClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full sm:bottom-4 sm:right-4 sm:w-[min(100vw-2rem,380px)]">
      <div className="overflow-hidden rounded-t-2xl border border-ink-100 bg-white shadow-2xl sm:rounded-2xl">
        <div className="border-b border-ink-100 px-4 py-4 sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink-900">Uploading {uploads.length} files</p>
              <p className="mt-1 text-xs text-ink-500">
                <span className="font-semibold text-brand-dark">{overallProgress}%</span>
                <span className="mx-1.5 text-ink-300">•</span>
                {timeLeft}
              </p>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Upload options"
              >
                <MoreVertical size={18} />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-9 z-10 min-w-[140px] overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-xl">
                  <button
                    type="button"
                    className="block w-full px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50"
                    onClick={() => {
                      setMenuOpen(false)
                      onClose()
                    }}
                  >
                    Close panel
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <ul className="max-h-[min(320px,50vh)] overflow-y-auto px-2 py-2 sm:px-3">
          {uploads.map((item) => (
            <UploadRow key={item.id} item={item} onRetry={onRetry} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function UploadRow({ item, onRetry }) {
  const isUploading = item.status === 'uploading'
  const isFailed = item.status === 'failed'
  const isDone = item.status === 'done'

  return (
    <li className="relative mb-1 overflow-hidden rounded-xl last:mb-0">
      {isUploading ? (
        <div
          className="absolute inset-y-0 left-0 bg-brand-green/10 transition-[width] duration-500 ease-out"
          style={{ width: `${item.progress}%` }}
        />
      ) : null}

      <div className="relative flex items-center gap-3 px-2 py-3 sm:px-3">
        <FileTypeIcon type={item.type} size="sm" className="shrink-0" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink-800">{item.name}</p>
          {isFailed ? (
            <p className="mt-0.5 text-xs font-medium text-red-500">Upload Failed</p>
          ) : (
            <p className="mt-0.5 text-xs text-ink-400">{item.size}</p>
          )}
        </div>

        {isDone ? <CheckBadge /> : null}

        {isFailed ? (
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-400 transition-colors hover:border-ink-300 hover:bg-ink-50 hover:text-brand-dark"
            onClick={() => onRetry(item.id)}
            aria-label={`Retry upload for ${item.name}`}
          >
            <RefreshCw size={14} />
          </button>
        ) : null}

        {isUploading ? (
          <span className="shrink-0 text-xs font-semibold text-brand-dark">{item.progress}%</span>
        ) : null}
      </div>
    </li>
  )
}

function IconRail({ open, onClose }) {
  return (
    <>
      {open ? <button type="button" className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden" onClick={onClose} aria-label="Close navigation" /> : null}
      <aside
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 flex w-[68px] shrink-0 flex-col items-center border-r border-ink-100 bg-white py-5 transition-transform lg:static lg:translate-x-0`}
      >
        <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-teal to-brand-green">
          <Flower2 size={18} className="text-white" />
        </div>

        <nav className="flex w-full flex-1 flex-col gap-1 px-2">
          {navItems.map(({ label, path, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              title={label}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex h-11 w-full items-center justify-center rounded-xl border-l-[3px] transition-colors ${
                  isActive || path === '/file-manager'
                    ? 'border-brand-dark bg-brand-green/15 text-brand-dark'
                    : 'border-transparent text-ink-400 hover:bg-ink-50 hover:text-ink-700'
                }`
              }
            >
              <Icon size={18} />
              {badge ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-semibold text-white">
                  {badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

function FolderGlyph({ size = 'md', className = '' }) {
  const sizes = { xs: 'h-5 w-6', sm: 'h-8 w-10', md: 'h-12 w-14', lg: 'h-[72px] w-[88px]', xl: 'h-20 w-24' }
  return (
    <svg viewBox="0 0 88 72" className={`${sizes[size] || sizes.md} ${className}`} aria-hidden="true">
      <path
        fill="#E8B68C"
        d="M6 14c0-3.3 2.7-6 6-6h16l6 6h38c3.3 0 6 2.7 6 6v30c0 3.3-2.7 6-6 6H12c-3.3 0-6-2.7-6-6V14z"
      />
      <path fill="#D4A373" d="M6 22h76v28c0 3.3-2.7 6-6 6H12c-3.3 0-6-2.7-6-6V22z" opacity="0.4" />
      <path fill="#F0C9A0" d="M22 8h10l4 4H12c-2.2 0-4 1.8-4 4v2h6l6-6h2z" opacity="0.6" />
    </svg>
  )
}

function FileTypeIcon({ type, size = 'md', className = '' }) {
  const sizes = { sm: 'h-9 w-9', md: 'h-14 w-14', lg: 'h-16 w-16' }
  const box = sizes[size] || sizes.md

  const icons = {
    figma: (
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <circle cx="24" cy="12" r="8" fill="#F24E1E" />
        <circle cx="24" cy="24" r="8" fill="#A259FF" />
        <circle cx="24" cy="36" r="8" fill="#0ACF83" />
        <circle cx="36" cy="18" r="8" fill="#1ABCFE" />
        <circle cx="12" cy="18" r="8" fill="#FF7262" />
      </svg>
    ),
    sketch: (
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <path fill="#F7B500" d="M24 4 4 44h40L24 4z" />
        <path fill="#ED8A00" d="M24 4v40l20-20L24 4z" opacity="0.55" />
      </svg>
    ),
    word: (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#185C37] text-lg font-bold text-white shadow-sm">W</div>
    ),
    zip: (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-ink-100 text-ink-500">
        <Folder size={size === 'sm' ? 14 : 22} />
        <span className="mt-0.5 text-[9px] font-bold tracking-wide">ZIP</span>
      </div>
    ),
    photoshop: (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#31A8FF] text-sm font-bold text-[#001E36] shadow-sm">Ps</div>
    ),
    pdf: (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#E74C3C] text-xs font-bold text-white shadow-sm">PDF</div>
    ),
    illustrator: (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#FF9A00] text-sm font-bold text-[#330000] shadow-sm">Ai</div>
    ),
  }

  return <div className={`${box} ${className}`}>{icons[type] || icons.pdf}</div>
}

function InfoRow({ label, value, valueClass = 'text-ink-700' }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-ink-400">{label}</dt>
      <dd className={`text-right font-medium ${valueClass}`}>{value}</dd>
    </div>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span className="text-sm text-ink-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-brand-dark' : 'bg-ink-200'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'left-5' : 'left-0.5'}`} />
      </button>
    </li>
  )
}

function Avatar({ name, size = 'sm' }) {
  const sizes = { xs: 'h-6 w-6 text-[8px]', sm: 'h-8 w-8 text-[10px]' }
  return (
    <div className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] font-semibold text-white ${sizes[size]}`}>
      {name.split(' ').map((part) => part[0]).join('')}
    </div>
  )
}

function CheckBadge() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white">
      <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 6l3 3 5-5" />
      </svg>
    </span>
  )
}
