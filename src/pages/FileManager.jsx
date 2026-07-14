import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  ChevronRight,
  CloudUpload,
  Copy,
  Download,
  ExternalLink,
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
  'file-3': { type: 'Word Document', size: '1.2 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 13, 2020 5:20', created: 'Sep 05, 2020 3:45' },
  'file-8': { type: 'PDF Document', size: '1.4 MB', owner: 'ArtTemplate', location: 'My Files', modified: 'Sep 09, 2020 11:00', created: 'Sep 02, 2020 9:30' },
}

const uploadQueueSeed = [
  { id: 'up-1', name: 'Rocket - Admin Dashboard UI8', size: '2.4 MB', type: 'figma', progress: 100, status: 'done' },
  { id: 'up-2', name: 'Project Brief.docx', size: '1.2 MB', type: 'word', progress: 100, status: 'done' },
  { id: 'up-3', name: 'Brand Styles Guide.pdf', size: '1.4 MB', type: 'pdf', progress: 100, status: 'done' },
  { id: 'up-4', name: 'Attachment.zip', size: '8.4 MB', type: 'zip', progress: 95, status: 'uploading' },
  { id: 'up-5', name: 'Design.ai', size: '4.5 MB', type: 'illustrator', progress: 75, status: 'uploading' },
  { id: 'up-6', name: 'vCard - Resume.psd', size: '3.2 MB', type: 'photoshop', progress: 50, status: 'uploading' },
  { id: 'up-7', name: 'Project Brief.docx', size: '1.2 MB', type: 'word', progress: 0, status: 'failed' },
  { id: 'up-8', name: 'Arion - Admin Dashboard UI8', size: '2.1 MB', type: 'sketch', progress: 100, status: 'done' },
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
  const [infoPanelOpen, setInfoPanelOpen] = useState(true)
  const [contextMenu, setContextMenu] = useState(null)
  const [uploadOpen, setUploadOpen] = useState(true)
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
    setInfoPanelOpen(true)
    setMobilePanel('info')
    setContextMenu(null)
  }

  const openContextMenu = (event, itemId) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedId(itemId)
    setContextMenu({ itemId, x: event.clientX, y: event.clientY })
  }

  const retryUpload = (uploadId) => {
    setUploads((current) =>
      current.map((item) => (item.id === uploadId ? { ...item, status: 'uploading', progress: 10 } : item)),
    )
  }

  const overallUploadProgress = Math.round(uploads.reduce((sum, item) => sum + item.progress, 0) / uploads.length)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ink-50 text-ink-900">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-ink-500 hover:bg-ink-50"
            onClick={() => {
              setIconNavOpen(true)
              setFolderSidebarOpen((open) => !open)
            }}
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-teal to-brand-green">
              <Flower2 size={18} className="text-white" />
            </div>
            <span className="hidden font-semibold tracking-wide text-ink-900 sm:inline">FLOWER</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden" onClick={() => setMobilePanel('main')} aria-label="Main view">
            <Grid2X2 size={18} />
          </button>
          <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" aria-label="Search">
            <Search size={18} />
          </button>
          <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-50" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
          </button>
          <div className="flex items-center gap-2 border-l border-ink-100 pl-3">
            <Avatar name="ArtTemplate" />
            <span className="hidden text-sm font-medium sm:inline">ArtTemplate</span>
            <ChevronDown size={14} className="hidden text-ink-400 sm:inline" />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <IconSidebar open={iconNavOpen} onClose={() => setIconNavOpen(false)} />

        <aside
          className={`${
            folderSidebarOpen ? 'flex' : 'hidden'
          } w-full shrink-0 flex-col border-r border-ink-100 bg-white md:flex md:w-56 lg:w-64 xl:w-72`}
        >
          <div className="flex items-center justify-between border-b border-ink-100 p-4 md:hidden">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Folders</p>
            <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" onClick={() => setFolderSidebarOpen(false)} aria-label="Close folders">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Folders</p>
            <ul className="space-y-1">
              {folderTree.map((folder) => (
                <li key={folder.id}>
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                      activeTreeFolder === folder.id ? 'bg-brand-green/10 font-medium text-brand-dark' : 'text-ink-600 hover:bg-ink-50'
                    }`}
                    onClick={() => {
                      setActiveTreeFolder(folder.id)
                      if (folder.children) toggleTreeFolder(folder.id)
                      else selectItem(folder.id)
                    }}
                  >
                    {folder.children ? (
                      <ChevronDown
                        size={14}
                        className={`text-ink-400 transition-transform ${expandedFolders[folder.id] ? '' : '-rotate-90'}`}
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleTreeFolder(folder.id)
                        }}
                      />
                    ) : (
                      <ChevronRight size={14} className="text-transparent" />
                    )}
                    <FolderGlyph size="sm" />
                    {folder.label}
                  </button>
                  {folder.children && expandedFolders[folder.id] ? (
                    <ul className="ml-5 mt-1 space-y-1 border-l border-dashed border-ink-200 pl-3">
                      {folder.children.map((child) => (
                        <li key={child.id}>
                          <button
                            type="button"
                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
                              activeTreeFolder === child.id ? 'text-brand-dark' : 'text-ink-500 hover:bg-ink-50'
                            }`}
                            onClick={() => {
                              setActiveTreeFolder(child.id)
                              selectItem('projects')
                            }}
                          >
                            <span className="h-2 w-2 rounded-full bg-ink-200" />
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-ink-100 pt-4">
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
              <div className="h-full w-[70%] rounded-full bg-brand-green" />
            </div>
          </div>
        </aside>

        <main className={`min-w-0 flex-1 overflow-y-auto bg-white ${mobilePanel === 'main' ? 'flex flex-col' : 'hidden md:flex md:flex-col'}`}>
          <div className="flex flex-col gap-4 border-b border-ink-100 p-4 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="relative flex flex-1 items-center gap-3 rounded-xl border border-ink-100 px-4 py-2.5">
              <Search size={17} className="text-ink-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-ink-100 p-1">
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
                onClick={() => setUploadOpen(true)}
              >
                <CloudUpload size={16} />
                Upload
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="space-y-8 p-4 md:p-6">
              <section>
                <h2 className="mb-4 text-sm font-semibold text-ink-900">Folders</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredFolders.map((folder) => (
                    <button
                      key={folder.id}
                      type="button"
                      className={`rounded-xl2 p-4 text-left transition-shadow ${
                        selectedId === folder.id ? 'bg-ink-50 ring-2 ring-brand-dark/20' : 'hover:bg-ink-50'
                      }`}
                      onClick={() => selectItem(folder.id)}
                      onContextMenu={(event) => openContextMenu(event, folder.id)}
                    >
                      <FolderGlyph size="lg" className="mx-auto" />
                      <p className="mt-3 truncate text-center text-sm font-medium text-ink-800">{folder.name}</p>
                      <p className="text-center text-xs text-ink-400">{folder.size}</p>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="flex min-h-[140px] flex-col items-center justify-center rounded-xl2 border-2 border-dashed border-ink-200 text-ink-400 hover:border-ink-300 hover:text-ink-500"
                  >
                    <Plus size={24} strokeWidth={1.5} />
                    <span className="mt-2 text-sm">Add Folder</span>
                  </button>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-sm font-semibold text-ink-900">Files</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {filteredFiles.map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      className={`rounded-xl2 border border-ink-100 p-4 text-left transition-shadow hover:shadow-card ${
                        selectedId === file.id ? 'bg-ink-50 ring-2 ring-brand-dark/20' : ''
                      }`}
                      onClick={() => selectItem(file.id)}
                      onContextMenu={(event) => openContextMenu(event, file.id)}
                    >
                      <FileTypeIcon type={file.type} className="mx-auto" />
                      <p className="mt-3 line-clamp-2 text-center text-xs font-medium text-ink-800">{file.name}</p>
                      <p className="text-center text-xs text-ink-400">{file.size}</p>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="overflow-x-auto p-4 md:p-6">
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
                          className="h-4 w-4 rounded border-ink-200 text-brand-dark"
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
            infoPanelOpen && mobilePanel === 'info' ? 'flex' : 'hidden'
          } w-full shrink-0 flex-col border-l border-ink-100 bg-white md:flex md:w-72 lg:w-80 xl:w-96`}
        >
          <div className="flex items-center justify-between border-b border-ink-100 p-4 md:hidden">
            <p className="font-medium text-ink-900">Details</p>
            <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" onClick={() => setMobilePanel('main')} aria-label="Close details">
              <X size={18} />
            </button>
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
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-400">Info</h3>
              <dl className="space-y-3 text-sm">
                <InfoRow label="Type" value={selectedDetails.type} />
                <InfoRow label="Size" value={selectedDetails.size} />
                <InfoRow label="Owner" value={selectedDetails.owner} />
                <InfoRow label="Location" value={selectedDetails.location} valueClass="text-brand-dark" />
                <InfoRow label="Modified" value={selectedDetails.modified} />
                <InfoRow label="Created" value={selectedDetails.created} />
              </dl>
            </section>

            <section className="mt-8">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-400">Settings</h3>
              <ul className="space-y-4">
                <ToggleRow label="File Sharing" checked={settings.fileSharing} onChange={(value) => setSettings((s) => ({ ...s, fileSharing: value }))} />
                <ToggleRow label="Backup" checked={settings.backup} onChange={(value) => setSettings((s) => ({ ...s, backup: value }))} />
                <ToggleRow label="Sync" checked={settings.sync} onChange={(value) => setSettings((s) => ({ ...s, sync: value }))} />
              </ul>
            </section>
          </div>
        </aside>
      </div>

      {contextMenu ? (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-[180px] overflow-hidden rounded-xl border border-ink-100 bg-white py-2 shadow-xl"
          style={{ left: Math.min(contextMenu.x, window.innerWidth - 200), top: Math.min(contextMenu.y, window.innerHeight - 280) }}
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
        <div className="fixed bottom-4 right-4 z-40 w-[min(100vw-2rem,360px)] overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-2xl">
          <div className="border-t-4 border-brand-green bg-ink-800 px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Uploading {uploads.length} files</p>
                <p className="text-xs text-ink-300">
                  {overallUploadProgress}% • 2 minutes left
                </p>
              </div>
              <button type="button" className="rounded p-1 text-ink-300 hover:text-white" onClick={() => setUploadOpen(false)} aria-label="Close uploads">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
          <ul className="max-h-72 overflow-y-auto p-2">
            {uploads.map((item) => (
              <li key={item.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-ink-50">
                <FileTypeIcon type={item.type} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-800">{item.name}</p>
                  <p className="text-xs text-ink-400">{item.size}</p>
                  {item.status === 'uploading' ? (
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-brand-green transition-all" style={{ width: `${item.progress}%` }} />
                    </div>
                  ) : null}
                  {item.status === 'failed' ? <p className="mt-1 text-xs text-red-500">Upload Failed</p> : null}
                </div>
                {item.status === 'done' ? <CheckBadge /> : null}
                {item.status === 'failed' ? (
                  <button type="button" className="rounded-full p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-dark" onClick={() => retryUpload(item.id)} aria-label="Retry upload">
                    <RefreshCw size={14} />
                  </button>
                ) : null}
                {item.status === 'uploading' ? <span className="text-xs font-medium text-brand-dark">{item.progress}%</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function IconSidebar({ open, onClose }) {
  return (
    <>
      {open ? <button className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden" onClick={onClose} aria-label="Close navigation" /> : null}
      <aside
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 flex w-16 shrink-0 flex-col items-center border-r border-ink-100 bg-white py-4 pt-20 transition-transform lg:static lg:translate-x-0 lg:pt-4`}
      >
        <nav className="flex flex-1 flex-col items-center gap-2">
          {navItems.map(({ label, path, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              title={label}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                  isActive || path === '/file-manager'
                    ? 'bg-brand-green/15 text-brand-dark'
                    : 'text-ink-400 hover:bg-ink-50 hover:text-ink-700'
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
  const sizes = { sm: 'h-8 w-10', md: 'h-12 w-14', lg: 'h-16 w-20', xl: 'h-20 w-24' }
  return (
    <svg viewBox="0 0 48 40" className={`${sizes[size] || sizes.md} ${className}`} aria-hidden="true">
      <path fill="#E8B68C" d="M4 10c0-2.2 1.8-4 4-4h10l4 4h22c2.2 0 4 1.8 4 4v18c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V10z" />
      <path fill="#D4A373" d="M4 14h40v18c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V14z" opacity="0.35" />
    </svg>
  )
}

function FileTypeIcon({ type, size = 'md', className = '' }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-14 w-14' }
  const box = sizes[size] || sizes.md

  const icons = {
    figma: (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <circle cx="12" cy="6" r="4" fill="#F24E1E" />
        <circle cx="12" cy="12" r="4" fill="#A259FF" />
        <circle cx="12" cy="18" r="4" fill="#0ACF83" />
        <circle cx="18" cy="9" r="4" fill="#1ABCFE" />
        <circle cx="6" cy="9" r="4" fill="#FF7262" />
      </svg>
    ),
    sketch: (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path fill="#F7B500" d="M12 2 2 22h20L12 2z" />
        <path fill="#ED8A00" d="M12 2v20l10-10L12 2z" opacity="0.5" />
      </svg>
    ),
    word: (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#2B579A] text-sm font-bold text-white">W</div>
    ),
    zip: (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-ink-100 text-ink-500">
        <Folder size={18} />
        <span className="text-[8px] font-bold">ZIP</span>
      </div>
    ),
    photoshop: (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#31A8FF] text-xs font-bold text-[#001E36]">Ps</div>
    ),
    pdf: (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#E74C3C] text-[10px] font-bold text-white">PDF</div>
    ),
    illustrator: (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#FF9A00] text-xs font-bold text-[#330000]">Ai</div>
    ),
  }

  return <div className={`${box} ${className}`}>{icons[type] || icons.pdf}</div>
}

function InfoRow({ label, value, valueClass = 'text-ink-700' }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-400">{label}</dt>
      <dd className={`text-right font-medium ${valueClass}`}>{value}</dd>
    </div>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-sm text-ink-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-brand-green' : 'bg-ink-200'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'left-5' : 'left-0.5'}`} />
      </button>
    </li>
  )
}

function Avatar({ name, size = 'sm' }) {
  const sizes = { xs: 'h-6 w-6 text-[8px]', sm: 'h-8 w-8 text-xs' }
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
