"use client"

import { useState } from "react"
import Link from "next/link"
import TaskBoard from "@/components/task-board"
import type { Task, Column } from "@/types/task"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Create project structure", description: "Set up Next.js with Tailwind CSS", status: "todo" },
    {
      id: "2",
      title: "Design UI components",
      description: "Create reusable components for the app",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Implement task movement",
      description: "Allow tasks to be moved between columns",
      status: "done",
    },
  ])

  const columns: Column[] = [
    { id: "todo", title: "To Do", color: "bg-blue-50" },
    { id: "in-progress", title: "In Progress", color: "bg-yellow-50" },
    { id: "done", title: "Done", color: "bg-green-50" },
  ]

  const addTask = (title: string, description: string, status: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status,
    }
    setTasks([...tasks, newTask])
  }

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
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
          <Button variant="ghost" size="sm" className="text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Account
          </Button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and organize your tasks</p>
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
            <TaskBoard tasks={tasks} columns={columns} onAddTask={addTask} onMoveTask={moveTask} />
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h2 className="font-semibold mb-4">Task Summary</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">To Do</span>
                  <span className="text-sm font-medium">{tasks.filter(t => t.status === 'todo').length}</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${tasks.filter(t => t.status === 'todo').length / tasks.length * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="text-sm font-medium">{tasks.filter(t => t.status === 'in-progress').length}</span>
                </div>
                <div className="h-2 bg-yellow-100 rounded-full">
                  <div 
                    className="h-full bg-yellow-500 rounded-full" 
                    style={{ width: `${tasks.filter(t => t.status === 'in-progress').length / tasks.length * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Done</span>
                  <span className="text-sm font-medium">{tasks.filter(t => t.status === 'done').length}</span>
                </div>
                <div className="h-2 bg-green-100 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${tasks.filter(t => t.status === 'done').length / tasks.length * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-sm">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  <div>
                    <p className="text-xs">Task "Design UI components" moved to In Progress</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                  <div>
                    <p className="text-xs">Task "Implement task movement" completed</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
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