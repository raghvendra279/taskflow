'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Task } from '@/types/task'
import { suggestTasks, isAIAvailable } from '@/lib/aiUtils'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AITaskSuggestionsProps {
  tasks: Task[]
  onAddTask: (title: string, description: string, status: string) => void
}

export default function AITaskSuggestions({ tasks, onAddTask }: AITaskSuggestionsProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const isAIEnabled = isAIAvailable()

  const handleGenerateSuggestions = async () => {
    if (!isAIEnabled) {
      setError("AI features are disabled. Please set your OpenAI API key.")
      return
    }

    if (tasks.length === 0) {
      setError("You need to have at least one task to generate suggestions.")
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const suggestedTasks = await suggestTasks(tasks)
      
      if (suggestedTasks && suggestedTasks.length > 0) {
        setSuggestions(suggestedTasks)
      } else {
        setError("Failed to generate task suggestions. Please try again.")
      }
    } catch (error) {
      console.error("Error generating suggestions:", error)
      setError("An error occurred while generating suggestions.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (title: string) => {
    // Generate a simple description based on the title
    const description = `Task generated from AI suggestion: ${title}`
    
    // Add the task to the "todo" column by default
    onAddTask(title, description, "todo")
    
    // Remove the suggestion from the list
    setSuggestions(suggestions.filter(s => s !== title))
    
    // Close the dialog if all suggestions are used
    if (suggestions.length <= 1) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Suggest Tasks
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Task Suggestions</DialogTitle>
          <DialogDescription>
            Let AI analyze your current tasks and suggest new ones that might be relevant.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {!isAIEnabled && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>AI Not Available</AlertTitle>
              <AlertDescription>
                Please set up your OpenAI API key in the environment variables to use this feature.
              </AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {suggestions.length === 0 ? (
            <div className="flex justify-center py-8">
              <Button 
                onClick={handleGenerateSuggestions} 
                disabled={loading || !isAIEnabled}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-white" />
                    Generating Suggestions...
                  </>
                ) : (
                  <>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="h-4 w-4"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    Generate Suggestions
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your current tasks, we suggest adding the following:
              </p>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
                    <div className="font-medium">{suggestion}</div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddTask(suggestion)}
                    >
                      Add Task
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 