import getOpenAI from './openai';
import { Task } from '@/types/task';

// Check if OpenAI is available
export const isAIAvailable = (): boolean => {
  const openai = getOpenAI();
  return openai !== null;
};

// Generate a task title from a description
export async function generateTaskTitle(description: string): Promise<string | null> {
  const openai = getOpenAI();
  if (!openai) return null;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates concise task titles. Generate only the title with no additional explanation or commentary."
        },
        {
          role: "user",
          content: `Generate a concise task title (max 6 words) for the following task description: "${description}"`
        }
      ],
      max_tokens: 20,
      temperature: 0.7,
    });
    
    return response.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error("Error generating task title:", error);
    return null;
  }
}

// Generate a task description from a title
export async function generateTaskDescription(title: string): Promise<string | null> {
  const openai = getOpenAI();
  if (!openai) return null;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates detailed task descriptions. Generate only the description with no additional explanation or commentary."
        },
        {
          role: "user",
          content: `Generate a task description (1-2 sentences) for a task titled: "${title}"`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });
    
    return response.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error("Error generating task description:", error);
    return null;
  }
}

// Suggest three new tasks based on existing tasks
export async function suggestTasks(existingTasks: Task[]): Promise<string[] | null> {
  const openai = getOpenAI();
  if (!openai) return null;
  
  try {
    // Create a string representation of existing tasks
    const existingTasksText = existingTasks
      .map(task => `- ${task.title}: ${task.description || 'No description'}`)
      .join('\n');
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful task management assistant that suggests new tasks based on existing ones. Generate only a list of task titles, one per line, with no numbering, bullets, or additional text."
        },
        {
          role: "user",
          content: `Here are my current tasks:\n${existingTasksText}\n\nSuggest 3 new related tasks I might want to add.`
        }
      ],
      max_tokens: 150,
      temperature: 0.8,
    });
    
    const content = response.choices[0]?.message?.content?.trim();
    if (!content) return null;
    
    // Parse the response to extract individual task suggestions
    return content
      .split('\n')
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim()) // Remove bullets if present
      .filter(line => line.length > 0)
      .slice(0, 3); // Ensure we only get up to 3 tasks
  } catch (error) {
    console.error("Error suggesting tasks:", error);
    return null;
  }
}

// Categorize a task into the appropriate column
export async function categorizeTask(title: string, description: string, columns: string[]): Promise<string | null> {
  const openai = getOpenAI();
  if (!openai) return null;
  
  try {
    const columnsText = columns.join(', ');
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a task categorization assistant. You categorize tasks into one of the following columns: ${columnsText}. Only respond with the exact name of the column, no other text.`
        },
        {
          role: "user",
          content: `Categorize this task into one of these columns (${columnsText}):\nTitle: ${title}\nDescription: ${description}`
        }
      ],
      max_tokens: 20,
      temperature: 0.3,
    });
    
    const suggestedColumn = response.choices[0]?.message?.content?.trim() || null;
    
    // Ensure we return only a valid column
    return columns.find(col => col.toLowerCase() === suggestedColumn?.toLowerCase()) || columns[0];
  } catch (error) {
    console.error("Error categorizing task:", error);
    return columns[0]; // Default to first column on error
  }
} 