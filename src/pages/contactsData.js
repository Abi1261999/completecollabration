export const roleBadgeStyles = {
  Manager: 'bg-brand-green/15 text-brand-dark',
  Designer: 'bg-pink-100 text-pink-700',
  'Creative Director': 'bg-amber-100 text-amber-800',
  Developer: 'bg-cyan-100 text-cyan-800',
}

export const avatarGradients = [
  'from-[#E98B70] to-[#C65E43]',
  'from-[#7CB8E8] to-[#4A90C2]',
  'from-[#E8A87C] to-[#C05746]',
  'from-[#9B8FD9] to-[#6B5BB5]',
  'from-[#6EC4A8] to-[#3D9E82]',
  'from-[#E89AC7] to-[#C25E9A]',
  'from-[#F0B27A] to-[#D68910]',
  'from-[#85C1E9] to-[#5499C7]',
]

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const days = Array.from({ length: 31 }, (_, index) => String(index + 1))
export const years = Array.from({ length: 40 }, (_, index) => String(1995 - index))

export const defaultContactForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '+1 (070) 123-4567',
  jobTitle: 'Manager',
  address: '',
  birthDay: '17',
  birthMonth: 'March',
  birthYear: '1995',
  notes: '',
}

const seedContacts = [
  {
    id: 1,
    firstName: 'Regina',
    lastName: 'Cooper',
    email: 'cooper@example.com',
    phone: '+1 (070) 123-4567',
    jobTitle: 'Manager',
    address: 'Sochi, Russia',
    birthDay: '17',
    birthMonth: 'March',
    birthYear: '1995',
    notes: 'Experienced manager with a strong background in team leadership and operations.',
    online: true,
  },
  {
    id: 2,
    firstName: 'Judith',
    lastName: 'Black',
    email: 'black@example.com',
    phone: '+1 (070) 123-8459',
    jobTitle: 'Creative Director',
    address: 'New York, USA',
    birthDay: '12',
    birthMonth: 'June',
    birthYear: '1992',
    notes: 'Creative director focused on brand storytelling and visual identity.',
    online: false,
  },
  {
    id: 3,
    firstName: 'Ronald',
    lastName: 'Robertson',
    email: 'robe@example.com',
    phone: '+1 (070) 123-9221',
    jobTitle: 'Manager',
    address: 'Sydney, Australia',
    birthDay: '17',
    birthMonth: 'March',
    birthYear: '1995',
    notes: 'Operations manager with international project experience.',
    online: true,
  },
  {
    id: 4,
    firstName: 'Dustin',
    lastName: 'Williamson',
    email: 'williams@example.com',
    phone: '+1 (070) 123-0507',
    jobTitle: 'Designer',
    address: 'Berlin, Germany',
    birthDay: '8',
    birthMonth: 'April',
    birthYear: '1994',
    notes: 'Product designer specializing in dashboard and mobile interfaces.',
    online: false,
  },
  {
    id: 5,
    firstName: 'Calvin',
    lastName: 'Flores',
    email: 'flores@example.com',
    phone: '+1 (070) 123-3791',
    jobTitle: 'Developer',
    address: 'New York, USA',
    birthDay: '21',
    birthMonth: 'August',
    birthYear: '1993',
    notes: 'Full-stack developer with React and Node.js expertise.',
    online: true,
  },
  {
    id: 6,
    firstName: 'Robert',
    lastName: 'Edwards',
    email: 'edwards@example.com',
    phone: '+1 (070) 123-1147',
    jobTitle: 'Manager',
    address: 'Shanghai, China',
    birthDay: '3',
    birthMonth: 'November',
    birthYear: '1991',
    notes: 'Regional manager coordinating cross-functional delivery teams.',
    online: false,
  },
  {
    id: 7,
    firstName: 'Jane',
    lastName: 'Wilson',
    email: 'wilson@example.com',
    phone: '+1 (070) 123-2048',
    jobTitle: 'Creative Director',
    address: 'Paris, France',
    birthDay: '25',
    birthMonth: 'September',
    birthYear: '1990',
    notes: 'Creative director leading visual design for enterprise products.',
    online: true,
  },
  {
    id: 8,
    firstName: 'Brandon',
    lastName: 'Pena',
    email: 'pena@example.com',
    phone: '+1 (070) 123-6612',
    jobTitle: 'Designer',
    address: 'London, UK',
    birthDay: '14',
    birthMonth: 'February',
    birthYear: '1996',
    notes: 'UI designer with a focus on design systems and accessibility.',
    online: false,
  },
]

const extraNames = [
  ['Eleanor', 'Pena'],
  ['Cameron', 'Williamson'],
  ['Devon', 'Lane'],
  ['Courtney', 'Henry'],
  ['Marvin', 'McKinney'],
  ['Kristin', 'Watson'],
  ['Albert', 'Flores'],
  ['Brooklyn', 'Simmons'],
  ['Leslie', 'Alexander'],
  ['Jenny', 'Wilson'],
]

const extraLocations = [
  'Tokyo, Japan',
  'Madrid, Spain',
  'Rome, Italy',
  'Dubai, UAE',
  'Seoul, South Korea',
  'Amsterdam, Netherlands',
  'Stockholm, Sweden',
  'Mexico City, Mexico',
]

const jobTitles = ['Manager', 'Designer', 'Developer', 'Creative Director']

export function contactName(contact) {
  return `${contact.firstName} ${contact.lastName}`
}

export function contactBirthday(contact) {
  return `${contact.birthDay} ${contact.birthMonth}, ${contact.birthYear}`
}

export function formFromContact(contact) {
  return {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    jobTitle: contact.jobTitle,
    address: contact.address,
    birthDay: contact.birthDay,
    birthMonth: contact.birthMonth,
    birthYear: contact.birthYear,
    notes: contact.notes,
  }
}

export function createInitialContacts() {
  const extras = Array.from({ length: 92 }, (_, index) => {
    const id = index + 9
    const [firstName, lastName] = extraNames[id % extraNames.length]
    const slug = firstName.toLowerCase()

    return {
      id,
      firstName,
      lastName,
      email: `${slug}${id}@example.com`,
      phone: `+1 (070) 123-${String(1000 + ((id * 137) % 9000)).slice(-4)}`,
      jobTitle: jobTitles[id % jobTitles.length],
      address: extraLocations[id % extraLocations.length],
      birthDay: String((id % 28) + 1),
      birthMonth: months[id % months.length],
      birthYear: String(1996 - (id % 15)),
      notes: 'Professional contact added to the directory.',
      online: id % 3 === 0,
    }
  })

  return [...seedContacts, ...extras]
}

export const favoriteContacts = [
  { name: 'Regina Cooper', role: 'Manager' },
  { name: 'Judith Black', role: 'Creative Director' },
  { name: 'Dustin Williamson', role: 'Designer' },
]
