"use client"

import type React from "react"

import { useState } from "react"
import TaskCard from "./task-card"
import type { Task, Column } from "@/types/task"
import { PlusIcon } from "lucide-react"

interface TaskColumnProps {
  column: Column
  tasks: Task[]
  onAddTask: (title: string, description: string) => void
  onMoveTask: (taskId: string, newStatus: string) => void
  availableColumns: Column[]
}

export default function TaskColumn({ column, tasks, onAddTask, onMoveTask, availableColumns }: TaskColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle, newTaskDescription)
      setNewTaskTitle("")
      setNewTaskDescription("")
      setIsAddingTask(false)
    }
  }

  return (
    <div className={`${column.color} rounded-lg shadow p-4 h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">{column.title}</h2>
        <span className="bg-white text-gray-600 text-sm py-1 px-2 rounded-full">{tasks.length}</span>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 mb-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMoveTask={onMoveTask} availableColumns={availableColumns} />
        ))}
      </div>

      {isAddingTask ? (
        <form onSubmit={handleAddTask} className="bg-white p-3 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Task title"
            className="w-full mb-2 p-2 border border-gray-200 rounded"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <textarea
            placeholder="Description (optional)"
            className="w-full mb-2 p-2 border border-gray-200 rounded resize-none"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows={2}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
              onClick={() => setIsAddingTask(false)}
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center justify-center w-full p-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add a task
        </button>
      )}
    </div>
  )
}

