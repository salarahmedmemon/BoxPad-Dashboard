import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Message } from '../types';

interface ChatWindowProps {
  contactName: string;
  contactImage?: string;
  messages: Message[];
  loading: boolean;
  onSendMessage: (text: string) => void;
  onBack?: () => void;
  onDetailsClick?: () => void;
  isMobile?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  contactName,
  messages,
  loading,
  onSendMessage,
  onBack,
  onDetailsClick,
  isMobile,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-white rounded-[8.42px]">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Back button – visible only on mobile */}
            {isMobile && onBack && (
              <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <div>
              <h2 className="font-bold text-black">{contactName}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Details toggle button – visible only on mobile */}
            {isMobile && onDetailsClick && (
              <button onClick={onDetailsClick} className="p-1 bg-gray-100 rounded-full">
                <img src="/assets/img/sidemenu.svg" alt="details" className="w-5 h-5" />
              </button>
            )}
            <button className="w-[22.45px] h-[22.45px] flex items-center justify-center rounded-[5.61px] p-[4.21px] bg-[#EBEBEB]">
              <img className='h-3' src='/assets/img/3dots.svg' alt='3 dots icon' />
            </button>
            <button className="w-[22.45px] h-[22.45px] flex items-center justify-center rounded-[5.61px] p-[4.21px] bg-[#EBEBEB]">
              <img className='h-3' src='/assets/img/videocall.svg' alt='video call icon' />
            </button>
            <button className="w-[22.45px] h-[22.45px] flex items-center justify-center rounded-[5.61px] p-[4.21px] bg-[#000]">
              <img className='h-3' src='/assets/img/download.svg' alt='download icon' />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`h-10 rounded-2xl ${i % 2 === 0 ? 'bg-gray-200 w-[55%]' : 'bg-gray-300 w-[45%]'}`}></div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
              <p>No messages yet</p>
              <p className="text-sm">Start a conversation!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="text-sm">{message.text}</p>
                  <div className={`mt-1 flex flex-col-reverse text-xs relative ${message.sender === 'user' ? 'absolute top-[-50%] left-[-30%] text-[#000]' : 'absolute top-[-50%] right-[-120%] text-[#000]'}`}>
                    <div className={`${message.sender === 'user' ? 'w-[14px] h-[14px] flex items-center justify-center absolute top-[90%] left-[4%]' : 'w-[0px] h-[0px] bg-none'}`}>
                      <img src='/assets/img/sent.svg' alt='sent icon' className='h-4' />
                    </div>
                    <span>{formatMessageTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-[11.23px] w-full h-[92px] overflow-hidden">
        <div className="w-full flex flex-col rounded-[5.61px] h-full border-[0.7px] border-[#D8DEE4] shadow-[0_10px_30px_rgba(231,235,236,1)]">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type something..."
            rows={1}
            className="p-2 text-[12px] resize-none focus:outline-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ maxHeight: '100px' }}
          />
          <div className="w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/gallery.svg" alt="gallery icon" />
              </div>
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/video.svg" alt="video icon" />
              </div>
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/files.svg" alt="files icon" />
              </div>
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/emoji.svg" alt="emoji icon" />
              </div>
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/reply.svg" alt="reply icon" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/current.svg" alt="current icon" />
              </div>
              <div className="w-[22.46px] h-[22.46px] flex items-center justify-center">
                <img src="/assets/img/mic.svg" alt="mic icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}