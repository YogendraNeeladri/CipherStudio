'use client'

import { useState } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { MonacoEditor } from './components/MonacoEditor'
import { FileExplorer } from './components/FileExplorer'
import { Header } from './components/Header'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProjectProvider, useProject } from './contexts/ProjectContext'

function CipherStudioApp() {
  const { currentProject, updateFile, addFile, deleteFile, saveProject } = useProject()
  const [activeFile, setActiveFile] = useState('App.js')

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading CipherStudio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        projectId={currentProject.id}
        files={currentProject.files}
        onSave={saveProject}
        onLoad={() => {}}
      />
      
      <div className="flex h-screen pt-16">
        {/* File Explorer Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <FileExplorer
            files={currentProject.files}
            activeFile={activeFile}
            onFileSelect={setActiveFile}
            onAddFile={addFile}
            onDeleteFile={deleteFile}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
            <MonacoEditor
              fileName={activeFile}
              code={currentProject.files[activeFile]?.code || ''}
              onChange={(code) => updateFile(activeFile, code)}
            />
          </div>

          {/* Live Preview */}
          <div className="w-1/2">
            <div className="h-full">
              <Sandpack
                template="react"
                files={currentProject.files}
                options={{
                  showNavigator: false,
                  showRefreshButton: true,
                  showConsoleButton: true,
                  showConsole: true,
                  showTabs: false,
                  closableTabs: false,
                  initMode: 'lazy',
                  bundlerURL: 'https://bundler.ecmascript.org/',
                }}
                theme="auto"
                customSetup={{
                  dependencies: {
                    'react': '^18.0.0',
                    'react-dom': '^18.0.0',
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <CipherStudioApp />
      </ProjectProvider>
    </ThemeProvider>
  )
}
