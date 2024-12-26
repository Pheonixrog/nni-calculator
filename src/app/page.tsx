'use client'

import { useState } from 'react'
import { ScriptForm } from '@/components/script-form'
import { ScriptOutput } from '@/components/script-output'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  const [script, setScript] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Movie Script Generator</h1>
        <ModeToggle />
      </div>
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate Script</TabsTrigger>
          <TabsTrigger value="output">Script Output</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <ScriptForm setScript={setScript} />
        </TabsContent>
        <TabsContent value="output">
          <ScriptOutput script={script} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

