import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Mail } from 'lucide-react';
import { getPhoneLink, getWhatsAppLink, REPRESENTATIVE_NAME } from '@/lib/chatConstants';

interface ContactCollectionStageProps {
  userName: string;
  category: string;
  onSkip: () => void;
}

const ContactCollectionStage = ({ userName, category, onSkip }: ContactCollectionStageProps) => {
  return (
    <div className="p-6 bg-gradient-to-br from-[#0D9488]/5 to-[#1E3A8A]/5 rounded-xl border border-[#E2E8F0] animate-fade-in shadow-md">
      <div className="mb-4 text-center">
        <h3 className="font-bold text-xl text-[#1E3A8A]">Connect With Our Expert</h3>
        <p className="text-sm text-[#1E293B] mt-2">
          {REPRESENTATIVE_NAME} is ready to help you with your {category.toLowerCase()} needs
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <Button
          onClick={() => window.open(getPhoneLink(), '_self')}
          className="flex flex-col items-center gap-2 h-auto p-4 rounded-xl shadow-md hover:shadow-lg transition-all bg-green-500 hover:bg-green-600 transform hover:scale-105"
          variant="default"
        >
          <Phone className="w-6 h-6 text-white" />
          <span className="text-xs font-medium text-white">Call</span>
        </Button>
        
        <Button
          onClick={() => window.open(getWhatsAppLink(userName, category), '_blank')}
          className="flex flex-col items-center gap-2 h-auto p-4 rounded-xl shadow-md hover:shadow-lg transition-all bg-green-500 hover:bg-green-600 transform hover:scale-105"
          variant="default"
        >
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="text-xs font-medium text-white">WhatsApp</span>
        </Button>
        
        <Button
          onClick={() => {
            const email = "contact@t-imoexo.com";
            const subject = encodeURIComponent(`Inquiry from ${userName} - ${category}`);
            window.location.href = `mailto:${email}?subject=${subject}`;
          }}
          className="flex flex-col items-center gap-2 h-auto p-4 rounded-xl shadow-md hover:shadow-lg transition-all bg-blue-500 hover:bg-blue-600 transform hover:scale-105"
          variant="default"
        >
          <Mail className="w-6 h-6 text-white" />
          <span className="text-xs font-medium text-white">Email</span>
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onSkip}
          className="text-[#1E293B] hover:text-[#0D9488] hover:bg-[#E2E8F0] rounded-full"
        >
          Continue without connecting
        </Button>
      </div>
    </div>
  );
};

export default ContactCollectionStage;