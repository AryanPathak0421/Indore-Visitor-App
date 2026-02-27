 import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export function Chatbot() {
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
      // Create prompt with context
      const systemContext = `You are a helpful travel assistant for Indore, India. Provide friendly, informative, and detailed responses about Indore's tourist attractions, food, hotels, transport, events, and general travel information. Be conversational and provide comprehensive information. Include specific details, recommendations, tips, and helpful context. Always complete your thoughts and provide full, complete answers. Aim for responses between 200-400 words to be thorough and helpful. Make sure to finish your response completely without cutting off mid-sentence.`;
      
      const prompt = `${systemContext}\n\nUser: ${userInput}\n\nAssistant:`;
      
      // Try different model endpoints - gemini-3-flash-preview first, fallback to others
      const models = [
        "gemini-3-flash-preview",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro-latest",
        "gemini-pro",
      ];
      
      let lastError: any = null;
      let response: Response | null = null;
      let data: any = null;
      
      for (const model of models) {
        try {
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_API_KEY}`,
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
                        text: prompt,
                      },
                    ],
                  },
                ],
                generationConfig: {
                  temperature: 0.7,
                  topK: 40,
                  topP: 0.95,
                  maxOutputTokens: 2048,
                },
              }),
            }
          );
          
          data = await response.json();
          
          if (response.ok) {
            break; // Success, exit loop
          } else if (data.error?.message?.includes("not found") || data.error?.message?.includes("not supported")) {
            lastError = new Error(data.error.message);
            continue; // Try next model
          } else {
            throw new Error(data.error?.message || `API Error: ${response.status}`);
          }
        } catch (err: any) {
          lastError = err;
          if (!err.message?.includes("not found") && !err.message?.includes("not supported")) {
            throw err; // Re-throw if it's not a model not found error
          }
          continue; // Try next model
        }
      }
      
      if (!response || !response.ok || !data) {
        throw lastError || new Error("All model attempts failed");
      }

      // Extract text from all parts in case response is split
      const candidate = data.candidates?.[0];
      let botText = "";
      
      if (candidate?.content?.parts) {
        // Combine all text parts
        botText = candidate.content.parts
          .map((part: any) => part.text || "")
          .filter((text: string) => text.trim() !== "")
          .join("");
      }
      
      // Check if response was cut off
      const finishReason = candidate?.finishReason;
      if (finishReason === "MAX_TOKENS" || finishReason === "LENGTH") {
        console.warn("Response was truncated due to token limit");
        // Increase token limit for next time or inform user
      }
      
      if (!botText || botText.trim() === "") {
        botText = "I apologize, but I'm having trouble processing your request. Could you please rephrase your question?";
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: botText.trim(),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error: any) {
      console.error("Error fetching AI response:", error);
      
      let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error?.message) {
        if (error.message.includes("403") || error.message.includes("Permission")) {
          errorMessage = "API access denied. Please check if the API key is valid and has the necessary permissions.";
        } else if (error.message.includes("404")) {
          errorMessage = "The API endpoint was not found. Please verify the API configuration.";
        } else if (error.message.includes("429")) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (error.message.includes("500") || error.message.includes("503")) {
          errorMessage = "The service is temporarily unavailable. Please try again in a few moments.";
        } else {
          errorMessage = `Error: ${error.message}. Please try again.`;
        }
      }

      const errorResponse: Message = {
        id: messages.length + 2,
        text: errorMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden animate-fade-in w-full">
      <div className="px-6 py-4 border-b border-border flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-foreground">Travel Assistant</h2>
      </div>

      <div className="h-[400px] overflow-y-auto px-4 py-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-accent text-foreground rounded-2xl px-4 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSend} className="px-4 py-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Indore..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
