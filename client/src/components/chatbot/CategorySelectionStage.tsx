import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CATEGORY_OPTIONS, UserCategory } from '@/lib/chatConstants';
import { Building2, Globe2, ShoppingCart, Info } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface CategorySelectionStageProps {
  userName: string;
  onSubmit: (category: UserCategory) => void;
}

const categoryIcons = {
  manufacturer: Building2,
  international_buyer: ShoppingCart,
  international_seller: Globe2,
};

const CategorySelectionStage = ({ userName, onSubmit }: CategorySelectionStageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<UserCategory>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      onSubmit(selectedCategory);
    }
  };

  const greetingMessage = {
    id: 'greeting',
    role: 'assistant' as const,
    content: `Nice to meet you, ${userName}! Which best describes you?`,
    timestamp: new Date(),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
        <MessageBubble message={greetingMessage} />
        
        <div className="mt-4 p-3 bg-[#7DD3FC]/10 rounded-lg border border-[#7DD3FC]/20">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 text-[#0D9488] flex-shrink-0" />
            <p className="text-sm text-[#1E293B]">
              Select the option that best matches your role. This helps me provide more relevant trade advice.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl">
        <RadioGroup value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as UserCategory)}>
          <div className="space-y-3">
            {CATEGORY_OPTIONS.map((option) => {
              const Icon = categoryIcons[option.value];
              return (
                <Label
                  key={option.value}
                  htmlFor={option.value}
                  className="flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-[#0D9488]/5 has-[:checked]:border-[#0D9488] has-[:checked]:bg-[#0D9488]/10"
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1 border-[#0D9488]" />
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#1E293B]">{option.label}</div>
                      <div className="text-sm text-[#1E293B]/70 mt-1">{option.description}</div>
                    </div>
                  </div>
                </Label>
              );
            })}
          </div>
        </RadioGroup>
        
        <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-[#0D9488] to-[#1E3A8A] hover:from-[#0F766E] hover:to-[#1E3A8A] rounded-lg shadow-md transition-all" disabled={!selectedCategory}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default CategorySelectionStage;