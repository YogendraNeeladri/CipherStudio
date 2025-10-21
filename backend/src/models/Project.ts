import mongoose, { Document, Schema } from 'mongoose'

export interface IProjectFile {
  code: string
}

export interface IProject extends Document {
  projectId: string
  name: string
  files: Record<string, IProjectFile>
  createdAt: Date
  updatedAt: Date
}

const ProjectFileSchema = new Schema<IProjectFile>({
  code: { type: String, required: true }
}, { _id: false })

const ProjectSchema = new Schema<IProject>({
  projectId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  name: { 
    type: String, 
    required: true,
    default: 'Untitled Project'
  },
  files: {
    type: Map,
    of: ProjectFileSchema,
    default: {}
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

// Update the updatedAt field before saving
ProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.model<IProject>('Project', ProjectSchema)
