import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, MessageSquare, Calendar, Zap, Brain } from "lucide-react";

export const ExpenseAnalyzer = () => {
  const smsTransactions = [
    { date: "2024-01-15", amount: 2500, merchant: "Swiggy", category: "Food", type: "UPI" },
    { date: "2024-01-14", amount: 850, merchant: "Uber", category: "Transport", type: "Card" },
    { date: "2024-01-13", amount: 1200, merchant: "Amazon", category: "Shopping", type: "UPI" },
    { date: "2024-01-12", amount: 45000, merchant: "Rent Transfer", category: "Bills", type: "NEFT" },
  ];

  const spendingPatterns = [
    { category: "Food & Dining", amount: 18500, percentage: 31, trend: "up", change: "+23%" },
    { category: "Bills & Utilities", amount: 19500, percentage: 33, trend: "stable", change: "0%" },
    { category: "Shopping", amount: 14800, percentage: 25, trend: "up", change: "+12%" },
    { category: "Transportation", amount: 6200, percentage: 11, trend: "down", change: "-15%" },
  ];

  const irregularIncome = [
    { source: "Freelance Project", amount: 25000, date: "2024-01-10", status: "received" },
    { source: "Bonus Payment", amount: 15000, date: "2024-01-05", status: "pending" },
    { source: "Investment Returns", amount: 3200, date: "2024-01-03", status: "received" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-red-400" />;
      case "down": return <TrendingUp className="w-4 h-4 text-green-400 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/80 border-primary/30 p-6 glow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border">
            <BarChart3 className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold glow-text">Expense Analyzer</h3>
            <p className="text-sm text-muted-foreground">Multi-source financial intelligence</p>
          </div>
        </div>

        <Tabs defaultValue="sms" className="space-y-6">
          <TabsList className="grid grid-cols-4 bg-card/50 border border-primary/30">
            <TabsTrigger value="sms">SMS Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Spending Patterns</TabsTrigger>
            <TabsTrigger value="income">Income Tracking</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="sms" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-medium">SMS Transaction Analysis</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                Live Parsing
              </Badge>
            </div>
            
            {smsTransactions.map((transaction, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/30 border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-mono">{transaction.type}</span>
                    </div>
                    <div>
                      <div className="font-medium">{transaction.merchant}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-400">-₹{transaction.amount.toLocaleString()}</div>
                    <Badge variant="outline" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Spending Pattern Analysis</span>
            </div>
            
            {spendingPatterns.map((pattern, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/30 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(pattern.trend)}
                    <span className="font-medium">{pattern.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹{pattern.amount.toLocaleString()}</span>
                    <Badge className={`${pattern.trend === 'up' ? 'bg-red-500/20 text-red-400 border-red-400/30' : 
                      pattern.trend === 'down' ? 'bg-green-500/20 text-green-400 border-green-400/30' : 
                      'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'}`}>
                      {pattern.change}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${pattern.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {pattern.percentage}% of total spending
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">Irregular Income Tracking</span>
            </div>
            
            {irregularIncome.map((income, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/30 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{income.source}</div>
                    <div className="text-xs text-muted-foreground">{income.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">+₹{income.amount.toLocaleString()}</div>
                    <Badge className={income.status === 'received' ? 
                      'bg-green-500/20 text-green-400 border-green-400/30' : 
                      'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'}>
                      {income.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-medium">AI Predictions & Alerts</span>
            </div>
            
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="font-medium text-red-400">Overspending Alert</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on current patterns, you'll exceed your monthly budget by ₹8,500 if spending continues.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-blue-400">Month-End Prediction</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated month-end balance: ₹12,400. Consider reducing dining expenses by 20%.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-green-400">Cash Flow Health</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your cash flow is stable. Good time to increase emergency fund contributions.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};