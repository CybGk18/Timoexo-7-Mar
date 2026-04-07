import { ChatMessage } from '@/contexts/ChatContext';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import FeedbackComponent from './FeedbackComponent';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackSubmit = (messageId: string, feedback: { rating: 'positive' | 'negative'; comment: string }) => {
    // In a real implementation, this would send feedback to your backend
    console.log('Feedback submitted for message:', messageId, feedback);
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-[#7DD3FC]/20 text-[#1E293B] px-4 py-2 rounded-full text-sm border border-[#7DD3FC]/30">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#E2E8F0] text-[#1E293B] mt-auto">
          <Bot className="w-4 h-4" />
        </div>
      )}
      
      <div className={cn(
        "rounded-2xl px-4 py-3 break-words shadow-sm max-w-[85%]",
        isUser 
          ? "bg-[#0D9488] text-white rounded-tr-none" 
          : "bg-[#E0F2FE] text-[#1E293B] border border-[#E2E8F0] rounded-tl-none"
      )}>
        {message.content && message.content.trim() !== '' ? (
          <>
            <p className="text-sm whitespace-pre-wrap text-inherit">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        ) : (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#E2E8F0] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#E2E8F0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#E2E8F0] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#0D9488] text-white mt-auto">
          <User className="w-4 h-4" />
        </div>
      )}
      
      {!isUser && !isSystem && message.content && message.content !== ' ' && (
        <div className="mt-2">
          <button 
            onClick={() => setShowFeedback(!showFeedback)}
            className="text-xs text-[#1E293B]/70 hover:text-[#0D9488] transition-colors"
          >
            {showFeedback ? 'Cancel' : 'Give feedback'}
          </button>
          
          {showFeedback && (
            <div className="mt-2">
              <FeedbackComponent 
                messageId={message.id} 
                onFeedbackSubmit={handleFeedbackSubmit} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;