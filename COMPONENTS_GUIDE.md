# Frontend Implementation - Remaining Components Guide

This document outlines all remaining components that need to be created for the complete frontend implementation.

## Completed Components
✅ API Layer (client, auth, tasks, assignments, reports)
✅ State Management (Zustand stores)
✅ Utilities (constants, formatters)
✅ Common Components (Button, Input, Badge, Modal, Loading, ErrorAlert, EmptyState)
✅ Layout (Navbar, Sidebar)
✅ Board Components (KanbanBoard, BoardColumn, TaskCard)

## Components Still to Build

### 1. Task Management Components

#### TaskModal.jsx
```jsx
// Shows task details in a modal
// Features:
// - Display full task information
// - Edit task (admin only)
// - Update status (admin or assigned member)
// - Manage assignments (admin only)
// - Delete task (admin only)
// - Close modal button

Props:
- isOpen: boolean
- onClose: function
- task: Task object
- onTasksChange: callback to refresh parent
```

#### TaskForm.jsx
```jsx
// Form for creating/editing tasks
// Features:
// - Text input for title
// - Textarea for description
// - Bucket dropdown selector
// - Priority selector
// - Date picker for due date
// - Tag input
// - User assignment multiselect

Props:
- task: Task object (optional, for editing)
- onSubmit: function(taskData)
- onCancel: function
- isLoading: boolean
```

#### AssigneeSelect.jsx
```jsx
// Multi-select component for assigning users
// Features:
// - Dropdown of all users
// - Ability to assign to "everyone"
// - Remove individual assignees
// - Search/filter users

Props:
- value: string[] (array of user IDs)
- onChange: function(userIds)
- disabled: boolean
```

#### BucketSelect.jsx
```jsx
// Dropdown selector for task bucket
// Features:
// - All 5 buckets with icons
// - Colored badges
// - Keyboard accessible

Props:
- value: string
- onChange: function(bucket)
```

### 2. Auth Components

#### LoginForm.jsx
```jsx
// Login form for authentication
// Features:
// - Email input
// - Password input
// - Submit button
// - Error display
// - Link to register

Props:
- onSubmit: function(email, password)
- isLoading: boolean
- error: string
```

#### RegisterForm.jsx
```jsx
// Registration form
// Features:
// - Name input
// - Email input
// - Password input
// - Confirm password
// - Submit button
// - Link to login

Props:
- onSubmit: function(name, email, password)
- isLoading: boolean
- error: string
```

#### ProtectedRoute.jsx
```jsx
// Route wrapper for authentication
// Features:
// - Check if user is authenticated
// - Redirect to login if not
// - Check user role for admin routes
// - Render children if authorized

Props:
- adminOnly: boolean (optional)
- children: React.ReactNode
```

### 3. Report Components

#### ReportCard.jsx
```jsx
// Summary card showing report statistics
// Features:
// - Count of tasks
// - Task list preview
// - Link to full report

Props:
- title: string
- count: number
- tasks: Task[]
- icon: string
- variant: 'overdue' | 'today' | 'future'
```

#### TaskList.jsx
```jsx
// List of tasks with filters
// Features:
// - Sortable table or list
// - Filter by bucket
// - Filter by status
// - Click to view details
// - Empty state

Props:
- tasks: Task[]
- onTaskClick: function(task)
- loading: boolean
- filters: object
```

#### FilterBar.jsx
```jsx
// Filter controls for reports
// Features:
// - Bucket dropdown
// - Status dropdown
// - Date range picker
// - Apply/reset buttons

Props:
- filters: object
- onFilterChange: function(filters)
```

### 4. Team Management Components

#### InviteForm.jsx
```jsx
// Form to invite new users
// Features:
// - Email input
// - Name input
// - Role selector (Admin/Member)
// - Submit button
// - Success message

Props:
- onSubmit: function(email, name, role)
- isLoading: boolean
- error: string
```

#### UserCard.jsx
```jsx
// Card showing user information
// Features:
// - User avatar
// - User name and email
// - Role badge
// - Last login
// - Action buttons (edit, remove)

Props:
- user: User object
- onAction: function(action, userId)
```

#### UserList.jsx
```jsx
// List of team members
// Features:
// - Grid or table of users
// - Sort by name/role
// - Search users
// - Empty state

Props:
- users: User[]
- onUserAction: function
- loading: boolean
```

### 5. Page Components

#### LoginPage.jsx
```jsx
// Full login page
// - Hero section
// - Login form
// - Redirect if already logged in
```

#### RegisterPage.jsx
```jsx
// Full registration page
// - Hero section
// - Register form
// - Redirect if already logged in
```

#### BoardPage.jsx
```jsx
// Main board page
// - KanbanBoard component
// - Bucket selector
// - Create task modal
// - Task details modal
```

#### ReportsPage.jsx
```jsx
// Reports and analytics page
// Features:
// - Summary cards (overdue, due today, future)
// - Detailed task lists
// - Filter options
// - Export option (future)
```

#### TeamPage.jsx
```jsx
// Team management page (Admin only)
// Features:
// - List of team members
// - Invite new user button
// - Invite form modal
// - User actions (remove, change role)
```

