# Task Tracker

## About
A functional Task Tracker application built with Next.js and React. Users can create, manage, filter, and persist tasks across browser sessions using localStorage.

## Features
- Add tasks with title, description, priority, status, and due date
- Edit tasks with a pre-filled form (title, description, priority, status, due date)
- Mark tasks as completed or pending
- Delete tasks with a confirmation dialog
- Filter tasks by All / Pending / Completed (with live counts)
- Search tasks by title or description
- Sort tasks by newest, oldest, due date, or priority
- Task statistics — Total, Completed, Pending with a progress bar
- Overdue task indication (highlighted in red)
- Tasks persist across page refreshes and browser restarts using localStorage
- Corrupt or malformed stored data is validated and recovered safely
- Open tabs stay in sync when tasks change
- Dark / light mode toggle (persisted, follows system preference by default)
- Toast notifications on add, update, toggle, and delete
- Loading skeletons while tasks initialise
- Responsive UI that works on desktop and mobile, with a collapsible mobile nav menu
- Task detail page with edit, toggle, and delete actions, showing created and due dates
- Dashboard with recent tasks overview
- About page describing the app

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- CSS-in-JS (inline styles)

## Getting Started

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/
│   ├── Navbar.tsx          # Sticky nav with theme toggle + mobile menu
│   ├── ThemeToggle.tsx     # Dark / light mode toggle button
│   ├── ToastProvider.tsx   # Toast notifications + useToast() hook
│   ├── TaskStats.tsx       # Total / Completed / Pending stats + progress bar
│   ├── FilterButtons.tsx   # All / Pending / Completed filters with counts
│   ├── TaskCard.tsx        # Task card with status, badges, actions
│   ├── TaskList.tsx        # Task list + empty state
│   ├── TaskForm.tsx        # Add-task form
│   ├── TaskEditForm.tsx    # Shared edit form (cards + detail page)
│   ├── ConfirmDialog.tsx   # Reusable confirmation dialog
│   ├── AuthLayout.tsx      # Split-panel layout for auth pages
│   ├── PasswordField.tsx   # Password input with show/hide toggle
│   ├── SocialAuth.tsx      # Google / GitHub social buttons
│   ├── Logo.tsx            # Brand mark
│   └── icons.tsx           # Shared SVG icon set
├── lib/
│   ├── taskStore.ts        # Task types + localStorage helpers
│   ├── taskUtils.ts        # Shared domain helpers (overdue, sort, badge colors)
│   └── styles.ts           # Shared UI style constants (inputs, labels)
├── tasks/
│   ├── page.tsx            # Main task list with filters, search, sort
│   └── [taskId]/page.tsx   # Task detail page
├── dashboard/page.tsx      # Dashboard with stats and recent tasks
├── about/page.tsx          # About page
├── profile/page.tsx        # Profile page
├── sign-in/page.tsx        # Sign in page
├── sign-up/page.tsx        # Sign up page
├── layout.tsx              # Root layout (theme init script, Navbar, Toasts)
└── page.tsx                # Home page
```

## What I Learned
- Breaking UI into reusable React components
- Passing data between components using props
- Managing state with `useState` and updating arrays immutably using the spread operator
- Using `useEffect` to load data on mount
- Persisting data with `localStorage`, `JSON.stringify()`, and `JSON.parse()`
- Conditional rendering to visually differentiate completed and pending tasks
- Using `map()` to dynamically render task lists and `filter()` for filtering
- Next.js App Router, file-based routing, and client components (`"use client"`)
- Handling forms and events in React

## Future Improvements
- Authentication (sign in / sign up connected to a real backend)
- Drag-and-drop task reordering
- Categories and tags
