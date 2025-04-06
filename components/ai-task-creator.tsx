'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { generateTaskDescription, generateTaskTitle, isAIAvailable, categorizeTask } from '@/lib/aiUtils'
import { Column } from '@/types/task'

interface AITaskCreatorProps {
  onCreateTask: (title: string, description: string, columnId: string) => void;
  columns: Column[];
}

export default function AITaskCreator({ onCreateTask, columns }: AITaskCreatorProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [generatingTitle, setGeneratingTitle] = useState(false)
  const [generatingDescription, setGeneratingDescription] = useState(false)

  const { toast } = useToast()
  const isAIEnabled = isAIAvailable()

  // Function to generate a title using AI
  const handleGenerateTitle = async () => {
    if (!description) {
      toast({
        title: "Description required",
        description: "Please enter a description to generate a title.",
        variant: "destructive",
      })
      return
    }

    setGeneratingTitle(true)
    const generatedTitle = await generateTaskTitle(description)
    setGeneratingTitle(false)

    if (generatedTitle) {
      setTitle(generatedTitle)
    } else {
      toast({
        title: "Error",
        description: "Failed to generate a title. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Function to generate a description using AI
  const handleGenerateDescription = async () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a title to generate a description.",
        variant: "destructive",
      })
      return
    }

    setGeneratingDescription(true)
    const generatedDescription = await generateTaskDescription(title)
    setGeneratingDescription(false)

    if (generatedDescription) {
      setDescription(generatedDescription)
    } else {
      toast({
        title: "Error",
        description: "Failed to generate a description. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Function to handle task creation
  const handleCreateTask = async () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a title for the task.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    
    try {
      // Categorize task into appropriate column using AI
      const columnIds = columns.map(column => column.id)
      const suggestedColumn = await categorizeTask(title, description, columnIds) || columnIds[0]
      
      // Create the task
      onCreateTask(title, description, suggestedColumn)
      
      // Reset form and close dialog
      setTitle('')
      setDescription('')
      setOpen(false)
      
      toast({
        title: "Task created",
        description: "Your task has been successfully created.",
      })
    } catch (error) {
      console.error("Error creating task:", error)
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2 h-4 w-4"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Create AI Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task with AI</DialogTitle>
          <DialogDescription>
            Use AI to help create your task. Enter information in one field and let AI generate the other.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <div className="col-span-3 flex gap-2">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
                placeholder="Enter task title"
              />
              {isAIEnabled && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleGenerateTitle}
                  disabled={generatingTitle || !description}
                >
                  {generatingTitle ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-blue-500" />
                  ) : (
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
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3 flex gap-2">
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1"
                placeholder="Enter task description"
                rows={4}
              />
              {isAIEnabled && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleGenerateDescription}
                  disabled={generatingDescription || !title}
                  className="self-start"
                >
                  {generatingDescription ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-blue-500" />
                  ) : (
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
                  )}
                </Button>
              )}
            </div>
          </div>
          {!isAIEnabled && (
            <div className="col-span-4 text-center text-sm text-amber-600">
              AI features are disabled. Please set your OpenAI API key in the environment variables.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateTask}
            disabled={loading || !title}
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white" />
                Creating...
              </>
            ) : (
              'Create Task'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 