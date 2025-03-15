"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaRegComment, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

// Common responses for the bot
const BOT_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Welcome to ABC Studios! How may I help you?",
  ],
  services: [
    "We offer a wide range of services including photography, videography, film production, and post-production editing.",
    "Our services include professional photo shoots, video production, film making, and editing services.",
  ],
  contact: [
    "You can reach us at contact@abcstudios.com or call us at +91 (484) 246-1930.",
    "Feel free to visit our office at St Joseph's College of Engineering and Technology, Choondacherry, Palai, Kottayam, Kerala - 686579 or email us at contact@abcstudios.com.",
  ],
  pricing: [
    "Our pricing varies based on the project requirements. Please email us at contact@abcstudios.com for a custom quote.",
    "We offer customized pricing based on your specific needs. Please reach out to us for a detailed quotation.",
  ],
  hours: [
    "We're open Monday to Friday, 9am to 6pm. Weekends are by appointment only.",
    "Our working hours are 9am to 6pm on weekdays. We can arrange weekend appointments upon request.",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase that?",
    "I'm still learning! Could you try asking in a different way?",
    "I didn't quite catch that. Can you provide more details?",
  ],
};

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting when the chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)];
      setTimeout(() => {
        setMessages([
          {
            id: Date.now().toString(),
            text: greeting,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input field when chat is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Check for keywords in the user's message
    if (normalizedMessage.match(/hi|hello|hey|howdy/i)) {
      return BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)];
    } else if (normalizedMessage.match(/service|offer|provide|do you do/i)) {
      return BOT_RESPONSES.services[Math.floor(Math.random() * BOT_RESPONSES.services.length)];
    } else if (normalizedMessage.match(/contact|reach|email|phone|call/i)) {
      return BOT_RESPONSES.contact[Math.floor(Math.random() * BOT_RESPONSES.contact.length)];
    } else if (normalizedMessage.match(/price|cost|how much|fee|charge/i)) {
      return BOT_RESPONSES.pricing[Math.floor(Math.random() * BOT_RESPONSES.pricing.length)];
    } else if (normalizedMessage.match(/hours|time|when|open|schedule/i)) {
      return BOT_RESPONSES.hours[Math.floor(Math.random() * BOT_RESPONSES.hours.length)];
    } else {
      return BOT_RESPONSES.fallback[Math.floor(Math.random() * BOT_RESPONSES.fallback.length)];
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    } as Message;
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      } as Message;
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Chatbot button */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 px-5 shadow-lg transition-all duration-300 font-medium"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <>
            <FaTimes size={16} />
            <span className="text-sm">Close</span>
          </>
        ) : (
          <>
            <FaRegComment size={16} />
            <span className="text-sm">Chat</span>
          </>
        )}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: "500px" }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-4 bg-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <FaRegComment size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">ABC Studios Assistant</h3>
                  <p className="text-xs opacity-80">Ask me anything about our services</p>
                </div>
              </div>
              <button 
                onClick={toggleChat} 
                className="p-2 hover:bg-indigo-700 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-3 break-words",
                        message.sender === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-tl-none"
                      )}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div
                        className={cn(
                          "text-xs mt-1",
                          message.sender === "user"
                            ? "text-indigo-200"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-3 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="flex-1 py-2 px-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <IoSend size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
