'use client'

import { useState } from 'react'
import { 
  File, 
  Folder, 
  Plus, 
  Trash2, 
  FileText, 
  FileCode,
  FolderOpen,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

interface FileExplorerProps {
  files: Record<string, { code: string }>
  activeFile: string
  onFileSelect: (fileName: string) => void
  onAddFile: (fileName: string) => void
  onDeleteFile: (fileName: string) => void
}

export function FileExplorer({ 
  files, 
  activeFile, 
  onFileSelect, 
  onAddFile, 
  onDeleteFile 
}: FileExplorerProps) {
  const [isAddingFile, setIsAddingFile] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']))

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <FileCode size={16} className="text-blue-500" />
      case 'css':
        return <FileCode size={16} className="text-green-500" />
      case 'json':
        return <FileCode size={16} className="text-yellow-500" />
      default:
        return <FileText size={16} className="text-gray-500" />
    }
  }

  const handleAddFile = () => {
    if (newFileName.trim()) {
      const fileName = newFileName.includes('.') ? newFileName : `${newFileName}.js`
      onAddFile(fileName)
      setNewFileName('')
      setIsAddingFile(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddFile()
    } else if (e.key === 'Escape') {
      setIsAddingFile(false)
      setNewFileName('')
    }
  }

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpandedFolders(newExpanded)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Files
          </h2>
          <button
            onClick={() => setIsAddingFile(true)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        
        {isAddingFile && (
          <div className="mb-2">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="filename.js"
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              autoFocus
            />
            <div className="flex space-x-1 mt-1">
              <button
                onClick={handleAddFile}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingFile(false)
                  setNewFileName('')
                }}
                className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {/* Root files */}
          {Object.keys(files)
            .filter(fileName => !fileName.includes('/'))
            .map(fileName => (
              <div
                key={fileName}
                className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer group ${
                  activeFile === fileName
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => onFileSelect(fileName)}
              >
                {getFileIcon(fileName)}
                <span className="text-sm flex-1 truncate">{fileName}</span>
                {Object.keys(files).length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteFile(fileName)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-all"
                  >
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
