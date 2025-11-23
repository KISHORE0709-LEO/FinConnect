import StarfieldBackground from "@/components/StarfieldBackground";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Wallet, CreditCard, LineChart, Shield, Building, Target, DollarSign, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const teenModules = [
  { title: "Money & Transactions", icon: Wallet, description: "Track digital and physical money, analyze spending patterns" },
  { title: "Income & Earning", icon: DollarSign, description: "Record part-time work earnings and allowances" },
  { title: "Budgeting & Planning", icon: PieChart, description: "Create monthly budgets and allocate for goals" },
  { title: "Digital Banking", icon: Building, description: "Learn bank accounts, cards, and payment systems" },
  { title: "Investing Basics", icon: TrendingUp, description: "Understand risk, reward, and diversification" },
];

const youngAdultModules = [
  { title: "Income Streams", icon: BarChart3, description: "Manage salary, freelancing, and passive income" },
  { title: "Zero-Based Budgeting", icon: Target, description: "Allocate every rupee to needs, wants, or savings" },
  { title: "Credit & Loans", icon: CreditCard, description: "Master credit cards, EMIs, and credit scores" },
  { title: "Investment Portfolio", icon: LineChart, description: "Stocks, mutual funds, ETFs, and crypto strategies" },
  { title: "Tax Planning", icon: Shield, description: "Learn tax filing, deductions, and compliance" },
];

const professionalModules = [
  { title: "Dashboard Overview", description: "Complete financial health snapshot with income, expenses, and cash flow", color: "from-blue-500/20" },
  { title: "Expense Analysis", description: "SMS/bank parsing, category breakdown, behavior insights", color: "from-green-500/20" },
  { title: "Budget Planning", description: "Zero-based budgeting with goal-based allocation and simulations", color: "from-purple-500/20" },
  { title: "Savings & Emergency", description: "Automatic recommendations and emergency fund tracker", color: "from-yellow-500/20" },
  { title: "Investments", description: "Portfolio tracking, risk profiling, and growth projections", color: "from-pink-500/20" },
  { title: "Credit & Loans", description: "Credit monitoring, loan management, and tax dashboard", color: "from-orange-500/20" },
  { title: "Insurance", description: "Coverage analysis and risk management alerts", color: "from-red-500/20" },
  { title: "Market Awareness", description: "Daily updates on stocks, interest rates, and policy changes", color: "from-indigo-500/20" },
  { title: "Insights & Actions", description: "Spending optimizations and investment recommendations", color: "from-cyan-500/20" },
  { title: "Rewards System", description: "Achievement badges and progress tracking", color: "from-primary/20" },
];

const ProfessionalZone = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-6 glow-border">
              <span className="text-4xl">👔</span>
              <span className="text-sm text-muted-foreground">Ages 14+ • Teens, Young Adults & Professionals</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
              Professional Zone
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master finances through advanced analytics, investment insights, and real-world simulations.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-card border-primary/30 p-6 glow-card">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Net Worth</span>
              </div>
              <div className="text-3xl font-bold text-foreground">₹2.4L</div>
              <div className="text-xs text-primary mt-1">+12% this month</div>
            </Card>
            
            <Card className="bg-card border-primary/30 p-6 glow-card">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Savings Rate</span>
              </div>
              <div className="text-3xl font-bold text-foreground">28%</div>
              <div className="text-xs text-primary mt-1">Above average</div>
            </Card>
            
            <Card className="bg-card border-primary/30 p-6 glow-card">
              <div className="flex items-center gap-3 mb-2">
                <LineChart className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Investments</span>
              </div>
              <div className="text-3xl font-bold text-foreground">₹85K</div>
              <div className="text-xs text-primary mt-1">+8.5% returns</div>
            </Card>
            
            <Card className="bg-card border-primary/30 p-6 glow-card">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Goals on Track</span>
              </div>
              <div className="text-3xl font-bold text-foreground">3/5</div>
              <div className="text-xs text-primary mt-1">60% complete</div>
            </Card>
          </div>

          {/* Learning Path Tabs */}
          <Tabs defaultValue="professional" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teens">Teens (14-17)</TabsTrigger>
              <TabsTrigger value="young">Young Adults (17-25)</TabsTrigger>
              <TabsTrigger value="professional">Professionals (25+)</TabsTrigger>
            </TabsList>

            <TabsContent value="teens" className="mt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Grades 8-11 Financial Literacy</h3>
                <p className="text-muted-foreground">
                  Focus on digital money, responsible spending, advanced budgeting, and investment basics
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teenModules.map((module, index) => (
                  <Card key={index} className="bg-card border-primary/30 p-6 glow-card hover:scale-105 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border mb-4">
                      <module.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{module.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                    <Button size="sm" className="w-full bg-primary/20 text-primary hover:bg-primary/30">
                      Start Learning
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="young" className="mt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Young Adult Financial Management</h3>
                <p className="text-muted-foreground">
                  Real-world responsibilities, career income, investments, and wealth-building strategies
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {youngAdultModules.map((module, index) => (
                  <Card key={index} className="bg-card border-primary/30 p-6 glow-card hover:scale-105 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-border mb-4">
                      <module.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{module.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                    <Button size="sm" className="w-full bg-primary/20 text-primary hover:bg-primary/30">
                      Explore Module
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="professional" className="mt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Professional Financial Management System</h3>
                <p className="text-muted-foreground">
                  Advanced analytics, SMS parsing, investment tracking, and comprehensive wealth management
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {professionalModules.map((module, index) => (
                  <Card
                    key={index}
                    className="group relative bg-card border-primary/30 p-6 glow-card hover:scale-105 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2">{module.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                      <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
                        Access Dashboard
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="bg-card/80 border-primary/30 p-8 glow-card text-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 glow-text">Ready to Master Your Finances?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect your bank SMS to unlock personalized insights, track spending patterns, 
              and get AI-powered recommendations for optimizing your financial health.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border">
              <BarChart3 className="mr-2 h-5 w-5" />
              Activate Smart Analytics
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalZone;
