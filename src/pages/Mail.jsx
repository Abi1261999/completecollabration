import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowLeft,
  Bell,
  Bold,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flower2,
  Image,
  Inbox,
  Italic,
  Link2,
  List,
  Menu,
  MoreVertical,
  Paperclip,
  Pencil,
  Plus,
  Printer,
  Search,
  Send,
  Smile,
  Star,
  Trash2,
  Underline,
  X,
} from 'lucide-react'
import { navItems } from '../navConfig'

const folders = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: 5 },
  { id: 'marked', label: 'Marked', icon: Star },
  { id: 'drafts', label: 'Drafts', icon: Pencil },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'important', label: 'Important', icon: Bookmark, count: 4 },
  { id: 'deleted', label: 'Deleted', icon: Trash2 },
]

const labels = [
  { id: 'personal', label: 'Personal', color: 'bg-blue-500' },
  { id: 'work', label: 'Work', color: 'bg-sky-400' },
  { id: 'friends', label: 'Friends', color: 'bg-brand-green' },
  { id: 'family', label: 'Family', color: 'bg-yellow-400' },
  { id: 'social', label: 'Social', color: 'bg-brand-dark' },
]

const seedMails = [
  {
    id: 1,
    folder: 'inbox',
    labels: ['work'],
    from: { name: 'Regina Cooper', email: 'regina_cooper@mail.com' },
    subject: 'Creative Director Resume',
    preview: 'The Arts play a large role in the expression of inner thoughts and beauty in my life...',
    body: [
      'Hello, Regina Cooper!',
      '',
      'I am writing to introduce you to David Boyd. I know you\'ve been looking hard for a candidate for that Creative Director position and I believe David Boyd fits the position.',
      '',
      'David Boyd and I worked together at Apple company, Where they were the senior Creative Director. They did a terrific job there. David Boyd was responsible for completely restructuring both the public-facing and internal websites. They\'d be a great fit at Google company.',
      '',
      'I\'ve attached David Boyd resume and portfolio for your review. You can contact David Boyd at regina_cooper@mail.com',
      '',
      'Thanks for any help you can give.',
      '',
      'Best regards,',
      'Regina Cooper',
    ],
    time: '10:45',
    date: 'May 27, 2020 — 10:45',
    attachments: [
      { name: 'Resume.pdf', size: '570 KB' },
      { name: 'Portfolio.zip', size: '250 MB' },
    ],
    starred: false,
    hasAttachment: true,
  },
  {
    id: 2,
    folder: 'inbox',
    labels: ['friends'],
    from: { name: 'Dustin Williamson', email: 'dustin_williamson@mail.com' },
    subject: 'Meeting with friends',
    preview: 'Hello, Mark! I am writing to introduce you to David Boyd...',
    body: ['Hello, Mark!', '', 'I am writing to introduce you to David Boyd. Hope we can catch up this weekend.'],
    time: '10:40',
    date: 'May 27, 2020 — 10:40',
    attachments: [],
    starred: true,
    hasAttachment: false,
  },
  {
    id: 3,
    folder: 'inbox',
    labels: ['work'],
    from: { name: 'Jane Wilson', email: 'jane_wilson@mail.com' },
    subject: 'UX Conference in New York',
    preview: 'We use the Arts as a means of touching that part of us that we cannot reach with...',
    body: ['Hi there,', '', 'We use the Arts as a means of touching that part of us that we cannot reach with words alone.'],
    time: '09:15',
    date: 'May 27, 2020 — 09:15',
    attachments: [],
    starred: false,
    hasAttachment: false,
  },
  {
    id: 4,
    folder: 'inbox',
    labels: ['social'],
    from: { name: 'Brandon Pena', email: 'brandon_pena@mail.com' },
    subject: "Muzli's weekly design #236",
    preview: 'The arts allow us to be as specific or as abstract as we please. It helps us become...',
    body: ['Weekly inspiration is here.', '', 'The arts allow us to be as specific or as abstract as we please.'],
    time: '09:01',
    date: 'May 27, 2020 — 09:01',
    attachments: [],
    starred: false,
    hasAttachment: true,
  },
  {
    id: 5,
    folder: 'inbox',
    labels: ['work'],
    from: { name: 'Jacob Hawkins', email: 'jacob_hawkins@mail.com' },
    subject: 'Weekly project report',
    preview: 'From dance and music to abstract art our concept of life is shown through the various...',
    body: ['Team,', '', 'Please find the weekly project report attached in this thread.'],
    time: '08:20',
    date: 'May 27, 2020 — 08:20',
    attachments: [{ name: 'Report.pdf', size: '1.2 MB' }],
    starred: false,
    hasAttachment: true,
  },
  {
    id: 6,
    folder: 'inbox',
    labels: ['personal'],
    from: { name: 'Shane Black', email: 'shane_black@mail.com' },
    subject: 'Order Status #24197118',
    preview: 'The arts teach us how to communicate through creative expression...',
    body: ['Your order has shipped.', '', 'The arts teach us how to communicate through creative expression.'],
    time: '08:10',
    date: 'May 27, 2020 — 08:10',
    attachments: [],
    starred: false,
    hasAttachment: false,
  },
  {
    id: 7,
    folder: 'inbox',
    labels: ['social'],
    from: { name: 'Regina Cooper', email: 'regina_cooper@mail.com' },
    subject: 'Welcome to Dribbble!',
    preview: 'The Arts play a large role in the expression of inner thoughts and beauty in my life...',
    body: ['Welcome!', '', 'The Arts play a large role in the expression of inner thoughts and beauty in my life.'],
    time: '08:02',
    date: 'May 27, 2020 — 08:02',
    attachments: [],
    starred: false,
    hasAttachment: false,
  },
]

