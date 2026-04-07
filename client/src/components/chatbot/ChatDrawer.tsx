import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X, RotateCcw } from "lucide-react";
import { useChatState } from "@/contexts/ChatContext";
import { useChatTimers } from "../../hooks/useChatTimers";
import { useState, useEffect } from "react";
import NameCollectionStage from "./NameCollectionStage";
import CategorySelectionStage from "./CategorySelectionStage";
import ChatConversationStage from "./ChatConversationStage";
import ContactCollectionStage from "./ContactCollectionStage";
import EscalationNudge from "./EscalationNudge";

interface ChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatDrawer = ({ open, onOpenChange }: ChatDrawerProps) => {
  const {
    state,
    addMessage,
    updateLastMessage,
    appendToLastMessage,
    setStage,
    setUserData,
    startChat,
    markContactRequested,
    markContactSkipped,
    markEscalationOffered,
    resetChat,
  } = useChatState();

  const { shouldRequestContact, shouldShowEscalation } = useChatTimers(
    state.chatStartTime,
    state.stage === 'chat'
  );

  const handleNameSubmit = (name: string) => {
    setUserData({ name });
    addMessage('user', name);
    setStage('category');
  };

  const handleCategorySubmit = (category: string) => {
    setUserData({ category: category as any });
    addMessage('user', category.replace('_', ' '));
    addMessage('assistant', `Great! Feel free to ask me anything about international trade processes, documentation, or how T-imoexo can help you succeed.`);
    setStage('chat');
    startChat();
  };

  const handleNewMessage = (content: string, role: 'user' | 'assistant' = 'assistant') => {
    return addMessage(role, content || '');
  };

  const handleContactSubmit = (phone: string, email: string) => {
    setUserData({ phone, email });
    addMessage('system', 'Thank you for providing your contact details!');
  };

  const handleContactSkip = () => {
    markContactSkipped();
    addMessage('system', 'No problem! You can provide your details anytime.');
  };

  const handleEscalationDismiss = () => {
    // Just dismiss - the system message is already added
  };

  const handleResetChat = () => {
    if (confirm('Are you sure you want to start a new chat?')) {
      resetChat();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] max-h-[750px] max-w-[480px] ml-auto mr-6 mt-6 rounded-2xl shadow-2xl border border-[#E2E8F0] bg-white chatbot-drawer">
        <DrawerHeader className="border-b bg-gradient-to-r from-[#0D9488] to-[#1E3A8A] rounded-t-2xl p-5 chatbot-drawer-header">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold text-white">T-imoexo Trade Assistant</DrawerTitle>
            <div className="flex items-center gap-2">
              {state.stage === 'chat' && (
                <button 
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  onClick={handleResetChat}
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
              )}
              <DrawerClose asChild>
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-b-2xl">
          {state.stage === 'name' ? (
            <NameCollectionStage onSubmit={handleNameSubmit} />
          ) : state.stage === 'category' && state.userData.name ? (
            <CategorySelectionStage
              userName={state.userData.name}
              onSubmit={handleCategorySubmit}
            />
          ) : state.stage === 'chat' && state.userData.name && state.userData.category ? (
            <div className="flex flex-col h-full">
              <ChatConversationStage
                messages={state.messages}
                userName={state.userData.name}
                category={state.userData.category}
                onNewMessage={handleNewMessage}
                onUpdateMessage={updateLastMessage}
                appendToLastMessage={appendToLastMessage}
              />
              
              {/* Contact Form Overlay */}
              {state.contactRequested && !state.userData.email && !state.contactSkipped && (
                <div className="p-4 border-t bg-[#F9FAFB] rounded-b-2xl">
                  <ContactCollectionStage
                    userName={state.userData.name || ''}
                    category={state.userData.category || ''}
                    onSkip={handleContactSkip}
                  />
                </div>
              )}
              
              {/* Escalation Nudge */}
              {state.escalationOffered && state.userData.email && (
                <div className="p-4 border-t bg-[#F9FAFB] rounded-b-2xl">
                  <EscalationNudge
                    userName={state.userData.name}
                    category={state.userData.category}
                    onDismiss={handleEscalationDismiss}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;