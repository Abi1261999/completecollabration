export const avatarGradients = [
  'from-[#E98B70] to-[#C65E43]',
  'from-[#7CB8E8] to-[#4A90C2]',
  'from-[#E8A87C] to-[#C05746]',
  'from-[#9B8FD9] to-[#6B5BB5]',
  'from-[#6EC4A8] to-[#3D9E82]',
  'from-[#E89AC7] to-[#C25E9A]',
]

export const teams = [
  {
    id: 'managers',
    name: '#Managers',
    letter: 'M',
    color: 'bg-sky-500',
    preview: 'Judith: We need to finish the quarterly report...',
    unread: 0,
  },
  {
    id: 'designers',
    name: '#Designers',
    letter: 'D',
    color: 'bg-brand-dark',
    preview: 'Regina: Brand Styles Guide is ready for review',
    unread: 4,
  },
]

export const people = [
  {
    id: 'regina',
    name: 'Regina Cooper',
    preview: 'The Arts play a large role in the expression...',
    online: true,
    unread: 0,
  },
  {
    id: 'jane',
    name: 'Jane Wilson',
    role: 'Creative Director',
    preview: 'We need to develop several options...',
    online: true,
    unread: 4,
    email: 'wilson@example.com',
    phone: '+1 (070) 123-2048',
    birthday: '17 March, 1995',
    location: 'New York, NY',
  },
  {
    id: 'dustin',
    name: 'Dustin Williamson',
    preview: 'Hello, Mark! I am writing to introduce you...',
    online: false,
    unread: 0,
  },
  {
    id: 'judith',
    name: 'Judith Black',
    preview: 'Quarterly planning meeting with Judith...',
    online: true,
    unread: 0,
  },
  {
    id: 'ronald',
    name: 'Ronald Robertson',
    preview: 'Follow-up call regarding the onboarding...',
    online: false,
    unread: 0,
  },
]

export const inviteCandidates = [
  { id: 'shane', name: 'Shane Black', selected: true },
  { id: 'regina', name: 'Regina Cooper', selected: true },
  { id: 'jane1', name: 'Jane Wilson', selected: true },
  { id: 'jane2', name: 'Jane Wilson', selected: true },
  { id: 'dustin', name: 'Dustin Williamsonk', selected: true },
  { id: 'brandon', name: 'Brandon Pena', selected: true },
  { id: 'calvin', name: 'Calvin Flores', selected: false },
  { id: 'robert', name: 'Robert Edwards', selected: false },
]

export const teamFiles = [
  { id: 'f1', name: 'Brand Styles Guide.pdf', size: '487 KB', type: 'pdf' },
  { id: 'f2', name: 'Dashboard UI Kit.psd', size: '12.4 MB', type: 'psd' },
  { id: 'f3', name: 'Rocket - Admin Dashboard.fig', size: '2.4 MB', type: 'figma' },
]

export const teamPhotos = [
  { id: 'p1', gradient: 'from-amber-200 to-orange-300' },
  { id: 'p2', gradient: 'from-sky-200 to-blue-300' },
  { id: 'p3', gradient: 'from-emerald-200 to-teal-300' },
]

export const teamMembers = [
  { name: 'Regina Cooper', role: 'UI/UX Designer', online: true },
  { name: 'Jane Wilson', role: 'Creative Director', online: true },
  { name: 'Dustin Williamson', role: 'Project Manager', online: false },
  { name: 'Judith Black', role: 'Product Designer', online: true },
]

export const mediaThumbs = [
  'from-violet-200 to-purple-300',
  'from-rose-200 to-pink-300',
  'from-cyan-200 to-sky-300',
  'from-lime-200 to-green-300',
  'from-orange-200 to-amber-300',
  'from-indigo-200 to-blue-300',
]

export const popularEmojis = ['😀', '😁', '😂', '🤣', '😊', '😍', '😘', '😎', '🤔', '😢']
export const smileyEmojis = ['🙂', '🙃', '😉', '😇', '🥰', '😋', '🤗', '🤩', '😏', '😌']

export const teamMessages = [
  { id: 'd1', type: 'divider', label: '1 day ago' },
  {
    id: 'd2',
    type: 'message',
    author: 'Regina Cooper',
    text: 'The Arts play a large role in the expression of inner thoughts and beauty in my life.',
    time: '1 day ago',
    own: false,
  },
  {
    id: 'd3',
    type: 'message',
    author: 'ArtTemplate',
    text: 'Hi everyone! I just uploaded the latest dashboard screens.',
    time: '1 day ago',
    own: true,
  },
  { id: 'd4', type: 'divider', label: 'Today' },
  {
    id: 'd5',
    type: 'message',
    author: 'Regina Cooper',
    text: 'Brand Styles Guide is ready for review 👋',
    time: '2 min ago',
    own: false,
  },
  {
    id: 'd6',
    type: 'file',
    author: 'Regina Cooper',
    fileName: 'Brand Styles Guide.pdf',
    fileSize: '487 KB',
    time: '2 min ago',
    own: false,
  },
  {
    id: 'd7',
    type: 'message',
    author: 'ArtTemplate',
    text: 'Thanks Regina! I will check it right away.',
    time: '1 min ago',
    own: true,
  },
]

export const dmMessages = [
  { id: 'j1', type: 'divider', label: '1 day ago' },
  {
    id: 'j2',
    type: 'message',
    author: 'Jane Wilson',
    text: 'We need to develop several options of cool user interface design templates.',
    time: '1 day ago',
    own: false,
  },
  {
    id: 'j3',
    type: 'message',
    author: 'ArtTemplate',
    text: 'Hi Jane! Yes. I just finished developing the "Chat" template.',
    time: '1 day ago',
    own: true,
  },
  { id: 'j4', type: 'divider', label: 'Today' },
  {
    id: 'j5',
    type: 'message',
    author: 'Jane Wilson',
    text: 'Great work! Can you also share the media assets?',
    time: '2 min ago',
    own: false,
  },
  {
    id: 'j6',
    type: 'gallery',
    author: 'ArtTemplate',
    text: 'Here are the latest mockups from the sprint.',
    images: 6,
    time: '1 min ago',
    own: true,
  },
  {
    id: 'j7',
    type: 'file',
    author: 'Jane Wilson',
    fileName: 'Brand Styles Guide.pdf',
    fileSize: '487 KB',
    time: '1 min ago',
    own: false,
  },
]

export function getInitialMessages(chatType, chatId) {
  if (chatType === 'team' && chatId === 'designers') return teamMessages
  if (chatType === 'dm' && chatId === 'jane') return dmMessages
  return [
    {
      id: 'default',
      type: 'message',
      author: 'System',
      text: 'Start a new conversation.',
      time: 'Now',
      own: false,
    },
  ]
}
