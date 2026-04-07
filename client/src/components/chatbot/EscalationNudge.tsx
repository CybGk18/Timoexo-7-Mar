import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, X } from 'lucide-react';
import { getPhoneLink, getWhatsAppLink, REPRESENTATIVE_NAME } from '@/lib/chatConstants';

interface EscalationNudgeProps {
  userName: string;
  category: string;
  onDismiss: () => void;
}

const EscalationNudge = ({ userName, category, onDismiss }: EscalationNudgeProps) => {
  return (
    <div className="p-4 bg-gradient-to-r from-[#0D9488]/5 to-[#1E3A8A]/5 rounded-lg border border-[#E2E8F0] animate-fade-in relative shadow-md">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-white rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 text-[#1E293B]" />
      </button>

      <div className="mb-3">
        <h3 className="font-semibold text-[#1E293B]">Ready to take the next step?</h3>
        <p className="text-sm text-[#1E293B]/70 mt-1">
          Speak directly with {REPRESENTATIVE_NAME}, our trade specialist, for personalized guidance.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => window.open(getPhoneLink(), '_self')}
          className="flex-1 gap-2 bg-green-500 hover:bg-green-600 rounded-lg transform hover:scale-105 transition-transform"
          variant="default"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </Button>
        <Button
          onClick={() => window.open(getWhatsAppLink(userName, category), '_blank')}
          className="flex-1 gap-2 bg-green-500 hover:bg-green-600 rounded-lg transform hover:scale-105 transition-transform"
          variant="secondary"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default EscalationNudge;