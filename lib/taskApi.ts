import { supabase } from './supabase';
import { Task, Column } from '@/types/task';

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
  
  return data as Task[];
}

export async function createTask(task: Omit<Task, 'id'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select();
  
  if (error) {
    console.error('Error creating task:', error);
    return null;
  }
  
  return data[0] as Task;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating task:', error);
    return null;
  }
  
  return data[0] as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting task:', error);
    return false;
  }
  
  return true;
}

export async function getColumns() {
  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .order('order');
  
  if (error) {
    console.error('Error fetching columns:', error);
    return [];
  }
  
  return data as Column[];
}

export async function updateTaskColumn(taskId: string, columnId: string) {
  return updateTask(taskId, { columnId });
} 