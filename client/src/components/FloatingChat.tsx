import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      fill="currentColor"
      d="M19.11 17.59c-.29-.15-1.69-.83-1.95-.93-.26-.1-.45-.15-.63.15-.19.29-.74.93-.91 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.14-.14.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48-.16-.01-.34-.01-.52-.01-.19 0-.49.07-.75.36-.26.29-.98.96-.98 2.35s1.01 2.73 1.15 2.92c.15.19 1.98 3.03 4.8 4.25.67.29 1.2.46 1.61.58.67.21 1.28.18 1.76.11.54-.08 1.69-.69 1.93-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.34z"
    />
    <path
      fill="currentColor"
      d="M16.04 5.5c-5.8 0-10.52 4.72-10.52 10.52 0 1.85.49 3.66 1.42 5.25L5 27l5.89-1.85c1.54.84 3.28 1.28 5.15 1.28 5.8 0 10.52-4.72 10.52-10.52S21.84 5.5 16.04 5.5zm0 19.3c-1.68 0-3.31-.48-4.72-1.39l-.34-.21-3.5 1.1 1.14-3.41-.22-.35a8.73 8.73 0 0 1-1.37-4.72c0-4.81 3.92-8.73 8.73-8.73s8.73 3.92 8.73 8.73-3.92 8.73-8.73 8.73z"
    />
  </svg>
);

const FloatingChat = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // WhatsApp business number and welcome message
  const whatsappNumber = "+91 8237439036"; // Replace with actual business WhatsApp number
  const welcomeMessage = "Hi there! 👋\nWelcome to T-imoexo. How may we assist you today?";


  const handleWhatsAppClick = () => {
    if (isWhatsAppOpen) {
      // Close the preview
      setIsWhatsAppOpen(false);
    } else {
      // Show preview for 2 seconds then open WhatsApp
      setIsWhatsAppOpen(true);
      setTimeout(() => {
        setIsWhatsAppOpen(false);
        // Open WhatsApp with welcome message
        const encodedMessage = encodeURIComponent(welcomeMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      }, 2000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Preview Window */}
      {isWhatsAppOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-green-200 w-80 h-auto mb-4 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <WhatsAppIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-sm">T-imoexo</div>
                <div className="text-xs text-green-100">Connect via WhatsApp</div>
              </div>
            </div>
            <button
              onClick={() => setIsWhatsAppOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
              data-testid="button-close-whatsapp-preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preview Message */}
          <div className="p-4">
            <div className="bg-green-50 rounded-xl p-3 border-l-4 border-green-500">
              <p className="text-sm text-gray-800 mb-2">
                <strong>Welcome Message Preview:</strong>
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {welcomeMessage}
              </p>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Opening WhatsApp in a moment...
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 relative group"
        data-testid="button-whatsapp-chat"
        title="Chat with us on WhatsApp"
      >
        {isWhatsAppOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <WhatsAppIcon className="w-6 h-6" />
            {/* Notification Dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Chat on WhatsApp
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;
