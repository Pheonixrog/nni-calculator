'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

interface ScriptOutputProps {
  script: string | null
}

export function ScriptOutput({ script }: ScriptOutputProps) {
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    if (script) {
      navigator.clipboard.writeText(script)
      setIsCopied(true)
      toast({
        title: "Copied!",
        description: "Script has been copied to clipboard.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Generated Script</h2>
      {script ? (
        <>
          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
            <pre className="whitespace-pre-wrap font-mono text-sm">{script}</pre>
          </ScrollArea>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCopy} disabled={isCopied}>
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground">Your generated script will appear here.</p>
      )}
    </div>
  )
}

