import React, { useState } from 'react';
import { Zap, X, Send, Sparkles, ArrowUpRight } from 'lucide-react';

export const InstantAiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPrompt, setHoveredPrompt] = useState<number | null>(null);

  const [messages, setMessages] = useState<
    Array<{
      sender: 'user' | 'assistant';
      text: string;
      time: string;
    }>
  >([
    {
      sender: 'assistant',
      text: 'Hi! I’m Orion’s project assistant. Ask me about my services, the kind of websites and web apps We build, or how to get started.',
      time: 'Just now',
    },
  ]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const query = inputMessage.trim();
    if (!query || isLoading) return;

    const userMsg = {
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/quick-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      const replyText =
        data.reply ||
        'I’m available for new website and web app projects. Tell me what you’re looking to build, or use the contact form to get started.';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: replyText,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } catch (err) {
      console.error('Quick chat error:', err);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'I couldn’t connect right now. You can still explore my work or use the contact form to tell me about your project.',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'What can you build?',
    'How does a project work?',
    'How much does it cost?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative overflow-hidden px-4 py-3 rounded-full bg-[#FFFCF8] border border-[#DED5CC] hover:border-[#C97872] text-[#1F1D1B] shadow-xl shadow-[#1F1D1B]/10 flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_16px_35px_rgba(31,29,27,0.14)] active:scale-95"
          id="instant-ai-assistant-toggle"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C97872] transition-transform duration-300 group-hover:scale-125" />
          </span>

          <Zap className="relative z-10 w-4 h-4 text-[#B06A64] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />

          <span className="relative z-10 text-xs font-medium tracking-tight text-[#706B65] group-hover:text-[#1F1D1B] transition-colors">
            Quick project Q&A
          </span>

          <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#C97872] opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />

          <span className="absolute inset-0 -translate-x-full bg-[#F1DFDA]/60 transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[480px] bg-[#FFFCF8] rounded-2xl border border-[#DED5CC] shadow-2xl shadow-[#1F1D1B]/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-[#F8F5F0] border-b border-[#DED5CC] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="group w-8 h-8 rounded-lg bg-[#F1DFDA] border border-[#DED5CC] flex items-center justify-center text-[#B06A64] transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:border-[#C97872]/50">
                <Zap className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-[#1F1D1B]">
                    Orion Project Assistant
                  </h4>

                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#F1DFDA] text-[#B06A64] border border-[#DED5CC]">
                    Quick
                  </span>
                </div>

                <p className="text-[10px] text-[#706B65]">
                  Ask about projects, services, or getting started
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="group p-1.5 rounded-lg hover:bg-[#F1DFDA] text-[#706B65] hover:text-[#1F1D1B] transition-all duration-300 hover:rotate-90"
              aria-label="Close AI Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl transition-all duration-300 hover:shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#C97872] text-white font-medium rounded-br-xs hover:bg-[#B06A64]'
                      : 'bg-[#F8F5F0] border border-[#DED5CC] text-[#706B65] rounded-bl-xs hover:border-[#C97872]/25'
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[9px] text-[#706B65]/70 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#706B65] text-xs p-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B06A64] animate-spin" />
                <span>Putting together an answer...</span>
              </div>
            )}
          </div>

          {/* Sample Prompts */}
          <div className="px-3 py-2 bg-[#F8F5F0] border-t border-[#DED5CC]/70 flex items-center gap-1.5 overflow-x-auto text-[10px] text-[#706B65]">
            <span className="shrink-0 text-[#706B65] font-semibold">Try:</span>

            {quickPrompts.map((quickPrompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputMessage(quickPrompt)}
                onMouseEnter={() => setHoveredPrompt(i)}
                onMouseLeave={() => setHoveredPrompt(null)}
                className="group shrink-0 px-2 py-1 rounded bg-[#FFFCF8] border border-[#DED5CC] hover:border-[#C97872] hover:bg-[#F1DFDA] text-[#706B65] hover:text-[#1F1D1B] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-1">
                  {quickPrompt}
                  <ArrowUpRight
                    className={`w-2.5 h-2.5 transition-all duration-200 ${
                      hoveredPrompt === i
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-1'
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#FFFCF8] border-t border-[#DED5CC] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about your project..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#F8F5F0] text-[#1F1D1B] placeholder-[#706B65]/70 text-xs px-3 py-2 rounded-xl border border-[#DED5CC] focus:outline-none focus:border-[#C97872] focus:ring-2 focus:ring-[#C97872]/10 transition-all duration-200"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="group relative overflow-hidden p-2 rounded-xl bg-[#C97872] text-white font-semibold hover:bg-[#B06A64] transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 shrink-0 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(201,120,114,0.20)]"
              aria-label="Send message"
            >
              <Send className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
