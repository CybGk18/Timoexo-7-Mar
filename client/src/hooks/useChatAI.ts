import { useState } from 'react';

interface SendMessageOptions {
  messages: { role: 'user' | 'assistant'; content: string }[];
  category: string;
  userName: string;
  onDelta: (chunk: string) => void;
  onDone: () => void;
}

export const useChatAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async ({
    messages,
    category,
    userName,
    onDelta,
    onDone,
  }: SendMessageOptions) => {
    setIsLoading(true);
    
    try {
      // Get the last user message
      const userMessage = messages[messages.length - 1]?.content || '';
      
      // Call the real backend API with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          category: category,
          userName: userName
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Get the response text
      let responseText = data.response || "I don't have specific information about that topic in the provided documents.";
      
      // Make sure we have a valid response
      if (!responseText || responseText.trim().length === 0) {
        responseText = "I don't have specific information about that topic in the provided documents.";
      }
      
      // Clean the response text
      responseText = cleanResponseText(responseText);
      
      // Ensure we have a meaningful response
      if (responseText.trim().length < 10) {
        responseText = "I don't have specific information about that topic in the provided documents. Please try rephrasing your question or ask about a different topic related to import-export business.";
      }
      
      // Simulate natural typing with proper word breaks
      await simulateTyping(responseText, onDelta);
      onDone();
    } catch (error: any) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, I encountered an error connecting to the AI service. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'The request timed out. Please check your connection and try again.';
      } else if (error.message && error.message.includes('Failed to fetch')) {
        errorMessage = 'Could not connect to the AI service. Please make sure the backend is running.';
      }
      
      // Log the error for debugging
      console.error('AI Service Error:', error);
      
      // Provide a concise error message instead of fallback responses
      await simulateTyping(errorMessage, onDelta);
      onDone();
    } finally {
      setIsLoading(false);
    }
  };

  // Function to simulate natural typing
  const simulateTyping = async (text: string, onDelta: (chunk: string) => void) => {
    // For short texts, send all at once
    if (text.length < 50) {
      onDelta(text);
      return;
    }
    
    // For longer texts, simulate typing with word breaks
    const words = text.split(' ');
    let accumulated = '';
    
    for (let i = 0; i < words.length; i++) {
      // Only send the new word, not the accumulated text
      onDelta((i > 0 ? ' ' : '') + words[i]);
      
      // Add variable delays for natural typing effect
      const delay = Math.random() * 30 + 20; // 20-50ms delay
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  // Function to clean repeated text
  const cleanResponseText = (text: string): string => {
    if (!text) return text;
    
    let cleanedText = text.trim();
    
    // Remove excessive whitespace
    cleanedText = cleanedText.replace(/\s+/g, ' ');
    
    // Ensure proper sentence ending
    if (cleanedText && !cleanedText.endsWith('.') && !cleanedText.endsWith('!') && !cleanedText.endsWith('?')) {
      cleanedText = cleanedText + '.';
    }
    
    // Limit response length for better readability (100 words max)
    const words = cleanedText.split(' ');
    if (words.length > 100) {
      cleanedText = words.slice(0, 100).join(' ') + '...';
    }
    
    return cleanedText;
  };

  return {
    sendMessage,
    isLoading,
  };
};