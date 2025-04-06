"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import TaskBoard from "@/components/task-board"
import type { Task, Column } from "@/types/task"
import { Button } from "@/components/ui/button"
import { getTasks, createTask, updateTask, deleteTask, getColumns, updateTaskColumn } from "@/lib/taskApi"
import { useAuth } from "@/lib/auth"

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", color: "bg-blue-50", order: 1 },
    { id: "in-progress", title: "In Progress", color: "bg-yellow-50", order: 2 },
    { id: "done", title: "Done", color: "bg-green-50", order: 3 },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, signOut, isSupabaseAvailable } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
      return
    }

    async function loadInitialData() {
      setLoading(true)
      setError(null)
      
      if (!isSupabaseAvailable) {
        setError("Supabase connection is not available. Using local storage instead.")
        setLoading(false)
        return
      }
      
      try {
        // Load tasks from Supabase
        const tasksData = await getTasks()
        setTasks(tasksData)
        
        // Try to load columns from Supabase if they exist
        const columnsData = await getColumns()
        if (columnsData.length > 0) {
          setColumns(columnsData)
        }
      } catch (error) {
        console.error("Error loading data:", error)
        setError("Error loading your tasks. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    if (user) {
      loadInitialData()
    }
  }, [user, router, loading, isSupabaseAvailable])

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
      }
      router.push("/login")
    } catch (err) {
      console.error("Error signing out:", err)
      setError("Error signing out. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              New Task
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