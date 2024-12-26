'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

interface ScriptFormProps {
  setScript: (script: string) => void
}

export function ScriptForm({ setScript }: ScriptFormProps) {
  const [genre, setGenre] = useState('')
  const [theme, setTheme] = useState('')
  const [characters, setCharacters] = useState('')
  const [complexity, setComplexity] = useState(50)
  const [includeDialogue, setIncludeDialogue] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, theme, characters, complexity, includeDialogue }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate script')
      }

      const data = await response.json()
      setScript(data.script)
      toast({
        title: "Script Generated",
        description: "Your movie script has been successfully generated!",
      })
    } catch (error) {
      console.error('Error generating script:', error)
      toast({
        title: "Error",
        description: "Failed to generate script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="genre">Genre</Label>
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger id="genre">
            <SelectValue placeholder="Select a genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="action">Action</SelectItem>
            <SelectItem value="comedy">Comedy</SelectItem>
            <SelectItem value="drama">Drama</SelectItem>
            <SelectItem value="scifi">Science Fiction</SelectItem>
            <SelectItem value="horror">Horror</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="thriller">Thriller</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Input
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme (e.g., redemption, love, survival)"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="characters">Characters</Label>
        <Textarea
          id="characters"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          placeholder="Enter main characters (e.g., John: a brave detective, Sarah: a brilliant scientist)"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="complexity">Script Complexity</Label>
        <Slider
          id="complexity"
          min={0}
          max={100}
          step={1}
          value={[complexity]}
          onValueChange={(value) => setComplexity(value[0])}
        />
        <div className="text-sm text-muted-foreground">
          Complexity: {complexity}%
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="include-dialogue"
          checked={includeDialogue}
          onCheckedChange={setIncludeDialogue}
        />
        <Label htmlFor="include-dialogue">Include sample dialogue</Label>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Script'}
      </Button>
    </form>
  )
}

