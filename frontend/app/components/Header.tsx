'use client'

import { Save, Download, Upload, Sun, Moon, Play } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  projectId: string
  files: Record<string, { code: string }>
  onSave: () => void
  onLoad: () => void
}

export function Header({ projectId, files, onSave, onLoad }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme()

  const saveProject = async () => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          files,
          name: 'My Project',
        }),
      })
      
      if (response.ok) {
        alert('Project saved successfully!')
      } else {
        alert('Failed to save project')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    }
  }

  const loadProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (response.ok) {
        const project = await response.json()
        // Handle loading project data
        alert('Project loaded successfully!')
      } else {
        alert('Project not found')
      }
    } catch (error) {
      console.error('Error loading project:', error)
      alert('Error loading project')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            CipherStudio
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Project ID: {projectId.slice(0, 8)}...
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={saveProject}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save size={16} />
            <span>Save</span>
          </button>

          <button
            onClick={loadProject}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Upload size={16} />
            <span>Load</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}
