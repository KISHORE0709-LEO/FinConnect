import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, AlertTriangle, CheckCircle, Brain } from "lucide-react";

export const SmartBudgetPlanner = () => {
  const categories = [
    { name: "Food & Dining", budgeted: 15000, spent: 18500, color: "bg-red-500/20 border-red-400/30" },
    { name: "Transportation", budgeted: 8000, spent: 6200, color: "bg-green-500/20 border-green-400/30" },
    { name: "Entertainment", budgeted: 5000, spent: 4100, color: "bg-green-500/20 border-green-400/30" },
    { name: "Shopping", budgeted: 12000, spent: 14800, color: "bg-yellow-500/20 border-yellow-400/30" },
    { name: "Bills & Utilities", budgeted: 20000, spent: 19500, color: "bg-green-500/20 border-green-400/30" },
  ];

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  const getStatusIcon = (budgeted: number, spent: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage > 100) return <AlertTriangle className="w-4 h-4 text-red-400" />;
    if (percentage > 80) return <TrendingUp className="w-4 h-4 text-yellow-400" />;
    return <CheckCircle className="w-4 h-4 text-green-400" />;
  };

  const getStatusBadge = (budgeted: number, spent: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage > 100) return { text: "Over Budget", color: "bg-red-500/20 text-red-400 border-red-400/30" };
    if (percentage > 80) return { text: "Near Limit", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" };
    return { text: "On Track", color: "bg-green-500/20 text-green-400 border-green-400/30" };
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <Card className="bg-card/80 border-primary/30 p-6 glow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border">
            <Target className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold glow-text">Smart Budget Planner</h3>
            <p className="text-sm text-muted-foreground">AI-powered budget optimization</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 rounded-lg bg-background/30 border border-primary/20">
            <div className="text-2xl font-bold text-primary">₹{totalBudgeted.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-background/30 border border-primary/20">
            <div className="text-2xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-background/30 border border-primary/20">
            <div className={`text-2xl font-bold ${totalSpent > totalBudgeted ? 'text-red-400' : 'text-green-400'}`}>
              ₹{Math.abs(totalBudgeted - totalSpent).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {totalSpent > totalBudgeted ? 'Over Budget' : 'Remaining'}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Budget Progress</span>
            <span className="text-sm text-muted-foreground">
              {((totalSpent / totalBudgeted) * 100).toFixed(1)}%
            </span>
          </div>
          <Progress value={(totalSpent / totalBudgeted) * 100} className="h-3 glow-border" />
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-card/80 border-primary/30 p-6 glow-card">
        <h4 className="text-lg font-bold mb-4 glow-text">Category Breakdown</h4>
        <div className="space-y-4">
          {categories.map((category) => {
            const percentage = (category.spent / category.budgeted) * 100;
            const badge = getStatusBadge(category.budgeted, category.spent);
            
            return (
              <div key={category.name} className={`p-4 rounded-lg border ${category.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(category.budgeted, category.spent)}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge className={badge.color}>
                    {badge.text}
                  </Badge>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>₹{category.spent.toLocaleString()} spent</span>
                  <span>₹{category.budgeted.toLocaleString()} budgeted</span>
                </div>
                
                <Progress value={percentage} className="h-2" />
                
                <div className="text-xs text-muted-foreground mt-1">
                  {percentage.toFixed(1)}% of budget used
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-card/80 border-primary/30 p-6 glow-card">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-primary animate-pulse" />
          <h4 className="text-lg font-bold glow-text">AI Budget Recommendations</h4>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/30">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="font-medium text-red-400">Reduce Food & Dining</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You're 23% over budget. Try cooking at home 2 more days per week to save ₹3,500.
            </p>
          </div>
          
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-400/30">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="font-medium text-green-400">Great Transportation Savings</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You saved ₹1,800 this month! Consider reallocating this to your emergency fund.
            </p>
          </div>
        </div>

        <Button className="w-full mt-4 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
          <Brain className="w-4 h-4 mr-2" />
          Generate Personalized Budget Plan
        </Button>
      </Card>
    </div>
  );
};