"use client"

import { useState } from "react"
import type { Task, Column } from "@/types/task"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TaskCardProps {
  task: Task
  onMoveTask: (taskId: string, newStatus: string) => void
  availableColumns: Column[]
}

export default function TaskCard({ task, onMoveTask, availableColumns }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoveOptions, setShowMoveOptions] = useState(false)

  const currentColumnIndex = availableColumns.findIndex((col) => col.id === task.status)
  const canMoveLeft = currentColumnIndex > 0
  const canMoveRight = currentColumnIndex < availableColumns.length - 1

  const handleMoveLeft = () => {
    if (canMoveLeft) {
      onMoveTask(task.id, availableColumns[currentColumnIndex - 1].id)
    }
    setShowMoveOptions(false)
  }

  const handleMoveRight = () => {
    if (canMoveRight) {
      onMoveTask(task.id, availableColumns[currentColumnIndex + 1].id)
    }
    setShowMoveOptions(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-gray-600">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-3">{task.description || "No description"}</p>

          <div className="flex justify-between items-center">
            <div className="relative">
              <button
                onClick={() => setShowMoveOptions(!showMoveOptions)}
                className="text-sm px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
              >
                Move
              </button>

              {showMoveOptions && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                  {canMoveLeft && (
                    <button
                      onClick={handleMoveLeft}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      ← {availableColumns[currentColumnIndex - 1].title}
                    </button>
                  )}
                  {canMoveRight && (
                    <button
                      onClick={handleMoveRight}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      → {availableColumns[currentColumnIndex + 1].title}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

