# Frontend Architecture & Folder Structure

## Overview
React + Vite + Tailwind CSS frontend for the Project Management System. 
Built with drag-and-drop support, role-based UI, and seamless backend integration.

## Folder Structure

```
frontend/
│
├── src/
│   ├── api/                         # API integration layer
│   │   ├── client.js                # Axios instance with interceptors
│   │   ├── auth.js                  # Auth API calls
│   │   ├── tasks.js                 # Task CRUD API calls
│   │   ├── assignments.js           # Assignment API calls
│   │   └── reports.js               # Reporting API calls
│   │
│   ├── store/                       # Zustand state management
│   │   ├── authStore.js             # Auth state (user, token, login)
│   │   ├── taskStore.js             # Task state (tasks, filters)
│   │   ├── uiStore.js               # UI state (modals, sidebar, etc)
│   │   └── index.js                 # Store initialization
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.js               # Auth context hook
│   │   ├── useTasks.js              # Tasks context hook
│   │   ├── useAPI.js                # Generic API hook
│   │   └── useDragDrop.js           # Drag & drop logic
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── Sidebar.jsx          # Left sidebar navigation
│   │   │   ├── DashboardLayout.jsx  # Main layout wrapper
│   │   │   └── MainContent.jsx      # Main content container
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx        # Login component
│   │   │   ├── RegisterForm.jsx     # Register component
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   │
│   │   ├── board/
│   │   │   ├── KanbanBoard.jsx      # Main Kanban board
│   │   │   ├── BoardColumn.jsx      # Single column component
│   │   │   ├── TaskCard.jsx         # Task card component
│   │   │   └── DroppableArea.jsx    # Drop zone component
│   │   │
│   │   ├── tasks/
│   │   │   ├── TaskModal.jsx        # Task detail modal
│   │   │   ├── TaskForm.jsx         # Create/edit task form
│   │   │   ├── TaskHeader.jsx       # Task modal header
│   │   │   ├── AssigneeSelect.jsx   # User assignment dropdown
│   │   │   └── BucketSelect.jsx     # Bucket dropdown
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx           # Reusable button
│   │   │   ├── Input.jsx            # Reusable input
│   │   │   ├── Badge.jsx            # Status/bucket badges
│   │   │   ├── Modal.jsx            # Generic modal
│   │   │   ├── Loading.jsx          # Loading spinner
│   │   │   ├── ErrorAlert.jsx       # Error display
│   │   │   ├── ConfirmDialog.jsx    # Confirmation modal
│   │   │   └── EmptyState.jsx       # Empty state UI
│   │   │
│   │   ├── reports/
│   │   │   ├── ReportCard.jsx       # Report summary card
│   │   │   ├── TaskList.jsx         # Report task list
│   │   │   └── FilterBar.jsx        # Report filters
│   │   │
│   │   └── team/
│   │       ├── UserCard.jsx         # User card
│   │       ├── InviteForm.jsx       # Invite user form
│   │       └── UserList.jsx         # Team members list
│   │
│   ├── pages/                       # Page components
│   │   ├── LoginPage.jsx            # /login
│   │   ├── RegisterPage.jsx         # /register
│   │   ├── BoardPage.jsx            # /board
│   │   ├── ReportsPage.jsx          # /reports
│   │   ├── TeamPage.jsx             # /team
│   │   ├── SettingsPage.jsx         # /settings
│   │   ├── NotFoundPage.jsx         # 404 page
│   │   └── DashboardPage.jsx        # /dashboard (home)
│   │
│   ├── utils/                       # Utility functions
│   │   ├── formatters.js            # Date, status formatting
│   │   ├── validators.js            # Form validation
│   │   ├── constants.js             # Constants and enums
│   │   └── errors.js                # Error handling
│   │
│   ├── styles/                      # Global styles
│   │   ├── index.css                # Main CSS file
│   │   └── tailwind.css             # Tailwind directives
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   └── config.js                    # App configuration
│
├── public/                          # Static files
│   └── favicon.svg
│
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Dependencies
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore
└── README.md                        # Frontend README

```

## Key Design Decisions

### 1. State Management (Zustand)
- **authStore**: User, token, login state
- **taskStore**: Tasks, filters, selected task
- **uiStore**: Modal visibility, sidebar state, notifications
- Simple, lightweight, no boilerplate

### 2. API Integration
- **client.js**: Centralized Axios instance with:
  - Automatic token injection in Authorization header
  - Request/response interceptors
  - Error handling
  - Base URL configuration
- Separate API modules for each resource (auth, tasks, reports)

### 3. Components
- **Presentational components**: Reusable, stateless (Button, Badge, Input)
- **Container components**: Connect to state (Board, TaskList)
- **Page components**: Full-page layouts

### 4. Drag & Drop
- Using **@dnd-kit** (modern, React 18+, better performance)
- Integrated into BoardColumn and TaskCard
- Immediate UI update on drop
- Backend sync via API call

### 5. Routing
- **React Router v6** for page navigation
- **ProtectedRoute** wrapper for role-based access
- Public routes (login, register)
- Protected routes (board, reports, team)

### 6. Styling
- **Tailwind CSS** for utility-first styling
- **Custom Tailwind config** for theme consistency
- Responsive breakpoints (mobile, tablet, desktop)
- Dark mode support (optional)

### 7. Error Handling
- Global error boundary
- Toast notifications
- Fallback UI for failed requests

## Component Props & State Flow

```
App
├── Routes
│   ├── LoginPage (public)
│   ├── RegisterPage (public)
│   └── ProtectedRoute
│       ├── DashboardLayout
│       │   ├── Navbar
│       │   ├── Sidebar
│       │   └── MainContent (outlet)
│       │       ├── BoardPage
│       │       ├── ReportsPage
│       │       ├── TeamPage
│       │       └── SettingsPage
│       │
│       └── TaskModal
│           ├── TaskHeader
│           ├── TaskForm
│           └── AssigneeSelect
```

## Data Flow

```
User Action (click, drag, submit)
    ↓
Component Event Handler
    ↓
API Call (via axios)
    ↓
Zustand Store Update
    ↓
Component Re-render (via useStore hook)
    ↓
UI Update
```

## Authentication Flow

```
Login Form Submit
    ↓
POST /api/auth/login (with email, password)
    ↓
Backend returns token + user
    ↓
Store token in authStore + localStorage
    ↓
Set Authorization header for all future requests
    ↓
Redirect to /board
```

## Drag & Drop Flow

```
Task Card Drag Start
    ↓
Visual feedback (opacity, shadow)
    ↓
Task Card Drop on New Column/Position
    ↓
Update local state immediately (optimistic)
    ↓
PATCH /api/tasks/:id/status (new status)
    ↓
PATCH /api/tasks/:id/position (new position)
    ↓
Backend confirms
    ↓
UI synced with backend
```

## Protected Routes

Routes requiring authentication:
- `/board` - Kanban board (all roles)
- `/reports` - Reports (all roles)
- `/team` - Team management (admin only)
- `/settings` - Settings (all roles)

Public routes:
- `/login` - Login page
- `/register` - Register page
- `/` - Redirect to /board or /login

## Environment Variables

```env
# .env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Project Management
VITE_APP_VERSION=1.0.0
```

## Build & Deploy

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance Optimizations

- Code splitting via React.lazy
- Image optimization
- Bundle analysis
- Lazy loading of routes
- Memoization of components
- Virtual scrolling for long lists (future)
- Caching of API responses

