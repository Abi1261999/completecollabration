import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProjectDetailsView from './ProjectDetailsView'
import { initialProjects } from './projectsData'

export default function ProjectDetailsPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [projectList, setProjectList] = useState(() => location.state?.projectList || initialProjects)

  useEffect(() => {
    if (location.state?.projectList) {
      setProjectList(location.state.projectList)
    }
  }, [location.state])

  const selectedProject = useMemo(
    () => projectList.find((project) => project.id === Number(projectId)) || null,
    [projectId, projectList],
  )

  useEffect(() => {
    if (!selectedProject) {
      navigate('/projects', { replace: true })
    }
  }, [navigate, selectedProject])

  if (!selectedProject) {
    return null
  }

  const navigateWithList = (path) => {
    navigate(path, { state: { projectList } })
  }

  return (
    <div className="h-full min-h-0 overflow-hidden bg-white">
      <ProjectDetailsView
        projects={projectList}
        selectedProject={selectedProject}
        onSelectProject={(id) => navigateWithList(`/projects/${id}`)}
        onClose={() => navigateWithList('/projects')}
        onUpdateProject={(id, updates) => {
          setProjectList((current) => current.map((project) => (project.id === id ? { ...project, ...updates } : project)))
        }}
      />
    </div>
  )
}
