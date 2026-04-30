# Project Management System - React Frontend

A modern, Jira-like project management interface built with React, Vite, and Tailwind CSS. Features drag-and-drop task management, role-based access control, and seamless backend integration.

## 🎯 Features

### ✅ Kanban Board
- 3-column workflow: Not Started → In Progress → Completed
- Drag and drop task reordering within columns
- Support for 5 fixed task buckets
- Real-time task count display
- Vertical scrolling in each column

### ✅ Task Management
- Create tasks (admin only)
- View task details in modal
- Edit tasks (admin only)
- Update task status (admin or assigned member)
- Assign/unassign users
- Delete tasks (admin only)
- Task filtering and sorting

### ✅ Reports & Analytics
- Overdue tasks report
- Due today tasks
- Future-dated tasks
- Task summary dashboard
- Filter by bucket and status
- Personal task inbox

### ✅ Team Management
- View team members (admin)
- Invite new users via email (admin)
- Role assignment (Admin/Member)
- User profiles

### ✅ Authentication & Authorization
- User registration and login
- JWT token-based auth
- Email-based user invitations
- Role-based UI (admin vs member)
- Protected routes
- Auto-logout on token expiration

### ✅ User Experience
- Responsive design (mobile, tablet, desktop)
- Dark and light mode support
- Real-time error handling
- Loading states and skeletons
- Toast notifications
- Smooth animations and transitions

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 18.2+ |
| **Build Tool** | Vite 5+ |
| **Styling** | Tailwind CSS 3+ |
| **State Management** | Zustand 4+ |
| **HTTP Client** | Axios 1.6+ |
| **Routing** | React Router v6 |
| **Drag & Drop** | @dnd-kit |
| **Icons** | Lucide React |

---

## 📋 Project Structure

