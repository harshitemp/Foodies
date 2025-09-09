"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm FoodieBot 🤖 How can I help you with your food delivery today? I can recommend restaurants, explain menu items, or assist with your order!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) {
        throw new Error("Failed to get response")
      }

      // Handle streaming response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantResponse = ""

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          assistantResponse += chunk

          // Update the last message (assistant response) with streaming content
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: "assistant", content: assistantResponse }
            return updated
          })
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 flex flex-col shadow-xl z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-green-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span className="font-semibold">FoodieBot</span>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-green-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-green-600" />
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              {message.content}
            </div>
            {message.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-green-600" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about food, restaurants, or your order..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  )
}
