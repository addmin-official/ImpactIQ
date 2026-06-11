import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Trash2, 
  HelpCircle,
  TrendingUp,
  RefreshCw,
  AlertOctagon,
  Award,
  Users,
  Terminal,
  Lightbulb,
  FileSpreadsheet
} from 'lucide-react';

export const AssistantView: React.FC = () => {
  const { projects, beneficiaries, impactLogs, reports } = useApp();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts specified in the user request
  const quickPrompts = [
    { text: 'کام پڕۆژە زۆرترین مەترسی هەیە؟', icon: AlertOctagon, color: 'text-rose-500' },
    { text: 'ڕاپۆرتی کورت بۆ پڕۆژەی پاشماوەی خۆراک دروست بکە', icon: FileSpreadsheet, color: 'text-amber-500 font-bold' },
    { text: 'باشترین پڕۆژە لە ڕووی کاریگەرییەوە کامەیە؟', icon: Award, color: 'text-indigo-500' },
    { text: 'ژمارەی سوودمەندان چەندە؟', icon: Users, color: 'text-teal-500' },
    { text: 'پێشنیاری چاکسازی بۆ پڕۆژەکان بدە', icon: Lightbulb, color: 'text-pink-500' },
  ];

  // Auto-scroll on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load initial welcome prompt on first Mount
  useEffect(() => {
    const savedChat = localStorage.getItem('mne_assistant_chat');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      const defaultMsg: ChatMessage = {
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'بەخێربێن بۆ مێشکی زیرەکی پیشاندەر! من یاریدەدەرێکی پێشکەوتووی چاودێری و هەڵسەنگاندنم (M&E). دەتوانم بە زمانی کوردی سۆرانی، لەسەر بنەمای زانیارییە فەرمییەکانی سەرەوە، شیکاری پڕۆژەکان، ڕێژەی سەرکەوتن، دابەشبوون یان پێشنیاری نوێخوازی پێشکەش بکەم. یەکێک لە پرسیارە ئامادەکان تاقیبکەرەوە یان لێرە بۆم بنووسە.',
        timestamp: new Date().toLocaleTimeString('ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([defaultMsg]);
    }
  }, []);

  const saveHistory = (msgs: ChatMessage[]) => {
    setMessages(msgs);
    localStorage.setItem('mne_assistant_chat', JSON.stringify(msgs));
  };

  const handleClearChat = () => {
    if (confirm('ئایا دڵنیایت کە دەتەوێت مێژووی گفتوگۆی یاریدەدەر بسڕیتەوە؟')) {
      const defaultMsg: ChatMessage = {
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'خاوێنکرایەوە. دەتوانیت سەرلەنوێ گفتوگۆ دەست پێ بکەیتەوە لەسەر داتاو پڕۆژە نوێیەکانی ناو سیستەمەکە.',
        timestamp: new Date().toLocaleTimeString('ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };
      saveHistory([defaultMsg]);
    }
  };

  // Chat sender action
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('ku-IQ', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMsgs = [...messages, userMsg];
    saveHistory(updatedMsgs);
    setInputValue('');
    setIsLoading(true);

    try {
      // Package active application context and pass to Gemini API endpoint
      const rawResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            projects,
            beneficiaries,
            impactLogs,
            reports
          },
          history: updatedMsgs.slice(-10).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      const data = await rawResponse.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'ببوورە کێشەی تەکنیکی ڕوویداوە لە دانانی پێوەندیدا.',
        timestamp: new Date().toLocaleTimeString('ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };

      saveHistory([...updatedMsgs, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: 'ناتوانم وەڵامت بدەمەوە لە قۆناغی یەکەمدا بەهۆی نەمانی هێڵی ئینتەرنێت، یان کێشە لە ڕاوتەری سێرڤەر. تکایە پشکنینی کلیلەکان بکەرەوە.',
        timestamp: new Date().toLocaleTimeString('ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };
      saveHistory([...updatedMsgs, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in font-sans h-[calc(100vh-140px)]">
      
      {/* Middle/Left Chatting Arena */}
      <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full">
        
        {/* Chat Status Bar Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <Sparkles size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h4 className="font-bold text-xs">مێشکی پیشاندەر (یاریدەدەری شیکاری)</h4>
              <p className="text-[9px] text-emerald-400 font-semibold">• چالاککراوە بە مۆدێلی Gemini 3.5 Flash</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="خاوێنکردنەوەی چات"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Conversation Bubbles Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'mr-auto flex-row-reverse text-left' : 'ml-auto text-right'}`}
              >
                {/* Sender Icon */}
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${
                  isUser 
                    ? 'bg-sky-50 text-sky-600 border-sky-100' 
                    : 'bg-indigo-900 text-indigo-200 border-indigo-950'
                }`}>
                  {isUser ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Message Bubble Column */}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed font-medium whitespace-pre-line ${
                    isUser 
                      ? 'bg-sky-600 text-white rounded-tl-none font-semibold shadow-md shadow-sky-600/5' 
                      : 'bg-white text-slate-850 border border-slate-200/80 rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 block px-1 font-mono">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Assistant Loading Pulse */}
          {isLoading && (
            <div className="flex gap-3 max-w-[80%] ml-auto text-right">
              <div className="w-8 h-8 rounded-lg bg-indigo-900 border border-indigo-950 shrink-0 flex items-center justify-center text-white">
                <RefreshCw size={14} className="animate-spin" />
              </div>
              <div className="space-y-1">
                <div className="p-4 bg-white border border-slate-200/80 text-slate-500 rounded-2xl rounded-tr-none text-xs flex items-center gap-2 font-bold animate-pulse">
                  <span>مێشکی پیشاندەر بیردەکاتەوە و داتاکان دەپشکێنێت...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="p-4 bg-white border-t border-slate-200/85 flex items-center gap-3 shrink-0"
        >
          <input
            id="assistant-textbox"
            type="text"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="پرسیارێکی نوێ بنووسە لەسەر پڕۆژە نیشتمانییەکان، مەترسییەکان یان سوودمەندان..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:bg-white focus:border-sky-500 transition-all font-medium"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-40 shrink-0 cursor-pointer"
          >
            <Send size={15} />
          </button>
        </form>

      </div>

      {/* Right Sidebar: Guidelines and presets */}
      <div className="space-y-6 lg:col-span-1 h-full overflow-y-auto">
        
        {/* Explanatory manual */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2.5">
            <HelpCircle size={15} className="text-sky-600" />
            <span>پرسیارە دیمو پێویستەکان</span>
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
            یەکێک لەم پرسیارە داواکراوانەی خوارەوە بەستراون بە داتای فەرمی پڕۆژەکان. بە کرتەیەک ڕاستەوخۆ وەڵامی شیکاری وەربگرن:
          </p>

          <div className="space-y-2.5">
            {quickPrompts.map((prompt, idx) => {
              const Icon = prompt.icon;
              return (
                <button
                  id={`quick-prompt-btn-${idx}`}
                  key={idx}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="w-full text-right p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all rounded-xl text-xs text-slate-650 flex items-start gap-2.5 group cursor-pointer"
                >
                  <Icon size={14} className={`${prompt.color} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                  <span className="font-semibold">{prompt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Warning card */}
        <div className="bg-amber-500/5 border border-amber-500/15 p-4 rounded-xl space-y-2">
          <h5 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <Terminal size={14} />
            <span>یاسای ڕوونخوازی داتا</span>
          </h5>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            مێشکی پیشاندەر تەنها پشت بە داتای ناو بەرهەم دەبەستێت. ئەگەر داوای داتای خەیاڵی بکرێت، ڕاستەوخۆ دەڵێت: <strong className="text-slate-700">"ئەم زانیارییە لە داتای ئێستادا بەردەست نییە."</strong>
          </p>
        </div>

      </div>

    </div>
  );
};
