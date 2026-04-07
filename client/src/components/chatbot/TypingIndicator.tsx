import { Loader2 } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 text-[#1E293B] p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm max-w-[85%]">
      <Loader2 className="w-4 h-4 animate-spin text-[#0D9488]" />
      <span className="text-sm">T-imoexo is typing...</span>
    </div>
  );
};

export default TypingIndicator;