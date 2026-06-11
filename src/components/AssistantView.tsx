import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
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
  const { language, t, direction } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts using translations
  const quickPrompts = [
    { text: t('assistant.q1'), icon: AlertOctagon, color: 'text-rose-500' },
    { text: t('assistant.q4'), icon: FileSpreadsheet, color: 'text-amber-500 font-bold' },
    { text: t('assistant.q2'), icon: Award, color: 'text-indigo-500' },
    { text: t('assistant.q3'), icon: Users, color: 'text-teal-500' },
    { text: t('assistant.q5'), icon: Lightbulb, color: 'text-pink-500' },
  ];

  // Auto-scroll on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load chat or generate default based on current language
  useEffect(() => {
    const savedChat = localStorage.getItem('mne_assistant_chat');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      const defaultMsg: ChatMessage = {
        id: 'msg-welcome',
        sender: 'assistant',
        text: t('assistant.initial_msg'),
        timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([defaultMsg]);
    }
  }, [language]); // Reload initial welcoming copy if the user switches languages!

  const saveHistory = (msgs: ChatMessage[]) => {
    setMessages(msgs);
    localStorage.setItem('mne_assistant_chat', JSON.stringify(msgs));
  };

  const handleClearChat = () => {
    const confirmMsg = language === 'en' 
      ? 'Are you sure you want to clear conversation history?' 
      : language === 'ar' 
      ? 'هل أنت متأكد من مسح محادثات الذكاء الاصطناعي بالكامل؟' 
      : 'ئایا دڵنیایت کە دەتەوێت مێژووی گفتوگۆی یاریدەدەر بسڕیتەوە؟';

    if (confirm(confirmMsg)) {
      const defaultMsg: ChatMessage = {
        id: 'msg-welcome',
        sender: 'assistant',
        text: language === 'en' ? 'Conversation history cleared. Start typing your query below.' : language === 'ar' ? 'تم تصفية المحادثات الحالية. تفضل بطرح أسئلة جديدة.' : 'خاوێنکرایەوە. دەتوانیت سەرلەنوێ گفتوگۆ دەست پێ بکەیتەوە لەسەر داتاو پڕۆژە نوێیەکانی ناو سیستەمەکە.',
        timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ku-IQ', { hour: '2-digit', minute: '2-digit' })
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
      timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ku-IQ', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMsgs = [...messages, userMsg];
    saveHistory(updatedMsgs);
    setInputValue('');
    setIsLoading(true);

    try {
      // Pass preferred language as part of context so the backend knows which tongue to reply in!
      const rawResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: language,
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
        text: data.reply || t('assistant.fallback_msg'),
        timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };

      saveHistory([...updatedMsgs, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: language === 'en' ? 'Unable to communicate with the AI core. Please check server logs.' : language === 'ar' ? 'فشل الاتصال بسيرفر الذكاء الاصطناعي. يرجى تجربة العملية لاحقاً.' : 'ناتوانم وەڵامت بدەمەوە لە قۆناغی یەکەمدا بەهۆی نەمانی هێڵی ئینتەرنێت. تکایە پشکنینی کلیلەکان بکەرەوە.',
        timestamp: new Date().toLocaleTimeString(language === 'en' ? 'en-US' : 'ku-IQ', { hour: '2-digit', minute: '2-digit' })
      };
      saveHistory([...updatedMsgs, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubStatusLabel = () => {
    if (language === 'en') return '• Powered by Gemini AI Core engine';
    if (language === 'ar') return '• مدعوم بوحدة خوادم جيميناي للترميز';
    return '• چالاککراوە بە مۆدێلی Gemini 3.5 Flash';
  };

  const getAssistantLoadingMsg = () => {
    if (language === 'en') return 'AI is inspecting indicators and analyzing data...';
    if (language === 'ar') return 'يقوم الذكاء الاصطناعي بتحسين المعايير والبحث في السجلات التنموية...';
    return 'مێشکی پیشاندەر بیردەکاتەوە و داتاکان دەپشکێنێت...';
  };

  const getRulesTitle = () => language === 'en' ? 'Data Anchoring Rules' : language === 'ar' ? 'قواعد دقة السجلات' : 'یاسای ڕوونخوازی داتا';
  const getRulesBody = () => {
    if (language === 'en') return `The smart assistant strictly refers to data currently loaded in the system. If you ask about details that do not exist, it will state: "${t('assistant.fallback_msg')}"`;
    if (language === 'ar') return `تمت برمجة المساعد للاستجابة الحصرية للمعلومات المثبتة. عند عدم وجود سجلات كافية، سيجيب: "${t('assistant.fallback_msg')}"`;
    return `مێشکی پیشاندەر تەنها پشت بە داتای ناو بەرهەم دەبەستێت. ئەگەر داوای داتای خەیاڵی بکرێت، ڕاستەوخۆ دەڵێت: "${t('assistant.fallback_msg')}"`;
  };

  const getQuickManualTitle = () => language === 'en' ? 'Suggested analysis queries' : language === 'ar' ? 'نموذج أسئلة التدقيق الشائعة' : 'پرسیارە دیمو پێویستەکان';
  const getQuickManualSub = () => {
    if (language === 'en') return 'Select any of the verified M&E questions below to trigger instant analysis:';
    if (language === 'ar') return 'اختر أحد نماذج التقصي المعتمدة أدناه للحصول على تفنيد واحتساب ذكي فوري:';
    return 'یەکێک لەم پرسیارە داواکراوانەی خوارەوە بەستراون بە داتای فەرمی پڕۆژەکان. بە کرتەیەک ڕاستەوخۆ وەڵامی شیکاری وەربگرن:';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in font-sans h-auto lg:h-[calc(100vh-140px)] pb-6 lg:pb-0">
      
      {/* Middle/Left Chatting Arena */}
      <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden h-[500px] lg:h-full">
        
        {/* Chat Status Bar Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <Sparkles size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div className="text-right rtl:text-right ltr:text-left">
              <h4 className="font-bold text-xs">{t('assistant.title')}</h4>
              <p className="text-[9px] text-emerald-400 font-semibold">{getSubStatusLabel()}</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title={language === 'en' ? 'Clear chats' : 'خاوێنکردنەوە'}
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
                className={`flex gap-3 max-w-[85%] ${isUser ? (direction === 'rtl' ? 'ml-auto flex-row text-right' : 'mr-auto flex-row-reverse text-left') : (direction === 'rtl' ? 'mr-auto flex-row-reverse text-left' : 'ml-auto flex-row text-right')}`}
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
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tr-none text-right rtl:text-right ltr:text-left'
                  }`}>
                    {m.text}
                  </div>
                  <span className={`text-[9px] text-slate-400 block px-1 font-mono ${isUser ? (direction === 'rtl' ? 'text-right' : 'text-left') : (direction === 'rtl' ? 'text-left' : 'text-right')}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Assistant Loading Pulse */}
          {isLoading && (
            <div className={`flex gap-3 max-w-[80%] ${direction === 'rtl' ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}>
              <div className="w-8 h-8 rounded-lg bg-indigo-900 border border-indigo-950 shrink-0 flex items-center justify-center text-white">
                <RefreshCw size={14} className="animate-spin" />
              </div>
              <div className="space-y-1">
                <div className="p-4 bg-white border border-slate-200/80 text-slate-500 rounded-2xl rounded-tr-none text-xs flex items-center gap-2 font-bold animate-pulse">
                  <span>{getAssistantLoadingMsg()}</span>
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
            placeholder={t('assistant.placeholder')}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-800"
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
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-right rtl:text-right ltr:text-left">
          <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2.5 flex-row-reverse">
            <HelpCircle size={15} className="text-sky-600" />
            <span className="flex-1">{getQuickManualTitle()}</span>
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
            {getQuickManualSub()}
          </p>

          <div className="space-y-2.5">
            {quickPrompts.map((prompt, idx) => {
              const Icon = prompt.icon;
              return (
                <button
                  id={`quick-prompt-btn-${idx}`}
                  key={idx}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="w-full text-right p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all rounded-xl text-xs text-slate-650 flex items-start gap-2.5 group cursor-pointer flex-row-reverse"
                >
                  <Icon size={14} className={`${prompt.color} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                  <span className="font-semibold flex-1 text-right rtl:text-right ltr:text-left break-words pr-2 pl-2">{prompt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Warning card */}
        <div className="bg-amber-500/5 border border-amber-500/15 p-4 rounded-xl space-y-2 text-right rtl:text-right ltr:text-left">
          <h5 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 flex-row-reverse">
            <Terminal size={14} className="shrink-0" />
            <span className="flex-1">{getRulesTitle()}</span>
          </h5>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            {getRulesBody()}
          </p>
        </div>

      </div>

    </div>
  );
};
