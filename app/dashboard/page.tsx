"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import TaskBoard from "@/components/task-board"
import type { Task, Column } from "@/types/task"
import { Button } from "@/components/ui/button"
import { getTasks, createTask, updateTask, deleteTask, getColumns, updateTaskColumn } from "@/lib/taskApi"
import { useAuth } from "@/lib/auth"

// Component with client hooks
function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", color: "bg-blue-50", order: 1 },
    { id: "in-progress", title: "In Progress", color: "bg-yellow-50", order: 2 },
    { id: "done", title: "Done", color: "bg-green-50", order: 3 },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const { user, signOut, isSupabaseAvailable, loading: authLoading } = useAuth()
  const router = useRouter()

  // We need this to ensure we're running in the browser
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    console.log("Dashboard useEffect - Auth status:", { user: !!user, authLoading, loading, isClient })
    
    // Make sure we're in the browser and auth has loaded
    if (!isClient) return
    
    // Only redirect if auth has finished loading and no user is found
    if (!authLoading && !user) {
      console.log("No user found after auth loaded, redirecting to login")
      window.location.href = "/login"
      return
    }

    // Only load data if user is authenticated
    if (user && !authLoading) {
      console.log("User authenticated, loading task data")
      loadInitialData()
    }
  }, [user, authLoading, isClient])

  async function loadInitialData() {
    setLoading(true)
    setError(null)
    
    if (!isSupabaseAvailable) {
      setError("Supabase connection is not available. Using local storage instead.")
      setLoading(false)
      return
    }
    
    try {
      console.log("Loading tasks from Supabase")
      // Load tasks from Supabase
      const tasksData = await getTasks()
      setTasks(tasksData)
      console.log(`Loaded ${tasksData.length} tasks`)
      
      // Try to load columns from Supabase if they exist
      const columnsData = await getColumns()
      if (columnsData.length > 0) {
        setColumns(columnsData)
        console.log(`Loaded ${columnsData.length} columns`)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Error loading your tasks. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title: string, description: string, status: string) => {
    if (!user) return
    
    if (!isSupabaseAvailable) {
      // Fallback to local storage if Supabase is not available
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        status,
      }
      setTasks([...tasks, newTask])
      return
    }
    
    const newTask = {
      title,
      description,
      status,
      columnId: status // Using status as columnId for compatibility
    }
    
    try {
      const createdTask = await createTask(newTask)
      if (createdTask) {
        setTasks([...tasks, createdTask])
      }
    } catch (err) {
      console.error("Error creating task:", err)
      setError("Error creating task. Please try again.")
    }
  }

  const moveTask = async (taskId: string, newStatus: string) => {
    if (!user) return
    
    if (!isSupabaseAvailable) {
      // Fallback to local state if Supabase is not available
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
      return
    }
    
    try {
      const updatedTask = await updateTaskColumn(taskId, newStatus)
      if (updatedTask) {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus, columnId: newStatus } : task)))
      }
    } catch (err) {
      console.error("Error moving task:", err)
      setError("Error moving task. Please try again.")
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return
    
    if (!isSupabaseAvailable) {
      // Fallback to local state if Supabase is not available
      setTasks(tasks.filter((task) => task.id !== taskId))
      return
    }
    
    try {
      const success = await deleteTask(taskId)
      if (success) {
        setTasks(tasks.filter((task) => task.id !== taskId))
      }
    } catch (err) {
      console.error("Error deleting task:", err)
      setError("Error deleting task. Please try again.")
    }
  }

  const handleSignOut = async () => {
    try {
      if (isSupabaseAvailable) {
        await signOut()
      } else {
        window.location.href = "/login"
      }
    } catch (err) {
      console.error("Error signing out:", err)
      setError("Error signing out. Please try again.")
    }
  }

  // Show loading state if auth is still loading
  if (authLoading || loading || !isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  // If we're not loading and there's no user, show an error instead of blank screen
  // The redirect should happen, but if it doesn't, give feedback
  if (!user && !authLoading && !loading && isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Authentication Required</h2>
          <p className="text-gray-600">You must be logged in to view this page.</p>
          <Button 
            onClick={() => window.location.href = "/login"}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          <Link href="/" className="text-xl font-bold">TaskFlow</Link>
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Button variant="ghost" size="sm" className="text-sm font-medium" onClick={handleSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </Button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and organize your tasks</p>
            {user && <p className="text-sm text-blue-600 mt-1">Logged in as: {user.email}</p>}
            {!isSupabaseAvailable && (
              <p className="text-sm text-amber-600 mt-1">
                Warning: Operating in offline mode. Changes will not be saved to the cloud.
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Export
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <TaskBoard 
              tasks={tasks} 
              columns={columns} 
              onAddTask={addTask} 
              onMoveTask={moveTask} 
            />
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h2 className="font-semibold mb-4">Task Summary</h2>
            <div className="space-y-4">
              {columns.map(column => (
                <div key={column.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{column.title}</span>
                    <span className="text-sm font-medium">{tasks.filter(t => t.status === column.id).length}</span>
                  </div>
                  <div className={`h-2 ${column.color.replace('bg-', 'bg-').replace('50', '100')} rounded-full`}>
                    <div 
                      className={`h-full ${column.color.replace('bg-', 'bg-').replace('50', '500')} rounded-full`}
                      style={{ width: tasks.length ? `${tasks.filter(t => t.status === column.id).length / tasks.length * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-sm">Recent Activity</h3>
              {tasks.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                    <div>
                      <p className="text-xs">You have {tasks.length} tasks in your board</p>
                      <p className="text-xs text-muted-foreground">Updated just now</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No tasks yet. Create your first task to get started!</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2024 TaskFlow. All rights reserved.</p>
          <p className="text-xs text-gray-500">Dashboard v1.0</p>
        </div>
      </footer>
    </div>
  )
}

// Fallback loading state for Suspense
function DashboardFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-3 text-gray-600">Loading dashboard...</p>
    </div>
  )
}

// Main page component with Suspense
export default function Dashboard() {
  // Add a client-side check to ensure we're in the browser
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // If not yet mounted (server-side or first render), show the fallback
  if (!mounted) {
    return <DashboardFallback />
  }

  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  )
} 