import { useState } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Shield, Award, Activity } from "lucide-react";
import { SmartBudgetPlanner } from "@/components/financial/SmartBudgetPlanner";
import { ExpenseAnalyzer } from "@/components/financial/ExpenseAnalyzer";

import { FinanceHealthScore } from "@/components/financial/FinanceHealthScore";
import { AIInsights } from "@/components/financial/AIInsights";

const FinancialCopilot = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const modules = [
    { id: "budget", name: "Smart Budget Planner", icon: Target, color: "from-blue-500/20" },
    { id: "expenses", name: "Expense Analyzer", icon: TrendingUp, color: "from-red-500/20" },
    { id: "savings", name: "Savings Optimizer", icon: Shield, color: "from-purple-500/20" },
    { id: "subscriptions", name: "Subscription Tracker", icon: Zap, color: "from-yellow-500/20" },
    { id: "goals", name: "Goal Forecasting", icon: Award, color: "from-pink-500/20" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Header />
      
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* AI Co-pilot Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-primary/30 mb-6 glow-border">
              <Brain className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-lg font-bold glow-text">AI Financial Co-Pilot</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
              Your Money Intelligence Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Helping you understand money, not just track it. Get personalized insights, predictions, and optimization strategies.
            </p>
          </div>

          <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-8">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 bg-card/50 border border-primary/30">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary/20">Dashboard</TabsTrigger>
              {modules.map((module) => (
                <TabsTrigger key={module.id} value={module.id} className="data-[state=active]:bg-primary/20">
                  <module.icon className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">{module.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="dashboard" className="space-y-8">
              {/* Finance Health Score */}
              <FinanceHealthScore />
              
              {/* AI Insights */}
              <AIInsights />
              
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <Card
                    key={module.id}
                    className={`group relative bg-card/80 border-primary/30 p-6 glow-card hover:scale-105 transition-all cursor-pointer overflow-hidden`}
                    onClick={() => setActiveModule(module.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border mb-4">
                        <module.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{module.name}</h3>
                      <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30">
                        Launch Tool
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="budget">
              <SmartBudgetPlanner />
            </TabsContent>

            <TabsContent value="expenses">
              <ExpenseAnalyzer />
            </TabsContent>



            <TabsContent value="savings">
              <Card className="bg-card/80 border-primary/30 p-8 glow-card text-center">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 glow-text">Savings Optimizer</h3>
                <p className="text-muted-foreground mb-6">Coming Soon - AI-powered savings recommendations</p>
                <Badge variant="outline" className="border-primary/50 text-primary">Under Development</Badge>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions">
              <Card className="bg-card/80 border-primary/30 p-8 glow-card text-center">
                <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 glow-text">Subscription Tracker</h3>
                <p className="text-muted-foreground mb-6">Coming Soon - Track and optimize recurring payments</p>
                <Badge variant="outline" className="border-primary/50 text-primary">Under Development</Badge>
              </Card>
            </TabsContent>

            <TabsContent value="goals">
              <Card className="bg-card/80 border-primary/30 p-8 glow-card text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 glow-text">Goal Forecasting</h3>
                <p className="text-muted-foreground mb-6">Coming Soon - Predictive goal achievement analysis</p>
                <Badge variant="outline" className="border-primary/50 text-primary">Under Development</Badge>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default FinancialCopilot;