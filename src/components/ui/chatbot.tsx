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
    "We're open Monday to Friday, 9am to 6pm, Saturday 10am to 4pm. Closed on Sundays.",
    "Our working hours are 9am to 6pm on weekdays and 10am to 4pm on Saturdays. We're closed on Sundays.",
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
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDark);
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

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
    } else if (normalizedMessage.match(/service|offer|provide|do you do|photograph|videograph|film|editing/i)) {
      return BOT_RESPONSES.services[Math.floor(Math.random() * BOT_RESPONSES.services.length)];
    } else if (normalizedMessage.match(/contact|reach|email|phone|call|address|location|office/i)) {
      return BOT_RESPONSES.contact[Math.floor(Math.random() * BOT_RESPONSES.contact.length)];
    } else if (normalizedMessage.match(/price|cost|how much|fee|charge|quote|pricing/i)) {
      return BOT_RESPONSES.pricing[Math.floor(Math.random() * BOT_RESPONSES.pricing.length)];
    } else if (normalizedMessage.match(/hours|time|when|open|schedule|weekend|saturday|sunday/i)) {
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
      <motion.button
        onClick={toggleChat}
        className={`flex items-center justify-center gap-2 ${
          isDarkTheme 
            ? "bg-indigo-600 hover:bg-indigo-700" 
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white rounded-full py-3 px-5 shadow-lg font-medium`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
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
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className={`absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)] ${
              isDarkTheme 
                ? "bg-gray-800 text-white" 
                : "bg-white text-gray-900"
            } rounded-2xl shadow-xl overflow-hidden flex flex-col`}
            style={{ height: "500px" }}
          >
            {/* Chat header */}
            <motion.div 
              className="flex items-center justify-between px-4 py-4 bg-indigo-600 text-white"
              whileHover={{ backgroundColor: "#4338ca" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <FaRegComment size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">ABC Studios Assistant</h3>
                  <p className="text-xs opacity-80">Ask me anything about our services</p>
                </div>
              </div>
              <motion.button 
                onClick={toggleChat} 
                className="p-2 hover:bg-indigo-700 rounded-full transition-colors"
                aria-label="Close chat"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={16} />
              </motion.button>
            </motion.div>

            {/* Chat messages */}
            <div className={`flex-1 p-4 overflow-y-auto ${
              isDarkTheme ? "bg-gray-900" : "bg-gray-50"
            }`}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-3 break-words",
                        message.sender === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : isDarkTheme 
                            ? "bg-gray-700 text-white rounded-tl-none" 
                            : "bg-gray-200 text-gray-800 rounded-tl-none"
                      )}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div
                        className={cn(
                          "text-xs mt-1",
                          message.sender === "user"
                            ? "text-indigo-200"
                            : isDarkTheme 
                              ? "text-gray-400" 
                              : "text-gray-500"
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={`rounded-2xl px-4 py-3 rounded-tl-none ${
                      isDarkTheme ? "bg-gray-700" : "bg-gray-200"
                    }`}>
                      <div className="flex space-x-1">
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-gray-500" : "bg-gray-400"}`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        ></motion.div>
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-gray-500" : "bg-gray-400"}`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        ></motion.div>
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-gray-500" : "bg-gray-400"}`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className={`p-3 border-t ${
              isDarkTheme ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
            }`}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className={`flex-1 py-2 px-3 rounded-full ${
                    isDarkTheme 
                      ? "bg-gray-700 text-white placeholder:text-gray-400 focus:ring-indigo-400" 
                      : "bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:ring-indigo-500"
                  } outline-none focus:ring-2 transition-all duration-200`}
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <IoSend size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
