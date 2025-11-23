import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TrendingDown, AlertCircle, TrendingUp, Scan } from "lucide-react";

const insights = [
  {
    icon: TrendingDown,
    text: "₹450 spent this week on online food",
    color: "text-yellow-400",
  },
  {
    icon: AlertCircle,
    text: "₹80 deducted as hidden charges from Wallet – want to reduce it?",
    color: "text-red-400",
  },
  {
    icon: TrendingUp,
    text: "If you invested ₹200 weekly, you'd have ₹8,400 in 10 months.",
    color: "text-primary",
  },
];

const IntelligenceTeaser = () => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-card/80 border-primary/30 p-8 glow-card backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 glow-text">
              Live Financial Intelligence
            </h2>
            <p className="text-muted-foreground text-lg">
              Get instant insights about your spending patterns
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <insight.icon className={`w-6 h-6 mt-0.5 ${insight.color} flex-shrink-0`} />
                <p className="text-foreground">{insight.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border font-semibold"
            >
              <Scan className="mr-2 h-5 w-5" />
              Scan my SMS → Show my insights
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default IntelligenceTeaser;