```
frontend/
├── src/
│   ├── api/                    # API integration layer
│   │   ├── client.js          # Axios instance
│   │   ├── auth.js            # Auth API calls
│   │   ├── tasks.js           # Task CRUD
│   │   ├── assignments.js     # Assignment ops
│   │   └── reports.js         # Reports API
│   │
│   ├── store/                 # State management (Zustand)
│   │   ├── authStore.js       # Auth state
│   │   ├── taskStore.js       # Task state
│   │   └── uiStore.js         # UI state
│   │
│   ├── hooks/                 # Custom hooks (ready to add)
│   │
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── common/            # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorAlert.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── board/             # Kanban board
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── BoardColumn.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── tasks/             # Task components (ready to add)
│   │   ├── reports/           # Report components (ready to add)
│   │   ├── team/              # Team components (ready to add)
│   │   └── auth/              # Auth components (ready to add)
│   │
│   ├── pages/                 # Page components (ready to add)
│   │
│   ├── utils/
│   │   ├── constants.js       # App constants
│   │   └── formatters.js      # Utility functions
│   │
│   ├── styles/
│   │   └── index.css          # Global styles
│   │
│   ├── App.jsx                # Root component (ready to add)
│   ├── main.jsx               # Entry point (ready to add)
│   └── config.js              # App config
│
├── public/                    # Static files
├── index.html                 # HTML template
├── vite.config.js            # Vite config
├── tailwind.config.js        # Tailwind config
├── postcss.config.js         # PostCSS config
├── package.json              # Dependencies
├── .env.example              # Env template
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Backend API running (http://localhost:5000/api)

### Installation

1. **Clone or extract the frontend files**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📖 Documentation

### Complete Guides
- **[FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)** - Architecture overview and design decisions
- **[FRONTEND_COMPONENTS_GUIDE.md](./FRONTEND_COMPONENTS_GUIDE.md)** - Guide to implementing all remaining components
- **[API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md)** - Backend API reference

### Setup & Deployment
- **[SETUP_GUIDE.md](../backend/SETUP_GUIDE.md)** - Comprehensive setup guide

---

## 🎨 UI/UX Design

### Color Scheme
```
Primary: Blue (#0ea5e9)
Success: Green (#10b981)
Warning: Orange (#f97316)
Danger: Red (#ef4444)
Gray: #f3f4f6 to #1f2937
```

### Task Bucket Colors
- Feature Development: Purple
- Bug Fixes: Red
- Improvements: Orange
- Infrastructure: Cyan
- QA/Testing: Violet

### Task Status Colors
- Not Started: Gray
- In Progress: Blue
- Completed: Green

### Spacing
- xs: 0.5rem
- sm: 1rem
- md: 1.5rem
- lg: 2rem
- xl: 3rem

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:5000/api

# App
VITE_APP_NAME=Project Management
VITE_APP_VERSION=1.0.0
```

### Tailwind Customization

Edit `tailwind.config.js` to customize:
- Colors
- Spacing
- Typography
- Animations

---

## 📱 Component Usage Examples

### Button
```jsx
import { Button } from './components/common/Button'

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Badge
```jsx
import { Badge } from './components/common/Badge'

<Badge label="In Progress" variant="blue" icon="🔄" />
```

### Modal
```jsx
import { Modal } from './components/common/Modal'

<Modal isOpen={isOpen} onClose={onClose} title="Task Details">
  <p>Modal content</p>
</Modal>
```

### Input
```jsx
import { Input } from './components/common/Input'

<Input 
  label="Email" 
  type="email" 
  required 
  error={error}
/>
```

---

## 🔐 Authentication Flow

1. **User visits app**
2. Checks localStorage for token
3. If token exists, verifies with backend
4. If valid, loads user data and redirects to /board
5. If invalid/expired, redirects to /login

### Login Process
```
User → LoginForm → POST /api/auth/login
   ← Backend returns {user, token}
   → Store token in localStorage
   → Store user in authStore
   → Redirect to /board
```

### Protected Routes
- Wrapped with `ProtectedRoute` component
- Checks authentication before rendering
- Redirects to /login if not authenticated
- Some routes check for admin role

---

## 🎯 State Management (Zustand)

### Auth Store
```jsx
import { useAuthStore } from './store/authStore'

const { user, token, isAdmin, login, logout } = useAuthStore()
```

### Task Store
```jsx
import { useTaskStore } from './store/taskStore'

const { tasks, fetchTasks, createTask, updateTask } = useTaskStore()
```

### UI Store
```jsx
import { useUIStore } from './store/uiStore'

const { taskModalOpen, openTaskModal, closeTaskModal } = useUIStore()
```

---

## 🎯 Drag & Drop Implementation

Uses `@dnd-kit` for drag and drop:

1. **Draggable Cards**
   - TaskCard wrapped with `useSortable`
   - Visual feedback during drag (opacity, shadow)

2. **Droppable Columns**
   - BoardColumn wrapped with `useDroppable`
   - Accepts drops from same/different buckets

3. **Update Flow**
   - Optimistic UI update (immediate)
   - API call in background
   - Rollback if error

---

## 📊 API Integration

### Making API Calls

```jsx
import * as tasksAPI from '../api/tasks'

// Simple async call
const { tasks } = await tasksAPI.getTasks()

// With Zustand store
const { fetchTasks, tasks } = useTaskStore()
await fetchTasks({ bucket: 'Feature Development' })

// With error handling
try {
  const result = await createTask(taskData)
  if (result.success) {
    // Handle success
  }
} catch (error) {
  console.error(error.message)
}
```

### Token Management

- Token automatically injected in all requests
- Stored in Authorization header
- Auto-refreshes on 401 response
- Cleared on logout

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication**
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials shows error
- [ ] Token persists across page reload
- [ ] Logout clears token and redirects

**Board**
- [ ] Load board with tasks
- [ ] Drag task to different column
- [ ] Drag task within same column
- [ ] Click task to open modal
- [ ] Task count updates
- [ ] Bucket switching works

**Role-Based UI**
- [ ] Login as admin - see create button
- [ ] Login as member - no create button
- [ ] Admin can edit any task
- [ ] Member can only edit assigned tasks

**Reports**
- [ ] Overdue tasks display correctly
- [ ] Due today tasks display correctly
- [ ] Future tasks display correctly
- [ ] Filters work properly

---

## 🚀 Building for Production

```bash
# Build optimized version
npm run build

# Preview production build locally
npm run preview

# Deploy to hosting
# Copy contents of dist/ to your host
```

### Environment for Production

```env
VITE_API_BASE_URL=https://api.yoursite.com
VITE_APP_NAME=Project Management
```

---

## 📱 Responsive Design

Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Sidebar toggle (hamburger menu)
- Stacked layout
- Touch-friendly buttons
- Larger hit targets
- Bottom sheet modals (optional)

---

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Focus indicators
- Screen reader support

---

## 🐛 Debugging

### Browser DevTools
1. Redux DevTools for Zustand (optional)
2. Network tab for API calls
3. Console for errors
4. React DevTools for component inspection

### Logging

```jsx
// In development
if (import.meta.env.DEV) {
  console.log('Debug info')
}
```

---

## 📈 Performance Tips

- Code split pages with React.lazy
- Lazy load images
- Optimize bundle size
- Use React.memo for expensive components
- Debounce search/filter inputs
- Virtual scrolling for long lists

---

## 🔄 Deployment Pipeline

1. **Development**
   - `npm run dev` for hot reload
   - Test locally

2. **Staging**
   - `npm run build`
   - Deploy to staging server
   - Test with production-like setup

3. **Production**
   - Deploy to production server
   - Monitor for errors
   - Watch performance metrics

---

## 📞 Support & Troubleshooting

### Common Issues

**API calls returning 401**
- Token expired - login again
- Check VITE_API_BASE_URL

**Drag and drop not working**
- Ensure @dnd-kit is installed
- Check browser console for errors
- Verify React version 18+

**Styles not applying**
- Build Tailwind: `npm install`
- Clear browser cache
- Check tailwind.config.js

**Components not rendering**
- Check console for import errors
- Verify component paths
- Check useState/useEffect usage

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [dnd-kit](https://docs.dndkit.com)
- [Axios](https://axios-http.com)

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

## 🤝 Contributing

To contribute:
1. Create feature branches
2. Follow code style (ESLint)
3. Write meaningful commit messages
4. Test before submitting

---

## ✨ Future Enhancements

- [ ] Dark mode toggle
- [ ] Real-time updates with WebSockets
- [ ] Task comments and activity log
- [ ] File attachments
- [ ] Advanced search
- [ ] Bulk operations
- [ ] Export to PDF/CSV
- [ ] Calendar view
- [ ] Timeline view
- [ ] Notification center
- [ ] User preferences
- [ ] Custom workflows

---

## 🎉 Getting Started

1. Install: `npm install`
2. Setup: `cp .env.example .env`
3. Start: `npm run dev`
4. Build: `npm run build`

**Happy task managing!** 🚀

For detailed component implementation guide, see [FRONTEND_COMPONENTS_GUIDE.md](./FRONTEND_COMPONENTS_GUIDE.md).

