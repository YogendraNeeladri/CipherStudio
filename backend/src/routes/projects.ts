import express from 'express'
import Project, { IProject } from '../models/Project'

const router = express.Router()

// Create or update a project
router.post('/', async (req, res) => {
  try {
    const { projectId, name, files } = req.body

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' })
    }

    // Check if project exists
    let project = await Project.findOne({ projectId })

    if (project) {
      // Update existing project
      project.name = name || project.name
      project.files = files || project.files
      project.updatedAt = new Date()
    } else {
      // Create new project
      project = new Project({
        projectId,
        name: name || 'Untitled Project',
        files: files || {},
      })
    }

    await project.save()
    res.json(project)
  } catch (error) {
    console.error('Error saving project:', error)
    res.status(500).json({ error: 'Failed to save project' })
  }
})

// Get a project by ID
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params

    const project = await Project.findOne({ projectId })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// Get all projects (for a user - in a real app, you'd filter by user ID)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ updatedAt: -1 })
      .limit(50) // Limit to 50 most recent projects

    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// Delete a project
router.delete('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params

    const project = await Project.findOneAndDelete({ projectId })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

// Update project name
router.patch('/:projectId/name', async (req, res) => {
  try {
    const { projectId } = req.params
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Project name is required' })
    }

    const project = await Project.findOneAndUpdate(
      { projectId },
      { name, updatedAt: new Date() },
      { new: true }
    )

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    console.error('Error updating project name:', error)
    res.status(500).json({ error: 'Failed to update project name' })
  }
})

export default router
