import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
  category: string;
}

const SuggestedQuestions = ({ onQuestionSelect, category }: SuggestedQuestionsProps) => {
  const questions = {
    manufacturer: [
      "What documents do I need for exporting goods?",
      "How can I find international buyers for my products?",
      "What are the key compliance requirements for exports?",
      "How do I calculate landed costs for international shipments?"
    ],
    international_buyer: [
      "How do I verify the credibility of Indian suppliers?",
      "What are the import duties for electronics from India?",
      "How can I negotiate better terms with suppliers?",
      "What are the best shipping options for small orders?"
    ],
    international_seller: [
      "How do I register my business for imports to India?",
      "What are the GST implications for importing goods?",
      "How can I establish a distribution network in India?",
      "What are the key regulations for foreign businesses in India?"
    ]
  };

  const categoryQuestions = questions[category as keyof typeof questions] || questions.manufacturer;

  return (
    <div className="p-4 border-t bg-white border-[#E2E8F0]">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-[#0D9488]" />
        <h4 className="text-sm font-medium text-[#1E293B]">Try asking about:</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {categoryQuestions.slice(0, 3).map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-auto py-2 text-xs leading-tight text-left border-[#E2E8F0] hover:bg-[#0D9488]/10 hover:border-[#0D9488] text-[#1E293B] rounded-lg"
            onClick={() => onQuestionSelect(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;