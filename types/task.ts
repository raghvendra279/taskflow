export interface Task {
  id: string
  title: string
  description: string
  status: string
  columnId?: string
}

export interface Column {
  id: string
  title: string
  color: string
  order?: number
}

