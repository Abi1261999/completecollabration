import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Bell,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Download,
  Flag,
  Flower2,
  Heart,
  MapPin,
  Menu,
  MoreVertical,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Send,
  Smile,
  Sun,
  Trash2,
  X,
} from 'lucide-react'
import { navItems } from '../navConfig'
import {
  avatarGradients,
  dmMessages,
  getInitialMessages,
  inviteCandidates as inviteCandidatesSeed,
  mediaThumbs,
  people,
  popularEmojis,
  smileyEmojis,
  teamFiles,
  teamMembers,
  teamPhotos,
  teams,
} from './chatData'

export default function Chat() {
  const [activeChat, setActiveChat] = useState({ type: 'team', id: 'designers' })
  const [messagesByChat, setMessagesByChat] = useState({
    'team:designers': teamMessagesFromSeed(),
    'dm:jane': dmMessagesFromSeed(),
  })
  const [draft, setDraft] = useState('')
  const [sidebarQuery, setSidebarQuery] = useState('')
  const [iconNavOpen, setIconNavOpen] = useState(false)
  const [listOpen, setListOpen] = useState(true)
  const [mobilePanel, setMobilePanel] = useState('list')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [inviteCandidates, setInviteCandidates] = useState(inviteCandidatesSeed)
  const [inviteQuery, setInviteQuery] = useState('')
  const [hoveredMessageId, setHoveredMessageId] = useState(null)
  const emojiRef = useRef(null)

  const chatKey = `${activeChat.type}:${activeChat.id}`
  const messages = messagesByChat[chatKey] || getInitialMessages(activeChat.type, activeChat.id)

  const activeTeam = teams.find((team) => team.id === activeChat.id)
  const activePerson = people.find((person) => person.id === activeChat.id)
  const isTeamChat = activeChat.type === 'team'

  const filteredTeams = useMemo(() => {
    const q = sidebarQuery.trim().toLowerCase()
    if (!q) return teams
    return teams.filter((team) => team.name.toLowerCase().includes(q) || team.preview.toLowerCase().includes(q))
  }, [sidebarQuery])

  const filteredPeople = useMemo(() => {
    const q = sidebarQuery.trim().toLowerCase()
    if (!q) return people
    return people.filter(
      (person) => person.name.toLowerCase().includes(q) || person.preview.toLowerCase().includes(q),
    )
  }, [sidebarQuery])

  const filteredInviteCandidates = useMemo(() => {
    const q = inviteQuery.trim().toLowerCase()
    if (!q) return inviteCandidates
    return inviteCandidates.filter((person) => person.name.toLowerCase().includes(q))
  }, [inviteCandidates, inviteQuery])

  const selectedInviteTags = inviteCandidates.filter((person) => person.selected)

  useEffect(() => {
    if (!emojiOpen) return undefined
    const handleClick = (event) => {
      if (!emojiRef.current?.contains(event.target)) {
        setEmojiOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [emojiOpen])

  const selectChat = (type, id) => {
    setActiveChat({ type, id })
    setMobilePanel('chat')
    setDraft('')
    setEmojiOpen(false)
    if (!messagesByChat[`${type}:${id}`]) {
      setMessagesByChat((current) => ({
        ...current,
        [`${type}:${id}`]: getInitialMessages(type, id),
      }))
    }
  }

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'message',
      author: 'ArtTemplate',
      text,
      time: 'Just now',
      own: true,
    }

    setMessagesByChat((current) => ({
      ...current,
      [chatKey]: [...(current[chatKey] || messages), newMessage],
    }))
    setDraft('')
    setEmojiOpen(false)
  }

  const appendEmoji = (emoji) => {
    setDraft((current) => `${current}${emoji}`)
  }

  const toggleInviteCandidate = (id) => {
    setInviteCandidates((current) =>
      current.map((person) => (person.id === id ? { ...person, selected: !person.selected } : person)),
    )
  }

  const removeInviteTag = (id) => {
    setInviteCandidates((current) =>
      current.map((person) => (person.id === id ? { ...person, selected: false } : person)),
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white text-ink-900">
      <IconRail open={iconNavOpen} onClose={() => setIconNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-100 bg-white px-4 md:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden"
            onClick={() => {
              setIconNavOpen(true)
              setListOpen(true)
              setMobilePanel('list')
            }}
            aria-label="Open chat list"
          >
            <Menu size={20} />
          </button>
          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-teal to-brand-green">
              <Flower2 size={18} className="text-white" />
            </div>
            <span className="font-semibold tracking-wide text-ink-900">FLOWER</span>
          </div>

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
              <span className="hidden text-sm font-medium sm:inline">ArtTemplate</span>
              <ChevronDown size={14} className="hidden text-ink-400 sm:inline" />
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {listOpen && mobilePanel !== 'chat' && mobilePanel !== 'info' ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden"
              onClick={() => setListOpen(false)}
              aria-label="Close chat list overlay"
            />
          ) : null}

          <aside
            className={`${
              listOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } fixed inset-y-16 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-ink-100 bg-white transition-transform lg:static lg:inset-auto lg:z-auto lg:flex xl:w-80`}
          >
            <div className="border-b border-ink-100 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-ink-50 px-4 py-3">
                <Search size={16} className="text-ink-400" />
                <input
                  value={sidebarQuery}
                  onChange={(event) => setSidebarQuery(event.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <SectionHeader
                title="Teams"
                onAdd={() => {
                  setInviteOpen(true)
                  setMobilePanel('chat')
                }}
              />
              <ul className="space-y-1">
                {filteredTeams.map((team) => (
                  <ChatListItem
                    key={team.id}
                    active={activeChat.type === 'team' && activeChat.id === team.id}
                    title={team.name}
                    preview={team.preview}
                    unread={team.unread}
                    leading={<TeamBadge letter={team.letter} color={team.color} />}
                    onClick={() => {
                      selectChat('team', team.id)
                      setListOpen(false)
                    }}
                  />
                ))}
              </ul>

              <SectionHeader title="People" className="mt-6" onAdd={() => selectChat('dm', 'jane')} />
              <ul className="space-y-1">
                {filteredPeople.map((person) => (
                  <ChatListItem
                    key={person.id}
                    active={activeChat.type === 'dm' && activeChat.id === person.id}
                    title={person.name}
                    preview={person.preview}
                    unread={person.unread}
                    online={person.online}
                    leading={<Avatar name={person.name} size="sm" online={person.online} />}
                    onClick={() => {
                      selectChat('dm', person.id)
                      setListOpen(false)
                    }}
                  />
                ))}
              </ul>
            </div>
          </aside>

          <main
            className={`min-w-0 flex-1 flex-col bg-ink-50/40 ${
              mobilePanel === 'chat' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-4 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden"
                  onClick={() => {
                    setMobilePanel('list')
                    setListOpen(true)
                  }}
                  aria-label="Back to chat list"
                >
                  <Menu size={18} />
                </button>
                {isTeamChat && activeTeam ? (
                  <TeamBadge letter={activeTeam.letter} color={activeTeam.color} size="md" />
                ) : (
                  <Avatar name={activePerson?.name || 'Contact'} size="md" online={activePerson?.online} />
                )}
                <div>
                  <p className="font-semibold text-ink-900">{isTeamChat ? activeTeam?.name : activePerson?.name}</p>
                  {!isTeamChat && activePerson?.role ? <p className="text-xs text-ink-400">{activePerson.role}</p> : null}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded-lg p-2 text-ink-500 hover:bg-ink-50"
                  onClick={() => setInviteOpen(true)}
                  aria-label="Invite members"
                >
                  <Plus size={18} />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden"
                  onClick={() => setMobilePanel('info')}
                  aria-label="Open chat info"
                >
                  <MoreVertical size={18} />
                </button>
                <button type="button" className="hidden rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:inline-flex" aria-label="More options">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
              <div className="mx-auto max-w-3xl space-y-5">
                {messages.map((item) => {
                  if (item.type === 'divider') {
                    return <DateDivider key={item.id} label={item.label} />
                  }

                  return (
                    <MessageBubble
                      key={item.id}
                      item={item}
                      variant={isTeamChat ? 'team' : 'dm'}
                      hovered={hoveredMessageId === item.id}
                      onHover={() => setHoveredMessageId(item.id)}
                      onLeave={() => setHoveredMessageId(null)}
                    />
                  )
                })}
              </div>
            </div>

            <div className="relative border-t border-ink-100 bg-white px-4 py-4 md:px-6">
              {emojiOpen ? (
                <div ref={emojiRef} className="absolute bottom-full left-4 right-4 mb-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-2xl md:left-6 md:right-auto md:w-[320px]">
                  <div className="mb-3 flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2">
                    <Search size={14} className="text-ink-400" />
                    <input placeholder="Search emoji" className="w-full bg-transparent text-sm outline-none" />
                  </div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Popular</p>
                  <div className="mb-4 grid grid-cols-8 gap-1">
                    {popularEmojis.map((emoji) => (
                      <button key={emoji} type="button" className="rounded-lg p-1.5 text-lg hover:bg-ink-50" onClick={() => appendEmoji(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Smileys</p>
                  <div className="grid grid-cols-8 gap-1">
                    {smileyEmojis.map((emoji) => (
                      <button key={emoji} type="button" className="rounded-lg p-1.5 text-lg hover:bg-ink-50" onClick={() => appendEmoji(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-ink-400">
                    <Clock size={16} />
                    <Smile size={16} />
                    <Heart size={16} />
                    <Coffee size={16} />
                    <Sun size={16} />
                    <MapPin size={16} />
                    <Flag size={16} />
                  </div>
                </div>
              ) : null}

              <form
                className="mx-auto flex max-w-3xl items-center gap-3"
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage()
                }}
              >
                <button type="button" className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-600" aria-label="Attach file">
                  <Paperclip size={18} />
                </button>
                <button
                  type="button"
                  className={`rounded-lg p-2 hover:bg-ink-50 ${emojiOpen ? 'bg-ink-50 text-brand-dark' : 'text-ink-400 hover:text-ink-600'}`}
                  onClick={() => setEmojiOpen((open) => !open)}
                  aria-label="Add emoji"
                >
                  <Smile size={18} />
                </button>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type a message here..."
                  className="min-w-0 flex-1 rounded-xl border border-ink-100 bg-ink-50 px-4 py-3 text-sm outline-none placeholder:text-ink-400 focus:border-brand-dark focus:bg-white"
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white hover:bg-brand-green"
                  aria-label="Send message"
                >
                  <Send size={17} fill="currentColor" />
                </button>
              </form>
            </div>
          </main>

          <aside
            className={`${
              mobilePanel === 'info' ? 'flex' : 'hidden'
            } w-full shrink-0 flex-col border-l border-ink-100 bg-white lg:flex lg:w-72 xl:w-80`}
          >
            <div className="flex items-center justify-between border-b border-ink-100 p-4 lg:hidden">
              <button type="button" className="text-sm text-ink-500" onClick={() => setMobilePanel('chat')}>
                Back
              </button>
              <p className="font-medium">Details</p>
              <span className="w-10" />
            </div>

            {isTeamChat && activeTeam ? (
              <TeamInfoPanel team={activeTeam} onInvite={() => setInviteOpen(true)} />
            ) : (
              <PersonInfoPanel person={activePerson || people[1]} />
            )}
          </aside>
        </div>
      </div>

      {inviteOpen ? (
        <InviteModal
          teamName={activeTeam?.name || '#Designers'}
          query={inviteQuery}
          onQueryChange={setInviteQuery}
          selectedTags={selectedInviteTags}
          candidates={filteredInviteCandidates}
          onToggle={toggleInviteCandidate}
          onRemoveTag={removeInviteTag}
          onClose={() => setInviteOpen(false)}
        />
      ) : null}
    </div>
  )
}

function teamMessagesFromSeed() {
  return getInitialMessages('team', 'designers')
}

function dmMessagesFromSeed() {
  return getInitialMessages('dm', 'jane')
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
                  isActive || path === '/chat'
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

function SectionHeader({ title, onAdd, className = '' }) {
  return (
    <div className={`mb-2 flex items-center justify-between px-2 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{title}</p>
      <button type="button" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-600" onClick={onAdd} aria-label={`Add ${title}`}>
        <Plus size={14} />
      </button>
    </div>
  )
}

function ChatListItem({ active, title, preview, unread, leading, online, onClick }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
          active ? 'bg-ink-50' : 'hover:bg-ink-50/70'
        }`}
      >
        <div className="relative shrink-0">{leading}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-ink-900">{title}</p>
            {unread ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-semibold text-white">
                {unread}
              </span>
            ) : null}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-ink-400">{preview}</p>
        </div>
      </button>
    </li>
  )
}

function TeamBadge({ letter, color, size = 'sm', className = '' }) {
  const sizes = { sm: 'h-10 w-10 text-sm', md: 'h-11 w-11 text-base' }
  return (
    <div className={`flex items-center justify-center rounded-full font-semibold text-white ${sizes[size]} ${color} ${className}`}>
      {letter}
    </div>
  )
}

function MessageBubble({ item, variant, hovered, onHover, onLeave }) {
  const isOwn = item.own
  const teamLayout = variant === 'team'
  const alignRight = teamLayout ? !isOwn : isOwn
  const useGreen = teamLayout ? isOwn : !isOwn

  return (
    <div
      className={`group flex items-end gap-3 ${alignRight ? 'flex-row-reverse' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Avatar name={item.author} size="xs" />
      <div className={`max-w-[85%] sm:max-w-[75%] ${alignRight ? 'items-end text-right' : 'items-start text-left'} flex flex-col`}>
        {hovered && isOwn ? (
          <div className={`mb-1 flex items-center gap-1 ${alignRight ? 'flex-row-reverse' : ''}`}>
            <button type="button" className="rounded p-1 text-ink-400 hover:bg-white hover:text-ink-600" aria-label="Edit message">
              <Pencil size={14} />
            </button>
            <button type="button" className="rounded p-1 text-ink-400 hover:bg-white hover:text-ink-600" aria-label="Delete message">
              <Trash2 size={14} />
            </button>
          </div>
        ) : null}

        {item.type === 'message' ? (
          <div
            className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              useGreen ? 'bg-brand-dark text-white' : 'border border-ink-100 bg-white text-ink-700 shadow-card'
            }`}
          >
            {item.text}
          </div>
        ) : null}

        {item.type === 'file' ? (
          <div className={`overflow-hidden rounded-2xl ${useGreen ? 'bg-brand-green/15' : 'border border-ink-100 bg-white shadow-card'}`}>
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-ink-800">{item.fileName}</p>
              <p className="text-xs text-ink-400">{item.fileSize}</p>
            </div>
            <button type="button" className="flex w-full items-center justify-center gap-2 bg-brand-dark px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-green">
              <Download size={15} />
              Download
            </button>
          </div>
        ) : null}

        {item.type === 'gallery' ? (
          <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
            {item.text ? <p className="px-4 pt-3 text-sm text-ink-700">{item.text}</p> : null}
            <div className="grid grid-cols-3 gap-2 p-3">
              {teamPhotos.map((photo) => (
                <div key={photo.id} className={`aspect-square rounded-lg bg-gradient-to-br ${photo.gradient}`} />
              ))}
              <div className="flex aspect-square items-center justify-center rounded-lg bg-brand-green/15 text-sm font-semibold text-brand-dark">
                +3
              </div>
            </div>
          </div>
        ) : null}

        <p className="mt-1 text-xs text-ink-400">{item.time}</p>
      </div>
    </div>
  )
}

function DateDivider({ label }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="h-px flex-1 bg-ink-200" />
      <span className="text-xs font-medium text-ink-400">{label}</span>
      <span className="h-px flex-1 bg-ink-200" />
    </div>
  )
}

function TeamInfoPanel({ team, onInvite }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="text-center">
        <TeamBadge letter={team.letter} color={team.color} size="md" className="mx-auto h-20 w-20 text-2xl" />
        <h2 className="mt-4 text-lg font-semibold text-ink-900">{team.name}</h2>
        <p className="text-sm text-ink-400">Members (8)</p>
        <button type="button" className="mt-4 text-sm font-medium text-brand-dark hover:underline" onClick={onInvite}>
          Invite members
        </button>
      </div>

      <InfoSection title="Files">
        <ul className="space-y-3">
          {teamFiles.map((file) => (
            <li key={file.id} className="flex items-center gap-3">
              <FileIcon type={file.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-800">{file.name}</p>
                <p className="text-xs text-ink-400">{file.size}</p>
              </div>
            </li>
          ))}
        </ul>
      </InfoSection>

      <InfoSection title="Photos">
        <div className="grid grid-cols-3 gap-2">
          {teamPhotos.map((photo) => (
            <div key={photo.id} className={`aspect-square rounded-lg bg-gradient-to-br ${photo.gradient}`} />
          ))}
        </div>
      </InfoSection>

      <InfoSection title="Members">
        <ul className="space-y-3">
          {teamMembers.map((member) => (
            <li key={member.name} className="flex items-center gap-3">
              <Avatar name={member.name} size="sm" online={member.online} />
              <div>
                <p className="text-sm font-medium text-ink-800">{member.name}</p>
                <p className="text-xs text-ink-400">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </InfoSection>
    </div>
  )
}

function PersonInfoPanel({ person }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="text-center">
        <Avatar name={person.name} size="xl" online={person.online} className="mx-auto" />
        <h2 className="mt-4 text-lg font-semibold text-ink-900">{person.name}</h2>
        <p className="text-sm text-ink-400">{person.role || 'Contact'}</p>
      </div>

      <InfoSection title="Info">
        <dl className="space-y-4 text-sm">
          <InfoItem label="Email" value={person.email || 'wilson@example.com'} />
          <InfoItem label="Phone" value={person.phone || '+1 (070) 123-2048'} />
          <InfoItem label="Birthday" value={person.birthday || '17 March, 1995'} />
          <InfoItem label="Location" value={person.location || 'New York, NY'} />
        </dl>
      </InfoSection>

      <InfoSection title="Media">
        <div className="grid grid-cols-3 gap-2">
          {mediaThumbs.map((gradient, index) => (
            <div key={gradient + index} className={`aspect-square rounded-lg bg-gradient-to-br ${gradient}`} />
          ))}
        </div>
      </InfoSection>
    </div>
  )
}

function InfoSection({ title, children }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{title}</h3>
        <button type="button" className="text-xs font-medium text-brand-dark hover:underline">
          View All
        </button>
      </div>
      {children}
    </section>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{label}</dt>
      <dd className="mt-1 font-medium text-ink-800">{value}</dd>
    </div>
  )
}

function InviteModal({ teamName, query, onQueryChange, selectedTags, candidates, onToggle, onRemoveTag, onClose }) {
  const invitedCount = candidates.filter((person) => person.selected).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close invite dialog" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-ink-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Invite New Members</h2>
            <p className="mt-1 text-sm text-ink-500">
              Invite Members to <span className="font-medium text-ink-800">{teamName.replace('#', '')}</span> Team
            </p>
          </div>
          <button type="button" className="rounded-lg p-2 text-ink-400 hover:bg-ink-50" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 sm:px-6">
          <div className="flex min-h-[48px] flex-wrap items-center gap-2 rounded-xl border border-ink-100 px-3 py-2">
            {selectedTags.map((person) => (
              <span key={person.id} className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2 py-1 text-sm text-ink-700">
                {person.name}
                <button type="button" onClick={() => onRemoveTag(person.id)} aria-label={`Remove ${person.name}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={selectedTags.length ? '' : 'Search members'}
              className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
            <Search size={16} className="shrink-0 text-ink-400" />
          </div>

          <p className="mt-5 text-sm font-medium text-ink-700">Invited({invitedCount})</p>
          <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto">
            {candidates.map((person) => (
              <li key={person.id}>
                <button
                  type="button"
                  onClick={() => onToggle(person.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-ink-50"
                >
                  <Avatar name={person.name} size="sm" />
                  <span className="flex-1 text-left text-sm font-medium text-ink-800">{person.name}</span>
                  {person.selected ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-white">
                      <Check size={14} />
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded-full border border-ink-200" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-6 h-11 rounded-xl bg-brand-dark px-6 text-sm font-medium text-white hover:bg-brand-green"
            onClick={onClose}
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  )
}

function FileIcon({ type }) {
  const styles = {
    pdf: 'bg-red-500 text-white',
    psd: 'bg-sky-500 text-[#001E36]',
    figma: 'bg-purple-500 text-white',
  }
  const labels = { pdf: 'PDF', psd: 'Ps', figma: 'Fg' }

  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold ${styles[type] || 'bg-ink-100 text-ink-600'}`}>
      {labels[type] || 'FILE'}
    </div>
  )
}

function Avatar({ name, size = 'md', online = false, className = '' }) {
  const sizes = {
    xs: 'h-8 w-8 text-[10px] rounded-full',
    sm: 'h-10 w-10 text-xs rounded-full',
    md: 'h-11 w-11 text-sm rounded-full',
    xl: 'h-24 w-24 text-2xl rounded-full',
  }
  const gradient = avatarGradients[name.length % avatarGradients.length]

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center justify-center bg-gradient-to-br font-semibold text-white ${sizes[size]} ${gradient}`}>
        {name
          .split(' ')
          .map((part) => part[0])
          .join('')}
      </div>
      {online ? <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green" /> : null}
    </div>
  )
}
