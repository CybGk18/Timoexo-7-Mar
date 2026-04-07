import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, CheckCircle, User, Building2, ShoppingCart, Globe2 } from 'lucide-react';

const QuickStartGuide = () => {
  const steps = [
    {
      icon: User,
      title: "Enter Your Name",
      description: "Start by introducing yourself to our trade assistant"
    },
    {
      icon: Building2,
      title: "Select Your Role",
      description: "Tell us if you're a manufacturer, buyer, or seller"
    },
    {
      icon: Lightbulb,
      title: "Ask Questions",
      description: "Get expert advice on international trade processes"
    },
    {
      icon: CheckCircle,
      title: "Get Solutions",
      description: "Receive tailored guidance for your business needs"
    }
  ];

  const features = [
    "24/7 Trade Expertise",
    "Document Assistance",
    "Compliance Guidance",
    "Market Insights",
    "Custom Solutions"
  ];

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">Welcome to T-imoexo Trade Assistant</h2>
        <p className="text-[#1E293B] mt-2">
          Your AI-powered guide to international trade success
        </p>
      </div>
      
      <div className="grid gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} className="border-[#E2E8F0] hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-start gap-4">
                <div className="bg-[#0D9488]/10 p-2 rounded-full">
                  <Icon className="w-5 h-5 text-[#0D9488]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">{step.title}</h3>
                  <p className="text-sm text-[#1E293B]/70 mt-1">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1E293B]">
            <Lightbulb className="w-5 h-5 text-[#0D9488]" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-[#0D9488]/10 text-[#1E3A8A]">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-[#1E293B]/70">
        <p>Need human assistance? Our trade specialists are available during business hours.</p>
      </div>
    </div>
  );
};

export default QuickStartGuide;