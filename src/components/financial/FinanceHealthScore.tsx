import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Shield, Target, Zap } from "lucide-react";

export const FinanceHealthScore = () => {
  const healthScore = 78;
  const metrics = [
    { name: "Cash Flow", score: 85, icon: TrendingUp, color: "text-green-400" },
    { name: "Savings Rate", score: 72, icon: Shield, color: "text-blue-400" },
    { name: "Debt Health", score: 90, icon: Heart, color: "text-red-400" },
    { name: "Goal Progress", score: 65, icon: Target, color: "text-purple-400" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "bg-green-500/20 text-green-400 border-green-400/30" };
    if (score >= 60) return { text: "Good", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" };
    return { text: "Needs Attention", color: "bg-red-500/20 text-red-400 border-red-400/30" };
  };

  const badge = getScoreBadge(healthScore);

  return (
    <Card className="bg-card/80 border-primary/30 p-6 glow-card animate-currency-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border">
            <Heart className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold glow-text">Financial Health Score</h3>
            <p className="text-sm text-muted-foreground">Your AI-powered financial wellness rating</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-bold ${getScoreColor(healthScore)}`}>
            {healthScore}
          </div>
          <Badge className={badge.color}>
            {badge.text}
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <Progress value={healthScore} className="h-3 glow-border" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="text-center p-3 rounded-lg bg-background/30 border border-primary/20">
            <metric.icon className={`w-5 h-5 mx-auto mb-2 ${metric.color}`} />
            <div className={`text-lg font-bold ${getScoreColor(metric.score)}`}>
              {metric.score}
            </div>
            <div className="text-xs text-muted-foreground">{metric.name}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
        <Zap className="w-4 h-4 animate-pulse" />
        <span>Updated in real-time • Next analysis in 2h</span>
      </div>
    </Card>
  );
};