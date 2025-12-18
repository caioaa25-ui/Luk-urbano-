
import React, { useState, useRef, useEffect } from 'react';
import { getStylistAdvice } from '../services/geminiService';
import { StylistMessage } from '../types';
import Button from './ui/Button';

const AIStylist: React.FC = () => {
  const [messages, setMessages] = useState<StylistMessage[]>([
    { role: 'assistant', content: 'Olá! Sou seu Personal Stylist da LookUrbano. Como posso te ajudar a escolher o look perfeito hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getStylistAdvice(userMsg, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Ops! Tive um problema de conexão. Poderia tentar novamente?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-ml-blue rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
            <i className="fas fa-magic"></i>
        </div>
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Personal AI Stylist</h2>
            <p className="text-sm text-gray-500">Sua consultoria de moda personalizada via Inteligência Artificial</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col overflow-hidden h-[600px]">
        {/* Chat Body */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/30 custom-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-ml-blue text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest px-1">
                    {msg.role === 'assistant' ? 'AI Stylist' : 'Você'}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                <div className="w-1.5 h-1.5 bg-ml-blue rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-ml-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-ml-blue rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1.5 border border-gray-200 focus-within:border-ml-blue transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Diga-me o que procura (ex: look para casamento de dia)"
              className="flex-1 px-4 py-2.5 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
            />
            <Button 
              onClick={handleSend}
              isLoading={isLoading}
              disabled={!input.trim()}
              className="!w-10 !h-10 !p-0 !min-w-0"
              leftIcon={<i className="fas fa-arrow-up"></i>}
            >
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-400 font-medium">
            <span className="flex items-center gap-1"><i className="fas fa-check-circle text-ml-green"></i> Consultoria Gratuita</span>
            <span className="flex items-center gap-1"><i className="fas fa-check-circle text-ml-green"></i> Looks da Temporada</span>
            <span className="flex items-center gap-1"><i className="fas fa-check-circle text-ml-green"></i> Especialista Urbano</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStylist;
