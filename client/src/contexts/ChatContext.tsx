import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { STORAGE_KEY } from '@/lib/chatConstants';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface UserData {
  name?: string;
  category?: string;
  phone?: string;
  email?: string;
}

export interface ChatState {
  stage: 'name' | 'category' | 'chat';
  messages: ChatMessage[];
  userData: UserData;
  chatStartTime: number | null;
  contactRequested: boolean;
  contactSkipped: boolean;
  escalationOffered: boolean;
}

interface ChatContextType {
  state: ChatState;
  addMessage: (role: 'user' | 'assistant' | 'system', content: string) => string;
  updateLastMessage: (content: string) => void;
  appendToLastMessage: (content: string) => void;
  setStage: (stage: 'name' | 'category' | 'chat') => void;
  setUserData: (data: Partial<UserData>) => void;
  startChat: () => void;
  markContactRequested: () => void;
  markContactSkipped: () => void;
  markEscalationOffered: () => void;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Default initial state
const DEFAULT_STATE: ChatState = {
  stage: 'name',
  messages: [],
  userData: {},
  chatStartTime: null,
  contactRequested: false,
  contactSkipped: false,
  escalationOffered: false,
};

export const useChatState = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatState must be used within ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [state, setState] = useState<ChatState>(DEFAULT_STATE);

  // Load chat state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Convert timestamp strings back to Date objects
        const stateWithDates = {
          ...parsedState,
          messages: parsedState.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        };
        setState(stateWithDates);
      } catch (e) {
        console.error('Failed to parse saved chat state:', e);
      }
    }
  }, []);

  // Save chat state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save chat state:', e);
    }
  }, [state]);

  const addMessage = (role: 'user' | 'assistant' | 'system', content: string): string => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newMessage: ChatMessage = {
      id,
      role,
      content,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    return id;
  };

  const updateLastMessage = (content: string) => {
    setState(prev => {
      if (prev.messages.length === 0) return prev;
      
      const updatedMessages = [...prev.messages];
      const lastIndex = updatedMessages.length - 1;
      updatedMessages[lastIndex] = {
        ...updatedMessages[lastIndex],
        content,
      };

      return {
        ...prev,
        messages: updatedMessages,
      };
    });
  };

  const appendToLastMessage = (content: string) => {
    setState(prev => {
      if (prev.messages.length === 0) return prev;
      
      const updatedMessages = [...prev.messages];
      const lastIndex = updatedMessages.length - 1;
      updatedMessages[lastIndex] = {
        ...updatedMessages[lastIndex],
        content: updatedMessages[lastIndex].content + content,
      };

      return {
        ...prev,
        messages: updatedMessages,
      };
    });
  };

  const setStage = (stage: 'name' | 'category' | 'chat') => {
    setState(prev => ({
      ...prev,
      stage,
    }));
  };

  const setUserData = (data: Partial<UserData>) => {
    setState(prev => ({
      ...prev,
      userData: {
        ...prev.userData,
        ...data,
      },
    }));
  };

  const startChat = () => {
    setState(prev => ({
      ...prev,
      chatStartTime: Date.now(),
    }));
  };

  const markContactRequested = () => {
    setState(prev => ({
      ...prev,
      contactRequested: true,
    }));
  };

  const markContactSkipped = () => {
    setState(prev => ({
      ...prev,
      contactSkipped: true,
    }));
  };

  const markEscalationOffered = () => {
    setState(prev => ({
      ...prev,
      escalationOffered: true,
    }));
  };

  const resetChat = () => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
