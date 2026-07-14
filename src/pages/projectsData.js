export const TEAM_MEMBERS = ['Shane Black', 'Jane Wilson', 'Regina Cooper', 'Jacob Hawkins', 'Ronald Robertson', 'Judith Black', 'Calvin Flores']

function assignMembers(teamSize, seed = 0) {
  return Array.from({ length: teamSize }, (_, index) => TEAM_MEMBERS[(seed + index) % TEAM_MEMBERS.length])
}

const featuredProjects = [
  {
    id: 1,
    brand: 'dropbox',
    title: 'App Development',
    company: 'Dropbox, Inc.',
    description: 'Create a mobile application on iOS and Android devices.',
    progress: 50,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
    members: ['Jacob Hawkins', 'Jane Wilson', 'Regina Cooper'],
    budget: '2.500.000',
    startDateLabel: '17 Jun, 2020',
    endDateLabel: '04 Jul, 2020',
  },
  {
    id: 2,
    brand: 'gitlab',
    title: 'Website Redesign',
    company: 'GitLab Inc.',
    description: 'Redesign the company website with a modern responsive layout.',
    progress: 75,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
    members: assignMembers(3, 0),
  },
  {
    id: 3,
    brand: 'bitbucket',
    title: 'Landing Page',
    company: 'Bitbucket, Inc.',
    description: 'Build a conversion-focused landing page for the new product launch.',
    progress: 100,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Completed',
    teamSize: 2,
    members: assignMembers(2, 2),
  },
  {
    id: 4,
    brand: 'python',
    title: 'Parser Development',
    company: 'Driveway, Inc.',
    description: 'Develop a data parser to process incoming API payloads efficiently.',
    progress: 50,
    timeLeft: '5 days left',
    urgent: true,
    status: 'Started',
    teamSize: 3,
    members: assignMembers(3, 0),
  },
  {
    id: 5,
    brand: 'slack',
    title: 'App Development',
    company: 'Slack Technologies, Inc.',
    description: 'Create integrations and workflow automations for the Slack platform.',
    progress: 50,
    timeLeft: '5 days left',
    urgent: true,
    status: 'Started',
    teamSize: 2,
    members: assignMembers(2, 4),
  },
  {
    id: 6,
    brand: 'firebase',
    title: 'App Development',
    company: 'Google, Inc.',
    description:
      'The plan for the development of a React Native application project. To develop options (Inbox template, Chat template, tasks template, Projects template) of cool user interface design templates, to work out the smallest details. The main goal of this project is to develop a React Native application with 30 screens.',
    progress: 25,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 2,
    members: ['Regina Cooper', 'Jane Wilson'],
    budget: '2.500.000',
    startTime: '00:00',
    startDate: '12.07.2020',
    endTime: '00:00',
    endDate: '12.07.2020',
  },
  {
    id: 7,
    brand: 'angular',
    title: 'Admin Dashboard',
    company: 'ArtTemplate, Inc.',
    description: 'Design and implement an admin dashboard with role-based access control.',
    progress: 30,
    timeLeft: '2 weeks left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
    members: assignMembers(3, 0),
  },
  {
    id: 8,
    brand: 'vue',
    title: 'Web App on Vue.js',
    company: 'ArtTemplate, Inc.',
    description: 'Deliver a production-ready Vue.js web application for internal teams.',
    progress: 100,
    timeLeft: '3 days left',
    urgent: false,
    status: 'Completed',
    teamSize: 2,
    members: assignMembers(2, 7),
  },
  {
    id: 9,
    brand: 'facebook',
    title: 'App Development',
    company: 'Facebook, Inc.',
    description: 'Develop a Messenger mini-app with real-time chat and media sharing.',
    progress: 50,
    timeLeft: '1 week left',
    urgent: false,
    status: 'Started',
    teamSize: 3,
    members: assignMembers(3, 0),
  },
]

const extraTitles = [
  'API Integration',
  'Mobile UI Kit',
  'Analytics Module',
  'Payment Gateway',
  'CRM Migration',
  'Cloud Deployment',
  'Security Audit',
  'Brand Refresh',
  'Customer Portal',
  'Inventory Sync',
]

const extraCompanies = [
  'Acme Corp.',
  'Northwind LLC',
  'Blue Harbor Ltd.',
  'Summit Digital',
  'Vertex Systems',
  'Horizon Labs',
  'Pulse Media',
  'NovaTech Inc.',
]

const extraBrands = ['dropbox', 'gitlab', 'bitbucket', 'python', 'slack', 'firebase', 'angular', 'vue', 'facebook']

function buildProjects() {
  const projects = [...featuredProjects]
  const statusTargets = { Started: 16, 'On Hold': 4, Completed: 4 }
  const currentCounts = {
    Started: featuredProjects.filter((project) => project.status === 'Started').length,
    'On Hold': featuredProjects.filter((project) => project.status === 'On Hold').length,
    Completed: featuredProjects.filter((project) => project.status === 'Completed').length,
  }

  let id = featuredProjects.length + 1

  Object.entries(statusTargets).forEach(([status, target]) => {
    while (currentCounts[status] < target) {
      const index = id - 1
      projects.push({
        id,
        brand: extraBrands[index % extraBrands.length],
        title: extraTitles[index % extraTitles.length],
        company: extraCompanies[index % extraCompanies.length],
        description: 'Coordinate milestones, deliverables, and stakeholder reviews for this initiative.',
        progress: status === 'Completed' ? 100 : 15 + (index % 75),
        timeLeft: index % 4 === 0 ? '5 days left' : index % 3 === 0 ? '2 weeks left' : '1 week left',
        urgent: index % 4 === 0,
        status,
        teamSize: 2 + (index % 2),
        members: assignMembers(2 + (index % 2), index),
        budget: '2.500.000',
        startTime: '00:00',
        startDate: '12.07.2020',
        endTime: '00:00',
        endDate: '12.07.2020',
      })
      currentCounts[status] += 1
      id += 1
    }
  })

  return projects
}

export function formToProject(form, existingProject = null) {
  const progress =
    form.status === 'Completed' ? 100 : existingProject?.progress ?? (form.status === 'On Hold' ? 30 : 50)

  return {
    id: existingProject?.id ?? Date.now(),
    brand: form.brand,
    title: form.title,
    company: form.company,
    description: form.description,
    progress,
    timeLeft: existingProject?.timeLeft ?? '1 week left',
    urgent: existingProject?.urgent ?? false,
    status: form.status,
    teamSize: form.members.length || 1,
    members: form.members.length > 0 ? form.members : ['Shane Black'],
    budget: form.budget,
    startTime: form.startTime,
    startDate: form.startDate,
    endTime: form.endTime,
    endDate: form.endDate,
  }
}

export const initialProjects = buildProjects()
