import { getSupabase } from './supabase';
import { Task, Column } from '@/types/task';

export async function getTasks() {
  const supabase = getSupabase();
  
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }
  
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
  const supabase = getSupabase();
  
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
  const taskWithUserId = {
    ...task,
    user_id: user.id
  };
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskWithUserId])
    .select();
  
  if (error) {
    console.error('Error creating task:', error);
    return null;
  }
  
  return data[0] as Task;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const supabase = getSupabase();
  
  if (!supabase) {
    console.error('Supabase client not available');
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
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
  const supabase = getSupabase();
  
  if (!supabase) {
    console.error('Supabase client not available');
    return false;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }
  
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
  const supabase = getSupabase();
  
  if (!supabase) {
    console.error('Supabase client not available');
    return [];
  }
  
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
  return updateTask(taskId, { columnId, status: columnId });
} 