export default function Mail() {
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [activeLabel, setActiveLabel] = useState(null)
  const [selectedMailId, setSelectedMailId] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Recent')
  const [replyDraft, setReplyDraft] = useState('')
  const [composeMode, setComposeMode] = useState(null)
  const [mobilePanel, setMobilePanel] = useState('list')
  const [iconNavOpen, setIconNavOpen] = useState(false)

  const filteredMails = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const results = seedMails.filter((mail) => {
      const matchesFolder = mail.folder === activeFolder
      const matchesLabel = !activeLabel || mail.labels.includes(activeLabel)
      const matchesQuery =
        !normalizedQuery ||
        mail.from.name.toLowerCase().includes(normalizedQuery) ||
        mail.subject.toLowerCase().includes(normalizedQuery) ||
        mail.preview.toLowerCase().includes(normalizedQuery)

      return matchesFolder && matchesLabel && matchesQuery
    })

    if (sortBy === 'Oldest') {
      return [...results].reverse()
    }

    return results
  }, [activeFolder, activeLabel, searchQuery, sortBy])

  const selectedMail = filteredMails.find((mail) => mail.id === selectedMailId) || filteredMails[0] || null
  const selectedIndex = selectedMail ? filteredMails.findIndex((mail) => mail.id === selectedMail.id) + 1 : 0
  const totalMails = 200

  const openMail = (mailId) => {
    setSelectedMailId(mailId)
    setComposeMode(null)
    setReplyDraft('')
    setMobilePanel('detail')
  }

  const openCompose = () => {
    setComposeMode('new')
    setReplyDraft('')
    setMobilePanel('detail')
  }

  const handleSend = () => {
    if (!replyDraft.trim()) {
      return
    }

    setReplyDraft('')
    setComposeMode(null)
  }

  const goToPreviousMail = () => {
    if (!selectedMail) {
      return
    }

    const currentIndex = filteredMails.findIndex((mail) => mail.id === selectedMail.id)
    if (currentIndex > 0) {
      setSelectedMailId(filteredMails[currentIndex - 1].id)
    }
  }

  const goToNextMail = () => {
    if (!selectedMail) {
      return
    }

    const currentIndex = filteredMails.findIndex((mail) => mail.id === selectedMail.id)
    if (currentIndex < filteredMails.length - 1) {
      setSelectedMailId(filteredMails[currentIndex + 1].id)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-ink-50 text-ink-900">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden"
            onClick={() => setIconNavOpen(true)}
            aria-label="Open navigation"
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
          <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" aria-label="Search">
            <Search size={18} />
          </button>
          <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-50" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
          </button>
          <div className="flex items-center gap-2 border-l border-ink-100 pl-3">
            <Avatar name="ArtTemplate" size="sm" />
            <span className="hidden text-sm font-medium sm:inline">ArtTemplate</span>
            <ChevronDown size={14} className="hidden text-ink-400 sm:inline" />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <IconSidebar open={iconNavOpen} onClose={() => setIconNavOpen(false)} />

        <aside
          className={`${
            mobilePanel === 'folders' ? 'flex' : 'hidden'
          } w-full shrink-0 flex-col border-r border-ink-100 bg-white md:flex md:w-56 lg:w-64`}
        >
          <div className="flex items-center justify-between border-b border-ink-100 p-4 md:hidden">
            <p className="font-medium text-ink-900">Mail Folders</p>
            <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" onClick={() => setMobilePanel('list')} aria-label="Close folders">
              <X size={18} />
            </button>
          </div>
          <div className="p-4">
            <button
              className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-dark text-sm font-semibold uppercase tracking-wide text-white shadow-card hover:bg-brand-green"
              onClick={openCompose}
            >
              New Message
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            <ul className="space-y-1">
              {folders.map((folder) => {
                const Icon = folder.icon
                const isActive = activeFolder === folder.id && !activeLabel

                return (
                  <li key={folder.id}>
                    <button
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive ? 'bg-brand-green/15 font-medium text-brand-dark' : 'text-ink-500 hover:bg-ink-50'
                      }`}
                      onClick={() => {
                        setActiveFolder(folder.id)
                        setActiveLabel(null)
                        setMobilePanel('list')
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} />
                        {folder.label}
                      </span>
                      {folder.count ? (
                        <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {folder.count}
                        </span>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex items-center justify-between px-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Labels</p>
              <button className="text-ink-400 hover:text-ink-700" aria-label="Add label">
                <Plus size={14} />
              </button>
            </div>

            <ul className="mt-2 space-y-1">
              {labels.map((label) => (
                <li key={label.id}>
                  <button
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeLabel === label.id ? 'bg-ink-50 font-medium text-ink-900' : 'text-ink-500 hover:bg-ink-50'
                    }`}
                    onClick={() => {
                      setActiveLabel(label.id)
                      setActiveFolder('inbox')
                      setMobilePanel('list')
                    }}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${label.color}`} />
                    {label.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section
          className={`${
            mobilePanel === 'list' ? 'flex' : 'hidden'
          } w-full shrink-0 flex-col border-r border-ink-100 bg-white md:flex md:w-80 lg:w-[360px] xl:w-[400px]`}
        >
          <div className="border-b border-ink-100 p-4">
            <div className="mb-3 flex items-center gap-2 md:hidden">
              <button
                className="rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
                onClick={() => setMobilePanel('folders')}
              >
                Folders
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex flex-1 items-center gap-2 rounded-xl border border-ink-100 px-3 py-2">
                <Search size={16} className="text-ink-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
                />
              </div>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredMails.length > 0 ? (
              filteredMails.map((mail) => {
                const isSelected = selectedMail?.id === mail.id

                return (
                  <button
                    key={mail.id}
                    type="button"
                    className={`relative flex w-full gap-3 border-b border-ink-100 px-4 py-4 text-left transition-colors ${
                      isSelected ? 'bg-ink-50' : 'hover:bg-ink-50/70'
                    }`}
                    onClick={() => openMail(mail.id)}
                  >
                    {isSelected ? <span className="absolute bottom-0 left-0 top-0 w-1 bg-danger" /> : null}
                    <Avatar name={mail.from.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-medium text-ink-900">{mail.from.name}</p>
                        <span className="shrink-0 text-xs text-ink-400">{mail.time}</span>
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-ink-800">{mail.subject}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-400">{mail.preview}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2 pt-1 text-ink-400">
                      {mail.hasAttachment ? <Paperclip size={14} /> : <span className="h-3.5 w-3.5" />}
                      <button type="button" className="hover:text-ink-700" aria-label="More options" onClick={(event) => event.stopPropagation()}>
                        <MoreVertical size={14} />
                      </button>
                      <Bookmark size={14} className={mail.starred ? 'fill-brand-dark text-brand-dark' : ''} />
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="px-6 py-16 text-center text-sm text-ink-400">No messages in this folder.</div>
            )}
          </div>
        </section>

        <section
          className={`${
            mobilePanel === 'detail' ? 'flex' : 'hidden'
          } min-w-0 flex-1 flex-col bg-white md:flex`}
        >
          {composeMode === 'new' ? (
            <ComposePanel
              onBack={() => {
                setComposeMode(null)
                setMobilePanel('list')
              }}
              draft={replyDraft}
              onDraftChange={setReplyDraft}
              onSend={handleSend}
            />
          ) : selectedMail ? (
            <>
              <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3 md:px-6">
                <button
                  className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 md:hidden"
                  onClick={() => setMobilePanel('list')}
                  aria-label="Back to mail list"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="flex items-center gap-2 text-sm text-ink-500">
                  <button className="rounded-lg p-2 hover:bg-ink-50 disabled:opacity-40" onClick={goToPreviousMail} disabled={selectedIndex <= 1}>
                    <ChevronLeft size={16} />
                  </button>
                  <span>
                    {selectedIndex} of {totalMails}
                  </span>
                  <button
                    className="rounded-lg p-2 hover:bg-ink-50 disabled:opacity-40"
                    onClick={goToNextMail}
                    disabled={selectedIndex >= filteredMails.length}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-ink-400">
                  <button className="rounded-lg p-2 hover:bg-ink-50 hover:text-ink-700" aria-label="Bookmark">
                    <Bookmark size={16} />
                  </button>
                  <button className="rounded-lg p-2 hover:bg-ink-50 hover:text-ink-700" aria-label="Print">
                    <Printer size={16} />
                  </button>
                  <button className="rounded-lg p-2 hover:bg-ink-50 hover:text-ink-700" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
                <div className="flex items-start gap-4">
                  <Avatar name={selectedMail.from.name} size="lg" />
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900">{selectedMail.from.name}</p>
                    <p className="text-sm text-ink-400">{selectedMail.from.email}</p>
                    <p className="mt-1 text-sm text-ink-400">{selectedMail.date}</p>
                  </div>
                </div>

                <h2 className="mt-8 text-2xl font-semibold text-ink-900">{selectedMail.subject}</h2>

                <div className="mt-6 space-y-4 text-sm leading-7 text-ink-600">
                  {selectedMail.body.map((paragraph, index) =>
                    paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />,
                  )}
                </div>

                {selectedMail.attachments.length > 0 ? (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">Attachments</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedMail.attachments.map((attachment) => (
                        <div
                          key={attachment.name}
                          className="flex min-w-[180px] items-center gap-3 rounded-xl border border-ink-100 px-4 py-3"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-500">
                            <Paperclip size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink-800">{attachment.name}</p>
                            <p className="text-xs text-ink-400">{attachment.size}</p>
                          </div>
                          <button className="ml-auto rounded-lg p-2 text-brand-dark hover:bg-brand-green/10" aria-label={`Download ${attachment.name}`}>
                            <DownloadIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <ReplyComposer
                recipient={selectedMail.from.name}
                draft={replyDraft}
                onDraftChange={setReplyDraft}
                onSend={handleSend}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-ink-400">Select a message to read</div>
          )}
        </section>
      </div>
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
        } fixed inset-y-0 left-0 z-50 flex w-16 shrink-0 flex-col items-center border-r border-ink-100 bg-white py-4 transition-transform lg:static lg:translate-x-0`}
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
                  isActive || path === '/mail'
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

function ComposePanel({ onBack, draft, onDraftChange, onSend }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3 md:px-6">
        <button className="rounded-lg p-2 text-ink-500 hover:bg-ink-50" onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-semibold text-ink-900">New Message</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8">
        <div className="space-y-4 border-b border-ink-100 pb-4">
          <RecipientField label="To" value="recipient@mail.com" />
          <RecipientField label="Subject" value="" placeholder="Subject" />
        </div>
      </div>

      <ReplyComposer recipient="" draft={draft} onDraftChange={onDraftChange} onSend={onSend} isCompose />
    </div>
  )
}

function ReplyComposer({ recipient, draft, onDraftChange, onSend, isCompose = false }) {
  return (
    <div className="border-t border-ink-100 bg-white p-4 md:p-6">
      {!isCompose && recipient ? (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-400">To:</span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-1.5 font-medium text-ink-700">
            {recipient}
            <button className="text-ink-400 hover:text-ink-700" aria-label="Remove recipient">
              <X size={12} />
            </button>
          </span>
          <button className="ml-auto text-sm text-ink-400 hover:text-ink-700">Cc</button>
          <button className="text-sm text-ink-400 hover:text-ink-700">Bcc</button>
        </div>
      ) : null}

      <div className="mb-3 flex flex-wrap items-center gap-1 text-ink-400">
        <ToolbarButton icon={ChevronDown} label="Font size" />
        <ToolbarButton icon={Bold} label="Bold" />
        <ToolbarButton icon={Italic} label="Italic" />
        <ToolbarButton icon={Underline} label="Underline" />
        <ToolbarButton icon={Link2} label="Link" />
        <ToolbarButton icon={Smile} label="Emoji" />
        <ToolbarButton icon={Image} label="Image" />
        <ToolbarButton icon={List} label="List" />
      </div>

      <textarea
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Type something"
        className="min-h-[120px] w-full resize-none rounded-xl border border-ink-100 px-4 py-3 text-sm text-ink-700 outline-none placeholder:text-ink-400 focus:border-brand-dark"
      />

      <div className="mt-4 flex items-center gap-3">
        <div className="inline-flex overflow-hidden rounded-xl shadow-card">
          <button
            className="flex h-11 items-center gap-2 bg-brand-dark px-5 text-sm font-medium text-white hover:bg-brand-green"
            onClick={onSend}
          >
            <Send size={16} />
            Send
          </button>
          <button className="flex h-11 items-center justify-center border-l border-brand-green/30 bg-brand-dark px-3 text-white hover:bg-brand-green">
            <Clock size={16} />
          </button>
        </div>
        <button className="rounded-xl border border-ink-100 p-2.5 text-ink-500 hover:bg-ink-50" aria-label="Attach file">
          <Paperclip size={18} />
        </button>
      </div>
    </div>
  )
}

function RecipientField({ label, value, placeholder }) {
  return (
    <div className="flex items-center gap-3 border-b border-ink-100 pb-3 text-sm">
      <span className="w-14 shrink-0 text-ink-400">{label}</span>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-ink-700 outline-none placeholder:text-ink-400"
      />
    </div>
  )
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const options = ['Recent', 'Oldest', 'Unread']

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-xl border border-ink-100 px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
        onClick={() => setOpen((current) => !current)}
      >
        {value}
        <ChevronDown size={14} />
      </button>
      {open ? (
        <div className="absolute right-0 top-11 z-20 min-w-[120px] overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
          {options.map((option) => (
            <button
              key={option}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-ink-50 ${
                option === value ? 'font-medium text-brand-dark' : 'text-ink-500'
              }`}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ToolbarButton({ icon: Icon, label }) {
  return (
    <button className="rounded-lg p-2 hover:bg-ink-50 hover:text-ink-700" aria-label={label}>
      <Icon size={16} />
    </button>
  )
}

function Avatar({ name, size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8 text-[10px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-12 w-12 text-sm',
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] font-semibold text-white ${sizes[size]}`}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v8M8 10l3-3M8 10L5 7M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
