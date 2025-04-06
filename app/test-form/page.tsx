'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestFormPage() {
  const [value, setValue] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value changing to:', e.target.value)
    setValue(e.target.value)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with value:', value)
    alert(`You entered: ${value}`)
  }
  
  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Test Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-md">
        <div className="space-y-2">
          <Label htmlFor="test-input">Test Input</Label>
          <Input
            id="test-input"
            placeholder="Type something here"
            value={value}
            onChange={handleChange}
          />
        </div>
        
        <Button type="submit">Submit</Button>
        
        <div className="text-sm text-gray-500">
          <p>Current value: "{value}"</p>
          <p>Input is {value ? 'not empty' : 'empty'}</p>
        </div>
      </form>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Debug Info:</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto">
          {JSON.stringify({
            currentValue: value,
            valueLength: value.length,
            timestamp: new Date().toISOString()
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
} 