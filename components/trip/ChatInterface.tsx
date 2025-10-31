'use client';

import { useState } from 'react';
import { Send, User, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  initialMessage?: string;
}

const ChatInterface = ({ initialMessage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: initialMessage || 'Hey there, adventurous soul! Ready to dive into another cultural escapade or maybe a thrilling solo adventure? Let\'s craft your next unforgettable journey!',
      timestamp: new Date(),
      suggestions: ['Explore medina', 'Visit tanneries', 'Try local food', 'Desert adventure', 'Atlas Mountains'],
    },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Great choice! Let me help you with "${messageText}". I'm gathering the best recommendations and creating a personalized itinerary for you.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="h-full flex flex-col relative"
      style={{
        backgroundImage: "url('/background1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white dark:bg-slate-900/85 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white/90 via-amber-50/40 to-white/90 dark:from-slate-900/90 dark:via-amber-900/15 dark:to-slate-900/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/20 flex items-center justify-center p-2 border border-amber-900/10 dark:border-amber-400/20 shadow-sm">
            <Image src="/safia.jpg" alt="SafIA Logo" width={40} height={40} className="absolute" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">SafIA</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Your Morocco Travel Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/20 flex items-center justify-center p-2 border border-amber-900/10 dark:border-amber-400/20 shadow-sm">
                    <Image src="/safia.jpg" alt="Assistant" width={40} height={40} className="absolute" />
                  </div>
                )}

                <div
                  className={`rounded-2xl px-5 py-3.5 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-700 dark:to-amber-600 text-white max-w-[60%] shadow-amber-900/10'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 max-w-[85%] border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-700 dark:to-amber-600 flex items-center justify-center shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {message.suggestions && showSuggestions && index === messages.length - 1 && (
                <div className="mt-4 ml-[52px] flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-amber-900/40 dark:hover:border-amber-400/40 transition-all hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-6 py-5 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white/90 via-amber-50/30 to-white/90 dark:from-slate-900/90 dark:via-amber-900/10 dark:to-slate-900/90 backdrop-blur-sm">
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-sm hover:border-amber-900/30 dark:hover:border-amber-700/30 focus-within:border-amber-900/50 dark:focus-within:border-amber-700/50 transition-all">
          <button className="p-1.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors">
            <Paperclip className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your trip..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium"
          />
          <button className="p-1.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors">
            <Mic className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            size="icon"
            className="rounded-full w-9 h-9 bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-700 dark:to-amber-600 hover:from-amber-800 hover:to-amber-700 dark:hover:from-amber-600 dark:hover:to-amber-500 text-white shrink-0 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-3">
          AI-powered assistance • Click to share{' '}
          <span className="underline cursor-pointer hover:text-amber-900 dark:hover:text-amber-400 transition-colors font-medium">feedback</span>
        </p>
      </div>
      </div>
    </div>
  );
};

export default ChatInterface;
