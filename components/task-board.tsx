import TaskColumn from "./task-column"
import type { Task, Column } from "@/types/task"

interface TaskBoardProps {
  tasks: Task[]
  columns: Column[]
  onAddTask: (title: string, description: string, status: string) => void
  onMoveTask: (taskId: string, newStatus: string) => void
}

export default function TaskBoard({ tasks, columns, onAddTask, onMoveTask }: TaskBoardProps) {
  return (
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
  )
}

