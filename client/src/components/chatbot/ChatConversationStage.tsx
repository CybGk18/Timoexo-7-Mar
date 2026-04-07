import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useChatState } from '@/contexts/ChatContext'; // Import useChatState to access appendToLastMessage
import { useChatAI } from '../../hooks/useChatAI';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import { ChatMessage } from '@/contexts/ChatContext';

interface ChatConversationStageProps {
  messages: ChatMessage[];
  userName: string;
  category: string;
  onNewMessage: (content: string, role?: 'user' | 'assistant') => string;
  onUpdateMessage: (content: string) => void;
  appendToLastMessage: (content: string) => void; // Add appendToLastMessage to the interface
}

const ChatConversationStage = ({
  messages,
  userName,
  category,
  onNewMessage,
  onUpdateMessage,
  appendToLastMessage, // Destructure appendToLastMessage from props
}: ChatConversationStageProps) => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChatAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const assistantMessageIdRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    onNewMessage(userMessage, 'user');

    const conversationMessages: { role: 'user' | 'assistant'; content: string }[] = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    conversationMessages.push({
      role: 'user',
      content: userMessage,
    });

    // Reset the assistant message ID reference
    assistantMessageIdRef.current = null;

    await sendMessage({
      messages: conversationMessages,
      category,
      userName,
      onDelta: (chunk) => {
        if (assistantMessageIdRef.current) {
          // Append the new chunk to the existing message
          appendToLastMessage(chunk);
        } else {
          // Create a new message with the first chunk
          assistantMessageIdRef.current = onNewMessage(chunk, 'assistant');
        }
      },
      onDone: () => {
        scrollToBottom();
      },
    });

    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB]">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <SuggestedQuestions 
          onQuestionSelect={handleSuggestedQuestion} 
          category={category} 
        />
      )}
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl chatbot-input-area">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about international trade..."
            className="min-h-[60px] max-h-[120px] resize-none border-[#E2E8F0] focus:border-[#0D9488] focus:ring-[#0D9488] chatbot-textarea"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="shrink-0 h-[60px] w-[60px] bg-gradient-to-r from-[#0D9488] to-[#1E3A8A] hover:from-[#0F766E] hover:to-[#1E3A8A] chatbot-send-button"
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatConversationStage;