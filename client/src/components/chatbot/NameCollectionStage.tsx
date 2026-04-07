import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { nameSchema } from '@/lib/chatValidation';
import MessageBubble from './MessageBubble';
import QuickStartGuide from './QuickStartGuide';

interface NameCollectionStageProps {
  onSubmit: (name: string) => void;
}

const NameCollectionStage = ({ onSubmit }: NameCollectionStageProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = nameSchema.parse({ name });
      setError('');
      onSubmit(result.name);
    } catch (err: any) {
      setError(err.errors[0]?.message || 'Invalid name');
    }
  };

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: "Hello! I'm your T-imoexo assistant. What's your name?",
    timestamp: new Date(),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
        <MessageBubble message={welcomeMessage} />
        {showGuide && <QuickStartGuide />}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="name" className="text-[#1E293B]">Your Name</Label>
              <Button 
                type="button" 
                variant="link" 
                size="sm" 
                onClick={() => setShowGuide(!showGuide)}
                className="h-auto p-0 text-[#0D9488] hover:text-[#1E3A8A]"
              >
                {showGuide ? 'Hide Guide' : 'Show Guide'}
              </Button>
            </div>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="mt-1 border-[#E2E8F0] focus:border-[#0D9488] focus:ring-[#0D9488] rounded-lg"
              autoFocus
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-[#0D9488] to-[#1E3A8A] hover:from-[#0F766E] hover:to-[#1E3A8A] rounded-lg shadow-md transition-all">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NameCollectionStage;