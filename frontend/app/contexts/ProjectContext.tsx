'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface ProjectFile {
  code: string
}

interface Project {
  id: string
  name: string
  files: Record<string, ProjectFile>
  createdAt: Date
  updatedAt: Date
}

interface ProjectContextType {
  currentProject: Project | null
  projects: Project[]
  createProject: (name: string) => void
  loadProject: (id: string) => void
  saveProject: () => Promise<void>
  updateFile: (fileName: string, code: string) => void
  addFile: (fileName: string, code?: string) => void
  deleteFile: (fileName: string) => void
  isLoading: boolean
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load projects from localStorage on mount
    const savedProjects = localStorage.getItem('cipherstudio-projects')
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects)
        setProjects(parsedProjects)
        
        // Load the most recent project or create a default one
        if (parsedProjects.length > 0) {
          const mostRecent = parsedProjects.sort((a: Project, b: Project) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0]
          setCurrentProject(mostRecent)
        } else {
          createDefaultProject()
        }
      } catch (error) {
        console.error('Error loading projects:', error)
        createDefaultProject()
      }
    } else {
      createDefaultProject()
    }
  }, [])

  const createDefaultProject = () => {
    const defaultProject: Project = {
      id: uuidv4(),
      name: 'My First Project',
      files: {
        'App.js': {
          code: `import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CipherStudio!</h1>
        <p>Start building your React app here.</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="counter-button"
        >
          Count: {count}
        </button>
      </header>
    </div>
  );
}

export default App;`,
        },
        'App.css': {
          code: `.App {
  text-align: center;
  padding: 2rem;
}

.App-header {
  background-color: #282c34;
  padding: 2rem;
  color: white;
  border-radius: 8px;
  margin: 1rem 0;
}

.counter-button {
  background-color: #61dafb;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.counter-button:hover {
  background-color: #21a0c4;
}`,
        },
        'index.js': {
          code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setCurrentProject(defaultProject)
    setProjects([defaultProject])
    saveProjectsToStorage([defaultProject])
  }

  const createProject = (name: string) => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      files: {
        'App.js': {
          code: `import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, ${name}!</h1>
    </div>
  );
}

export default App;`,
        },
        'index.js': {
          code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setCurrentProject(newProject)
    setProjects(prev => [...prev, newProject])
    saveProjectsToStorage([...projects, newProject])
  }

  const loadProject = (id: string) => {
    const project = projects.find(p => p.id === id)
    if (project) {
      setCurrentProject(project)
    }
  }

  const saveProject = async () => {
    if (!currentProject) return
    
    setIsLoading(true)
    try {
      // Update the project's updatedAt timestamp
      const updatedProject = {
        ...currentProject,
        updatedAt: new Date(),
      }
      
      setCurrentProject(updatedProject)
      setProjects(prev => 
        prev.map(p => p.id === updatedProject.id ? updatedProject : p)
      )
      
      // Save to localStorage
      const updatedProjects = projects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      )
      saveProjectsToStorage(updatedProjects)
      
      // TODO: Save to backend API
      console.log('Project saved locally')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFile = (fileName: string, code: string) => {
    if (!currentProject) return
    
    const updatedProject = {
      ...currentProject,
      files: {
        ...currentProject.files,
        [fileName]: { code },
      },
      updatedAt: new Date(),
    }
    
    setCurrentProject(updatedProject)
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    )
  }

  const addFile = (fileName: string, code: string = '') => {
    if (!currentProject) return
    
    const updatedProject = {
      ...currentProject,
      files: {
        ...currentProject.files,
        [fileName]: { code },
      },
      updatedAt: new Date(),
    }
    
    setCurrentProject(updatedProject)
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    )
  }

  const deleteFile = (fileName: string) => {
    if (!currentProject || Object.keys(currentProject.files).length <= 1) return
    
    const updatedFiles = { ...currentProject.files }
    delete updatedFiles[fileName]
    
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date(),
    }
    
    setCurrentProject(updatedProject)
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    )
  }

  const saveProjectsToStorage = (projectsToSave: Project[]) => {
    localStorage.setItem('cipherstudio-projects', JSON.stringify(projectsToSave))
  }

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        projects,
        createProject,
        loadProject,
        saveProject,
        updateFile,
        addFile,
        deleteFile,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
