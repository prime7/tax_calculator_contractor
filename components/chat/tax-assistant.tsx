"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaxAssistantProps {
  context: {
    income: number
    province: string
    deductions: number
    optimalSalary?: number
    recommendation?: string
  }
}

export function TaxAssistant({ context }: TaxAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat()
  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const currentInput = input
    setInput("")
    
    await sendMessage(
      {
        role: "user",
        parts: [{ type: "text", text: currentInput }]
      },
      { body: { context } }
    )
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-xl z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="h-8 w-8 text-primary-foreground" />
        <span className="sr-only">Open Tax Assistant</span>
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-12 px-4 rounded-full shadow-lg bg-primary hover:bg-primary/90 flex items-center gap-2"
        >
          <Bot className="h-5 w-5" />
          <span className="font-medium">Tax Assistant</span>
          <Maximize2 className="h-4 w-4 ml-2 opacity-70" />
        </Button>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 p-1"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] shadow-2xl z-50 flex flex-col border-primary/20">
      <CardHeader className="p-4 border-b bg-primary/5 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Tax Assistant</CardTitle>
            <p className="text-xs text-muted-foreground">Ask about your tax results</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden relative">
        <div 
          ref={scrollRef}
          className="h-full overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground space-y-2 opacity-70">
              <Bot className="h-12 w-12 mb-2" />
              <p className="text-sm font-medium">How can I help with your taxes?</p>
              <p className="text-xs">Try asking: "Should I incorporate?" or "What is my effective tax rate?"</p>
            </div>
          )}
          
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex w-full",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {/* Render text parts */}
                {m.parts.filter(p => p.type === 'text').map((p, i) => (
                   <span key={i}>{p.text}</span>
                ))}
                {/* Fallback for simple content if parts are not used/available in this version? 
                    Actually UIMessage has parts. 
                    But if it's a simple string message? 
                    Let's check UIMessage definition.
                    It has `parts`.
                */}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 border-t bg-background">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
