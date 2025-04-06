import TaskColumn from "./task-column"
import type { Task, Column } from "@/types/task"
import AITaskCreator from "./ai-task-creator"
import AITaskSuggestions from "./ai-task-suggestions"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface TaskBoardProps {
  tasks: Task[]
  columns: Column[]
  onAddTask: (title: string, description: string, status: string) => void
  onMoveTask: (taskId: string, newStatus: string) => void
}

export default function TaskBoard({ tasks, columns, onAddTask, onMoveTask }: TaskBoardProps) {
  const [openManualCreate, setOpenManualCreate] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDesc, setNewTaskDesc] = useState("")
  const [newTaskStatus, setNewTaskStatus] = useState(columns[0]?.id || "todo")
  
  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle, newTaskDesc, newTaskStatus)
      setNewTaskTitle("")
      setNewTaskDesc("")
      setOpenManualCreate(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Dialog open={openManualCreate} onOpenChange={setOpenManualCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your board
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Add details about this task" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                >
                  {columns.map(column => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateTask}>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <AITaskCreator onCreateTask={onAddTask} columns={columns} />
        <AITaskSuggestions tasks={tasks} onAddTask={onAddTask} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            onAddTask={(title, description) => onAddTask(title, description, column.id)}
            onMoveTask={onMoveTask}
            availableColumns={columns}
          />
        ))}
      </div>
    </div>
  )
}

