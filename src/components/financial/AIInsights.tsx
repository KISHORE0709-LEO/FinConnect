import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, TrendingUp, Target, Calendar, Zap } from "lucide-react";

export const AIInsights = () => {
  const insights = [
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Overspending Alert",
      message: "You've spent 23% more on dining this month. Consider setting a limit.",
      action: "Set Budget",
      priority: "high",
      color: "border-red-400/30 bg-red-500/10"
    },
    {
      type: "prediction",
      icon: Calendar,
      title: "Upcoming Due",
      message: "Netflix subscription (₹649) renews in 3 days. Credit card payment due in 5 days.",
      action: "View Calendar",
      priority: "medium",
      color: "border-yellow-400/30 bg-yellow-500/10"
    },
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Savings Opportunity",
      message: "You can save ₹2,400/month by switching to annual subscriptions.",
      action: "Optimize",
      priority: "low",
      color: "border-green-400/30 bg-green-500/10"
    },
    {
      type: "goal",
      icon: Target,
      title: "Goal Progress",
      message: "You're 78% towards your emergency fund goal. Great progress!",
      action: "View Goals",
      priority: "low",
      color: "border-blue-400/30 bg-blue-500/10"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-400/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      default: return "bg-green-500/20 text-green-400 border-green-400/30";
    }
  };

  return (
    <Card className="bg-card/80 border-primary/30 p-6 glow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border">
          <Brain className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-bold glow-text">AI Insights & Predictions</h3>
          <p className="text-sm text-muted-foreground">Personalized financial intelligence</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-primary">
          <Zap className="w-4 h-4 animate-pulse" />
          <span>Live Analysis</span>
        </div>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-4 rounded-lg border ${insight.color} hover:scale-[1.02] transition-transform`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <insight.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{insight.title}</h4>
                  <Badge className={getPriorityBadge(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.message}</p>
                <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  {insight.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
          <Brain className="w-4 h-4 mr-2" />
          Generate More Insights
        </Button>
      </div>
    </Card>
  );
};