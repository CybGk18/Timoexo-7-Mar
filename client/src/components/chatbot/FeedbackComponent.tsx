import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';

interface FeedbackComponentProps {
  messageId: string;
  onFeedbackSubmit: (messageId: string, feedback: { rating: 'positive' | 'negative'; comment: string }) => void;
}

const FeedbackComponent = ({ messageId, onFeedbackSubmit }: FeedbackComponentProps) => {
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    
    onFeedbackSubmit(messageId, { rating, comment });
    setSubmitted(true);
    
    // Simple alert instead of toast
    alert("Thank you for your feedback!");
  };

  if (submitted) {
    return (
      <div className="text-sm text-[#1E293B] p-3 bg-[#0D9488]/10 rounded-lg border border-[#0D9488]/20">
        Thank you for your feedback!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded-lg space-y-3 border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#1E293B]">Was this response helpful?</span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={rating === 'positive' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setRating('positive')}
            className={rating === 'positive' ? 'bg-green-500 hover:bg-green-600' : 'border-[#E2E8F0]'}
          >
            <ThumbsUp className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant={rating === 'negative' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setRating('negative')}
            className={rating === 'negative' ? 'bg-red-500 hover:bg-red-600' : 'border-[#E2E8F0]'}
          >
            <ThumbsDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {rating && (
        <div className="space-y-2">
          <Label htmlFor="comment" className="text-[#1E293B]">Additional feedback (optional)</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What could be improved?"
            className="text-sm border-[#E2E8F0] focus:border-[#0D9488] focus:ring-[#0D9488] rounded-lg"
            rows={2}
          />
          <Button type="submit" size="sm" className="w-full bg-gradient-to-r from-[#0D9488] to-[#1E3A8A] hover:from-[#0F766E] hover:to-[#1E3A8A] rounded-lg">
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </div>
      )}
    </form>
  );
};

export default FeedbackComponent;