#### SettingsPage.jsx
```jsx
// User settings page
// Features:
// - Profile editing
// - Change password
// - Theme preferences (future)
// - Notification preferences (future)
```

#### DashboardPage.jsx
```jsx
// Home/dashboard page
// - Quick summary
// - Redirect to board
```

### 6. Root Components

#### App.jsx
```jsx
// Root application component
// Features:
// - React Router setup
// - Route definitions
// - Global error boundary
// - Auth verification on mount

Routes:
- /login
- /register
- /board (protected)
- /reports (protected)
- /team (protected, admin only)
- /settings (protected)
- / (home, redirects to /board or /login)
```

#### main.jsx
```jsx
// Entry point
// - Import App
// - Render to #root
// - Wrap with BrowserRouter and other providers
```

### 7. Higher Order Components

#### withAuth.js
```jsx
// HOC for protecting routes and checking auth
// - Verify token on mount
// - Show loading state while verifying
// - Redirect to login if needed
```

## Implementation Order (Recommended)

1. **Pages** (to define routes)
   - LoginPage
   - RegisterPage
   - DashboardPage

2. **Auth Components**
   - LoginForm
   - RegisterForm
   - ProtectedRoute

3. **Task Components**
   - TaskModal
   - TaskForm
   - AssigneeSelect
   - BucketSelect

4. **Report Components**
   - ReportCard
   - TaskList
   - FilterBar

5. **Team Components**
   - InviteForm
   - UserCard
   - UserList

6. **Remaining Pages**
   - BoardPage
   - ReportsPage
   - TeamPage
   - SettingsPage

7. **Root Components**
   - App.jsx (with all routes)
   - main.jsx

8. **Global Setup**
   - index.html
   - vite.config.js
   - tailwind.config.js
   - postcss.config.js

## Component Patterns to Follow

### State Management Pattern
```jsx
import { useAuthStore } from '../store/authStore'
import { useTaskStore } from '../store/taskStore'
import { useUIStore } from '../store/uiStore'

export function MyComponent() {
  const { user, isAdmin } = useAuthStore()
  const { tasks, loading, error } = useTaskStore()
  const { openModal } = useUIStore()
  
  // Component logic
}
```

### Async Data Pattern
```jsx
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  loadData()
}, [])

const loadData = async () => {
  setIsLoading(true)
  setError(null)
  
  try {
    const result = await fetchSomething()
    // Update state
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}
```

### Drag & Drop Pattern
```jsx
import { useSortable, useDroppable } from '@dnd-kit/sortable'

export function DraggableItem({ id }) {
  const { setNodeRef, attributes, listeners } = useSortable({ id })
  
  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      Item content
    </div>
  )
}
```

## Styling Patterns

### Conditional Classes
```jsx
className={`
  base-classes
  ${isActive ? 'active-classes' : 'inactive-classes'}
  ${error ? 'error-classes' : ''}
`}
```

### Using formatters
```jsx
import { formatDate, getStatusBgColor } from '../utils/formatters'

<span className={getStatusBgColor(task.status)}>
  {task.status}
</span>

<span>{formatDate(task.dueDate)}</span>
```

### Using Badge component
```jsx
import { Badge } from './common/Badge'

<Badge label={status} variant="blue" icon="✓" />
```

## API Integration Pattern

### Fetching data
```jsx
const { fetchTasks, isLoading, error } = useTaskStore()

useEffect(() => {
  fetchTasks({ bucket: 'Feature Development' })
}, [])
```

### Creating/updating data
```jsx
const { createTask } = useTaskStore()

const handleCreate = async (taskData) => {
  const result = await createTask(taskData)
  if (result.success) {
    // Show success
    refreshData()
  } else {
    // Show error
  }
}
```

## Error Handling Pattern

```jsx
import { ErrorAlert } from './common/ErrorAlert'

{error && (
  <ErrorAlert 
    message={error} 
    onDismiss={() => clearError()}
  />
)}
```

## Form Handling Pattern

```jsx
const [formData, setFormData] = useState({ title: '', description: '' })
const [errors, setErrors] = useState({})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}

const handleSubmit = async (e) => {
  e.preventDefault()
  // Validate
  // Call API
  // Handle response
}
```

## Next Steps

After implementing all components:

1. **Test all pages**
   - Navigate between pages
   - Test authentication flow
   - Test drag and drop

2. **Test API integration**
   - Create tasks
   - Update status
   - Assign users
   - Check reports

3. **Test role-based UI**
   - Login as admin
   - Login as member
   - Verify permissions

4. **Performance**
   - Optimize images
   - Code splitting
   - Lazy load routes

5. **Deployment**
   - Build for production
   - Set correct API base URL
   - Deploy to hosting

## File Template

Use this template for new components:

```jsx
/**
 * [Component Name]
 * [Brief description]
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 */

import { useState, useEffect } from 'react'
import { useStore } from '../store/...'
import { Component } from './other'

export function ComponentName({ prop1, prop2 }) {
  const { state, action } = useStore()
  const [local, setLocal] = useState(null)

  useEffect(() => {
    // Effects
  }, [])

  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

This completes the architectural guide for building all frontend components!
