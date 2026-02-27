import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Indore travel assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Try Gemini API first
      let botText = "";
      
      if (GOOGLE_API_KEY && GOOGLE_API_KEY !== "your_gemini_api_key_here") {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are a helpful travel assistant for Indore, India. Provide helpful, concise answers about Indore's attractions, food, culture, and travel tips. User asks: ${userInput}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          botText = data.candidates[0]?.content?.parts[0]?.text || "";
        }
      }

      // Fallback responses if API fails
      if (!botText) {
        const fallbackResponses = [
          "Indore is famous for its street food, especially Poha and Jalebi!",
          "You should visit Rajwada Palace and Lal Bagh Palace for heritage sites.",
          "Sarafa Bazaar is great for shopping traditional items.",
          "Don't miss trying the local Indori cuisine at Chhappan Dukan.",
          "Khajrana Temple is a beautiful spiritual place to visit.",
          "The best time to visit Indore is during winter months (October to February)."
        ];
        
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        botText = randomResponse;
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Save to backend (with error handling)
      try {
        await fetch('http://localhost:5000/api/chat/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            userMessage: userInput,
            botResponse: botText,
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.error('Failed to save chat to backend:', error);
        // Store in localStorage as fallback
        const chats = JSON.parse(localStorage.getItem('chats') || '[]');
        chats.push({
          userMessage: userInput,
          botResponse: botText,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('chats', JSON.stringify(chats));
      }

    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">Indore Travel Assistant</h1>
        <p className="text-muted-foreground">Ask me anything about Indore!</p>
      </div>

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Chat Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-muted text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Indore's attractions, food, culture..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Quick Suggestions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Quick Questions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            "Best places to visit?",
            "Famous street food?",
            "How to reach Indore?",
            "Cultural events?"
          ].map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(suggestion)}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
