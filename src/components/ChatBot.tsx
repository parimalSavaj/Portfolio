import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithGemini } from "../features/chatbot/chatbotService";

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm here to help you learn about this portfolio. Ask me anything about skills, projects, or experience!" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Show ChatBot button after delay ONLY on first load
  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setShowButton(true);
        setHasAnimated(true);
      }, 2000); // 2 seconds
      return () => clearTimeout(timer);
    } else {
      setShowButton(true); // Instantly show after first time
    }
  }, [hasAnimated]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Close chat when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages((msgs) => [...msgs, { from: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      const botResponse = await chatWithGemini(userMessage);
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button with animation and delay only on first load */}
      <AnimatePresence>
        {showButton &&
          !open &&
          (hasAnimated ? (
            <motion.button
              key="chatbot-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-24 right-8 z-50 p-3 bg-gradient-to-r from-aurora-purple to-aurora-blue rounded-full shadow-lg hover:shadow-aurora-purple/50 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-aurora-purple/30"
              onClick={() => setOpen((o) => !o)}
              aria-label="Open chat bot"
            >
              {/* Simple Bot SVG Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-white rotate-on-hover"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="currentColor"
                  className="text-aurora-blue"
                />
                <ellipse cx="8.5" cy="12" rx="1.5" ry="2" fill="#fff" />
                <ellipse cx="15.5" cy="12" rx="1.5" ry="2" fill="#fff" />
                <rect
                  x="9"
                  y="16"
                  width="6"
                  height="1.5"
                  rx="0.75"
                  fill="#fff"
                />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              key="chatbot-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="fixed bottom-24 right-8 z-50 p-3 bg-gradient-to-r from-aurora-purple to-aurora-blue rounded-full shadow-lg hover:shadow-aurora-purple/50 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-aurora-purple/30"
              onClick={() => setOpen((o) => !o)}
              aria-label="Open chat bot"
            >
              {/* Simple Bot SVG Icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-white rotate-on-hover"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="currentColor"
                  className="text-aurora-blue"
                />
                <ellipse cx="8.5" cy="12" rx="1.5" ry="2" fill="#fff" />
                <ellipse cx="15.5" cy="12" rx="1.5" ry="2" fill="#fff" />
                <rect
                  x="9"
                  y="16"
                  width="6"
                  height="1.5"
                  rx="0.75"
                  fill="#fff"
                />
              </svg>
            </motion.button>
          ))}
      </AnimatePresence>

      {/* Chat Window */}
      {open && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-40 right-8 z-50 w-80 max-w-[90vw] bg-aurora-night border border-aurora-purple/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="currentColor"
                className="text-aurora-blue"
              />
              <ellipse cx="8.5" cy="12" rx="1.5" ry="2" fill="#fff" />
              <ellipse cx="15.5" cy="12" rx="1.5" ry="2" fill="#fff" />
              <rect x="9" y="16" width="6" height="1.5" rx="0.75" fill="#fff" />
            </svg>
            <span className="font-semibold ml-2">Aurora ChatBot</span>
            <button
              className="ml-auto text-white/70 hover:text-white text-xl font-bold focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close chat bot"
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div
            className="flex-1 px-4 py-3 overflow-y-auto bg-aurora-night/80"
            style={{ maxHeight: 320 }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                    msg.from === "user"
                      ? "bg-aurora-purple text-white"
                      : "bg-aurora-blue/20 text-aurora-text"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-2 flex justify-start">
                <div className="px-3 py-2 rounded-lg text-sm bg-aurora-blue/20 text-aurora-text">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 px-4 py-3 border-t border-aurora-purple/20 bg-aurora-night"
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg bg-aurora-night border border-aurora-purple/20 text-aurora-text placeholder-aurora-muted focus:outline-none focus:ring-2 focus:ring-aurora-purple/30"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-aurora-purple to-aurora-blue text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200 disabled:opacity-50"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
