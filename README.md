
# CipherStudio - Browser-Based React IDE

A modern, browser-based React IDE that allows users to create, edit, and run React projects directly in their browser. Built with Next.js, Monaco Editor, and Sandpack.

## Features

### Core Features
- **File Management**: Create, delete, and organize project files
- **Code Editor**: Rich code editor powered by Monaco Editor with syntax highlighting
- **Live Preview**: Real-time React project preview using Sandpack
- **Save & Load Projects**: Persistent project storage with MongoDB
- **Theme Support**: Dark and light theme switching
- **Responsive UI**: Works on desktop and tablet screens

### Technical Features
- **Monaco Editor Integration**: Full-featured code editor with IntelliSense
- **Sandpack Integration**: Secure React code execution and live preview
- **Project Persistence**: Save projects to MongoDB with unique project IDs
- **Real-time Updates**: Live code execution as you type
- **File System**: Virtual file system for managing project files

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code editor in the browser
- **Sandpack** - Secure code execution environment
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **TypeScript** - Type-safe backend development

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CipherStudio
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cipherstudio
   NODE_ENV=development
   ```

   Create `frontend/.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Production Deployment

#### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`
3. Deploy

#### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
3. Deploy

## Project Structure

```
CipherStudio/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router directory
│   │   ├── api/            # API routes (proxy to backend)
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend application
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Server entry point
│   └── package.json
└── package.json            # Root package.json with workspaces
```

## API Endpoints

### Projects
- `POST /api/projects` - Create or update a project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:projectId` - Get a specific project
- `DELETE /api/projects/:projectId` - Delete a project
- `PATCH /api/projects/:projectId/name` - Update project name

## Usage

1. **Create a new project**: The IDE starts with a default React project
2. **Edit files**: Click on files in the file explorer to edit them
3. **Add files**: Use the "+" button to add new files
4. **Delete files**: Hover over files and click the trash icon
5. **Save project**: Click the "Save" button to persist your project
6. **Load project**: Click the "Load" button to retrieve saved projects
7. **Switch themes**: Use the theme toggle button in the header

## Features in Detail

### Code Editor
- Syntax highlighting for JavaScript, TypeScript, CSS, HTML, and JSON
- IntelliSense and auto-completion
- Bracket matching and error detection
- Custom themes (dark/light)
- Responsive design

### Live Preview
- Real-time code execution
- Hot reloading
- Console output
- Error handling
- Responsive preview

### File Management
- Virtual file system
- File creation and deletion
- File type detection
- Icon-based file identification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Sandpack](https://sandpack.codesandbox.io/) - Code execution environment
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
=======
# CipherStudio
>>>>>>> ddfcb639d45e506ab3a98b944203d60c3c59cdfc
